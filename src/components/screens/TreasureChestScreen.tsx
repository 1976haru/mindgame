import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { pendingTreasureMilestone } from '../../utils/gameLogic'
import { playSound } from '../../utils/sound'
import { SecretUnicorn } from '../friends/FriendComponents'

const REWARDS: Record<number, { title: string; desc: string; emoji: string }> = {
  7: { title: '영웅 카드 보너스', desc: '솔로몬이 영웅의 지혜를 선물해요', emoji: '🎴' },
  14: { title: '정원 스킨 해제', desc: '새로운 정원 분위기를 얻었어요', emoji: '🎨' },
  21: { title: '천사의 웃음꽃 해제', desc: '전설의 식물이 정원에 피어날 수 있어요', emoji: '🌟' },
  30: { title: '비밀 유니콘 + 다이아 기쁨수정', desc: '전설의 친구가 너를 찾아왔어요!', emoji: '🦄' }
}

export function TreasureChestScreen() {
  const game = useAppStore(s => s.game)
  const claimTreasure = useAppStore(s => s.claimTreasure)
  const markUnicornMet = useAppStore(s => s.markUnicornMet)
  const setScreen = useAppStore(s => s.setScreen)
  const milestone = pendingTreasureMilestone(game)
  const [opened, setOpened] = useState(false)

  if (milestone === null) {
    return (
      <div className="screen">
        <div style={{ fontSize: 60, marginBottom: 16 }}>📦</div>
        <p style={{ color: 'var(--color-text-soft)', textAlign: 'center', lineHeight: 1.6 }}>
          아직 열 수 있는 보물상자가 없어요.<br />매일 정원을 찾아오면 7일마다 보물상자가 생겨요!
        </p>
        <p style={{ color: 'var(--color-text-soft)', marginTop: 8 }}>현재 출석 {game.attendanceDates.length}일</p>
        <button onClick={() => setScreen('garden')} style={{ marginTop: 24, padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>← 정원으로</button>
      </div>
    )
  }

  const reward = REWARDS[milestone]
  const open = () => {
    playSound('treasure')
    claimTreasure(milestone)
    if (milestone >= 30) markUnicornMet()
    setOpened(true)
  }

  return (
    <div className="screen" style={{ background: 'radial-gradient(ellipse at center,#3a2a5a 0%,#0f0f1e 70%)' }}>
      <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-script)', fontSize: 22, marginBottom: 8 }}>{milestone}일 출석 보물상자!</p>

      {!opened ? (
        <motion.button whileTap={{ scale: 0.9 }} onClick={open} style={{ position: 'relative' }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ fontSize: 130 }}>🎁</motion.div>
          <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ color: 'var(--color-text)', marginTop: 12 }}>톡! 눌러서 열기</motion.p>
        </motion.button>
      ) : (
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', padding: '0 24px' }}>
          {/* 폭죽 */}
          {[...Array(8)].map((_, i) => (
            <motion.div key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(i) * 120, y: Math.sin(i) * 120, opacity: 0 }} transition={{ duration: 1 }}
              style={{ position: 'absolute', left: '50%', top: '30%', fontSize: 20 }}>✨</motion.div>
          ))}
          {milestone >= 30 ? <SecretUnicorn size={160} /> : <div style={{ fontSize: 90 }}>{reward.emoji}</div>}
          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', margin: '12px 0 6px' }}>{reward.title}</h2>
          <p style={{ color: 'var(--color-text-soft)', lineHeight: 1.5, marginBottom: 24 }}>{reward.desc}</p>
          <button onClick={() => setScreen('garden')} style={{ padding: '14px 32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', fontWeight: 700, fontSize: 16 }}>고마워요! 💜</button>
        </motion.div>
      )}
    </div>
  )
}
