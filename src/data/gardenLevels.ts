// 🏡 정원 레벨 시스템 (Phase 4)
// 정원을 가꿀수록 텃밭 → 천상의 정원으로 성장. XP는 마음 심기·돌보기·식물 성장에서 쌓임.

export interface GardenLevel {
  level: number
  name: string
  emoji: string
  requiredXp: number        // 이 레벨에 도달하는 누적 XP
  reward: string            // 도달 시 안내문
}

export const GARDEN_LEVELS: GardenLevel[] = [
  { level: 1, name: '작은 텃밭', emoji: '🌱', requiredXp: 0, reward: '정원 가꾸기를 시작했어요!' },
  { level: 2, name: '꽃밭', emoji: '🌷', requiredXp: 60, reward: '꽃밭이 되었어요. 장식을 놓을 수 있어요!' },
  { level: 3, name: '아담한 정원', emoji: '🌳', requiredXp: 180, reward: '정원이 넓어졌어요. 친구 생물이 찾아와요!' },
  { level: 4, name: '풍성한 정원', emoji: '🏡', requiredXp: 400, reward: '풍성한 정원! 더 멋진 장식이 열렸어요.' },
  { level: 5, name: '비밀의 정원', emoji: '🌈', requiredXp: 750, reward: '비밀의 정원에 무지개가 떴어요.' },
  { level: 6, name: '천상의 정원', emoji: '✨', requiredXp: 1300, reward: '천상의 정원! 가장 아름다운 정원을 완성했어요.' },
]

export function levelForXp(xp: number): number {
  let lvl = 1
  for (const g of GARDEN_LEVELS) {
    if (xp >= g.requiredXp) lvl = g.level
  }
  return lvl
}

export function gardenLevelInfo(level: number): GardenLevel {
  return GARDEN_LEVELS.find(g => g.level === level) ?? GARDEN_LEVELS[0]
}

// 다음 레벨까지 진행률(0~1)과 남은 XP
export function levelProgress(xp: number): { level: number; ratio: number; toNext: number; isMax: boolean } {
  const level = levelForXp(xp)
  const cur = gardenLevelInfo(level)
  const next = GARDEN_LEVELS.find(g => g.level === level + 1)
  if (!next) return { level, ratio: 1, toNext: 0, isMax: true }
  const span = next.requiredXp - cur.requiredXp
  const into = xp - cur.requiredXp
  return { level, ratio: Math.min(1, into / span), toNext: next.requiredXp - xp, isMax: false }
}

// XP 획득량 (활동별)
export const XP_REWARDS = {
  plantEmotion: 12,   // 마음(감정) 심기
  care: 3,            // 돌보기 1회
  growthStage: 6,     // 식물이 한 단계 자람
  mathCorrect: 2,     // 수학 정답
  buyDecoration: 0,   // 구매는 XP 없음
}
