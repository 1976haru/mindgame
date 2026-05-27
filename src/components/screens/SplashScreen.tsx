import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'

export function SplashScreen() {
  const initialize = useAppStore(s => s.initialize)

  useEffect(() => {
    const t = setTimeout(() => initialize(), 1200)
    return () => clearTimeout(t)
  }, [initialize])

  return (
    <div className="screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center' }}
      >
        <motion.div
          style={{ fontSize: 80, marginBottom: 20 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🌱
        </motion.div>
        <h1 style={{ fontSize: 48, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>
          마음 정원
        </h1>
        <p style={{ marginTop: 10, color: 'var(--color-text-soft)' }}>
          너의 마음이 자라는 곳
        </p>
      </motion.div>
    </div>
  )
}
