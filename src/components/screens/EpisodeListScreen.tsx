import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { EPISODES, isEpisodeUnlocked, Difficulty } from '../../data/episodes'
import { DOMAIN_ICONS } from '../../data/heroes'

const DIFF_BADGE: Record<Difficulty, { label: string; color: string }> = {
  easy: { label: '🟢 쉬움', color: '#34d399' },
  medium: { label: '🟡 보통', color: '#fbbf24' },
  hard: { label: '🔴 깊음', color: '#f87171' }
}

export function EpisodeListScreen() {
  const activeDomain = useAppStore(s => s.activeDomain)
  const cleared = useAppStore(s => s.game.clearedEpisodes)
  const setActiveEpisode = useAppStore(s => s.setActiveEpisode)
  const setScreen = useAppStore(s => s.setScreen)

  const eps = EPISODES.filter(e => !activeDomain || e.domain === activeDomain)

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '18px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setScreen('kingdom')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>
          {activeDomain ? `${DOMAIN_ICONS[activeDomain as keyof typeof DOMAIN_ICONS] || ''} ${activeDomain}` : '솔로몬 재판소'}
        </h2>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {eps.map((ep, i) => {
          const isCleared = cleared.includes(ep.id)
          const unlocked = isEpisodeUnlocked(ep.id, cleared)
          const diff = DIFF_BADGE[ep.difficulty]
          return (
            <motion.button
              key={ep.id}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileTap={unlocked ? { scale: 0.97 } : {}}
              disabled={!unlocked}
              onClick={() => { if (unlocked) { setActiveEpisode(ep.id, ep.domain); setScreen('courtroom') } }}
              style={{
                textAlign: 'left', padding: 16, borderRadius: 16, position: 'relative',
                background: isCleared ? 'linear-gradient(135deg, rgba(110,231,183,0.18), rgba(255,255,255,0.04))' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${isCleared ? 'rgba(110,231,183,0.5)' : 'rgba(255,255,255,0.1)'}`,
                opacity: unlocked ? 1 : 0.5, filter: unlocked ? 'none' : 'grayscale(0.6)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, color: diff.color, marginBottom: 2 }}>{diff.label}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)' }}>
                    {!unlocked && '🔒 '}{ep.title}
                  </div>
                  <div style={{ fontSize: 16, color: 'var(--color-text-soft)', marginTop: 2 }}>{ep.question}</div>
                </div>
                <div style={{ fontSize: 26, marginLeft: 8 }}>{isCleared ? '🏆' : unlocked ? '⚖️' : '🔒'}</div>
              </div>
              {isCleared && <div style={{ marginTop: 6, fontSize: 16, color: 'var(--color-accent)' }}>⭐⭐⭐ 해결 완료!</div>}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
