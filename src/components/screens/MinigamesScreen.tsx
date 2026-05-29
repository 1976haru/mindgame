import { motion } from 'framer-motion'
import { useAppStore, Screen } from '../../store/appStore'

const GAMES: { screen: Screen; icon: string; title: string; desc: string; color: string }[] = [
  { screen: 'breathing', icon: '🫧', title: '호흡 풍선', desc: '천천히 숨 쉬며 마음 가라앉히기', color: '#7c5cff' },
  { screen: 'worryBubble', icon: '💭', title: '걱정 비눗방울', desc: '걱정을 비눗방울에 담아 펑!', color: '#60a5fa' },
  { screen: 'gratitudeStar', icon: '🌟', title: '감사 별찾기', desc: '오늘 좋았던 일로 별자리 만들기', color: '#fbbf24' },
  { screen: 'colorPaint', icon: '🎨', title: '마음 색칠', desc: '나만의 식물을 색칠해 정원에 심기', color: '#34d399' }
]

export function MinigamesScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const visitArea = useAppStore(s => s.visitArea)

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '18px 20px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => { visitArea('minigames'); setScreen('garden') }} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🎮 미니게임</h2>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {GAMES.map((g, i) => (
          <motion.button key={g.screen}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { visitArea('minigames'); setScreen(g.screen) }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, borderRadius: 18, textAlign: 'left', background: `linear-gradient(135deg, ${g.color}33, rgba(255,255,255,0.04))`, border: `2px solid ${g.color}55` }}>
            <div style={{ fontSize: 40 }}>{g.icon}</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--color-text)' }}>{g.title}</div>
              <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{g.desc}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
