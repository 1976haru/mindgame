import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

export const COMMON_MISSIONS: DojoMission[] = [
  {
    id: 'common-9', dojoId: 'common', rank: 9, title: '우리 주변', description: '생활 속 약속을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '빨간 신호등은 무슨 뜻일까요?', emoji: '🔴', choices: ['멈춰요', '건너요', '뛰어요', '돌아요'], answer: 0 },
        { prompt: '불이 났을 때 거는 전화번호는?', emoji: '🚒', choices: ['119', '112', '114', '100'], answer: 0 },
        { prompt: '도둑이나 위험할 때 거는 번호는?', emoji: '🚓', choices: ['112', '119', '114', '120'], answer: 0 },
        { prompt: '길을 건널 때 이용하는 곳은?', emoji: '🚸', choices: ['횡단보도', '찻길 한가운데', '주차장', '지붕'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-8', dojoId: 'common', rank: 8, title: '자연 이야기', description: '계절과 하늘을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '봄 다음에 오는 계절은?', emoji: '🌸', choices: ['여름', '가을', '겨울', '봄'], answer: 0 },
        { prompt: '밤하늘에서 환하게 빛나는 것은?', emoji: '🌙', choices: ['달', '해', '구름', '비'], answer: 0 },
        { prompt: '비가 오고 해가 나면 하늘에 생기는 것은?', emoji: '🌈', choices: ['무지개', '눈', '번개', '안개'], answer: 0 },
        { prompt: '일 년 중 가장 더운 계절은?', emoji: '☀️', choices: ['여름', '겨울', '봄', '가을'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-7', dojoId: 'common', rank: 7, title: '동물과 식물', description: '생물에 대해 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(5),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '새는 무엇으로 하늘을 날까요?', emoji: '🐦', choices: ['날개', '지느러미', '다리', '꼬리'], answer: 0 },
        { prompt: '물고기는 어디에서 살까요?', emoji: '🐟', choices: ['물속', '나무 위', '하늘', '땅속'], answer: 0 },
        { prompt: '나비가 되기 전의 모습은?', emoji: '🐛', choices: ['애벌레', '강아지', '새', '물고기'], answer: 0, explain: '애벌레가 번데기를 거쳐 나비가 돼요.' },
        { prompt: '식물이 잘 자라려면 필요한 것은?', emoji: '🌱', choices: ['햇빛과 물', '과자', '돌', '어둠'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-6', dojoId: 'common', rank: 6, title: '우리나라', description: '대한민국에 대해 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '우리나라의 수도(서울)는 어디일까요?', emoji: '🏙️', choices: ['서울', '부산', '제주', '대구'], answer: 0 },
        { prompt: '태극기 한가운데에 있는 무늬는?', emoji: '🇰🇷', choices: ['태극', '별', '하트', '동그라미만'], answer: 0 },
        { prompt: '한라산이 있는, 바다 건너 큰 섬은?', emoji: '🌋', choices: ['제주도', '울릉도', '독도', '강화도'], answer: 0 },
        { prompt: '우리나라에서 쓰는 돈의 단위는?', emoji: '💰', choices: ['원', '달러', '엔', '유로'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-5', dojoId: 'common', rank: 5, title: '넓은 세계', description: '세계 여러 곳을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '우리가 살고 있는 행성의 이름은?', emoji: '🌍', choices: ['지구', '화성', '달', '태양'], answer: 0 },
        { prompt: '에펠탑이 있는 나라는?', emoji: '🗼', choices: ['프랑스', '한국', '일본', '미국'], answer: 0 },
        { prompt: '커다란 피라미드가 있는 나라는?', emoji: '🔺', choices: ['이집트', '중국', '영국', '독일'], answer: 0 },
        { prompt: '세계에서 가장 큰 대륙은?', emoji: '🗺️', choices: ['아시아', '아프리카', '유럽', '남극'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-4', dojoId: 'common', rank: 4, title: '과학 탐험', description: '재미있는 과학을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(7),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '물이 차갑게 얼면 무엇이 될까요?', emoji: '🧊', choices: ['얼음', '수증기', '구름', '비'], answer: 0 },
        { prompt: '자석에 붙는 것은?', emoji: '🧲', choices: ['쇠(철)', '나무', '종이', '유리'], answer: 0 },
        { prompt: '태양계에서 가장 큰 행성은?', emoji: '🪐', choices: ['목성', '지구', '달', '화성'], answer: 0 },
        { prompt: '물의 세 가지 모습이 아닌 것은?', emoji: '💧', choices: ['돌', '얼음', '물', '수증기'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-3', dojoId: 'common', rank: 3, title: '함께 사는 사회', description: '가족과 직업을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(8),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '아빠의 여자 형제를 뭐라고 부를까요?', choices: ['고모', '이모', '삼촌', '사촌'], answer: 0 },
        { prompt: '엄마의 여자 형제를 뭐라고 부를까요?', choices: ['이모', '고모', '이모부', '삼촌'], answer: 0 },
        { prompt: '아픈 사람을 치료해 주는 분은?', emoji: '🩺', choices: ['의사', '요리사', '운전사', '화가'], answer: 0 },
        { prompt: '불을 끄고 사람을 구하는 분은?', emoji: '🧑‍🚒', choices: ['소방관', '선생님', '농부', '가수'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-2', dojoId: 'common', rank: 2, title: '지구를 지켜요', description: '환경을 보호하는 방법을 알아봐요',
    missionType: 'visual_quiz', passCondition: '4문제 중 3개', rewards: R(9),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '다 쓴 플라스틱 병은 어떻게 할까요?', emoji: '♻️', choices: ['분리수거', '아무 데나 버리기', '땅에 묻기', '태우기'], answer: 0 },
        { prompt: '전기를 아끼는 방법은?', emoji: '💡', choices: ['안 쓰는 불 끄기', '불 켜두기', '문 열어두기', '물 틀어두기'], answer: 0 },
        { prompt: '나무를 많이 심으면 좋은 점은?', emoji: '🌳', choices: ['맑은 공기', '더 더워짐', '쓰레기 증가', '소음 증가'], answer: 0 },
        { prompt: '멸종위기 동물을 위해 우리가 할 일은?', emoji: '🐼', choices: ['보호하기', '괴롭히기', '잡아오기', '무시하기'], answer: 0 }
      ]
    }
  },
  {
    id: 'common-1', dojoId: 'common', rank: 1, title: '척척박사 종합', description: '여러 상식을 모두 맞혀요',
    missionType: 'visual_quiz', passCondition: '5문제 중 4개', rewards: R(10),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '일주일은 며칠일까요?', emoji: '📅', choices: ['7일', '5일', '10일', '12일'], answer: 0 },
        { prompt: '무지개는 보통 몇 가지 색?', emoji: '🌈', choices: ['7가지', '3가지', '5가지', '10가지'], answer: 0 },
        { prompt: '지구에서 가장 큰 바다 동물은?', emoji: '🐋', choices: ['고래', '상어', '문어', '거북'], answer: 0 },
        { prompt: '낮과 밤이 생기는 이유는 지구가?', emoji: '🌍', choices: ['스스로 돌기 때문', '멈춰 있어서', '커서', '작아서'], answer: 0 },
        { prompt: '우리 몸에서 생각을 하는 곳은?', emoji: '🧠', choices: ['뇌', '발', '손', '귀'], answer: 0 }
      ]
    }
  }
]
