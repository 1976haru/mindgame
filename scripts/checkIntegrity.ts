// 🔬 강력 스트레스 테스트 A(데이터/마이그레이션) + B(정합성)
// 데이터 모듈을 가로질러 끊긴 참조·마이그레이션 문제를 찾는다. 실행: npx tsx scripts/checkIntegrity.ts
import { PLANT_SPECIES, PLANT_BY_ID } from '../src/data/plants'
import { PLANT_COMPONENTS } from '../src/components/plants/index'
import { VOICE_SCRIPTS } from '../src/data/scripts'
import { VOICE_CHARACTERS } from '../src/data/voiceConfig'
import { ALL_MISSIONS, MISSION_BY_ID } from '../src/data/missions'
import { missionIntroClip, missionQuestionClip } from '../src/data/missionVoice'
import { reactionClip, plantGrowClip, heroQuoteClip } from '../src/data/voiceExtra'
import { plantTalkClipId } from '../src/data/careActions'
import { DOJOS, DOJO_BY_ID } from '../src/data/dojos'
import { HEROES, HERO_BY_ID } from '../src/data/heroes'
import { EPISODE_BY_ID } from '../src/data/episodes'
import { BUILDING_BY_ID } from '../src/data/buildings'
import { EMOTION_LIST } from '../src/data/emotions'
import { MENTOR_COMPONENTS } from '../src/components/mentors/MentorComponents'
import { defaultGameState, migrateLoadedGame, emptyEmotionCounts, emptyDojoProgress, GameState, GardenEntry } from '../src/utils/storage'
import { entryStage, calculateHealth, entryCarePoints, growToCurrent } from '../src/data/growth'

type Sev = '🔴' | '🟡' | '🟢'
const findings: { sev: Sev; area: string; msg: string }[] = []
const add = (sev: Sev, area: string, msg: string) => findings.push({ sev, area, msg })
const ok = (area: string, msg: string) => console.log(`  ✅ ${area}: ${msg}`)

const scriptIds = new Set(VOICE_SCRIPTS.map(s => s.id))

function section(name: string, fn: () => void) {
  console.log(`\n── ${name} ──`)
  try { fn() } catch (e) { add('🔴', name, `검사 중 예외: ${(e as Error).message}`) }
}

// ===== TEST A: 데이터/마이그레이션 =====
section('A1 기본 상태 (BGM 기본 OFF)', () => {
  const d = defaultGameState()
  if (d.muteBgm !== true) add('🔴', 'A1', 'defaultGameState.muteBgm 가 true(OFF)가 아님')
  else ok('A1', 'BGM 기본 OFF')
  if (d.bgmDefaultMigrated !== true) add('🟡', 'A1', 'defaultGameState.bgmDefaultMigrated 가 true 아님')
  if (d.muteSfx !== false || d.muteVoice !== false) add('🔴', 'A1', '효과음/음성이 기본 음소거됨(유지되어야 함)')
  else ok('A1', '효과음·음성 기본 ON')
})

section('A2 빈 저장본 마이그레이션', () => {
  const m = migrateLoadedGame({} as Partial<GameState>)
  const undef = (Object.keys(defaultGameState()) as (keyof GameState)[]).filter(k => m[k] === undefined)
  if (undef.length) add('🔴', 'A2', `마이그레이션 후 누락 필드: ${undef.join(', ')}`)
  else ok('A2', '모든 필드 채워짐')
  if (m.muteBgm !== true) add('🔴', 'A2', '빈 저장본인데 BGM이 OFF로 마이그레이션 안 됨')
})

section('A3 구버전 저장본(필드 누락) 마이그레이션', () => {
  const old = { empathyEnergy: 10, muteBgm: false, emotionCounts: { joy: 3 } } as unknown as Partial<GameState>
  const m = migrateLoadedGame(old)
  if (m.empathyEnergy !== 10) add('🔴', 'A3', '기존 값(empathyEnergy) 유실')
  if (Object.keys(m.emotionCounts).length !== 8) add('🔴', 'A3', `emotionCounts 8개 미충족: ${Object.keys(m.emotionCounts).length}`)
  if (Object.keys(m.dojoProgress).length !== 7) add('🔴', 'A3', `dojoProgress 7개 미충족: ${Object.keys(m.dojoProgress).length}`)
  if (m.gardenXp !== 0 || m.mathStats === undefined || m.seeds === undefined) add('🔴', 'A3', 'v4 신규 필드 미보정')
  if (m.muteBgm !== true) add('🔴', 'A3', '플래그 없는 기존 사용자 BGM 1회 OFF 미적용')
  else ok('A3', '구버전 보정 + BGM 1회 OFF 정상')
})

section('A4 BGM 토글 존중(재-음소거 금지)', () => {
  // 이미 마이그레이션 끝난 사용자가 BGM을 켜둠 → 다시 켜진 채 유지되어야 함
  const m = migrateLoadedGame({ bgmDefaultMigrated: true, muteBgm: false } as Partial<GameState>)
  if (m.muteBgm !== false) add('🔴', 'A4', 'BGM 켠 사용자를 마이그레이션이 다시 음소거함(토글 무력화)')
  else ok('A4', 'BGM 켠 상태 유지(토글 정상)')
})

section('A5 빈 카운터 완전성', () => {
  if (Object.keys(emptyEmotionCounts()).length !== 8) add('🔴', 'A5', 'emptyEmotionCounts 8개 아님')
  else ok('A5', 'emotionCounts 8감정')
  if (Object.keys(emptyDojoProgress()).length !== 7) add('🔴', 'A5', 'emptyDojoProgress 7도장 아님')
  else ok('A5', 'dojoProgress 7도장')
})

section('A6 GardenEntry(성장 필드 없는 구버전) 보정', () => {
  const legacy = { id: 'x', date: '2025-01-01', timestamp: 1, emotion: 'joy', intensity: 3, plantId: 'sunshine_dandelion', position: { x: 0.5, y: 0.5 } } as GardenEntry
  try {
    const st = entryStage(legacy); const h = calculateHealth(legacy); const cp = entryCarePoints(legacy)
    const grown = growToCurrent(legacy)
    if (st !== 'bloom') add('🟡', 'A6', `구버전 엔트리 stage 가 bloom 아님(${st})`)
    if (cp !== 0) add('🟡', 'A6', 'carePoints 기본 0 아님')
    if (grown !== legacy) add('🟡', 'A6', '구버전(활짝) 엔트리가 잘못 성장 처리됨')
    ok('A6', `구버전 엔트리 안전(stage=${st}, health=${h})`)
  } catch (e) { add('🔴', 'A6', `구버전 엔트리 처리 중 예외: ${(e as Error).message}`) }
})

// ===== TEST B: 정합성(끊긴 참조) =====
section('B1 식물 종 ↔ 컴포넌트', () => {
  const compKeys = new Set(Object.keys(PLANT_COMPONENTS))
  for (const p of PLANT_SPECIES) if (!compKeys.has(p.id)) add('🔴', 'B1', `식물 '${p.id}'(${p.name}) 컴포넌트 없음`)
  for (const k of compKeys) if (!PLANT_BY_ID[k]) add('🟡', 'B1', `컴포넌트 '${k}'에 대응하는 PLANT_SPECIES 없음`)
  if (!findings.some(f => f.area === 'B1')) ok('B1', `${PLANT_SPECIES.length}종 ↔ ${compKeys.size}컴포넌트 일치`)
})

section('B2 음성 대본 무결성', () => {
  const seen = new Set<string>(); let dup = 0
  for (const s of VOICE_SCRIPTS) {
    if (seen.has(s.id)) { dup++; add('🟡', 'B2', `중복 clipId: ${s.id}`) }
    seen.add(s.id)
    if (!VOICE_CHARACTERS[s.character]) add('🔴', 'B2', `대본 '${s.id}'의 character '${s.character}' 미정의`)
  }
  if (!dup) ok('B2', `${VOICE_SCRIPTS.length}개 대본 id 유일 + character 모두 유효`)
})

section('B3 미션 안내 음성 클립 존재', () => {
  let miss = 0
  for (const m of ALL_MISSIONS) {
    const qs = m.config.questions
    if (qs && qs.length) qs.forEach((_q, i) => { if (!scriptIds.has(missionQuestionClip(m.id, i))) { miss++; add('🟡', 'B3', `미션 안내 클립 없음: ${missionQuestionClip(m.id, i)}`) } })
    else if (!scriptIds.has(missionIntroClip(m.id))) { miss++; add('🟡', 'B3', `미션 안내 클립 없음: ${missionIntroClip(m.id)}`) }
  }
  if (!miss) ok('B3', '모든 미션 안내 클립 대본 존재')
})

section('B4 멘토 반응 클립 존재', () => {
  let miss = 0
  const mentors = new Set(DOJOS.map(d => d.mentor.id))
  for (const mentor of mentors) for (const correct of [true, false]) for (let i = 0; i < 3; i++) {
    const clip = reactionClip(mentor, correct, i)
    if (!clip || !scriptIds.has(clip)) { miss++; add('🟡', 'B4', `반응 클립 없음: ${mentor} ${correct ? '정답' : '오답'} ${i}`) }
  }
  if (!miss) ok('B4', `멘토 ${mentors.size}명 정답/오답 반응 클립 모두 존재`)
})

section('B5 식물 대화/성장 클립 존재', () => {
  let miss = 0
  for (const e of EMOTION_LIST) for (const stage of ['seed', 'bloom'] as const) {
    const c = plantTalkClipId(e.type, stage)
    if (!scriptIds.has(c)) { miss++; add('🟡', 'B5', `식물 대화 클립 없음: ${c}`) }
  }
  if (!scriptIds.has(plantGrowClip(0)) || !scriptIds.has(plantGrowClip(1))) { miss++; add('🟡', 'B5', '식물 성장 클립 없음') }
  if (!miss) ok('B5', '식물 대화 8감정 + 성장 클립 존재')
})

section('B6 위인 한마디 클립 존재', () => {
  let miss = 0
  for (const h of HEROES) if (!scriptIds.has(heroQuoteClip(h.id))) { miss++; add('🟡', 'B6', `위인 클립 없음: ${heroQuoteClip(h.id)}`) }
  if (!miss) ok('B6', `위인 ${HEROES.length}명 클립 존재`)
})

section('B7 미션 구조 정합성', () => {
  const ids = new Set<string>()
  for (const m of ALL_MISSIONS) {
    if (ids.has(m.id)) add('🔴', 'B7', `중복 미션 id: ${m.id}`)
    ids.add(m.id)
    const c = m.config
    c.questions?.forEach((q, i) => {
      if (q.answer < 0 || q.answer >= q.choices.length) add('🔴', 'B7', `${m.id} 문제${i + 1} answer 범위 밖(${q.answer}/${q.choices.length})`)
    })
    if (c.questions && c.needCorrect && c.needCorrect > c.questions.length) add('🟡', 'B7', `${m.id} needCorrect(${c.needCorrect}) > 문제수(${c.questions.length})`)
    c.pitchRounds?.forEach((r, i) => { if (r.answer < 0 || r.answer >= r.choices.length) add('🔴', 'B7', `${m.id} 음감${i + 1} answer 범위 밖`) })
    if (c.moves && c.sequence) {
      const moveIds = new Set(c.moves.map(mv => mv.id))
      c.sequence.forEach(sid => { if (!moveIds.has(sid)) add('🔴', 'B7', `${m.id} 시퀀스 동작 '${sid}'가 moves에 없음(입력 불가)`) })
    }
    if (c.orderItems) {
      const idxs = c.orderItems.map(o => o.correctIndex).sort((a, b) => a - b)
      const expected = c.orderItems.map((_, i) => i)
      if (JSON.stringify(idxs) !== JSON.stringify(expected)) add('🔴', 'B7', `${m.id} card_order correctIndex가 0..n-1 순열 아님`)
    }
  }
  if (!findings.some(f => f.area === 'B7')) ok('B7', `${ALL_MISSIONS.length}개 미션 구조 정상`)
})

section('B8 도장 참조(멘토/영웅/건물)', () => {
  for (const d of DOJOS) {
    if (!MENTOR_COMPONENTS[d.mentor.id]) add('🔴', 'B8', `도장 ${d.id} 멘토 아바타 '${d.mentor.id}' 없음`)
    if (!VOICE_CHARACTERS[d.mentor.id]) add('🟡', 'B8', `도장 ${d.id} 멘토 음성 '${d.mentor.id}' 미설정`)
    if (!HERO_BY_ID[d.finalReward.heroId]) add('🔴', 'B8', `도장 ${d.id} finalReward.heroId '${d.finalReward.heroId}' 없음`)
    // buildingId는 optional(미구현) — 값이 있을 때만 검증
    if (d.finalReward.buildingId && !BUILDING_BY_ID[d.finalReward.buildingId]) add('🟡', 'B8', `도장 ${d.id} buildingId '${d.finalReward.buildingId}' 없음`)
  }
  if (!findings.some(f => f.area === 'B8')) ok('B8', '도장 7개 참조 정상')
})

section('B9 위인 ↔ 에피소드', () => {
  const hids = new Set<string>()
  for (const h of HEROES) {
    if (hids.has(h.id)) add('🔴', 'B9', `중복 위인 id: ${h.id}`)
    hids.add(h.id)
    if (!EPISODE_BY_ID[h.unlockEpisodeId]) add('🔴', 'B9', `위인 ${h.id} unlockEpisodeId '${h.unlockEpisodeId}' 없음`)
  }
  if (!findings.some(f => f.area === 'B9')) ok('B9', `위인 ${HEROES.length}명 에피소드 참조 정상`)
})

// ===== 결과 =====
const order: Sev[] = ['🔴', '🟡', '🟢']
console.log('\n' + '═'.repeat(56))
const counts = { '🔴': 0, '🟡': 0, '🟢': 0 } as Record<Sev, number>
findings.forEach(f => counts[f.sev]++)
console.log(`결과: 🔴치명 ${counts['🔴']} · 🟡중간 ${counts['🟡']} · 🟢경미 ${counts['🟢']}`)
for (const sev of order) {
  const list = findings.filter(f => f.sev === sev)
  if (list.length) { console.log(`\n${sev}`); list.forEach(f => console.log(`  [${f.area}] ${f.msg}`)) }
}
if (findings.length === 0) console.log('\n🎉 발견된 문제 없음 — 데이터/정합성 모두 정상')
