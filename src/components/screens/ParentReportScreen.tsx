import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { EMOTIONS, EmotionType, EMOTION_LIST } from '../../data/emotions'
import { EPISODE_BY_ID } from '../../data/episodes'
import { getHeroById } from '../../data/heroes'

export function ParentReportScreen() {
  const game = useAppStore(s => s.game)
  const entries = useAppStore(s => s.entries)
  const profile = useAppStore(s => s.profile)
  const setScreen = useAppStore(s => s.setScreen)
  const setParentPin = useAppStore(s => s.setParentPin)
  const [pinInput, setPinInput] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')

  // PIN 미등록 → 등록 유도
  const needsSetup = !game.parentPin

  const tryAuth = () => {
    if (pinInput === game.parentPin) { setAuthed(true); setError('') }
    else setError('PIN이 일치하지 않아요')
  }

  if (needsSetup) {
    return (
      <div className="screen">
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 8 }}>부모 PIN 등록</h2>
        <p style={{ color: 'var(--color-text-soft)', textAlign: 'center', marginBottom: 20 }}>리포트를 보호하려면 먼저<br />4자리 PIN을 만들어주세요</p>
        <input value={pinInput} onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))} maxLength={4} inputMode="numeric" placeholder="숫자 4자리"
          style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none', letterSpacing: 6, textAlign: 'center', fontSize: 20, marginBottom: 16 }} />
        <button onClick={() => { if (pinInput.length === 4) { setParentPin(pinInput); setAuthed(true) } }} style={{ padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>등록하기</button>
        <button onClick={() => setScreen('settings')} style={{ marginTop: 14, color: 'var(--color-text-soft)', fontSize: 14 }}>← 돌아가기</button>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="screen">
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', marginBottom: 16 }}>부모 확인</h2>
        <input value={pinInput} onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))} onKeyDown={e => e.key === 'Enter' && tryAuth()} maxLength={4} inputMode="numeric" placeholder="PIN 4자리"
          style={{ padding: '12px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none', letterSpacing: 6, textAlign: 'center', fontSize: 20, marginBottom: 12 }} />
        {error && <p style={{ color: '#f87171', fontSize: 13, marginBottom: 8 }}>{error}</p>}
        <button onClick={tryAuth} style={{ padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>확인</button>
        <button onClick={() => setScreen('settings')} style={{ marginTop: 14, color: 'var(--color-text-soft)', fontSize: 14 }}>← 돌아가기</button>
      </div>
    )
  }

  // === 리포트 ===
  const weekAgo = Date.now() - 7 * 86400000
  const weekEntries = entries.filter(e => e.timestamp >= weekAgo)
  const counts: Record<EmotionType, number> = { joy: 0, sad: 0, angry: 0, fear: 0, excited: 0, proud: 0, bored: 0, calm: 0 }
  weekEntries.forEach(e => { counts[e.emotion]++ })
  const total = weekEntries.length || 1
  const top3 = [...EMOTION_LIST].sort((a, b) => counts[b.type] - counts[a.type]).slice(0, 3).filter(e => counts[e.type] > 0)

  // 자동 인사이트
  const domains = ['기초질서', '약속과 책임', '공정과 차별', '권리와 의무', '안전과 보호']
  const clearedByDomain = domains.map(d => ({ d, n: game.clearedEpisodes.filter(id => EPISODE_BY_ID[id]?.domain === d).length }))
  const topDomain = clearedByDomain.sort((a, b) => b.n - a.n)[0]
  const insight = topDomain && topDomain.n > 0
    ? `${profile?.name}님은 이번 주 '${topDomain.d}' 영역에서 큰 성장을 보였어요.`
    : `${profile?.name}님이 마음 정원을 가꾸기 시작했어요. 꾸준함이 자라고 있어요.`

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('settings')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>📊 주간 리포트</h2>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 24px' }}>
        <div style={card}><b>{profile?.name}</b>님의 한 주 · 마음 기록 {weekEntries.length}개 · 🔥 {game.streak}일 연속</div>

        {/* 감정 분포 */}
        <div style={card}>
          <div style={cardTitle}>이번 주 감정 분포</div>
          {EMOTION_LIST.filter(e => counts[e.type] > 0).map(e => (
            <div key={e.type} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 64, fontSize: 13 }}>{e.emoji} {e.label}</span>
              <div style={{ flex: 1, height: 14, borderRadius: 8, background: 'rgba(255,255,255,0.08)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${(counts[e.type] / total) * 100}%` }} style={{ height: '100%', borderRadius: 8, background: e.color }} />
              </div>
              <span style={{ width: 24, fontSize: 12, color: 'var(--color-text-soft)', textAlign: 'right' }}>{counts[e.type]}</span>
            </div>
          ))}
          {weekEntries.length === 0 && <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>이번 주 기록이 아직 없어요.</p>}
        </div>

        {/* TOP 3 */}
        {top3.length > 0 && (
          <div style={card}>
            <div style={cardTitle}>가장 많이 느낀 마음 TOP 3</div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'space-around' }}>
              {top3.map((e, i) => (
                <div key={e.type} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32 }}>{e.emoji}</div>
                  <div style={{ fontSize: 13, color: e.color, fontWeight: 700 }}>{i + 1}. {e.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 법교육 진행 */}
        <div style={card}>
          <div style={cardTitle}>법교육 진행 ({game.clearedEpisodes.length}/15)</div>
          {game.clearedEpisodes.length === 0 ? <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>아직 해결한 사건이 없어요.</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {game.clearedEpisodes.map(id => EPISODE_BY_ID[id]).filter(Boolean).map(ep => (
                <div key={ep.id} style={{ fontSize: 13 }}>✅ {ep.title} <span style={{ color: 'var(--color-text-soft)' }}>· {ep.lawPrinciple}</span></div>
              ))}
            </div>
          )}
        </div>

        {/* 획득 영웅 */}
        <div style={card}>
          <div style={cardTitle}>획득한 영웅 카드 ({game.unlockedHeroes.length}/15)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {game.unlockedHeroes.map(id => getHeroById(id)).filter(Boolean).map(h => (
              <span key={h!.id} style={{ fontSize: 12, background: 'rgba(251,191,36,0.15)', borderRadius: 999, padding: '4px 10px' }}>🏅 {h!.name}</span>
            ))}
            {game.unlockedHeroes.length === 0 && <p style={{ fontSize: 13, color: 'var(--color-text-soft)' }}>아직 없어요.</p>}
          </div>
        </div>

        {/* 인사이트 */}
        <div style={{ ...card, background: 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(255,158,199,0.15))' }}>
          <div style={cardTitle}>💡 이번 주 인사이트</div>
          <p style={{ fontSize: 14, lineHeight: 1.6 }}>{insight}</p>
          <p style={{ fontSize: 12, color: 'var(--color-text-soft)', marginTop: 8 }}>
            아이와 함께 가장 많이 느낀 감정에 대해 이야기를 나눠보세요. "오늘 어떤 마음이 가장 컸어?"
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--color-text-soft)', marginTop: 12, opacity: 0.6 }}>
          모든 기록은 기기 안에만 저장돼요. 외부로 전송되지 않습니다.
        </p>
      </div>
    </div>
  )
}

const card: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, marginBottom: 12 }
const cardTitle: React.CSSProperties = { fontSize: 14, fontWeight: 700, color: 'var(--color-text)', marginBottom: 10 }
