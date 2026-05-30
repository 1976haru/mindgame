// 🐻 자라는 정원 튜토리얼 (Phase 6) — 부드러운 안내, 언제든 건너뛰기 가능.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'

const STEPS = [
  { icon: '🌱', title: '마음을 심어요', body: '오늘의 마음을 고르면 작은 씨앗이 정원에 심겨요.' },
  { icon: '💧', title: '돌봐주세요', body: '식물을 톡 누르면 물주기·햇빛·대화로 돌볼 수 있어요. 돌보면 무럭무럭 자라요!' },
  { icon: '🧮', title: '숨은 수학 놀이', body: '물방울을 세거나 씨앗을 나누다 보면 어느새 수학 천재! 틀려도 괜찮아요.' },
  { icon: '🦋', title: '친구들이 찾아와요', body: '꽃이 피면 나비와 새가 놀러 와요. 정원을 꾸미고 일기도 써봐요.' },
]

export function GardenTutorial() {
  const seen = useAppStore(s => s.game.gardenTutorialSeen)
  const profile = useAppStore(s => s.profile)
  const markSeen = useAppStore(s => s.markGardenTutorialSeen)
  const [step, setStep] = useState(0)

  // 프로필이 있고(첫 정원 깨어남 이후) 아직 안 본 경우에만 노출
  if (seen || !profile) return null
  const s = STEPS[step]
  const last = step === STEPS.length - 1

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, zIndex: 80, background: 'rgba(8,8,20,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 16 }} animate={{ scale: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 360, background: 'rgba(24,24,44,0.99)', borderRadius: 24, padding: 24, textAlign: 'center', border: '1px solid rgba(124,92,255,0.3)' }}
      >
        <div style={{ fontSize: 16, color: 'var(--color-text-soft)', marginBottom: 4 }}>🐻 숫자 곰돌이</div>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ fontSize: 60, margin: '8px 0' }}>{s.icon}</div>
            <h3 style={{ fontSize: 22, color: 'var(--color-accent)', fontFamily: 'var(--font-script)', marginBottom: 8 }}>{s.title}</h3>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: 'var(--color-text)', minHeight: 80 }}>
              {step === 0 && profile ? `${profile.name}야, ` : ''}{s.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 진행 점 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, margin: '14px 0' }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: i === step ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)' }} />
          ))}
        </div>

        <motion.button whileTap={{ scale: 0.96 }} onClick={() => (last ? markSeen() : setStep(step + 1))}
          style={{ width: '100%', padding: 14, fontSize: 18, fontWeight: 700, borderRadius: 14, background: 'linear-gradient(135deg,#7c5cff,#5eebb7)', color: 'white' }}>
          {last ? '정원 가꾸러 가기! 🌷' : '다음 →'}
        </motion.button>
        {!last && (
          <button onClick={markSeen} style={{ marginTop: 12, fontSize: 15, color: 'var(--color-text-soft)' }}>건너뛰기</button>
        )}
      </motion.div>
    </motion.div>
  )
}
