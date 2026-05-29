import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_BY_ID, getPlantById } from '../../data/plants'
import { PLANT_COMPONENTS } from '../plants'
import { playSound } from '../../utils/sound'

export function FusionScreen() {
  const entries = useAppStore(s => s.entries)
  const fusePlants = useAppStore(s => s.fusePlants)
  const setScreen = useAppStore(s => s.setScreen)
  const [fusing, setFusing] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  // 3개 이상 모인 종 (epic/legendary 제외)
  const counts: Record<string, number> = {}
  entries.forEach(e => { counts[e.plantId] = (counts[e.plantId] || 0) + 1 })
  const fusable = Object.entries(counts)
    .filter(([id, n]) => n >= 3 && PLANT_BY_ID[id] && (PLANT_BY_ID[id].rarity === 'common' || PLANT_BY_ID[id].rarity === 'rare'))

  const doFuse = async (plantId: string) => {
    setFusing(plantId)
    playSound('fusion')
    setTimeout(async () => {
      const r = await fusePlants(plantId)
      setResult(r)
      setFusing(null)
    }, 1800)
  }

  const ResultComp = result ? PLANT_COMPONENTS[result] : null
  const resultSpecies = result ? getPlantById(result) : null

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'radial-gradient(ellipse at center,#241a4a 0%,#0f0f1e 70%)' }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('garden')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 14 }}>← 정원</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>✨ 별빛 합성</h2>
      </div>
      <p style={{ color: 'var(--color-text-soft)', fontSize: 13, padding: '0 24px 8px' }}>같은 식물 3개를 모아 더 빛나는 식물로 진화시켜요</p>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 16px 24px' }}>
        {fusable.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 60, color: 'var(--color-text-soft)' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
            <p>같은 식물이 3개 이상 모이면<br />여기서 합성할 수 있어요!</p>
          </div>
        )}
        {fusable.map(([id, n]) => {
          const sp = PLANT_BY_ID[id]
          const Comp = PLANT_COMPONENTS[id]
          return (
            <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, marginBottom: 10, borderRadius: 16, background: 'rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex' }}>
                {[0, 1, 2].map(i => <div key={i} style={{ marginLeft: i ? -20 : 0 }}>{Comp && <Comp size={48} growProgress={1} />}</div>)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{sp.name}</div>
                <div style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>{n}개 보유</div>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => doFuse(id)}
                style={{ padding: '10px 16px', borderRadius: 12, background: 'linear-gradient(135deg,#a855f7,#ec4899)', color: 'white', fontWeight: 700, fontSize: 14 }}>합성 ✨</motion.button>
            </div>
          )
        })}
      </div>

      {/* 합성 연출 */}
      <AnimatePresence>
        {fusing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.8, ease: 'easeIn' }} style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '4px dashed #a855f7' }} />
            <motion.div animate={{ scale: [1, 0.3, 2.5], opacity: [1, 1, 0] }} transition={{ duration: 1.8 }} style={{ width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle,#fff,#a855f7)' }} />
          </motion.div>
        )}
        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setResult(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 100 }}>
            <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-script)', fontSize: 24 }}>합성 완료! ✨</p>
            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }}>
              {ResultComp && <ResultComp size={200} growProgress={1} />}
            </motion.div>
            <p style={{ fontSize: 20, color: 'var(--color-text)' }}>{resultSpecies?.name}</p>
            <button style={{ padding: '12px 28px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', fontWeight: 700 }}>좋아요! 💜</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
