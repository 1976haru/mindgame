// 마음 정원 전체 음성 대본 DB.
// 각 항목 = mp3 1개 (id가 곧 public/voices/{id}.mp3 파일명).
//
// 대본 작성 원칙:
//  1) 이름을 부르지 않는다("친구야", "너"). → 동적 이름 생성 크레딧 절약
//  2) 한 클립은 1~2문장으로 짧고 명확하게
//  3) 저학년 어휘 — 어려운 한자어/받침 피하기
//  4) 따뜻하고 응원하는 톤
//  5) 받아쓰기는 표준 발음으로 또박또박

export interface VoiceScript {
  id: string // 고유 ID = mp3 파일명 (ascii 권장)
  character: string // voiceConfig의 캐릭터 ID
  text: string // 실제 대사 (자막에도 사용)
  category: string // 분류
  context?: string // 사용 위치 설명
}

// 미션 안내 음성은 미션 데이터에서 자동 생성 (작업 1) — scripts.ts 끝 합본에서 추가
import { buildMissionGuideScripts } from './missionVoice'
// 반응/식물대화/위인 음성 (작업 2~4)
import { buildExtraVoiceScripts } from './voiceExtra'

// ── A. 솔로몬 부엉이 ─────────────────────────────────────────────
const SOLOMON: VoiceScript[] = [
  { id: 'solomon_intro_01', character: 'solomon', text: '안녕, 어린 친구. 나는 지혜의 부엉이 솔로몬이란다.', category: 'solomon', context: '첫 만남 컷신' },
  { id: 'solomon_intro_02', character: 'solomon', text: '이곳 마음 정원에서는 너의 마음이 나무처럼 무럭무럭 자란단다.', category: 'solomon', context: '첫 만남 컷신' },
  { id: 'solomon_intro_03', character: 'solomon', text: '일곱 도장에서 수련하면, 너는 진정한 마음의 영웅이 될 수 있어.', category: 'solomon', context: '첫 만남 컷신' },
  { id: 'solomon_intro_04', character: 'solomon', text: '자, 이제 너의 여행을 시작해 볼까? 준비됐니?', category: 'solomon', context: '첫 만남 컷신' },
  { id: 'solomon_welcome', character: 'solomon', text: '다시 왔구나, 반가워! 오늘도 함께 자라보자.', category: 'solomon', context: '재방문 인사' },
  { id: 'solomon_exam_intro', character: 'solomon', text: '드디어 마지막 시험이구나. 너의 진정한 실력을 보여주렴.', category: 'solomon', context: '솔로몬 시험 시작' },
  { id: 'solomon_exam_pass', character: 'solomon', text: '훌륭하다! 이것이 바로 진정한 실력이구나. 정말 자랑스러워.', category: 'solomon', context: '시험 합격' },
  { id: 'solomon_exam_fail', character: 'solomon', text: '괜찮아. 다시 도전하면 된단다. 너는 충분히 할 수 있어.', category: 'solomon', context: '시험 불합격' },
  { id: 'solomon_ending_01', character: 'solomon', text: '너는 일곱 도장을 모두 거쳐 여기까지 왔구나.', category: 'solomon', context: '명예의 전당 엔딩' },
  { id: 'solomon_ending_02', character: 'solomon', text: '음악과 운동, 역사와 우리말, 그리고 수많은 마음을 배웠지.', category: 'solomon', context: '명예의 전당 엔딩' },
  { id: 'solomon_ending_03', character: 'solomon', text: '하지만 가장 크게 자란 것은 바로 너의 따뜻한 마음이란다.', category: 'solomon', context: '명예의 전당 엔딩' },
  { id: 'solomon_ending_04', character: 'solomon', text: '이제 너는 나의 자랑스러운 후계자야.', category: 'solomon', context: '명예의 전당 엔딩' },
  { id: 'solomon_ending_05', character: 'solomon', text: '앞으로도 너의 마음 정원을 아름답게 가꾸어 가렴. 고맙다, 친구.', category: 'solomon', context: '명예의 전당 엔딩' },
  { id: 'solomon_episode_intro', character: 'solomon', text: '마음 재판소가 열렸어. 지혜로운 판단을 내려 볼까?', category: 'solomon', context: '재판소 진행' },
  { id: 'solomon_episode_correct', character: 'solomon', text: '지혜로운 판단이야. 너의 마음이 한 뼘 더 자랐구나.', category: 'solomon', context: '재판소 정답' },
  { id: 'solomon_episode_wrong', character: 'solomon', text: '다시 한번 생각해 볼까? 정답은 없어도 마음은 자란단다.', category: 'solomon', context: '재판소 오답' },
]

// ── B. 7명 멘토 ──────────────────────────────────────────────────
// 멘토별 고유 대사 + 공통 패턴(성공/실패/힌트 등)을 빌더로 생성.
interface MentorLines {
  greeting: string
  mission_start: string
  success: [string, string, string]
  fail: [string, string]
  hint: string
  rankup: string
  shihan: string
}

const MENTOR_LINES: Record<string, MentorLines> = {
  mozart_squirrel: {
    greeting: '음악 도장에 온 걸 환영해! 나는 모차르트 다람쥐란다.',
    mission_start: '귀를 쫑긋 세우고, 소리에 마음을 맡겨 봐!',
    success: ['와! 완벽한 음감이야!', '멋진 연주였어! 마음이 노래하는구나.', '훌륭해! 네 안에 음악이 살아 있어.'],
    fail: ['괜찮아, 모차르트도 처음엔 실수했단다. 다시 들어볼까?', '아주 가까웠어! 한 번만 더 귀 기울여 봐.'],
    hint: '음이 올라가는지 내려가는지 먼저 들어 보렴.',
    rankup: '축하해! 한 단계 올라갔어! 네 음악이 점점 아름다워지고 있어!',
    shihan: '드디어 음악 도장 사범이구나! 너의 음악은 이제 모두의 마음을 울린단다.',
  },
  lightning_rabbit: {
    greeting: '체육 도장에 온 걸 환영해! 나는 번개처럼 빠른 토끼야!',
    mission_start: '심호흡 한 번 하고, 박자에 몸을 맡겨 봐!',
    success: ['최고야! 박자를 완벽하게 맞췄어!', '대단해! 몸과 마음이 하나가 됐구나.', '멋진 움직임이야! 점점 빨라지고 있어!'],
    fail: ['괜찮아, 천천히 다시 해보자. 넌 분명 해낼 거야!', '아쉽다! 한 번만 더 도전해 볼까?'],
    hint: '박자를 마음속으로 하나, 둘, 셋 세어 보렴.',
    rankup: '좋았어! 한 단계 승급이야! 네 체력과 끈기가 쑥쑥 자라고 있어!',
    shihan: '체육 도장 사범 달성! 너의 끈기는 그 누구도 못 따라온단다!',
  },
  swan_princess: {
    greeting: '발레 도장에 온 걸 환영해. 나는 백조 공주란다.',
    mission_start: '어깨에 힘을 빼고, 부드럽게 움직여 보렴.',
    success: ['우아했어! 마치 한 마리 백조 같구나.', '아름다운 몸짓이야. 마음까지 고와지는구나.', '완벽해! 동작 하나하나에 마음이 담겼어.'],
    fail: ['괜찮아, 발레는 천천히 익히는 거란다. 다시 해볼까?', '거의 다 왔어! 마음을 차분히 하고 한 번 더.'],
    hint: '동작의 순서를 천천히 떠올려 보렴.',
    rankup: '축하해! 한 단계 올라갔어! 네 몸짓이 점점 우아해지고 있단다.',
    shihan: '발레 도장 사범이 되었구나! 너의 춤은 보는 이의 마음을 어루만진단다.',
  },
  time_owl: {
    greeting: '한국사 도장에 온 걸 환영해. 나는 시간을 지키는 부엉이란다.',
    mission_start: '옛이야기 속으로 함께 떠나 볼까?',
    success: ['훌륭해! 역사를 정확히 기억하는구나.', '멋져! 과거를 알면 미래가 보인단다.', '대단해! 너는 시간 여행의 달인이야.'],
    fail: ['괜찮아, 역사는 차근차근 알아가는 거란다. 다시 볼까?', '아쉽다! 한 번만 더 생각해 보렴.'],
    hint: '어느 것이 먼저 일어난 일인지 떠올려 보렴.',
    rankup: '축하해! 한 단계 올라갔어! 너의 지혜가 깊어지고 있구나.',
    shihan: '한국사 도장 사범 달성! 너는 과거와 미래를 잇는 지혜를 얻었단다.',
  },
  sejong_turtle: {
    greeting: '국어 도장에 온 걸 환영해. 나는 느긋한 세종 거북이란다.',
    mission_start: '귀를 활짝 열고, 또박또박 들어 보렴.',
    success: ['잘했어! 바른 말이 바른 마음이란다.', '훌륭해! 우리말이 점점 또렷해지는구나.', '멋져! 한 글자도 틀리지 않았어.'],
    fail: ['괜찮아, 다시 한번 들어볼까? 천천히 해도 된단다.', '거의 맞았어! 한 번 더 들어 보렴.'],
    hint: '소리를 마음속으로 천천히 따라 읽어 보렴.',
    rankup: '축하해! 한 단계 올라갔어! 너의 우리말이 점점 단단해지고 있구나.',
    shihan: '국어 도장 사범이 되었구나! 너는 우리말을 사랑하는 진정한 한글지기야.',
  },
  curious_fox: {
    greeting: '상식 도장에 온 걸 환영해! 나는 궁금한 게 많은 여우야.',
    mission_start: '왜 그럴까? 함께 알아보러 가 볼까?',
    success: ['우와! 정답이야! 세상을 보는 눈이 밝아졌어.', '대단해! 호기심이 너를 똑똑하게 만드는구나.', '멋져! 새로운 걸 또 하나 알게 됐어!'],
    fail: ['괜찮아, 모르는 건 부끄러운 게 아니야. 다시 알아볼까?', '아쉽다! 한 번만 더 생각해 보자.'],
    hint: '천천히 그림을 살펴보면 답이 보일 거야.',
    rankup: '축하해! 한 단계 올라갔어! 네 머릿속 지식 창고가 점점 커지고 있어!',
    shihan: '상식 도장 사범 달성! 너는 세상의 모든 게 궁금한 멋진 탐험가야!',
  },
  number_bear: {
    greeting: '수학 도장에 온 걸 환영해. 나는 느긋한 숫자 곰돌이란다.',
    mission_start: '서두르지 말고, 숫자랑 천천히 놀아 보자.',
    success: ['정답이야! 수학은 역시 게임 같지?', '훌륭해! 머리가 반짝반짝 빛나는구나.', '멋져! 어려운 문제도 척척 풀어내는구나.'],
    fail: ['괜찮아, 틀려도 괜찮아. 다시 천천히 세어 볼까?', '거의 맞았어! 한 번 더 생각해 보렴.'],
    hint: '하나씩 천천히 세어 보면 답이 보인단다.',
    rankup: '축하해! 한 단계 올라갔어! 네 수학 실력이 쑥쑥 자라고 있구나.',
    shihan: '수학 도장 사범 달성! 너에게 어려운 숫자는 이제 없단다!',
  },
}

function buildMentorScripts(): VoiceScript[] {
  const out: VoiceScript[] = []
  for (const [mentor, lines] of Object.entries(MENTOR_LINES)) {
    out.push(
      { id: `${mentor}_greeting`, character: mentor, text: lines.greeting, category: 'mentor', context: '도장 입장 인사' },
      { id: `${mentor}_mission_start`, character: mentor, text: lines.mission_start, category: 'mentor', context: '미션 시작' },
      { id: `${mentor}_success_01`, character: mentor, text: lines.success[0], category: 'mentor', context: '미션 성공' },
      { id: `${mentor}_success_02`, character: mentor, text: lines.success[1], category: 'mentor', context: '미션 성공' },
      { id: `${mentor}_success_03`, character: mentor, text: lines.success[2], category: 'mentor', context: '미션 성공' },
      { id: `${mentor}_fail_01`, character: mentor, text: lines.fail[0], category: 'mentor', context: '미션 실패' },
      { id: `${mentor}_fail_02`, character: mentor, text: lines.fail[1], category: 'mentor', context: '미션 실패' },
      { id: `${mentor}_hint`, character: mentor, text: lines.hint, category: 'mentor', context: '힌트' },
      { id: `${mentor}_rankup`, character: mentor, text: lines.rankup, category: 'mentor', context: '승급 축하' },
      { id: `${mentor}_shihan`, character: mentor, text: lines.shihan, category: 'mentor', context: '사범 달성' },
    )
  }
  return out
}

// ── C. 정원 친구들 ───────────────────────────────────────────────
const FRIENDS: VoiceScript[] = [
  { id: 'comfort_rabbit_greet', character: 'comfort_rabbit', text: '안녕, 친구야. 만나서 정말 반가워.', category: 'friend' },
  { id: 'comfort_rabbit_comfort_01', character: 'comfort_rabbit', text: '괜찮아, 슬퍼도 괜찮아. 내가 옆에 있어 줄게.', category: 'friend' },
  { id: 'comfort_rabbit_comfort_02', character: 'comfort_rabbit', text: '오늘 하루도 정말 애썼어. 너는 충분히 잘하고 있어.', category: 'friend' },
]

// ── D. 받아쓰기 (세종 거북이) ⭐ 핵심 ───────────────────────────
// 게임에서 쓰는 실제 낱말은 텍스트로 매칭하므로, 텍스트→clipId 맵을 함께 제공.
const DICTATION_WORDS: string[] = [
  // 게임 내 실제 받아쓰기 낱말 (koreanMissions와 일치)
  '사과', '학교', '친구', '나무', '바다',
  '무지개', '코끼리', '도서관', '해바라기',
  // 받침 없는 낱말 (입문)
  '가방', '나비', '바나나', '오리', '우유', '시소', '구두', '양산',
  '아기', '머리', '다리', '거미',
  // 받침 있는 낱말 (기초)
  '사랑', '강물', '단풍', '눈사람', '꽃밭', '책상', '연필', '가족',
  '햇님', '바람', '구름', '동생',
]

const DICTATION_SENTENCES: string[] = [
  '나는 학교에 갑니다.',
  '오늘 날씨가 좋아요.',
  '친구와 사이좋게 놀아요.',
  '꽃이 예쁘게 피었어요.',
  '엄마 아빠 사랑해요.',
  '우리 모두 친한 친구.',
]

const DICTATION_PROVERBS: string[] = [
  '가는 말이 고와야 오는 말이 곱다.',
  '티끌 모아 태산.',
  '발 없는 말이 천 리 간다.',
  '백지장도 맞들면 낫다.',
  '낮말은 새가 듣고 밤말은 쥐가 듣는다.',
]

const DICTATION_IDIOMS: { word: string; meaning: string }[] = [
  { word: '일석이조', meaning: '한 번에 두 가지 이득' },
  { word: '유비무환', meaning: '미리 준비하면 걱정이 없음' },
  { word: '다다익선', meaning: '많을수록 더 좋음' },
  { word: '우공이산', meaning: '꾸준히 하면 이뤄냄' },
]

// 받아쓰기 텍스트 → clipId 매핑 (게임 엔진이 텍스트로 음성을 찾을 때 사용)
export const DICTATION_CLIP_BY_TEXT = new Map<string, string>()

function buildDictationScripts(): VoiceScript[] {
  const out: VoiceScript[] = []
  let n = 0
  const add = (text: string, kind: string) => {
    n += 1
    const id = `dict_${String(n).padStart(3, '0')}`
    DICTATION_CLIP_BY_TEXT.set(text, id)
    out.push({ id, character: 'sejong_turtle', text, category: `dictation_${kind}`, context: '받아쓰기 출제' })
  }
  DICTATION_WORDS.forEach((w) => add(w, 'word'))
  DICTATION_SENTENCES.forEach((s) => add(s, 'sentence'))
  DICTATION_PROVERBS.forEach((p) => add(p, 'proverb'))
  DICTATION_IDIOMS.forEach((i) => add(i.word, 'idiom'))
  return out
}

// 게임 엔진용 헬퍼: 받아쓰기 낱말/문장의 음성 clipId 조회 (없으면 null → 자막만)
export function getDictationClip(text: string): string | null {
  return DICTATION_CLIP_BY_TEXT.get(text.trim()) ?? null
}

// ── E. 미션 안내 (범용 내레이터) ─────────────────────────────────
const MISSION: VoiceScript[] = [
  { id: 'mission_ready', character: 'narrator', text: '준비됐나요? 그럼 시작할게요!', category: 'mission' },
  { id: 'mission_countdown', character: 'narrator', text: '셋, 둘, 하나!', category: 'mission' },
  { id: 'mission_perfect', character: 'narrator', text: '완벽해요!', category: 'mission' },
  { id: 'mission_good', character: 'narrator', text: '잘했어요!', category: 'mission' },
  { id: 'mission_combo', character: 'narrator', text: '콤보! 멋져요!', category: 'mission' },
  { id: 'mission_timeup', character: 'narrator', text: '시간 종료! 정말 애썼어요.', category: 'mission' },
  { id: 'mission_clear', character: 'narrator', text: '미션 성공! 영웅 카드를 받았어요!', category: 'mission' },
  { id: 'mission_retry', character: 'narrator', text: '아쉬워요. 다시 한번 도전해 볼까요?', category: 'mission' },
]

// ── F. UI 음성 안내 (저학년 배려) ────────────────────────────────
const UI: VoiceScript[] = [
  { id: 'ui_welcome', character: 'narrator', text: '마음 정원에 온 걸 환영해요.', category: 'ui' },
  { id: 'ui_garden', character: 'narrator', text: '여기는 너의 마음 정원이야. 마음껏 가꿔 보렴.', category: 'ui' },
  { id: 'ui_choose_emotion', character: 'narrator', text: '오늘 너의 마음은 어떤 색깔이야?', category: 'ui' },
  { id: 'ui_card_get', character: 'narrator', text: '우와! 새로운 영웅 카드를 얻었어요!', category: 'ui' },
  { id: 'ui_dojo_hall', character: 'narrator', text: '여기는 일곱 도장이 모인 수련의 전당이야.', category: 'ui' },
  { id: 'ui_collection', character: 'narrator', text: '네가 모은 영웅 카드를 구경해 볼까?', category: 'ui' },
  { id: 'ui_daily', character: 'narrator', text: '오늘의 도전이 기다리고 있어요!', category: 'ui' },
  { id: 'ui_levelup', character: 'narrator', text: '레벨 업! 너의 마음이 한 뼘 더 자랐어요.', category: 'ui' },
]

// ── 전체 합본 ────────────────────────────────────────────────────
export const VOICE_SCRIPTS: VoiceScript[] = [
  ...SOLOMON,
  ...buildMentorScripts(),
  ...FRIENDS,
  ...buildDictationScripts(),
  ...MISSION,
  ...buildMissionGuideScripts(), // 미션 안내 음성 (작업 1, 자동 생성)
  ...buildExtraVoiceScripts(),   // 반응·식물대화·위인 (작업 2~4)
  ...UI,
]

// id → 대사 텍스트 빠른 조회 (자막 표시용)
export const SCRIPT_TEXT_BY_ID: Record<string, string> = VOICE_SCRIPTS.reduce(
  (acc, s) => {
    acc[s.id] = s.text
    return acc
  },
  {} as Record<string, string>,
)

export function scriptText(id: string): string | undefined {
  return SCRIPT_TEXT_BY_ID[id]
}

// 멘토 성공/실패 대사 중 무작위 clipId (index를 받아 결정적으로 선택 가능)
export function mentorClip(
  mentorId: string,
  kind: 'success' | 'fail',
  variantIndex: number,
): string {
  const count = kind === 'success' ? 3 : 2
  const n = (Math.abs(variantIndex) % count) + 1
  return `${mentorId}_${kind}_${String(n).padStart(2, '0')}`
}
