// 사전 생성된 mp3(public/voices/*.mp3)를 재생. 자막 동기화 지원.
// 음성 파일이 없거나 재생 실패해도 절대 크래시하지 않고 진행(자막 폴백).

import type { Lang } from '../i18n'

let currentAudio: HTMLAudioElement | null = null
let isVoiceMuted = false
let masterVolume = 1 // 0~1
let voiceLang: Lang = 'ko' // 현재 음성 언어

export function setVoiceLang(lang: Lang) {
  voiceLang = lang
}

export function setVoiceMuted(muted: boolean) {
  isVoiceMuted = muted
  if (muted && currentAudio) {
    currentAudio.pause()
  }
}

export function setVoiceVolume(volume: number) {
  masterVolume = Math.max(0, Math.min(1, volume))
  if (currentAudio) currentAudio.volume = masterVolume
}

export function isMuted() {
  return isVoiceMuted
}

export interface PlayVoiceOptions {
  text?: string // 자막용 텍스트
  onSubtitle?: (text: string) => void // 재생 시작 시 자막 표시 콜백
  onEnd?: () => void // 재생/폴백 종료 콜백
}

// 음성 재생. 음소거여도 자막 콜백은 호출(접근성).
// 항상 resolve 됨(파일 없음/에러 시에도) — 호출부 await가 멈추지 않도록.
export function playVoice(clipId: string, opts: PlayVoiceOptions = {}): Promise<void> {
  const { text, onSubtitle, onEnd } = opts

  // 자막은 음소거 여부와 무관하게 항상 표시
  if (text && onSubtitle) onSubtitle(text)

  if (isVoiceMuted) {
    onEnd?.()
    return Promise.resolve()
  }

  return new Promise<void>((resolve) => {
    const finish = () => {
      onEnd?.()
      resolve()
    }
    try {
      stopVoice()
      const base = import.meta.env.BASE_URL || '/'
      const koSrc = `${base}voices/${clipId}.mp3`
      // 현재 언어 경로 → 없으면 한국어로 폴백
      const primary = voiceLang === 'ko' ? koSrc : `${base}voices/${voiceLang}/${clipId}.mp3`
      const audio = new Audio(primary)
      audio.volume = masterVolume
      currentAudio = audio
      audio.onended = finish
      let triedKoFallback = false
      audio.onerror = () => {
        if (!triedKoFallback && audio.src.indexOf(koSrc) === -1) {
          // 해당 언어 음성 없음 → 한국어 음성으로 폴백(크래시 방지)
          triedKoFallback = true
          audio.src = koSrc
          const r = audio.play()
          if (r && typeof r.catch === 'function') r.catch(() => finish())
          return
        }
        if (import.meta.env.DEV) console.warn('[voice] 로드 실패(404 등):', audio.src)
        finish()
      }
      const playResult = audio.play()
      if (playResult && typeof playResult.catch === 'function') {
        playResult.catch((e) => {
          if (import.meta.env.DEV) console.warn('[voice] 재생 차단/실패:', clipId, e?.name || e)
          finish()
        })
      }
    } catch {
      // 음성 재생 실패해도 게임 진행
      console.warn('Voice playback failed:', clipId)
      finish()
    }
  })
}

export function stopVoice() {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
}
