import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura, stemTransform } from './plantBase'

/* 17. 용암 선인장 (common) */
export function LavaCactus({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <ellipse cx="60" cy="80" rx="18" ry="30" fill="#c1432e" />
        <ellipse cx="42" cy="75" rx="9" ry="16" fill="#c1432e" />
        <ellipse cx="78" cy="78" rx="9" ry="16" fill="#c1432e" />
        {[55, 65, 75, 85, 95].map(y => (
          <g key={y}>
            <line x1="50" y1={y} x2="46" y2={y - 2} stroke="#fbbf77" strokeWidth="1.5" />
            <line x1="70" y1={y} x2="74" y2={y - 2} stroke="#fbbf77" strokeWidth="1.5" />
          </g>
        ))}
        <motion.circle cx="60" cy="50" r="6" fill="#ff5e5e" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <circle cx="60" cy="50" r="2.5" fill="#ffd84d" />
      </g>
    </PlantSvg>
  )
}

/* 18. 불꽃 가시덤불 (common) */
export function FlameThornbush({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {[40, 60, 80].map((x, i) => (
          <motion.path key={x} d={`M${x} 100 Q${x - 6} 70 ${x} 50 Q${x + 6} 70 ${x} 100`} fill={i === 1 ? '#f97316' : '#ea580c'}
            animate={{ scaleY: [1, 1.08, 1] }} transition={{ duration: 1.2 + i * 0.3, repeat: Infinity }} style={{ transformOrigin: `${x}px 100px` }} />
        ))}
        <path d="M52 80 L48 76 M68 80 L72 76 M60 64 L60 58" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" />
        <motion.text x="60" y="46" fontSize="12" textAnchor="middle" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity }}>🔥</motion.text>
      </g>
    </PlantSvg>
  )
}

/* 19. 폭풍 번개꽃 (rare) */
export function StormLightningflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 80 60 54" stroke="#475569" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.6, delay: 0.4 }} style={{ transformOrigin: '60px 44px' }}>
        {[0, 90, 180, 270].map(d => (
          <ellipse key={d} cx="60" cy="30" rx="6" ry="12" fill="#fde047" transform={`rotate(${d} 60 44)`} />
        ))}
        <motion.path d="M60 36 L54 48 L60 48 L56 60 L66 44 L60 44 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="0.5"
          animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity }} />
      </motion.g>
    </PlantSvg>
  )
}

/* 20. 화산 봉오리 (rare) */
export function VolcanoBud({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M36 100 L52 56 L68 56 L84 100 Z" fill="#7c2d12" />
        <path d="M52 56 L68 56 L62 100 L58 100 Z" fill="#9a3412" />
        <ellipse cx="60" cy="56" rx="8" ry="3" fill="#1c1917" />
        {[0, 1, 2].map(i => (
          <motion.circle key={i} cx={56 + i * 4} cy="52" r="3" fill="#f97316"
            animate={{ cy: [52, 38, 52], opacity: [1, 0, 1] }} transition={{ duration: 1.6, delay: i * 0.4, repeat: Infinity }} />
        ))}
        <motion.path d="M52 56 Q60 44 68 56" fill="none" stroke="#fbbf24" strokeWidth="2" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 21. 용의 비늘식물 (epic) */
export function DragonScaleplant({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q48 80 60 56 Q72 40 60 30" stroke="#166534" strokeWidth="6" fill="none" strokeLinecap="round" />
        {[[54, 92], [62, 80], [54, 68], [64, 56], [58, 44]].map(([x, y], i) => (
          <motion.path key={i} d={`M${x} ${y} q6 -6 12 0 q-6 6 -12 0`} fill={i % 2 ? '#22c55e' : '#16a34a'} stroke="#14532d" strokeWidth="0.5"
            animate={{ opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }} />
        ))}
        <circle cx="60" cy="30" r="4" fill="#ef4444" />
      </g>
    </PlantSvg>
  )
}

/* 22. 평화의 올리브 (legendary) */
export function PeaceOlive({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 L60 60" stroke="#65a30d" strokeWidth="4" strokeLinecap="round" />
        <path d="M60 70 Q40 60 30 68 M60 60 Q42 46 36 52 M60 64 Q80 54 90 62 M60 56 Q80 44 86 50" stroke="#4d7c0f" strokeWidth="2" fill="none" strokeLinecap="round" />
        {[[34, 64], [40, 50], [86, 58], [82, 48], [60, 50]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="4" ry="6" fill="#84cc16" />
        ))}
        {/* 비둘기 */}
        <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
          <ellipse cx="60" cy="36" rx="9" ry="6" fill="white" />
          <circle cx="68" cy="33" r="4" fill="white" />
          <path d="M52 36 Q44 30 48 40" fill="white" />
          <circle cx="70" cy="32" r="0.8" fill="#333" />
        </motion.g>
      </g>
    </PlantSvg>
  )
}

/* 23. 정의의 검꽃 (legendary) */
export function JusticeSwordflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 90px' }}>
        {/* 검 모양 줄기 */}
        <path d="M60 100 L60 36" stroke="#cbd5e1" strokeWidth="5" strokeLinecap="round" />
        <path d="M60 30 L56 38 L64 38 Z" fill="#e2e8f0" />
        <rect x="46" y="58" width="28" height="5" rx="2" fill="#fbbf24" />
        {/* 꽃 (검 끝) */}
        <motion.g animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ transformOrigin: '60px 36px' }}>
          {[0, 72, 144, 216, 288].map(d => (
            <ellipse key={d} cx="60" cy="24" rx="5" ry="10" fill="#f8fafc" transform={`rotate(${d} 60 36)`} />
          ))}
          <circle cx="60" cy="36" r="5" fill="#fbbf24" />
        </motion.g>
      </motion.g>
    </PlantSvg>
  )
}
