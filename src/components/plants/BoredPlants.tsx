import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura } from './plantBase'

/* 47. 구름 이끼 (common) */
export function CloudMoss({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }} style={{ transformOrigin: 'center', transform: `scale(${growProgress})` }}>
        <ellipse cx="40" cy="95" rx="18" ry="10" fill="#d1d5db" />
        <ellipse cx="60" cy="90" rx="22" ry="12" fill="#e5e7eb" />
        <ellipse cx="80" cy="95" rx="18" ry="10" fill="#d1d5db" />
        <ellipse cx="50" cy="85" rx="14" ry="8" fill="#f3f4f6" />
        <ellipse cx="72" cy="83" rx="14" ry="8" fill="#f3f4f6" />
        <circle cx="45" cy="92" r="1.5" fill="#9ca3af" /><circle cx="58" cy="88" r="1.5" fill="#9ca3af" /><circle cx="72" cy="92" r="1.5" fill="#9ca3af" />
      </motion.g>
    </PlantSvg>
  )
}

/* 48. 하품 풍선이끼 (common) */
export function YawnBalloonmoss({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <motion.ellipse cx="60" cy="78" rx="24" ry="22" fill="#cbd5e1" animate={{ scaleX: [1, 1.1, 1], scaleY: [1, 0.92, 1] }} transition={{ duration: 4, repeat: Infinity }} style={{ transformOrigin: '60px 78px' }} />
        <ellipse cx="60" cy="74" rx="16" ry="12" fill="#e2e8f0" />
        {/* 졸린 눈 + 하품 */}
        <path d="M50 74 Q53 71 56 74 M64 74 Q67 71 70 74" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="60" cy="84" rx="4" ry="5" fill="#94a3b8" />
        {[0, 1, 2].map(i => <motion.text key={i} x={78 + i * 5} y={50 - i * 8} fontSize="10" fill="#94a3b8" animate={{ opacity: [0, 1, 0], y: [50 - i * 8, 36 - i * 8] }} transition={{ duration: 3, delay: i * 0.6, repeat: Infinity }}>z</motion.text>)}
      </g>
    </PlantSvg>
  )
}

/* 49. 시간 모래꽃 (rare) */
export function TimeSandflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="44" y="40" width="32" height="4" rx="2" fill="#a16207" />
        <rect x="44" y="92" width="32" height="4" rx="2" fill="#a16207" />
        {/* 모래시계 유리 */}
        <path d="M48 44 L72 44 L60 68 Z" fill="#fde68a" opacity="0.5" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M48 92 L72 92 L60 68 Z" fill="#fef3c7" opacity="0.3" stroke="#ca8a04" strokeWidth="1.5" />
        <path d="M56 84 L64 84 L62 92 L58 92 Z" fill="#fbbf24" />
        {[0, 1, 2].map(i => <motion.circle key={i} cx="60" cy="68" r="1.5" fill="#f59e0b" animate={{ cy: [68, 90], opacity: [1, 0] }} transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }} />)}
        {/* 꽃 윗부분 */}
        {[0, 90, 180, 270].map(d => <ellipse key={d} cx="60" cy="32" rx="4" ry="7" fill="#fcd34d" transform={`rotate(${d} 60 40)`} />)}
      </g>
    </PlantSvg>
  )
}

/* 50. 꿈꾸는 솜사탕나무 (rare) */
export function DreamingCottoncandytree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="57" y="62" width="6" height="48" rx="3" fill="#a16207" />
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity }}>
          <ellipse cx="46" cy="52" rx="16" ry="14" fill="#fbcfe8" />
          <ellipse cx="74" cy="52" rx="16" ry="14" fill="#f9a8d4" />
          <ellipse cx="60" cy="44" rx="20" ry="17" fill="#fce7f3" />
          <ellipse cx="60" cy="56" rx="18" ry="13" fill="#fbcfe8" />
        </motion.g>
        {[[44, 40], [74, 42], [60, 34]].map(([x, y], i) => <motion.text key={i} x={x} y={y} fontSize="8" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}>✨</motion.text>)}
      </g>
    </PlantSvg>
  )
}

/* 51. 상상력 분수 (epic) */
export function ImaginationFountain({ size = 120, growProgress = 1 }: PlantProps) {
  const colors = ['#ff7e7e', '#fbbf24', '#6ee7b7', '#7eb3ff', '#c084fc']
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M40 100 Q40 88 60 88 Q80 88 80 100 Z" fill="#94a3b8" />
        <ellipse cx="60" cy="88" rx="20" ry="5" fill="#cbd5e1" />
        <rect x="57" y="60" width="6" height="28" fill="#94a3b8" />
        {/* 솟아오르는 물줄기 */}
        {[-2, -1, 0, 1, 2].map((o, i) => (
          <motion.path key={i} d={`M60 60 Q${60 + o * 14} ${40} ${60 + o * 22} ${72}`} fill="none" stroke={colors[i]} strokeWidth="2.5" strokeLinecap="round"
            animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }} />
        ))}
        <motion.circle cx="60" cy="40" r="4" fill="#fff" animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 52. 발명가의 정원 (legendary) */
export function InventorGarden({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 Q58 80 60 56" stroke="#16a34a" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* 톱니바퀴 꽃 */}
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '60px 46px' }}>
          {Array.from({ length: 8 }).map((_, i) => <rect key={i} x="57" y="20" width="6" height="8" rx="1" fill="#94a3b8" transform={`rotate(${i * 45} 60 46)`} />)}
          <circle cx="60" cy="46" r="16" fill="#cbd5e1" />
          <circle cx="60" cy="46" r="7" fill="#64748b" />
        </motion.g>
        {/* 전구 (아이디어) */}
        <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="84" cy="34" r="7" fill="#fde047" />
          <rect x="81" y="40" width="6" height="4" fill="#a16207" />
        </motion.g>
      </g>
    </PlantSvg>
  )
}

/* 53. 호기심 천국 (legendary) */
export function CuriosityParadise({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {/* 여러 색의 작은 꽃들이 모인 정원 */}
        {[['#ff7e7e', 44, 70], ['#fbbf24', 76, 68], ['#6ee7b7', 60, 56], ['#7eb3ff', 50, 44], ['#c084fc', 72, 46]].map(([c, x, y], i) => (
          <motion.g key={i} animate={{ y: [0, -2, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity }}>
            {[0, 72, 144, 216, 288].map(d => <ellipse key={d} cx={x as number} cy={(y as number) - 6} rx="3" ry="5" fill={c as string} transform={`rotate(${d} ${x} ${y})`} />)}
            <circle cx={x as number} cy={y as number} r="2.5" fill="#fff" />
          </motion.g>
        ))}
        {/* 물음표 */}
        <motion.text x="60" y="32" fontSize="16" textAnchor="middle" animate={{ rotate: [-8, 8, -8] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ transformOrigin: '60px 28px' }}>❔</motion.text>
      </g>
    </PlantSvg>
  )
}
