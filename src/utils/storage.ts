import { openDB, IDBPDatabase } from 'idb'
import { EmotionType } from '../data/emotions'
import { DojoId, DojoRank } from '../data/dojos'
import type { GrowthStage } from '../data/growth'

export interface GardenEntry {
  id: string                // uuid
  date: string              // YYYY-MM-DD
  timestamp: number         // ms epoch
  emotion: EmotionType
  intensity: number         // 1~5
  note?: string
  plantId: string           // 자라난 식물 종 ID
  position: { x: number; y: number }  // 정원 내 위치 (0~1)
  painted?: boolean         // 색칠 미니게임으로 만든 식물

  // === v4.0 자라는 정원 (모두 optional → 과거 엔트리 자동 마이그레이션) ===
  stage?: GrowthStage                 // 성장 단계 (없으면 '활짝'으로 간주)
  carePoints?: number                 // 누적 돌봄 포인트
  plantedAt?: number                  // 심은 시각 (ms)
  lastWatered?: number                // 마지막 물 준 시각 (ms)
  heightCm?: number                   // 식물 키 (cm, 측정 수학용)
  growthLog?: { stage: GrowthStage; at: number }[]  // 단계 전환 기록
  nickname?: string                   // 아이가 지어준 식물 별명 (애착)
  lastCareAt?: Record<string, number> // 돌봄 종류별 마지막 사용 시각 (쿨다운)
}

export interface UserProfile {
  name: string
  createdAt: number
  gardenAwakened: boolean   // 첫 정원 깨어남 완료 여부
}

// v2.0 메타 게임 상태 (공감 에너지 · 왕국 · 진행도)
export interface GameState {
  empathyEnergy: number
  totalEmpathyEarned: number
  unlockedHeroes: string[]
  unlockedLegendaries: string[]   // 잠금 해제된 레전더리 식물 id
  builtBuildings: string[]
  clearedEpisodes: string[]
  solomonMet: boolean
  unicornMet: boolean

  // 출석 / 연속
  attendanceDates: string[]       // 고유 방문일
  streak: number
  lastVisitDate: string

  // 카운터 (레전더리 조건용)
  emotionCounts: Record<EmotionType, number>
  consecutiveJoyDays: number
  lastJoyDate: string
  lastEmotion: EmotionType | null
  sadToCalmTransitions: number
  fearOvercome: number
  angryBreathingCount: number
  visitedAreas: string[]          // 'garden' | 'kingdom' | 'collection' | 'minigames'
  gratitudeCount: number
  paintedCount: number

  // 보물상자
  treasureClaimedMilestones: number[]   // 7,14,21,30 ...

  // 설정 / 부모
  birthday?: string               // MM-DD
  parentPin?: string
  muteSfx: boolean
  muteBgm: boolean          // 배경음악 음소거 (기본 ON=음소거, 설정에서 켤 수 있음)
  muteVoice: boolean        // 캐릭터 목소리 음소거
  showSubtitle: boolean     // 자막 표시 (기본 ON, 접근성)
  masterVolume: number      // 전체 음량 0~1
  bgmDefaultMigrated: boolean  // 기존 사용자에게 'BGM 기본 OFF'를 1회 적용했는지

  // 내 법전 다짐
  lawbookVows: Record<string, string>  // episodeId -> 다짐 문장

  // 색칠 미니게임으로 만든 식물 (정원에 영구 표시)
  paintedPlants: PaintedPlant[]

  // === v3.0 솔로몬 7대 도장 ===
  dojoProgress: Record<DojoId, DojoProgressEntry>
  dojoTitles: string[]              // 획득한 사범 칭호
  unlockedSynergies: string[]       // 잠금 해제된 시너지 id
  studentGrade?: number             // 자녀 학년 (1~6), 미설정 가능

  // 일일 도전
  dailyChallengeDate: string        // 마지막으로 도전 생성/완료한 날짜
  dailyClaimedDate: string          // 보상 받은 날짜
  dailyStreak: number               // 연속 일일도전 일수

  // === v4.0 자라는 정원 (Phase 2 돌보기) ===
  careCount: number                 // 총 돌봄 횟수
  waterCount: number                // 물주기 횟수
  weedCount: number                 // 잡초 뽑기 횟수 (무당벌레 등장 조건)
  talkCount: number                 // 식물과 대화 횟수
  ownedTools: string[]              // 보유한 정원 도구 id

  // === v4.0 숨겨진 수학 (Phase 3) ===
  mathStats: Record<string, { correct: number; attempts: number }>  // 개념별 통계 (부모 리포트)
  mathTotalCorrect: number          // 누적 정답 수

  // === v4.0 정원 레벨 + 꾸미기 (Phase 4) ===
  gardenXp: number                  // 정원 경험치
  gardenLevelSeen: number           // 마지막으로 컷신을 본 정원 레벨
  ownedDecorations: string[]        // 구매한 장식 id (중복 구매 가능하도록 카운트는 placed로)
  placedDecorations: PlacedDecoration[]  // 정원에 배치된 장식
  gardenTheme: string               // 적용 중인 테마 id

  // === v4.0 살아있는 생태계 (Phase 5) ===
  seeds: number                     // 수확으로 모은 씨앗 (다시 심기/순환)
  harvestCount: number              // 누적 수확 횟수
  seenCreatures: string[]           // 처음 만난 생물 id (도감/기록)
  lastWeatherWaterDate: string      // 비 날씨 자동 물주기를 적용한 날짜

  // === v4.0 통합/폴리싱 (Phase 6) ===
  gardenTutorialSeen: boolean       // 자라는 정원 튜토리얼 완료 여부
}

export interface PlacedDecoration {
  uid: string                       // 배치 인스턴스 고유 id
  decoId: string                    // DECORATIONS의 id
  x: number                         // 0~1
  y: number                         // 0~1
}

export interface DojoProgressEntry {
  currentRank: DojoRank
  completedMissions: string[]
  achievedRanks: DojoRank[]
  isShihan: boolean
  totalAttempts: number
  totalSuccesses: number
}

export interface PaintedPlant {
  id: string
  colors: string[]   // [꽃잎, 꽃중심, 줄기, 잎] 순
  x: number
  y: number
}

export function emptyEmotionCounts(): Record<EmotionType, number> {
  return { joy: 0, sad: 0, angry: 0, fear: 0, excited: 0, proud: 0, bored: 0, calm: 0 }
}

const DOJO_IDS: DojoId[] = ['music', 'pe', 'ballet', 'history', 'korean', 'common', 'math']

export function emptyDojoProgress(): Record<DojoId, DojoProgressEntry> {
  return DOJO_IDS.reduce((acc, id) => {
    acc[id] = { currentRank: 9, completedMissions: [], achievedRanks: [], isShihan: false, totalAttempts: 0, totalSuccesses: 0 }
    return acc
  }, {} as Record<DojoId, DojoProgressEntry>)
}

export function defaultGameState(): GameState {
  return {
    empathyEnergy: 0,
    totalEmpathyEarned: 0,
    unlockedHeroes: [],
    unlockedLegendaries: [],
    builtBuildings: [],
    clearedEpisodes: [],
    solomonMet: false,
    unicornMet: false,
    attendanceDates: [],
    streak: 0,
    lastVisitDate: '',
    emotionCounts: emptyEmotionCounts(),
    consecutiveJoyDays: 0,
    lastJoyDate: '',
    lastEmotion: null,
    sadToCalmTransitions: 0,
    fearOvercome: 0,
    angryBreathingCount: 0,
    visitedAreas: [],
    gratitudeCount: 0,
    paintedCount: 0,
    treasureClaimedMilestones: [],
    muteSfx: false,
    muteBgm: true,          // 배경음악 기본 OFF (효과음·음성은 유지). 설정에서 켤 수 있음
    muteVoice: false,
    showSubtitle: true,
    masterVolume: 1,
    bgmDefaultMigrated: true,
    lawbookVows: {},
    paintedPlants: [],
    dojoProgress: emptyDojoProgress(),
    dojoTitles: [],
    unlockedSynergies: [],
    dailyChallengeDate: '',
    dailyClaimedDate: '',
    dailyStreak: 0,
    careCount: 0,
    waterCount: 0,
    weedCount: 0,
    talkCount: 0,
    ownedTools: [],
    mathStats: {},
    mathTotalCorrect: 0,
    gardenXp: 0,
    gardenLevelSeen: 1,
    ownedDecorations: [],
    placedDecorations: [],
    gardenTheme: 'default',
    seeds: 0,
    harvestCount: 0,
    seenCreatures: [],
    lastWeatherWaterDate: '',
    gardenTutorialSeen: false
  }
}

const DB_NAME = 'mind-garden-db'
const DB_VERSION = 2

let dbPromise: Promise<IDBPDatabase> | null = null

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('profile')) {
          db.createObjectStore('profile')
        }
        if (!db.objectStoreNames.contains('entries')) {
          const store = db.createObjectStore('entries', { keyPath: 'id' })
          store.createIndex('byDate', 'date')
          store.createIndex('byTimestamp', 'timestamp')
        }
        if (!db.objectStoreNames.contains('game')) {
          db.createObjectStore('game')
        }
      }
    })
  }
  return dbPromise
}

// === 프로필 ===
export async function saveProfile(profile: UserProfile): Promise<void> {
  const db = await getDB()
  await db.put('profile', profile, 'current')
}

export async function loadProfile(): Promise<UserProfile | null> {
  const db = await getDB()
  return (await db.get('profile', 'current')) || null
}

// === 정원 기록 ===
export async function saveEntry(entry: GardenEntry): Promise<void> {
  const db = await getDB()
  await db.put('entries', entry)
}

export async function loadAllEntries(): Promise<GardenEntry[]> {
  const db = await getDB()
  return await db.getAll('entries')
}

export async function loadEntriesByDate(date: string): Promise<GardenEntry[]> {
  const db = await getDB()
  return await db.getAllFromIndex('entries', 'byDate', date)
}

export async function deleteEntry(id: string): Promise<void> {
  const db = await getDB()
  await db.delete('entries', id)
}

// === 게임 상태 ===
export async function saveGameState(state: GameState): Promise<void> {
  const db = await getDB()
  await db.put('game', state, 'current')
}

export async function loadGameState(): Promise<GameState | null> {
  const db = await getDB()
  const loaded = (await db.get('game', 'current')) as GameState | undefined
  if (!loaded) return null
  // 누락 필드 보정 (마이그레이션 안전장치)
  const merged = {
    ...defaultGameState(),
    ...loaded,
    emotionCounts: { ...emptyEmotionCounts(), ...loaded.emotionCounts },
    dojoProgress: { ...emptyDojoProgress(), ...(loaded.dojoProgress || {}) }
  }
  // 'BGM 기본 OFF' 1회 마이그레이션: 아직 적용 안 된 기존 사용자는 한 번만 BGM을 끈다.
  // 이후엔 플래그가 켜져 있어 설정 토글로 자유롭게 켜고 끌 수 있다.
  if (loaded.bgmDefaultMigrated !== true) {
    merged.muteBgm = true
    merged.bgmDefaultMigrated = true
  }
  return merged
}

export async function clearAllData(): Promise<void> {
  const db = await getDB()
  await db.clear('profile')
  await db.clear('entries')
  await db.clear('game')
}
