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
}

export interface UserProfile {
  name: string
  createdAt: number
  gardenAwakened: boolean   // 첫 정원 깨어남 완료 여부
}

const DB_NAME = 'mind-garden-db'
const DB_VERSION = 1

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

export async function clearAllData(): Promise<void> {
  const db = await getDB()
  await db.clear('profile')
  await db.clear('entries')
}
