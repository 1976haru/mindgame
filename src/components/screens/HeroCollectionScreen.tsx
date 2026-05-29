import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { HEROES, HeroDomain, DOMAIN_ICONS, Hero } from '../../data/heroes'
import { HeroCard } from '../heroes/HeroCard'

const DOMAINS: HeroDomain[] = ['기초질서', '약속과 책임', '공정과 차별', '권리와 의무', '안전과 보호']

export function HeroCollectionScreen() {
  const unlocked = useAppStore(s => s.unlockedHeroes)
  const setScreen = useAppStore(s => s.setScreen)
  const [selected, setSelected] = useState<Hero | null>(null)

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, overflowY: 'auto' }}>
      <div style={{ width: '100%', padding: '20px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => setScreen('collection')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <div>
          <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>영웅 카드 도감</h2>
          <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{unlocked.length} / {HEROES.length}명의 영웅을 만났어요</p>
        </div>
      </div>

      <div style={{ width: '100%', padding: '8px 16px 32px' }}>
        {DOMAINS.map(domain => {
          const heroes = HEROES.filter(h => h.domain === domain)
          return (
            <div key={domain} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, color: 'var(--color-text)', margin: '8px 4px', fontWeight: 700 }}>
                {DOMAIN_ICONS[domain]} {domain}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {heroes.map(hero => {
                  const isUnlocked = unlocked.includes(hero.id)
                  return (
                    <div key={hero.id} onClick={() => isUnlocked && setSelected(hero)} style={{ display: 'flex', justifyContent: 'center' }}>
                      <HeroCard hero={hero} width={150} locked={!isUnlocked} />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* 확대 보기 */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
          >
            <HeroCard hero={selected} width={300} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
