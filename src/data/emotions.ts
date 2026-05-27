// 감정 타입 — 8가지 기본 감정
export type EmotionType =
  | 'joy'      // 기쁨
  | 'sad'      // 슬픔
  | 'angry'    // 화남
  | 'fear'     // 무서움
  | 'excited'  // 설렘
  | 'proud'    // 뿌듯
  | 'bored'    // 심심
  | 'calm'     // 평온

export interface Emotion {
  type: EmotionType
  label: string       // "기쁨"
  emoji: string       // "😊"
  color: string       // "#ffd84d"
  description: string // "행복하고 즐거운 마음"
}

export const EMOTIONS: Record<EmotionType, Emotion> = {
  joy: {
    type: 'joy',
    label: '기쁨',
    emoji: '😊',
    color: '#ffd84d',
    description: '행복하고 즐거운 마음'
  },
  sad: {
    type: 'sad',
    label: '슬픔',
    emoji: '😢',
    color: '#7eb3ff',
    description: '눈물이 날 것 같은 마음'
  },
  angry: {
    type: 'angry',
    label: '화남',
    emoji: '😠',
    color: '#ff7e7e',
    description: '속이 답답하고 욱하는 마음'
  },
  fear: {
    type: 'fear',
    label: '무서움',
    emoji: '😨',
    color: '#a78bfa',
    description: '두렵고 걱정되는 마음'
  },
  excited: {
    type: 'excited',
    label: '설렘',
    emoji: '🤩',
    color: '#ff9ec7',
    description: '두근두근 기대되는 마음'
  },
  proud: {
    type: 'proud',
    label: '뿌듯',
    emoji: '😎',
    color: '#fbbf77',
    description: '내가 자랑스러운 마음'
  },
  bored: {
    type: 'bored',
    label: '심심',
    emoji: '😑',
    color: '#9ca3af',
    description: '할 게 없고 지루한 마음'
  },
  calm: {
    type: 'calm',
    label: '평온',
    emoji: '😌',
    color: '#6ee7b7',
    description: '잔잔하고 편안한 마음'
  }
}

export const EMOTION_LIST: Emotion[] = Object.values(EMOTIONS)
