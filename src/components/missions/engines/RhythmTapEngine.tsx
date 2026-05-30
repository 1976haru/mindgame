import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playClick } from '../../../utils/audio'
import { playSound } from '../../../utils/sound'

type Phase = 'ready' | 'count' | 'play' | 'done'

export function RhythmTapEngine({ config, color, onComplete }: EngineProps) {
  const beats = config.beats ?? 8
  const tempo = config.tempo ?? 700
  const tolerance = config.tolerance ?? 220
  const [phase, setPhase] = useState<Phase>('ready')
  const [count, setCount] = useState(3)
  const [hits, setHits] = useState(0)
  const [beatIdx, setBeatIdx] = useState(0)
  const [feedback, setFeedback] = useState<'' | 'perfect' | 'good' | 'miss'>('')
  const expected = useRef<number[]>([])
  const matched = useRef<boolean[]>([])
  const t0 = useRef(0)

  // 카운트다운
  useEffect(() => {
    if (phase !== 'count') return
    if (count <= 0) { startPlay(); return }
    playClick(false)
    const t = setTimeout(() => setCount(c => c - 1), 600)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, count])

  const startPlay = () => {
    t0.current = performance.now()
    expected.current = Array.from({ length: beats }, (_, i) => t0.current + tempo * (i + 1))
    matched.current = new Array(beats).fill(false)
    setPhase('play')
    expected.current.forEach((tm, i) => {
      setTimeout(() => { playClick(i % 4 === 0); setBeatIdx(i + 1) }, tm - performance.now())
    })
    // 종료
    setTimeout(() => finish(), tempo * (beats + 1.2))
  }

  const finish = () => {
    setPhase('done')
    const got = matched.current.filter(Boolean).length
    setHits(got)
    const ok = got / beats >= 0.7
    setTimeout(() => onComplete(ok, { score: got, total: beats }), 600)
  }

  const tap = () => {
    if (phase === 'ready') { setPhase('count'); return }
    if (phase !== 'play') return
    const now = performance.now()
    // 가장 가까운 미매칭 비트
    let best = -1, bestErr = Infinity
    expected.current.forEach((tm, i) => {
      if (matched.current[i]) return
      const err = Math.abs(now - tm)
      if (err < bestErr) { bestErr = err; best = i }
    })
    if (best >= 0 && bestErr <= tolerance) {
      matched.current[best] = true
      setHits(h => h + 1)
      const fb = bestErr <= tolerance * 0.45 ? 'perfect' : 'good'
      setFeedback(fb); playSound('correct')
    } else {
      setFeedback('miss'); playSound('wrong')
    }
    setTimeout(() => setFeedback(''), 250)
  }

  return (
    <div onClick={tap} style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', gap: 20 }}>
      {phase === 'ready' && (
        <>
          <div style={{ fontSize: 64 }}>🥁</div>
          <h3 style={{ fontSize: 22, textAlign: 'center', padding: '0 24px' }}>박자에 맞춰 화면을 탭해요!<br />화면을 눌러 시작</h3>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{beats}번 · {Math.round(60000 / tempo)} BPM</p>
        </>
      )}
      {phase === 'count' && <div style={{ fontSize: 100, fontWeight: 700, color }}>{count > 0 ? count : '시작!'}</div>}
      {phase === 'play' && (
        <>
          <motion.div key={beatIdx} initial={{ scale: 1 }} animate={{ scale: [1.3, 1] }} transition={{ duration: 0.25 }}
            style={{ width: 180, height: 180, borderRadius: '50%', background: `radial-gradient(circle at 35% 35%, ${color}, #4c1d95)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, boxShadow: `0 0 40px ${color}88` }}>
            {feedback === 'perfect' ? '✨' : feedback === 'good' ? '👍' : feedback === 'miss' ? '💨' : '👆'}
          </motion.div>
          <p style={{ fontSize: 18, color: 'var(--color-text-soft)' }}>{beatIdx} / {beats} · 성공 {hits}</p>
          {feedback && <p style={{ fontSize: 22, fontWeight: 700, color: feedback === 'miss' ? '#f87171' : '#6ee7b7' }}>{feedback === 'perfect' ? '완벽!' : feedback === 'good' ? '좋아요!' : '아쉬워요'}</p>}
        </>
      )}
      {phase === 'done' && <div style={{ fontSize: 64 }}>🎵</div>}
    </div>
  )
}
