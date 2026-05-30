import { DojoMission, DojoId, DojoRank, RANK_SEQUENCE } from '../dojos'
import { MUSIC_MISSIONS } from './musicMissions'
import { PE_MISSIONS } from './peMissions'
import { BALLET_MISSIONS } from './balletMissions'
import { HISTORY_MISSIONS } from './historyMissions'
import { KOREAN_MISSIONS } from './koreanMissions'
import { COMMON_MISSIONS } from './commonMissions'
import { MATH_MISSIONS } from './mathMissions'

export const ALL_MISSIONS: DojoMission[] = [
  ...MUSIC_MISSIONS, ...PE_MISSIONS, ...BALLET_MISSIONS,
  ...HISTORY_MISSIONS, ...KOREAN_MISSIONS, ...COMMON_MISSIONS, ...MATH_MISSIONS
]

export const MISSION_BY_ID: Record<string, DojoMission> =
  ALL_MISSIONS.reduce((acc, m) => { acc[m.id] = m; return acc }, {} as Record<string, DojoMission>)

export function getMission(id: string): DojoMission | undefined {
  return MISSION_BY_ID[id]
}

export function getMissions(dojoId: DojoId): DojoMission[] {
  return ALL_MISSIONS.filter(m => m.dojoId === dojoId)
}

export function getMissionsByRank(dojoId: DojoId, rank: DojoRank): DojoMission[] {
  return ALL_MISSIONS.filter(m => m.dojoId === dojoId && m.rank === rank)
}

// 해당 도장에서 미션이 존재하는 급수만 (트리 표시용)
export function ranksWithMissions(dojoId: DojoId): DojoRank[] {
  return RANK_SEQUENCE.filter(r => getMissionsByRank(dojoId, r).length > 0)
}
