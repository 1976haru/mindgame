import { create } from 'zustand'
import { EmotionType } from '../data/emotions'
import { PLANT_BY_ID } from '../data/plants'
import { getHeroByEpisode } from '../data/heroes'
import { getBuildingByEpisode } from '../data/buildings'
import {
  UserProfile,
  GardenEntry,
  GameState,
  defaultGameState,
  saveProfile,
  loadProfile,
  saveEntry,
  loadAllEntries,
  deleteEntry,
  saveGameState,
  loadGameState,
  clearAllData
} from '../utils/storage'
import { PLANT_SPECIES } from '../data/plants'
import { computeUnlockedLegendaries } from '../utils/gameLogic'
import { DojoId, DojoRank, DOJO_BY_ID, nextRank } from '../data/dojos'
import { getMissionsByRank } from '../data/missions'
import { getTodaysChallenge, DAILY_REWARD } from '../data/dailyChallenge'
import { computeUnlockedSynergies } from '../data/synergies'
import { daysBetween } from '../utils/timeUtils'
import { todayString, uuid, randomGardenPosition } from '../utils/helpers'

export type Screen =
  | 'splash' | 'nameInput' | 'gardenAwaken' | 'garden'
  | 'emotionSelect' | 'intensitySelect' | 'plantGrowing' | 'friendVisit'
  | 'breathing' | 'worryBubble' | 'gratitudeStar' | 'colorPaint' | 'minigames'
  | 'solomonIntro' | 'kingdom' | 'episodeList' | 'courtroom'
  | 'collection' | 'heroCollection' | 'plantCollection'
  | 'fusion' | 'treasureChest' | 'myLawbook'
  | 'settings' | 'parentReport'
  | 'dojoHall' | 'dojoDetail' | 'mission' | 'missionResult'
  | 'solomonExam' | 'shihanCutscene' | 'hallOfFame'
  | 'dailyChallenge' | 'versus' | 'certificate'

interface AppState {
  // 데이터
  profile: UserProfile | null
  entries: GardenEntry[]
  game: GameState
  loaded: boolean

  // 화면 상태
  currentScreen: Screen
  pendingEmotion: { type: EmotionType; intensity: number } | null
  lastEntry: GardenEntry | null
  activeEpisodeId: string | null
  activeDomain: string | null
  newlyUnlocked: string[]        // 직전 행동으로 새로 해제된 레전더리 식물 id
  activeDojoId: DojoId | null
  activeMissionId: string | null
  missionOutcome: { dojoId: DojoId; missionId: string; success: boolean; rankedUp: DojoRank | null; shihanReady: boolean } | null
  certGrand: boolean   // true=명예의 전당 인증서, false=도장 사범 인증서(activeDojoId)

  // 파생값 (편의)
  unlockedHeroes: string[]

  // 액션
  initialize: () => Promise<void>
  setScreen: (screen: Screen) => void
  createProfile: (name: string) => Promise<void>
  markGardenAwakened: () => Promise<void>
  setPendingEmotion: (type: EmotionType, intensity: number) => void
  addEntry: (entry: GardenEntry) => Promise<void>

  // 게임
  persistGame: () => Promise<void>
  awardEmpathy: (amount: number) => void
  spendEmpathy: (amount: number) => boolean
  clearEpisode: (episodeId: string) => Promise<{ heroId?: string; buildingId?: string; reward: number }>
  unlockHero: (heroId: string) => void
  buildBuilding: (buildingId: string, cost: number) => boolean
  visitArea: (area: string) => void
  recordBreathingComplete: () => void
  recordGratitude: () => void
  recordPaintedPlant: () => void
  addPaintedPlant: (colors: string[]) => void
  claimTreasure: (milestone: number) => void
  markSolomonMet: () => void
  markUnicornMet: () => void
  setLawbookVow: (episodeId: string, vow: string) => void
  setBirthday: (mmdd: string) => void
  setParentPin: (pin: string) => void
  toggleMute: (kind: 'sfx' | 'bgm' | 'voice') => void
  toggleSubtitle: () => void
  setMasterVolume: (v: number) => void
  setActiveEpisode: (id: string | null, domain?: string | null) => void
  fusePlants: (plantId: string) => Promise<string | null>  // 결과 epic 식물 id 반환
  setStudentGrade: (grade: number) => void
  exportData: () => string
  importData: (json: string) => Promise<boolean>

  // 도장 (v3.0)
  setActiveDojo: (dojoId: DojoId | null) => void
  setActiveMission: (missionId: string | null) => void
  setMissionOutcome: (o: AppState['missionOutcome']) => void
  setCertGrand: (v: boolean) => void
  completeMission: (dojoId: DojoId, missionId: string) => Promise<{ rankedUp: DojoRank | null; shihanReady: boolean }>
  recordMissionAttempt: (dojoId: DojoId, success: boolean) => void
  completeShihan: (dojoId: DojoId) => Promise<{ heroId: string; titleName: string }>

  resetAll: () => Promise<void>
}

// 출석/연속 기록 갱신 (오늘 첫 방문 시)
function recordAttendance(g: GameState): GameState {
  const today = todayString()
  if (g.lastVisitDate === today) return g
  const next = { ...g }
  if (!next.attendanceDates.includes(today)) next.attendanceDates = [...next.attendanceDates, today]
  if (next.lastVisitDate && daysBetween(next.lastVisitDate, today) === 1) next.streak += 1
  else next.streak = 1
  next.lastVisitDate = today
  return next
}

// 엔트리 추가에 따른 카운터 갱신
function applyEntryEffects(g: GameState, entry: GardenEntry): GameState {
  const today = entry.date
  const next: GameState = {
    ...g,
    emotionCounts: { ...g.emotionCounts, [entry.emotion]: g.emotionCounts[entry.emotion] + 1 }
  }
  // 공감 에너지
  const species = PLANT_BY_ID[entry.plantId]
  const ep = species?.empathyPoints ?? 1
  next.empathyEnergy += ep
  next.totalEmpathyEarned += ep

  if (entry.painted) next.paintedCount += 1

  // 연속 기쁨일
  if (entry.emotion === 'joy') {
    if (next.lastJoyDate === today) { /* 같은 날 유지 */ }
    else if (next.lastJoyDate && daysBetween(next.lastJoyDate, today) === 1) next.consecutiveJoyDays += 1
    else next.consecutiveJoyDays = 1
    next.lastJoyDate = today
  }

  // 슬픔→평온 전환
  if (g.lastEmotion === 'sad' && entry.emotion === 'calm') next.sadToCalmTransitions += 1
  // 무서움 극복 (무서움 뒤 긍정 감정)
  if (g.lastEmotion === 'fear' && ['calm', 'joy', 'proud', 'excited'].includes(entry.emotion)) next.fearOvercome += 1

  next.lastEmotion = entry.emotion
  return next
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  entries: [],
  game: defaultGameState(),
  loaded: false,
  currentScreen: 'splash',
  pendingEmotion: null,
  lastEntry: null,
  activeEpisodeId: null,
  activeDomain: null,
  newlyUnlocked: [],
  activeDojoId: null,
  activeMissionId: null,
  missionOutcome: null,
  certGrand: false,
  unlockedHeroes: [],

  initialize: async () => {
    const profile = await loadProfile()
    const entries = await loadAllEntries()
    let game = (await loadGameState()) || defaultGameState()
    game = recordAttendance(game)
    await saveGameState(game)
    set({
      profile,
      entries,
      game,
      unlockedHeroes: game.unlockedHeroes,
      loaded: true,
      currentScreen: profile ? 'garden' : 'nameInput'
    })
  },

  setScreen: (screen) => set({ currentScreen: screen }),

  createProfile: async (name) => {
    const profile: UserProfile = { name: name.trim(), createdAt: Date.now(), gardenAwakened: false }
    await saveProfile(profile)
    set({ profile, currentScreen: 'gardenAwaken' })
  },

  markGardenAwakened: async () => {
    const { profile } = get()
    if (!profile) return
    const updated = { ...profile, gardenAwakened: true }
    await saveProfile(updated)
    set({ profile: updated, currentScreen: 'garden' })
  },

  setPendingEmotion: (type, intensity) => set({ pendingEmotion: { type, intensity } }),

  addEntry: async (entry) => {
    await saveEntry(entry)
    const g0 = applyEntryEffects(get().game, entry)
    // 레전더리 신규 해제 검사
    const should = computeUnlockedLegendaries(g0)
    const fresh = should.filter(id => !g0.unlockedLegendaries.includes(id))
    const game = { ...g0, unlockedLegendaries: [...g0.unlockedLegendaries, ...fresh] }
    await saveGameState(game)
    set(state => ({
      entries: [...state.entries, entry],
      lastEntry: entry,
      game,
      newlyUnlocked: fresh
    }))
  },

  persistGame: async () => { await saveGameState(get().game) },

  awardEmpathy: (amount) => {
    const { game } = get()
    const next = { ...game, empathyEnergy: game.empathyEnergy + amount, totalEmpathyEarned: game.totalEmpathyEarned + amount }
    set({ game: next })
    void saveGameState(next)
  },

  spendEmpathy: (amount) => {
    const { game } = get()
    if (game.empathyEnergy < amount) return false
    const next = { ...game, empathyEnergy: game.empathyEnergy - amount }
    set({ game: next })
    void saveGameState(next)
    return true
  },

  clearEpisode: async (episodeId) => {
    const { game } = get()
    const hero = getHeroByEpisode(episodeId)
    const building = getBuildingByEpisode(episodeId)
    const reward = 20
    let next: GameState = { ...game }
    if (!next.clearedEpisodes.includes(episodeId)) {
      next.clearedEpisodes = [...next.clearedEpisodes, episodeId]
      next.empathyEnergy += reward
      next.totalEmpathyEarned += reward
      if (hero && !next.unlockedHeroes.includes(hero.id)) next.unlockedHeroes = [...next.unlockedHeroes, hero.id]
    }
    const should = computeUnlockedLegendaries(next)
    const fresh = should.filter(id => !next.unlockedLegendaries.includes(id))
    next = { ...next, unlockedLegendaries: [...next.unlockedLegendaries, ...fresh] }
    await saveGameState(next)
    set({ game: next, unlockedHeroes: next.unlockedHeroes, newlyUnlocked: fresh })
    return { heroId: hero?.id, buildingId: building?.id, reward }
  },

  unlockHero: (heroId) => {
    const { game } = get()
    if (game.unlockedHeroes.includes(heroId)) return
    const next = { ...game, unlockedHeroes: [...game.unlockedHeroes, heroId] }
    set({ game: next, unlockedHeroes: next.unlockedHeroes })
    void saveGameState(next)
  },

  buildBuilding: (buildingId, cost) => {
    const { game } = get()
    if (game.builtBuildings.includes(buildingId)) return true
    if (game.empathyEnergy < cost) return false
    const next = { ...game, empathyEnergy: game.empathyEnergy - cost, builtBuildings: [...game.builtBuildings, buildingId] }
    set({ game: next })
    void saveGameState(next)
    return true
  },

  visitArea: (area) => {
    const { game } = get()
    if (game.visitedAreas.includes(area)) return
    let next = { ...game, visitedAreas: [...game.visitedAreas, area] }
    const should = computeUnlockedLegendaries(next)
    const fresh = should.filter(id => !next.unlockedLegendaries.includes(id))
    next = { ...next, unlockedLegendaries: [...next.unlockedLegendaries, ...fresh] }
    set({ game: next, newlyUnlocked: fresh })
    void saveGameState(next)
  },

  recordBreathingComplete: () => {
    const { game } = get()
    let next = { ...game }
    if (game.lastEmotion === 'angry') next.angryBreathingCount += 1
    const should = computeUnlockedLegendaries(next)
    const fresh = should.filter(id => !next.unlockedLegendaries.includes(id))
    next = { ...next, unlockedLegendaries: [...next.unlockedLegendaries, ...fresh] }
    set({ game: next, newlyUnlocked: fresh })
    void saveGameState(next)
  },

  recordGratitude: () => {
    const { game } = get()
    const next = { ...game, gratitudeCount: game.gratitudeCount + 1, empathyEnergy: game.empathyEnergy + 3, totalEmpathyEarned: game.totalEmpathyEarned + 3 }
    set({ game: next })
    void saveGameState(next)
  },

  recordPaintedPlant: () => {
    const { game } = get()
    let next = { ...game, paintedCount: game.paintedCount + 1 }
    const should = computeUnlockedLegendaries(next)
    const fresh = should.filter(id => !next.unlockedLegendaries.includes(id))
    next = { ...next, unlockedLegendaries: [...next.unlockedLegendaries, ...fresh] }
    set({ game: next, newlyUnlocked: fresh })
    void saveGameState(next)
  },

  addPaintedPlant: (colors) => {
    const { game } = get()
    const plant = { id: `painted-${game.paintedPlants.length}-${game.paintedCount}`, colors, x: 0.1 + Math.random() * 0.8, y: 0.4 + Math.random() * 0.45 }
    let next = { ...game, paintedPlants: [...game.paintedPlants, plant], paintedCount: game.paintedCount + 1 }
    const should = computeUnlockedLegendaries(next)
    const fresh = should.filter(id => !next.unlockedLegendaries.includes(id))
    next = { ...next, unlockedLegendaries: [...next.unlockedLegendaries, ...fresh] }
    set({ game: next, newlyUnlocked: fresh })
    void saveGameState(next)
  },

  claimTreasure: (milestone) => {
    const { game } = get()
    if (game.treasureClaimedMilestones.includes(milestone)) return
    let next = { ...game, treasureClaimedMilestones: [...game.treasureClaimedMilestones, milestone] }
    // 30일 → 유니콘 + 다이아 식물, 21일 → 천사의 웃음꽃
    if (milestone >= 30) { next.unicornMet = true; if (!next.unlockedLegendaries.includes('diamond_joygem')) next.unlockedLegendaries = [...next.unlockedLegendaries, 'diamond_joygem'] }
    if (milestone >= 21 && !next.unlockedLegendaries.includes('angel_laughflower')) next.unlockedLegendaries = [...next.unlockedLegendaries, 'angel_laughflower']
    set({ game: next, unlockedHeroes: next.unlockedHeroes })
    void saveGameState(next)
  },

  markSolomonMet: () => {
    const { game } = get()
    if (game.solomonMet) return
    const next = { ...game, solomonMet: true, empathyEnergy: game.empathyEnergy + 1, totalEmpathyEarned: game.totalEmpathyEarned + 1 }
    set({ game: next })
    void saveGameState(next)
  },

  markUnicornMet: () => {
    const { game } = get()
    const next = { ...game, unicornMet: true }
    set({ game: next })
    void saveGameState(next)
  },

  setLawbookVow: (episodeId, vow) => {
    const { game } = get()
    const next = { ...game, lawbookVows: { ...game.lawbookVows, [episodeId]: vow } }
    set({ game: next })
    void saveGameState(next)
  },

  setBirthday: (mmdd) => {
    const { game } = get()
    const next = { ...game, birthday: mmdd }
    set({ game: next })
    void saveGameState(next)
  },

  setParentPin: (pin) => {
    const { game } = get()
    const next = { ...game, parentPin: pin }
    set({ game: next })
    void saveGameState(next)
  },

  toggleMute: (kind) => {
    const { game } = get()
    const next =
      kind === 'sfx' ? { ...game, muteSfx: !game.muteSfx }
      : kind === 'bgm' ? { ...game, muteBgm: !game.muteBgm }
      : { ...game, muteVoice: !game.muteVoice }
    set({ game: next })
    void saveGameState(next)
  },

  toggleSubtitle: () => {
    const { game } = get()
    const next = { ...game, showSubtitle: !game.showSubtitle }
    set({ game: next })
    void saveGameState(next)
  },

  setMasterVolume: (v) => {
    const { game } = get()
    const next = { ...game, masterVolume: Math.max(0, Math.min(1, v)) }
    set({ game: next })
    void saveGameState(next)
  },

  setActiveEpisode: (id, domain = null) => set({ activeEpisodeId: id, activeDomain: domain }),

  fusePlants: async (plantId) => {
    const { entries } = get()
    const sameKind = entries.filter(e => e.plantId === plantId)
    const source = PLANT_SPECIES.find(p => p.id === plantId)
    if (sameKind.length < 3 || !source) return null
    // 같은 감정의 epic 진화형 (없으면 rare)
    const evolved =
      PLANT_SPECIES.find(p => p.emotion === source.emotion && p.rarity === 'epic') ||
      PLANT_SPECIES.find(p => p.emotion === source.emotion && p.rarity === 'rare') ||
      source
    // 재료 3개 제거
    const consume = sameKind.slice(0, 3)
    for (const e of consume) await deleteEntry(e.id)
    // 진화형 1개 추가
    const newEntry: GardenEntry = {
      id: uuid(), date: todayString(), timestamp: Date.now(),
      emotion: evolved.emotion, intensity: 5, plantId: evolved.id, position: randomGardenPosition()
    }
    await saveEntry(newEntry)
    const remaining = entries.filter(e => !consume.find(c => c.id === e.id))
    set({ entries: [...remaining, newEntry], lastEntry: newEntry })
    return evolved.id
  },

  setActiveDojo: (dojoId) => set({ activeDojoId: dojoId }),
  setActiveMission: (missionId) => set({ activeMissionId: missionId }),
  setMissionOutcome: (o) => set({ missionOutcome: o }),
  setCertGrand: (v) => set({ certGrand: v }),

  recordMissionAttempt: (dojoId, success) => {
    const { game } = get()
    const p = game.dojoProgress[dojoId]
    const next = {
      ...game,
      dojoProgress: {
        ...game.dojoProgress,
        [dojoId]: { ...p, totalAttempts: p.totalAttempts + 1, totalSuccesses: p.totalSuccesses + (success ? 1 : 0) }
      }
    }
    set({ game: next })
    void saveGameState(next)
  },

  completeMission: async (dojoId, missionId) => {
    const { game } = get()
    const p = game.dojoProgress[dojoId]
    const completed = p.completedMissions.includes(missionId) ? p.completedMissions : [...p.completedMissions, missionId]

    // 현재 급수의 모든 미션을 마쳤는지 → 승급
    let currentRank = p.currentRank
    const achieved = [...p.achievedRanks]
    let rankedUp: DojoRank | null = null
    // 미션이 존재하는 급수에 대해서만 승급 처리
    let guard = 0
    while (currentRank !== 0 && guard < 12) {
      guard++
      const rankMissions = getMissionsByRank(dojoId, currentRank)
      if (rankMissions.length === 0) break
      const allDone = rankMissions.every(m => completed.includes(m.id))
      if (!allDone) break
      if (!achieved.includes(currentRank)) achieved.push(currentRank)
      rankedUp = currentRank
      currentRank = nextRank(currentRank)  // 1급 다음은 0(사범 대기)
    }

    const mission = getMissionsByRank(dojoId, p.currentRank).find(m => m.id === missionId)
    const empathyGain = mission?.rewards.empathy ?? 3

    const next: GameState = {
      ...game,
      empathyEnergy: game.empathyEnergy + empathyGain,
      totalEmpathyEarned: game.totalEmpathyEarned + empathyGain,
      dojoProgress: {
        ...game.dojoProgress,
        [dojoId]: { ...p, completedMissions: completed, currentRank, achievedRanks: achieved, totalAttempts: p.totalAttempts + 1, totalSuccesses: p.totalSuccesses + 1 }
      }
    }

    // 일일 도전 보상
    const today = todayString()
    if (missionId === getTodaysChallenge().id && next.dailyClaimedDate !== today) {
      const prev = next.dailyClaimedDate
      next.empathyEnergy += DAILY_REWARD
      next.totalEmpathyEarned += DAILY_REWARD
      next.dailyStreak = prev && daysBetween(prev, today) === 1 ? next.dailyStreak + 1 : 1
      next.dailyClaimedDate = today
      next.dailyChallengeDate = today
    }
    // 시너지 갱신
    next.unlockedSynergies = computeUnlockedSynergies(next)

    await saveGameState(next)
    set({ game: next })
    return { rankedUp, shihanReady: currentRank === 0 && !p.isShihan }
  },

  completeShihan: async (dojoId) => {
    const { game } = get()
    const dojo = DOJO_BY_ID[dojoId]
    const p = game.dojoProgress[dojoId]
    const achieved = p.achievedRanks.includes(0) ? p.achievedRanks : [...p.achievedRanks, 0]
    const titles = game.dojoTitles.includes(dojo.finalReward.titleName) ? game.dojoTitles : [...game.dojoTitles, dojo.finalReward.titleName]
    const heroes = game.unlockedHeroes.includes(dojo.finalReward.heroId) ? game.unlockedHeroes : [...game.unlockedHeroes, dojo.finalReward.heroId]
    const reward = 30
    const next: GameState = {
      ...game,
      empathyEnergy: game.empathyEnergy + reward,
      totalEmpathyEarned: game.totalEmpathyEarned + reward,
      unlockedHeroes: heroes,
      dojoTitles: titles,
      dojoProgress: { ...game.dojoProgress, [dojoId]: { ...p, isShihan: true, achievedRanks: achieved } }
    }
    next.unlockedSynergies = computeUnlockedSynergies(next)
    await saveGameState(next)
    set({ game: next, unlockedHeroes: heroes })
    return { heroId: dojo.finalReward.heroId, titleName: dojo.finalReward.titleName }
  },

  setStudentGrade: (grade) => {
    const { game } = get()
    const next = { ...game, studentGrade: grade }
    set({ game: next })
    void saveGameState(next)
  },

  exportData: () => {
    const { profile, entries, game } = get()
    return JSON.stringify({ version: 3, profile, entries, game })
  },

  importData: async (json) => {
    try {
      const data = JSON.parse(json) as { profile?: UserProfile; entries?: GardenEntry[]; game?: GameState }
      if (data.profile) await saveProfile(data.profile)
      if (data.entries) for (const e of data.entries) await saveEntry(e)
      if (data.game) await saveGameState(data.game)
      return true
    } catch {
      return false
    }
  },

  resetAll: async () => {
    await clearAllData()
    set({
      profile: null,
      entries: [],
      game: defaultGameState(),
      unlockedHeroes: [],
      lastEntry: null,
      pendingEmotion: null,
      activeEpisodeId: null,
      activeDojoId: null,
      activeMissionId: null,
      newlyUnlocked: [],
      currentScreen: 'nameInput'
    })
  }
}))
