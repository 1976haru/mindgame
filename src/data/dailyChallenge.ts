import { ALL_MISSIONS } from './missions'
import { DojoMission } from './dojos'
import { todayString } from '../utils/helpers'

// 날짜 기반 결정적 선택 (같은 날에는 항상 같은 도전)
export function getTodaysChallenge(dateStr: string = todayString()): DojoMission {
  let h = 0
  for (const ch of dateStr) h = (h * 31 + ch.charCodeAt(0)) % 1000000
  return ALL_MISSIONS[h % ALL_MISSIONS.length]
}

export const DAILY_REWARD = 5
