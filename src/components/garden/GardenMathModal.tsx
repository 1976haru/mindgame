// 🧮 정원 수학 모달 (Phase 3)
// 정원 활동 맥락의 수 문제를 시각적으로 제시. 모두 선택적 보너스이며, 틀려도 따뜻한 격려뿐.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { MathProblem, CONCEPT_LABELS } from '../../data/mathGarden'
import { playSound } from '../../utils/sound'

interface Props {
  problem: MathProblem
  onClose: () => void
  // 정답 시 보상(공감 에너지). 기본 2.
  reward?: number
}

// 시각 토큰 줄 (이모지로 수를 보여줌)
function TokenRow({ token, count, max = 12 }: { token: string; count: number; max?: number }) {
  const n = Math.min(count, max)
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', maxWidth: 220 }}>
      {Array.from({ length: n }).map((_, i) => (
        <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.04 }} style={{ fontSize: 22 }}>
          {token}
        </motion.span>
      ))}
    </div>
  )
}

export function GardenMathModal({ problem, onClose, reward = 2 }: Props) {
  const recordMathResult = useAppStore(s => s.recordMathResult)
  const awardEmpathy = useAppStore(s => s.awardEmpathy)
  const [state, setState] = useState<'asking' | 'correct' | 'wrong'>('asking')
  const [picked, setPicked] = useState<number | null>(null)

  const choose = (val: number) => {
    if (state === 'correct') return
    setPicked(val)
    const ok = val === problem.answer
    recordMathResult(problem.concept, ok)
    if (ok) {
      playSound('correct')
      awardEmpathy(reward)
      setState('correct')
    } else {
      playSound('wrong')
      setState('wrong')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 380, background: 'rgba(24,24,44,0.99)', borderRadius: 24, padding: '22px 22px 20px', border: '1px solid rgba(124,92,255,0.3)', textAlign: 'center' }}
      >
        <div style={{ display: 'inline-block', fontSize: 13, color: 'var(--color-accent)', background: 'rgba(124,92,255,0.16)', padding: '3px 12px', borderRadius: 999, marginBottom: 12 }}>
          🧮 {CONCEPT_LABELS[problem.concept]} · 보너스
        </div>
        <h3 style={{ fontSize: 21, color: 'var(--color-text)', lineHeight: 1.45, marginBottom: 16 }}>{problem.prompt}</h3>

        {/* 시각 토큰 */}
        {(problem.showLeft != null) && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 18 }}>
            <TokenRow token={problem.token} count={problem.showLeft} />
            {problem.op && problem.showRight != null && (
              <>
                <span style={{ fontSize: 26, color: 'var(--color-accent)', fontWeight: 700 }}>{problem.op}</span>
                <TokenRow token={problem.token} count={problem.showRight} />
              </>
            )}
          </div>
        )}

        <AnimatePresence mode="wait">
          {state === 'correct' ? (
            <motion.div key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <div style={{ fontSize: 50 }}>🌟</div>
              <p style={{ fontSize: 19, color: '#5eebb7', fontWeight: 700, margin: '6px 0 4px' }}>정답! 수학 천재네!</p>
              <p style={{ fontSize: 16, color: 'var(--color-text-soft)', marginBottom: 16 }}>식물도 좋아해요. 💜 +{reward}</p>
              <button onClick={onClose} style={{ width: '100%', padding: 14, fontSize: 18, fontWeight: 700, borderRadius: 14, background: 'linear-gradient(135deg,#5eebb7,#7c5cff)', color: 'white' }}>
                좋아! 🌱
              </button>
            </motion.div>
          ) : (
            <motion.div key="ask">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {problem.choices.map(c => {
                  const isWrongPick = state === 'wrong' && picked === c
                  return (
                    <motion.button key={c} whileTap={{ scale: 0.94 }} onClick={() => choose(c)}
                      animate={isWrongPick ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                      style={{
                        padding: '16px 0', fontSize: 24, fontWeight: 700, borderRadius: 14,
                        background: isWrongPick ? 'rgba(255,126,126,0.2)' : 'rgba(255,255,255,0.08)',
                        color: 'var(--color-text)', border: '1px solid rgba(255,255,255,0.08)',
                      }}>
                      {c}
                    </motion.button>
                  )
                })}
              </div>
              {state === 'wrong' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ fontSize: 16, color: 'var(--color-text-soft)', marginTop: 14 }}>
                  괜찮아, 다시 해볼까? 식물이 기다려줄게 🌿
                </motion.p>
              )}
              <button onClick={onClose} style={{ marginTop: 14, fontSize: 15, color: 'var(--color-text-soft)' }}>
                나중에 할래요
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
