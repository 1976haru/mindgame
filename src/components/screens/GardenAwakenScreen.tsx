import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'

export function GardenAwakenScreen() {
  const profile = useAppStore(s => s.profile)
  const markAwakened = useAppStore(s => s.markGardenAwakened)
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)   // 씨앗 등장
    const t2 = setTimeout(() => setPhase(2), 2200)  // 빛 폭발
    const t3 = setTimeout(() => setPhase(3), 3800)  // 메시지
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="screen" style={{ overflow: 'hidden' }}>
      {/* 씨앗 떨어짐 */}
      <AnimatePresence>
        {phase >= 1 && phase < 2 && (
          <motion.div
            initial={{ y: -300, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
            style={{ fontSize: 80 }}
          >
            🌰
          </motion.div>
        )}
      </AnimatePresence>

      {/* 빛 폭발 */}
      <AnimatePresence>
        {phase >= 2 && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 8, opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ffd84d 0%, #ff9ec7 40%, transparent 70%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* 작은 별들 퍼지기 */}
      <AnimatePresence>
        {phase >= 2 && Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const dist = 200 + Math.random() * 150
          return (
            <motion.div
              key={i}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist,
                opacity: 0,
                scale: 1.5
              }}
              transition={{ duration: 2, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                fontSize: 20 + Math.random() * 15
              }}
            >
              ✨
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* 환영 메시지 */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', textAlign: 'center', maxWidth: 360 }}
          >
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                fontSize: 36,
                fontFamily: 'var(--font-script)',
                color: 'var(--color-accent)',
                textShadow: '0 0 20px rgba(255, 216, 77, 0.6)',
                marginBottom: 20
              }}
            >
              {profile?.name}의 마음 정원이<br />깨어났어요 🌿
            </motion.h1>

            <motion.button
              onClick={markAwakened}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                marginTop: 24,
                padding: '14px 36px',
                fontSize: 20,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #7c5cff, #ff9ec7)',
                color: 'white',
                fontWeight: 700,
                boxShadow: 'var(--shadow-soft)'
              }}
            >
              정원 둘러보기 →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
