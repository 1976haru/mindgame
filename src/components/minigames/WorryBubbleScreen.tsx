import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playSound } from '../../utils/sound'
import { uuid } from '../../utils/helpers'

const PRESETS = ['시험이 걱정돼', '친구랑 다퉜어', '혼날까 봐 무서워', '잠이 안 와', '실수할까 봐', '엄마가 보고 싶어', '발표가 떨려', '잘 못할까 봐']

interface Bubble { id: string; text: string; x: number }

export function WorryBubbleScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const awardEmpathy = useAppStore(s => s.awardEmpathy)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [input, setInput] = useState('')
  const [popped, setPopped] = useState(0)
  const [done, setDone] = useState(false)

  const addBubble = (text: string) => {
    if (!text.trim()) return
    setBubbles(b => [...b, { id: uuid(), text: text.trim(), x: 15 + Math.random() * 60 }])
    setInput('')
  }

  const pop = (id: string) => {
    playSound('pop')
    setBubbles(b => b.filter(x => x.id !== id))
    setPopped(p => {
      const n = p + 1
      if (n >= 5 && !done) { setDone(true); awardEmpathy(3) }
      return n
    })
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'linear-gradient(180deg,#1a2747 0%,#0f0f1e 100%)' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setScreen('minigames')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>← 미니게임</button>
        <span style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>터뜨린 걱정 {popped}개</span>
      </div>

      <div style={{ textAlign: 'center', padding: '0 24px 8px' }}>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>걱정 비눗방울</h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>걱정을 비눗방울에 담아 펑! 터뜨려요</p>
      </div>

      {/* 떠오르는 비눗방울 영역 */}
      <div style={{ position: 'relative', flex: 1, width: '100%', overflow: 'hidden' }}>
        <AnimatePresence>
          {bubbles.map(b => (
            <motion.button key={b.id}
              initial={{ bottom: -40, opacity: 0 }} animate={{ bottom: '100%', opacity: [0, 1, 1, 0.8] }} exit={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 12, ease: 'linear' }}
              onClick={() => pop(b.id)}
              style={{ position: 'absolute', left: `${b.x}%`, width: 100, height: 100, borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.5), rgba(147,197,253,0.35) 60%, rgba(124,92,255,0.25))',
                border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontSize: 12, padding: 6, lineHeight: 1.3, backdropFilter: 'blur(2px)' }}>
              {b.text}
            </motion.button>
          ))}
        </AnimatePresence>

        {done && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ position: 'absolute', top: '40%', left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
            <div style={{ fontSize: 40 }}>🎉</div>
            <p style={{ fontSize: 18, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>고생했어! 걱정이 가벼워졌어요</p>
            <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>공감 에너지 +3 💜</p>
          </motion.div>
        )}
      </div>

      {/* 입력 */}
      <div style={{ width: '100%', padding: '8px 16px 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {PRESETS.map(p => (
            <button key={p} onClick={() => addBubble(p)} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-soft)' }}>{p}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && addBubble(input)} placeholder="걱정을 적어볼까요?" maxLength={30}
            style={{ flex: 1, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none' }} />
          <button onClick={() => addBubble(input)} style={{ padding: '0 18px', borderRadius: 12, background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>담기</button>
        </div>
      </div>
    </div>
  )
}
