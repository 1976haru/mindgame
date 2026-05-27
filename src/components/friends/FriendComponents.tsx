import { motion } from 'framer-motion'

interface FriendProps {
  size?: number
}

/* ===== 위로 토끼 (comfort_rabbit) ===== */
export function ComfortRabbit({ size = 100 }: FriendProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* 귀 (긴) */}
      <ellipse cx="45" cy="35" rx="6" ry="22" fill="#f5f5f5" />
      <ellipse cx="45" cy="35" rx="3" ry="18" fill="#ffc8d4" />
      <ellipse cx="65" cy="32" rx="6" ry="22" fill="#f5f5f5" transform="rotate(15 65 32)" />
      <ellipse cx="65" cy="32" rx="3" ry="18" fill="#ffc8d4" transform="rotate(15 65 32)" />
      {/* 머리 */}
      <ellipse cx="55" cy="65" rx="28" ry="25" fill="#f5f5f5" />
      {/* 눈 (감은) - 위로의 표정 */}
      <path d="M44 62 Q47 58 50 62" stroke="#3a2e2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M60 62 Q63 58 66 62" stroke="#3a2e2e" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 코 */}
      <ellipse cx="55" cy="70" rx="3" ry="2" fill="#ff9ec7" />
      {/* 입 */}
      <path d="M55 73 Q52 76 50 75" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M55 73 Q58 76 60 75" stroke="#3a2e2e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* 볼터치 */}
      <circle cx="38" cy="72" r="3" fill="#ffc8d4" opacity="0.7" />
      <circle cx="72" cy="72" r="3" fill="#ffc8d4" opacity="0.7" />
      {/* 작은 하트 (위로의 상징) */}
      <motion.text
        x="85"
        y="55"
        fontSize="14"
        animate={{ y: [55, 40, 55], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        💗
      </motion.text>
    </motion.svg>
  )
}

/* ===== 축하 나비 (celebrate_butterfly) ===== */
export function CelebrateButterfly({ size = 100 }: FriendProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* 몸통 */}
      <ellipse cx="60" cy="60" rx="3" ry="20" fill="#3a2e4e" />
      <circle cx="60" cy="42" r="4" fill="#3a2e4e" />
      {/* 더듬이 */}
      <path d="M58 38 Q54 28 50 26" stroke="#3a2e4e" strokeWidth="1.5" fill="none" />
      <path d="M62 38 Q66 28 70 26" stroke="#3a2e4e" strokeWidth="1.5" fill="none" />
      <circle cx="50" cy="26" r="1.5" fill="#fbbf24" />
      <circle cx="70" cy="26" r="1.5" fill="#fbbf24" />

      {/* 왼쪽 위 날개 */}
      <motion.g
        style={{ transformOrigin: '60px 60px' }}
        animate={{ rotateY: [0, 40, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <path d="M60 50 Q30 30 25 55 Q30 65 60 60 Z" fill="#ff9ec7" />
        <path d="M60 50 Q35 38 30 52 Q40 55 60 55 Z" fill="#ffd84d" />
        <circle cx="35" cy="48" r="3" fill="#a855f7" />
        {/* 왼쪽 아래 날개 */}
        <path d="M60 65 Q35 75 30 90 Q45 85 60 75 Z" fill="#ff9ec7" />
        <circle cx="42" cy="80" r="2.5" fill="#a855f7" />
      </motion.g>

      {/* 오른쪽 위 날개 */}
      <motion.g
        style={{ transformOrigin: '60px 60px' }}
        animate={{ rotateY: [0, -40, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        <path d="M60 50 Q90 30 95 55 Q90 65 60 60 Z" fill="#ff9ec7" />
        <path d="M60 50 Q85 38 90 52 Q80 55 60 55 Z" fill="#ffd84d" />
        <circle cx="85" cy="48" r="3" fill="#a855f7" />
        {/* 오른쪽 아래 날개 */}
        <path d="M60 65 Q85 75 90 90 Q75 85 60 75 Z" fill="#ff9ec7" />
        <circle cx="78" cy="80" r="2.5" fill="#a855f7" />
      </motion.g>

      {/* 반짝이 효과 */}
      {[[20, 30], [100, 35], [110, 80], [15, 90]].map(([x, y], i) => (
        <motion.text
          key={i}
          x={x}
          y={y}
          fontSize="10"
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
        >
          ✨
        </motion.text>
      ))}
    </svg>
  )
}

export const FRIEND_COMPONENTS: Record<string, React.FC<FriendProps>> = {
  comfort_rabbit: ComfortRabbit,
  celebrate_butterfly: CelebrateButterfly
}
