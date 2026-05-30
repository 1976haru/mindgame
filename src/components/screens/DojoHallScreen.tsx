import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DOJOS, rankName } from '../../data/dojos'
import { ranksWithMissions } from '../../data/missions'
import { SYNERGIES, isSynergyMet } from '../../data/synergies'
import { getSurpriseEvent } from '../../utils/encouragement'
import { MentorAvatar } from '../mentors/MentorComponents'
import { BottomNav } from '../common/BottomNav'

export function DojoHallScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const setActiveDojo = useAppStore(s => s.setActiveDojo)
  const dojoProgress = useAppStore(s => s.game.dojoProgress)

  const game = useAppStore(s => s.game)
  const shihanCount = DOJOS.filter(d => dojoProgress[d.id].isShihan).length
  const hallEligible = shihanCount === 7 && game.clearedEpisodes.length >= 15
  const surprise = getSurpriseEvent()

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '18px 20px 8px' }}>
        <h2 style={{ fontSize: 26, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🏯 솔로몬 7대 도장</h2>
        <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>사범 {shihanCount} / 7 · 마음과 지혜를 함께 키워요</p>
      </div>

      {(hallEligible || shihanCount >= 1) && (
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setScreen('hallOfFame')}
          style={{ margin: '0 16px 8px', padding: '12px 16px', borderRadius: 14, background: hallEligible ? 'linear-gradient(135deg,#fbbf24,#ff9ec7,#7c5cff)' : 'rgba(255,255,255,0.06)', color: hallEligible ? 'white' : 'var(--color-text-soft)', fontWeight: 700, fontSize: 17, width: 'calc(100% - 32px)' }}>
          🏛️ 명예의 전당 {hallEligible ? '— 입장 가능!' : `(사범 ${shihanCount}/7)`}
        </motion.button>
      )}
      {surprise && (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          style={{ margin: '0 16px 4px', padding: '12px 16px', borderRadius: 14, background: 'linear-gradient(135deg,#f59e0b,#ec4899)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{surprise.emoji}</span>
          <div><div style={{ fontWeight: 700, fontSize: 17 }}>{surprise.title}</div><div style={{ fontSize: 16 }}>{surprise.reward}</div></div>
        </motion.div>
      )}

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {DOJOS.map((d, i) => {
            const p = dojoProgress[d.id]
            const totalRanks = ranksWithMissions(d.id).length || 9
            const doneRanks = p.achievedRanks.filter(r => r !== 0).length
            const pct = Math.min(1, doneRanks / totalRanks)
            return (
              <motion.button key={d.id}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setActiveDojo(d.id); setScreen('dojoDetail') }}
                style={{
                  position: 'relative', textAlign: 'center', padding: '14px 10px', borderRadius: 18, overflow: 'hidden',
                  background: `linear-gradient(160deg, ${d.color}26, rgba(255,255,255,0.04))`,
                  border: `2px solid ${p.isShihan ? '#ffd84d' : d.color + '55'}`,
                  boxShadow: p.isShihan ? '0 0 22px rgba(255,216,77,0.5)' : 'none'
                }}>
                {p.isShihan && <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 18 }}>👑</div>}
                <div style={{ display: 'flex', justifyContent: 'center' }}><MentorAvatar mentorId={d.mentor.id} size={72} /></div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)' }}>{d.icon} {d.shortName}</div>
                <div style={{ fontSize: 16, color: d.color, fontWeight: 700 }}>{p.isShihan ? '사범 ⭐' : `현재 ${rankName(p.currentRank)}`}</div>
                <div style={{ marginTop: 8, height: 7, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }}>
                  <div style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 6, background: d.color, transition: 'width 0.5s' }} />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* 일일 도전 진입 */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setScreen('dailyChallenge')}
          style={{ width: '100%', marginTop: 14, padding: 16, borderRadius: 16, background: 'linear-gradient(135deg,#7c5cff,#ec4899)', color: 'white', fontWeight: 700, fontSize: 18 }}>
          🎯 오늘의 도전
        </motion.button>
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setScreen('versus')}
          style={{ width: '100%', marginTop: 10, padding: 16, borderRadius: 16, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)', fontWeight: 700, fontSize: 18 }}>
          🤺 친구 대결
        </motion.button>

        {/* 시너지 */}
        <h3 style={{ fontSize: 18, color: 'var(--color-text)', margin: '18px 4px 8px' }}>✨ 영역 시너지</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SYNERGIES.map(s => {
            const met = isSynergyMet(game, s)
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, background: met ? 'rgba(110,231,183,0.16)' : 'rgba(255,255,255,0.05)', border: `2px solid ${met ? 'rgba(110,231,183,0.5)' : 'rgba(255,255,255,0.1)'}`, opacity: met ? 1 : 0.7 }}>
                <span style={{ fontSize: 24 }}>{met ? s.icon : '🔒'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{s.reward}</div>
                </div>
                {met && <span style={{ fontSize: 16, color: 'var(--color-green)' }}>달성!</span>}
              </div>
            )
          })}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
