import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DOJO_BY_ID } from '../../data/dojos'
import { getHeroById } from '../../data/heroes'
import { MentorAvatar } from '../mentors/MentorComponents'
import { SolomonOwl } from '../characters/SolomonOwl'
import { HeroCard } from '../heroes/HeroCard'

export function ShihanCutsceneScreen() {
  const activeDojoId = useAppStore(s => s.activeDojoId)
  const setScreen = useAppStore(s => s.setScreen)
  const setCertGrand = useAppStore(s => s.setCertGrand)

  if (!activeDojoId) { setScreen('dojoHall'); return null }
  const dojo = DOJO_BY_ID[activeDojoId]
  const hero = getHeroById(dojo.finalReward.heroId)

  return (
    <div className="screen" style={{ overflow: 'hidden', background: 'radial-gradient(ellipse at center,#3a2a00 0%,#0f0f1e 70%)' }}>
      {/* 황금 빛 폭발 */}
      <motion.div initial={{ scale: 0, opacity: 0.9 }} animate={{ scale: 10, opacity: 0 }} transition={{ duration: 1.6 }}
        style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,#ffd84d,#ff9ec7,transparent 70%)' }} />

      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }} style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <MentorAvatar mentorId={dojo.mentor.id} size={100} expression="praise" />
        <SolomonOwl size={120} expression="smile" />
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        style={{ fontSize: 26, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', textAlign: 'center', margin: '14px 0 6px', textShadow: '0 0 20px rgba(255,216,77,0.6)' }}>
        {dojo.name} 사범으로<br />인정합니다!
      </motion.h2>

      {/* 사범 메달 */}
      <motion.div initial={{ rotateY: 540, scale: 0 }} animate={{ rotateY: 0, scale: 1 }} transition={{ delay: 0.8, duration: 1 }}
        style={{ fontSize: 70, margin: '6px 0' }}>🏅</motion.div>
      <p style={{ fontSize: 18, fontWeight: 700, color: dojo.color }}>{dojo.finalReward.titleName}</p>

      {/* 영웅 카드 */}
      {hero && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} style={{ marginTop: 10 }}>
          <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--color-accent)', marginBottom: 4 }}>🎴 영웅 카드 획득!</p>
          <HeroCard hero={hero} width={170} />
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button onClick={() => { setCertGrand(false); setScreen('certificate') }}
          style={{ padding: '14px 22px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#1f2937', fontWeight: 700, fontSize: 17 }}>
          📜 인증서 받기
        </button>
        <button onClick={() => setScreen('dojoHall')}
          style={{ padding: '14px 22px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.12)', color: 'var(--color-text)', fontWeight: 700, fontSize: 17 }}>
          도장으로
        </button>
      </motion.div>
    </div>
  )
}
