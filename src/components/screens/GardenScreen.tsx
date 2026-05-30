import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_COMPONENTS } from '../plants'
import { PlantWithGrowth } from '../plants/PlantWithGrowth'
import { PlantCareSheet } from '../garden/PlantCareSheet'
import { GardenDecorLayer } from '../garden/GardenDecorLayer'
import { GardenEcology } from '../garden/GardenEcology'
import { GardenLevelUpCutscene } from '../garden/GardenLevelUpCutscene'
import { GardenTutorial } from '../garden/GardenTutorial'
import { GardenMathModal } from '../garden/GardenMathModal'
import { PaintedFlower } from '../plants/PaintedFlower'
import { BottomNav } from '../common/BottomNav'
import { GardenAmbience } from '../common/GardenAmbience'
import { isNightTime, isBirthdayToday } from '../../utils/timeUtils'
import { pendingTreasureMilestone } from '../../utils/gameLogic'
import { todayString } from '../../utils/helpers'
import { DOJOS } from '../../data/dojos'
import { THEME_BY_ID, DECO_BY_ID } from '../../data/decorations'
import { levelProgress, gardenLevelInfo } from '../../data/gardenLevels'
import { calculateHealth, HEALTH_STATES } from '../../data/growth'
import { problemForContext, MathProblem } from '../../data/mathGarden'
import { t } from '../../i18n'

export function GardenScreen() {
  const profile = useAppStore(s => s.profile)
  const entries = useAppStore(s => s.entries)
  const game = useAppStore(s => s.game)
  const setScreen = useAppStore(s => s.setScreen)
  const placeDecoration = useAppStore(s => s.placeDecoration)
  const pendingLevelUp = useAppStore(s => s.pendingGardenLevelUp)
  const grade = useAppStore(s => s.game.studentGrade)
  const [careEntryId, setCareEntryId] = useState<string | null>(null)
  const [decorMode, setDecorMode] = useState(false)
  const [gardenMath, setGardenMath] = useState<MathProblem | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  // 돌봐줘야 할 식물(목마름/시듦) 추천
  const needCare = entries.filter(e => HEALTH_STATES[calculateHealth(e)].needsCare).length

  const theme = THEME_BY_ID[game.gardenTheme] ?? THEME_BY_ID.default
  const prog = levelProgress(game.gardenXp)
  const levelInfo = gardenLevelInfo(prog.level)
  // 인벤토리(미배치 장식) 집계
  const inventory = Object.entries(
    game.ownedDecorations.reduce<Record<string, number>>((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc }, {})
  )

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
      <div ref={areaRef} style={{ position: 'relative', width: '100%', flex: 1, background: night ? undefined : theme.background }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 60, background: 'linear-gradient(180deg, transparent 0%, rgba(94, 235, 183, 0.25) 100%)' }} />

        {/* 정원 레벨 배지 */}
        <button onClick={() => setScreen('gardenShop')}
          style={{ position: 'absolute', left: 12, top: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.3)', borderRadius: 999, padding: '5px 12px', zIndex: 3 }}>
          <span style={{ fontSize: 16 }}>{levelInfo.emoji}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-text)' }}>Lv.{prog.level}</span>
        </button>

        {/* 정원 일기 버튼 */}
        <button onClick={() => setScreen('gardenDiary')}
          style={{ position: 'absolute', left: 12, top: 48, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,0,0,0.3)', borderRadius: 999, padding: '5px 12px', zIndex: 3 }}>
          <span style={{ fontSize: 15 }}>📖</span>
          <span style={{ fontSize: 13, color: 'var(--color-text)' }}>일기</span>
        </button>

        {/* 날씨 + 생물 */}
        {!decorMode && <GardenEcology />}

        {/* 배치된 장식 */}
        <GardenDecorLayer decorMode={decorMode} areaRef={areaRef} />

        {entries.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ position: 'absolute', top: '38%', left: 0, right: 0, textAlign: 'center', padding: '0 32px' }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🌱</div>
            <p style={{ color: 'var(--color-text-soft)', lineHeight: 1.6 }}>
              {t('garden.empty', game.lang)}<br />{t('garden.emptyAsk', game.lang)}
            </p>
          </motion.div>
        ) : (
          entries.map((entry, idx) => {
            if (!PLANT_COMPONENTS[entry.plantId]) return null
            return (
              <motion.button key={entry.id}
                onClick={() => { if (!decorMode) setCareEntryId(entry.id) }}
                whileTap={{ scale: decorMode ? 1 : 0.9 }}
                initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.03, 0.6), type: 'spring' }}
                style={{ position: 'absolute', left: `${entry.position.x * 100}%`, top: `${entry.position.y * 100}%`, transform: 'translate(-50%, -50%)', background: 'none', padding: 0, cursor: 'pointer' }}>
                <PlantWithGrowth entry={entry} size={70} />
              </motion.button>
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

      {/* 홈 대시보드: 돌볼 식물 추천 + 오늘의 정원 수학 */}
      {entries.length > 0 && (
        <div style={{ padding: '8px 16px 0', width: '100%', display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '10px 12px', fontSize: 15 }}>
            {needCare > 0 ? <span>🌿 <b style={{ color: 'var(--color-accent)' }}>{needCare}그루</b>가 돌봄을 기다려요</span>
              : <span>✨ 모든 식물이 행복해요!</span>}
          </div>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setGardenMath(problemForContext('flower', grade))}
            style={{ flexShrink: 0, background: 'rgba(124,92,255,0.16)', borderRadius: 12, padding: '10px 14px', fontSize: 15, fontWeight: 700, color: 'var(--color-accent)' }}>
            🧮 정원 수학
          </motion.button>
        </div>
      )}

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

      {/* 꾸미기 모드 인벤토리 트레이 */}
      <AnimatePresence>
        {decorMode && (
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }}
            style={{ width: '100%', padding: '8px 16px' }}>
            <div style={{ background: 'rgba(124,92,255,0.12)', borderRadius: 14, padding: 10 }}>
              <p style={{ fontSize: 14, color: 'var(--color-text-soft)', marginBottom: 8 }}>
                ✏️ 꾸미기 — 장식을 탭해 놓고, 끌어서 옮기고, ✕로 치워요
              </p>
              {inventory.length === 0 ? (
                <button onClick={() => setScreen('gardenShop')} style={{ fontSize: 15, color: 'var(--color-accent)' }}>
                  🛒 상점에서 장식을 먼저 사오세요 →
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                  {inventory.map(([id, n]) => (
                    <motion.button key={id} whileTap={{ scale: 0.9 }} onClick={() => placeDecoration(id, 0.5, 0.55)}
                      style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 26 }}>{DECO_BY_ID[id]?.emoji}</span>
                      <span style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{n}</span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 하단 액션 */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}
        style={{ padding: '10px 16px 8px', width: '100%', display: 'flex', gap: 8 }}>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('minigames')}
          style={{ padding: '14px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)' }}>
          🎮
        </motion.button>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('gardenShop')}
          style={{ padding: '14px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)' }}>
          🛒
        </motion.button>
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => setDecorMode(v => !v)}
          style={{ padding: '14px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: decorMode ? 'linear-gradient(135deg,#7c5cff,#5eebb7)' : 'rgba(255,255,255,0.08)', color: decorMode ? 'white' : 'var(--color-text)' }}>
          ✏️
        </motion.button>
        {canFuse && !decorMode && (
          <motion.button whileTap={{ scale: 0.96 }} onClick={() => setScreen('fusion')}
            style={{ padding: '14px', fontSize: 18, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#a855f7,#ec4899)', color: 'white' }}>
            ✨
          </motion.button>
        )}
        <motion.button whileTap={{ scale: 0.96 }} onClick={() => (decorMode ? setDecorMode(false) : setScreen('emotionSelect'))}
          style={{ flex: 1, padding: '16px', fontSize: 20, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg, #7c5cff 0%, #ff9ec7 100%)', color: 'white', boxShadow: 'var(--shadow-soft)' }}>
          {decorMode ? '✓' : t('action.todaysHeart', game.lang)}
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {careEntryId && <PlantCareSheet entryId={careEntryId} onClose={() => setCareEntryId(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {gardenMath && <GardenMathModal problem={gardenMath} onClose={() => setGardenMath(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {pendingLevelUp != null && <GardenLevelUpCutscene />}
      </AnimatePresence>
      <AnimatePresence>
        <GardenTutorial />
      </AnimatePresence>

      <BottomNav />
    </div>
  )
}
