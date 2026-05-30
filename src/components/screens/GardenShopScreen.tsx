// 🛒 정원 상점 (Phase 4) — 장식 구매 + 테마 + 정원 레벨 현황
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DECORATIONS, CATEGORY_LABELS, DecoCategory, GARDEN_THEMES } from '../../data/decorations'
import { levelProgress, gardenLevelInfo, GARDEN_LEVELS } from '../../data/gardenLevels'
import { playSound } from '../../utils/sound'

const CATS: DecoCategory[] = ['structure', 'water', 'light', 'nature', 'fun']

export function GardenShopScreen() {
  const game = useAppStore(s => s.game)
  const setScreen = useAppStore(s => s.setScreen)
  const buyDecoration = useAppStore(s => s.buyDecoration)
  const buyTheme = useAppStore(s => s.buyTheme)
  const [tab, setTab] = useState<'deco' | 'theme'>('deco')
  const [flash, setFlash] = useState<string | null>(null)

  const prog = levelProgress(game.gardenXp)
  const curLevel = gardenLevelInfo(prog.level)
  const ownedCount = (id: string) => game.ownedDecorations.filter(d => d === id).length

  const tryBuy = (id: string, cost: number) => {
    if (buyDecoration(id)) { playSound('sparkle'); setFlash(id); setTimeout(() => setFlash(null), 600) }
    else setFlash('no')
    setTimeout(() => setFlash(null), 800)
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('garden')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🛒 정원 상점</h2>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(124,92,255,0.2)', padding: '6px 12px', borderRadius: 999 }}>
          💜 <b style={{ color: 'var(--color-accent)' }}>{game.empathyEnergy}</b>
        </div>
      </div>

      {/* 정원 레벨 카드 */}
      <div style={{ width: '100%', padding: '0 16px 10px' }}>
        <div style={{ background: 'linear-gradient(135deg, rgba(124,92,255,0.2), rgba(94,235,183,0.15))', borderRadius: 16, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 18, fontWeight: 700 }}>{curLevel.emoji} Lv.{prog.level} {curLevel.name}</span>
            <span style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>{prog.isMax ? 'MAX' : `다음까지 ${prog.toNext} XP`}</span>
          </div>
          <div style={{ height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.12)' }}>
            <motion.div animate={{ width: `${prog.ratio * 100}%` }} style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg,#fbbf24,#5eebb7,#7c5cff)' }} />
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 10px', width: '100%' }}>
        {(['deco', 'theme'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: '10px', borderRadius: 12, fontSize: 16, fontWeight: 700, background: tab === t ? 'var(--color-accent)' : 'rgba(255,255,255,0.08)', color: tab === t ? 'white' : 'var(--color-text-soft)' }}>
            {t === 'deco' ? '🎍 장식' : '🎨 테마'}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '0 16px 24px' }}>
        {tab === 'deco' ? (
          CATS.map(cat => {
            const items = DECORATIONS.filter(d => d.category === cat)
            return (
              <div key={cat} style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 15, color: 'var(--color-text-soft)', marginBottom: 8 }}>{CATEGORY_LABELS[cat]}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {items.map(d => {
                    const locked = prog.level < d.unlockLevel
                    const owned = ownedCount(d.id)
                    return (
                      <motion.button key={d.id} whileTap={{ scale: locked ? 1 : 0.93 }}
                        animate={flash === d.id ? { scale: [1, 1.1, 1] } : {}}
                        onClick={() => !locked && tryBuy(d.id, d.cost)} disabled={locked}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 4px', borderRadius: 14, background: locked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)', opacity: locked ? 0.5 : 1 }}>
                        <span style={{ fontSize: 30 }}>{locked ? '🔒' : d.emoji}</span>
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{d.name}</span>
                        <span style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>
                          {locked ? `Lv.${d.unlockLevel}` : `💜${d.cost}${owned > 0 ? ` · 보유${owned}` : ''}`}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {GARDEN_THEMES.map(t => {
              const ownedTheme = t.cost === 0 || game.ownedTools.includes(`theme:${t.id}`)
              const active = game.gardenTheme === t.id
              return (
                <motion.button key={t.id} whileTap={{ scale: 0.95 }} onClick={() => { if (buyTheme(t.id)) playSound('sparkle') }}
                  style={{ padding: 14, borderRadius: 16, background: t.background, border: active ? '2px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                  <div style={{ fontSize: 32 }}>{t.emoji}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: 'var(--color-text-soft)', marginTop: 2 }}>
                    {active ? '✓ 사용 중' : ownedTheme ? '적용하기' : `💜${t.cost}`}
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}

        {flash === 'no' && <p style={{ textAlign: 'center', color: '#f87171', fontSize: 15, marginTop: 8 }}>공감 에너지가 부족해요 💜</p>}

        {/* 레벨 로드맵 */}
        <div style={{ marginTop: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: 14 }}>
          <h3 style={{ fontSize: 15, marginBottom: 10, color: 'var(--color-text)' }}>🏡 정원 성장 단계</h3>
          {GARDEN_LEVELS.map(g => (
            <div key={g.level} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, opacity: prog.level >= g.level ? 1 : 0.5 }}>
              <span style={{ fontSize: 20 }}>{prog.level >= g.level ? g.emoji : '🔒'}</span>
              <span style={{ fontSize: 15, fontWeight: prog.level === g.level ? 700 : 400, color: prog.level === g.level ? 'var(--color-accent)' : 'var(--color-text)' }}>
                Lv.{g.level} {g.name}
              </span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--color-text-soft)' }}>{g.requiredXp} XP</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--color-text-soft)', marginTop: 14 }}>
          장식을 산 뒤 정원에서 ✏️ 꾸미기로 배치할 수 있어요.
        </p>
      </div>
    </div>
  )
}
