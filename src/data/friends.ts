import { EmotionType } from './emotions'

export interface Friend {
  id: string
  name: string
  triggerEmotions: EmotionType[]   // 어떤 감정일 때 찾아오는지
  greeting: string                  // 등장 시 멘트
  description: string
}

// MVP 1.0: 2마리. Claude Code로 8마리 전체 확장 예정.
export const FRIENDS: Friend[] = [
  {
    id: 'comfort_rabbit',
    name: '위로 토끼',
    triggerEmotions: ['sad', 'fear'],
    greeting: '괜찮아... 내가 옆에 있어줄게.',
    description: '슬프거나 무서울 때 조용히 옆에 와서 앉아주는 친구'
  },
  {
    id: 'celebrate_butterfly',
    name: '축하 나비',
    triggerEmotions: ['joy', 'excited', 'proud'],
    greeting: '와! 오늘 정말 멋진 날이야! 같이 춤출까?',
    description: '기쁜 날 정원을 빛나비로 가득 채워주는 친구'
  }
]

export function getFriendForEmotion(emotion: EmotionType): Friend | null {
  return FRIENDS.find(f => f.triggerEmotions.includes(emotion)) || null
}
