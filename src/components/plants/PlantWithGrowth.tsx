// 🌱 성장 단계별 식물 렌더 래퍼 (Phase 1)
// 씨앗~줄기는 공통 패턴 + 식물 감정 색상, 꽃봉오리~열매는 기존 식물 아트 재사용.
// 건강 상태(시들기/회복)를 시각으로 표현. 식물은 절대 죽지 않음.
import { motion } from 'framer-motion'
import { PLANT_COMPONENTS } from './index'
import { PlantSvg } from './plantBase'
import { PLANT_BY_ID } from '../../data/plants'
import { EMOTIONS } from '../../data/emotions'
import type { GardenEntry } from '../../utils/storage'
import {
  entryStage,
  calculateHealth,
  growProgressForStage,
  HEALTH_STATES,
  type GrowthStage,
  type HealthState,
} from '../../data/growth'

interface Props {
  entry: GardenEntry
  size?: number
  now?: number
}

// 흙더미 (모든 어린 단계 공통 바닥)
function Soil() {
  return (
    <>
      <ellipse cx="60" cy="108" rx="34" ry="10" fill="#6b4a2b" />
      <ellipse cx="60" cy="105" rx="30" ry="7" fill="#7d5836" />
    </>
  )
}

// 씨앗 단계
function SeedSvg({ size, color }: { size: number; color: string }) {
  return (
    <PlantSvg size={size}>
      <Soil />
      <motion.ellipse
        cx="60" cy="103" rx="6" ry="8" fill={color}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        style={{ transformOrigin: '60px 103px' }}
      />
      <ellipse cx="58" cy="100" rx="2" ry="3" fill="rgba(255,255,255,0.5)" />
    </PlantSvg>
  )
}

// 새싹 단계 (떡잎 2개)
function SproutSvg({ size, color }: { size: number; color: string }) {
  return (
    <PlantSvg size={size}>
      <Soil />
      <motion.g
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.8 }}
        style={{ transformOrigin: '60px 104px' }}
      >
        <path d="M60 104 L60 86" stroke="#6cc26c" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="50" cy="84" rx="11" ry="6" fill={color} transform="rotate(-32 50 84)" />
        <ellipse cx="70" cy="84" rx="11" ry="6" fill={color} transform="rotate(32 70 84)" />
        <ellipse cx="50" cy="84" rx="11" ry="6" fill="rgba(255,255,255,0.18)" transform="rotate(-32 50 84)" />
      </motion.g>
    </PlantSvg>
  )
}

// 건강 상태별 래퍼 스타일
function healthStyle(health: HealthState): React.CSSProperties {
  switch (health) {
    case 'thirsty':
      return { filter: 'saturate(0.75)', transform: 'rotate(2deg)', transition: 'filter 0.6s, transform 0.6s' }
    case 'wilting':
      return { filter: 'grayscale(0.55) brightness(0.92)', transform: 'rotate(4deg) translateY(2px)', transition: 'filter 0.6s, transform 0.6s' }
    default:
      return { filter: 'none', transform: 'none', transition: 'filter 0.6s, transform 0.6s' }
  }
}

export function PlantWithGrowth({ entry, size = 70, now = Date.now() }: Props) {
  const stage: GrowthStage = entryStage(entry)
  const health = calculateHealth(entry, now)
  const species = PLANT_BY_ID[entry.plantId]
  const color = species ? EMOTIONS[species.emotion].color : '#6ee7b7'
  const PlantComp = PLANT_COMPONENTS[entry.plantId]

  let body: React.ReactNode
  if (stage === 'seed') {
    body = <SeedSvg size={size} color={color} />
  } else if (stage === 'sprout') {
    body = <SproutSvg size={size} color={color} />
  } else if (PlantComp) {
    // stem(0.45) / bud(0.7) / bloom(1) / fruit(1) — 기존 아트를 단계별 성장 정도로
    body = <PlantComp size={size} growProgress={growProgressForStage(stage)} />
  } else {
    body = <SproutSvg size={size} color={color} />
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, lineHeight: 0 }}>
      <div style={healthStyle(health)}>{body}</div>

      {/* 열매 단계: 작은 열매 표시 */}
      {stage === 'fruit' && (
        <div style={{ position: 'absolute', right: size * 0.12, top: size * 0.42, fontSize: size * 0.22 }}>🍎</div>
      )}

      {/* 건강 상태 배지 (돌봄 필요할 때만) */}
      {HEALTH_STATES[health].needsCare && (
        <motion.div
          animate={{ y: [0, -3, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ position: 'absolute', right: -2, top: -2, fontSize: size * 0.26 }}
          aria-label={HEALTH_STATES[health].name}
        >
          {HEALTH_STATES[health].emoji}
        </motion.div>
      )}

      {/* 활짝 핀 건강한 식물: 반짝임 */}
      {health === 'thriving' && stage !== 'seed' && (
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', left: -2, top: 0, fontSize: size * 0.22 }}
        >
          ✨
        </motion.div>
      )}
    </div>
  )
}
