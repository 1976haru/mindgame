import { create } from 'zustand'

// 음성 재생과 동기화되는 자막 상태 (전역, 화면 위에 항상 떠 있음).
interface SubtitleState {
  text: string
  speaker: string // 캐릭터 이름 (없으면 빈 문자열)
  visible: boolean
  show: (text: string, speaker?: string) => void
  hide: () => void
}

export const useSubtitleStore = create<SubtitleState>((set) => ({
  text: '',
  speaker: '',
  visible: false,
  show: (text, speaker = '') => set({ text, speaker, visible: true }),
  hide: () => set({ visible: false }),
}))
