// 🎙️ 음성 확장 대본 (작업 2~5)
// 2: 정답/오답 반응  3: 식물 대화  4: 위인 한마디  (5: 수학 읽기는 기존 음성 재활용)
import type { VoiceScript } from './scripts'
import { EMOTION_LIST } from './emotions'
import { TALK_LINES } from './careActions'
import { HEROES } from './heroes'

// ── 작업 2: 멘토 정답/오답 반응 (멘토 7명 × 정답 3 + 오답 3) ──────────
const REACTION_LINES: Record<string, { correct: string[]; wrong: string[] }> = {
  mozart_squirrel: {
    correct: ['완벽한 음감이야!', '딩동댕! 음악 천재구나!', '브라보! 멋진 연주였어!'],
    wrong: ['아쉽다! 다시 한번 들어볼까?', '괜찮아, 모차르트도 처음엔 실수했단다!', '거의 다 왔어! 한 번 더 해보자!'],
  },
  lightning_rabbit: {
    correct: ['최고야! 너 정말 빠르다!', '좋았어! 몸이 가볍지?', '완벽한 타이밍이야!'],
    wrong: ['괜찮아! 다시 도전해 보자!', '거의 다 왔어! 힘내!', '한 번 더! 넌 할 수 있어!'],
  },
  swan_princess: {
    correct: ['우아했어! 마치 백조 같아!', '아름다운 답이야!', '완벽해! 마음까지 고와!'],
    wrong: ['괜찮아, 천천히 해도 돼.', '거의 다 왔어, 다시 해볼까?', '마음을 차분히 하고 한 번 더.'],
  },
  time_owl: {
    correct: ['훌륭해! 역사를 정확히 아는구나!', '정확해! 과거를 잘 기억했어!', '멋져! 시간 여행의 달인이야!'],
    wrong: ['괜찮아, 차근차근 알아가는 거란다.', '아쉽다! 한 번 더 생각해 보렴.', '거의 맞았어! 다시 떠올려 볼까?'],
  },
  sejong_turtle: {
    correct: ['또박또박 잘했구나, 훌륭해!', '바른 말이 바른 마음이란다!', '한 글자도 틀리지 않았어!'],
    wrong: ['괜찮아, 천천히 다시 해보자.', '거의 맞았어! 한 번 더 들어 볼까?', '아쉽다! 다시 천천히 해보렴.'],
  },
  curious_fox: {
    correct: ['우와! 정답이야!', '대단해! 정말 똑똑하구나!', '멋져! 새로운 걸 또 알게 됐네!'],
    wrong: ['괜찮아, 모르는 건 부끄러운 게 아니야!', '한 번 더 생각해 볼까?', '거의 다 왔어! 다시 살펴보자!'],
  },
  number_bear: {
    correct: ['수학 천재네! 곰돌이도 깜짝 놀랐어!', '정답이야! 수학은 게임 같지?', '멋져! 척척 풀어내는구나!'],
    wrong: ['괜찮아, 틀려도 괜찮아.', '거의 맞았어! 한 번 더 세어 볼까?', '천천히 다시 해보자!'],
  },
}

function buildReactionScripts(): VoiceScript[] {
  const out: VoiceScript[] = []
  for (const [mentor, sets] of Object.entries(REACTION_LINES)) {
    sets.correct.forEach((text, i) =>
      out.push({ id: `react_${mentor}_correct_${i + 1}`, character: mentor, text, category: 'reaction' }))
    sets.wrong.forEach((text, i) =>
      out.push({ id: `react_${mentor}_wrong_${i + 1}`, character: mentor, text, category: 'reaction' }))
  }
  return out
}

// 멘토 반응 clipId (index로 3종 중 결정적 선택)
export function reactionClip(mentorId: string, correct: boolean, variantIndex: number): string | null {
  if (!REACTION_LINES[mentorId]) return null
  const n = (Math.abs(variantIndex) % 3) + 1
  return `react_${mentorId}_${correct ? 'correct' : 'wrong'}_${n}`
}

// ── 작업 3: 식물 대화 음성 (위로 토끼) — careActions의 TALK_LINES와 동일 대사 ──
function buildPlantTalkScripts(): VoiceScript[] {
  const out: VoiceScript[] = []
  for (const emo of EMOTION_LIST) {
    TALK_LINES[emo.type].forEach((text, i) =>
      out.push({ id: `plant_${emo.type}_${i + 1}`, character: 'comfort_rabbit', text, category: 'plant_talk', context: `${emo.label} 식물 대화` }))
  }
  // 성장 축하
  out.push({ id: 'plant_grow_1', character: 'comfort_rabbit', text: '고마워! 돌봐줘서 쑥쑥 자랐어!', category: 'plant_talk', context: '식물 성장' })
  out.push({ id: 'plant_grow_2', character: 'comfort_rabbit', text: '와! 한 뼘 더 자랐어. 네 덕분이야!', category: 'plant_talk', context: '식물 성장' })
  return out
}

export function plantGrowClip(variantIndex: number): string {
  return `plant_grow_${(Math.abs(variantIndex) % 2) + 1}`
}

// ── 작업 4: 한국사 위인 한마디 (시간 부엉이가 소개) ──────────────────
function buildHeroQuoteScripts(): VoiceScript[] {
  return HEROES.map(h => ({
    id: `hero_${h.id}`,
    character: 'time_owl',
    text: `${h.quote}. ${h.name}의 말이란다.`,
    category: 'hero_quote',
    context: `${h.name} 영웅카드`,
  }))
}

export function heroQuoteClip(heroId: string): string {
  return `hero_${heroId}`
}

// ── 전체 합본 (scripts.ts에서 추가) ──
export function buildExtraVoiceScripts(): VoiceScript[] {
  return [...buildReactionScripts(), ...buildPlantTalkScripts(), ...buildHeroQuoteScripts()]
}
