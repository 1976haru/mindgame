import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura, stemTransform } from './plantBase'

/* 9. 달빛 눈물꽃 (common) */
export function MoonlightTearflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q55 75 60 45" stroke="#4a7eb5" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="85" rx="6" ry="10" fill="#5b8ec8" transform="rotate(-40 48 85)" />
      </g>
      <motion.g initial={{ scale: 0, y: -10 }} animate={{ scale: growProgress, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} style={{ transformOrigin: '60px 45px' }}>
        <path d="M50 45 Q50 30 60 28 Q70 30 70 45 Q60 50 50 45" fill="#7eb3ff" />
        <motion.circle cx="60" cy="58" r="3" fill="#a5d0ff" animate={{ cy: [58, 65, 58], opacity: [1, 0, 1] }} transition={{ duration: 3, repeat: Infinity }} />
      </motion.g>
    </PlantSvg>
  )
}

/* 10. 푸른 한숨이끼 (common) */
export function BlueSighmoss({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <motion.g style={{ transformOrigin: 'center', transform: `scale(${growProgress})` }} animate={{ y: [0, -2, 0] }} transition={{ duration: 5, repeat: Infinity }}>
        <ellipse cx="45" cy="95" rx="16" ry="9" fill="#6b9dc8" />
        <ellipse cx="65" cy="92" rx="18" ry="10" fill="#7eb3ff" />
        <ellipse cx="78" cy="96" rx="13" ry="7" fill="#93c5fd" />
        <circle cx="48" cy="92" r="1.5" fill="#4a7eb5" />
        <circle cx="66" cy="89" r="1.5" fill="#4a7eb5" />
        {/* 한숨 (위로 오르는 작은 동그라미) */}
        {[0, 1, 2].map(i => (
          <motion.circle key={i} cx={60 + i * 6} cy="80" r="2" fill="#bfdbfe" opacity="0.6"
            animate={{ cy: [80, 60], opacity: [0.6, 0] }} transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }} />
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 11. 비오는 종꽃 (rare) */
export function RainyBellflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 78 60 50" stroke="#4a7eb5" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 48px' }}>
        <path d="M48 48 Q48 34 60 32 Q72 34 72 48 Q60 56 48 48" fill="#60a5fa" />
        <ellipse cx="60" cy="50" rx="12" ry="4" fill="#3b82f6" />
        {[52, 60, 68].map((x, i) => (
          <motion.path key={i} d={`M${x} 58 L${x} 64`} stroke="#a5d0ff" strokeWidth="2" strokeLinecap="round"
            animate={{ opacity: [0, 1, 0], y: [0, 8, 0] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }} />
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 12. 안개 추억꽃 (rare) */
export function MistMemoryflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 80 60 50" stroke="#94a3b8" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 46px' }}>
        {[0, 72, 144, 216, 288].map(d => (
          <ellipse key={d} cx="60" cy="32" rx="7" ry="13" fill="#c4b5fd" opacity="0.75" transform={`rotate(${d} 60 46)`} />
        ))}
        <circle cx="60" cy="46" r="6" fill="#e9d5ff" />
        {[[40, 40], [80, 44], [70, 60]].map(([x, y], i) => (
          <motion.ellipse key={i} cx={x} cy={y} rx="10" ry="5" fill="#e2e8f0" opacity="0.4"
            animate={{ x: [0, 6, 0], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 4 + i, repeat: Infinity }} />
        ))}
      </motion.g>
    </PlantSvg>
  )
}

/* 13. 깊은 바다 진주꽃 (epic) */
export function DeepseaPearlflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 Q50 90 60 70 M60 110 Q70 90 60 70" stroke="#0e7490" strokeWidth="3" fill="none" />
        {/* 조개 */}
        <path d="M35 70 Q60 40 85 70 Q60 80 35 70" fill="#22d3ee" />
        <path d="M35 70 Q60 50 85 70" fill="none" stroke="#0e7490" strokeWidth="1.5" />
        {[42, 50, 60, 70, 78].map(x => <line key={x} x1="60" y1="70" x2={x} y2="56" stroke="#0e7490" strokeWidth="0.8" />)}
        <motion.circle cx="60" cy="68" r="7" fill="white" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity }} />
        <circle cx="57" cy="65" r="2" fill="#f0f9ff" />
      </g>
    </PlantSvg>
  )
}

/* 14. 별이 된 눈물 (epic) */
export function StarTearflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 80 60 56" stroke="#4a7eb5" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 44px' }}>
        {/* 눈물방울이 위로 오르며 별이 됨 */}
        {[[50, 50], [70, 52], [60, 38]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="13" textAnchor="middle"
            animate={{ opacity: [0.6, 1, 0.6], y: [0, -3, 0] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity }}>⭐</motion.text>
        ))}
        <path d="M55 56 Q55 48 60 46 Q65 48 65 56 Q60 60 55 56" fill="#7eb3ff" />
      </motion.g>
    </PlantSvg>
  )
}

/* 15. 위로의 무지개 (legendary) */
export function ComfortRainbow({ size = 120, growProgress = 1 }: PlantProps) {
  const arcs = ['#ff7e7e', '#fbbf24', '#ffe066', '#6ee7b7', '#7eb3ff', '#a78bfa']
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.8 }} style={{ transformOrigin: '60px 90px' }}>
        {arcs.map((c, i) => (
          <path key={i} d={`M${24 + i * 3} 90 A ${36 - i * 3} ${36 - i * 3} 0 0 1 ${96 - i * 3} 90`} fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" />
        ))}
        {/* 구름 받침 */}
        <ellipse cx="30" cy="92" rx="14" ry="8" fill="white" opacity="0.9" />
        <ellipse cx="90" cy="92" rx="14" ry="8" fill="white" opacity="0.9" />
        <motion.text x="60" y="74" fontSize="14" textAnchor="middle" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>💗</motion.text>
      </motion.g>
    </PlantSvg>
  )
}

/* 16. 치유의 백합 (legendary) */
export function HealingLily({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 80 60 54" stroke="#34d399" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M60 84 Q44 78 38 88 Q50 90 60 86" fill="#10b981" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7, delay: 0.4 }} style={{ transformOrigin: '60px 46px' }}>
        {[0, 60, 120, 180, 240, 300].map(d => (
          <path key={d} d="M60 46 Q53 26 60 18 Q67 26 60 46" fill="white" stroke="#f3e8ff" strokeWidth="0.5" transform={`rotate(${d} 60 46)`} />
        ))}
        <circle cx="60" cy="46" r="5" fill="#fef08a" />
        {[0, 72, 144, 216, 288].map(d => <line key={d} x1="60" y1="46" x2="60" y2="38" stroke="#fbbf24" strokeWidth="1.5" transform={`rotate(${d} 60 46)`} />)}
      </motion.g>
    </PlantSvg>
  )
}
