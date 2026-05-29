import { openDB, IDBPDatabase } from 'idb'
import { EmotionType } from '../data/emotions'

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
  muteBgm: boolean

  // 내 법전 다짐
  lawbookVows: Record<string, string>  // episodeId -> 다짐 문장

  // 색칠 미니게임으로 만든 식물 (정원에 영구 표시)
  paintedPlants: PaintedPlant[]
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
    muteBgm: false,
    lawbookVows: {},
    paintedPlants: []
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
  return { ...defaultGameState(), ...loaded, emotionCounts: { ...emptyEmotionCounts(), ...loaded.emotionCounts } }
}

export async function clearAllData(): Promise<void> {
  const db = await getDB()
  await db.clear('profile')
  await db.clear('entries')
  await db.clear('game')
}
