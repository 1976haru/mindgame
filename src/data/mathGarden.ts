// 🧮 숨겨진 수학 (Phase 3 · 핵심 차별화)
// 정원 활동(물방울·씨앗·꽃·열매)에 수 개념을 자연스럽게 녹인다.
// 절대 원칙: 문제집 느낌 금지 · 강요 금지(보너스) · 틀려도 따뜻한 격려 · 시각적.

export type MathConcept =
  | 'counting'        // 수 세기 (1-2학년)
  | 'addition'        // 덧셈 (1-2학년)
  | 'subtraction'     // 뺄셈 (1-2학년)
  | 'pattern'         // 패턴 (1-3학년)
  | 'multiplication'  // 곱셈 (2-4학년)
  | 'division'        // 나눗셈 (3-4학년)

export interface MathProblem {
  concept: MathConcept
  prompt: string        // 아이에게 보여줄 질문
  token: string         // 시각화 이모지 (💧 🌰 🌸 🍎)
  answer: number
  choices: number[]     // 객관식 보기 (정답 포함, 섞임)
  // 시각 토큰 표시용 (있으면 화면에 이모지로 그려줌)
  showLeft?: number
  showRight?: number
  op?: '+' | '-' | '×' | '÷'
}

export const CONCEPT_LABELS: Record<MathConcept, string> = {
  counting: '수 세기',
  addition: '덧셈',
  subtraction: '뺄셈',
  pattern: '패턴',
  multiplication: '곱셈',
  division: '나눗셈',
}

// 학년별 적용 개념 (정보 없으면 쉬운 단계부터)
export function getConceptsForGrade(grade?: number): MathConcept[] {
  const g = grade ?? 1
  if (g <= 2) return ['counting', 'addition', 'subtraction', 'pattern']
  if (g <= 4) return ['addition', 'subtraction', 'multiplication', 'division', 'pattern']
  return ['multiplication', 'division', 'pattern', 'subtraction']
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// 정답 주변의 그럴듯한 오답 보기 생성 (음수 제외, 중복 제외)
function makeChoices(answer: number, count = 4): number[] {
  const set = new Set<number>([answer])
  let guard = 0
  while (set.size < count && guard < 40) {
    guard++
    const delta = randInt(1, 3) * (Math.random() < 0.5 ? -1 : 1)
    const cand = answer + delta
    if (cand >= 0) set.add(cand)
  }
  // 부족하면 위로 채움
  let up = answer + 1
  while (set.size < count) { set.add(up); up++ }
  return shuffle([...set])
}

// 난이도 상한 (학년 기반)
function rangeFor(grade?: number): number {
  const g = grade ?? 1
  if (g <= 2) return 9
  if (g <= 4) return 20
  return 50
}

export function generateProblem(concept: MathConcept, grade?: number, token = '🌸'): MathProblem {
  const cap = rangeFor(grade)
  switch (concept) {
    case 'counting': {
      const n = randInt(3, Math.min(10, cap))
      return { concept, token, prompt: `${token}가 몇 개일까요?`, answer: n, choices: makeChoices(n), showLeft: n }
    }
    case 'addition': {
      const a = randInt(1, Math.max(2, Math.floor(cap / 2)))
      const b = randInt(1, Math.max(2, Math.floor(cap / 2)))
      return { concept, token, op: '+', prompt: `${token} ${a}개에 ${b}개를 더하면?`, answer: a + b, choices: makeChoices(a + b), showLeft: a, showRight: b }
    }
    case 'subtraction': {
      const a = randInt(2, cap)
      const b = randInt(1, a)
      return { concept, token, op: '-', prompt: `${token} ${a}개에서 ${b}개를 빼면?`, answer: a - b, choices: makeChoices(a - b), showLeft: a, showRight: b }
    }
    case 'multiplication': {
      const a = randInt(2, grade && grade >= 4 ? 9 : 5)
      const b = randInt(2, 5)
      return { concept, token, op: '×', prompt: `한 줄에 ${b}개씩 ${a}줄이면 모두 몇 개?`, answer: a * b, choices: makeChoices(a * b), showLeft: a, showRight: b }
    }
    case 'division': {
      const b = randInt(2, 5)
      const ans = randInt(2, grade && grade >= 4 ? 9 : 5)
      const a = ans * b
      return { concept, token, op: '÷', prompt: `씨앗 ${a}개를 화분 ${b}개에 똑같이 나누면 한 화분에 몇 개?`, answer: ans, choices: makeChoices(ans), showLeft: a, showRight: b }
    }
    case 'pattern': {
      const step = randInt(1, grade && grade >= 3 ? 3 : 2)
      const start = randInt(1, 4)
      const seq = [start, start + step, start + step * 2]
      const answer = start + step * 3
      return { concept, token, prompt: `${seq.join(', ')}, 다음 수는?`, answer, choices: makeChoices(answer) }
    }
  }
}

// 정원 활동별 추천 개념 + 토큰 (자연스러운 맥락 연결)
export function problemForContext(
  context: 'water' | 'seed' | 'harvest' | 'flower',
  grade?: number,
): MathProblem {
  const concepts = getConceptsForGrade(grade)
  const pick = (...prefer: MathConcept[]): MathConcept => {
    const avail = prefer.filter(c => concepts.includes(c))
    const pool = avail.length ? avail : concepts
    return pool[Math.floor(Math.random() * pool.length)]
  }
  switch (context) {
    case 'water': return generateProblem(pick('addition', 'counting'), grade, '💧')
    case 'seed': return generateProblem(pick('division', 'multiplication', 'counting'), grade, '🌰')
    case 'harvest': return generateProblem(pick('multiplication', 'counting', 'addition'), grade, '🍎')
    case 'flower': return generateProblem(pick('pattern', 'counting'), grade, '🌸')
  }
}
