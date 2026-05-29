import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_SPECIES, Rarity } from '../../data/plants'
import { FRIENDS } from '../../data/friends'
import { HEROES } from '../../data/heroes'
import { PLANT_COMPONENTS } from '../plants'
import { FRIEND_COMPONENTS } from '../friends/FriendComponents'
import { BottomNav } from '../common/BottomNav'

type Tab = 'plants' | 'friends' | 'heroes'

const RARITY_LABEL: Record<Rarity, string> = { common: '일반', rare: '희귀', epic: '에픽', legendary: '전설' }
const RARITY_COLOR: Record<Rarity, string> = { common: '#9ca3af', rare: '#60a5fa', epic: '#c084fc', legendary: '#fbbf24' }

export function CollectionScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const entries = useAppStore(s => s.entries)
  const game = useAppStore(s => s.game)
  const [tab, setTab] = useState<Tab>('plants')

  const discoveredPlants = new Set(entries.map(e => e.plantId))
  const metEmotions = new Set(entries.map(e => e.emotion))

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '18px 20px 4px' }}>
        <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>도감</h2>
      </div>

      {/* 탭 */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 16px', width: '100%' }}>
        {([['plants', '🌱 식물'], ['friends', '🐾 친구'], ['heroes', '🃏 영웅']] as [Tab, string][]).map(([t, label]) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '10px', borderRadius: 12, fontSize: 14, fontWeight: 700,
            background: tab === t ? 'rgba(124,92,255,0.3)' : 'rgba(255,255,255,0.06)',
            color: tab === t ? 'var(--color-accent)' : 'var(--color-text-soft)'
          }}>{label}</button>
        ))}
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 16px' }}>
        {tab === 'plants' && (
          <>
            <p style={{ fontSize: 13, color: 'var(--color-text-soft)', marginBottom: 10 }}>{discoveredPlants.size} / {PLANT_SPECIES.length} 종 발견</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {PLANT_SPECIES.map(p => {
                const found = discoveredPlants.has(p.id)
                const Comp = PLANT_COMPONENTS[p.id]
                return (
                  <motion.div key={p.id} whileTap={{ scale: 0.95 }} style={{
                    borderRadius: 12, padding: 8, textAlign: 'center',
                    background: 'rgba(255,255,255,0.05)', border: `1px solid ${found ? RARITY_COLOR[p.rarity] + '66' : 'rgba(255,255,255,0.08)'}`
                  }}>
                    <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: found ? 'none' : 'brightness(0) opacity(0.25)' }}>
                      {Comp && <Comp size={56} growProgress={1} />}
                    </div>
                    <div style={{ fontSize: 10, color: found ? 'var(--color-text)' : 'var(--color-text-soft)', marginTop: 4, lineHeight: 1.2 }}>
                      {found ? p.name : '???'}
                    </div>
                    {found && <div style={{ fontSize: 8, color: RARITY_COLOR[p.rarity] }}>{RARITY_LABEL[p.rarity]}</div>}
                  </motion.div>
                )
              })}
            </div>
          </>
        )}

        {tab === 'friends' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {FRIENDS.map(f => {
              const met = f.legendary ? game.unicornMet : f.triggerEmotions.some(e => metEmotions.has(e))
              const Comp = FRIEND_COMPONENTS[f.id]
              return (
                <div key={f.id} style={{ borderRadius: 14, padding: 12, textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: met ? 'none' : 'brightness(0) opacity(0.25)' }}>
                    {Comp && <Comp size={80} />}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: met ? 'var(--color-text)' : 'var(--color-text-soft)' }}>{met ? f.name : '???'}</div>
                  {met && <div style={{ fontSize: 11, color: 'var(--color-text-soft)', marginTop: 2 }}>{f.description}</div>}
                </div>
              )
            })}
          </div>
        )}

        {tab === 'heroes' && (
          <div style={{ textAlign: 'center', paddingTop: 20 }}>
            <p style={{ color: 'var(--color-text-soft)', marginBottom: 16 }}>{game.unlockedHeroes.length} / {HEROES.length}명의 영웅을 만났어요</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setScreen('heroCollection')} style={{
              padding: '14px 28px', borderRadius: 'var(--radius-md)', fontSize: 16, fontWeight: 700,
              background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', color: '#1f2937'
            }}>영웅 카드 도감 열기 →</motion.button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
