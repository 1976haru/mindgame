import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest'

const PHASES: { phase: Phase; duration: number; label: string; instruction: string }[] = [
  { phase: 'inhale',  duration: 4000, label: '들이쉬기', instruction: '코로 천천히 숨을 들이마셔요' },
  { phase: 'hold',    duration: 2000, label: '잠깐 멈춤', instruction: '잠시 숨을 참아요' },
  { phase: 'exhale',  duration: 6000, label: '내쉬기',   instruction: '입으로 길게 숨을 내쉬어요' },
  { phase: 'rest',    duration: 1500, label: '쉬기',     instruction: '편안하게 쉬어요' }
]

export function BreathingScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const phase = PHASES[phaseIdx]
    const t = setTimeout(() => {
      setPhaseIdx(prev => {
        const next = (prev + 1) % PHASES.length
        if (next === 0) setCycleCount(c => c + 1)
        return next
      })
    }, phase.duration)
    return () => clearTimeout(t)
  }, [phaseIdx, running])

  const phase = PHASES[phaseIdx]

  // 풍선 크기: 들숨에서 커지고, 날숨에서 작아짐
  const balloonScale = {
    inhale: 1.6,
    hold: 1.6,
    exhale: 0.6,
    rest: 0.6
  }[phase.phase]

  return (
    <div className="screen">
      {/* 상단 */}
      <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        right: 24,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          onClick={() => setScreen('garden')}
          style={{
            padding: '8px 14px',
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text)',
            fontSize: 14
          }}
        >
          ← 정원
        </button>
        <p style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>
          {cycleCount}회 완료
        </p>
      </div>

      {/* 풍선 */}
      <motion.div
        animate={{ scale: balloonScale }}
        transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
        style={{
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #ff9ec7 0%, #7c5cff 70%, #4c1d95 100%)',
          boxShadow: '0 0 60px rgba(255, 158, 199, 0.6)',
          marginBottom: 60,
          position: 'relative'
        }}
      >
        {/* 풍선 끈 */}
        <div style={{
          position: 'absolute',
          bottom: -50,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 2,
          height: 50,
          background: 'rgba(255, 255, 255, 0.4)'
        }} />
        {/* 광채 */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '25%',
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.6)',
          filter: 'blur(10px)'
        }} />
      </motion.div>

      {/* 텍스트 안내 */}
      <motion.div
        key={phaseIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: 320, padding: '0 24px' }}
      >
        <h2 style={{
          fontSize: 32,
          fontFamily: 'var(--font-script)',
          color: 'var(--color-accent)',
          marginBottom: 12
        }}>
          {phase.label}
        </h2>
        <p style={{ color: 'var(--color-text-soft)', fontSize: 17, lineHeight: 1.5 }}>
          {phase.instruction}
        </p>
      </motion.div>

      {/* 종료 버튼 */}
      <button
        onClick={() => { setRunning(false); setScreen('garden') }}
        style={{
          position: 'absolute',
          bottom: 32,
          padding: '12px 28px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'var(--color-text)',
          fontSize: 15
        }}
      >
        그만하기
      </button>
    </div>
  )
}
