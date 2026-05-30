import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'
import { playVoice } from '../../../utils/voice'
import { missionQuestionClip } from '../../../data/missionVoice'
import { reactionClip } from '../../../data/voiceExtra'

export function MultipleChoiceEngine({ config, color, onComplete, missionId, mentorId }: EngineProps) {
  const questions = config.questions ?? []
  const need = config.needCorrect ?? Math.ceil(questions.length * 0.7)
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  // 문제가 바뀔 때마다 멘토가 문제를 읽어줌 (저학년 접근성). 음소거면 자동으로 건너뜀.
  useEffect(() => {
    if (missionId) void playVoice(missionQuestionClip(missionId, idx))
  }, [missionId, idx])

  if (questions.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }
  const q = questions[idx]
  const replay = () => { if (missionId) void playVoice(missionQuestionClip(missionId, idx)) }

  const pick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    const right = i === q.answer
    if (right) { playSound('correct'); setCorrect(c => c + 1) } else playSound('wrong')
    // 멘토 정답/오답 반응 음성 (문제 인덱스로 3종 중 선택 → 반복 안 지루하게)
    if (mentorId) { const clip = reactionClip(mentorId, right, idx); if (clip) void playVoice(clip) }
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
            <h3 style={{ fontSize: 22, lineHeight: 1.4 }}>{q.prompt}</h3>
            {missionId && (
              <motion.button whileTap={{ scale: 0.85 }} onClick={replay} aria-label="문제 다시 듣기"
                style={{ flexShrink: 0, fontSize: 22, minHeight: 'auto', padding: 4, lineHeight: 1 }}>🔊</motion.button>
            )}
          </div>
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
