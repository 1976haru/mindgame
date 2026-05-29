import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura, stemTransform } from './plantBase'

/* 1. 햇살민들레 (common) */
export function SunshineDandelion({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 70 60 40" stroke="#5cb85c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="80" rx="8" ry="4" fill="#5cb85c" transform="rotate(-30 50 80)" />
        <ellipse cx="70" cy="90" rx="8" ry="4" fill="#5cb85c" transform="rotate(30 70 90)" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} style={{ transformOrigin: '60px 40px' }} transition={{ duration: 0.6, delay: 0.5 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx="60" cy="22" rx="3" ry="14" fill="#ffd84d" transform={`rotate(${i * 30} 60 40)`} />
        ))}
        <circle cx="60" cy="40" r="8" fill="#f59e0b" />
      </motion.g>
    </PlantSvg>
  )
}

/* 2. 노란 웃음꽃 (common) */
export function YellowLaughflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q62 75 60 48" stroke="#6cc26c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="46" cy="82" rx="9" ry="4" fill="#6cc26c" transform="rotate(-25 46 82)" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} style={{ transformOrigin: '60px 44px' }} transition={{ duration: 0.6, delay: 0.5 }}>
        {[0, 60, 120, 180, 240, 300].map(d => (
          <ellipse key={d} cx="60" cy="30" rx="6" ry="11" fill="#ffe066" transform={`rotate(${d} 60 44)`} />
        ))}
        <circle cx="60" cy="44" r="7" fill="#f59e0b" />
        {/* 웃는 입 */}
        <path d="M56 44 Q60 49 64 44" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <circle cx="56" cy="41" r="1.2" fill="#92400e" />
        <circle cx="64" cy="41" r="1.2" fill="#92400e" />
      </motion.g>
    </PlantSvg>
  )
}

/* 3. 깔깔 풍선덩굴 (rare) */
export function GiggleBalloonvine({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q50 80 60 60 Q70 50 60 40" stroke="#5cb85c" strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} style={{ transformOrigin: '60px 50px' }} transition={{ duration: 0.6, delay: 0.4 }}>
        {[['#ff9ec7', 44, 38], ['#ffd84d', 72, 32], ['#7eb3ff', 60, 22]].map(([c, x, y], i) => (
          <motion.g key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 2.5 + i, repeat: Infinity }}>
            <ellipse cx={x as number} cy={y as number} rx="11" ry="13" fill={c as string} />
            <ellipse cx={(x as number) - 3} cy={(y as number) - 3} rx="3" ry="4" fill="white" opacity="0.5" />
            <path d={`M${x} ${(y as number) + 13} L${x} ${(y as number) + 22}`} stroke="#5cb85c" strokeWidth="1" />
          </motion.g>
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 4. 무지개 해바라기 (rare) */
export function RainbowSunflower({ size = 120, growProgress = 1 }: PlantProps) {
  const colors = ['#ff7e7e', '#fbbf24', '#ffe066', '#6ee7b7', '#7eb3ff', '#a78bfa']
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 72 60 42" stroke="#3a7d3a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M60 80 Q44 76 38 86 Q50 88 60 84" fill="#5cb85c" />
      </g>
      <motion.g initial={{ scale: 0, rotate: -90 }} animate={{ scale: growProgress, rotate: 0 }} style={{ transformOrigin: '60px 40px' }} transition={{ duration: 0.8, delay: 0.4 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <ellipse key={i} cx="60" cy="20" rx="4" ry="15" fill={colors[i % colors.length]} transform={`rotate(${i * 20} 60 40)`} />
        ))}
        <circle cx="60" cy="40" r="10" fill="#92400e" />
      </motion.g>
    </PlantSvg>
  )
}

/* 5. 별빛 환희나무 (epic) */
export function StarlightJoytree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="55" y="60" width="10" height="50" rx="4" fill="#8b5a2b" />
        <ellipse cx="60" cy="50" rx="34" ry="30" fill="#2d6a4f" />
        <ellipse cx="60" cy="46" rx="28" ry="24" fill="#40916c" />
        {[[42, 40], [60, 30], [78, 44], [50, 56], [72, 58], [60, 48]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="11" textAnchor="middle"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}>⭐</motion.text>
        ))}
      </g>
    </PlantSvg>
  )
}

/* 6. 황금 미소장미 (epic) */
export function GoldenSmilerose({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 78 60 52" stroke="#3a7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 84 Q72 80 78 90 Q66 92 60 88" fill="#5cb85c" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} style={{ transformOrigin: '60px 46px' }} transition={{ duration: 0.7, delay: 0.4 }}>
        {[26, 22, 16, 10].map((r, i) => (
          <circle key={i} cx="60" cy="44" r={r} fill={i % 2 ? '#fbbf24' : '#ffd84d'} opacity={0.5 + i * 0.12} />
        ))}
        <path d="M53 44 Q60 50 67 44" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </motion.g>
    </PlantSvg>
  )
}

/* 7. 천사의 웃음꽃 (legendary) */
export function AngelLaughflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 80 60 56" stroke="#a7f3d0" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} style={{ transformOrigin: '60px 48px' }} transition={{ duration: 0.7, delay: 0.4 }}>
        {/* 날개 */}
        <motion.g animate={{ rotate: [0, 6, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '60px 48px' }}>
          <path d="M48 48 Q28 36 24 54 Q34 56 48 52 Z" fill="white" opacity="0.95" />
          <path d="M72 48 Q92 36 96 54 Q86 56 72 52 Z" fill="white" opacity="0.95" />
        </motion.g>
        {[0, 72, 144, 216, 288].map(d => (
          <ellipse key={d} cx="60" cy="34" rx="6" ry="12" fill="#fffbe6" transform={`rotate(${d} 60 48)`} />
        ))}
        <circle cx="60" cy="48" r="7" fill="#ffd84d" />
        <path d="M56 48 Q60 53 64 48" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* 후광 */}
        <ellipse cx="60" cy="22" rx="12" ry="4" fill="none" stroke="#ffe066" strokeWidth="2" />
      </motion.g>
    </PlantSvg>
  )
}

/* 8. 다이아 기쁨수정 (legendary) */
export function DiamondJoygem({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <ellipse cx="60" cy="100" rx="28" ry="8" fill="#7c5cff" opacity="0.3" />
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <polygon points="60,30 82,55 60,95 38,55" fill="#a5f3fc" />
          <polygon points="60,30 82,55 60,55" fill="#cffafe" />
          <polygon points="60,30 38,55 60,55" fill="#67e8f9" />
          <polygon points="60,55 82,55 60,95" fill="#22d3ee" />
          <polygon points="60,55 38,55 60,95" fill="#06b6d4" />
          <line x1="60" y1="30" x2="60" y2="95" stroke="white" strokeWidth="0.8" opacity="0.6" />
        </motion.g>
      </g>
    </PlantSvg>
  )
}
