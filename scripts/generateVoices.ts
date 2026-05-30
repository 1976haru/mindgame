// ElevenLabs API로 전체 음성을 일괄 생성한다.
// 실행: npm run voices:generate
//
// 안전장치:
//  - API 키는 .env에서만 읽음(코드 하드코딩 금지)
//  - 이미 만든 mp3는 건너뜀(캐싱 → 크레딧 절약)
//  - Voice ID가 PLACEHOLDER인 캐릭터는 건너뜀
//  - 개별 클립 실패해도 전체는 계속 진행
import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { VOICE_SCRIPTS } from '../src/data/scripts'
import { VOICE_CHARACTERS, isVoiceConfigured } from '../src/data/voiceConfig'

const API_KEY = process.env.ELEVENLABS_API_KEY
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'voices')
const MODEL = 'eleven_multilingual_v2' // 한국어 지원 모델

if (!API_KEY) {
  console.error('❌ ELEVENLABS_API_KEY가 .env에 없습니다. VOICE_SETUP.md 4단계를 참고하세요.')
  process.exit(1)
}

type Script = (typeof VOICE_SCRIPTS)[number]

async function generateVoice(script: Script): Promise<'ok' | 'skip' | 'fail'> {
  const character = VOICE_CHARACTERS[script.character]
  if (!character) {
    console.warn(`⚠️  캐릭터 없음: ${script.character} (${script.id})`)
    return 'fail'
  }
  if (!isVoiceConfigured(script.character)) {
    return 'skip' // Voice ID 미설정 — 조용히 건너뜀
  }

  const outputPath = path.join(OUTPUT_DIR, `${script.id}.mp3`)
  if (fs.existsSync(outputPath)) {
    return 'skip' // 캐싱: 이미 존재
  }

  const url = `https://api.elevenlabs.io/v1/text-to-speech/${character.voiceId}`
  let response: Response
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: script.text,
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
    console.error(`❌ 네트워크 오류 [${script.id}]: ${(e as Error).message}`)
    return 'fail'
  }

  if (!response.ok) {
    const err = await response.text().catch(() => '')
    console.error(`❌ 생성 실패 [${script.id}]: ${response.status} ${err.slice(0, 120)}`)
    return 'fail'
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(outputPath, buffer)
  console.log(`✅ ${script.id}  (${script.text.slice(0, 18)}${script.text.length > 18 ? '…' : ''})`)

  await new Promise((r) => setTimeout(r, 500)) // 레이트리밋 방지
  return 'ok'
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  const anyConfigured = Object.keys(VOICE_CHARACTERS).some((id) => isVoiceConfigured(id))
  if (!anyConfigured) {
    console.error('❌ Voice ID가 하나도 설정되지 않았습니다. src/data/voiceConfig.ts의 PLACEHOLDER를 교체하세요.')
    console.error('   자세한 방법: VOICE_SETUP.md')
    process.exit(1)
  }

  console.log(`🎙️  총 ${VOICE_SCRIPTS.length}개 클립 처리 시작\n`)

  let ok = 0
  let skip = 0
  let fail = 0
  for (const script of VOICE_SCRIPTS) {
    const result = await generateVoice(script)
    if (result === 'ok') ok += 1
    else if (result === 'skip') skip += 1
    else fail += 1
  }

  console.log(`\n🎉 완료 — 생성 ${ok} / 건너뜀 ${skip} / 실패 ${fail}`)
  console.log(`📁 저장 위치: ${OUTPUT_DIR}`)
}

main()
