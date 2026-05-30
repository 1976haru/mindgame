import { MissionConfig } from '../../../data/dojos'

export interface EngineResult {
  score: number
  total: number
}

export interface EngineProps {
  config: MissionConfig
  color: string
  onComplete: (success: boolean, result?: EngineResult) => void
  missionId?: string   // 미션 안내 음성(mission_{id}_q{n}) 재생용
  mentorId?: string    // 정답/오답 반응 음성(react_{mentor}_...) 재생용
}
