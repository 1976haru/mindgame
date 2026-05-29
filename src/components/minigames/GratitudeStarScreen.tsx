import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playSound } from '../../utils/sound'

const PRESETS = ['맛있는 밥을 먹었어', '친구랑 놀았어', '날씨가 좋았어', '가족이 안아줬어', '재미있는 책을 읽었어']
const STAR_POS = [{ x: 28, y: 30 }, { x: 60, y: 22 }, { x: 78, y: 48 }]

export function GratitudeStarScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const recordGratitude = useAppStore(s => s.recordGratitude)
  const [filled, setFilled] = useState<(string | null)[]>([null, null, null])
  const [editing, setEditing] = useState<number | null>(null)
  const [input, setInput] = useState('')
  const [done, setDone] = useState(false)

  const allFilled = filled.every(Boolean)

  const save = (text: string) => {
    if (!text.trim() || editing === null) return
    playSound('sparkle')
    const next = [...filled]; next[editing] = text.trim()
    setFilled(next); setEditing(null); setInput('')
    if (next.every(Boolean) && !done) { setDone(true); recordGratitude() }
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'radial-gradient(ellipse at top,#1a1a4a 0%,#0a0a1e 70%)' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setScreen('minigames')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>← 미니게임</button>
      </div>
      <div style={{ textAlign: 'center', padding: '0 24px 8px' }}>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>감사 별찾기</h2>
        <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>오늘 좋았던 일 3가지로 별자리를 만들어요</p>
      </div>

      {/* 밤하늘 + 별 */}
      <div style={{ position: 'relative', flex: 1, width: '100%' }}>
        {/* 별자리 연결선 */}
        {allFilled && (
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }}
              x1={`${STAR_POS[0].x}%`} y1={`${STAR_POS[0].y}%`} x2={`${STAR_POS[1].x}%`} y2={`${STAR_POS[1].y}%`} stroke="#fbbf24" strokeWidth="2" />
            <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }}
              x1={`${STAR_POS[1].x}%`} y1={`${STAR_POS[1].y}%`} x2={`${STAR_POS[2].x}%`} y2={`${STAR_POS[2].y}%`} stroke="#fbbf24" strokeWidth="2" />
          </svg>
        )}
        {STAR_POS.map((pos, i) => (
          <motion.button key={i}
            animate={filled[i] ? { scale: [1, 1.3, 1] } : { opacity: [0.4, 1, 0.4] }}
            transition={filled[i] ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
            onClick={() => { setEditing(i); setInput(filled[i] || '') }}
            style={{ position: 'absolute', left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)', fontSize: filled[i] ? 44 : 34 }}>
            ⭐
          </motion.button>
        ))}
        {filled.map((f, i) => f && (
          <div key={i} style={{ position: 'absolute', left: `${STAR_POS[i].x}%`, top: `${STAR_POS[i].y + 8}%`, transform: 'translateX(-50%)', fontSize: 16, color: '#fde68a', maxWidth: 120, textAlign: 'center' }}>{f}</div>
        ))}

        {done && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', bottom: '12%', left: 0, right: 0, textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontSize: 18, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>✨ 감사의 별자리 완성!</p>
            <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>정원에 영원히 빛날 거예요 · 공감 +3 💜</p>
          </motion.div>
        )}
      </div>

      {/* 입력 모달 */}
      {editing !== null && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 50 }} onClick={() => setEditing(null)}>
          <div onClick={e => e.stopPropagation()} style={{ width: '100%', maxWidth: 340, background: 'var(--color-bg-soft)', borderRadius: 18, padding: 20 }}>
            <p style={{ textAlign: 'center', marginBottom: 12, color: 'var(--color-text)' }}>오늘 좋았던 일 한 가지</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {PRESETS.map(p => <button key={p} onClick={() => save(p)} style={{ fontSize: 16, padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-soft)' }}>{p}</button>)}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input autoFocus value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && save(input)} placeholder="직접 적기" maxLength={30}
                style={{ flex: 1, padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none' }} />
              <button onClick={() => save(input)} style={{ padding: '0 18px', borderRadius: 12, background: 'var(--color-accent)', color: '#1f2937', fontWeight: 700 }}>별켜기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
