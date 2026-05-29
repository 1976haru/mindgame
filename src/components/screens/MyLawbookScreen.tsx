import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { EPISODES } from '../../data/episodes'
import { getHeroById } from '../../data/heroes'

export function MyLawbookScreen() {
  const game = useAppStore(s => s.game)
  const profile = useAppStore(s => s.profile)
  const setLawbookVow = useAppStore(s => s.setLawbookVow)
  const setScreen = useAppStore(s => s.setScreen)
  const [page, setPage] = useState(0)
  const [vowInput, setVowInput] = useState('')

  const learned = EPISODES.filter(e => game.clearedEpisodes.includes(e.id))
  const allCleared = game.clearedEpisodes.length >= 15

  if (learned.length === 0) {
    return (
      <div className="screen">
        <div style={{ fontSize: 60, marginBottom: 16 }}>📖</div>
        <p style={{ color: 'var(--color-text-soft)', textAlign: 'center', lineHeight: 1.6 }}>아직 배운 법 원리가 없어요.<br />솔로몬 재판소에서 사건을 해결해보세요!</p>
        <button onClick={() => setScreen('kingdom')} style={{ marginTop: 24, padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>🏰 왕국으로</button>
      </div>
    )
  }

  // 인증서 페이지
  const certPage = learned.length
  const isCert = page === certPage && allCleared

  const ep = learned[page]
  const hero = ep ? getHeroById(ep.rewardHeroId) : undefined
  const savedVow = ep ? game.lawbookVows[ep.id] : undefined

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'linear-gradient(180deg,#2a2440 0%,#0f0f1e 100%)' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('kingdom')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>📖 내 마음의 법전</h2>
      </div>

      <div style={{ flex: 1, width: '100%', padding: '8px 20px', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {!isCert && ep ? (
            <motion.div key={page} initial={{ opacity: 0, rotateY: 30 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: -30 }}
              style={{ flex: 1, background: 'rgba(255,250,240,0.96)', color: '#3a2e2e', borderRadius: 16, padding: 22, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>제 {page + 1} 장 · {ep.title}</div>
              <div style={{ fontSize: 20, fontWeight: 700, margin: '8px 0', color: '#7c3aed' }}>📜 {ep.lawPrinciple}</div>
              {hero && <div style={{ fontSize: 14, marginBottom: 8 }}>🏅 함께한 영웅: <b>{hero.name}</b> — "{hero.quote}"</div>}
              <p style={{ fontSize: 14, lineHeight: 1.5, color: '#4b5563', flex: 1 }}>{ep.explanation}</p>
              {/* 다짐 */}
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>✍️ 나의 다짐</div>
                {savedVow ? (
                  <div style={{ background: '#ede9fe', borderRadius: 10, padding: '10px 12px', fontSize: 14, fontStyle: 'italic' }}>"{savedVow}"</div>
                ) : (
                  <div style={{ display: 'flex', gap: 6 }}>
                    <input value={vowInput} onChange={e => setVowInput(e.target.value)} placeholder="이 법을 어떻게 지킬까요?" maxLength={40}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd', fontSize: 14 }} />
                    <button onClick={() => { if (vowInput.trim()) { setLawbookVow(ep.id, vowInput.trim()); setVowInput('') } }}
                      style={{ padding: '0 14px', borderRadius: 10, background: '#7c3aed', color: 'white', fontWeight: 700 }}>적기</button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="cert" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ flex: 1, background: 'linear-gradient(160deg,#fffbe6,#fef3c7)', color: '#3a2e2e', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', border: '4px double #f59e0b' }}>
              <div style={{ fontSize: 50 }}>👑</div>
              <h2 style={{ fontSize: 22, color: '#92400e', margin: '10px 0' }}>솔로몬의 후계자 인증서</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                <b>{profile?.name}</b>님은<br />15가지 법 원리를 모두 배우고<br />공감으로 왕국을 구한<br /><b style={{ color: '#7c3aed' }}>진정한 솔로몬의 후계자</b>입니다.
              </p>
              <div style={{ fontSize: 30, marginTop: 12 }}>⚖️ 🌟 💜</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 페이지 네비 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 4px' }}>
          <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0} style={{ padding: '10px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', opacity: page === 0 ? 0.3 : 1 }}>← 이전</button>
          <span style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>{page + 1} / {allCleared ? learned.length + 1 : learned.length}</span>
          <button onClick={() => setPage(Math.min((allCleared ? learned.length : learned.length - 1), page + 1))} disabled={page >= (allCleared ? learned.length : learned.length - 1)} style={{ padding: '10px 18px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', opacity: page >= (allCleared ? learned.length : learned.length - 1) ? 0.3 : 1 }}>다음 →</button>
        </div>
      </div>
    </div>
  )
}
