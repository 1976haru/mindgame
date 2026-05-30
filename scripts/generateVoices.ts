// ElevenLabs API로 전체 음성을 일괄 생성한다. (한국어 + 영어/일본어)
// 실행: npm run voices:generate
//
// 안전장치:
//  - API 키는 .env에서만 읽음(코드 하드코딩 금지)
//  - 이미 만든 mp3는 건너뜀(캐싱 → 크레딧 절약)
//  - Voice ID가 PLACEHOLDER인 캐릭터는 건너뜀
//  - 개별 클립 실패해도 전체는 계속 진행
//  - 영어/일본어는 한국어 9명 voiceId를 그대로 재사용(multilingual 모델)
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { VOICE_SCRIPTS } from '../src/data/scripts'
import { VOICE_CHARACTERS, isVoiceConfigured, VoiceCharacter } from '../src/data/voiceConfig'
import { voiceTextFor, VOICE_I18N_IDS } from '../src/data/voiceI18n'

const API_KEY = process.env.ELEVENLABS_API_KEY
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'voices')
const MODEL = 'eleven_multilingual_v2' // 다국어 지원 모델

if (!API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY가 .env에 없습니다. VOICE_SETUP.md 4단계를 참고하세요.')
  process.exit(1)
}

const SCRIPT_BY_ID = new Map(VOICE_SCRIPTS.map((s) => [s.id, s]))

// 단일 클립 생성(텍스트·출력경로 지정). 캐싱·실패 안전.
async function tts(character: VoiceCharacter, text: string, outputPath: string, logId: string): Promise<'ok' | 'skip' | 'fail'> {
  if (fs.existsSync(outputPath)) return 'skip' // 캐싱
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${character.voiceId}`
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'xi-api-key': API_KEY as string, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        model_id: MODEL,
        voice_settings: {
          stability: character.settings.stability,
          similarity_boost: character.settings.similarity_boost,
          style: character.settings.style,
          use_speaker_boost: true,
        },
      }),
    })
  } catch (e) {
    console.error(`❌ 네트워크 오류 [${logId}]: ${(e as Error).message}`)
    return 'fail'
  }
  if (!response.ok) {
    const err = await response.text().catch(() => '')
    console.error(`❌ 생성 실패 [${logId}]: ${response.status} ${err.slice(0, 120)}`)
    return 'fail'
  }
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, Buffer.from(await response.arrayBuffer()))
  console.log(`✅ ${logId}  (${text.slice(0, 16)}${text.length > 16 ? '…' : ''})`)
  await new Promise((r) => setTimeout(r, 450)) // 레이트리밋 방지
  return 'ok'
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  const anyConfigured = Object.keys(VOICE_CHARACTERS).some((id) => isVoiceConfigured(id))
  if (!anyConfigured) {
    console.error('❌ Voice ID가 하나도 설정되지 않았습니다. src/data/voiceConfig.ts의 PLACEHOLDER를 교체하세요.')
    process.exit(1)
  }

  const tally = { ok: 0, skip: 0, fail: 0 }
  const bump = (r: 'ok' | 'skip' | 'fail') => { tally[r] += 1 }

  // 1) 한국어 (기존)
  console.log(`🎙️  [ko] ${VOICE_SCRIPTS.length}개 처리\n`)
  for (const s of VOICE_SCRIPTS) {
    const c = VOICE_CHARACTERS[s.character]
    if (!c || !isVoiceConfigured(s.character)) { bump('skip'); continue }
    bump(await tts(c, s.text, path.join(OUTPUT_DIR, `${s.id}.mp3`), `ko/${s.id}`))
  }

  // 2) 영어·일본어 (한국어 voiceId 재사용, 번역문으로 생성)
  for (const lang of ['en', 'ja'] as const) {
    console.log(`\n🎙️  [${lang}] ${VOICE_I18N_IDS.length}개 처리\n`)
    for (const id of VOICE_I18N_IDS) {
      const s = SCRIPT_BY_ID.get(id)
      if (!s) continue
      const c = VOICE_CHARACTERS[s.character]
      if (!c || !isVoiceConfigured(s.character)) { bump('skip'); continue }
      const text = voiceTextFor(id, lang, s.text)
      if (!text) { bump('skip'); continue }
      bump(await tts(c, text, path.join(OUTPUT_DIR, lang, `${id}.mp3`), `${lang}/${id}`))
    }
  }

  console.log(`\n🎉 완료 — 생성 ${tally.ok} / 건너뜀 ${tally.skip} / 실패 ${tally.fail}`)
  console.log(`📁 저장 위치: ${OUTPUT_DIR}`)
}

main()
