import { motion } from 'framer-motion'
import { PlantProps, PlantSvg, RarityAura } from './plantBase'

/* 54. 고요 연꽃 (common) */
export function CalmLotus({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <ellipse cx="60" cy="100" rx="50" ry="4" fill="#6ee7b7" opacity="0.3" />
      <ellipse cx="60" cy="100" rx="35" ry="2" fill="#6ee7b7" opacity="0.5" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.8, delay: 0.3 }} style={{ transformOrigin: '60px 75px' }}>
        <ellipse cx="60" cy="90" rx="35" ry="8" fill="#34d399" />
        {[0, 60, 120, 180, 240, 300].map(d => <ellipse key={d} cx="60" cy="62" rx="8" ry="22" fill="#fce7f3" transform={`rotate(${d} 60 78)`} />)}
        <circle cx="60" cy="78" r="6" fill="#fbbf24" />
      </motion.g>
    </PlantSvg>
  )
}

/* 55. 바람 풍경초 (common) */
export function WindChimegrass({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="common" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 L60 36" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 36 Q40 32 36 40 M60 40 Q80 36 84 44" stroke="#16a34a" strokeWidth="2" fill="none" />
        {/* 풍경 종들 */}
        {[[36, 40], [60, 36], [84, 44]].map(([x, y], i) => (
          <motion.g key={i} animate={{ rotate: [-6, 6, -6] }} transition={{ duration: 2.5 + i * 0.5, repeat: Infinity }} style={{ transformOrigin: `${x}px ${y}px` }}>
            <path d={`M${(x as number) - 5} ${(y as number) + 8} Q${x} ${y} ${(x as number) + 5} ${(y as number) + 8} Z`} fill="#5eead4" />
            <circle cx={x as number} cy={(y as number) + 11} r="2" fill="#0d9488" />
          </motion.g>
        ))}
      </g>
    </PlantSvg>
  )
}

/* 56. 호수 거울꽃 (rare) */
export function LakeMirrorflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.7 }} style={{ transformOrigin: '60px 60px' }}>
        {/* 위 꽃 */}
        {[0, 72, 144, 216, 288].map(d => <ellipse key={'u' + d} cx="60" cy="40" rx="6" ry="12" fill="#a5f3fc" transform={`rotate(${d} 60 52)`} />)}
        <circle cx="60" cy="52" r="5" fill="#67e8f9" />
        {/* 수면 */}
        <ellipse cx="60" cy="64" rx="44" ry="3" fill="#0891b2" opacity="0.5" />
        {/* 반사 (아래, 흐릿) */}
        <g opacity="0.35">
          {[0, 72, 144, 216, 288].map(d => <ellipse key={'d' + d} cx="60" cy="88" rx="6" ry="12" fill="#a5f3fc" transform={`rotate(${d} 60 76)`} />)}
          <circle cx="60" cy="76" r="5" fill="#67e8f9" />
        </g>
        {[40, 80].map((x, i) => <motion.ellipse key={x} cx={x} cy="64" rx="6" ry="1.5" fill="#fff" opacity="0.5" animate={{ scaleX: [1, 1.4, 1] }} transition={{ duration: 3, delay: i, repeat: Infinity }} />)}
      </motion.g>
    </PlantSvg>
  )
}

/* 57. 명상의 보리수 (rare) */
export function MeditationBodhitree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="rare" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <rect x="56" y="64" width="8" height="46" rx="3" fill="#78350f" />
        <path d="M60 76 Q44 70 38 78 M60 70 Q76 64 84 72" stroke="#78350f" strokeWidth="2.5" fill="none" />
        <ellipse cx="60" cy="48" rx="32" ry="28" fill="#15803d" />
        <ellipse cx="60" cy="44" rx="26" ry="22" fill="#22c55e" />
        {/* 잎 끝 하트 모양 보리수잎 */}
        {[[44, 36], [76, 38], [60, 28]].map(([x, y], i) => (
          <motion.path key={i} d={`M${x} ${y} q-4 -4 -7 0 q3 6 7 8 q4 -2 7 -8 q-3 -4 -7 0`} fill="#16a34a"
            animate={{ rotate: [-3, 3, -3] }} transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }} style={{ transformOrigin: `${x}px ${y}px` }} />
        ))}
        <motion.circle cx="60" cy="48" r="4" fill="#fde68a" opacity="0.7" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 3, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 58. 깨달음 흰 연꽃 (epic) */
export function EnlightenmentWhitelotus({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="epic" />
      <ellipse cx="60" cy="98" rx="48" ry="5" fill="#a78bfa" opacity="0.3" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.8 }} style={{ transformOrigin: '60px 70px' }}>
        <ellipse cx="60" cy="86" rx="34" ry="8" fill="#86efac" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(d => <ellipse key={d} cx="60" cy="54" rx="7" ry="24" fill="white" stroke="#e9d5ff" strokeWidth="0.5" transform={`rotate(${d} 60 72)`} />)}
        {[20, 70, 120, 170, 220, 270, 320].map(d => <ellipse key={'i' + d} cx="60" cy="60" rx="6" ry="16" fill="#faf5ff" transform={`rotate(${d} 60 72)`} />)}
        <motion.circle cx="60" cy="72" r="6" fill="#fde047" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }} />
      </motion.g>
    </PlantSvg>
  )
}

/* 59. 천 년의 고요나무 (legendary) */
export function ThousandYearSilencetree({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        <path d="M60 110 L60 60 M60 80 Q42 74 34 62 M60 74 Q78 68 86 56 M60 66 Q52 56 50 46 M60 66 Q68 56 70 46" stroke="#57534e" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="38" cy="56" rx="14" ry="11" fill="#15803d" />
        <ellipse cx="84" cy="52" rx="14" ry="11" fill="#16a34a" />
        <ellipse cx="50" cy="42" rx="13" ry="11" fill="#22c55e" />
        <ellipse cx="72" cy="42" rx="13" ry="11" fill="#16a34a" />
        <ellipse cx="60" cy="34" rx="16" ry="13" fill="#15803d" />
        {/* 떨어지는 잎 */}
        <motion.ellipse cx="40" cy="70" rx="3" ry="5" fill="#84cc16" animate={{ y: [0, 30], x: [0, -8], opacity: [1, 0], rotate: [0, 120] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="60" cy="40" r="3" fill="#fde68a" opacity="0.6" animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 4, repeat: Infinity }} />
      </g>
    </PlantSvg>
  )
}

/* 60. 마음의 정수꽃 (legendary) */
export function HeartEssenceflower({ size = 120, growProgress = 1 }: PlantProps) {
  const colors = ['#ffd84d', '#7eb3ff', '#ff7e7e', '#a78bfa', '#ff9ec7', '#fbbf24', '#9ca3af', '#6ee7b7']
  return (
    <PlantSvg size={size}>
      <RarityAura rarity="legendary" />
      <motion.g initial={{ scale: 0 }} animate={{ scale: growProgress }} transition={{ duration: 0.9 }} style={{ transformOrigin: '60px 56px' }}>
        {/* 8감정 색의 꽃잎 */}
        {colors.map((c, i) => (
          <motion.ellipse key={i} cx="60" cy="30" rx="6" ry="16" fill={c} transform={`rotate(${i * 45} 60 56)`}
            animate={{ opacity: [0.75, 1, 0.75] }} transition={{ duration: 3, delay: i * 0.15, repeat: Infinity }} />
        ))}
        <motion.circle cx="60" cy="56" r="10" fill="url(#essenceCore)" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }} style={{ transformOrigin: '60px 56px' }} />
        <defs>
          <radialGradient id="essenceCore"><stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor="#fde047" /></radialGradient>
        </defs>
        <text x="60" y="60" fontSize="9" textAnchor="middle">💗</text>
      </motion.g>
    </PlantSvg>
  )
}
