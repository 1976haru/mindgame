import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { EMOTION_LIST, EmotionType } from '../../data/emotions'

export function EmotionSelectScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const setPendingEmotion = useAppStore(s => s.setPendingEmotion)

  const handleSelect = (emotion: EmotionType) => {
    setPendingEmotion(emotion, 3) // 기본 강도 3
    setScreen('intensitySelect')
  }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: '24px' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', textAlign: 'center', marginTop: 20, marginBottom: 24 }}
      >
        <h2 style={{
          fontSize: 28,
          fontFamily: 'var(--font-script)',
          color: 'var(--color-accent)',
          marginBottom: 6
        }}>
          지금 어떤 마음이야?
        </h2>
        <p style={{ color: 'var(--color-text-soft)', fontSize: 18 }}>
          제일 가까운 마음을 골라봐
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 14,
        width: '100%',
        maxWidth: 400
      }}>
        {EMOTION_LIST.map((emotion, i) => (
          <motion.button
            key={emotion.type}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(emotion.type)}
            style={{
              padding: '20px 12px',
              borderRadius: 'var(--radius-md)',
              background: `linear-gradient(135deg, ${emotion.color}33, ${emotion.color}11)`,
              border: `2px solid ${emotion.color}66`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8
            }}
          >
            <div style={{ fontSize: 40 }}>{emotion.emoji}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: emotion.color }}>
              {emotion.label}
            </div>
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => setScreen('garden')}
        style={{
          marginTop: 24,
          color: 'var(--color-text-soft)',
          fontSize: 18
        }}
      >
        ← 정원으로 돌아가기
      </button>
    </div>
  )
}
