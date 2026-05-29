import { motion } from 'framer-motion'
import { isNightTime } from '../../utils/timeUtils'
import { getCurrentSeason } from '../../utils/seasonUtils'

// 시드 없는 의사 난수 (인덱스 기반, 매 렌더 동일)
const r = (i: number, mul: number) => ((Math.sin(i * 99.7) + 1) / 2) * mul

export function GardenAmbience({ birthday = false }: { birthday?: boolean }) {
  const night = isNightTime()
  const season = getCurrentSeason()

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* 밤: 반딧불이 */}
      {night && [...Array(8)].map((_, i) => (
        <motion.div key={'ff' + i}
          animate={{ x: [r(i, 30) - 15, r(i + 5, 30) - 15, r(i, 30) - 15], y: [r(i + 2, 30) - 15, r(i + 8, 30) - 15, r(i + 2, 30) - 15], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 4 + r(i, 4), repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: `${10 + r(i, 80)}%`, top: `${20 + r(i + 1, 60)}%`, width: 6, height: 6, borderRadius: '50%', background: '#fde68a', boxShadow: '0 0 8px 2px #fde68a' }} />
      ))}

      {/* 봄: 벚꽃 / 가을: 단풍 / 겨울: 눈 */}
      {(season === 'spring' || season === 'autumn' || season === 'winter') && [...Array(10)].map((_, i) => (
        <motion.div key={'p' + i}
          initial={{ y: -20 }}
          animate={{ y: '110%', x: [0, r(i, 20) - 10, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8 + r(i, 6), repeat: Infinity, delay: r(i, 6), ease: 'linear' }}
          style={{ position: 'absolute', left: `${r(i, 100)}%`, fontSize: season === 'winter' ? 14 : 16 }}>
          {season === 'spring' ? '🌸' : season === 'autumn' ? '🍂' : '❄️'}
        </motion.div>
      ))}

      {/* 여름: 햇살 반짝 */}
      {season === 'summer' && [...Array(6)].map((_, i) => (
        <motion.div key={'s' + i} animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 2 + r(i, 2), repeat: Infinity, delay: r(i, 2) }}
          style={{ position: 'absolute', left: `${10 + r(i, 80)}%`, top: `${10 + r(i + 1, 40)}%`, fontSize: 16 }}>✨</motion.div>
      ))}

      {/* 생일 */}
      {birthday && [...Array(8)].map((_, i) => (
        <motion.div key={'b' + i} initial={{ y: '110%' }} animate={{ y: '-10%' }} transition={{ duration: 6 + r(i, 4), repeat: Infinity, delay: r(i, 4) }}
          style={{ position: 'absolute', left: `${r(i, 100)}%`, fontSize: 22 }}>{i % 2 ? '🎈' : '🎉'}</motion.div>
      ))}
    </div>
  )
}
