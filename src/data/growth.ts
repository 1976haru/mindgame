// 🌱 식물 성장 시스템 (Phase 1)
// 씨앗 → 새싹 → 줄기 → 꽃봉오리 → 활짝 → 열매 (6단계)
// 절대 원칙: 식물은 죽지 않는다. 안 돌보면 '시들기'만 하고, 물을 주면 회복.
import type { GardenEntry } from '../utils/storage'

export type GrowthStage = 'seed' | 'sprout' | 'stem' | 'bud' | 'bloom' | 'fruit'

export interface GrowthStageInfo {
  stage: GrowthStage
  name: string
  order: number
  description: string
}

export const GROWTH_STAGES: GrowthStageInfo[] = [
  { stage: 'seed', name: '씨앗', order: 0, description: '작은 씨앗이 흙 속에 잠들어 있어요' },
  { stage: 'sprout', name: '새싹', order: 1, description: '여린 새싹이 흙을 뚫고 나왔어요' },
  { stage: 'stem', name: '줄기', order: 2, description: '줄기가 쑥쑥 자라고 잎이 났어요' },
  { stage: 'bud', name: '꽃봉오리', order: 3, description: '곧 피어날 꽃봉오리가 맺혔어요' },
  { stage: 'bloom', name: '활짝', order: 4, description: '아름다운 꽃이 활짝 피었어요!' },
  { stage: 'fruit', name: '열매', order: 5, description: '열매가 맺혀 씨앗을 품었어요' },
]

export const STAGE_BY_ID: Record<GrowthStage, GrowthStageInfo> = GROWTH_STAGES.reduce(
  (acc, s) => { acc[s.stage] = s; return acc },
  {} as Record<GrowthStage, GrowthStageInfo>,
)

// 다음 단계로 자라기 위한 누적 조건 (돌봄 포인트 + 심은 뒤 누적 시간)
export const STAGE_REQUIREMENTS: Record<GrowthStage, { care: number; minHours: number }> = {
  seed: { care: 0, minHours: 0 },
  sprout: { care: 3, minHours: 1 },
  stem: { care: 6, minHours: 4 },
  bud: { care: 10, minHours: 12 },
  bloom: { care: 15, minHours: 24 },
  fruit: { care: 20, minHours: 48 },
}

// 건강 상태 (시들지만 절대 죽지 않음)
export type HealthState = 'thriving' | 'healthy' | 'thirsty' | 'wilting'

export const HEALTH_STATES: Record<HealthState, { name: string; emoji: string; needsCare: boolean; color: string }> = {
  thriving: { name: '활짝', emoji: '✨', needsCare: false, color: '#5eebb7' },
  healthy: { name: '건강', emoji: '🌿', needsCare: false, color: '#6ee7b7' },
  thirsty: { name: '목말라요', emoji: '💧', needsCare: true, color: '#7eb3ff' },
  wilting: { name: '시들시들', emoji: '🥀', needsCare: true, color: '#9ca3af' },
}

const HOUR = 1000 * 60 * 60

// === 접근자 (구버전 엔트리 안전 기본값) ===
// 성장 필드가 없는 과거 엔트리는 이미 '활짝' 핀 것으로 간주 → 기존 정원 모습 보존.
export function entryStage(entry: GardenEntry): GrowthStage {
  return entry.stage ?? 'bloom'
}

export function entryCarePoints(entry: GardenEntry): number {
  return entry.carePoints ?? 0
}

export function entryPlantedAt(entry: GardenEntry): number {
  return entry.plantedAt ?? entry.timestamp
}

export function entryHeight(entry: GardenEntry): number {
  return entry.heightCm ?? 0
}

export function stageOrder(stage: GrowthStage): number {
  return STAGE_BY_ID[stage].order
}

export function nextStage(stage: GrowthStage): GrowthStage | null {
  const idx = GROWTH_STAGES.findIndex(s => s.stage === stage)
  if (idx < 0 || idx >= GROWTH_STAGES.length - 1) return null
  return GROWTH_STAGES[idx + 1].stage
}

// 다음 단계로 자랄 수 있는가? (돌봄 + 시간 누적 조건 충족)
export function canAdvance(entry: GardenEntry, now: number = Date.now()): boolean {
  const cur = entryStage(entry)
  const next = nextStage(cur)
  if (!next) return false
  const req = STAGE_REQUIREMENTS[next]
  const hours = (now - entryPlantedAt(entry)) / HOUR
  return entryCarePoints(entry) >= req.care && hours >= req.minHours
}

// 한 단계 성장시킨 새 엔트리를 반환 (불변). 자랄 수 없으면 그대로 반환.
export function advanceGrowth(entry: GardenEntry, now: number = Date.now()): GardenEntry {
  if (!canAdvance(entry, now)) return entry
  const next = nextStage(entryStage(entry))!
  const grown = Math.floor(Math.random() * 5) + 3 // 3~7cm
  return {
    ...entry,
    stage: next,
    heightCm: entryHeight(entry) + grown,
    growthLog: [...(entry.growthLog ?? []), { stage: next, at: now }],
  }
}

// 가능한 만큼 여러 단계 한 번에 성장 (오래 비웠다 돌아온 경우)
export function growToCurrent(entry: GardenEntry, now: number = Date.now()): GardenEntry {
  let e = entry
  let guard = 0
  while (canAdvance(e, now) && guard < GROWTH_STAGES.length) {
    e = advanceGrowth(e, now)
    guard++
  }
  return e
}

// 건강 상태 계산 (물 준 뒤 경과 시간 기반, 단 절대 죽지 않음 → 최악도 wilting)
export function calculateHealth(entry: GardenEntry, now: number = Date.now()): HealthState {
  if (entry.lastWatered == null) return 'healthy' // 구버전/방금 심음 → punish 금지
  const hours = (now - entry.lastWatered) / HOUR
  if (hours < 6) return 'thriving'
  if (hours < 24) return 'healthy'
  if (hours < 72) return 'thirsty'
  return 'wilting'
}

// 기존 식물 SVG의 growProgress(0~1) 프롭과 성장 단계 매핑
export function growProgressForStage(stage: GrowthStage): number {
  switch (stage) {
    case 'seed': return 0
    case 'sprout': return 0.2
    case 'stem': return 0.45
    case 'bud': return 0.7
    case 'bloom': return 1
    case 'fruit': return 1
  }
}
