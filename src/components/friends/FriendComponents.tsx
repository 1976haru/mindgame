import { motion } from 'framer-motion'

interface FriendProps {
  size?: number
}

/* ===== 위로 토끼 ===== */
export function ComfortRabbit({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
      <ellipse cx="45" cy="35" rx="6" ry="22" fill="#f5f5f5" />
      <ellipse cx="45" cy="35" rx="3" ry="18" fill="#ffc8d4" />
      <ellipse cx="65" cy="32" rx="6" ry="22" fill="#f5f5f5" transform="rotate(15 65 32)" />
      <ellipse cx="65" cy="32" rx="3" ry="18" fill="#ffc8d4" transform="rotate(15 65 32)" />
      <ellipse cx="55" cy="65" rx="28" ry="25" fill="#f5f5f5" />
      <path d="M44 62 Q47 58 50 62" stroke="#3a2e2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M60 62 Q63 58 66 62" stroke="#3a2e2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="55" cy="70" rx="3" ry="2" fill="#ff9ec7" />
      <path d="M55 73 Q52 76 50 75" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M55 73 Q58 76 60 75" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="38" cy="72" r="3" fill="#ffc8d4" opacity="0.7" />
      <circle cx="72" cy="72" r="3" fill="#ffc8d4" opacity="0.7" />
      <motion.text x="85" y="55" fontSize="14" animate={{ y: [55, 40, 55], opacity: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity }}>💗</motion.text>
    </motion.svg>
  )
}

/* ===== 축하 나비 ===== */
export function CelebrateButterfly({ size = 100 }: FriendProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <ellipse cx="60" cy="60" rx="3" ry="20" fill="#3a2e4e" />
      <circle cx="60" cy="42" r="4" fill="#3a2e4e" />
      <path d="M58 38 Q54 28 50 26" stroke="#3a2e4e" strokeWidth="1.5" fill="none" />
      <path d="M62 38 Q66 28 70 26" stroke="#3a2e4e" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="26" r="1.5" fill="#fbbf24" />
      <circle cx="70" cy="26" r="1.5" fill="#fbbf24" />
      <motion.g style={{ transformOrigin: '60px 60px' }} animate={{ rotateY: [0, 40, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
        <path d="M60 50 Q30 30 25 55 Q30 65 60 60 Z" fill="#ff9ec7" />
        <path d="M60 50 Q35 38 30 52 Q40 55 60 55 Z" fill="#ffd84d" />
        <circle cx="35" cy="48" r="3" fill="#a855f7" />
        <path d="M60 65 Q35 75 30 90 Q45 85 60 75 Z" fill="#ff9ec7" />
        <circle cx="42" cy="80" r="2.5" fill="#a855f7" />
      </motion.g>
      <motion.g style={{ transformOrigin: '60px 60px' }} animate={{ rotateY: [0, -40, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>
        <path d="M60 50 Q90 30 95 55 Q90 65 60 60 Z" fill="#ff9ec7" />
        <path d="M60 50 Q85 38 90 52 Q80 55 60 55 Z" fill="#ffd84d" />
        <circle cx="85" cy="48" r="3" fill="#a855f7" />
        <path d="M60 65 Q85 75 90 90 Q75 85 60 75 Z" fill="#ff9ec7" />
        <circle cx="78" cy="80" r="2.5" fill="#a855f7" />
      </motion.g>
      {[[20, 30], [100, 35], [110, 80], [15, 90]].map(([x, y], i) => (
        <motion.text key={i} x={x} y={y} fontSize="10" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}>✨</motion.text>
      ))}
    </svg>
  )
}

/* ===== 뿌듯 다람쥐 ===== */
export function ProudSquirrel({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -2, 0] }} transition={{ duration: 2.5, repeat: Infinity }}>
      {/* 꼬리 */}
      <motion.path d="M82 80 Q108 70 100 40 Q96 24 80 34 Q92 40 88 58 Q84 72 70 72 Z" fill="#c87f3e" animate={{ rotate: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '85px 70px' }} />
      {/* 몸 */}
      <ellipse cx="56" cy="78" rx="20" ry="22" fill="#d2914f" />
      <ellipse cx="56" cy="82" rx="13" ry="15" fill="#f0d9b5" />
      {/* 머리 */}
      <circle cx="52" cy="50" r="20" fill="#d2914f" />
      <ellipse cx="42" cy="34" rx="6" ry="8" fill="#c87f3e" />
      <ellipse cx="62" cy="34" rx="6" ry="8" fill="#c87f3e" />
      <circle cx="45" cy="48" r="3" fill="#3a2e2e" />
      <circle cx="59" cy="48" r="3" fill="#3a2e2e" />
      <ellipse cx="52" cy="55" rx="3" ry="2" fill="#7c2d12" />
      <path d="M48 58 Q52 61 56 58" stroke="#7c2d12" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 도토리 */}
      <motion.g animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }} style={{ transformOrigin: '40px 82px' }}>
        <ellipse cx="40" cy="86" rx="7" ry="9" fill="#a16207" />
        <ellipse cx="40" cy="80" rx="8" ry="5" fill="#78350f" />
        <rect x="39" y="73" width="2" height="4" fill="#78350f" />
      </motion.g>
    </motion.svg>
  )
}

/* ===== 차분 거북이 ===== */
export function CalmTurtle({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -1.5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
      {/* 다리 */}
      <ellipse cx="36" cy="86" rx="7" ry="5" fill="#65a30d" />
      <ellipse cx="84" cy="86" rx="7" ry="5" fill="#65a30d" />
      {/* 등껍질 */}
      <ellipse cx="60" cy="72" rx="34" ry="24" fill="#4d7c0f" />
      <ellipse cx="60" cy="70" rx="28" ry="19" fill="#65a30d" />
      {[[60, 60], [46, 70], [74, 70], [54, 80], [66, 80]].map(([x, y], i) => (
        <path key={i} d={`M${x - 7} ${y} l7 -6 l7 6 l-3 8 l-8 0 Z`} fill="#84cc16" stroke="#3f6212" strokeWidth="0.8" />
      ))}
      {/* 머리 */}
      <ellipse cx="26" cy="66" rx="12" ry="10" fill="#84cc16" />
      <circle cx="22" cy="63" r="2" fill="#3a2e2e" />
      <path d="M18 70 Q22 72 26 70" stroke="#3f6212" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* 숨 표시 */}
      {[0, 1, 2].map(i => <motion.circle key={i} cx={14 - i * 3} cy={60 - i * 4} r="2" fill="#a7f3d0" opacity="0.6" animate={{ opacity: [0.6, 0, 0.6], x: [0, -4, 0] }} transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }} />)}
    </motion.svg>
  )
}

/* ===== 용기 여우 ===== */
export function CourageFox({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -3, 0] }} transition={{ duration: 2.8, repeat: Infinity }}>
      {/* 꼬리 */}
      <path d="M80 84 Q104 80 98 56 Q94 64 84 70 Q88 80 76 84 Z" fill="#ea580c" />
      <path d="M96 58 Q100 54 98 50 Q92 56 90 62 Z" fill="#fff" />
      {/* 몸 */}
      <ellipse cx="56" cy="80" rx="18" ry="20" fill="#ea580c" />
      <ellipse cx="56" cy="86" rx="11" ry="12" fill="#fff" />
      {/* 머리 */}
      <path d="M38 36 L46 50 L34 52 Z" fill="#ea580c" />
      <path d="M70 36 L62 50 L74 52 Z" fill="#ea580c" />
      <ellipse cx="54" cy="52" rx="19" ry="16" fill="#ea580c" />
      <path d="M54 50 Q40 54 42 64 Q54 68 54 64 Q54 68 66 64 Q68 54 54 50" fill="#fff" />
      <circle cx="47" cy="50" r="2.5" fill="#3a2e2e" />
      <circle cx="61" cy="50" r="2.5" fill="#3a2e2e" />
      <path d="M54 58 L51 62 L57 62 Z" fill="#3a2e2e" />
      {/* 손전등 */}
      <rect x="74" y="64" width="14" height="7" rx="2" fill="#fbbf24" transform="rotate(-20 74 64)" />
      <motion.path d="M86 56 L108 44 L108 60 Z" fill="#fde68a" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity }} />
    </motion.svg>
  )
}

/* ===== 호기심 부엉이 ===== */
export function CuriousOwl({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -2.5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
      {/* 귀깃 */}
      <path d="M38 38 L42 22 L50 36 Z" fill="#7c5c3a" />
      <path d="M82 38 L78 22 L70 36 Z" fill="#7c5c3a" />
      {/* 몸 */}
      <ellipse cx="60" cy="64" rx="30" ry="34" fill="#a17a4f" />
      <ellipse cx="60" cy="70" rx="20" ry="24" fill="#d4b58a" />
      {/* 눈 */}
      <circle cx="49" cy="56" r="11" fill="#fff" />
      <circle cx="71" cy="56" r="11" fill="#fff" />
      <motion.g animate={{ x: [0, 2, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <circle cx="49" cy="56" r="5" fill="#3a2e2e" />
        <circle cx="71" cy="56" r="5" fill="#3a2e2e" />
        <circle cx="51" cy="54" r="1.5" fill="#fff" />
        <circle cx="73" cy="54" r="1.5" fill="#fff" />
      </motion.g>
      <path d="M60 62 L55 68 L65 68 Z" fill="#f59e0b" />
      {/* 날개 */}
      <path d="M30 64 Q26 80 38 88" fill="none" stroke="#7c5c3a" strokeWidth="4" strokeLinecap="round" />
      <path d="M90 64 Q94 80 82 88" fill="none" stroke="#7c5c3a" strokeWidth="4" strokeLinecap="round" />
      {/* 호기심 물음표 */}
      <motion.text x="92" y="40" fontSize="14" animate={{ opacity: [0, 1, 0], y: [40, 30, 40] }} transition={{ duration: 2.5, repeat: Infinity }}>❔</motion.text>
    </motion.svg>
  )
}

/* ===== 꿈꾸는 고래 ===== */
export function DreamingWhale({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -4, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
      {/* 몸 */}
      <path d="M24 64 Q40 40 80 48 Q100 52 102 64 Q100 78 80 80 Q40 86 24 64" fill="#4f80c4" />
      <path d="M24 64 Q40 78 60 80 Q40 86 24 64" fill="#3a5f99" />
      {/* 배 */}
      <path d="M40 72 Q60 84 84 76 Q80 80 60 80 Q44 80 40 72" fill="#a5c8f0" />
      {/* 꼬리 */}
      <path d="M100 64 L114 54 L110 68 L114 78 Z" fill="#4f80c4" />
      {/* 눈 */}
      <circle cx="44" cy="62" r="3" fill="#1e293b" />
      <circle cx="45" cy="60" r="1" fill="#fff" />
      {/* 물줄기 별 */}
      {[0, 1, 2].map(i => <motion.text key={i} x={54 + i * 2} y={40 - i * 8} fontSize="9" animate={{ opacity: [0, 1, 0], y: [40 - i * 8, 28 - i * 8] }} transition={{ duration: 3, delay: i * 0.4, repeat: Infinity }}>⭐</motion.text>)}
    </motion.svg>
  )
}

/* ===== 비밀 유니콘 (legendary) ===== */
export function SecretUnicorn({ size = 100 }: FriendProps) {
  return (
    <motion.svg width={size} height={size} viewBox="0 0 120 120" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>
      <defs>
        <linearGradient id="uniMane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9ec7" /><stop offset="50%" stopColor="#c084fc" /><stop offset="100%" stopColor="#7eb3ff" />
        </linearGradient>
      </defs>
      {/* 몸 */}
      <ellipse cx="58" cy="80" rx="22" ry="18" fill="#fdf2f8" />
      <rect x="44" y="86" width="5" height="16" rx="2" fill="#fdf2f8" />
      <rect x="68" y="86" width="5" height="16" rx="2" fill="#fdf2f8" />
      {/* 목/머리 */}
      <path d="M44 78 Q40 56 52 46 Q64 42 66 54 Q60 60 58 72 Z" fill="#fdf2f8" />
      <ellipse cx="52" cy="46" rx="11" ry="9" fill="#fdf2f8" />
      {/* 뿔 */}
      <motion.path d="M52 38 L50 24 L56 36 Z" fill="#fbbf24" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }} />
      {/* 갈기 */}
      <path d="M58 40 Q70 44 66 58 Q62 70 50 78 Q60 64 58 50 Q56 44 58 40" fill="url(#uniMane)" />
      <circle cx="48" cy="46" r="2" fill="#3a2e2e" />
      {/* 반짝이 */}
      {[[30, 40], [82, 50], [76, 90], [28, 80], [60, 26]].map(([x, y], i) => (
        <motion.text key={i} x={x} y={y} fontSize="11" animate={{ opacity: [0, 1, 0], scale: [0.4, 1.3, 0.4] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}>✨</motion.text>
      ))}
    </motion.svg>
  )
}

export const FRIEND_COMPONENTS: Record<string, React.FC<FriendProps>> = {
  comfort_rabbit: ComfortRabbit,
  celebrate_butterfly: CelebrateButterfly,
  proud_squirrel: ProudSquirrel,
  calm_turtle: CalmTurtle,
  courage_fox: CourageFox,
  curious_owl: CuriousOwl,
  dreaming_whale: DreamingWhale,
  secret_unicorn: SecretUnicorn
}
