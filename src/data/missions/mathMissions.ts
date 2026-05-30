import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

export const MATH_MISSIONS: DojoMission[] = [
  {
    id: 'math-9', dojoId: 'math', rank: 9, title: '숫자 친구', description: '수의 크기와 순서를 알아봐요',
    missionType: 'number_puzzle', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '더 큰 수는?', choices: ['7', '3'], answer: 0 },
        { prompt: '1, 2, 3 다음에 오는 수는?', choices: ['4', '5', '2', '6'], answer: 0 },
        { prompt: '가장 작은 수는?', choices: ['2', '5', '8', '4'], answer: 0 },
        { prompt: '세모 모양은?', emoji: '🔺', choices: ['△', '○', '□', '☆'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-8', dojoId: 'math', rank: 8, title: '더하기 빼기', description: '쉬운 덧셈과 뺄셈이에요',
    missionType: 'number_puzzle', passCondition: '4문제 중 3개', rewards: R(4),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '🍎🍎🍎 + 🍎🍎 = ?', choices: ['5', '4', '6', '3'], answer: 0 },
        { prompt: '3 + 4 = ?', choices: ['7', '6', '8', '5'], answer: 0 },
        { prompt: '6 - 2 = ?', choices: ['4', '3', '5', '8'], answer: 0 },
        { prompt: '2 + 2 + 2 = ?', choices: ['6', '4', '8', '5'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-7', dojoId: 'math', rank: 7, title: '규칙 찾기', description: '다음에 올 것을 맞혀요',
    missionType: 'pattern_match', passCondition: '4문제 중 3개', rewards: R(5),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '2, 4, 6, 8, ? 다음 수는?', choices: ['10', '9', '12', '7'], answer: 0, explain: '2씩 커지고 있어요.' },
        { prompt: '🔴🔵🔴🔵🔴 ? 다음은?', choices: ['🔵', '🔴', '🟢', '🟡'], answer: 0 },
        { prompt: '5, 10, 15, ? 다음 수는?', choices: ['20', '16', '25', '18'], answer: 0, explain: '5씩 커지고 있어요.' },
        { prompt: '○ △ ○ △ ? 다음은?', choices: ['○', '△', '□', '☆'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-6', dojoId: 'math', rank: 6, title: '구구단', description: '곱셈을 연습해요',
    missionType: 'number_puzzle', passCondition: '4문제 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '2 × 3 = ?', choices: ['6', '5', '8', '9'], answer: 0 },
        { prompt: '4 × 2 = ?', choices: ['8', '6', '10', '12'], answer: 0 },
        { prompt: '5 × 5 = ?', choices: ['25', '20', '30', '15'], answer: 0 },
        { prompt: '3 × 3 = ?', choices: ['9', '6', '12', '8'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-5', dojoId: 'math', rank: 5, title: '도형 친구', description: '여러 가지 모양을 알아봐요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(6),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '변이 3개인 도형은?', emoji: '🔺', choices: ['삼각형', '사각형', '원', '오각형'], answer: 0 },
        { prompt: '변이 4개이고 모두 길이가 같은 도형은?', emoji: '⬜', choices: ['정사각형', '삼각형', '원', '육각형'], answer: 0 },
        { prompt: '동그란 모양의 도형은?', emoji: '⭕', choices: ['원', '삼각형', '사각형', '별'], answer: 0 },
        { prompt: '주사위 모양의 입체도형은?', emoji: '🎲', choices: ['정육면체', '구', '원기둥', '원뿔'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-4', dojoId: 'math', rank: 4, title: '시간 읽기', description: '시계와 달력을 알아봐요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(7),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '1시간은 몇 분일까요?', emoji: '⏰', choices: ['60분', '30분', '100분', '24분'], answer: 0 },
        { prompt: '하루는 몇 시간일까요?', choices: ['24시간', '12시간', '10시간', '60시간'], answer: 0 },
        { prompt: '일주일은 며칠일까요?', emoji: '📅', choices: ['7일', '5일', '10일', '30일'], answer: 0 },
        { prompt: '짧은 바늘이 3, 긴 바늘이 12를 가리키면 몇 시?', emoji: '🕒', choices: ['3시', '12시', '6시', '9시'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-3', dojoId: 'math', rank: 3, title: '분수 맛보기', description: '나눈 조각을 분수로 나타내요',
    missionType: 'multiple_choice', passCondition: '4문제 중 3개', rewards: R(8),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '피자를 똑같이 둘로 나눈 한 조각은?', emoji: '🍕', choices: ['1/2', '1/4', '2', '1'], answer: 0 },
        { prompt: '1/2 과 1/4 중에서 더 큰 것은?', choices: ['1/2', '1/4'], answer: 0, explain: '둘로 나눈 게 넷으로 나눈 것보다 커요.' },
        { prompt: '사과 한 개를 네 조각 내면, 한 조각은?', emoji: '🍎', choices: ['1/4', '1/2', '4', '1'], answer: 0 },
        { prompt: '1/2 + 1/2 = ?', choices: ['1 (한 개)', '1/4', '2/4', '0'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-2', dojoId: 'math', rank: 2, title: '생각하는 수학', description: '논리와 규칙을 찾아요',
    missionType: 'pattern_match', passCondition: '4문제 중 3개', rewards: R(9),
    config: {
      needCorrect: 3,
      questions: [
        { prompt: '1, 2, 4, 7, 11, ? 다음 수는?', choices: ['16', '14', '15', '13'], answer: 0, explain: '1, 2, 3, 4, 5씩 커지고 있어요.' },
        { prompt: '시소에서 무거운 쪽은 어떻게 될까요?', emoji: '⚖️', choices: ['내려가요', '올라가요', '그대로예요', '돌아가요'], answer: 0 },
        { prompt: '1, 3, 5, 7, ? 다음 수는?', choices: ['9', '8', '10', '6'], answer: 0, explain: '2씩 커지는 홀수예요.' },
        { prompt: '큰 수부터 차례로: 9, 4, 7 중 가장 큰 수는?', choices: ['9', '7', '4', '없음'], answer: 0 }
      ]
    }
  },
  {
    id: 'math-1', dojoId: 'math', rank: 1, title: '종합 사고력', description: '여러 가지 문제를 풀어요',
    missionType: 'multiple_choice', passCondition: '5문제 중 4개', rewards: R(10),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '사탕 10개를 친구 2명이 똑같이 나누면 한 명당 몇 개?', emoji: '🍬', choices: ['5개', '2개', '10개', '4개'], answer: 0 },
        { prompt: '10 - 3 - 2 = ?', choices: ['5', '6', '4', '7'], answer: 0 },
        { prompt: '2, 4, 8, 16, ? 다음 수는?', choices: ['32', '24', '20', '18'], answer: 0, explain: '두 배씩 커지고 있어요.' },
        { prompt: '삼각형 2개를 합치면 만들 수 있는 도형은?', emoji: '🔷', choices: ['사각형', '원', '오각형', '별'], answer: 0 },
        { prompt: '7 + 8 = ?', choices: ['15', '14', '16', '13'], answer: 0 }
      ]
    }
  }
]
