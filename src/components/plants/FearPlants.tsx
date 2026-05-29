import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura } from './plantBase'

/* 24. 그림자 버섯 (common) */
export function ShadowMushroom({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="52" y="70" width="16" height="35" rx="8" fill="#e5e7eb" />
        <ellipse cx="60" cy="65" rx="35" ry="22" fill="#7c3aed" />
        <ellipse cx="60" cy="60" rx="30" ry="15" fill="#a78bfa" />
        {[[45, 60], [55, 55], [68, 58], [75, 65], [50, 70]].map(([cx, cy], i) => (
          <motion.circle key={i} cx={cx} cy={cy} r="2.5" fill="#fef3c7" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity }} />
        ))}
      </g>
    </PlantSvg>
  )
}

/* 25. 반딧불 등불풀 (common) */
export function FireflyLampgrass({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {[45, 60, 75].map((x, i) => (
          <path key={x} d={`M${x} 105 Q${x - 4} 75 ${x} 55`} stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" transform={`rotate(${(i - 1) * 8} ${x} 105)`} />
        ))}
        {[[45, 52], [60, 48], [75, 54], [52, 64], [68, 62]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="4" fill="#fde68a"
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 1.8 + i * 0.3, repeat: Infinity }} />
        ))}
        {/* 떠다니는 반딧불 */}
        <motion.circle cx="88" cy="40" r="2.5" fill="#fef08a" animate={{ x: [0, -10, 4, 0], y: [0, 6, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 4, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 26. 보호막 가시거미줄 (rare) */
export function ShieldSpiderweb({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 64px' }}>
        {/* 방사형 거미줄 */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map(d => (
          <line key={d} x1="60" y1="64" x2="60" y2="20" stroke="#a5b4fc" strokeWidth="1" transform={`rotate(${d} 60 64)`} />
        ))}
        {[14, 24, 34].map(r => (
          <motion.circle key={r} cx="60" cy="64" r={r} fill="none" stroke="#c7d2fe" strokeWidth="1"
            animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
        ))}
        <motion.circle cx="60" cy="64" r="6" fill="#818cf8" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <text x="60" y="68" fontSize="8" textAnchor="middle">🛡️</text>
      </motion.g>
    </PlantSvg>
  )
}

/* 27. 어둠 속 등대꽃 (rare) */
export function DarkLighthouseflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M50 105 L54 55 L66 55 L70 105 Z" fill="#f8fafc" />
        <rect x="48" y="80" width="24" height="6" fill="#ef4444" />
        <rect x="50" y="95" width="20" height="6" fill="#ef4444" />
        <rect x="52" y="44" width="16" height="14" rx="2" fill="#fbbf24" />
        <path d="M60 44 L56 36 L64 36 Z" fill="#dc2626" />
        {/* 등대 빛줄기 */}
        <motion.path d="M60 51 L20 35 L20 67 Z" fill="#fde68a" opacity="0.4" animate={{ opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.path d="M60 51 L100 35 L100 67 Z" fill="#fde68a" opacity="0.4" animate={{ opacity: [0.5, 0.1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 28. 별빛 갑옷나무 (epic) */
export function StarlightArmortree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="55" y="62" width="10" height="48" rx="4" fill="#334155" />
        {/* 갑옷 잎 */}
        <path d="M60 30 L80 44 L74 66 L46 66 L40 44 Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
        <path d="M60 38 L72 48 L68 62 L52 62 L48 48 Z" fill="#94a3b8" />
        {[[60, 36], [50, 50], [70, 50]].map(([x, y], i) => (
          <motion.text key={i} x={x} y={y} fontSize="9" textAnchor="middle" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2 + i * 0.4, repeat: Infinity }}>⭐</motion.text>
        ))}
      </g>
    </PlantSvg>
  )
}

/* 29. 용기의 사자갈기 (legendary) */
export function CourageLionmane({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 60px' }}>
        {/* 갈기 */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.path key={i} d="M60 60 L60 22" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" transform={`rotate(${i * 22.5} 60 60)`}
            animate={{ scaleY: [1, 1.08, 1] }} transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }} style={{ transformOrigin: '60px 60px' }} />
        ))}
        <circle cx="60" cy="60" r="20" fill="#fbbf24" />
        <circle cx="53" cy="56" r="2" fill="#7c2d12" />
        <circle cx="67" cy="56" r="2" fill="#7c2d12" />
        <path d="M55 66 Q60 70 65 66" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="62" rx="3" ry="2" fill="#92400e" />
      </motion.g>
    </PlantSvg>
  )
}

/* 30. 수호천사 나무 (legendary) */
export function GuardianAngeltree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="56" y="66" width="8" height="44" rx="3" fill="#a16207" />
        <ellipse cx="60" cy="54" rx="30" ry="26" fill="#15803d" />
        <ellipse cx="60" cy="50" rx="24" ry="20" fill="#22c55e" />
        {/* 수호 날개 */}
        <motion.g animate={{ rotate: [0, 5, 0] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ transformOrigin: '60px 54px' }}>
          <path d="M34 54 Q14 40 12 60 Q24 62 34 58 Z" fill="white" opacity="0.9" />
          <path d="M86 54 Q106 40 108 60 Q96 62 86 58 Z" fill="white" opacity="0.9" />
        </motion.g>
        <ellipse cx="60" cy="28" rx="11" ry="4" fill="none" stroke="#fde047" strokeWidth="2.5" />
        <motion.text x="60" y="58" fontSize="13" textAnchor="middle" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>💛</motion.text>
      </g>
    </PlantSvg>
  )
}
