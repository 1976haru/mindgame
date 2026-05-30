import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'

export function CardOrderEngine({ config, color, onComplete }: EngineProps) {
  const items = config.orderItems ?? []
  const shuffled = useMemo(() => {
    const list = items.map((it, i) => ({ ...it, key: i }))
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[list[i], list[j]] = [list[j], list[i]]
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [placed, setPlaced] = useState<number[]>([])  // key 순서
  const [wrongKey, setWrongKey] = useState<number | null>(null)

  if (items.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }

  const tap = (key: number, correctIndex: number) => {
    if (placed.includes(key)) return
    const slot = placed.length
    if (correctIndex === slot) {
      playSound('correct')
      const next = [...placed, key]
      setPlaced(next)
      if (next.length === items.length) setTimeout(() => onComplete(true, { score: items.length, total: items.length }), 500)
    } else {
      playSound('wrong')
      setWrongKey(key)
      setTimeout(() => setWrongKey(null), 600)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <h3 style={{ fontSize: 20, textAlign: 'center' }}>순서대로 골라요! ({placed.length}/{items.length})</h3>

      {/* 정렬된 슬롯 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', minHeight: 40 }}>
        {placed.map((k, i) => {
          const it = shuffled.find(s => s.key === k)!
          return <div key={k} style={{ padding: '8px 12px', borderRadius: 10, background: `${color}33`, border: `2px solid ${color}`, fontSize: 16 }}>{i + 1}. {it.emoji ?? ''}{it.label}</div>
        })}
      </div>

      {/* 선택지 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {shuffled.map(it => {
          const used = placed.includes(it.key)
          return (
            <motion.button key={it.key} disabled={used} whileTap={{ scale: 0.95 }}
              animate={wrongKey === it.key ? { x: [0, -8, 8, 0] } : {}}
              onClick={() => tap(it.key, it.correctIndex)}
              style={{ padding: '14px 16px', borderRadius: 14, fontSize: 17, opacity: used ? 0.3 : 1,
                background: wrongKey === it.key ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.07)',
                border: `2px solid ${color}55`, color: 'var(--color-text)' }}>
              {it.emoji ? it.emoji + ' ' : ''}{it.label}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
