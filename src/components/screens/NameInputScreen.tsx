import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { t } from '../../i18n'

export function NameInputScreen() {
  const [name, setName] = useState('')
  const createProfile = useAppStore(s => s.createProfile)
  const lang = useAppStore(s => s.game.lang)

  const handleStart = async () => {
    if (name.trim().length < 1) return
    await createProfile(name)
  }

  return (
    <div className="screen">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}
      >
        <div style={{ fontSize: 60, marginBottom: 20 }}>🌱</div>
        <h2 style={{ fontSize: 32, marginBottom: 12, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>
          {t('name.title', lang)}
        </h2>
        <p style={{ color: 'var(--color-text-soft)', marginBottom: 32, fontSize: 18 }}>
          {t('name.ask', lang)}
        </p>

        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value.slice(0, 10))}
          placeholder={t('name.placeholder', lang)}
          maxLength={10}
          style={{
            width: '100%',
            padding: '16px 20px',
            fontSize: 24,
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--color-primary)',
            background: 'rgba(124, 92, 255, 0.1)',
            color: 'var(--color-text)',
            textAlign: 'center',
            outline: 'none',
            fontFamily: 'var(--font-display)'
          }}
          onKeyDown={e => e.key === 'Enter' && handleStart()}
        />

        <motion.button
          onClick={handleStart}
          disabled={name.trim().length < 1}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: 24,
            padding: '14px 40px',
            fontSize: 20,
            borderRadius: 'var(--radius-md)',
            background: name.trim()
              ? 'linear-gradient(135deg, #7c5cff 0%, #ff9ec7 100%)'
              : '#4a4a5e',
            color: 'white',
            fontWeight: 700,
            boxShadow: name.trim() ? 'var(--shadow-soft)' : 'none',
            transition: 'all 0.3s'
          }}
        >
          {t('action.start', lang)}
        </motion.button>
      </motion.div>
    </div>
  )
}
