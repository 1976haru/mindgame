import { useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playNote, playMelody } from '../../../utils/audio'
import { playSound } from '../../../utils/sound'

export function PitchMatchEngine({ config, color, onComplete }: EngineProps) {
  const rounds = config.pitchRounds ?? []
  const need = config.needCorrect ?? Math.ceil(rounds.length * 0.8)
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  if (rounds.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }
  const round = rounds[idx]

  const playTarget = () => {
    const parts = round.play.split(/[-\s]/).filter(Boolean)
    if (parts.length > 1) playMelody(parts, 420)
    else playNote(round.play, 600)
  }

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    const right = i === round.answer
    if (right) { playSound('correct'); setCorrect(c => c + 1) } else playSound('wrong')
    setTimeout(() => {
      if (idx < rounds.length - 1) { setIdx(idx + 1); setPicked(null) }
      else { const fc = correct + (right ? 1 : 0); onComplete(fc >= need, { score: fc, total: rounds.length }) }
    }, 900)
  }

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{idx + 1} / {rounds.length} · 정답 {correct}개</div>
      <h3 style={{ fontSize: 20, textAlign: 'center' }}>소리를 듣고 어떤 음인지 골라요</h3>
      <motion.button whileTap={{ scale: 0.9 }} onClick={playTarget}
        style={{ width: 110, height: 110, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${color}, #4c1d95)`, color: 'white', fontSize: 40, boxShadow: `0 0 30px ${color}88` }}>
        🔊
      </motion.button>
      <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>스피커를 눌러 다시 들을 수 있어요</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {round.choices.map((c, i) => {
          const show = picked !== null
          const isAns = i === round.answer
          return (
            <motion.button key={i} whileTap={{ scale: 0.94 }} onClick={() => { playNote(c.replace(/[0-9]/g, ''), 400); pick(i) }}
              style={{ minWidth: 72, padding: '16px 18px', fontSize: 22, fontWeight: 700, borderRadius: 14,
                background: show ? (isAns ? 'rgba(110,231,183,0.3)' : i === picked ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.05)') : `${color}22`,
                border: `2px solid ${show && isAns ? '#6ee7b7' : color + '55'}`, color: 'var(--color-text)' }}>
              {c}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
