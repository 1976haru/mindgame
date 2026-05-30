import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { SolomonOwl, SpeechBubble } from '../characters/SolomonOwl'
import { playVoice } from '../../utils/voice'

const LINES = [
  '안녕, [name]. 나는 황금 부엉이 솔로몬이야.',
  '큰일이야! 솔로몬 왕국의 공감의 빛이 사라지고 있어. 사람들이 서로를 이해하지 못해 다투기 시작했단다.',
  '너의 마음 정원에는 진짜 공감이 자란다고 들었어. 너의 감정 하나하나가 왕국을 구할 빛이 될 거야.',
  '도와줄래? 마음을 키우면 공감 에너지가 모이고, 그 빛으로 왕국의 다툼을 해결할 수 있어!'
]

export function SolomonIntroScreen() {
  const profile = useAppStore(s => s.profile)
  const setScreen = useAppStore(s => s.setScreen)
  const markSolomonMet = useAppStore(s => s.markSolomonMet)
  const [idx, setIdx] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const [bridge, setBridge] = useState(false)

  const name = profile?.name || '친구'
  const text = LINES[idx].replace('[name]', name)
  const isLast = idx === LINES.length - 1

  // 대사가 바뀔 때마다 해당 솔로몬 음성 재생 (solomon_intro_01~04)
  useEffect(() => {
    void playVoice(`solomon_intro_0${idx + 1}`)
  }, [idx])

  const handleTap = () => {
    if (!typingDone) return
    if (!isLast) { setIdx(idx + 1); setTypingDone(false) }
    else { markSolomonMet(); setBridge(true) }
  }

  return (
    <div className="screen" onClick={handleTap} style={{ justifyContent: 'flex-end', background: 'linear-gradient(180deg,#0a0a1a 0%,#1a1a3e 100%)', cursor: 'pointer' }}>
      {/* 부엉이 하강 */}
      <motion.div initial={{ y: -200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ position: 'absolute', top: '14%' }}>
        <SolomonOwl size={180} expression={isLast ? 'smile' : 'serious'} />
      </motion.div>

      {!bridge ? (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} style={{ marginBottom: 48, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <SpeechBubble key={idx} text={text} onDone={() => setTypingDone(true)} />
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)', opacity: typingDone ? 1 : 0.4 }}>
            {typingDone ? (isLast ? '화면을 눌러 시작하기 ✨' : '화면을 눌러 계속 →') : '...'}
          </p>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: 64, textAlign: 'center', width: '100%' }}>
          {/* 왕국으로 다리가 생기는 연출 */}
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1 }}
            style={{ height: 8, margin: '0 32px 20px', borderRadius: 8, background: 'linear-gradient(90deg,#7c5cff,#ffd84d,#6ee7b7)', transformOrigin: 'left' }} />
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ color: 'var(--color-accent)', fontSize: 18, fontFamily: 'var(--font-script)', marginBottom: 16 }}>
            공감 에너지 +1 ✨ 왕국으로 가는 다리가 생겼어요!
          </motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); setScreen('garden') }}
            style={{ padding: '14px 36px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white' }}>
            정원으로 가기 🌱
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
