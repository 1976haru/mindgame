// 음성 생성 전, 총 글자 수와 예상 크레딧을 미리 계산해 보여준다.
// 실행: npm run voices:count
import { VOICE_SCRIPTS } from '../src/data/scripts'
import { VOICE_CHARACTERS, isVoiceConfigured } from '../src/data/voiceConfig'

const totalChars = VOICE_SCRIPTS.reduce((sum, s) => sum + s.text.length, 0)

// 캐릭터별 설정 여부 집계
const configured = new Set(
  Object.keys(VOICE_CHARACTERS).filter((id) => isVoiceConfigured(id)),
)
const ready = VOICE_SCRIPTS.filter((s) => configured.has(s.character))
const readyChars = ready.reduce((sum, s) => sum + s.text.length, 0)

console.log('🎙️  음성 대본 통계')
console.log('─'.repeat(40))
console.log(`총 클립:        ${VOICE_SCRIPTS.length}개`)
console.log(`총 글자:        ${totalChars}자`)
console.log(`예상 크레딧:    ${totalChars} ~ ${totalChars * 3} (한국어 가중)`)
console.log(`보유 270,000 중: ${((totalChars * 3) / 270000 * 100).toFixed(1)}% (최대치 기준)`)
console.log('─'.repeat(40))
console.log(`Voice ID 설정된 캐릭터: ${configured.size}/${Object.keys(VOICE_CHARACTERS).length}`)
console.log(`지금 생성 가능한 클립:  ${ready.length}개 (${readyChars}자)`)
if (configured.size === 0) {
  console.log('\n⚠️  아직 Voice ID가 하나도 설정되지 않았어요. VOICE_SETUP.md를 참고하세요.')
}
