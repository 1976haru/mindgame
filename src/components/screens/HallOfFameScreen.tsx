import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playVoice } from '../../utils/voice'
import { DOJOS } from '../../data/dojos'
import { SolomonOwl } from '../characters/SolomonOwl'
import { MentorAvatar } from '../mentors/MentorComponents'

const LINES = [
  '공감의 빛이 돌아왔습니다',
  '솔로몬 왕국이 부활했습니다',
  '7개 도장의 모든 지혜를 익혔습니다'
]

export function HallOfFameScreen() {
  const game = useAppStore(s => s.game)
  const profile = useAppStore(s => s.profile)
  const setScreen = useAppStore(s => s.setScreen)
  const setCertGrand = useAppStore(s => s.setCertGrand)
  const [line, setLine] = useState(0)

  const shihanCount = DOJOS.filter(d => game.dojoProgress[d.id].isShihan).length
  const eligible = shihanCount === 7 && game.clearedEpisodes.length >= 15

  useEffect(() => {
    if (!eligible) return
    if (line >= LINES.length) return
    const t = setTimeout(() => setLine(l => l + 1), 1400)
    return () => clearTimeout(t)
  }, [line, eligible])

  // 엔딩 솔로몬 음성 (한 줄씩 ending_01~04, 마지막 줄에서 04→05 이어서)
  useEffect(() => {
    if (!eligible) return
    const n = Math.min(line + 1, 5)
    void playVoice(`solomon_ending_0${n}`, n === 4 ? { onEnd: () => { void playVoice('solomon_ending_05') } } : {})
  }, [line, eligible])

  if (!eligible) {
    return (
      <div className="screen" style={{ padding: 24 }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🏛️</div>
        <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 12 }}>명예의 전당</h2>
        <p style={{ color: 'var(--color-text-soft)', textAlign: 'center', lineHeight: 1.7, marginBottom: 20 }}>
          7개 도장 모두 <b>사범</b>이 되고<br />법교육 15편을 모두 마치면<br />진정한 솔로몬의 후계자가 돼요!
        </p>
        <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 16, fontSize: 17, textAlign: 'center' }}>
          🏯 사범 {shihanCount} / 7<br />⚖️ 법교육 {game.clearedEpisodes.length} / 15
        </div>
        <button onClick={() => setScreen('dojoHall')} style={{ marginTop: 24, padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>← 도장으로</button>
      </div>
    )
  }

  const finished = line >= LINES.length

  return (
    <div className="screen" style={{ overflow: 'hidden', background: 'radial-gradient(ellipse at center,#2a1a4a 0%,#05050f 70%)' }}>
      {/* 폭죽 */}
      {finished && [...Array(10)].map((_, i) => (
        <motion.div key={i} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(i) * 160, y: Math.sin(i) * 160, opacity: 0 }} transition={{ duration: 1.4, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
          style={{ position: 'absolute', top: '30%', left: '50%', fontSize: 22 }}>{['✨', '🎉', '⭐', '🎊'][i % 4]}</motion.div>
      ))}

      {/* 한 줄씩 등장 */}
      <div style={{ textAlign: 'center', padding: '0 24px', minHeight: 120 }}>
        {LINES.slice(0, line).map((t, i) => (
          <motion.p key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 20, color: 'var(--color-text)', margin: '6px 0' }}>{t}</motion.p>
        ))}
      </div>

      {finished && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <SolomonOwl size={150} expression="smile" />
          <motion.h1 initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ fontSize: 28, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', textAlign: 'center', textShadow: '0 0 24px rgba(255,216,77,0.7)' }}>
            {profile?.name}은(는)<br />진정한 솔로몬의 후계자!
          </motion.h1>
          <p style={{ fontSize: 17, color: 'var(--color-text-soft)', textAlign: 'center', lineHeight: 1.6, padding: '0 24px' }}>
            "마음과 지혜를 모두 키웠구나.<br />너의 마음 정원은 영원히 빛날 거야."
          </p>
          {/* 멘토 + 친구들이 모임 */}
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 340 }}>
            {DOJOS.map(d => <MentorAvatar key={d.id} mentorId={d.mentor.id} size={48} />)}
          </div>
          <button onClick={() => { setCertGrand(true); setScreen('certificate') }}
            style={{ marginTop: 8, padding: '16px 32px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#fbbf24,#ff9ec7,#7c5cff)', color: 'white', fontWeight: 700, fontSize: 19 }}>
            🏆 솔로몬의 후계자 인증서 받기
          </button>
        </motion.div>
      )}
    </div>
  )
}
