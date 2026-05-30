// 🔬 스트레스 테스트 C(경계값/극단입력)·D(시간/상태)·F(입력검증)
// 순수 함수에 극단·경계 입력을 대량 투입해 깨지는 지점을 찾는다.
// 실행: npx tsx scripts/checkRuntime.ts
import { generateProblem, problemForContext, getConceptsForGrade, MathConcept } from '../src/data/mathGarden'
import { growToCurrent, calculateHealth, entryStage, stageOrder } from '../src/data/growth'
import { levelForXp, levelProgress } from '../src/data/gardenLevels'
import { careCooldownRemaining, canCare, formatCooldown } from '../src/data/careActions'
import { voiceCleanPrompt } from '../src/data/missionVoice'
import { daysBetween } from '../src/utils/timeUtils'
import { getTodayWeather, WEATHER_INFO } from '../src/utils/weather'
import { GardenEntry } from '../src/utils/storage'
import { playNote, playTone, playMelody, playClick, NOTE_FREQ } from '../src/utils/audio'

type Sev = '🔴' | '🟡' | '🟢'
const findings: { sev: Sev; area: string; msg: string }[] = []
const add = (sev: Sev, area: string, msg: string) => findings.push({ sev, area, msg })
const ok = (area: string, msg: string) => console.log(`  ✅ ${area}: ${msg}`)
function section(name: string, fn: () => void) {
  console.log(`\n── ${name} ──`)
  try { fn() } catch (e) { add('🔴', name, `검사 중 예외: ${(e as Error).message}`) }
}

const HOUR = 3600_000
const baseEntry = (over: Partial<GardenEntry> = {}): GardenEntry => ({
  id: 'x', date: '2025-01-01', timestamp: 0, emotion: 'joy', intensity: 3,
  plantId: 'sunshine_dandelion', position: { x: 0.5, y: 0.5 }, ...over,
})

// ===== C: 경계값/극단입력 =====
section('C1 수학 문제 생성 정합성 (대량 무작위)', () => {
  const concepts: MathConcept[] = ['counting', 'addition', 'subtraction', 'multiplication', 'division', 'pattern']
  let bad = 0
  for (const grade of [1, 2, 3, 4, 5, 6, undefined as unknown as number]) {
    for (const c of concepts) {
      for (let n = 0; n < 400; n++) {
        const p = generateProblem(c, grade)
        // 정답이 보기 안에 있는가
        if (!p.choices.includes(p.answer)) { bad++; add('🔴', 'C1', `${c}(g${grade}) 정답 ${p.answer}이 보기에 없음: [${p.choices}]`) }
        // 보기 중복/개수/음수
        if (new Set(p.choices).size !== p.choices.length) { bad++; add('🟡', 'C1', `${c} 보기 중복: [${p.choices}]`) }
        if (p.choices.length < 2) { bad++; add('🟡', 'C1', `${c} 보기 부족(${p.choices.length})`) }
        if (p.choices.some(x => x < 0)) { bad++; add('🟡', 'C1', `${c} 음수 보기: [${p.choices}]`) }
        // 실제 수식과 정답 일치(내부 정합성)
        let real: number | null = null
        if (c === 'addition' && p.showLeft != null && p.showRight != null) real = p.showLeft + p.showRight
        else if (c === 'subtraction' && p.showLeft != null && p.showRight != null) real = p.showLeft - p.showRight
        else if (c === 'multiplication' && p.showLeft != null && p.showRight != null) real = p.showLeft * p.showRight
        else if (c === 'division' && p.showLeft != null && p.showRight != null) real = p.showLeft / p.showRight
        else if (c === 'counting' && p.showLeft != null) real = p.showLeft
        if (real != null && real !== p.answer) { bad++; add('🔴', 'C1', `${c} 정답 불일치: 표시 ${p.showLeft}/${p.showRight} → 실제 ${real} ≠ ${p.answer}`) }
        if (c === 'division' && p.showLeft != null && p.showRight != null && p.showLeft % p.showRight !== 0) { bad++; add('🔴', 'C1', `${c} 나눗셈 나머지 발생: ${p.showLeft}÷${p.showRight}`) }
      }
    }
  }
  // 맥락별 문제도 정상 생성되는지
  for (const ctx of ['water', 'seed', 'harvest', 'flower'] as const) {
    const p = problemForContext(ctx, 3)
    if (!p.choices.includes(p.answer)) { bad++; add('🔴', 'C1', `problemForContext(${ctx}) 정답 누락`) }
  }
  if (!bad) ok('C1', '약 16,800문제 모두 정답∈보기 · 내부 수식 일치 · 나눗셈 정수 · 음수/중복 없음')
})

section('C2 성장 극단 시간', () => {
  // 10년 뒤: fruit(최종)에서 멈춰야 함(초과 없음)
  const e = baseEntry({ stage: 'seed', carePoints: 999, plantedAt: 0 })
  const far = growToCurrent(e, 10 * 365 * 24 * HOUR)
  if (stageOrder(entryStage(far)) > 5) add('🔴', 'C2', 'fruit 단계를 초과해 성장함')
  else ok('C2', `극단 미래에도 최종 단계(${entryStage(far)})에서 정지`)
  // 과거(now < plantedAt): 성장 안 함, 예외 없음
  const past = growToCurrent(baseEntry({ stage: 'seed', carePoints: 999, plantedAt: 1000 * HOUR }), 0)
  if (entryStage(past) !== 'seed') add('🟡', 'C2', '음수 경과시간에 성장함')
})

section('C3 정원 레벨 경계값', () => {
  if (levelForXp(-99999) !== 1) add('🔴', 'C3', '음수 XP가 Lv.1이 아님')
  if (levelForXp(0) !== 1) add('🔴', 'C3', '0 XP가 Lv.1이 아님')
  if (levelForXp(9_999_999) !== 6) add('🔴', 'C3', '초대형 XP가 최대레벨이 아님')
  const pNeg = levelProgress(-100), pBig = levelProgress(9_999_999)
  if (pNeg.ratio < 0 || pNeg.ratio > 1) add('🟡', 'C3', `음수 XP ratio 범위밖(${pNeg.ratio})`)
  if (!pBig.isMax) add('🟡', 'C3', '초대형 XP isMax 아님')
  if (!findings.some(f => f.area === 'C3')) ok('C3', '음수·0·초대형 XP 모두 안전')
})

section('C4 돌봄 쿨다운 경계값', () => {
  const future = baseEntry({ lastCareAt: { water: 99999999999999 } })
  const rem = careCooldownRemaining(future, 'water', 0)
  if (rem < 0) add('🟡', 'C4', '쿨다운 잔여가 음수')
  if (canCare(future, 'water', 0)) add('🟡', 'C4', '미래 시각인데 즉시 돌봄 가능')
  if (typeof formatCooldown(99999999) !== 'string') add('🟡', 'C4', 'formatCooldown 문자열 아님')
  if (!findings.some(f => f.area === 'C4')) ok('C4', '쿨다운 경계 안전')
})

section('C5 음성 텍스트 다듬기 극단입력', () => {
  const inputs = ['', '   ', '???', '🍎🍎🍎', '3+++4', '1/0', '====', '一二三', 'a'.repeat(5000), '3 + 4 = ?', '🐦'.repeat(50)]
  for (const inp of inputs) {
    const out = voiceCleanPrompt(inp)
    if (typeof out !== 'string') { add('🔴', 'C5', `반환 비문자열: ${JSON.stringify(inp).slice(0, 20)}`); continue }
    if (out.length > inp.length + 50) add('🟡', 'C5', `출력 과다 팽창: ${JSON.stringify(inp).slice(0, 20)}`)
  }
  if (!findings.some(f => f.area === 'C5')) ok('C5', '빈문자열·기호·이모지·초장문 모두 예외 없이 처리')
})

// ===== D: 시간/상태 =====
section('D1 날짜 차이 경계', () => {
  if (daysBetween('2026-05-30', '2026-05-30') !== 0) add('🔴', 'D1', '같은 날 차이 0 아님')
  if (daysBetween('2025-12-31', '2026-01-01') !== 1) add('🔴', 'D1', '연말→연초 1일 아님')
  if (daysBetween('2026-02-28', '2026-03-01') !== 1) add('🟡', 'D1', '2월말→3월초 1일 아님(평년)')
  if (daysBetween('2026-01-02', '2026-01-01') !== -1) add('🟡', 'D1', '역순 차이 -1 아님')
  if (!findings.some(f => f.area === 'D1')) ok('D1', '같은날·연말연초·역순 모두 정확')
})

section('D2 오늘 날씨 결정성', () => {
  const w1 = getTodayWeather(), w2 = getTodayWeather()
  if (w1 !== w2) add('🟡', 'D2', '같은 날 날씨가 호출마다 달라짐(비결정적)')
  if (!WEATHER_INFO[w1]) add('🔴', 'D2', `정의되지 않은 날씨 타입: ${w1}`)
  if (!findings.some(f => f.area === 'D2')) ok('D2', `하루 동안 고정(${w1}) · 유효 타입`)
})

section('D3 건강 계산: 미래/과거 lastWatered', () => {
  const future = calculateHealth(baseEntry({ lastWatered: 100 * HOUR }), 0) // 아직 안 준 미래
  if (future !== 'thriving') add('🟡', 'D3', `미래 물주기 시각에 thriving 아님(${future})`)
  const old = calculateHealth(baseEntry({ lastWatered: 0 }), 1000 * HOUR) // 아주 오래전
  if (old !== 'wilting') add('🟡', 'D3', `오래 방치 시 wilting 아님(${old})`)
  const legacy = calculateHealth(baseEntry({}), 1000 * HOUR) // lastWatered 없음(구버전)
  if (legacy !== 'healthy') add('🟡', 'D3', `구버전(물준적 없음) health 가 healthy 아님(${legacy})`)
  if (!findings.some(f => f.area === 'D3')) ok('D3', '미래·과거·구버전 건강 계산 안전(죽음 없음)')
})

section('D4 학년별 개념 (경계 학년)', () => {
  for (const g of [undefined as unknown as number, 0, 1, 2, 6, 99, -3]) {
    const cs = getConceptsForGrade(g)
    if (!Array.isArray(cs) || cs.length === 0) add('🔴', 'D4', `학년 ${g} → 개념 목록 비정상`)
  }
  if (!findings.some(f => f.area === 'D4')) ok('D4', '미설정·0·음수·초과 학년 모두 유효한 개념 반환')
})

// ===== E: 오디오 (AudioContext 없는 환경에서도 크래시 금지) =====
section('E1 오디오 무가용 환경 안전성', () => {
  // node에는 Web Audio가 없음 → 모든 음 함수가 조용히 no-op 해야 함(예외 금지)
  try {
    playTone(440, 100)
    playNote('도'); playNote('도\''); playNote('없는음'); playNote('') // 알 수 없는 음도 안전
    playMelody(['도', '미', '솔'], 200); playMelody([], 100)
    playClick(true); playClick(false)
    ok('E1', 'AudioContext 없는 환경에서 모든 음 함수 예외 없이 no-op')
  } catch (e) { add('🔴', 'E1', `오디오 함수가 예외를 던짐: ${(e as Error).message}`) }
})

section('E2 음감 미션 음표 ↔ 주파수 매핑', () => {
  // 음악 미션이 쓰는 모든 계이름이 NOTE_FREQ에 있어야 소리가 남
  const needed = ['도', '레', '미', '파', '솔', '라', '시', "도'"]
  const missing = needed.filter(n => !(n in NOTE_FREQ))
  if (missing.length) add('🟡', 'E2', `주파수 미정의 계이름: ${missing.join(', ')}`)
  else ok('E2', `8개 계이름(도~도') 주파수 정의됨`)
})

// ===== 결과 =====
console.log('\n' + '═'.repeat(56))
const counts = { '🔴': 0, '🟡': 0, '🟢': 0 } as Record<Sev, number>
findings.forEach(f => counts[f.sev]++)
console.log(`결과: 🔴치명 ${counts['🔴']} · 🟡중간 ${counts['🟡']} · 🟢경미 ${counts['🟢']}`)
for (const sev of ['🔴', '🟡', '🟢'] as Sev[]) {
  const list = findings.filter(f => f.sev === sev)
  if (list.length) { console.log(`\n${sev}`); list.slice(0, 30).forEach(f => console.log(`  [${f.area}] ${f.msg}`)); if (list.length > 30) console.log(`  ...외 ${list.length - 30}건`) }
}
if (findings.length === 0) console.log('\n🎉 C·D·F 런타임 극단입력 — 문제 없음')
