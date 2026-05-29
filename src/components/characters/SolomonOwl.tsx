import { motion } from 'framer-motion'

export type OwlExpression = 'normal' | 'thinking' | 'smile' | 'serious'

interface SolomonOwlProps {
  size?: number
  expression?: OwlExpression
}

/** 황금 부엉이 솔로몬 — 작은 왕관, 큰 눈, 표정 4종 */
export function SolomonOwl({ size = 160, expression = 'normal' }: SolomonOwlProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 160 160" animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
      <defs>
        <radialGradient id="owlBody"><stop offset="0%" stopColor="#fde047" /><stop offset="100%" stopColor="#d97706" /></radialGradient>
        <radialGradient id="owlGlow"><stop offset="0%" stopColor="#fff6c8" stopOpacity="0.7" /><stop offset="100%" stopColor="#fbbf24" stopOpacity="0" /></radialGradient>
      </defs>
      {/* 후광 */}
      <motion.circle cx="80" cy="84" r="64" fill="url(#owlGlow)" animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '80px 84px' }} />

      {/* 날개 */}
      <motion.path d="M40 88 Q20 96 30 118 Q40 110 48 104 Z" fill="#b45309" animate={{ rotate: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '44px 96px' }} />
      <motion.path d="M120 88 Q140 96 130 118 Q120 110 112 104 Z" fill="#b45309" animate={{ rotate: [0, 4, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '116px 96px' }} />

      {/* 몸 */}
      <ellipse cx="80" cy="92" rx="44" ry="48" fill="url(#owlBody)" />
      <ellipse cx="80" cy="100" rx="30" ry="34" fill="#fef3c7" />
      {/* 가슴 깃털 무늬 */}
      {[88, 102, 116].map(y => <path key={y} d={`M64 ${y} Q80 ${y + 8} 96 ${y}`} fill="none" stroke="#fcd34d" strokeWidth="2" />)}

      {/* 귀깃 */}
      <path d="M52 52 L58 32 L66 50 Z" fill="#d97706" />
      <path d="M108 52 L102 32 L94 50 Z" fill="#d97706" />

      {/* 눈 */}
      <circle cx="64" cy="70" r="18" fill="#fff" />
      <circle cx="96" cy="70" r="18" fill="#fff" />
      {expression === 'thinking' ? (
        <>
          <circle cx="68" cy="66" r="7" fill="#1c1917" />
          <circle cx="92" cy="66" r="7" fill="#1c1917" />
        </>
      ) : (
        <motion.g animate={{ scaleY: [1, 1, 0.1, 1] }} transition={{ duration: 4, times: [0, 0.92, 0.96, 1], repeat: Infinity }} style={{ transformOrigin: '80px 70px' }}>
          <circle cx="64" cy="70" r="8" fill="#1c1917" />
          <circle cx="96" cy="70" r="8" fill="#1c1917" />
          <circle cx="67" cy="67" r="2.5" fill="#fff" />
          <circle cx="99" cy="67" r="2.5" fill="#fff" />
        </motion.g>
      )}
      {/* 눈썹 (표정) */}
      {expression === 'serious' && <><path d="M52 56 L74 62" stroke="#92400e" strokeWidth="3" strokeLinecap="round" /><path d="M108 56 L86 62" stroke="#92400e" strokeWidth="3" strokeLinecap="round" /></>}
      {expression === 'thinking' && <><path d="M52 58 Q64 54 74 58" stroke="#92400e" strokeWidth="3" fill="none" strokeLinecap="round" /></>}

      {/* 부리 */}
      <path d="M74 80 L86 80 L80 92 Z" fill="#f59e0b" />
      {expression === 'smile' && <path d="M70 96 Q80 104 90 96" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />}

      {/* 왕관 */}
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <path d="M60 36 L66 22 L74 32 L80 18 L86 32 L94 22 L100 36 Z" fill="#ffd84d" stroke="#f59e0b" strokeWidth="1.5" />
        <rect x="60" y="36" width="40" height="5" rx="2" fill="#fbbf24" />
        <circle cx="80" cy="20" r="2.5" fill="#ef4444" />
        <circle cx="66" cy="24" r="2" fill="#22c55e" />
        <circle cx="94" cy="24" r="2" fill="#3b82f6" />
      </motion.g>
    </motion.svg>
  )
}

/** 타이핑 효과 말풍선 */
import { useEffect, useState } from 'react'
export function SpeechBubble({ text, speed = 38, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [shown, setShown] = useState('')
  useEffect(() => {
    setShown('')
    let i = 0
    const timer = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) { clearInterval(timer); onDone?.() }
    }, speed)
    return () => clearInterval(timer)
  }, [text, speed])
  return (
    <div style={{
      position: 'relative', background: 'rgba(255,255,255,0.95)', color: '#1f2937',
      borderRadius: 18, padding: '18px 22px', fontSize: 18, lineHeight: 1.6, maxWidth: 360,
      fontFamily: 'var(--font-display)', boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
    }}>
      {shown}<span style={{ opacity: shown.length < text.length ? 1 : 0 }}>▋</span>
    </div>
  )
}
