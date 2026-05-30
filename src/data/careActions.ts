// 🌿 돌보기 시스템 (Phase 2 · 원예치료 핵심)
// 돌보기 = 정서 안정 + 생명 존중. 각 행동에 따뜻한 원예치료 메시지가 따라온다.
import { EmotionType } from './emotions'
import type { GrowthStage } from './growth'
import type { GardenEntry } from '../utils/storage'

export type CareType = 'water' | 'sunlight' | 'weed' | 'talk' | 'fertilize'

export interface CareAction {
  type: CareType
  name: string
  icon: string
  description: string
  carePoints: number        // 성장에 기여하는 양
  cooldownMinutes: number   // 재사용 대기시간
  empathyCost: number       // 필요한 공감 에너지 (0 = 무료)
  therapyMessage: string    // 원예치료 메시지
}

export const CARE_ACTIONS: Record<CareType, CareAction> = {
  water: {
    type: 'water', name: '물주기', icon: '💧',
    description: '식물에게 시원한 물을 주어요',
    carePoints: 2, cooldownMinutes: 60, empathyCost: 0,
    therapyMessage: '식물도 너처럼 물이 필요해. 돌봐줘서 고마워!',
  },
  sunlight: {
    type: 'sunlight', name: '햇빛 쬐기', icon: '☀️',
    description: '따뜻한 햇빛을 비춰주어요',
    carePoints: 2, cooldownMinutes: 120, empathyCost: 0,
    therapyMessage: '햇빛을 받으면 식물도 기분이 좋아진대. 너도 가끔 햇볕을 쬐어봐.',
  },
  weed: {
    type: 'weed', name: '잡초 뽑기', icon: '🌿',
    description: '식물을 괴롭히는 잡초를 뽑아요',
    carePoints: 3, cooldownMinutes: 180, empathyCost: 0,
    therapyMessage: '마음속 걱정도 잡초처럼 가끔 뽑아주면 좋아.',
  },
  talk: {
    type: 'talk', name: '말 걸기', icon: '💬',
    description: '식물에게 다정하게 말을 걸어요',
    carePoints: 1, cooldownMinutes: 30, empathyCost: 0,
    therapyMessage: '식물에게 오늘 있었던 일을 이야기해볼래?',
  },
  fertilize: {
    type: 'fertilize', name: '영양주기', icon: '🌱',
    description: '공감 에너지로 영양분을 주어요',
    carePoints: 5, cooldownMinutes: 360, empathyCost: 3,
    therapyMessage: '사랑을 주면 더 잘 자란단다.',
  },
}

export const CARE_LIST: CareAction[] = Object.values(CARE_ACTIONS)

// === 쿨다운 ===
// 남은 대기 시간(ms). 0이면 바로 돌볼 수 있음.
export function careCooldownRemaining(entry: GardenEntry, type: CareType, now: number = Date.now()): number {
  const last = entry.lastCareAt?.[type]
  if (last == null) return 0
  const cd = CARE_ACTIONS[type].cooldownMinutes * 60 * 1000
  return Math.max(0, last + cd - now)
}

export function canCare(entry: GardenEntry, type: CareType, now: number = Date.now()): boolean {
  return careCooldownRemaining(entry, type, now) === 0
}

// 쿨다운 사람이 읽기 좋은 문자열 ("23분", "1시간")
export function formatCooldown(ms: number): string {
  const min = Math.ceil(ms / 60000)
  if (min < 60) return `${min}분`
  return `${Math.ceil(min / 60)}시간`
}

// === 식물과 대화 (감정별 따뜻한 대사) ===
// 그날 심은 감정 + 성장 단계 기반. 아이의 감정 표현을 격려.
export const TALK_LINES: Record<EmotionType, string[]> = {
  joy: ['오늘 기분 좋았구나! 나도 너 덕분에 쑥쑥 자라!', '네가 웃으면 내 꽃잎도 활짝 펴져.'],
  sad: ['슬펐구나... 나도 비 오는 날을 좋아해. 천천히 자랄게.', '괜찮아, 울어도 돼. 내가 곁에 있어줄게.'],
  angry: ['화가 났었구나. 후~ 하고 같이 숨을 쉬어볼까?', '속상했지? 잡초를 뽑으면 마음도 시원해져.'],
  fear: ['무서웠구나. 내가 지켜줄게, 걱정 마.', '어두워도 괜찮아. 곧 아침이 올 거야.'],
  excited: ['두근두근! 무슨 좋은 일이 기다리고 있어?', '설레는 마음, 나한테도 들려줘!'],
  proud: ['정말 잘했구나! 네가 자랑스러워.', '뿌듯한 날이네. 나도 어깨가 으쓱해져.'],
  bored: ['심심했구나. 나랑 같이 하늘을 구경할래?', '천천히 가도 괜찮아. 기다림도 멋진 거야.'],
  calm: ['마음이 편안하구나. 나도 잔잔해지는 기분이야.', '고요한 날엔 잎사귀 소리가 잘 들려.'],
}

export function getPlantTalk(emotion: EmotionType, stage: GrowthStage): string {
  const lines = TALK_LINES[emotion]
  // 단계가 높을수록 뒤쪽(성숙한) 대사
  const idx = stage === 'seed' || stage === 'sprout' ? 0 : Math.min(lines.length - 1, 1)
  return lines[idx]
}

// 식물 대화 음성 clipId (getPlantTalk과 동일한 대사 선택). 음성: 위로 토끼.
export function plantTalkClipId(emotion: EmotionType, stage: GrowthStage): string {
  const idx = stage === 'seed' || stage === 'sprout' ? 0 : 1
  return `plant_${emotion}_${idx + 1}`
}

// 아이가 식물에게 답하는 선택지 (감정 표현 연습)
export const TALK_REPLIES: { text: string; back: string }[] = [
  { text: '응, 고마워', back: '천만에! 우리 같이 자라자 🌱' },
  { text: '오늘은 좀 힘들었어', back: '힘들었구나. 토닥토닥, 내일은 더 나을 거야.' },
  { text: '내일 또 올게', back: '약속! 기다리고 있을게 💚' },
]
