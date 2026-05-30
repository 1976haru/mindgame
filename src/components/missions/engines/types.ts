import { MissionConfig } from '../../../data/dojos'

export interface EngineResult {
  score: number
  total: number
}

export interface EngineProps {
  config: MissionConfig
  color: string
  onComplete: (success: boolean, result?: EngineResult) => void
}
