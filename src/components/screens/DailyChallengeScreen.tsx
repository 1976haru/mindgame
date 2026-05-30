import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { getTodaysChallenge, DAILY_REWARD } from '../../data/dailyChallenge'
import { DOJO_BY_ID, rankName } from '../../data/dojos'
import { todayString } from '../../utils/helpers'
import { MentorAvatar } from '../mentors/MentorComponents'

export function DailyChallengeScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const setActiveMission = useAppStore(s => s.setActiveMission)
  const setActiveDojo = useAppStore(s => s.setActiveDojo)
  const game = useAppStore(s => s.game)

  const mission = getTodaysChallenge()
  const dojo = DOJO_BY_ID[mission.dojoId]
  const claimedToday = game.dailyClaimedDate === todayString()

  const start = () => {
    setActiveDojo(mission.dojoId)
    setActiveMission(mission.id)
    setScreen('mission')
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'linear-gradient(180deg,#2a1a4a 0%,#0f0f1e 60%)' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('dojoHall')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🎯 오늘의 도전</h2>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '0 24px' }}>
        {/* 연속 일수 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, padding: '8px 18px' }}>
          <span style={{ fontSize: 22 }}>🔥</span>
          <span style={{ fontSize: 18, fontWeight: 700 }}>{game.dailyStreak}일 연속 도전</span>
        </div>

        <MentorAvatar mentorId={dojo.mentor.id} size={120} expression="cheer" />

        <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.07)', borderRadius: 18, padding: 20, width: '100%', maxWidth: 360 }}>
          <div style={{ fontSize: 16, color: dojo.color, fontWeight: 700 }}>{dojo.icon} {dojo.name} · {rankName(mission.rank)}</div>
          <div style={{ fontSize: 22, fontWeight: 700, margin: '6px 0' }}>{mission.title}</div>
          <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{mission.description}</div>
          <div style={{ marginTop: 10, fontSize: 16, color: 'var(--color-accent)' }}>보상: 공감 에너지 +{DAILY_REWARD} 💜</div>
        </div>

        {claimedToday ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 20, color: 'var(--color-green)', fontWeight: 700 }}>✅ 오늘 도전 완료!</p>
            <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>내일 새로운 도전이 기다려요</p>
          </div>
        ) : (
          <motion.button whileTap={{ scale: 0.95 }} onClick={start}
            style={{ padding: '16px 40px', fontSize: 20, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ec4899)', color: 'white' }}>
            도전하기 ✨
          </motion.button>
        )}
        <p style={{ fontSize: 16, color: 'var(--color-text-soft)', textAlign: 'center' }}>7일 연속 시 영웅카드 · 14일 레전더리 식물!</p>
      </div>
    </div>
  )
}
