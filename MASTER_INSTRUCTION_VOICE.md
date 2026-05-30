# 🎙️ 마음 정원 음성·음악 시스템 — ElevenLabs + Claude Code 마스터 지시문

> Claude Code에 던지는 음성/음악 통합 지시문. ElevenLabs(음성) + Tone.js(BGM/효과음) 조합.
> 5개 Phase 순차 실행. 크레딧 절약을 위한 캐싱 필수.

---

## 🎯 미션 개요

마음 정원 게임에 **진짜 사람 목소리(ElevenLabs)** + **배경음악/효과음(Tone.js)** 추가.

### 역할 분담
| 종류 | 도구 | 비고 |
|------|------|------|
| 캐릭터 대사·내레이션 | **ElevenLabs API** | mp3 사전 생성 |
| 받아쓰기 출제 음성 | **ElevenLabs API** | 국어 도장 핵심 |
| 배경음악 (BGM) | **Tone.js** | 코드 생성, 실시간 |
| 효과음 (펑/반짝) | **Tone.js / Web Audio** | 코드 생성 |
| 동요 멜로디 | **Tone.js** | 음악 도장용 |

### 보유 자원
- ElevenLabs 크레딧: 약 270,000 (풀세트 생성 충분)
- 풀세트 = 모든 캐릭터 대사 + 전체 받아쓰기 + 미션 안내

---

## ⚠️ 절대 보안 규칙 (최우선)

1. **API 키는 절대 GitHub에 올리지 마라.**
   - `.env` 파일에만 저장
   - `.gitignore`에 `.env` 포함 확인 (없으면 추가)
   - 코드에 키 하드코딩 절대 금지
2. **생성된 mp3는 캐싱하여 중복 생성 방지** (크레딧 절약)
   - 이미 생성된 파일은 건너뛰기
   - 대본 변경 시에만 재생성
3. **API 호출 실패 시 크래시 금지** — 음성 없어도 자막으로 폴백

---

## 🗂️ Phase 로드맵

| Phase | 내용 | 산출물 |
|-------|------|--------|
| 1 | 음성 인프라 + 보안 설정 | API 연동, .env, voice.ts |
| 2 | 전체 대본 작성 (스크립트 DB) | scripts JSON |
| 3 | 음성 일괄 생성 (API 실행) | public/voices/*.mp3 |
| 4 | Tone.js 음악·효과음 시스템 | music.ts, sfx.ts |
| 5 | 게임 통합 + 자막 + 설정 | 화면별 재생, 음소거 |

---

# ⚙️ Phase 1: 음성 인프라 + 보안 설정

## 작업 내용

### 1-1. 패키지 설치

```bash
npm install dotenv
npm install -D tsx          # 스크립트 실행용
# Tone.js는 Phase 4에서: npm install tone
```

ElevenLabs는 REST API 직접 호출 (fetch 사용, SDK 불필요).

### 1-2. 환경변수 설정

`.env` 파일 생성 (프로젝트 루트):
```
ELEVENLABS_API_KEY=여기에_본인_키_붙여넣기
```

`.env.example` 파일 생성 (이건 GitHub에 올려도 됨, 템플릿):
```
ELEVENLABS_API_KEY=your_api_key_here
```

`.gitignore` 확인 및 추가:
```
.env
.env.local
public/voices/*.mp3   # 음성 파일은 빌드 시 별도 처리 (1-6 참조)
```

⚠️ **중요**: `.gitignore`에 `.env`가 이미 있는지 먼저 확인. 없으면 추가. 있으면 그대로.

### 1-3. 음성 캐릭터 매핑 — `src/data/voiceConfig.ts`

ElevenLabs Voice ID는 사용자가 직접 골라야 하므로, **플레이스홀더 + 설명**으로 작성하고 README에 음성 선택 가이드 추가.

```typescript
// ElevenLabs 음성 설정
// Voice ID는 https://elevenlabs.io Voice Library에서 한국어 지원 음성 선택 후 입력
// 선택 가이드는 VOICE_SETUP.md 참조

export interface VoiceCharacter {
  id: string              // 내부 식별자
  name: string            // 캐릭터 이름
  voiceId: string         // ElevenLabs Voice ID (사용자 입력 필요)
  description: string     // 어떤 목소리가 어울리는지
  settings: {
    stability: number     // 0~1, 안정성 (높을수록 일관됨)
    similarity_boost: number  // 0~1, 음성 유사도
    style: number         // 0~1, 표현력
  }
}

export const VOICE_CHARACTERS: Record<string, VoiceCharacter> = {
  solomon: {
    id: 'solomon',
    name: '솔로몬 부엉이',
    voiceId: 'PLACEHOLDER_SOLOMON',   // ← 한국어 남성, 차분하고 지혜로운 노년
    description: '현명한 할아버지 같은 따뜻하고 권위 있는 남성 목소리',
    settings: { stability: 0.75, similarity_boost: 0.75, style: 0.3 }
  },
  // 멘토 7명
  mozart_squirrel: {
    id: 'mozart_squirrel',
    name: '모차르트 다람쥐',
    voiceId: 'PLACEHOLDER_MOZART',    // ← 밝고 경쾌한 목소리
    description: '활기차고 빠른 톤의 명랑한 목소리',
    settings: { stability: 0.5, similarity_boost: 0.7, style: 0.5 }
  },
  lightning_rabbit: {
    id: 'lightning_rabbit',
    name: '번개 토끼',
    voiceId: 'PLACEHOLDER_RABBIT',    // ← 에너지 넘치는 젊은 목소리
    description: '힘차고 응원하는 듯한 활발한 목소리',
    settings: { stability: 0.45, similarity_boost: 0.7, style: 0.6 }
  },
  swan_princess: {
    id: 'swan_princess',
    name: '백조 공주',
    voiceId: 'PLACEHOLDER_SWAN',      // ← 우아한 여성 목소리
    description: '부드럽고 우아한 여성 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.4 }
  },
  time_owl: {
    id: 'time_owl',
    name: '시간 부엉이',
    voiceId: 'PLACEHOLDER_TIMEOWL',   // ← 학자 같은 차분한 목소리
    description: '지적이고 차분한 학자 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.3 }
  },
  sejong_turtle: {
    id: 'sejong_turtle',
    name: '세종 거북이',
    voiceId: 'PLACEHOLDER_TURTLE',    // ← 느리고 따뜻한 목소리
    description: '느긋하고 따뜻하며 또박또박한 목소리 (받아쓰기용 - 발음 정확)',
    settings: { stability: 0.85, similarity_boost: 0.8, style: 0.2 }
  },
  curious_fox: {
    id: 'curious_fox',
    name: '호기심 여우',
    voiceId: 'PLACEHOLDER_FOX',       // ← 호기심 많은 발랄한 목소리
    description: '궁금증 가득한 발랄하고 친근한 목소리',
    settings: { stability: 0.5, similarity_boost: 0.7, style: 0.5 }
  },
  number_bear: {
    id: 'number_bear',
    name: '숫자 곰돌이',
    voiceId: 'PLACEHOLDER_BEAR',      // ← 느긋하고 다정한 목소리
    description: '느긋하고 다정하지만 논리적인 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.3 }
  },
  // 정원 친구들
  comfort_rabbit: {
    id: 'comfort_rabbit',
    name: '위로 토끼',
    voiceId: 'PLACEHOLDER_COMFORT',   // ← 부드러운 위로의 목소리
    description: '따뜻하고 부드럽게 위로하는 목소리',
    settings: { stability: 0.8, similarity_boost: 0.8, style: 0.3 }
  },
  narrator: {
    id: 'narrator',
    name: '내레이터',
    voiceId: 'PLACEHOLDER_NARRATOR',  // ← 표준 안내 목소리
    description: '명확하고 친근한 안내 목소리 (UI, 미션 안내용)',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.2 }
  }
}

// 받아쓰기 전용 음성 (발음 명확성 최우선)
export const DICTATION_VOICE = 'sejong_turtle'
```

### 1-4. 음성 재생 유틸 — `src/utils/voice.ts`

```typescript
// 사전 생성된 mp3를 재생. 자막 동기화 지원.

interface VoiceClip {
  id: string              // 파일명 (확장자 제외)
  character: string
  text: string            // 자막용
  audioPath: string       // /voices/xxx.mp3
}

let currentAudio: HTMLAudioElement | null = null
let isVoiceMuted = false

export function setVoiceMuted(muted: boolean) {
  isVoiceMuted = muted
  if (muted && currentAudio) currentAudio.pause()
}

export async function playVoice(
  clipId: string,
  onSubtitle?: (text: string) => void
): Promise<void> {
  if (isVoiceMuted) {
    // 음소거 시 자막만
    return
  }
  try {
    // 이전 음성 중지
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
    const audio = new Audio(`${import.meta.env.BASE_URL}voices/${clipId}.mp3`)
    currentAudio = audio
    await audio.play()
    return new Promise(resolve => {
      audio.onended = () => resolve()
      audio.onerror = () => resolve()  // 파일 없어도 진행 (폴백)
    })
  } catch (e) {
    // 음성 재생 실패해도 게임 진행
    console.warn('Voice playback failed:', clipId)
  }
}

export function stopVoice() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
  }
}
```

### 1-5. 음성 선택 가이드 문서 — `VOICE_SETUP.md`

사용자가 ElevenLabs에서 음성을 고르고 Voice ID를 입력하는 방법:

```markdown
# 🎙️ ElevenLabs 음성 설정 가이드

## 1단계: 음성 고르기
1. https://elevenlabs.io 로그인
2. 왼쪽 메뉴 → Voices → Voice Library
3. 필터: Language = Korean
4. 각 캐릭터에 맞는 음성 시청 후 선택

## 2단계: Voice ID 복사
1. 마음에 드는 음성 → ... 메뉴 → Copy Voice ID
2. 형태: 21m00Tcm4TlvDq8ikWAM (영문+숫자 20자)

## 3단계: 코드에 입력
src/data/voiceConfig.ts 파일에서
PLACEHOLDER_XXX 를 복사한 Voice ID로 교체

## 캐릭터별 추천 음성 특징
- 솔로몬: 중후한 남성, 50-60대 톤
- 세종 거북이(받아쓰기): 발음 또렷한 남성/여성 ⭐ 가장 중요
- 백조 공주: 우아한 여성
- 번개 토끼: 활기찬 젊은 목소리
...

## 4단계: API 키 입력
.env 파일에:
ELEVENLABS_API_KEY=sk_여기에_키
```

## ✅ Phase 1 체크포인트
- [ ] .env, .gitignore 보안 설정 완료
- [ ] voiceConfig.ts 캐릭터 매핑
- [ ] voice.ts 재생 유틸
- [ ] VOICE_SETUP.md 가이드
- [ ] 빌드 OK (음성 파일 없어도)

---

# ⚙️ Phase 2: 전체 대본 작성 (스크립트 DB)

## 작업 내용

모든 음성 대사를 JSON으로 정리. 각 항목 = mp3 1개.

### 2-1. 대본 데이터 구조 — `src/data/scripts.ts`

```typescript
export interface VoiceScript {
  id: string              // 고유 ID = mp3 파일명
  character: string       // voiceConfig의 캐릭터 ID
  text: string            // 실제 대사 (한국어)
  category: string        // 분류
  context?: string        // 사용 위치 설명
}

export const VOICE_SCRIPTS: VoiceScript[] = [
  // ... (아래 카테고리별로)
]
```

### 2-2. 작성할 대본 카테고리 (전체)

**A. 솔로몬 부엉이 (약 30개)**
```
- solomon_intro_01 ~ 04: 첫 만남 컷신 4문장
- solomon_welcome: "다시 왔구나, 반가워!"
- solomon_exam_intro: "너의 진정한 실력을 보여주렴"
- solomon_exam_pass: "훌륭하다! 진정한 실력이구나"
- solomon_exam_fail: "괜찮아. 다시 도전하면 된단다"
- solomon_ending_01 ~ 05: 명예의 전당 엔딩 5문장
- solomon_episode_intro: 재판소 진행 멘트
- solomon_episode_correct: "지혜로운 판단이야"
- solomon_episode_wrong: "다시 한번 생각해볼까?"
- ... (이름 부르지 않는 범용 멘트로 작성)
```

**B. 7명 멘토 (각 10개 = 70개)**
각 멘토마다:
```
- {mentor}_greeting: 도장 입장 인사
- {mentor}_mission_start: 미션 시작 멘트
- {mentor}_success_01 ~ 03: 성공 칭찬 3종
- {mentor}_fail_01 ~ 02: 실패 격려 2종
- {mentor}_hint: 힌트 제공 멘트
- {mentor}_rankup: 승급 축하
- {mentor}_shihan: 사범 달성 축하
```

예시 (모차르트 다람쥐):
```
mozart_greeting: "음악 도장에 온 걸 환영해! 나는 모차르트 다람쥐란다."
mozart_success_01: "와! 완벽한 음감이야!"
mozart_fail_01: "괜찮아, 모차르트도 처음엔 실수했단다. 다시 들어볼까?"
mozart_rankup: "축하해! 한 단계 올라갔어! 네 음악이 점점 아름다워지고 있어!"
```

**C. 정원 친구 (8마리 각 3개 = 24개)**
```
- {friend}_greet: 등장 인사
- {friend}_comfort_01 ~ 02: 위로/격려 멘트
```

**D. 받아쓰기 단어/문장 (국어 도장 - 약 100개) ⭐ 핵심**

세종 거북이 음성으로:
```
받침 없는 단어 (9급):
- dict_word_001: "가方" → 텍스트: "가방"
- dict_word_002: "나비"
- dict_word_003: "바나나"
... (20개)

받침 있는 단어 (8-7급):
- dict_word_021: "학교"
- dict_word_022: "사랑"
- dict_word_023: "친구"
... (30개)

문장 받아쓰기 (5급):
- dict_sentence_001: "나는 학교에 갑니다"
- dict_sentence_002: "오늘 날씨가 좋아요"
... (20개)

속담 (4급):
- dict_proverb_001: "가는 말이 고와야 오는 말이 곱다"
... (15개)

사자성어 (3급):
- dict_idiom_001: "일석이조"
... (15개)
```

**E. 미션 안내 (범용 - 약 30개)**
```
- mission_ready: "준비됐나요? 시작할게요!"
- mission_countdown: "셋, 둘, 하나!"
- mission_perfect: "완벽해요!"
- mission_good: "잘했어요!"
- mission_combo: "콤보!"
- mission_timeup: "시간 종료!"
... (도장 공통)
```

**F. UI 음성 안내 (저학년 배려 - 약 20개)**
```
- ui_welcome: "마음 정원에 온 걸 환영해요"
- ui_garden: "여기는 너의 마음 정원이야"
- ui_choose_emotion: "오늘 어떤 마음이야?"
- ui_card_get: "새로운 영웅 카드를 얻었어요!"
... 
```

### 2-3. 대본 작성 원칙

1. **이름 부르지 않기**: "[이름]아" 대신 "친구야", "너" 사용
   - 이유: 동적 이름은 매번 생성해야 해서 크레딧 낭비
   - 단, 자주 쓰는 이름 TOP 20은 별도 생성 고려 (Phase 3 선택사항)
2. **짧고 명확하게**: 한 클립 1~2문장
3. **저학년 어휘**: 받침 어려운 단어, 한자어 피하기
4. **따뜻한 톤**: 모든 대사가 격려·응원
5. **발음 정확성** (받아쓰기): 또박또박, 표준 발음

### 2-4. 대본 총량 추산

```
솔로몬: 30개 × 평균 30자 = 900자
멘토: 70개 × 25자 = 1,750자
친구: 24개 × 20자 = 480자
받아쓰기: 100개 × 10자 = 1,000자
미션 안내: 30개 × 15자 = 450자
UI: 20개 × 20자 = 400자
──────────────────────
합계: 약 5,000자 (한국어는 글자당 크레딧 더 들 수 있어 안전하게 ×3 = 15,000 크레딧)
→ 270,000 크레딧 중 충분 (10% 미만 사용)
```

## ✅ Phase 2 체크포인트
- [ ] scripts.ts에 전체 대본 (약 270개 클립)
- [ ] 카테고리별 분류 완료
- [ ] 이름 미포함, 저학년 어휘 확인
- [ ] 빌드 OK

---

# ⚙️ Phase 3: 음성 일괄 생성 (API 실행)

## 작업 내용

### 3-1. 음성 생성 스크립트 — `scripts/generateVoices.ts`

```typescript
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { VOICE_SCRIPTS } from '../src/data/scripts'
import { VOICE_CHARACTERS } from '../src/data/voiceConfig'

const API_KEY = process.env.ELEVENLABS_API_KEY
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'voices')
const MODEL = 'eleven_multilingual_v2'  // 한국어 지원 모델

if (!API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY가 .env에 없습니다')
  process.exit(1)
}

async function generateVoice(script: typeof VOICE_SCRIPTS[0]) {
  const character = VOICE_CHARACTERS[script.character]
  if (!character) {
    console.warn(`⚠️ 캐릭터 없음: ${script.character}`)
    return
  }
  if (character.voiceId.startsWith('PLACEHOLDER')) {
    console.warn(`⚠️ Voice ID 미설정: ${character.name} (VOICE_SETUP.md 참조)`)
    return
  }

  const outputPath = path.join(OUTPUT_DIR, `${script.id}.mp3`)

  // 캐싱: 이미 있으면 건너뛰기 (크레딧 절약)
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  이미 존재: ${script.id}`)
    return
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${character.voiceId}`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'xi-api-key': API_KEY!,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: script.text,
      model_id: MODEL,
      voice_settings: {
        stability: character.settings.stability,
        similarity_boost: character.settings.similarity_boost,
        style: character.settings.style,
        use_speaker_boost: true
      }
    })
  })

  if (!response.ok) {
    const err = await response.text()
    console.error(`❌ 생성 실패 [${script.id}]: ${response.status} ${err}`)
    return
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)
  console.log(`✅ 생성 완료: ${script.id} (${script.text.slice(0, 20)}...)`)

  // API 레이트리밋 방지 (0.5초 대기)
  await new Promise(r => setTimeout(r, 500))
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  console.log(`🎙️  총 ${VOICE_SCRIPTS.length}개 음성 생성 시작\n`)

  let success = 0, skip = 0, fail = 0
  for (const script of VOICE_SCRIPTS) {
    const before = fs.existsSync(path.join(OUTPUT_DIR, `${script.id}.mp3`))
    await generateVoice(script)
    const after = fs.existsSync(path.join(OUTPUT_DIR, `${script.id}.mp3`))
    if (before) skip++
    else if (after) success++
    else fail++
  }

  console.log(`\n🎉 완료: 생성 ${success} / 건너뜀 ${skip} / 실패 ${fail}`)
}

main()
```

### 3-2. package.json 스크립트 추가

```json
"scripts": {
  ...
  "voices:generate": "tsx scripts/generateVoices.ts",
  "voices:count": "tsx scripts/countCredits.ts"
}
```

### 3-3. 크레딧 사전 계산 스크립트 — `scripts/countCredits.ts`

생성 전에 총 글자 수와 예상 크레딧을 미리 보여줌:

```typescript
import { VOICE_SCRIPTS } from '../src/data/scripts'

const totalChars = VOICE_SCRIPTS.reduce((sum, s) => sum + s.text.length, 0)
console.log(`총 클립: ${VOICE_SCRIPTS.length}개`)
console.log(`총 글자: ${totalChars}자`)
console.log(`예상 크레딧: ${totalChars}~${totalChars * 3} (한국어 가중)`)
console.log(`보유 크레딧 270,000 대비: ${((totalChars * 3) / 270000 * 100).toFixed(1)}%`)
```

### 3-4. 실행 가이드 (README + 사용자 안내)

```markdown
## 음성 생성 실행 순서

1. VOICE_SETUP.md 보고 ElevenLabs에서 음성 선택
2. src/data/voiceConfig.ts의 PLACEHOLDER를 Voice ID로 교체
3. .env에 API 키 입력
4. 크레딧 미리 확인:
   npm run voices:count
5. 음성 생성 실행:
   npm run voices:generate
6. public/voices/ 에 mp3들이 생성됨
7. 캐싱되므로 재실행해도 이미 만든 건 건너뜀
```

### 3-5. 동적 이름 음성 (선택사항)

자주 쓰는 한국 어린이 이름 TOP 30을 미리 생성:
```typescript
// scripts/generateNames.ts
const POPULAR_NAMES = ['민준', '서연', '도윤', '하은', '시우', ...]
// "[이름]아, 잘했어!" 형태로 생성
// 사용자 이름이 목록에 있으면 이름 부르는 음성 재생, 없으면 "친구야"
```

→ 이건 크레딧 여유 있으니 포함. 30개 × 3패턴 = 90개 추가.

## ✅ Phase 3 체크포인트
- [ ] generateVoices.ts 스크립트
- [ ] 캐싱 로직 (중복 생성 방지)
- [ ] countCredits.ts (사전 계산)
- [ ] API 실패 시 안전 처리
- [ ] 빌드 OK
- [ ] (사용자가 Voice ID 입력 후 실제 생성은 수동 실행)

---

# ⚙️ Phase 4: Tone.js 음악·효과음 시스템

## 작업 내용

### 4-1. 패키지 설치
```bash
npm install tone
```

### 4-2. BGM 시스템 — `src/utils/music.ts`

Tone.js로 배경음악 실시간 생성 (mp3 불필요).

```typescript
import * as Tone from 'tone'

let currentBGM: string | null = null
let isMusicMuted = false
let synth: Tone.PolySynth | null = null
let loop: Tone.Loop | null = null

// BGM 정의 (코드 멜로디)
const BGM_PATTERNS = {
  garden: {
    // C장조 부드러운 아르페지오, 60bpm
    notes: ['C4', 'E4', 'G4', 'B4', 'A4', 'G4', 'E4', 'D4'],
    bpm: 60,
    instrument: 'sine',
    volume: -18
  },
  kingdom: {
    // F장조 웅장한 분위기, 70bpm
    notes: ['F3', 'A3', 'C4', 'F4', 'E4', 'C4', 'A3', 'G3'],
    bpm: 70,
    instrument: 'triangle',
    volume: -16
  },
  dojo: {
    // 활기찬 G장조, 90bpm
    notes: ['G4', 'B4', 'D5', 'G4', 'D5', 'B4', 'G4', 'A4'],
    bpm: 90,
    instrument: 'square',
    volume: -20
  },
  night: {
    // A단조 잔잔, 50bpm
    notes: ['A3', 'C4', 'E4', 'A3', 'G3', 'E4', 'C4', 'B3'],
    bpm: 50,
    instrument: 'sine',
    volume: -20
  }
}

export async function startBGM(type: keyof typeof BGM_PATTERNS) {
  if (isMusicMuted || currentBGM === type) return
  await Tone.start()  // 브라우저 정책: 사용자 인터랙션 후
  stopBGM()

  const pattern = BGM_PATTERNS[type]
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: pattern.instrument as any },
    envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1 }
  }).toDestination()
  synth.volume.value = pattern.volume

  Tone.Transport.bpm.value = pattern.bpm
  let i = 0
  loop = new Tone.Loop(time => {
    const note = pattern.notes[i % pattern.notes.length]
    synth?.triggerAttackRelease(note, '8n', time)
    i++
  }, '4n').start(0)

  Tone.Transport.start()
  currentBGM = type
}

export function stopBGM() {
  loop?.stop()
  loop?.dispose()
  synth?.dispose()
  Tone.Transport.stop()
  currentBGM = null
}

export function setMusicMuted(muted: boolean) {
  isMusicMuted = muted
  if (muted) stopBGM()
}
```

### 4-3. 효과음 시스템 — `src/utils/sfx.ts`

```typescript
import * as Tone from 'tone'

let isSfxMuted = false

export function setSfxMuted(muted: boolean) { isSfxMuted = muted }

export async function playSfx(name: string) {
  if (isSfxMuted) return
  await Tone.start()

  switch (name) {
    case 'plantGrow': {
      // 도-미-솔 상승
      const synth = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination()
      synth.volume.value = -10
      const now = Tone.now()
      synth.triggerAttackRelease('C5', '16n', now)
      synth.triggerAttackRelease('E5', '16n', now + 0.1)
      synth.triggerAttackRelease('G5', '16n', now + 0.2)
      setTimeout(() => synth.dispose(), 1000)
      break
    }
    case 'sparkle': {
      const synth = new Tone.Synth({ oscillator: { type: 'sine' } }).toDestination()
      synth.volume.value = -12
      synth.triggerAttackRelease('C6', '32n')
      setTimeout(() => synth.dispose(), 500)
      break
    }
    case 'cardGet': {
      // 팡파레 도미솔도
      const synth = new Tone.PolySynth(Tone.Synth).toDestination()
      synth.volume.value = -8
      const now = Tone.now()
      ;['C5', 'E5', 'G5', 'C6'].forEach((n, idx) =>
        synth.triggerAttackRelease(n, '8n', now + idx * 0.12))
      setTimeout(() => synth.dispose(), 1200)
      break
    }
    case 'gavel': {
      // 낮은 임팩트
      const synth = new Tone.MembraneSynth().toDestination()
      synth.volume.value = -6
      synth.triggerAttackRelease('C2', '8n')
      setTimeout(() => synth.dispose(), 500)
      break
    }
    case 'success': {
      const synth = new Tone.Synth().toDestination()
      const now = Tone.now()
      synth.triggerAttackRelease('G5', '16n', now)
      synth.triggerAttackRelease('C6', '8n', now + 0.1)
      setTimeout(() => synth.dispose(), 600)
      break
    }
    case 'fail': {
      const synth = new Tone.Synth({ oscillator: { type: 'sawtooth' } }).toDestination()
      synth.volume.value = -14
      const now = Tone.now()
      synth.triggerAttackRelease('E4', '16n', now)
      synth.triggerAttackRelease('C4', '8n', now + 0.1)
      setTimeout(() => synth.dispose(), 600)
      break
    }
    case 'rankup': {
      // 화려한 상승
      const synth = new Tone.PolySynth(Tone.Synth).toDestination()
      synth.volume.value = -8
      const now = Tone.now()
      ;['C5','D5','E5','F5','G5','A5','B5','C6'].forEach((n, idx) =>
        synth.triggerAttackRelease(n, '16n', now + idx * 0.08))
      setTimeout(() => synth.dispose(), 1500)
      break
    }
    case 'tap':
    case 'pop':
    case 'star':
      // 짧은 클릭음
      const s = new Tone.Synth({ oscillator: { type: 'sine' },
        envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 } }).toDestination()
      s.volume.value = -14
      s.triggerAttackRelease(name === 'star' ? 'E6' : 'A5', '32n')
      setTimeout(() => s.dispose(), 300)
      break
  }
}
```

### 4-4. 동요 멜로디 (음악 도장용) — `src/utils/melodies.ts`

음악 도장 미션에서 사용할 동요 멜로디 (저작권 free 전래/클래식):

```typescript
// 멜로디 음표 데이터 (저작권 없는 전래동요/클래식만)
export const MELODIES = {
  // 비행기 (전래)
  airplane: ['G4', 'E4', 'E4', 'F4', 'D4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'G4', 'G4'],
  // 학교종 (전래)
  schoolbell: ['G4', 'G4', 'A4', 'A4', 'G4', 'G4', 'E4', 'G4', 'G4', 'E4', 'E4', 'D4'],
  // 나비야 (전래)
  butterfly: ['G4', 'E4', 'E4', 'F4', 'D4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'G4', 'G4'],
  // 작은별 (모차르트, 퍼블릭도메인)
  twinkle: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'],
  // 도레미송 단순화
  doremi: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
}

export async function playMelody(notes: string[], bpm = 120) {
  const Tone = await import('tone')
  await Tone.start()
  const synth = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination()
  const noteDuration = 60 / bpm
  notes.forEach((note, i) => {
    synth.triggerAttackRelease(note, '8n', Tone.now() + i * noteDuration)
  })
  setTimeout(() => synth.dispose(), notes.length * noteDuration * 1000 + 500)
}
```

## ✅ Phase 4 체크포인트
- [ ] Tone.js BGM 4종 (정원/왕국/도장/밤)
- [ ] 효과음 약 12종
- [ ] 동요 멜로디 5곡 (저작권 free)
- [ ] 음소거 토글 동작
- [ ] 빌드 OK

---

# ⚙️ Phase 5: 게임 통합 + 자막 + 설정

## 작업 내용

### 5-1. 화면별 음성/음악 재생 통합

각 화면에 적절한 음성·음악 추가:

| 화면 | 음성 | 음악 |
|------|------|------|
| 정원 진입 | ui_garden (1회) | startBGM('garden') |
| 왕국 진입 | - | startBGM('kingdom') |
| 도장 진입 | startBGM('dojo') | |
| 솔로몬 첫 만남 | solomon_intro_01~04 순차 | - |
| 멘토 인사 | {mentor}_greeting | |
| 미션 성공 | {mentor}_success_랜덤 + sfx('success') | |
| 미션 실패 | {mentor}_fail_랜덤 + sfx('fail') | |
| 승급 | {mentor}_rankup + sfx('rankup') | |
| 사범 달성 | {mentor}_shihan + solomon | |
| 영웅카드 획득 | sfx('cardGet') | |
| 재판소 판결 | sfx('gavel') | |
| 받아쓰기 출제 | dict_word_xxx (세종거북이) | |
| 밤 정원 (20시~) | - | startBGM('night') |

### 5-2. 자막 시스템 — `src/components/common/Subtitle.tsx`

음성 재생 시 화면 하단에 자막 표시 (저학년/청각 배려):

```typescript
// 음성과 동기화된 자막 말풍선
// playVoice 호출 시 onSubtitle 콜백으로 텍스트 표시
// 캐릭터 이름 + 대사
// 음소거 시에도 자막은 표시 (접근성)
```

- 캐릭터 SVG 옆에 말풍선
- 타이핑 효과 (음성 길이에 맞춤)
- 자막 ON/OFF 설정 가능 (기본 ON)

### 5-3. 받아쓰기 음성 통합 ⭐

국어 도장 받아쓰기 미션:
- "🔊 다시 듣기" 버튼 → dict_word_xxx 재생
- 세종 거북이가 또박또박 발음
- 입력 → 채점 → 정답 음성 한번 더 (학습 강화)

### 5-4. 설정 화면 음향 옵션 강화

`SettingsScreen.tsx`에 추가:
```
🔊 소리 설정
- 캐릭터 목소리  [ON/OFF]   ← voice
- 배경 음악      [ON/OFF]   ← BGM
- 효과음         [ON/OFF]   ← SFX
- 자막 표시      [ON/OFF]   ← subtitle (기본 ON)
- 전체 음량      [슬라이더]
```

각 설정은 IndexedDB(또는 메모리)에 저장. 앱 재시작 시 유지.

### 5-5. 첫 인터랙션 오디오 활성화

브라우저 정책: 사용자 첫 탭 전엔 소리 안 남.
- 이름 입력 화면 "시작" 버튼 클릭 시 `Tone.start()` 호출
- AudioContext 활성화
- 이후 모든 음성/음악 정상 동작

### 5-6. Vercel 배포 시 음성 파일 처리

음성 mp3는 용량이 크므로:

**옵션 A (간단): GitHub에 mp3 포함**
- `.gitignore`에서 `public/voices/*.mp3` 제거
- mp3 커밋·푸시 (총 용량 100MB 이하면 OK)
- Vercel이 자동 서빙

**옵션 B (권장, 용량 클 때): Git LFS 또는 외부 스토리지**
- 음성이 200개+ 라 용량 클 수 있음
- Vercel Blob 또는 Cloudflare R2에 업로드
- voice.ts의 경로를 외부 URL로

→ Phase 5에서는 **옵션 A로 먼저** 진행. 용량 초과 시 README에 옵션 B 안내.

### 5-7. 최종 검증

```bash
npx tsc --noEmit
npm run build
ls -lh public/voices/ | head    # 음성 파일 확인
```

수동 테스트:
1. 첫 화면 시작 → 오디오 활성화
2. 정원 진입 → BGM 들림
3. 솔로몬 등장 → 음성 + 자막
4. 도장 미션 → 멘토 음성
5. 받아쓰기 → 세종거북이 발음
6. 설정에서 음소거 → 정상 작동

## ✅ Phase 5 체크포인트
- [ ] 모든 화면 음성/음악 통합
- [ ] 자막 시스템 동작
- [ ] 받아쓰기 음성 재생
- [ ] 설정 음향 옵션 (voice/BGM/SFX/자막)
- [ ] 첫 인터랙션 오디오 활성화
- [ ] 빌드 OK

---

# 🎬 작업 종료 보고 형식

```
✅ 마음 정원 음성·음악 시스템 완료

📊 통계
- 음성 클립: 약 270개 (+ 동적 이름 90개)
- 대본 글자: 약 5,000자
- 예상 크레딧 사용: 약 15,000 / 270,000 (5.6%)
- BGM: 4종 (Tone.js)
- 효과음: 12종 (Tone.js)
- 동요: 5곡 (저작권 free)
- TypeScript 에러: 0
- 빌드: SUCCESS

🎙️ 음성 생성 방법 (사용자 실행 필요)
1. VOICE_SETUP.md 보고 ElevenLabs 음성 선택
2. voiceConfig.ts에 Voice ID 입력
3. .env에 API 키 입력
4. npm run voices:count (크레딧 확인)
5. npm run voices:generate (생성)

🐛 알려진 제한사항
- Voice ID는 사용자가 직접 선택·입력 필요
- 음성 생성은 사용자가 한 번 실행 (API 키 보안)
- 음성 파일 용량 클 경우 외부 스토리지 권장
```

---

# 🚨 절대 규칙

1. **API 키 절대 GitHub 금지** (.env, .gitignore 철저)
2. **캐싱으로 중복 생성 방지** (크레딧 절약)
3. **음성 없어도 크래시 금지** (자막 폴백)
4. **저작권: 동요는 전래/퍼블릭도메인만** (최신곡 멜로디 금지)
5. **자막 기본 ON** (접근성)
6. **첫 인터랙션 후 오디오** (브라우저 정책)
7. **빌드 실패 시 그 Phase 안에서 해결**

---

이제 Phase 1부터 시작하라. 각 Phase 완료 시 보고하고, Phase 5 완료 시 최종 보고하라.
단, Phase 3의 실제 음성 생성(API 호출)은 사용자가 Voice ID와 API 키를 입력한 후 직접 실행하므로, 스크립트만 준비하고 사용자에게 실행을 안내하라.
