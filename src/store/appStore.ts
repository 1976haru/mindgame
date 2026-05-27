import { create } from 'zustand'
import {
  UserProfile,
  GardenEntry,
  saveProfile,
  loadProfile,
  saveEntry,
  loadAllEntries
} from '../utils/storage'

export type Screen =
  | 'splash'           // 첫 로딩
  | 'nameInput'        // 이름 입력
  | 'gardenAwaken'     // 정원 깨어남 (와! ①)
  | 'garden'           // 메인 정원
  | 'emotionSelect'    // 감정 선택
  | 'intensitySelect'  // 강도 선택
  | 'plantGrowing'     // 식물 자람 (와! ②)
  | 'friendVisit'      // 친구 등장 (와! ③)
  | 'breathing'        // 호흡 풍선 미니게임

interface AppState {
  // 데이터
  profile: UserProfile | null
  entries: GardenEntry[]
  loaded: boolean

  // 화면 상태
  currentScreen: Screen
  pendingEmotion: { type: import('../data/emotions').EmotionType; intensity: number } | null
  lastEntry: GardenEntry | null

  // 액션
  initialize: () => Promise<void>
  setScreen: (screen: Screen) => void
  createProfile: (name: string) => Promise<void>
  markGardenAwakened: () => Promise<void>
  setPendingEmotion: (type: import('../data/emotions').EmotionType, intensity: number) => void
  addEntry: (entry: GardenEntry) => Promise<void>
}

export const useAppStore = create<AppState>((set, get) => ({
  profile: null,
  entries: [],
  loaded: false,
  currentScreen: 'splash',
  pendingEmotion: null,
  lastEntry: null,

  initialize: async () => {
    const profile = await loadProfile()
    const entries = await loadAllEntries()
    set({
      profile,
      entries,
      loaded: true,
      currentScreen: profile ? 'garden' : 'nameInput'
    })
  },

  setScreen: (screen) => set({ currentScreen: screen }),

  createProfile: async (name) => {
    const profile: UserProfile = {
      name: name.trim(),
      createdAt: Date.now(),
      gardenAwakened: false
    }
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

  setPendingEmotion: (type, intensity) =>
    set({ pendingEmotion: { type, intensity } }),

  addEntry: async (entry) => {
    await saveEntry(entry)
    set(state => ({
      entries: [...state.entries, entry],
      lastEntry: entry
    }))
  }
}))
