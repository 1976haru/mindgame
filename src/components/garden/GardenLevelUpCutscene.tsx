// 🎉 정원 레벨업 컷신 (Phase 4)
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { gardenLevelInfo } from '../../data/gardenLevels'

export function GardenLevelUpCutscene() {
  const level = useAppStore(s => s.pendingGardenLevelUp)
  const ack = useAppStore(s => s.ackGardenLevelUp)
  if (level == null) return null
  const info = gardenLevelInfo(level)

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={ack}
      style={{ position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(8,8,20,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}
    >
      {/* 반짝이 */}
      {Array.from({ length: 14 }).map((_, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], x: Math.cos(i) * 120, y: Math.sin(i * 1.7) * 160 }}
          transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
          style={{ position: 'absolute', fontSize: 22 }}
        >✨</motion.div>
      ))}
      <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 12 }} style={{ fontSize: 92 }}>
        {info.emoji}
      </motion.div>
      <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ fontSize: 16, color: 'var(--color-text-soft)', marginTop: 8 }}>
        정원이 한 단계 자랐어요!
      </motion.p>
      <motion.h2 initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ fontSize: 30, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', margin: '4px 0 10px' }}>
        Lv.{info.level} · {info.name}
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        style={{ fontSize: 17, color: 'var(--color-text)', lineHeight: 1.5, maxWidth: 320 }}>
        {info.reward}
      </motion.p>
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        onClick={ack}
        style={{ marginTop: 24, padding: '14px 36px', fontSize: 18, fontWeight: 700, borderRadius: 16, background: 'linear-gradient(135deg,#fbbf24,#7c5cff)', color: 'white' }}>
        와! 🎉
      </motion.button>
    </motion.div>
  )
}
