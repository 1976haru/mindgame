// Tone.js로 배경음악(BGM)을 실시간 생성한다(mp3 불필요).
// 부드러운 아르페지오 루프. 음소거/전환 지원. 오류 시에도 크래시 금지.
import * as Tone from 'tone'

export type BgmType = 'garden' | 'kingdom' | 'dojo' | 'night'

interface BgmPattern {
  notes: string[]
  bpm: number
  instrument: OscillatorType
  volume: number // dB
}

const BGM_PATTERNS: Record<BgmType, BgmPattern> = {
  // 정원: C장조 부드러운 아르페지오
  garden: { notes: ['C4', 'E4', 'G4', 'B4', 'A4', 'G4', 'E4', 'D4'], bpm: 60, instrument: 'sine', volume: -18 },
  // 왕국: F장조 웅장한 분위기
  kingdom: { notes: ['F3', 'A3', 'C4', 'F4', 'E4', 'C4', 'A3', 'G3'], bpm: 70, instrument: 'triangle', volume: -16 },
  // 도장: 활기찬 G장조
  dojo: { notes: ['G4', 'B4', 'D5', 'G4', 'D5', 'B4', 'G4', 'A4'], bpm: 90, instrument: 'square', volume: -22 },
  // 밤: A단조 잔잔
  night: { notes: ['A3', 'C4', 'E4', 'A3', 'G3', 'E4', 'C4', 'B3'], bpm: 50, instrument: 'sine', volume: -20 },
}

let currentBGM: BgmType | null = null
let isMusicMuted = false
let synth: Tone.PolySynth | null = null
let loop: Tone.Loop | null = null
let masterVolume = 1 // 0~1, 전체 음량 배율

function applyVolume(baseDb: number) {
  if (!synth) return
  // 0~1 음량을 dB 보정으로 반영(0이면 사실상 무음)
  const adjust = masterVolume <= 0 ? -60 : 20 * Math.log10(masterVolume)
  synth.volume.value = baseDb + adjust
}

export async function startBGM(type: BgmType): Promise<void> {
  if (isMusicMuted || currentBGM === type) return
  try {
    await Tone.start() // 브라우저 정책: 사용자 인터랙션 후
    stopBGM()

    const pattern = BGM_PATTERNS[type]
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: pattern.instrument },
      envelope: { attack: 0.1, decay: 0.3, sustain: 0.4, release: 1 },
    }).toDestination()
    applyVolume(pattern.volume)

    const transport = Tone.getTransport()
    transport.bpm.value = pattern.bpm
    let i = 0
    loop = new Tone.Loop((time) => {
      const note = pattern.notes[i % pattern.notes.length]
      synth?.triggerAttackRelease(note, '8n', time)
      i += 1
    }, '4n').start(0)

    transport.start()
    currentBGM = type
  } catch {
    // BGM 실패해도 게임은 계속
    currentBGM = null
  }
}

export function stopBGM(): void {
  try {
    loop?.stop()
    loop?.dispose()
    synth?.dispose()
    Tone.getTransport().stop()
  } catch {
    /* 무시 */
  }
  loop = null
  synth = null
  currentBGM = null
}

export function setMusicMuted(muted: boolean): void {
  isMusicMuted = muted
  if (muted) stopBGM()
}

export function setMusicVolume(volume: number): void {
  masterVolume = Math.max(0, Math.min(1, volume))
  if (synth && currentBGM) applyVolume(BGM_PATTERNS[currentBGM].volume)
}

export function getCurrentBGM(): BgmType | null {
  return currentBGM
}
