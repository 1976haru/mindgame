import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { CalmTurtle } from '../friends/FriendComponents'

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest'
interface PhaseDef { phase: Phase; duration: number; label: string; instruction: string }

interface Mode { id: string; name: string; desc: string; phases: PhaseDef[] }

const MODES: Mode[] = [
  { id: 'box', name: '박스 호흡', desc: '4-2-6-1.5초 · 차분하게', phases: [
    { phase: 'inhale', duration: 4000, label: '들이쉬기', instruction: '코로 천천히 숨을 들이마셔요' },
    { phase: 'hold', duration: 2000, label: '잠깐 멈춤', instruction: '잠시 숨을 참아요' },
    { phase: 'exhale', duration: 6000, label: '내쉬기', instruction: '입으로 길게 숨을 내쉬어요' },
    { phase: 'rest', duration: 1500, label: '쉬기', instruction: '편안하게 쉬어요' }
  ] },
  { id: '478', name: '4-7-8 호흡', desc: '불안할 때 좋아요', phases: [
    { phase: 'inhale', duration: 4000, label: '들이쉬기', instruction: '4초 동안 들이마셔요' },
    { phase: 'hold', duration: 7000, label: '멈춤', instruction: '7초 동안 숨을 참아요' },
    { phase: 'exhale', duration: 8000, label: '내쉬기', instruction: '8초 동안 천천히 내쉬어요' }
  ] },
  { id: 'star', name: '별빛 호흡', desc: '3-3-3초 · 저학년용', phases: [
    { phase: 'inhale', duration: 3000, label: '들이쉬기', instruction: '별을 모으듯 들이마셔요' },
    { phase: 'hold', duration: 3000, label: '반짝', instruction: '별빛을 잠깐 담아요' },
    { phase: 'exhale', duration: 3000, label: '내쉬기', instruction: '별가루를 후~ 불어요' }
  ] }
]

export function BreathingScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const recordBreathingComplete = useAppStore(s => s.recordBreathingComplete)
  const [mode, setMode] = useState<Mode | null>(null)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [cycleCount, setCycleCount] = useState(0)
  const [celebrate, setCelebrate] = useState(false)

  useEffect(() => {
    if (!mode || celebrate) return
    const phase = mode.phases[phaseIdx]
    const t = setTimeout(() => {
      setPhaseIdx(prev => {
        const next = (prev + 1) % mode.phases.length
        if (next === 0) {
          setCycleCount(c => {
            const nc = c + 1
            recordBreathingComplete()
            if (nc >= 3) setCelebrate(true)
            return nc
          })
        }
        return next
      })
    }, phase.duration)
    return () => clearTimeout(t)
  }, [phaseIdx, mode, celebrate, recordBreathingComplete])

  // 모드 선택 화면
  if (!mode) {
    return (
      <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
        <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setScreen('minigames')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>← 미니게임</button>
          <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🫧 호흡 풍선</h2>
        </div>
        <p style={{ color: 'var(--color-text-soft)', fontSize: 14, padding: '0 24px 12px' }}>어떤 호흡을 해볼까요?</p>
        <div style={{ flex: 1, padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MODES.map(m => (
            <motion.button key={m.id} whileTap={{ scale: 0.97 }} onClick={() => { setMode(m); setPhaseIdx(0); setCycleCount(0) }}
              style={{ textAlign: 'left', padding: 18, borderRadius: 16, background: 'rgba(124,92,255,0.12)', border: '2px solid rgba(124,92,255,0.3)' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>{m.name}</div>
              <div style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>{m.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>
    )
  }

  // 완료 (거북이 칭찬)
  if (celebrate) {
    return (
      <div className="screen">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><CalmTurtle size={180} /></motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ textAlign: 'center', maxWidth: 320, padding: '0 24px', marginTop: 16 }}>
          <h2 style={{ fontSize: 26, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 10 }}>차분 거북이</h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, background: 'rgba(255,255,255,0.08)', padding: '16px 20px', borderRadius: 'var(--radius-md)', marginBottom: 20 }}>
            "휴~ 정말 잘했어! 마음이 한결 차분해졌지? 언제든 화가 날 땐 같이 숨을 쉬자."
          </p>
          <button onClick={() => setScreen('garden')} style={{ padding: '14px 32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#34d399,#10b981)', color: 'white', fontWeight: 700, fontSize: 16 }}>고마워 💚</button>
        </motion.div>
      </div>
    )
  }

  const phase = mode.phases[phaseIdx]
  const balloonScale = phase.phase === 'inhale' || phase.phase === 'hold' ? 1.6 : 0.6

  return (
    <div className="screen">
      <div style={{ position: 'absolute', top: 24, left: 24, right: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={() => setMode(null)} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', fontSize: 14 }}>← 모드</button>
        <p style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>{cycleCount}/3회</p>
      </div>

      <motion.div animate={{ scale: balloonScale }} transition={{ duration: phase.duration / 1000, ease: 'easeInOut' }}
        style={{ width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #ff9ec7 0%, #7c5cff 70%, #4c1d95 100%)', boxShadow: '0 0 60px rgba(255, 158, 199, 0.6)', marginBottom: 60, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: -50, left: '50%', transform: 'translateX(-50%)', width: 2, height: 50, background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ position: 'absolute', top: '20%', left: '25%', width: 30, height: 30, borderRadius: '50%', background: 'rgba(255,255,255,0.6)', filter: 'blur(10px)' }} />
      </motion.div>

      <motion.div key={phaseIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: 320, padding: '0 24px' }}>
        <h2 style={{ fontSize: 32, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 12 }}>{phase.label}</h2>
        <p style={{ color: 'var(--color-text-soft)', fontSize: 17, lineHeight: 1.5 }}>{phase.instruction}</p>
      </motion.div>

      <button onClick={() => setScreen('garden')} style={{ position: 'absolute', bottom: 32, padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--color-text)', fontSize: 15 }}>그만하기</button>
    </div>
  )
}
