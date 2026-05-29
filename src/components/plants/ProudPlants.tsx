import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura, stemTransform } from './plantBase'

/* 39. 훈장 해바라기 (common) */
export function MedalSunflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 70 60 40" stroke="#3a7d3a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M60 80 Q45 75 38 85 Q48 88 60 85" fill="#5cb85c" />
        <path d="M60 70 Q75 65 82 75 Q72 78 60 75" fill="#5cb85c" />
      </g>
      <motion.g initial={{ scale: 0, rotate: -180 }} animate={{ scale: growProgress, rotate: 0 }} transition={{ duration: 0.8, delay: 0.5 }} style={{ transformOrigin: '60px 38px' }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse key={i} cx="60" cy="20" rx="4" ry="14" fill="#fbbf24" transform={`rotate(${i * 22.5} 60 38)`} />
        ))}
        <circle cx="60" cy="38" r="11" fill="#92400e" />
        <motion.g animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '60px 38px' }}>
          <circle cx="60" cy="38" r="6" fill="#ffd84d" />
          <text x="60" y="42" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">★</text>
        </motion.g>
      </motion.g>
    </PlantSvg>
  )
}

/* 40. 금메달 민들레 (common) */
export function GoldmedalDandelion({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 78 60 52" stroke="#5cb85c" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 44px' }}>
        {Array.from({ length: 10 }).map((_, i) => <ellipse key={i} cx="60" cy="30" rx="3" ry="11" fill="#fde047" transform={`rotate(${i * 36} 60 44)`} />)}
        {/* 메달 리본 + 원 */}
        <path d="M54 44 L50 60 M66 44 L70 60" stroke="#ef4444" strokeWidth="3" />
        <motion.circle cx="60" cy="44" r="9" fill="#ffd84d" stroke="#f59e0b" strokeWidth="1.5" animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ transformOrigin: '60px 44px' }} />
        <text x="60" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#92400e">1</text>
      </motion.g>
    </PlantSvg>
  )
}

/* 41. 영광의 월계관꽃 (rare) */
export function GloryLaurelflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 60px' }}>
        {/* 월계관 좌우 */}
        <path d="M40 90 Q26 60 40 32" fill="none" stroke="#65a30d" strokeWidth="3" />
        <path d="M80 90 Q94 60 80 32" fill="none" stroke="#65a30d" strokeWidth="3" />
        {[34, 48, 62, 76].map((y, i) => (
          <g key={i}>
            <ellipse cx={36 - i} cy={y} rx="6" ry="3" fill="#84cc16" transform={`rotate(-40 ${36 - i} ${y})`} />
            <ellipse cx={84 + i} cy={y} rx="6" ry="3" fill="#84cc16" transform={`rotate(40 ${84 + i} ${y})`} />
          </g>
        ))}
        <motion.text x="60" y="62" fontSize="20" textAnchor="middle" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>👑</motion.text>
        <circle cx="60" cy="30" r="3" fill="#fbbf24" />
      </motion.g>
    </PlantSvg>
  )
}

/* 42. 챔피언 트로피꽃 (rare) */
export function ChampionTrophyflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="50" y="92" width="20" height="6" rx="2" fill="#a16207" />
        <rect x="56" y="78" width="8" height="16" fill="#ca8a04" />
        <path d="M44 44 Q44 72 60 76 Q76 72 76 44 Z" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
        <path d="M44 50 Q32 50 34 60 Q36 64 44 60 M76 50 Q88 50 86 60 Q84 64 76 60" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        {/* 꽃잎 트로피 위 */}
        {[0, 60, 120, 180, 240, 300].map(d => <ellipse key={d} cx="60" cy="32" rx="4" ry="8" fill="#fde047" transform={`rotate(${d} 60 40)`} />)}
        <motion.circle cx="60" cy="40" r="4" fill="#fff" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 43. 왕관 장미 (epic) */
export function CrownRose({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 80 60 56" stroke="#3a7d3a" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 86 Q74 82 80 92 Q68 94 60 90" fill="#5cb85c" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7, delay: 0.4 }} style={{ transformOrigin: '60px 48px' }}>
        {[24, 19, 13, 8].map((r, i) => <circle key={i} cx="60" cy="48" r={r} fill={i % 2 ? '#dc2626' : '#ef4444'} opacity={0.6 + i * 0.1} />)}
        {/* 왕관 */}
        <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <path d="M46 30 L50 20 L60 26 L70 20 L74 30 Z" fill="#ffd84d" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="50" cy="20" r="2" fill="#ef4444" />
          <circle cx="60" cy="22" r="2" fill="#22c55e" />
          <circle cx="70" cy="20" r="2" fill="#3b82f6" />
        </motion.g>
      </motion.g>
    </PlantSvg>
  )
}

/* 44. 명예의 전당 나무 (epic) */
export function HallOfFameTree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {/* 신전 기둥 */}
        <rect x="38" y="56" width="6" height="48" fill="#e5e7eb" />
        <rect x="76" y="56" width="6" height="48" fill="#e5e7eb" />
        <rect x="56" y="56" width="6" height="48" fill="#f3f4f6" />
        <rect x="32" y="48" width="56" height="8" rx="2" fill="#d1d5db" />
        <path d="M30 48 L60 30 L90 48 Z" fill="#fbbf24" />
        <text x="60" y="44" fontSize="9" textAnchor="middle">🏆</text>
        <rect x="34" y="104" width="52" height="5" fill="#9ca3af" />
      </g>
    </PlantSvg>
  )
}

/* 45. 솔로몬의 지혜꽃 (legendary) */
export function SolomonWisdomflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 80 60 58" stroke="#ca8a04" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7, delay: 0.4 }} style={{ transformOrigin: '60px 46px' }}>
        {[0, 72, 144, 216, 288].map(d => <ellipse key={d} cx="60" cy="30" rx="6" ry="12" fill="#fcd34d" transform={`rotate(${d} 60 46)`} />)}
        {/* 부엉이 중심 */}
        <circle cx="60" cy="46" r="10" fill="#a16207" />
        <circle cx="55" cy="44" r="4" fill="white" /><circle cx="65" cy="44" r="4" fill="white" />
        <motion.g animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.05, 0.1] }} style={{ transformOrigin: '60px 44px' }}>
          <circle cx="55" cy="44" r="2" fill="#1c1917" /><circle cx="65" cy="44" r="2" fill="#1c1917" />
        </motion.g>
        <path d="M58 48 L60 51 L62 48 Z" fill="#f59e0b" />
        {/* 작은 왕관 */}
        <path d="M54 33 L56 28 L60 31 L64 28 L66 33 Z" fill="#ffd84d" />
      </motion.g>
    </PlantSvg>
  )
}

/* 46. 영웅의 발자국 (legendary) */
export function HeroFootprint({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 70px' }}>
        {/* 빛나는 발자국 */}
        <motion.ellipse cx="48" cy="78" rx="11" ry="16" fill="#fbbf24" opacity="0.8" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.ellipse cx="72" cy="62" rx="11" ry="16" fill="#fde047" opacity="0.8" animate={{ opacity: [0.9, 0.5, 0.9] }} transition={{ duration: 2, repeat: Infinity }} />
        {/* 솟아나는 빛의 꽃 */}
        {[0, 72, 144, 216, 288].map(d => <ellipse key={d} cx="60" cy="34" rx="5" ry="11" fill="#fffbe6" transform={`rotate(${d} 60 46)`} />)}
        <circle cx="60" cy="46" r="6" fill="#ffd84d" />
        {[[40, 40], [82, 44], [60, 28]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="9" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}>⭐</motion.text>
        ))}
      </motion.g>
    </PlantSvg>
  )
}
