import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

export const PE_MISSIONS: DojoMission[] = [
  {
    id: 'pe-9', dojoId: 'pe', rank: 9, title: '줄넘기 도전', description: '박자에 맞춰 토끼와 줄넘기를 해요',
    missionType: 'rhythm_tap', passCondition: '10번 중 70% 성공', rewards: R(4),
    config: { beats: 10, tempo: 760, tolerance: 250 }
  },
  {
    id: 'pe-8', dojoId: 'pe', rank: 8, title: '달리기 출발', description: '신호에 맞춰 정확히 탭해요',
    missionType: 'rhythm_tap', passCondition: '6번 중 70% 성공', rewards: R(4),
    config: { beats: 6, tempo: 900, tolerance: 260 }
  },
  {
    id: 'pe-7', dojoId: 'pe', rank: 7, title: '점프 박스', description: '박자에 맞춰 점프(탭)해요',
    missionType: 'rhythm_tap', passCondition: '8번 중 70% 성공', rewards: R(5),
    config: { beats: 8, tempo: 660, tolerance: 230 }
  },
  {
    id: 'pe-6', dojoId: 'pe', rank: 6, title: '빠른 줄넘기', description: '조금 더 빠르게 줄을 넘어요',
    missionType: 'rhythm_tap', passCondition: '14번 중 70% 성공', rewards: R(5),
    config: { beats: 14, tempo: 560, tolerance: 200 }
  },
  {
    id: 'pe-5', dojoId: 'pe', rank: 5, title: '운동 약속', description: '건강한 운동 습관을 배워요',
    missionType: 'multiple_choice', passCondition: '5문제 중 4개', rewards: R(6),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '운동하기 전에 꼭 해야 하는 것은?', emoji: '🤸', choices: ['준비운동', '과자 먹기', '잠자기', '게임하기'], answer: 0, explain: '준비운동을 하면 다치지 않아요.' },
        { prompt: '운동 후 목이 마르면 어떻게 할까요?', emoji: '💧', choices: ['물을 마셔요', '참아요', '뛰어요', '소리쳐요'], answer: 0 },
        { prompt: '달리기를 할 때 신는 것은?', emoji: '👟', choices: ['운동화', '구두', '슬리퍼', '양말만'], answer: 0 },
        { prompt: '친구와 경기에서 졌을 때 바른 태도는?', choices: ['축하하고 다음에 더 노력해요', '화를 내요', '울어요', '그만둬요'], answer: 0, explain: '진 친구도 박수로 응원해요.' },
        { prompt: '운동을 꾸준히 하면 몸이 어떻게 될까요?', choices: ['튼튼해져요', '약해져요', '아파져요', '변화 없어요'], answer: 0 }
      ]
    }
  },
  {
    id: 'pe-4', dojoId: 'pe', rank: 4, title: '점프 콤보', description: '리듬에 맞춰 연속 점프!',
    missionType: 'rhythm_tap', passCondition: '12번 중 70% 성공', rewards: R(6),
    config: { beats: 12, tempo: 600, tolerance: 200 }
  },
  {
    id: 'pe-3', dojoId: 'pe', rank: 3, title: '줄넘기 집중', description: '빠른 박자를 오래 버텨요',
    missionType: 'rhythm_tap', passCondition: '20번 중 70% 성공', rewards: R(7),
    config: { beats: 20, tempo: 500, tolerance: 180 }
  },
  {
    id: 'pe-2', dojoId: 'pe', rank: 2, title: '체력 단련', description: '아주 빠른 박자에 도전해요',
    missionType: 'rhythm_tap', passCondition: '16번 중 70% 성공', rewards: R(8),
    config: { beats: 16, tempo: 460, tolerance: 170 }
  },
  {
    id: 'pe-1', dojoId: 'pe', rank: 1, title: '운동 마라톤', description: '가장 빠른 박자를 끝까지!',
    missionType: 'rhythm_tap', passCondition: '20번 중 70% 성공', rewards: R(10),
    config: { beats: 20, tempo: 430, tolerance: 160 }
  }
]
