import { motion } from 'framer-motion'
import { useAppStore, Screen } from '../../store/appStore'
import { t } from '../../i18n'

const TABS: { screen: Screen; icon: string; key: string; area?: string }[] = [
  { screen: 'garden', icon: '🌱', key: 'nav.garden', area: 'garden' },
  { screen: 'kingdom', icon: '🏰', key: 'nav.kingdom', area: 'kingdom' },
  { screen: 'dojoHall', icon: '🏯', key: 'nav.dojo' },
  { screen: 'collection', icon: '🃏', key: 'nav.collection', area: 'collection' },
  { screen: 'settings', icon: '⚙️', key: 'nav.settings' }
]

export function BottomNav() {
  const currentScreen = useAppStore(s => s.currentScreen)
  const setScreen = useAppStore(s => s.setScreen)
  const visitArea = useAppStore(s => s.visitArea)
  const lang = useAppStore(s => s.game.lang)

  return (
    <div style={{
      width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 8px calc(8px + env(safe-area-inset-bottom))',
      background: 'rgba(15,15,30,0.92)', backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      {TABS.map(tab => {
        const active = currentScreen === tab.screen
        return (
          <motion.button
            key={tab.screen}
            whileTap={{ scale: 0.9 }}
            onClick={() => { if (tab.area) visitArea(tab.area); setScreen(tab.screen) }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 14, background: active ? 'rgba(124,92,255,0.22)' : 'transparent' }}
          >
            <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(0.4) opacity(0.7)' }}>{tab.icon}</span>
            <span style={{ fontSize: 16, color: active ? 'var(--color-accent)' : 'var(--color-text-soft)', fontWeight: active ? 700 : 400 }}>{t(tab.key, lang)}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
