import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_COMPONENTS } from '../plants'
import { PaintedFlower } from '../plants/PaintedFlower'
import { BottomNav } from '../common/BottomNav'
import { GardenAmbience } from '../common/GardenAmbience'
import { isNightTime, isBirthdayToday } from '../../utils/timeUtils'
import { pendingTreasureMilestone } from '../../utils/gameLogic'
import { todayString } from '../../utils/helpers'
import { DOJOS } from '../../data/dojos'

export function GardenScreen() {
  const profile = useAppStore(s => s.profile)
  const entries = useAppStore(s => s.entries)
  const game = useAppStore(s => s.game)
  const setScreen = useAppStore(s => s.setScreen)

  const dailyDone = game.dailyClaimedDate === todayString()
  // 솔로몬의 후계자 진행률 (도장 사범 7 + 법교육 15 = 22)
  const shihan = DOJOS.filter(d => game.dojoProgress[d.id].isShihan).length
  const heirPct = Math.round(((shihan + game.clearedEpisodes.length) / 22) * 100)

  const night = isNightTime()
  const birthday = isBirthdayToday(game.birthday)
  const treasure = pendingTreasureMilestone(game)
  // 3개 이상 모인 식물이 있으면 합성 가능
  const counts: Record<string, number> = {}
  entries.forEach(e => { counts[e.plantId] = (counts[e.plantId] || 0) + 1 })
  const canFuse = Object.values(counts).some(n => n >= 3)

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: night ? 'linear-gradient(180deg,#0a0a20 0%,#13132e 100%)' : undefined }}>
      <GardenAmbience birthday={birthday} />
      {/* 헤더 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        style={{ width: '100%', padding: '18px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <div>
          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>
            {profile?.name}의 정원
          </h2>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>
            🌱 {entries.length}개의 마음 · 🔥 {game.streak}일 연속
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(124,92,255,0.2)', padding: '8px 14px', borderRadius: 999 }}>
          <span style={{ fontSize: 16 }}>💜</span>
          <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{game.empathyEnergy}</span>
        </div>
      </motion.div>

      {/* 정원 영역 */}
      <div style={{ position: 'relative', width: '100%', flex: 1, background: 'linear-gradient(180deg, transparent 0%, rgba(94, 235, 183, 0.05) 60%, rgba(94, 235, 183, 0.15) 100%)' }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(180deg, transparent 0%, rgba(94, 235, 183, 0.25) 100%)' }} />

        {entries.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center', padding: '0 32px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🌱</div>
            <p style={{ color: 'var(--color-text-soft)', lineHeight: 1.6 }}>
              아직 정원이 비어있어요.<br />오늘의 마음을 들려줄래요?
            </p>
          </motion.div>
        ) : (
          entries.map((entry, idx) => {
            const PlantComp = PLANT_COMPONENTS[entry.plantId]
            if (!PlantComp) return null
            return (
              <motion.div key={entry.id}
                initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.6), type: 'spring' }}
                style={{ position: 'absolute', left: `${entry.position.x * 100}%`, top: `${entry.position.y * 100}%`, transform: 'translate(-50%, -50%)' }}>
                <PlantComp size={70} growProgress={1} />
              </motion.div>
            )
          })
        )}

        {/* 보물상자 (출석 보상 대기 중) */}
        {treasure !== null && (
          <motion.button
            onClick={() => setScreen('treasureChest')}
            animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }} transition={{ duration: 1.6, repeat: Infinity }}
            style={{ position: 'absolute', right: 16, top: 16, fontSize: 44, filter: 'drop-shadow(0 0 10px rgba(251,191,36,0.8))' }}>
            🎁
          </motion.button>
        )}

        {/* 색칠로 만든 식물 */}
        {game.paintedPlants.map((p, idx) => (
          <motion.div key={p.id}
            initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.6), type: 'spring' }}
            style={{ position: 'absolute', left: `${p.x * 100}%`, top: `${p.y * 100}%`, transform: 'translate(-50%, -50%)' }}>
            <PaintedFlower colors={p.colors} size={64} />
          </motion.div>
        ))}
      </div>

      {/* 오늘의 도전 배너 + 후계자 진행률 */}
      <div style={{ padding: '8px 20px 0', width: '100%' }}>
        {!dailyDone && (
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setScreen('dailyChallenge')}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 12, background: 'linear-gradient(135deg,#7c5cff,#ec4899)', color: 'white', fontWeight: 700, fontSize: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🎯 오늘의 도전</span><span style={{ fontSize: 16 }}>🔥 {game.dailyStreak}일</span>
          </motion.button>
        )}
        {heirPct > 0 && (
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, color: 'var(--color-text-soft)', marginBottom: 2 }}>
              <span>👑 솔로몬의 후계자까지</span><span>{heirPct}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ width: `${heirPct}%`, height: '100%', borderRadius: 6, background: 'linear-gradient(90deg,#fbbf24,#ff9ec7,#7c5cff)' }} />
            </div>
          </div>
        )}
      </div>

      {/* 하단 액션 */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ padding: '10px 20px 8px', width: '100%', display: 'flex', gap: 10 }}>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('minigames')}
          style={{ padding: '16px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)' }}>
          🎮
        </motion.button>
        {canFuse && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('fusion')}
            style={{ padding: '16px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#a855f7,#ec4899)', color: 'white' }}>
            ✨
          </motion.button>
        )}
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('emotionSelect')}
          style={{ flex: 1, padding: '16px', fontSize: 20, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #7c5cff 0%, #ff9ec7 100%)', color: 'white', boxShadow: 'var(--shadow-soft)' }}>
          오늘의 마음 ✨
        </motion.button>
      </motion.div>

      <BottomNav />
    </div>
  )
}
