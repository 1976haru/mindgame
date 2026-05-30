import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'

interface Card { key: string; pairId: number; label: string }

export function CardMatchEngine({ config, color, onComplete }: EngineProps) {
  const pairs = config.pairs ?? []
  const cards = useMemo<Card[]>(() => {
    const list: Card[] = []
    pairs.forEach((p, i) => {
      list.push({ key: `${i}-a`, pairId: i, label: p.a })
      list.push({ key: `${i}-b`, pairId: i, label: p.b })
    })
    // 셔플
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[list[i], list[j]] = [list[j], list[i]]
    }
    return list
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<number[]>([])
  const [busy, setBusy] = useState(false)

  if (pairs.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }

  const flip = (card: Card) => {
    if (busy || flipped.includes(card.key) || matched.includes(card.pairId)) return
    const next = [...flipped, card.key]
    setFlipped(next)
    if (next.length === 2) {
      setBusy(true)
      const [aKey, bKey] = next
      const a = cards.find(c => c.key === aKey)!
      const b = cards.find(c => c.key === bKey)!
      if (a.pairId === b.pairId) {
        playSound('correct')
        const m = [...matched, a.pairId]
        setTimeout(() => {
          setMatched(m); setFlipped([]); setBusy(false)
          if (m.length === pairs.length) setTimeout(() => onComplete(true, { score: m.length, total: pairs.length }), 400)
        }, 500)
      } else {
        playSound('wrong')
        setTimeout(() => { setFlipped([]); setBusy(false) }, 800)
      }
    }
  }

  const cols = cards.length <= 8 ? 2 : cards.length <= 12 ? 3 : 4

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <h3 style={{ fontSize: 20, textAlign: 'center' }}>같은 짝을 찾아요! ({matched.length}/{pairs.length})</h3>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10, width: '100%' }}>
        {cards.map(c => {
          const show = flipped.includes(c.key) || matched.includes(c.pairId)
          const gone = matched.includes(c.pairId)
          return (
            <motion.button key={c.key} whileTap={{ scale: 0.95 }} animate={gone ? { opacity: 0.45, scale: 0.95 } : {}} onClick={() => flip(c)}
              style={{ minHeight: 70, padding: 8, borderRadius: 14, fontSize: 16, lineHeight: 1.25,
                background: show ? `${color}33` : 'rgba(255,255,255,0.07)',
                border: `2px solid ${gone ? '#6ee7b7' : show ? color : 'rgba(255,255,255,0.12)'}`, color: 'var(--color-text)' }}>
              {show ? c.label : '❓'}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
