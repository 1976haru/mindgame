import { DojoId } from './dojos'
import { GameState } from '../utils/storage'

export interface Synergy {
  id: string
  name: string
  icon: string
  requirements: { dojoId: DojoId; minRank: number }[]  // minRank: 해당 급수(숫자) 이하 달성
  reward: string
}

export const SYNERGIES: Synergy[] = [
  { id: 'rhythm_master', name: '리듬 마스터', icon: '🎶', reward: '음악·체육 멘토의 응원', requirements: [{ dojoId: 'music', minRank: 5 }, { dojoId: 'pe', minRank: 5 }] },
  { id: 'storyteller', name: '이야기꾼', icon: '📖', reward: '한국사·국어 보너스', requirements: [{ dojoId: 'history', minRank: 5 }, { dojoId: 'korean', minRank: 5 }] },
  { id: 'little_genius', name: '똑똑한 탐험가', icon: '🧠', reward: '상식·수학 보너스', requirements: [{ dojoId: 'common', minRank: 5 }, { dojoId: 'math', minRank: 5 }] },
  { id: 'artist', name: '예술가의 혼', icon: '🎨', reward: '발레·음악 보너스', requirements: [{ dojoId: 'ballet', minRank: 5 }, { dojoId: 'music', minRank: 5 }] },
  { id: 'all_rounder', name: '만능 수련생', icon: '🌟', reward: '7개 도장 모두 3급 달성!', requirements: [{ dojoId: 'music', minRank: 3 }, { dojoId: 'pe', minRank: 3 }, { dojoId: 'ballet', minRank: 3 }, { dojoId: 'history', minRank: 3 }, { dojoId: 'korean', minRank: 3 }, { dojoId: 'common', minRank: 3 }, { dojoId: 'math', minRank: 3 }] }
]

// 해당 도장이 minRank(숫자) 이하 급수를 달성했는지 (낮은 숫자 = 높은 급수)
function reachedRank(g: GameState, dojoId: DojoId, minRank: number): boolean {
  const p = g.dojoProgress[dojoId]
  if (p.isShihan) return true
  return p.achievedRanks.some(r => r !== 0 && r <= minRank)
}

export function isSynergyMet(g: GameState, s: Synergy): boolean {
  return s.requirements.every(req => reachedRank(g, req.dojoId, req.minRank))
}

export function computeUnlockedSynergies(g: GameState): string[] {
  return SYNERGIES.filter(s => isSynergyMet(g, s)).map(s => s.id)
}
