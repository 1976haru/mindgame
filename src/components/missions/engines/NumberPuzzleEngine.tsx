import { EngineProps } from './types'
import { MultipleChoiceEngine } from './MultipleChoiceEngine'

// 숫자 퍼즐 / 패턴 매칭 — 시각 보조가 있는 4지선다 기반.
// (config.questions 의 prompt/emoji 로 패턴·도형·연산 문제를 표현)
export function NumberPuzzleEngine(props: EngineProps) {
  return <MultipleChoiceEngine {...props} />
}
