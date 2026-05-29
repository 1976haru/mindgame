import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura, stemTransform } from './plantBase'

/* 31. 반짝 봉오리 (common) */
export function SparkleBlossom({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 75 60 45" stroke="#86efac" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="85" rx="7" ry="4" fill="#86efac" transform="rotate(-30 48 85)" />
        <ellipse cx="72" cy="75" rx="7" ry="4" fill="#86efac" transform="rotate(30 72 75)" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.5 }} style={{ transformOrigin: '60px 40px' }}>
        {[0, 72, 144, 216, 288].map(deg => (
          <ellipse key={deg} cx="60" cy="28" rx="7" ry="12" fill="#ff9ec7" transform={`rotate(${deg} 60 40)`} />
        ))}
        <circle cx="60" cy="40" r="6" fill="#fce7f3" />
        {[[40, 25], [80, 30], [85, 50], [35, 50]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="10" fill="#fbbf24" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }}>✨</motion.text>
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 32. 두근 심장꽃 (common) */
export function ThumpHeartflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 78 60 52" stroke="#fb7185" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="84" rx="7" ry="4" fill="#86efac" transform="rotate(-30 48 84)" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 44px' }}>
        <motion.path d="M60 56 C50 44 40 40 40 32 C40 26 46 24 50 28 C54 24 60 26 60 32 C60 26 66 24 70 28 C74 24 80 26 80 32 C80 40 70 44 60 56 Z" fill="#fb7185"
          animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 0.9, repeat: Infinity }} style={{ transformOrigin: '60px 40px' }} />
      </motion.g>
    </PlantSvg>
  )
}

/* 33. 폭죽 화염초 (rare) */
export function FireworkFlameflower({ size = 120, growProgress = 1 }: PlantProps) {
  const colors = ['#ff7e7e', '#fbbf24', '#6ee7b7', '#7eb3ff', '#ff9ec7']
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 80 60 56" stroke="#65a30d" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 44px' }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.line key={i} x1="60" y1="44" x2="60" y2="20" stroke={colors[i % colors.length]} strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 30} 60 44)`}
            animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity }} style={{ transformOrigin: '60px 44px' }} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.circle key={i} cx="60" cy="20" r="2" fill={colors[i % colors.length]} transform={`rotate(${i * 30} 60 44)`} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, delay: i * 0.08, repeat: Infinity }} />
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 34. 별가루 폭포꽃 (rare) */
export function StardustWaterfallflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 80 60 50" stroke="#22d3ee" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 42px' }}>
        {[0, 60, 120, 180, 240, 300].map(d => <ellipse key={d} cx="60" cy="30" rx="5" ry="11" fill="#a5f3fc" transform={`rotate(${d} 60 42)`} />)}
        <circle cx="60" cy="42" r="5" fill="#67e8f9" />
        {/* 쏟아지는 별가루 */}
        {[48, 56, 64, 72].map((x, i) => (
          <motion.text key={x} x={x} y="56" fontSize="8" animate={{ y: [56, 100], opacity: [1, 0] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}>✨</motion.text>
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 35. 첫사랑 벚꽃 (epic) */
export function FirstloveCherryblossom({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 Q56 80 60 56 Q66 46 60 38" stroke="#92400e" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 70 Q44 64 38 72 M60 60 Q76 54 84 60" stroke="#92400e" strokeWidth="2.5" fill="none" />
        {[[60, 38], [42, 70], [82, 60], [50, 52], [70, 50]].map(([cx, cy], i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map(d => (
              <ellipse key={d} cx={cx} cy={cy - 7} rx="3.5" ry="6" fill="#fbcfe8" transform={`rotate(${d} ${cx} ${cy})`} />
            ))}
            <circle cx={cx} cy={cy} r="2.5" fill="#f472b6" />
          </g>
        ))}
        {/* 흩날리는 꽃잎 */}
        {[30, 90].map((x, i) => (
          <motion.ellipse key={x} cx={x} cy="40" rx="3" ry="5" fill="#fbcfe8" animate={{ y: [0, 50], x: [0, i ? -10 : 10], opacity: [1, 0], rotate: [0, 180] }} transition={{ duration: 3, delay: i, repeat: Infinity }} />
        ))}
      </g>
    </PlantSvg>
  )
}

/* 36. 모험가의 깃발나무 (epic) */
export function AdventurerFlagtree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="44" y="36" width="4" height="74" rx="2" fill="#78350f" />
        <ellipse cx="60" cy="100" rx="26" ry="7" fill="#16a34a" opacity="0.4" />
        <motion.path d="M48 38 L86 46 L48 56 Z" fill="#ef4444" animate={{ skewY: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '48px 46px' }} />
        <text x="62" y="50" fontSize="9" textAnchor="middle">⛰️</text>
        <circle cx="46" cy="34" r="3" fill="#fbbf24" />
      </g>
    </PlantSvg>
  )
}

/* 37. 운명의 별꽃 (legendary) */
export function DestinyStarflower({ size = 120, growProgress = 1 }: PlantProps) {
  const star = (cx: number, cy: number, r: number) => {
    const pts: string[] = []
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI / 5) * (2 * i) - Math.PI / 2
      const a2 = a + Math.PI / 5
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
      pts.push(`${cx + r * 0.4 * Math.cos(a2)},${cy + r * 0.4 * Math.sin(a2)}`)
    }
    return pts.join(' ')
  }
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 78 60 50" stroke="#7c5cff" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0, rotate: -120 }} animate={{ scale: growProgress, rotate: 0 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ transformOrigin: '60px 42px' }}>
        <motion.polygon points={star(60, 42, 22)} fill="#fde047" stroke="#f59e0b" strokeWidth="1"
          animate={{ rotate: [0, 360] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 42px' }} />
        <polygon points={star(60, 42, 11)} fill="#fffbe6" />
      </motion.g>
    </PlantSvg>
  )
}

/* 38. 꿈을 이룬 황금나무 (legendary) */
export function DreamGoldentree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 L60 64 M60 80 Q44 72 38 60 M60 76 Q76 68 84 56 M60 70 Q50 60 50 50 M60 70 Q70 60 70 50" stroke="#b45309" strokeWidth="4" fill="none" strokeLinecap="round" />
        {[[38, 56], [50, 46], [60, 42], [70, 46], [84, 52], [44, 64], [76, 62]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="8" fill="#fbbf24" animate={{ opacity: [0.8, 1, 0.8], scale: [0.95, 1.05, 0.95] }} transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity }} />
        ))}
        {[[40, 80], [80, 84]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="10" animate={{ y: [y, y + 14], opacity: [1, 0] }} transition={{ duration: 3, delay: i, repeat: Infinity }}>✨</motion.text>
        ))}
      </g>
    </PlantSvg>
  )
}
