import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'

export function MultipleChoiceEngine({ config, color, onComplete }: EngineProps) {
  const questions = config.questions ?? []
  const need = config.needCorrect ?? Math.ceil(questions.length * 0.7)
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  if (questions.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }
  const q = questions[idx]

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    const right = i === q.answer
    if (right) { playSound('correct'); setCorrect(c => c + 1) } else playSound('wrong')
    setTimeout(() => {
      if (idx < questions.length - 1) { setIdx(idx + 1); setPicked(null) }
      else {
        const finalCorrect = correct + (right ? 1 : 0)
        onComplete(finalCorrect >= need, { score: finalCorrect, total: questions.length })
      }
    }, q.explain ? 1600 : 800)
  }

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ textAlign: 'center', fontSize: 16, color: 'var(--color-text-soft)' }}>{idx + 1} / {questions.length} · 정답 {correct}개</div>
      <AnimatePresence mode="wait">
        <motion.div key={idx} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ textAlign: 'center' }}>
          {q.emoji && <div style={{ fontSize: 64, marginBottom: 8 }}>{q.emoji}</div>}
          <h3 style={{ fontSize: 22, marginBottom: 16, lineHeight: 1.4 }}>{q.prompt}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.choices.map((c, i) => {
              const isAnswer = i === q.answer
              const show = picked !== null
              const bg = show
                ? isAnswer ? 'rgba(110,231,183,0.3)' : i === picked ? 'rgba(248,113,113,0.3)' : 'rgba(255,255,255,0.05)'
                : `${color}22`
              return (
                <motion.button key={i} whileTap={{ scale: 0.97 }} onClick={() => pick(i)}
                  style={{ padding: '16px', fontSize: 18, borderRadius: 14, background: bg, border: `2px solid ${show && isAnswer ? '#6ee7b7' : color + '55'}`, color: 'var(--color-text)' }}>
                  {show && isAnswer ? '✅ ' : show && i === picked ? '❌ ' : ''}{c}
                </motion.button>
              )
            })}
          </div>
          {picked !== null && q.explain && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 12, fontSize: 16, color: 'var(--color-text-soft)', lineHeight: 1.5 }}>💡 {q.explain}</motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
