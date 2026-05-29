import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playSound } from '../../utils/sound'

const PALETTE = ['#ff7e7e', '#fbbf24', '#ffe066', '#6ee7b7', '#7eb3ff', '#c084fc', '#ff9ec7', '#a16207']
const REGION_LABELS = ['꽃잎', '꽃 중심', '줄기', '잎']

export function ColorPaintScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const addPaintedPlant = useAppStore(s => s.addPaintedPlant)
  const [selected, setSelected] = useState(PALETTE[0])
  const [fills, setFills] = useState<(string | null)[]>([null, null, null, null])
  const [done, setDone] = useState(false)

  const paint = (region: number) => {
    playSound('sparkle')
    const next = [...fills]; next[region] = selected; setFills(next)
  }
  const allFilled = fills.every(Boolean)

  const finish = () => {
    playSound('grow')
    addPaintedPlant(fills.map(f => f || '#e5e7eb'))
    setDone(true)
  }

  // 윤곽 + 탭 영역
  const regionFill = (i: number) => fills[i] || '#2a2a3e'

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setScreen('minigames')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>← 미니게임</button>
      </div>
      <div style={{ textAlign: 'center', padding: '0 24px 8px' }}>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>마음 색칠</h2>
        <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>색을 고르고 그림을 톡톡 칠해보세요</p>
      </div>

      {!done ? (
        <>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={260} height={260} viewBox="0 0 120 120">
              <path d="M60 110 Q58 80 60 54" stroke={regionFill(2)} strokeWidth="6" fill="none" strokeLinecap="round" onClick={() => paint(2)} style={{ cursor: 'pointer' }} />
              <path d="M60 84 Q44 78 38 88 Q50 92 60 88 Z" fill={regionFill(3)} stroke="#888" strokeWidth="1" onClick={() => paint(3)} style={{ cursor: 'pointer' }} />
              {[0, 60, 120, 180, 240, 300].map(d => (
                <ellipse key={d} cx="60" cy="30" rx="9" ry="16" fill={regionFill(0)} stroke="#888" strokeWidth="1" transform={`rotate(${d} 60 48)`} onClick={() => paint(0)} style={{ cursor: 'pointer' }} />
              ))}
              <circle cx="60" cy="48" r="9" fill={regionFill(1)} stroke="#888" strokeWidth="1" onClick={() => paint(1)} style={{ cursor: 'pointer' }} />
            </svg>
          </div>

          {/* 진행 표시 */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap', padding: '0 16px' }}>
            {REGION_LABELS.map((label, i) => (
              <span key={i} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 999, background: fills[i] ? fills[i]! : 'rgba(255,255,255,0.08)', color: fills[i] ? '#1f2937' : 'var(--color-text-soft)' }}>{label}</span>
            ))}
          </div>

          {/* 팔레트 */}
          <div style={{ width: '100%', padding: '8px 16px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
              {PALETTE.map(col => (
                <button key={col} onClick={() => setSelected(col)} style={{ width: 38, height: 38, borderRadius: '50%', background: col, border: selected === col ? '3px solid white' : '3px solid transparent', boxShadow: selected === col ? '0 0 12px rgba(255,255,255,0.6)' : 'none' }} />
              ))}
            </div>
            <motion.button whileTap={{ scale: 0.96 }} disabled={!allFilled} onClick={finish}
              style={{ width: '100%', padding: 16, fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', opacity: allFilled ? 1 : 0.4,
                background: 'linear-gradient(135deg,#34d399,#10b981)', color: 'white' }}>
              {allFilled ? '정원에 심기 🌱' : '모든 곳을 칠해주세요'}
            </motion.button>
          </div>
        </>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <svg width={200} height={200} viewBox="0 0 120 120">
            <path d="M60 110 Q58 80 60 54" stroke={fills[2]!} strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M60 84 Q44 78 38 88 Q50 92 60 88 Z" fill={fills[3]!} />
            {[0, 60, 120, 180, 240, 300].map(d => <ellipse key={d} cx="60" cy="30" rx="9" ry="16" fill={fills[0]!} transform={`rotate(${d} 60 48)`} />)}
            <circle cx="60" cy="48" r="9" fill={fills[1]!} />
          </svg>
          <p style={{ fontSize: 20, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>멋진 식물이 정원에 심어졌어요!</p>
          <button onClick={() => setScreen('garden')} style={{ padding: '14px 32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', fontWeight: 700, fontSize: 16 }}>정원 보러가기 🌿</button>
        </motion.div>
      )}
    </div>
  )
}
