// Web Audio API 기반 단순 음 재생 (음악·받아쓰기 보조용)
// 오디오를 못 쓰는 환경에서도 크래시하지 않음.

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext }

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const AC = window.AudioContext || (window as WebkitWindow).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

// 계이름 → 주파수 (4옥타브 기준, 도'는 5옥타브 C)
export const NOTE_FREQ: Record<string, number> = {
  '도': 261.63, '레': 293.66, '미': 329.63, '파': 349.23,
  '솔': 392.0, '라': 440.0, '시': 493.88, "도'": 523.25
}

export function playTone(freq: number, ms = 500) {
  const c = getCtx()
  if (!c) return
  try {
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0.0001, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.25, c.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + ms / 1000)
    osc.connect(gain); gain.connect(c.destination)
    osc.start()
    osc.stop(c.currentTime + ms / 1000 + 0.05)
  } catch {
    /* 무시 */
  }
}

export function playNote(name: string, ms = 500) {
  const f = NOTE_FREQ[name]
  if (f) playTone(f, ms)
}

// 멜로디(계이름 배열) 순차 재생
export function playMelody(notes: string[], noteMs = 420) {
  notes.forEach((n, i) => {
    setTimeout(() => playNote(n, noteMs * 0.9), i * noteMs)
  })
}

// 짧은 클릭(메트로놈)
export function playClick(high = false) {
  playTone(high ? 1200 : 800, 60)
}
