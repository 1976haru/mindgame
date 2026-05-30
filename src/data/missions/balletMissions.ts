import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

const MOVES = [
  { id: 'up', label: '팔 위로', emoji: '🙆' },
  { id: 'side', label: '양옆으로', emoji: '🤸' },
  { id: 'turn', label: '돌기', emoji: '🌀' },
  { id: 'jump', label: '점프', emoji: '⬆️' },
  { id: 'bow', label: '인사', emoji: '🙇' },
  { id: 'leg', label: '한 발 들기', emoji: '🦩' }
]
const FOUR = MOVES.slice(0, 4)

export const BALLET_MISSIONS: DojoMission[] = [
  {
    id: 'ballet-9', dojoId: 'ballet', rank: 9, title: '동작 이름 익히기', description: '동작 그림을 보고 이름을 골라요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '이 동작의 이름은?', emoji: '🙆', choices: ['팔 위로', '앉기', '점프', '돌기'], answer: 0 },
        { prompt: '이 동작의 이름은?', emoji: '🙇', choices: ['인사', '달리기', '박수', '점프'], answer: 0 },
        { prompt: '이 동작의 이름은?', emoji: '🌀', choices: ['돌기', '눕기', '뛰기', '인사'], answer: 0 },
        { prompt: '이 동작의 이름은?', emoji: '⬆️', choices: ['점프', '인사', '돌기', '앉기'], answer: 0 }
      ]
    }
  },
  {
    id: 'ballet-8', dojoId: 'ballet', rank: 8, title: '동작 따라하기', description: '백조 공주의 3동작을 따라 해요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(4),
    config: { moves: FOUR, sequence: ['up', 'turn', 'bow'] }
  },
  {
    id: 'ballet-7', dojoId: 'ballet', rank: 7, title: '5동작 시퀀스', description: '5개 동작 순서를 기억해요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(5),
    config: { moves: MOVES, sequence: ['up', 'side', 'turn', 'jump', 'bow'] }
  },
  {
    id: 'ballet-6', dojoId: 'ballet', rank: 6, title: '리듬 동작', description: '동작 4개를 순서대로 표현해요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(5),
    config: { moves: MOVES, sequence: ['leg', 'up', 'turn', 'jump'] }
  },
  {
    id: 'ballet-5', dojoId: 'ballet', rank: 5, title: '백조의 호수 입문', description: '6동작의 우아한 시퀀스',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(6),
    config: { moves: MOVES, sequence: ['up', 'turn', 'leg', 'side', 'jump', 'bow'] }
  },
  {
    id: 'ballet-4', dojoId: 'ballet', rank: 4, title: '표현 연습', description: '동작 5개를 정확히 이어요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(6),
    config: { moves: MOVES, sequence: ['turn', 'turn', 'up', 'leg', 'bow'] }
  },
  {
    id: 'ballet-3', dojoId: 'ballet', rank: 3, title: '긴 시퀀스', description: '6동작을 실수 없이 표현해요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(7),
    config: { moves: MOVES, sequence: ['side', 'up', 'jump', 'turn', 'leg', 'up'] }
  },
  {
    id: 'ballet-2', dojoId: 'ballet', rank: 2, title: '우리 전통 무용', description: '한국의 전통 춤을 배워요',
    missionType: 'multiple_choice', passCondition: '3문제 중 3개', rewards: R(8),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '부채춤을 출 때 손에 드는 것은?', emoji: '🪭', choices: ['부채', '북', '칼', '우산'], answer: 0 },
        { prompt: '여럿이 손잡고 둥글게 도는 우리 전통 놀이춤은?', choices: ['강강술래', '줄넘기', '축구', '술래잡기'], answer: 0 },
        { prompt: '탈(가면)을 쓰고 추는 우리 춤은?', emoji: '🎭', choices: ['탈춤', '발레', '왈츠', '디스코'], answer: 0 }
      ]
    }
  },
  {
    id: 'ballet-1', dojoId: 'ballet', rank: 1, title: '완성된 무대', description: '8동작의 완벽한 무대를 펼쳐요',
    missionType: 'dance_sequence', passCondition: '순서 맞히기', rewards: R(10),
    config: { moves: MOVES, sequence: ['bow', 'up', 'side', 'turn', 'jump', 'leg', 'turn', 'up'] }
  }
]
