import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { EMOTIONS } from '../../data/emotions'
import { getPlantForEmotion } from '../../data/plants'
import { uuid, todayString, randomGardenPosition } from '../../utils/helpers'

export function IntensitySelectScreen() {
  const pendingEmotion = useAppStore(s => s.pendingEmotion)
  const setPendingEmotion = useAppStore(s => s.setPendingEmotion)
  const addEntry = useAppStore(s => s.addEntry)
  const setScreen = useAppStore(s => s.setScreen)
  const [intensity, setIntensity] = useState(pendingEmotion?.intensity || 3)

  if (!pendingEmotion) {
    setScreen('emotionSelect')
    return null
  }

  const emotion = EMOTIONS[pendingEmotion.type]

  const handleConfirm = async () => {
    const plant = getPlantForEmotion(pendingEmotion.type, intensity)
    const entry = {
      id: uuid(),
      date: todayString(),
      timestamp: Date.now(),
      emotion: pendingEmotion.type,
      intensity,
      plantId: plant.id,
      position: randomGardenPosition()
    }
    setPendingEmotion(pendingEmotion.type, intensity)
    await addEntry(entry)
    setScreen('plantGrowing')
  }

  return (
    <div className="screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}
      >
        <div style={{ fontSize: 70, marginBottom: 12 }}>{emotion.emoji}</div>
        <h2 style={{
          fontSize: 28,
          color: emotion.color,
          fontFamily: 'var(--font-script)',
          marginBottom: 8
        }}>
          {emotion.label}이구나
        </h2>
        <p style={{ color: 'var(--color-text-soft)', marginBottom: 40 }}>
          얼마나 그런 마음이야?
        </p>

        {/* 별 선택기 */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
          marginBottom: 24
        }}>
          {[1, 2, 3, 4, 5].map(level => (
            <motion.button
              key={level}
              whileTap={{ scale: 1.2 }}
              onClick={() => setIntensity(level)}
              style={{
                fontSize: 42,
                filter: level <= intensity ? 'none' : 'grayscale(1) opacity(0.3)',
                transition: 'all 0.3s'
              }}
            >
              ⭐
            </motion.button>
          ))}
        </div>

        <p style={{
          color: 'var(--color-text-soft)',
          marginBottom: 32,
          fontSize: 15,
          minHeight: 22
        }}>
          {['아주 조금', '조금', '보통', '많이', '아주 많이'][intensity - 1]}
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleConfirm}
          style={{
            width: '100%',
            padding: '16px',
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            background: `linear-gradient(135deg, ${emotion.color}, ${emotion.color}aa)`,
            color: 'white',
            boxShadow: `0 8px 24px ${emotion.color}55`
          }}
        >
          마음 심기 🌱
        </motion.button>

        <button
          onClick={() => setScreen('emotionSelect')}
          style={{
            marginTop: 16,
            color: 'var(--color-text-soft)',
            fontSize: 14
          }}
        >
          ← 다시 고르기
        </button>
      </motion.div>
    </div>
  )
}
