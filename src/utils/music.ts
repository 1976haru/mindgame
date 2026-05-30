// Tone.js로 배경음악(BGM)을 실시간 생성한다(mp3 불필요).
// 부드럽게 이어지는 패드(pad) 사운드. 코드(화음)를 천천히 흐르듯 바꾼다.
// 음소거/전환 지원. 오류 시에도 크래시 금지.
import * as Tone from 'tone'

export type BgmType = 'garden' | 'kingdom' | 'dojo' | 'night'

interface BgmPattern {
  chords: string[][] // 천천히 바뀌는 화음 진행 (한 칸 = 동시에 울리는 음들)
  bpm: number        // 느리게 흐르도록 낮게
  volume: number     // dB (낮게, ~-25)
}

// 단음 반복 대신 잔잔한 코드 진행. 한 마디(약 4~5초)마다 다음 화음으로 부드럽게 전환.
const BGM_PATTERNS: Record<BgmType, BgmPattern> = {
  // 정원: C장조 — 포근한 I–vi–IV–V
  garden: { chords: [['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']], bpm: 48, volume: -25 },
  // 왕국: F장조 — 따뜻하고 넓게
  kingdom: { chords: [['F3', 'A3', 'C4'], ['C3', 'E3', 'G3'], ['D3', 'F3', 'A3'], ['A2', 'C3', 'E3']], bpm: 50, volume: -25 },
  // 도장: G장조 — 차분하지만 살짝 또렷
  dojo: { chords: [['G3', 'B3', 'D4'], ['E3', 'G3', 'B3'], ['C3', 'E3', 'G3'], ['D3', 'F#3', 'A3']], bpm: 54, volume: -25 },
  // 밤: A단조 — 아주 잔잔
  night: { chords: [['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['E3', 'G3', 'B3']], bpm: 42, volume: -26 },
}

let currentBGM: BgmType | null = null
let isMusicMuted = false
let synth: Tone.PolySynth | null = null
let filter: Tone.Filter | null = null
let reverb: Tone.Reverb | null = null
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

    // 신호 체인: PolySynth → 로우패스 필터(부드럽게) → 리버브(공간감) → 출력
    reverb = new Tone.Reverb({ decay: 8, wet: 0.55 })
    try { await reverb.ready } catch { /* 일부 환경에서 ready 없음 */ }
    reverb.toDestination()
    filter = new Tone.Filter({ type: 'lowpass', frequency: 1400, rolloff: -24 }).connect(reverb)

    synth = new Tone.PolySynth(Tone.Synth, {
      // 살짝 디튠된 사인(fatsine) = 따뜻하고 두툼한 패드. sine보다 부드럽고 풍성.
      oscillator: { type: 'fatsine', count: 3, spread: 24 },
      // 길게 떠올라(attack) 길게 사라짐(release) → 끊김 없이 이어지는 레가토 패드
      envelope: { attack: 2.2, decay: 1.5, sustain: 0.9, release: 5 },
    }).connect(filter)
    applyVolume(pattern.volume)

    const transport = Tone.getTransport()
    transport.bpm.value = pattern.bpm

    let i = 0
    // 한 마디(1m)마다 다음 화음으로. 음 길이도 한 마디 → 긴 릴리스로 다음 화음과 겹쳐 흐름.
    loop = new Tone.Loop((time) => {
      const chord = pattern.chords[i % pattern.chords.length]
      synth?.triggerAttackRelease(chord, '1m', time)
      i += 1
    }, '1m').start(0)

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
    filter?.dispose()
    reverb?.dispose()
    Tone.getTransport().stop()
  } catch {
    /* 무시 */
  }
  loop = null
  synth = null
  filter = null
  reverb = null
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
