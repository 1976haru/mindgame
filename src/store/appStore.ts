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
  toggleMute: (kind: 'sfx' | 'bgm') => void
  setActiveEpisode: (id: string | null, domain?: string | null) => void
  fusePlants: (plantId: string) => Promise<string | null>  // 결과 epic 식물 id 반환
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
    const next = kind === 'sfx' ? { ...game, muteSfx: !game.muteSfx } : { ...game, muteBgm: !game.muteBgm }
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
      newlyUnlocked: [],
      currentScreen: 'nameInput'
    })
  }
}))
