import { AnimatePresence, motion } from 'framer-motion'
import { useSubtitleStore } from '../../store/subtitleStore'

// 음성과 동기화된 자막 말풍선. 화면 하단에 항상 떠 있음(App에 1회 마운트).
// 음소거 상태여도 표시될 수 있음(접근성) — 표시 여부는 speak()에서 설정으로 결정.
export function Subtitle() {
  const { text, speaker, visible } = useSubtitleStore()

  return (
    <AnimatePresence>
      {visible && text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'fixed',
            left: 16,
            right: 16,
            bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)',
            zIndex: 9999,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: '100%',
              background: 'rgba(15,15,30,0.86)',
              backdropFilter: 'blur(6px)',
              borderRadius: 18,
              padding: '12px 18px',
              boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {speaker && (
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 2 }}>
                {speaker}
              </div>
            )}
            <div style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--color-text)', fontWeight: 600 }}>
              {text}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
