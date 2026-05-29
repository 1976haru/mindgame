import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_SPECIES } from '../../data/plants'
import { PLANT_COMPONENTS } from '../plants/PlantComponents'
import { getFriendForEmotion } from '../../data/friends'
import { isNightTime } from '../../utils/timeUtils'
import { playSound } from '../../utils/sound'

export function PlantGrowingScreen() {
  const lastEntry = useAppStore(s => s.lastEntry)
  const setScreen = useAppStore(s => s.setScreen)
  const solomonMet = useAppStore(s => s.game.solomonMet)
  const [grow, setGrow] = useState(0)
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    if (!lastEntry) return
    const t1 = setTimeout(() => setGrow(0.3), 400)
    const t2 = setTimeout(() => setGrow(0.7), 1200)
    const t3 = setTimeout(() => { setGrow(1); playSound('grow') }, 2000)
    const t4 = setTimeout(() => setShowInfo(true), 2800)
    return () => { [t1, t2, t3, t4].forEach(clearTimeout) }
  }, [lastEntry])

  if (!lastEntry) return null
  const PlantComp = PLANT_COMPONENTS[lastEntry.plantId]
  const species = PLANT_SPECIES.find(p => p.id === lastEntry.plantId)
  const friend = getFriendForEmotion(lastEntry.emotion, isNightTime())

  const handleNext = () => {
    // 첫 식물 후 솔로몬이 처음 등장 (와! ④)
    if (!solomonMet) setScreen('solomonIntro')
    else if (friend) setScreen('friendVisit')
    else setScreen('garden')
  }

  // 감정별 미니게임 추천
  const recommend: { screen: 'breathing' | 'worryBubble' | 'gratitudeStar' | 'colorPaint'; label: string } | null = (() => {
    switch (lastEntry.emotion) {
      case 'angry': return { screen: 'breathing', label: '🫧 호흡으로 마음 가라앉히기' }
      case 'fear': return { screen: 'worryBubble', label: '💭 걱정 비눗방울 터뜨리기' }
      case 'sad': return { screen: 'worryBubble', label: '💭 걱정 비눗방울 터뜨리기' }
      case 'bored': return { screen: 'gratitudeStar', label: '🌟 감사 별찾기' }
      default: return { screen: 'colorPaint', label: '🎨 마음 색칠하기' }
    }
  })()

  return (
    <div className="screen">
      {/* 빛나는 후광 */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: grow * 3, opacity: grow * 0.4 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ffd84d 0%, transparent 70%)'
        }}
      />

      {/* 식물 */}
      <motion.div
        style={{ position: 'relative', zIndex: 1 }}
      >
        {PlantComp && <PlantComp size={240} growProgress={grow} />}
      </motion.div>

      {/* 정보 카드 */}
      <AnimatePresence>
        {showInfo && species && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 40,
              left: 24,
              right: 24,
              maxWidth: 380,
              margin: '0 auto',
              padding: '20px 24px',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(26, 26, 46, 0.92)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'center'
            }}
          >
            <p style={{ fontSize: 14, color: 'var(--color-text-soft)', marginBottom: 4 }}>
              새 식물이 자랐어요!
            </p>
            <h3 style={{
              fontSize: 26,
              fontFamily: 'var(--font-script)',
              color: 'var(--color-accent)',
              marginBottom: 8
            }}>
              {species.name}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--color-text-soft)', lineHeight: 1.5, marginBottom: 16 }}>
              {species.flavorText}
            </p>
            {recommend && solomonMet && (
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setScreen(recommend.screen)}
                style={{ display: 'block', width: '100%', marginBottom: 10, padding: '10px', fontSize: 14, borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>
                {recommend.label}
              </motion.button>
            )}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              style={{
                padding: '12px 28px',
                fontSize: 16,
                fontWeight: 700,
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #7c5cff, #ff9ec7)',
                color: 'white'
              }}
            >
              {friend ? '계속 →' : '정원으로 →'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
