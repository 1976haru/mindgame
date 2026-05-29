import { motion } from 'framer-motion'
import { Hero, DOMAIN_ICONS, HeroRarity } from '../../data/heroes'
import { HeroPortrait } from './portraits/HeroPortrait'

interface HeroCardProps {
  hero: Hero
  width?: number
  locked?: boolean
}

const RARITY_STYLE: Record<HeroRarity, { border: string; bg: string; label: string; stars: string }> = {
  silver:   { border: 'linear-gradient(135deg,#cbd5e1,#94a3b8,#e2e8f0)', bg: 'linear-gradient(160deg,#f1f5f9,#e2e8f0)', label: '실버', stars: '⭐' },
  gold:     { border: 'linear-gradient(135deg,#fde047,#f59e0b,#fef08a)', bg: 'linear-gradient(160deg,#fffbeb,#fef3c7)', label: '골드', stars: '⭐⭐' },
  platinum: { border: 'linear-gradient(135deg,#ff7e7e,#fbbf24,#6ee7b7,#7c5cff,#ff9ec7)', bg: 'linear-gradient(160deg,#faf5ff,#ede9fe)', label: '플래티넘', stars: '⭐⭐⭐' }
}

export function HeroCard({ hero, width = 280, locked = false }: HeroCardProps) {
  const r = RARITY_STYLE[hero.rarity]
  const height = width * 1.5
  const pad = Math.round(width * 0.018)

  if (locked) {
    return (
      <div style={{
        width, height, borderRadius: 18,
        background: 'rgba(30,30,50,0.7)',
        border: '2px dashed rgba(255,255,255,0.2)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
        color: 'var(--color-text-soft)'
      }}>
        <div style={{ fontSize: width * 0.18 }}>🔒</div>
        <div style={{ fontSize: 13, fontFamily: 'var(--font-script)' }}>아직 만나지 못한 영웅</div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 40 }}
      animate={{ opacity: 1, rotateY: 0 }}
      whileTap={{ scale: 0.97 }}
      style={{ width, height, borderRadius: 18, padding: pad + 2, background: r.border, boxShadow: '0 10px 30px rgba(0,0,0,0.35)' }}
    >
      {/* 플래티넘 홀로그램 회전 후광 */}
      {hero.rarity === 'platinum' && (
        <motion.div
          animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', inset: -20, borderRadius: '50%', background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.18), transparent, rgba(124,92,255,0.18), transparent)', pointerEvents: 'none' }}
        />
      )}
      <div style={{
        width: '100%', height: '100%', borderRadius: 14, background: r.bg,
        display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', color: '#1f2937'
      }}>
        {/* 상단 바: 이름 + 별 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px 4px' }}>
          <span style={{ fontFamily: 'var(--font-script)', fontSize: width * 0.085, fontWeight: 700 }}>{hero.name}</span>
          <span style={{ fontSize: width * 0.05 }}>{r.stars}</span>
        </div>

        {/* 일러스트 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2px 0', background: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.7), transparent 70%)' }}>
          <HeroPortrait heroId={hero.id} size={width * 0.5} />
        </div>

        {/* 시대 + 영역 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, fontSize: width * 0.045, padding: '2px 8px' }}>
          <span style={{ background: 'rgba(0,0,0,0.07)', borderRadius: 8, padding: '2px 8px' }}>{hero.era}</span>
          <span style={{ background: 'rgba(0,0,0,0.07)', borderRadius: 8, padding: '2px 8px' }}>{DOMAIN_ICONS[hero.domain]} {hero.domain}</span>
        </div>

        {/* 명언 */}
        <div style={{ margin: '6px 12px', padding: '6px 10px', background: 'rgba(255,255,255,0.55)', borderRadius: 10, textAlign: 'center' }}>
          <span style={{ fontSize: width * 0.05, fontStyle: 'italic', lineHeight: 1.4 }}>"{hero.quote}"</span>
        </div>

        {/* 일화 */}
        <div style={{ margin: '0 12px 10px', flex: 1, overflow: 'hidden' }}>
          <p style={{ fontSize: width * 0.043, lineHeight: 1.45, color: '#374151' }}>{hero.childFriendlyStory}</p>
        </div>

        {/* 하단 업적 띠 */}
        <div style={{ background: 'rgba(0,0,0,0.06)', padding: '6px 12px', fontSize: width * 0.04, color: '#4b5563' }}>
          🏅 {hero.achievement}
        </div>
      </div>
    </motion.div>
  )
}
