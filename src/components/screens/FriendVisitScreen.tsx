import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { getFriendForEmotion } from '../../data/friends'
import { FRIEND_COMPONENTS } from '../friends/FriendComponents'

export function FriendVisitScreen() {
  const lastEntry = useAppStore(s => s.lastEntry)
  const profile = useAppStore(s => s.profile)
  const setScreen = useAppStore(s => s.setScreen)

  if (!lastEntry) return null
  const friend = getFriendForEmotion(lastEntry.emotion)
  if (!friend) return null
  const FriendComp = FRIEND_COMPONENTS[friend.id]

  return (
    <div className="screen">
      <motion.div
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', duration: 1 }}
        style={{ marginBottom: 24 }}
      >
        {FriendComp && <FriendComp size={200} />}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: 'center',
          maxWidth: 360,
          padding: '0 24px'
        }}
      >
        <p style={{ fontSize: 14, color: 'var(--color-text-soft)', marginBottom: 8 }}>
          {profile?.name}이를 보러 왔어요
        </p>
        <h3 style={{
          fontSize: 28,
          fontFamily: 'var(--font-script)',
          color: 'var(--color-accent)',
          marginBottom: 16
        }}>
          {friend.name}
        </h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            fontSize: 18,
            color: 'var(--color-text)',
            lineHeight: 1.6,
            background: 'rgba(255, 255, 255, 0.08)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            marginBottom: 24,
            position: 'relative'
          }}
        >
          "{friend.greeting}"
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('garden')}
          style={{
            padding: '14px 36px',
            fontSize: 18,
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #7c5cff, #ff9ec7)',
            color: 'white',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          고마워 💗
        </motion.button>
      </motion.div>
    </div>
  )
}
