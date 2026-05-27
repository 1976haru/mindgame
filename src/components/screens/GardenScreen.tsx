import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PLANT_COMPONENTS } from '../plants/PlantComponents'

export function GardenScreen() {
  const profile = useAppStore(s => s.profile)
  const entries = useAppStore(s => s.entries)
  const setScreen = useAppStore(s => s.setScreen)

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      {/* 헤더 */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          width: '100%',
          padding: '20px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h2 style={{
            fontSize: 24,
            fontFamily: 'var(--font-script)',
            color: 'var(--color-accent)'
          }}>
            {profile?.name}의 정원
          </h2>
          <p style={{ fontSize: 14, color: 'var(--color-text-soft)' }}>
            🌱 {entries.length}개의 마음이 자랐어요
          </p>
        </div>
        <button
          onClick={() => setScreen('breathing')}
          style={{
            padding: '8px 14px',
            fontSize: 14,
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'var(--color-text)'
          }}
        >
          🫧 호흡
        </button>
      </motion.div>

      {/* 정원 영역 - 식물들이 자라있는 곳 */}
      <div style={{
        position: 'relative',
        width: '100%',
        flex: 1,
        background: 'linear-gradient(180deg, transparent 0%, rgba(94, 235, 183, 0.05) 60%, rgba(94, 235, 183, 0.15) 100%)'
      }}>
        {/* 잔디 라인 */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'linear-gradient(180deg, transparent 0%, rgba(94, 235, 183, 0.25) 100%)'
        }} />

        {entries.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: 'absolute',
              top: '40%',
              left: 0,
              right: 0,
              textAlign: 'center',
              padding: '0 32px'
            }}
          >
            <div style={{ fontSize: 60, marginBottom: 16 }}>🌱</div>
            <p style={{ color: 'var(--color-text-soft)', lineHeight: 1.6 }}>
              아직 정원이 비어있어요.<br />
              오늘의 마음을 들려줄래요?
            </p>
          </motion.div>
        ) : (
          entries.map((entry, idx) => {
            const PlantComp = PLANT_COMPONENTS[entry.plantId]
            if (!PlantComp) return null
            return (
              <motion.div
                key={entry.id}
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: idx * 0.05, type: 'spring' }}
                style={{
                  position: 'absolute',
                  left: `${entry.position.x * 100}%`,
                  top: `${entry.position.y * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <PlantComp size={80} growProgress={1} />
              </motion.div>
            )
          })
        )}
      </div>

      {/* 하단 액션 버튼 */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          padding: '16px 24px 32px',
          width: '100%'
        }}
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setScreen('emotionSelect')}
          style={{
            width: '100%',
            padding: '18px',
            fontSize: 20,
            fontWeight: 700,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #7c5cff 0%, #ff9ec7 100%)',
            color: 'white',
            boxShadow: 'var(--shadow-soft)'
          }}
        >
          오늘의 마음 ✨
        </motion.button>
      </motion.div>
    </div>
  )
}
