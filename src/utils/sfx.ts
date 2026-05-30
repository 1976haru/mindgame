// Tone.js 효과음. 짧은 1회성 합성음. 음소거/음량 지원. 오류 시 무시.
import * as Tone from 'tone'

export type SfxName =
  | 'plantGrow'
  | 'sparkle'
  | 'cardGet'
  | 'gavel'
  | 'success'
  | 'fail'
  | 'rankup'
  | 'tap'
  | 'pop'
  | 'star'

let isSfxMuted = false
let masterVolume = 1 // 0~1

export function setSfxMuted(muted: boolean): void {
  isSfxMuted = muted
}

export function setSfxVolume(volume: number): void {
  masterVolume = Math.max(0, Math.min(1, volume))
}

// baseDb에 전체 음량(0~1)을 반영
function vol(baseDb: number): number {
  if (masterVolume <= 0) return -60
  return baseDb + 20 * Math.log10(masterVolume)
}

export async function playSfx(name: SfxName): Promise<void> {
  if (isSfxMuted || masterVolume <= 0) return
  try {
    await Tone.start()
    const now = Tone.now()

    switch (name) {
      case 'plantGrow': {
        const s = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination()
        s.volume.value = vol(-10)
        s.triggerAttackRelease('C5', '16n', now)
        s.triggerAttackRelease('E5', '16n', now + 0.1)
        s.triggerAttackRelease('G5', '16n', now + 0.2)
        setTimeout(() => s.dispose(), 1000)
        break
      }
      case 'sparkle': {
        const s = new Tone.Synth({ oscillator: { type: 'sine' } }).toDestination()
        s.volume.value = vol(-12)
        s.triggerAttackRelease('C6', '32n', now)
        setTimeout(() => s.dispose(), 500)
        break
      }
      case 'cardGet': {
        const s = new Tone.PolySynth(Tone.Synth).toDestination()
        s.volume.value = vol(-8)
        ;['C5', 'E5', 'G5', 'C6'].forEach((n, idx) => s.triggerAttackRelease(n, '8n', now + idx * 0.12))
        setTimeout(() => s.dispose(), 1200)
        break
      }
      case 'gavel': {
        const s = new Tone.MembraneSynth().toDestination()
        s.volume.value = vol(-6)
        s.triggerAttackRelease('C2', '8n', now)
        setTimeout(() => s.dispose(), 500)
        break
      }
      case 'success': {
        const s = new Tone.Synth().toDestination()
        s.volume.value = vol(-8)
        s.triggerAttackRelease('G5', '16n', now)
        s.triggerAttackRelease('C6', '8n', now + 0.1)
        setTimeout(() => s.dispose(), 600)
        break
      }
      case 'fail': {
        const s = new Tone.Synth({ oscillator: { type: 'sawtooth' } }).toDestination()
        s.volume.value = vol(-14)
        s.triggerAttackRelease('E4', '16n', now)
        s.triggerAttackRelease('C4', '8n', now + 0.1)
        setTimeout(() => s.dispose(), 600)
        break
      }
      case 'rankup': {
        const s = new Tone.PolySynth(Tone.Synth).toDestination()
        s.volume.value = vol(-8)
        ;['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'].forEach((n, idx) =>
          s.triggerAttackRelease(n, '16n', now + idx * 0.08),
        )
        setTimeout(() => s.dispose(), 1500)
        break
      }
      case 'tap':
      case 'pop':
      case 'star': {
        const s = new Tone.Synth({
          oscillator: { type: 'sine' },
          envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.1 },
        }).toDestination()
        s.volume.value = vol(-14)
        s.triggerAttackRelease(name === 'star' ? 'E6' : 'A5', '32n', now)
        setTimeout(() => s.dispose(), 300)
        break
      }
    }
  } catch {
    /* 효과음 실패해도 게임 계속 */
  }
}
