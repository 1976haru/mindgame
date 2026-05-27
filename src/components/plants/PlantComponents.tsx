import { motion } from 'framer-motion'

interface PlantProps {
  size?: number
  growProgress?: number  // 0~1
}

// 공통: 줄기와 잎의 자라는 transform
function stemTransform(progress: number) {
  return `scaleY(${progress})`
}

/* ===== 1. 햇살민들레 (joy) ===== */
export function SunshineDandelion({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q58 70 60 40" stroke="#5cb85c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="50" cy="80" rx="8" ry="4" fill="#5cb85c" transform="rotate(-30 50 80)" />
        <ellipse cx="70" cy="90" rx="8" ry="4" fill="#5cb85c" transform="rotate(30 70 90)" />
      </g>
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: growProgress }}
        style={{ transformOrigin: '60px 40px' }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {/* 꽃잎들 */}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="22"
            rx="3"
            ry="14"
            fill="#ffd84d"
            transform={`rotate(${i * 30} 60 40)`}
          />
        ))}
        <circle cx="60" cy="40" r="8" fill="#f59e0b" />
      </motion.g>
    </svg>
  )
}

/* ===== 2. 달빛 눈물꽃 (sad) ===== */
export function MoonlightTearflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q55 75 60 45" stroke="#4a7eb5" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="85" rx="6" ry="10" fill="#5b8ec8" transform="rotate(-40 48 85)" />
      </g>
      <motion.g
        initial={{ scale: 0, y: -10 }}
        animate={{ scale: growProgress, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: '60px 45px' }}
      >
        {/* 종 모양 꽃, 끝에서 눈물방울 */}
        <path d="M50 45 Q50 30 60 28 Q70 30 70 45 Q60 50 50 45" fill="#7eb3ff" />
        <path d="M50 45 Q50 30 60 28 Q70 30 70 45" fill="none" stroke="#4a7eb5" strokeWidth="1" />
        <motion.circle
          cx="60"
          cy="58"
          r="3"
          fill="#a5d0ff"
          animate={{ cy: [58, 65, 58], opacity: [1, 0, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  )
}

/* ===== 3. 용암 선인장 (angry) ===== */
export function LavaCactus({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {/* 선인장 몸통 */}
        <ellipse cx="60" cy="80" rx="18" ry="30" fill="#c1432e" />
        <ellipse cx="42" cy="75" rx="9" ry="16" fill="#c1432e" />
        <ellipse cx="78" cy="78" rx="9" ry="16" fill="#c1432e" />
        {/* 가시 */}
        {[55, 65, 75, 85, 95].map(y => (
          <g key={y}>
            <line x1="50" y1={y} x2="46" y2={y - 2} stroke="#fbbf77" strokeWidth="1.5" />
            <line x1="70" y1={y} x2="74" y2={y - 2} stroke="#fbbf77" strokeWidth="1.5" />
          </g>
        ))}
        {/* 꼭대기에 작은 빨간 꽃 (화남이 꽃으로 바뀜) */}
        <motion.circle
          cx="60"
          cy="50"
          r="6"
          fill="#ff5e5e"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <circle cx="60" cy="50" r="2.5" fill="#ffd84d" />
      </g>
    </svg>
  )
}

/* ===== 4. 그림자 버섯 (fear) ===== */
export function ShadowMushroom({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: `scale(${growProgress})` }}>
        {/* 줄기 */}
        <rect x="52" y="70" width="16" height="35" rx="8" fill="#e5e7eb" />
        {/* 갓 */}
        <ellipse cx="60" cy="65" rx="35" ry="22" fill="#7c3aed" />
        <ellipse cx="60" cy="60" rx="30" ry="15" fill="#a78bfa" />
        {/* 빛나는 점들 */}
        {[
          [45, 60], [55, 55], [68, 58], [75, 65], [50, 70]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="2.5"
            fill="#fef3c7"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
          />
        ))}
      </g>
    </svg>
  )
}

/* ===== 5. 반짝 봉오리 (excited) ===== */
export function SparkleBlossom({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 75 60 45" stroke="#86efac" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="48" cy="85" rx="7" ry="4" fill="#86efac" transform="rotate(-30 48 85)" />
        <ellipse cx="72" cy="75" rx="7" ry="4" fill="#86efac" transform="rotate(30 72 75)" />
      </g>
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: growProgress }}
        transition={{ duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: '60px 40px' }}
      >
        {/* 분홍 꽃잎 5장 */}
        {[0, 72, 144, 216, 288].map(deg => (
          <ellipse
            key={deg}
            cx="60"
            cy="28"
            rx="7"
            ry="12"
            fill="#ff9ec7"
            transform={`rotate(${deg} 60 40)`}
          />
        ))}
        <circle cx="60" cy="40" r="6" fill="#fce7f3" />
        {/* 반짝이 별 */}
        {[[40, 25], [80, 30], [85, 50], [35, 50]].map(([x, y], i) => (
          <motion.text
            key={i}
            x={x}
            y={y}
            fontSize="10"
            fill="#fbbf24"
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 1.8, delay: i * 0.4, repeat: Infinity }}
          >
            ✨
          </motion.text>
        ))}
      </motion.g>
    </svg>
  )
}

/* ===== 6. 훈장 해바라기 (proud) ===== */
export function MedalSunflower({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <g style={{ transformOrigin: '60px 110px', transform: stemTransform(growProgress) }}>
        <path d="M60 110 Q60 70 60 40" stroke="#3a7d3a" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M60 80 Q45 75 38 85 Q48 88 60 85" fill="#5cb85c" />
        <path d="M60 70 Q75 65 82 75 Q72 78 60 75" fill="#5cb85c" />
      </g>
      <motion.g
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: growProgress, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{ transformOrigin: '60px 38px' }}
      >
        {/* 큰 꽃잎 */}
        {Array.from({ length: 16 }).map((_, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="20"
            rx="4"
            ry="14"
            fill="#fbbf24"
            transform={`rotate(${i * 22.5} 60 38)`}
          />
        ))}
        <circle cx="60" cy="38" r="11" fill="#92400e" />
        {/* 황금 메달 */}
        <motion.g
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transformOrigin: '60px 38px' }}
        >
          <circle cx="60" cy="38" r="6" fill="#ffd84d" />
          <text x="60" y="42" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#92400e">★</text>
        </motion.g>
      </motion.g>
    </svg>
  )
}

/* ===== 7. 구름 이끼 (bored) ===== */
export function CloudMoss({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: 'center', transform: `scale(${growProgress})` }}
      >
        {/* 구름 모양 이끼들 */}
        <ellipse cx="40" cy="95" rx="18" ry="10" fill="#d1d5db" />
        <ellipse cx="60" cy="90" rx="22" ry="12" fill="#e5e7eb" />
        <ellipse cx="80" cy="95" rx="18" ry="10" fill="#d1d5db" />
        <ellipse cx="50" cy="85" rx="14" ry="8" fill="#f3f4f6" />
        <ellipse cx="72" cy="83" rx="14" ry="8" fill="#f3f4f6" />
        {/* 작은 점들 (이끼 디테일) */}
        <circle cx="45" cy="92" r="1.5" fill="#9ca3af" />
        <circle cx="58" cy="88" r="1.5" fill="#9ca3af" />
        <circle cx="72" cy="92" r="1.5" fill="#9ca3af" />
        <circle cx="65" cy="85" r="1" fill="#6b7280" />
      </motion.g>
    </svg>
  )
}

/* ===== 8. 고요 연꽃 (calm) ===== */
export function CalmLotus({ size = 120, growProgress = 1 }: PlantProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* 잔잔한 물결 */}
      <ellipse cx="60" cy="100" rx="50" ry="4" fill="#6ee7b7" opacity="0.3" />
      <ellipse cx="60" cy="100" rx="35" ry="2" fill="#6ee7b7" opacity="0.5" />
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: growProgress }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ transformOrigin: '60px 75px' }}
      >
        {/* 연잎 */}
        <ellipse cx="60" cy="90" rx="35" ry="8" fill="#34d399" />
        {/* 연꽃잎 - 안쪽 → 바깥쪽 */}
        {[
          { rx: 8, ry: 22, deg: 0, color: '#fce7f3' },
          { rx: 8, ry: 22, deg: 60, color: '#fce7f3' },
          { rx: 8, ry: 22, deg: 120, color: '#fce7f3' },
          { rx: 8, ry: 22, deg: 180, color: '#fce7f3' },
          { rx: 8, ry: 22, deg: 240, color: '#fce7f3' },
          { rx: 8, ry: 22, deg: 300, color: '#fce7f3' },
        ].map((p, i) => (
          <ellipse
            key={i}
            cx="60"
            cy="62"
            rx={p.rx}
            ry={p.ry}
            fill={p.color}
            transform={`rotate(${p.deg} 60 78)`}
          />
        ))}
        {/* 중심부 */}
        <circle cx="60" cy="78" r="6" fill="#fbbf24" />
      </motion.g>
    </svg>
  )
}

// 식물 ID → 컴포넌트 매핑
export const PLANT_COMPONENTS: Record<string, React.FC<PlantProps>> = {
  sunshine_dandelion: SunshineDandelion,
  moonlight_tearflower: MoonlightTearflower,
  lava_cactus: LavaCactus,
  shadow_mushroom: ShadowMushroom,
  sparkle_blossom: SparkleBlossom,
  medal_sunflower: MedalSunflower,
  cloud_moss: CloudMoss,
  calm_lotus: CalmLotus
}
