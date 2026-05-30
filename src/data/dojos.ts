export type DojoId = 'music' | 'pe' | 'ballet' | 'history' | 'korean' | 'common' | 'math'
export type DojoRank = 9 | 8 | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0  // 0 = 사범

export type MissionType =
  | 'rhythm_tap'       // 리듬 탭 (음악, 체육)
  | 'pitch_match'      // 음감 (음악)
  | 'dance_sequence'   // 동작 순서 (발레)
  | 'card_match'       // 카드 매칭 (한국사, 국어)
  | 'card_order'       // 순서 맞추기 (한국사)
  | 'dictation'        // 받아쓰기 (국어)
  | 'letter_assemble'  // 글자 조립 (국어)
  | 'visual_quiz'      // 시각 퀴즈 (상식)
  | 'multiple_choice'  // 4지선다 (상식, 수학, 공통)
  | 'number_puzzle'    // 숫자 퍼즐 (수학)
  | 'pattern_match'    // 패턴 매칭 (수학)

// 4지선다/시각 퀴즈 문항
export interface QuizQuestion {
  prompt: string
  choices: string[]
  answer: number       // choices 인덱스
  explain?: string     // 정답 후 보충 설명
  emoji?: string       // 시각 보조 이모지
}

// 모든 미니게임이 공유하는 설정(엔진은 자신에게 필요한 필드만 사용).
// any 금지 — 옵셔널 필드로 표현.
export interface MissionConfig {
  // multiple_choice / visual_quiz
  questions?: QuizQuestion[]
  needCorrect?: number            // 통과에 필요한 정답 수
  // pitch_match — 들려줄 음(계이름) 후보 / 정답
  pitchRounds?: { play: string; choices: string[]; answer: number }[]
  // rhythm_tap — 박자 수, 템포(ms), 허용 오차(ms)
  beats?: number
  tempo?: number
  tolerance?: number
  // dance_sequence — 동작 시퀀스(이모지/이름)
  moves?: { id: string; label: string; emoji: string }[]
  sequence?: string[]             // moves id 순서
  // card_match — 짝
  pairs?: { a: string; b: string }[]
  // card_order — 순서대로 정렬할 항목
  orderItems?: { label: string; correctIndex: number; emoji?: string }[]
  // dictation / letter_assemble — 단어/문장
  words?: { text: string; hint?: string; syllables?: string[] }[]
}

export interface DojoMission {
  id: string
  dojoId: DojoId
  rank: DojoRank
  title: string
  description: string
  missionType: MissionType
  config: MissionConfig
  passCondition: string
  rewards: { empathy: number }
}

export interface Mentor {
  id: string
  name: string
  personality: string
  catchphrase: string
}

export interface Dojo {
  id: DojoId
  name: string
  shortName: string
  icon: string
  color: string
  mentor: Mentor
  description: string
  finalReward: {
    heroId: string
    buildingId?: string   // (미구현) 도장→왕국 건물. 현재 어떤 코드도 사용하지 않음
    titleName: string
  }
}

export const DOJOS: Dojo[] = [
  {
    id: 'music', name: '음악 도장', shortName: '음악', icon: '🎵', color: '#ff9ec7',
    mentor: { id: 'mozart_squirrel', name: '모차르트 다람쥐', personality: '활기차고 음악을 사랑하는 천재 다람쥐', catchphrase: '음악은 마음의 언어란다!' },
    description: '소리와 리듬으로 마음을 표현해요',
    finalReward: { heroId: 'sejong', titleName: '음악 도장 사범' }
  },
  {
    id: 'pe', name: '체육 도장', shortName: '체육', icon: '🏃', color: '#fbbf24',
    mentor: { id: 'lightning_rabbit', name: '번개 토끼', personality: '에너지 넘치고 도전을 사랑하는 운동 천재', catchphrase: '몸과 마음은 함께 자란단다!' },
    description: '박자와 타이밍으로 몸을 깨워요',
    finalReward: { heroId: 'yisunsin', titleName: '체육 도장 사범' }
  },
  {
    id: 'ballet', name: '발레 도장', shortName: '발레', icon: '💃', color: '#c084fc',
    mentor: { id: 'swan_princess', name: '백조 공주', personality: '우아하고 따뜻하게 이끄는 무용 선생님', catchphrase: '몸짓에도 마음이 담긴단다.' },
    description: '동작과 율동으로 아름다움을 배워요',
    finalReward: { heroId: 'shinsaimdang', titleName: '발레 도장 사범' }
  },
  {
    id: 'history', name: '한국사 도장', shortName: '한국사', icon: '📚', color: '#a16207',
    mentor: { id: 'time_owl', name: '시간 부엉이', personality: '지혜롭고 차분하게 옛이야기를 들려주는 학자', catchphrase: '과거를 알면 미래가 보인단다.' },
    description: '우리나라의 역사를 만나요',
    finalReward: { heroId: 'jeongyakyong', titleName: '한국사 도장 사범' }
  },
  {
    id: 'korean', name: '국어 도장', shortName: '국어', icon: '🇰🇷', color: '#34d399',
    mentor: { id: 'sejong_turtle', name: '세종 거북이', personality: '느긋하지만 또박또박 한글을 가르치는 선생님', catchphrase: '바른 말이 바른 마음이란다.' },
    description: '한글과 우리말을 익혀요',
    finalReward: { heroId: 'jangyeongsil', titleName: '국어 도장 사범' }
  },
  {
    id: 'common', name: '상식 도장', shortName: '상식', icon: '🌍', color: '#f97316',
    mentor: { id: 'curious_fox', name: '호기심 여우', personality: '궁금한 게 많고 똘똘한 탐험가', catchphrase: '왜 그럴까? 함께 알아봐요!' },
    description: '세상의 다양한 지식을 모아요',
    finalReward: { heroId: 'kimgu', titleName: '상식 도장 사범' }
  },
  {
    id: 'math', name: '수학 도장', shortName: '수학', icon: '🧮', color: '#3b82f6',
    mentor: { id: 'number_bear', name: '숫자 곰돌이', personality: '느긋하고 따뜻하지만 논리적인 수학 천재', catchphrase: '수학은 게임 같은 거란다!' },
    description: '숫자와 모양으로 두뇌를 깨워요',
    finalReward: { heroId: 'heojun', titleName: '수학 도장 사범' }
  }
]

export const DOJO_BY_ID: Record<DojoId, Dojo> =
  DOJOS.reduce((acc, d) => { acc[d.id] = d; return acc }, {} as Record<DojoId, Dojo>)

// 급수: 9 → 1 → 0(사범)
export const RANK_SEQUENCE: DojoRank[] = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

export function rankName(rank: DojoRank): string {
  return rank === 0 ? '사범' : `${rank}급`
}

export function nextRank(rank: DojoRank): DojoRank {
  if (rank > 1) return (rank - 1) as DojoRank
  if (rank === 1) return 0
  return 0
}
