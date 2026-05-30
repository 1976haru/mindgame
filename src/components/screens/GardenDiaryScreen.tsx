// 📖 정원 일기 (Phase 5 · 원예치료)
// 식물별 성장 기록 + 심은 날의 감정과 지금 모습 비교 + 마음의 변화 시각화.
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_BY_ID } from '../../data/plants'
import { EMOTIONS, EmotionType } from '../../data/emotions'
import { entryStage, STAGE_BY_ID } from '../../data/growth'
import { PlantWithGrowth } from '../plants/PlantWithGrowth'

const POSITIVE: EmotionType[] = ['joy', 'proud', 'excited', 'calm']

function fmtDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

export function GardenDiaryScreen() {
  const entries = useAppStore(s => s.entries)
  const setScreen = useAppStore(s => s.setScreen)

  const sorted = [...entries].sort((a, b) => b.timestamp - a.timestamp)

  // 마음의 변화: 최근 14일 vs 그 이전 긍정 감정 비율
  const now = Date.now()
  const cut = now - 14 * 86400000
  const recent = entries.filter(e => e.timestamp >= cut)
  const older = entries.filter(e => e.timestamp < cut)
  const posRatio = (list: typeof entries) =>
    list.length === 0 ? null : Math.round((list.filter(e => POSITIVE.includes(e.emotion)).length / list.length) * 100)
  const recentPos = posRatio(recent)
  const olderPos = posRatio(older)

  let changeMsg = '정원을 가꾸며 마음도 함께 자라고 있어요. 🌱'
  if (recentPos != null && olderPos != null) {
    if (recentPos > olderPos) changeMsg = `예전보다 밝은 마음이 더 많아졌어요! (${olderPos}% → ${recentPos}%) 🌈`
    else if (recentPos < olderPos) changeMsg = '요즘 마음이 조금 무거운가 봐요. 천천히 함께 돌봐요. 💙'
    else changeMsg = '한결같이 마음을 잘 가꾸고 있어요. 🌿'
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('garden')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>📖 정원 일기</h2>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '4px 16px 24px' }}>
        {/* 마음의 변화 */}
        <div style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(94,235,183,0.15))', borderRadius: 16, padding: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>💗 마음의 변화</div>
          <p style={{ fontSize: 16, lineHeight: 1.5 }}>{changeMsg}</p>
          {recentPos != null && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-soft)', marginBottom: 3 }}>최근 2주 밝은 마음 {recentPos}%</div>
              <div style={{ height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.12)' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${recentPos}%` }} style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg,#fbbf24,#5eebb7)' }} />
              </div>
            </div>
          )}
        </div>

        {sorted.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--color-text-soft)', marginTop: 40 }}>
            아직 일기가 비어있어요.<br />오늘의 마음을 심어볼까요?
          </p>
        )}

        {/* 식물별 성장 기록 */}
        {sorted.map(entry => {
          const species = PLANT_BY_ID[entry.plantId]
          const emo = EMOTIONS[entry.emotion]
          const stage = entryStage(entry)
          const log = entry.growthLog ?? []
          return (
            <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', gap: 12, background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 12, marginBottom: 10 }}>
              <div style={{ flexShrink: 0 }}><PlantWithGrowth entry={entry} size={56} /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 16 }}>{emo.emoji}</span>
                  <b style={{ fontSize: 16, color: 'var(--color-accent)' }}>
                    {entry.nickname ? `${entry.nickname}` : species?.name ?? '식물'}
                  </b>
                  <span style={{ fontSize: 13, color: 'var(--color-text-soft)', marginLeft: 'auto' }}>{fmtDate(entry.timestamp)}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--color-text-soft)', marginTop: 2 }}>
                  {emo.label}한 날 심어, 지금은 <b style={{ color: 'var(--color-text)' }}>{STAGE_BY_ID[stage].name}</b>{entry.heightCm ? ` · ${entry.heightCm}cm` : ''}
                </p>
                {/* 성장 타임라인 */}
                {log.length > 1 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    {log.map((l, i) => (
                      <span key={i} style={{ fontSize: 12, color: 'var(--color-text-soft)', background: 'rgba(255,255,255,0.06)', borderRadius: 999, padding: '2px 8px' }}>
                        {STAGE_BY_ID[l.stage].name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
