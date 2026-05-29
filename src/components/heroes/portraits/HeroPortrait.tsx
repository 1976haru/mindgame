import { motion } from 'framer-motion'

interface PortraitProps {
  heroId: string
  size?: number
}

type Headgear = 'king_crown' | 'scholar_hat' | 'gat' | 'general_helmet' | 'topknot' | 'binyeo' | 'fedora' | 'short_hair' | 'gray_hair' | 'old_woman'

interface PortraitConfig {
  skin: string
  costume: string       // 옷(저고리/도포) 색
  collar: string        // 깃 색
  headgear: Headgear
  accessory?: string    // 손/옆 소품 이모지
  beard?: boolean
}

// 위인별 외형 (캐릭터 스타일, 단순화)
const CONFIGS: Record<string, PortraitConfig> = {
  sejong:       { skin: '#f5d6b3', costume: '#b91c1c', collar: '#fde68a', headgear: 'king_crown', accessory: '📜', beard: true },
  jeongyakyong: { skin: '#f5d6b3', costume: '#1e40af', collar: '#dbeafe', headgear: 'gat', accessory: '📖', beard: true },
  jangyeongsil: { skin: '#e8c39e', costume: '#0f766e', collar: '#ccfbf1', headgear: 'topknot', accessory: '⏱️' },
  yisunsin:     { skin: '#e8c39e', costume: '#374151', collar: '#9ca3af', headgear: 'general_helmet', accessory: '⚔️', beard: true },
  ahnjunggeun:  { skin: '#f0cda0', costume: '#1f2937', collar: '#e5e7eb', headgear: 'short_hair', accessory: '✋' },
  yugwansun:    { skin: '#f8dcc0', costume: '#fff', collar: '#1f2937', headgear: 'binyeo', accessory: '🎌' },
  heojun:       { skin: '#f5d6b3', costume: '#15803d', collar: '#bbf7d0', headgear: 'gat', accessory: '🌿', beard: true },
  shinsaimdang: { skin: '#f8dcc0', costume: '#9d174d', collar: '#fbcfe8', headgear: 'binyeo', accessory: '🖌️' },
  baekjeong_park:{ skin: '#e0b487', costume: '#78350f', collar: '#d6b08a', headgear: 'topknot', accessory: '📣', beard: true },
  kimgu:        { skin: '#f0cda0', costume: '#1f2937', collar: '#f3f4f6', headgear: 'gray_hair', accessory: '🕊️', beard: false },
  ihoeyoung:    { skin: '#f0cda0', costume: '#3730a3', collar: '#c7d2fe', headgear: 'fedora', accessory: '💰', beard: true },
  uljimundeok:  { skin: '#e0b487', costume: '#92400e', collar: '#d97706', headgear: 'general_helmet', accessory: '🏹', beard: true },
  ulpaso:       { skin: '#f5d6b3', costume: '#0e7490', collar: '#a5f3fc', headgear: 'gat', accessory: '🌾', beard: true },
  ahnchanho:    { skin: '#f0cda0', costume: '#334155', collar: '#e2e8f0', headgear: 'short_hair', accessory: '💬' },
  kimmandeok:   { skin: '#f3d3ad', costume: '#7c2d12', collar: '#fcd34d', headgear: 'old_woman', accessory: '🍚' }
}

function Headgear({ type }: { type: Headgear }) {
  switch (type) {
    case 'king_crown':
      return (
        <g>
          <rect x="40" y="20" width="40" height="14" rx="2" fill="#1f2937" />
          <rect x="38" y="14" width="44" height="8" rx="2" fill="#1f2937" />
          <rect x="42" y="8" width="36" height="8" fill="#1f2937" />
          {[46, 54, 60, 66, 74].map(x => <circle key={x} cx={x} cy="12" r="2" fill="#fbbf24" />)}
        </g>
      )
    case 'scholar_hat':
    case 'gat':
      return (
        <g>
          <ellipse cx="60" cy="30" rx="38" ry="7" fill="#1f2937" opacity="0.85" />
          <path d="M46 30 Q46 14 60 14 Q74 14 74 30 Z" fill="#111827" opacity="0.85" />
        </g>
      )
    case 'general_helmet':
      return (
        <g>
          <path d="M40 32 Q40 12 60 10 Q80 12 80 32 Z" fill="#6b7280" />
          <path d="M40 32 Q40 14 60 12 Q80 14 80 32" fill="none" stroke="#374151" strokeWidth="2" />
          <rect x="57" y="2" width="6" height="10" fill="#ef4444" />
          <circle cx="60" cy="2" r="3" fill="#ef4444" />
        </g>
      )
    case 'topknot':
      return (
        <g>
          <path d="M42 30 Q42 14 60 14 Q78 14 78 30 Z" fill="#3a2e2e" />
          <ellipse cx="60" cy="12" rx="5" ry="6" fill="#3a2e2e" />
          <rect x="58" y="6" width="4" height="6" fill="#1c1917" />
        </g>
      )
    case 'binyeo':
      return (
        <g>
          <path d="M40 32 Q40 16 60 14 Q80 16 80 32 Z" fill="#3a2e2e" />
          <ellipse cx="60" cy="34" rx="14" ry="8" fill="#3a2e2e" />
          <line x1="48" y1="34" x2="74" y2="34" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="74" cy="34" r="2.5" fill="#22c55e" />
        </g>
      )
    case 'fedora':
      return (
        <g>
          <ellipse cx="60" cy="28" rx="34" ry="6" fill="#3a2e2e" />
          <path d="M46 28 Q46 12 60 12 Q74 12 74 28 Z" fill="#4b3621" />
          <rect x="46" y="24" width="28" height="4" fill="#1c1917" />
        </g>
      )
    case 'gray_hair':
      return <path d="M42 34 Q42 14 60 14 Q78 14 78 34 Q72 26 60 26 Q48 26 42 34" fill="#d1d5db" />
    case 'short_hair':
      return <path d="M42 34 Q42 12 60 12 Q78 12 78 34 Q72 24 60 24 Q48 24 42 34" fill="#1f2937" />
    case 'old_woman':
      return (
        <g>
          <path d="M42 34 Q42 16 60 16 Q78 16 78 34 Q72 28 60 28 Q48 28 42 34" fill="#e5e7eb" />
          <ellipse cx="60" cy="16" rx="9" ry="5" fill="#d1d5db" />
        </g>
      )
  }
}

export function HeroPortrait({ heroId, size = 120 }: PortraitProps) {
  const c = CONFIGS[heroId]
  if (!c) return null
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity }}>
      {/* 옷 (어깨) */}
      <path d="M28 120 Q28 84 60 80 Q92 84 92 120 Z" fill={c.costume} />
      <path d="M52 82 Q60 96 68 82 L64 110 L56 110 Z" fill={c.collar} />
      <path d="M52 82 L60 92 L68 82" fill="none" stroke={c.collar} strokeWidth="3" strokeLinecap="round" />
      {/* 목 */}
      <rect x="54" y="68" width="12" height="16" rx="4" fill={c.skin} />
      {/* 얼굴 */}
      <ellipse cx="60" cy="50" rx="22" ry="24" fill={c.skin} />
      {/* 귀 */}
      <circle cx="38" cy="50" r="4" fill={c.skin} />
      <circle cx="82" cy="50" r="4" fill={c.skin} />
      {/* 눈 */}
      <circle cx="51" cy="50" r="2.5" fill="#3a2e2e" />
      <circle cx="69" cy="50" r="2.5" fill="#3a2e2e" />
      {/* 눈썹 */}
      <path d="M46 43 Q51 41 55 43" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M65 43 Q69 41 74 43" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 코 */}
      <path d="M60 52 L58 58 L62 58" fill="none" stroke="#d9a878" strokeWidth="1.2" strokeLinecap="round" />
      {/* 입 (온화한 미소) */}
      <path d="M53 62 Q60 67 67 62" stroke="#b45c4a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <circle cx="45" cy="58" r="3.5" fill="#f9a8a8" opacity="0.4" />
      <circle cx="75" cy="58" r="3.5" fill="#f9a8a8" opacity="0.4" />
      {/* 수염 */}
      {c.beard && <path d="M50 64 Q60 78 70 64 Q66 72 60 72 Q54 72 50 64" fill="#6b7280" opacity="0.7" />}
      {/* 머리/관모 */}
      <Headgear type={c.headgear} />
      {/* 소품 */}
      {c.accessory && <text x="96" y="96" fontSize="14" textAnchor="middle">{c.accessory}</text>}
    </motion.svg>
  )
}
