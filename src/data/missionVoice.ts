// 🎙️ 미션 안내 음성 대본 자동 생성 (음성 확장 작업 1)
// 미션 데이터에서 "해당 도장 멘토가 읽어줄" 안내/문제 대본을 자동 추출.
// - 질문형 미션(4지선다/퍼즐/패턴): 각 문제(prompt)를 한 클립씩
// - 활동형 미션(리듬/음감/동작/카드/받아쓰기): 미션 안내(title+description) 한 클립
// 숫자·기호는 음성용으로 다듬고, 객관식 보기는 읽지 않음(화면에 보임).
import type { VoiceScript } from './scripts'
import { ALL_MISSIONS } from './missions'
import { DOJO_BY_ID } from './dojos'

const NUM_KO: Record<string, string> = {
  '1': '일', '2': '이', '3': '삼', '4': '사', '5': '오',
  '6': '육', '7': '칠', '8': '팔', '9': '구', '10': '십',
}
const numKo = (s: string): string => NUM_KO[s] ?? s

// 문제 텍스트를 음성용으로 다듬기 (3+4=? → "3 더하기 4 답은 무엇일까요?", 1/2 → "이분의 일")
const OP_WORD = /^(더하기|빼기|곱하기|나누기)/
export function voiceCleanPrompt(src: string): string {
  let t = src
  // 1) 공백으로 둘러싼 연산 기호 → 한국어 (분수 변환 전에 처리해야 1/2 + 1/2 도 잡힘)
  t = t.replace(/ \+ /g, ' 더하기 ')
  t = t.replace(/ [-−] /g, ' 빼기 ')
  t = t.replace(/ [×xX✕] /g, ' 곱하기 ')
  t = t.replace(/ ÷ /g, ' 나누기 ')
  // 2) 분수 a/b → b분의 a
  t = t.replace(/(\d+)\s*\/\s*(\d+)/g, (_m, a: string, b: string) => `${numKo(b)}분의 ${numKo(a)}`)
  // 3) "= ?" / "=" → "답은 무엇일까요" (피연산자에 조사 붙이지 않아 자연스러움)
  t = t.replace(/\s*=\s*\?*/g, ' 답은 무엇일까요')
  // 4) 그림 이모지 제거
  t = t.replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{2190}-\u{21FF}\u{FE0F}\u{200D}]/gu, ' ')
  // 5) 잔여 기호/공백 정리
  t = t.replace(/[+×÷=]/g, ' ').replace(/\s{2,}/g, ' ').trim()
  if (t && !/[?？.!]$/.test(t)) t += '?'
  return t
}

// 다듬은 결과가 음성으로 읽기에 적절한지(피연산자 누락 등 비정상 폴백 판단)
function isReadable(cleaned: string): boolean {
  if (!/[가-힣]/.test(cleaned)) return false        // 한글 없음
  if (OP_WORD.test(cleaned)) return false            // 연산어로 시작(피연산자 누락 — 이모지 연산 등)
  const core = cleaned.replace(/(답은 무엇일까요|는 무엇일까요)\??$/, '').trim()
  return core.length >= 2
}

const introText = (title: string, desc: string): string =>
  `${title}. ${desc}`.replace(/\s{2,}/g, ' ').trim()

// 미션 안내 음성 대본 전체 생성
export function buildMissionGuideScripts(): VoiceScript[] {
  const out: VoiceScript[] = []
  for (const m of ALL_MISSIONS) {
    const mentor = DOJO_BY_ID[m.dojoId].mentor.id
    const qs = m.config.questions
    if (qs && qs.length > 0) {
      qs.forEach((q, i) => {
        const cleaned = voiceCleanPrompt(q.prompt)
        // 피연산자 누락 등 비정상 결과(이모지 연산 등)면 안내 문구로 폴백
        const text = isReadable(cleaned) ? cleaned : `${m.title}. 화면의 문제를 풀어 볼까요?`
        out.push({ id: missionQuestionClip(m.id, i), character: mentor, text, category: 'mission_guide', context: `${m.title} 문제 ${i + 1}` })
      })
    } else {
      out.push({ id: missionIntroClip(m.id), character: mentor, text: introText(m.title, m.description), category: 'mission_guide', context: `${m.title} 안내` })
    }
  }
  return out
}

// === 화면 연결용 clipId 헬퍼 ===
export const missionIntroClip = (missionId: string): string => `mission_${missionId}`
export const missionQuestionClip = (missionId: string, qIndex: number): string => `mission_${missionId}_q${qIndex + 1}`

// 해당 미션에 안내 음성 대본이 존재하는지(문제형이면 q1 기준)
export function hasMissionGuide(missionId: string): boolean {
  return MISSION_GUIDE_IDS.has(missionIntroClip(missionId)) || MISSION_GUIDE_IDS.has(missionQuestionClip(missionId, 0))
}

const MISSION_GUIDE_IDS: Set<string> = new Set(buildMissionGuideScripts().map(s => s.id))
