import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

// 초등 교과서 수준의 정확한 사실만 사용.
export const HISTORY_MISSIONS: DojoMission[] = [
  {
    id: 'history-9', dojoId: 'history', rank: 9, title: '우리나라 첫걸음', description: '가장 오래된 우리 역사를 배워요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '우리나라 첫 나라 고조선을 세운 사람은?', choices: ['단군왕검', '세종대왕', '이순신', '왕건'], answer: 0 },
        { prompt: '옛날 삼국시대의 세 나라가 아닌 것은?', choices: ['고려', '고구려', '백제', '신라'], answer: 0, explain: '삼국은 고구려·백제·신라예요. 고려는 그 뒤의 나라예요.' },
        { prompt: '고조선의 건국 이야기에 나오는 동물은?', emoji: '🐻', choices: ['곰과 호랑이', '용과 거북이', '사자와 토끼', '말과 소'], answer: 0 },
        { prompt: '삼국 중 가장 북쪽에 있던 큰 나라는?', choices: ['고구려', '백제', '신라', '가야'], answer: 0 }
      ]
    }
  },
  {
    id: 'history-8', dojoId: 'history', rank: 8, title: '삼국시대 영웅', description: '삼국시대 인물과 한 일을 짝지어요',
    missionType: 'card_match', passCondition: '모두 짝짓기', rewards: R(5),
    config: {
      pairs: [
        { a: '주몽', b: '고구려를 세움' },
        { a: '온조', b: '백제를 세움' },
        { a: '박혁거세', b: '신라를 세움' },
        { a: '광개토대왕', b: '고구려를 크게 넓힘' }
      ]
    }
  },
  {
    id: 'history-7', dojoId: 'history', rank: 7, title: '신라의 통일', description: '나라가 합쳐진 순서를 맞춰요',
    missionType: 'card_order', passCondition: '순서대로 정렬', rewards: R(5),
    config: {
      orderItems: [
        { label: '삼국(고구려·백제·신라)으로 나뉨', correctIndex: 0, emoji: '🗺️' },
        { label: '신라가 삼국을 통일함', correctIndex: 1, emoji: '🤝' },
        { label: '통일신라가 됨', correctIndex: 2, emoji: '👑' }
      ]
    }
  },
  {
    id: 'history-6', dojoId: 'history', rank: 6, title: '고려 시대', description: '고려의 인물과 자랑거리를 알아봐요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '고려를 세운 사람은?', choices: ['왕건', '주몽', '이성계', '단군'], answer: 0 },
        { prompt: '거란의 침입을 물리친 고려의 장군은?', choices: ['강감찬', '이순신', '김유신', '을지문덕'], answer: 0, explain: '강감찬 장군의 귀주대첩이에요.' },
        { prompt: '고려의 자랑스러운 푸른 빛 도자기는?', emoji: '🏺', choices: ['고려청자', '백자', '항아리', '질그릇'], answer: 0 },
        { prompt: '몽골 침입 때 부처의 힘으로 나라를 지키려 만든 것은?', choices: ['팔만대장경', '거북선', '측우기', '첨성대'], answer: 0 }
      ]
    }
  },
  {
    id: 'history-5', dojoId: 'history', rank: 5, title: '조선 왕 순서', description: '조선 임금을 순서대로 정렬해요',
    missionType: 'card_order', passCondition: '순서대로 정렬', rewards: R(7),
    config: {
      orderItems: [
        { label: '태조 (조선을 세움)', correctIndex: 0, emoji: '👑' },
        { label: '태종', correctIndex: 1, emoji: '🤴' },
        { label: '세종', correctIndex: 2, emoji: '📜' },
        { label: '세조', correctIndex: 3, emoji: '⚔️' },
        { label: '성종', correctIndex: 4, emoji: '📖' }
      ]
    }
  },
  {
    id: 'history-4', dojoId: 'history', rank: 4, title: '세종대왕', description: '세종대왕의 업적을 알아봐요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(7),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '한글을 만든 임금은?', choices: ['세종대왕', '태조', '광개토대왕', '정조'], answer: 0 },
        { prompt: '한글의 처음 이름은?', choices: ['훈민정음', '한자', '향찰', '이두'], answer: 0, explain: '"백성을 가르치는 바른 소리"라는 뜻이에요.' },
        { prompt: '비가 내린 양을 재는 세종 때의 기구는?', emoji: '🌧️', choices: ['측우기', '거북선', '첨성대', '물레방아'], answer: 0 },
        { prompt: '세종이 학자들과 함께 연구하던 곳은?', choices: ['집현전', '서당', '향교', '성균관'], answer: 0 }
      ]
    }
  },
  {
    id: 'history-3', dojoId: 'history', rank: 3, title: '임진왜란', description: '이순신 장군의 활약을 배워요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(8),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '임진왜란 때 바다에서 나라를 지킨 장군은?', choices: ['이순신', '강감찬', '김유신', '권율'], answer: 0 },
        { prompt: '이순신 장군이 만든 거북 모양 배는?', emoji: '🐢', choices: ['거북선', '판옥선', '나룻배', '뗏목'], answer: 0 },
        { prompt: '명량해전에서 이순신의 배는 몇 척이었나요?', choices: ['12척', '100척', '50척', '300척'], answer: 0, explain: '12척으로 큰 적을 막아낸 기적이에요.' },
        { prompt: '학의 날개처럼 적을 감싸는 이순신의 전법은?', choices: ['학익진', '돌격진', '거북진', '방패진'], answer: 0, explain: '한산도대첩에서 크게 활약한 전법이에요.' }
      ]
    }
  },
  {
    id: 'history-2', dojoId: 'history', rank: 2, title: '나라를 되찾은 분들', description: '독립을 위해 애쓴 분들을 짝지어요',
    missionType: 'card_match', passCondition: '모두 짝짓기', rewards: R(9),
    config: {
      pairs: [
        { a: '유관순', b: '3·1 운동에 앞장섬' },
        { a: '김구', b: '대한민국 임시정부를 이끔' },
        { a: '안중근', b: '나라를 위해 큰 뜻을 펼침' },
        { a: '윤봉길', b: '상하이에서 의거를 함' }
      ]
    }
  },
  {
    id: 'history-1', dojoId: 'history', rank: 1, title: '대한민국', description: '광복 이후 일들을 순서대로 정렬해요',
    missionType: 'card_order', passCondition: '순서대로 정렬', rewards: R(10),
    config: {
      orderItems: [
        { label: '광복 (1945년, 나라를 되찾음)', correctIndex: 0, emoji: '🎉' },
        { label: '6·25 전쟁 (1950년)', correctIndex: 1, emoji: '🕊️' },
        { label: '4·19 혁명 (1960년)', correctIndex: 2, emoji: '✊' },
        { label: '6월 민주항쟁 (1987년)', correctIndex: 3, emoji: '🗳️' }
      ]
    }
  }
]
