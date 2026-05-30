// 음성 + 자막을 함께 처리하는 단일 진입점.
// 화면 코드는 speak()/speakText()만 호출하면 음성 재생·자막 표시·설정 반영이 모두 처리된다.
import { playVoice, stopVoice } from './voice'
import { scriptTextLang } from '../data/scripts'
import { VOICE_CHARACTERS } from '../data/voiceConfig'
import { useSubtitleStore } from '../store/subtitleStore'
import { useAppStore } from '../store/appStore'

function speakerName(clipId: string): string {
  // clipId 앞부분이 캐릭터 id와 매칭되면 그 이름을 자막 화자로 사용
  for (const [id, c] of Object.entries(VOICE_CHARACTERS)) {
    if (clipId === id || clipId.startsWith(`${id}_`)) return c.name
  }
  return ''
}

// 대본 DB의 clipId로 음성+자막 재생. 자막 설정이 켜져 있으면 표시.
// 현재 언어의 자막 텍스트를 사용(번역 없으면 한국어 폴백).
export async function speak(clipId: string): Promise<void> {
  const lang = useAppStore.getState().game.lang
  const text = scriptTextLang(clipId, lang) ?? ''
  return speakText(clipId, text, speakerName(clipId))
}

// 임의 텍스트(받아쓰기 낱말 등)를 화자 이름과 함께 재생.
export async function speakText(clipId: string, text: string, speaker = ''): Promise<void> {
  const { showSubtitle } = useAppStore.getState().game
  const sub = useSubtitleStore.getState()

  await playVoice(clipId, {
    text,
    onSubtitle: () => {
      if (showSubtitle && text) sub.show(text, speaker)
    },
    onEnd: () => {
      sub.hide()
    },
  })
}

export function stopSpeaking(): void {
  stopVoice()
  useSubtitleStore.getState().hide()
}
