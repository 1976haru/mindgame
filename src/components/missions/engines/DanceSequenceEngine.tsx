import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'
import { playClick } from '../../../utils/audio'

type Phase = 'watch' | 'input' | 'done'

export function DanceSequenceEngine({ config, color, onComplete }: EngineProps) {
  const moves = config.moves ?? []
  const sequence = config.sequence ?? []
  const [phase, setPhase] = useState<Phase>('watch')
  const [highlight, setHighlight] = useState<string | null>(null)
  const [input, setInput] = useState<string[]>([])
  const [wrong, setWrong] = useState(false)

  // 시연
  useEffect(() => {
    if (phase !== 'watch') return
    let i = 0
    const step = () => {
      if (i >= sequence.length) { setHighlight(null); setTimeout(() => setPhase('input'), 400); return }
      setHighlight(sequence[i]); playClick(i % 2 === 0)
      setTimeout(() => { setHighlight(null); i++; setTimeout(step, 250) }, 600)
    }
    const t = setTimeout(step, 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  const moveById = (id: string) => moves.find(m => m.id === id)

  const tap = (id: string) => {
    if (phase !== 'input') return
    const nextInput = [...input, id]
    const pos = nextInput.length - 1
    if (sequence[pos] !== id) {
      setWrong(true); playSound('wrong')
      setTimeout(() => { setWrong(false); setInput([]) }, 700)
      return
    }
    playSound('correct')
    setInput(nextInput)
    if (nextInput.length === sequence.length) {
      setPhase('done')
      setTimeout(() => onComplete(true, { score: sequence.length, total: sequence.length }), 700)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <h3 style={{ fontSize: 20, textAlign: 'center' }}>
        {phase === 'watch' ? '백조 공주의 동작을 잘 봐요 👀' : phase === 'input' ? '같은 순서로 따라 해요!' : '완벽해요! 💃'}
      </h3>

      {/* 진행 표시 */}
      <div style={{ display: 'flex', gap: 6 }}>
        {sequence.map((_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: i < input.length ? color : 'rgba(255,255,255,0.15)' }} />
        ))}
      </div>

      {/* 동작 버튼 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
        {moves.map(m => {
          const lit = highlight === m.id
          return (
            <motion.button key={m.id} animate={lit ? { scale: [1, 1.25, 1] } : {}} transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.92 }} onClick={() => tap(m.id)}
              style={{ width: 96, height: 96, borderRadius: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                background: lit ? color : `${color}22`, border: `2px solid ${color}66`, color: 'var(--color-text)' }}>
              <span style={{ fontSize: 34 }}>{m.emoji}</span>
              <span style={{ fontSize: 16 }}>{m.label}</span>
            </motion.button>
          )
        })}
      </div>

      {wrong && <p style={{ fontSize: 18, color: '#f87171', fontWeight: 700 }}>순서가 달라요! 처음부터 다시 ✨</p>}
      {phase === 'watch' && highlight && <p style={{ fontSize: 18, color }}>{moveById(highlight)?.label}</p>}
    </div>
  )
}
