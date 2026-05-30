import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { EngineProps } from './types'
import { playSound } from '../../../utils/sound'
import { playMelody } from '../../../utils/audio'
import { getDictationClip } from '../../../data/scripts'
import { speakText } from '../../../utils/speak'

// 음절 카드를 순서대로 골라 단어를 완성 (받아쓰기/글자 조립)
export function DictationEngine({ config, color, onComplete }: EngineProps) {
  const words = config.words ?? []
  const need = config.needCorrect ?? Math.ceil(words.length * 0.8)
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [built, setBuilt] = useState<string[]>([])
  const [feedback, setFeedback] = useState<'' | 'ok' | 'no'>('')

  const word = words[idx]
  const targetSyllables = useMemo(() => word ? (word.syllables && word.syllables.length ? word.syllables : Array.from(word.text)) : [], [idx])
  const pool = useMemo(() => {
    const arr = [...targetSyllables]
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]] }
    return arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx])

  if (words.length === 0) { onComplete(true, { score: 1, total: 1 }); return null }

  // 받아쓰기 출제 음성: 세종 거북이의 실제 발음(있으면) → 없으면 단순 음으로 폴백
  const playWord = () => {
    if (!word) return
    const clip = getDictationClip(word.text)
    if (clip) void speakText(clip, word.text, '세종 거북이')
    else playMelody(Array(word.text.length).fill('미'), 260)
  }

  const reset = () => setBuilt([])
  const addSyllable = (s: string, poolIndex: number) => {
    const next = [...built, `${poolIndex}:${s}`]
    setBuilt(next)
    if (next.length === targetSyllables.length) {
      const made = next.map(x => x.split(':')[1]).join('')
      const right = made === word.text
      setFeedback(right ? 'ok' : 'no')
      if (right) { playSound('correct'); setCorrect(c => c + 1) } else playSound('wrong')
      setTimeout(() => {
        setFeedback('')
        if (right) {
          if (idx < words.length - 1) { setIdx(idx + 1); setBuilt([]) }
          else { const fc = correct + 1; onComplete(fc >= need, { score: fc, total: words.length }) }
        } else {
          // 틀리면 같은 문제 재시도 (다음으로 안 넘어감)
          setBuilt([])
        }
      }, 1000)
    }
  }

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{idx + 1} / {words.length} · 맞춘 단어 {correct}개</div>
      {word.hint && <div style={{ fontSize: 18, color }}>💡 {word.hint}</div>}
      <button onClick={playWord} style={{ padding: '10px 18px', borderRadius: 999, background: `${color}22`, border: `2px solid ${color}55`, fontSize: 16 }}>🔊 다시 듣기</button>

      {/* 만든 글자 */}
      <div style={{ display: 'flex', gap: 8, minHeight: 56, alignItems: 'center' }}>
        {targetSyllables.map((_, i) => (
          <div key={i} style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700,
            background: built[i] ? `${color}33` : 'rgba(255,255,255,0.06)', border: `2px solid ${feedback === 'ok' ? '#6ee7b7' : feedback === 'no' ? '#f87171' : color + '44'}` }}>
            {built[i] ? built[i].split(':')[1] : ''}
          </div>
        ))}
      </div>

      {/* 음절 풀 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {pool.map((s, i) => {
          const used = built.some(b => b.startsWith(`${i}:`))
          return (
            <motion.button key={i} disabled={used} whileTap={{ scale: 0.92 }} onClick={() => addSyllable(s, i)}
              style={{ width: 56, height: 56, borderRadius: 14, fontSize: 24, fontWeight: 700, opacity: used ? 0.3 : 1, background: `${color}22`, border: `2px solid ${color}66`, color: 'var(--color-text)' }}>
              {s}
            </motion.button>
          )
        })}
      </div>

      <button onClick={reset} style={{ padding: '8px 16px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', fontSize: 16, color: 'var(--color-text-soft)' }}>다시 ↺</button>
      {feedback === 'ok' && <p style={{ fontSize: 18, color: '#6ee7b7', fontWeight: 700 }}>맞았어요! 🎉</p>}
      {feedback === 'no' && <p style={{ fontSize: 18, color: '#f87171', fontWeight: 700 }}>다시 해볼까요?</p>}
    </div>
  )
}
