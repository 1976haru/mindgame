import { DojoId } from '../data/dojos'

// 실패했을 때 멘토가 건네는 격려 (도장별)
export const ENCOURAGEMENT: Record<DojoId, string[]> = {
  music: [
    '괜찮아! 모차르트도 처음엔 실수했단다.',
    '음악은 듣는 게 절반이야. 한 번 더 들어볼까?',
    '리듬은 마음에서 나와. 깊게 숨 쉬고 다시 해보자.'
  ],
  pe: [
    '이순신 장군도 매일 훈련했어! 너도 할 수 있어!',
    '실패는 더 강해지는 길이란다.',
    '한 번 더! 너의 다리는 점점 빨라지고 있어!'
  ],
  ballet: [
    '천천히 해도 괜찮아. 아름다움은 서두르지 않아.',
    '한 동작씩 차근차근. 너의 몸짓은 점점 우아해지고 있어.',
    '실수해도 멋져. 다시 한 번 춤춰볼까?'
  ],
  history: [
    '역사는 한 번에 외워지지 않아. 천천히 익히면 돼.',
    '옛이야기를 다시 들어볼까? 너는 잘 기억할 수 있어.',
    '괜찮아, 다시 보면 더 또렷해질 거란다.'
  ],
  korean: [
    '한글은 차근차근 배우면 돼. 세종대왕도 오래 연구했단다.',
    '한 글자씩 또박또박. 너는 잘하고 있어.',
    '괜찮아! 다시 한 번 소리를 들어볼까?'
  ],
  common: [
    '궁금한 건 다시 알아보면 돼! 그게 배움이란다.',
    '틀려도 괜찮아. 이제 하나 더 알게 됐잖아!',
    '호기심을 잃지 마. 다시 도전해볼까?'
  ],
  math: [
    '수학은 게임 같은 거야. 다시 천천히 생각해보자.',
    '괜찮아! 곰돌이도 천천히 푼단다.',
    '한 문제씩 차근차근. 너는 점점 똑똑해지고 있어.'
  ]
}

export function randomEncouragement(dojoId: DojoId): string {
  const list = ENCOURAGEMENT[dojoId]
  return list[Math.floor(Math.random() * list.length)]
}

// 날짜 기반 깜짝 이벤트
export interface SurpriseEvent { id: string; title: string; reward: string; emoji: string }

export function getSurpriseEvent(date = new Date()): SurpriseEvent | null {
  const m = date.getMonth() + 1, d = date.getDate()
  if (m === 5 && d === 5) return { id: 'children_day', title: '어린이날 축제', reward: '모든 보상 2배!', emoji: '🎠' }
  if (m === 5 && d === 8) return { id: 'parents_day', title: '어버이날', reward: '부모님께 칭찬받은 일을 떠올려요', emoji: '🌷' }
  if (m === 10 && d === 9) return { id: 'hangeul_day', title: '한글날 - 세종대왕의 선물', reward: '국어 도장 보상 3배', emoji: '🇰🇷' }
  if (m === 12 && d === 25) return { id: 'christmas', title: '크리스마스', reward: '특별 선물 상자', emoji: '🎄' }
  return null
}
