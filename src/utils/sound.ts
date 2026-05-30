import { Howl, Howler } from 'howler'

export type SoundName = 'pop' | 'grow' | 'correct' | 'wrong' | 'verdict' | 'treasure' | 'sparkle' | 'fusion'

// 효과음 파일 경로 (public/sounds/). 파일이 없어도 크래시하지 않음.
const SOUND_FILES: Record<SoundName, string> = {
  pop: '/sounds/pop.mp3',
  grow: '/sounds/grow.mp3',
  correct: '/sounds/correct.mp3',
  wrong: '/sounds/wrong.mp3',
  verdict: '/sounds/verdict.mp3',
  treasure: '/sounds/treasure.mp3',
  sparkle: '/sounds/sparkle.mp3',
  fusion: '/sounds/fusion.mp3'
}

const cache: Partial<Record<SoundName, Howl>> = {}
let muted = false

export function setSfxMuted(value: boolean) {
  muted = value
}

// 전체 효과음 음량 (0~1). 마스터 음량 슬라이더와 연동.
export function setSoundVolume(volume: number) {
  try {
    Howler.volume(Math.max(0, Math.min(1, volume)))
  } catch {
    /* 무시 */
  }
}

export function playSound(name: SoundName) {
  if (muted) return
  try {
    if (!cache[name]) {
      cache[name] = new Howl({ src: [SOUND_FILES[name]], volume: 0.5, html5: true, onloaderror: () => {}, onplayerror: () => {} })
    }
    cache[name]?.play()
  } catch {
    // 사운드 파일이 없거나 재생 불가 — 무시 (게임 진행에 영향 없음)
  }
}
