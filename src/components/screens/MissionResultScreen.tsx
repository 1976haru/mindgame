import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DOJO_BY_ID, rankName } from '../../data/dojos'
import { MentorAvatar } from '../mentors/MentorComponents'
import { randomEncouragement } from '../../utils/encouragement'
import { speak } from '../../utils/speak'
import { mentorClip } from '../../data/scripts'

export function MissionResultScreen() {
  const outcome = useAppStore(s => s.missionOutcome)
  const setScreen = useAppStore(s => s.setScreen)

  // 멘토의 성공/실패 음성 (승급 시에는 승급 축하)
  useEffect(() => {
    if (!outcome) return
    const mentorId = DOJO_BY_ID[outcome.dojoId].mentor.id
    if (outcome.success && outcome.rankedUp !== null) {
      void speak(`${mentorId}_rankup`)
    } else {
      const variant = Math.floor(Math.random() * 3)
      void speak(mentorClip(mentorId, outcome.success ? 'success' : 'fail', variant))
    }
  }, [outcome])

  if (!outcome) { setScreen('dojoHall'); return null }
  const dojo = DOJO_BY_ID[outcome.dojoId]
  const encourage = randomEncouragement(outcome.dojoId)

  const goNext = () => {
    if (outcome.success && outcome.rankedUp !== null && outcome.shihanReady) { setScreen('dojoDetail'); return }
    if (outcome.success && outcome.rankedUp !== null) { setScreen('shihanCutscene'); return }
    setScreen('dojoDetail')
  }
  // 승급(사범 제외)했으면 컷신으로
  const showCutscene = outcome.success && outcome.rankedUp !== null && !outcome.shihanReady

  return (
    <div className="screen" style={{ background: `radial-gradient(ellipse at center, ${dojo.color}22 0%, #0f0f1e 70%)` }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
        <MentorAvatar mentorId={dojo.mentor.id} size={160} expression={outcome.success ? 'praise' : 'normal'} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ textAlign: 'center', maxWidth: 340, padding: '0 24px', marginTop: 12 }}>
        <h2 style={{ fontSize: 28, fontFamily: 'var(--font-script)', color: outcome.success ? 'var(--color-accent)' : 'var(--color-text)' }}>
          {outcome.success ? '성공! 🎉' : '아쉬워요!'}
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, background: 'rgba(255,255,255,0.08)', padding: '14px 18px', borderRadius: 'var(--radius-md)', margin: '12px 0 18px' }}>
          {outcome.success
            ? `"${dojo.mentor.catchphrase}" 정말 잘했어요!`
            : `"${encourage}"`}
        </p>

        {outcome.success && outcome.rankedUp !== null && !outcome.shihanReady && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}
            style={{ background: 'linear-gradient(135deg,#ffd84d,#f59e0b)', color: '#1f2937', borderRadius: 14, padding: 12, marginBottom: 16, fontWeight: 700, fontSize: 18 }}>
            🏅 {rankName(outcome.rankedUp)} 달성! 승급했어요!
          </motion.div>
        )}
        {outcome.success && outcome.shihanReady && (
          <div style={{ background: 'rgba(124,92,255,0.25)', borderRadius: 14, padding: 12, marginBottom: 16, fontSize: 16, color: 'var(--color-accent)' }}>
            🔥 1급까지 모두 달성! 이제 솔로몬 평가단에 도전할 수 있어요.
          </div>
        )}

        <motion.button whileTap={{ scale: 0.95 }} onClick={showCutscene ? () => setScreen('shihanCutscene') : goNext}
          style={{ padding: '14px 32px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white' }}>
          {outcome.success ? '계속 →' : '도장으로 →'}
        </motion.button>
      </motion.div>
    </div>
  )
}
