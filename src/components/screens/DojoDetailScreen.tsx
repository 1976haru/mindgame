import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DOJO_BY_ID, RANK_SEQUENCE, rankName, DojoRank } from '../../data/dojos'
import { getMissionsByRank } from '../../data/missions'
import { MentorAvatar } from '../mentors/MentorComponents'
import { speak } from '../../utils/speak'

export function DojoDetailScreen() {
  const activeDojoId = useAppStore(s => s.activeDojoId)
  const dojoProgress = useAppStore(s => s.game.dojoProgress)
  const setScreen = useAppStore(s => s.setScreen)
  const setActiveMission = useAppStore(s => s.setActiveMission)

  // 도장 입장 시 멘토 인사 음성
  useEffect(() => {
    if (activeDojoId) void speak(`${DOJO_BY_ID[activeDojoId].mentor.id}_greeting`)
  }, [activeDojoId])

  if (!activeDojoId) { setScreen('dojoHall'); return null }
  const dojo = DOJO_BY_ID[activeDojoId]
  const p = dojoProgress[activeDojoId]

  const currentMissions = getMissionsByRank(activeDojoId, p.currentRank)
  const shihanReady = p.currentRank === 0 && !p.isShihan

  const rankState = (r: DojoRank): 'done' | 'current' | 'locked' => {
    if (p.achievedRanks.includes(r) || (r === 0 && p.isShihan)) return 'done'
    if (r === p.currentRank) return 'current'
    return 'locked'
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: `linear-gradient(180deg, ${dojo.color}1f 0%, #0f0f1e 60%)` }}>
      <div style={{ width: '100%', padding: '16px 18px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('dojoHall')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: dojo.color }}>{dojo.icon} {dojo.name}</h2>
      </div>

      {/* 멘토 + 인사 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 20px 8px', width: '100%' }}>
        <MentorAvatar mentorId={dojo.mentor.id} size={90} expression="cheer" />
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: '12px 14px' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: dojo.color }}>{dojo.mentor.name}</div>
          <div style={{ fontSize: 16, color: 'var(--color-text)', lineHeight: 1.5 }}>"{dojo.mentor.catchphrase}"</div>
          <div style={{ fontSize: 16, color: 'var(--color-text-soft)', marginTop: 2 }}>현재 {p.isShihan ? '사범 ⭐' : rankName(p.currentRank)}</div>
        </div>
      </div>

      {/* 급수 트리 (가로 스크롤) */}
      <div style={{ width: '100%', overflowX: 'auto', padding: '8px 16px' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {RANK_SEQUENCE.map(r => {
            const st = rankState(r)
            return (
              <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <motion.div
                  animate={st === 'current' ? { scale: [1, 1.12, 1] } : {}} transition={{ duration: 1.4, repeat: Infinity }}
                  style={{
                    minWidth: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 15, fontWeight: 700, flexShrink: 0,
                    background: st === 'done' ? 'linear-gradient(135deg,#ffd84d,#f59e0b)' : st === 'current' ? dojo.color : 'rgba(255,255,255,0.08)',
                    color: st === 'locked' ? 'var(--color-text-soft)' : '#1f2937',
                    border: st === 'current' ? '2px solid white' : 'none'
                  }}>
                  {r === 0 ? '師' : r}
                </motion.div>
                {r !== 0 && <div style={{ width: 12, height: 3, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />}
              </div>
            )
          })}
        </div>
      </div>

      {/* 현재 급수 미션 */}
      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 24px' }}>
        <h3 style={{ fontSize: 18, color: 'var(--color-text)', margin: '6px 4px 10px' }}>
          {p.isShihan ? '🎉 사범 달성!' : shihanReady ? '🔥 사범 도전 가능!' : `${rankName(p.currentRank)} 미션`}
        </h3>

        {p.isShihan ? (
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)', textAlign: 'center', padding: 20 }}>
            이 도장의 모든 과정을 마쳤어요! 멋진 사범이에요 ⭐
          </p>
        ) : shihanReady ? (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => { useAppStore.getState().setActiveDojo(activeDojoId); setScreen('solomonExam') }}
            style={{ width: '100%', padding: 18, borderRadius: 16, background: 'linear-gradient(135deg,#7c5cff,#ffd84d)', color: '#1f2937', fontWeight: 700, fontSize: 18 }}>
            ⚖️ 솔로몬 평가단에 도전하기
          </motion.button>
        ) : currentMissions.length === 0 ? (
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)', textAlign: 'center', padding: 20 }}>
            이 급수의 미션은 곧 준비될 거예요! 🛠️
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentMissions.map(m => {
              const done = p.completedMissions.includes(m.id)
              return (
                <motion.button key={m.id} whileTap={{ scale: 0.97 }}
                  onClick={() => { setActiveMission(m.id); setScreen('mission') }}
                  style={{ textAlign: 'left', padding: 16, borderRadius: 16, background: done ? 'rgba(110,231,183,0.16)' : 'rgba(255,255,255,0.05)', border: `2px solid ${done ? 'rgba(110,231,183,0.5)' : 'rgba(255,255,255,0.1)'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 700 }}>{done ? '✅ ' : ''}{m.title}</div>
                      <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{m.description}</div>
                    </div>
                    <div style={{ fontSize: 24, marginLeft: 8 }}>{done ? '🏅' : '▶️'}</div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
