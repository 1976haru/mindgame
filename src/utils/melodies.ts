// 음악 도장용 동요/멜로디 (저작권 free — 전래동요·퍼블릭도메인 클래식만).
// Tone.js로 실시간 연주. 음소거 시 무음. 오류 시 무시.
import * as Tone from 'tone'

// 멜로디 음표 데이터 (저작권 없는 전래동요/클래식만)
export const MELODIES: Record<string, string[]> = {
  // 비행기 (전래)
  airplane: ['G4', 'E4', 'E4', 'F4', 'D4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'G4', 'G4'],
  // 학교종 (전래)
  schoolbell: ['G4', 'G4', 'A4', 'A4', 'G4', 'G4', 'E4', 'G4', 'G4', 'E4', 'E4', 'D4'],
  // 나비야 (전래)
  butterfly: ['G4', 'E4', 'E4', 'F4', 'D4', 'D4', 'C4', 'D4', 'E4', 'F4', 'G4', 'G4', 'G4'],
  // 작은별 (모차르트, 퍼블릭도메인)
  twinkle: ['C4', 'C4', 'G4', 'G4', 'A4', 'A4', 'G4', 'F4', 'F4', 'E4', 'E4', 'D4', 'D4', 'C4'],
  // 도레미 (음계)
  doremi: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
}

export type MelodyName = keyof typeof MELODIES

let isMelodyMuted = false

export function setMelodyMuted(muted: boolean): void {
  isMelodyMuted = muted
}

// 음표 배열을 순차 연주. bpm으로 속도 조절.
export async function playMelody(notes: string[], bpm = 120): Promise<void> {
  if (isMelodyMuted || notes.length === 0) return
  try {
    await Tone.start()
    const synth = new Tone.Synth({ oscillator: { type: 'triangle' } }).toDestination()
    synth.volume.value = -10
    const noteDuration = 60 / bpm
    const now = Tone.now()
    notes.forEach((note, i) => {
      synth.triggerAttackRelease(note, '8n', now + i * noteDuration)
    })
    setTimeout(() => synth.dispose(), notes.length * noteDuration * 1000 + 500)
  } catch {
    /* 무시 */
  }
}

// 이름으로 동요 연주
export async function playSong(name: MelodyName, bpm = 120): Promise<void> {
  return playMelody(MELODIES[name], bpm)
}
