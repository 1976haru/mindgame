import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

export const KOREAN_MISSIONS: DojoMission[] = [
  {
    id: 'korean-9', dojoId: 'korean', rank: 9, title: '한글 자음 이름', description: '자음과 이름을 짝지어요',
    missionType: 'card_match', passCondition: '모두 짝짓기', rewards: R(4),
    config: {
      pairs: [
        { a: 'ㄱ', b: '기역' },
        { a: 'ㄴ', b: '니은' },
        { a: 'ㄷ', b: '디귿' },
        { a: 'ㅁ', b: '미음' }
      ]
    }
  },
  {
    id: 'korean-8', dojoId: 'korean', rank: 8, title: '받침 찾기', description: '받침이 있는 글자를 찾아요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '받침이 있는 글자는?', choices: ['강', '가', '나', '다'], answer: 0, explain: "'강'은 받침 ㅇ이 있어요." },
        { prompt: '받침이 없는 글자는?', choices: ['바', '산', '달', '곰'], answer: 0 },
        { prompt: "'산'의 받침은 무엇일까요?", choices: ['ㄴ', 'ㅇ', 'ㄹ', 'ㅁ'], answer: 0 },
        { prompt: '받침이 있는 글자는?', choices: ['달', '바', '하', '서'], answer: 0 }
      ]
    }
  },
  {
    id: 'korean-7', dojoId: 'korean', rank: 7, title: '받아쓰기 입문', description: '소리를 듣고 글자를 맞춰요',
    missionType: 'dictation', passCondition: '5단어 중 4개', rewards: R(5),
    config: {
      needCorrect: 4,
      words: [
        { text: '사과', hint: '빨갛고 동그란 과일 🍎', syllables: ['사', '과'] },
        { text: '학교', hint: '공부하러 가는 곳 🏫', syllables: ['학', '교'] },
        { text: '친구', hint: '함께 노는 사람 🧑‍🤝‍🧑', syllables: ['친', '구'] },
        { text: '나무', hint: '숲에 자라는 것 🌳', syllables: ['나', '무'] },
        { text: '바다', hint: '넓고 파란 물 🌊', syllables: ['바', '다'] }
      ]
    }
  },
  {
    id: 'korean-6', dojoId: 'korean', rank: 6, title: '반대말 짝짓기', description: '서로 반대인 말을 짝지어요',
    missionType: 'card_match', passCondition: '모두 짝짓기', rewards: R(6),
    config: {
      pairs: [
        { a: '크다', b: '작다' },
        { a: '높다', b: '낮다' },
        { a: '빠르다', b: '느리다' },
        { a: '많다', b: '적다' }
      ]
    }
  },
  {
    id: 'korean-5', dojoId: 'korean', rank: 5, title: '받아쓰기 도전', description: '조금 더 긴 낱말을 받아써요',
    missionType: 'dictation', passCondition: '4단어 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      words: [
        { text: '무지개', hint: '비 온 뒤 하늘에 🌈', syllables: ['무', '지', '개'] },
        { text: '코끼리', hint: '코가 긴 동물 🐘', syllables: ['코', '끼', '리'] },
        { text: '도서관', hint: '책을 읽는 곳 📚', syllables: ['도', '서', '관'] },
        { text: '해바라기', hint: '해를 보는 노란 꽃 🌻', syllables: ['해', '바', '라', '기'] }
      ]
    }
  },
  {
    id: 'korean-4', dojoId: 'korean', rank: 4, title: '속담 알아맞히기', description: '속담의 빈칸을 채워요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(7),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '가는 말이 고와야 오는 말이 ___.', choices: ['곱다', '밉다', '크다', '없다'], answer: 0, explain: '내가 곱게 말하면 남도 곱게 말해줘요.' },
        { prompt: '티끌 모아 ___.', choices: ['태산', '바다', '구름', '모래'], answer: 0, explain: '작은 것도 모으면 큰 것이 돼요.' },
        { prompt: '발 없는 말이 ___ 간다.', choices: ['천 리', '한 발', '바다', '하늘'], answer: 0, explain: '소문은 빠르게 퍼져요.' },
        { prompt: '백지장도 맞들면 ___.', choices: ['낫다', '무겁다', '찢어진다', '없다'], answer: 0, explain: '쉬운 일도 함께하면 더 쉬워요.' }
      ]
    }
  },
  {
    id: 'korean-3', dojoId: 'korean', rank: 3, title: '사자성어', description: '사자성어와 뜻을 짝지어요',
    missionType: 'card_match', passCondition: '모두 짝짓기', rewards: R(8),
    config: {
      pairs: [
        { a: '일석이조', b: '한 번에 두 가지 이득' },
        { a: '유비무환', b: '미리 준비하면 걱정 없음' },
        { a: '다다익선', b: '많을수록 더 좋음' },
        { a: '우공이산', b: '꾸준히 하면 이뤄냄' }
      ]
    }
  },
  {
    id: 'korean-2', dojoId: 'korean', rank: 2, title: '바른 맞춤법', description: '맞춤법에 맞는 말을 골라요',
    missionType: 'multiple_choice', passCondition: '4문제 중 4개', rewards: R(9),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '바르게 쓴 것은?', choices: ['깨끗이', '깨끗히'], answer: 0 },
        { prompt: '바르게 쓴 것은?', choices: ['며칠', '몇일'], answer: 0 },
        { prompt: '바르게 쓴 것은?', choices: ['역할', '역활'], answer: 0 },
        { prompt: '바르게 쓴 것은?', choices: ['오랜만에', '오랫만에'], answer: 0 }
      ]
    }
  },
  {
    id: 'korean-1', dojoId: 'korean', rank: 1, title: '낱말의 힘', description: '비슷한 말과 반대말을 모두 맞혀요',
    missionType: 'multiple_choice', passCondition: '5문제 중 4개', rewards: R(10),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: "'기쁘다'와 비슷한 말은?", choices: ['즐겁다', '슬프다', '무섭다', '춥다'], answer: 0 },
        { prompt: "'시작'의 반대말은?", choices: ['끝', '처음', '중간', '앞'], answer: 0 },
        { prompt: "'아름답다'와 비슷한 말은?", choices: ['예쁘다', '더럽다', '크다', '빠르다'], answer: 0 },
        { prompt: "'밝다'의 반대말은?", choices: ['어둡다', '넓다', '높다', '굵다'], answer: 0 },
        { prompt: "'용감하다'와 비슷한 말은?", choices: ['씩씩하다', '무섭다', '약하다', '조용하다'], answer: 0 }
      ]
    }
  }
]
