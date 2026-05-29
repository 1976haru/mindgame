import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { HeroDomain, DOMAIN_ICONS } from '../../data/heroes'
import { BUILDINGS } from '../../data/buildings'
import { EPISODES } from '../../data/episodes'
import { BottomNav } from '../common/BottomNav'
import { isKingdomFullyRestored } from '../../utils/gameLogic'

const AREAS: { domain: HeroDomain; name: string; color: string }[] = [
  { domain: '기초질서', name: '마을 광장', color: '#fbbf24' },
  { domain: '약속과 책임', name: '약속의 신전', color: '#60a5fa' },
  { domain: '공정과 차별', name: '공정의 시장', color: '#34d399' },
  { domain: '권리와 의무', name: '시민의 광장', color: '#a78bfa' },
  { domain: '안전과 보호', name: '보호의 숲', color: '#f87171' }
]

export function KingdomScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const setActiveEpisode = useAppStore(s => s.setActiveEpisode)
  const buildBuilding = useAppStore(s => s.buildBuilding)
  const game = useAppStore(s => s.game)
  const fullyRestored = isKingdomFullyRestored(game)

  // 건설 가능(클리어했지만 아직 안 지음)
  const buildable = BUILDINGS.filter(b => game.clearedEpisodes.includes(b.unlockEpisode) && !game.builtBuildings.includes(b.id))

  const openDomain = (domain: HeroDomain) => {
    setActiveEpisode(null, domain)
    setScreen('episodeList')
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      {/* 헤더: 공감 에너지 */}
      <div style={{ width: '100%', padding: '18px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>솔로몬 왕국</h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>{game.clearedEpisodes.length} / 15 사건 해결</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(124,92,255,0.2)', padding: '8px 14px', borderRadius: 999 }}>
          <span style={{ fontSize: 18 }}>💜</span>
          <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{game.empathyEnergy}</span>
        </div>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 16px' }}>
        {fullyRestored && (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'linear-gradient(135deg,#7c5cff,#ffd84d)', borderRadius: 16, padding: 16, textAlign: 'center', marginBottom: 12 }}>
            <p style={{ fontWeight: 700, fontSize: 16 }}>👑 왕국에 공감의 빛이 모두 돌아왔어요!</p>
            <button onClick={() => setScreen('myLawbook')} style={{ marginTop: 8, padding: '8px 18px', borderRadius: 999, background: 'rgba(0,0,0,0.25)', color: 'white', fontSize: 14 }}>내 법전 보기 📖</button>
          </motion.div>
        )}

        {/* 5개 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {AREAS.map((area, i) => {
            const eps = EPISODES.filter(e => e.domain === area.domain)
            const clearedCount = eps.filter(e => game.clearedEpisodes.includes(e.id)).length
            const restored = eps.length > 0 && clearedCount === eps.length
            const light = eps.length ? clearedCount / eps.length : 0
            return (
              <motion.button
                key={area.domain}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => openDomain(area.domain)}
                style={{
                  position: 'relative', textAlign: 'left', padding: 16, borderRadius: 16, overflow: 'hidden',
                  background: `linear-gradient(135deg, ${area.color}${restored ? '55' : '22'}, rgba(255,255,255,0.04))`,
                  border: `2px solid ${area.color}${restored ? 'aa' : '44'}`,
                  filter: light === 0 ? 'grayscale(0.5)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text)' }}>{DOMAIN_ICONS[area.domain]} {area.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>{area.domain} · {clearedCount}/{eps.length} 해결</div>
                  </div>
                  <div style={{ fontSize: 28 }}>{restored ? '✨' : light > 0 ? '🌥️' : '🌑'}</div>
                </div>
                {/* 빛 게이지 */}
                <div style={{ marginTop: 10, height: 6, borderRadius: 6, background: 'rgba(255,255,255,0.1)' }}>
                  <div style={{ width: `${light * 100}%`, height: '100%', borderRadius: 6, background: area.color, transition: 'width 0.5s' }} />
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* 건설 가능한 건물 */}
        {buildable.length > 0 && (
          <>
            <h3 style={{ fontSize: 15, color: 'var(--color-text)', margin: '20px 4px 8px' }}>🔨 건설 가능</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {buildable.map(b => {
                const affordable = game.empathyEnergy >= b.cost
                return (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 12 }}>
                    <span style={{ fontSize: 26 }}>{b.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{b.description}</div>
                    </div>
                    <motion.button whileTap={affordable ? { scale: 0.92 } : {}} disabled={!affordable}
                      onClick={() => buildBuilding(b.id, b.cost)}
                      style={{ padding: '8px 12px', borderRadius: 10, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap',
                        background: affordable ? 'linear-gradient(135deg,#7c5cff,#a855f7)' : 'rgba(255,255,255,0.08)',
                        color: affordable ? 'white' : 'var(--color-text-soft)' }}>
                      💜 {b.cost}
                    </motion.button>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* 건설된 건물 */}
        <h3 style={{ fontSize: 15, color: 'var(--color-text)', margin: '20px 4px 8px' }}>🏗️ 건설한 건물 ({game.builtBuildings.length}/15)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {BUILDINGS.filter(b => game.builtBuildings.includes(b.id)).map(b => (
            <div key={b.id} style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '8px 12px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>{b.name}
            </div>
          ))}
          {game.builtBuildings.length === 0 && (
            <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>사건을 해결하면 건물을 지을 수 있어요.</p>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
