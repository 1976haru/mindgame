import { motion } from 'framer-motion'
import { Rarity } from '../../data/plants'

export interface PlantProps {
  size?: number
  growProgress?: number  // 0~1
}

// 공통: 줄기와 잎의 자라는 transform
export function stemTransform(progress: number): string {
  return `scaleY(${progress})`
}

/**
 * 희귀도별 시각 효과 (viewBox 0 0 120 120 기준).
 * 식물 SVG의 맨 앞(뒤 배경)에 넣어 후광·반짝이를 표현.
 */
export function RarityAura({ rarity }: { rarity: Rarity }) {
  if (rarity === 'common') return null

  if (rarity === 'rare') {
    return (
      <>
        {[[28, 30], [92, 40]].map(([x, y], i) => (
          <motion.text
            key={i} x={x} y={y} fontSize="11"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5] }}
            transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
          >✨</motion.text>
        ))}
      </>
    )
  }

  if (rarity === 'epic') {
    return (
      <>
        {/* 회전하는 후광 */}
        <motion.g
          style={{ transformOrigin: '60px 60px' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="60" cy="60" r="48" fill="none" stroke="url(#epicHalo)" strokeWidth="2" strokeDasharray="6 10" opacity="0.6" />
        </motion.g>
        <defs>
          <linearGradient id="epicHalo" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ff9ec7" />
          </linearGradient>
        </defs>
        {[[20, 28], [98, 36], [100, 88], [18, 84]].map(([x, y], i) => (
          <motion.text
            key={i} x={x} y={y} fontSize="10"
            animate={{ opacity: [0, 1, 0], scale: [0.4, 1.2, 0.4] }}
            transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }}
          >✨</motion.text>
        ))}
      </>
    )
  }

  // legendary: 무지개 펄스 + 다중 반짝이
  return (
    <>
      <motion.circle
        cx="60" cy="60" r="50" fill="url(#legendGlow)"
        animate={{ scale: [0.85, 1.05, 0.85], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '60px 60px' }}
      />
      <motion.g
        style={{ transformOrigin: '60px 60px' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      >
        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#legendRing)" strokeWidth="2.5" strokeDasharray="4 8" />
      </motion.g>
      <defs>
        <radialGradient id="legendGlow">
          <stop offset="0%" stopColor="#fff6c8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff9ec7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="legendRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff7e7e" />
          <stop offset="33%" stopColor="#ffd84d" />
          <stop offset="66%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#7c5cff" />
        </linearGradient>
      </defs>
      {[['✨', 16, 26], ['🌟', 96, 30], ['✨', 102, 84], ['🌟', 14, 88], ['✨', 60, 12]].map(([s, x, y], i) => (
        <motion.text
          key={i} x={x as number} y={y as number} fontSize="12"
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }}
          transition={{ duration: 2, delay: i * 0.35, repeat: Infinity }}
        >{s}</motion.text>
      ))}
    </>
  )
}

/** SVG 래퍼 — 일관된 viewBox와 크기 */
export function PlantSvg({ size = 120, children }: { size?: number; children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {children}
    </svg>
  )
}
