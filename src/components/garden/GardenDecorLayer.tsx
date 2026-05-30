// 🎍 정원 장식 레이어 (Phase 4) — 배치된 장식 렌더 + 꾸미기 모드 드래그/삭제
import { RefObject } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { DECO_BY_ID } from '../../data/decorations'

interface Props {
  decorMode: boolean
  areaRef: RefObject<HTMLDivElement>
}

export function GardenDecorLayer({ decorMode, areaRef }: Props) {
  const placed = useAppStore(s => s.game.placedDecorations)
  const moveDecoration = useAppStore(s => s.moveDecoration)
  const removeDecoration = useAppStore(s => s.removeDecoration)

  return (
    <>
      {placed.map(p => {
        const deco = DECO_BY_ID[p.decoId]
        if (!deco) return null
        return (
          <motion.div
            key={p.uid}
            drag={decorMode}
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(_, info) => {
              const rect = areaRef.current?.getBoundingClientRect()
              if (!rect) return
              const x = Math.max(0.03, Math.min(0.97, (info.point.x - rect.left) / rect.width))
              const y = Math.max(0.1, Math.min(0.95, (info.point.y - rect.top) / rect.height))
              moveDecoration(p.uid, x, y)
            }}
            whileTap={decorMode ? { scale: 1.15 } : {}}
            style={{
              position: 'absolute', left: `${p.x * 100}%`, top: `${p.y * 100}%`,
              transform: 'translate(-50%, -50%)', fontSize: 38, cursor: decorMode ? 'grab' : 'default',
              touchAction: decorMode ? 'none' : 'auto', zIndex: 2,
              filter: decorMode ? 'drop-shadow(0 0 6px rgba(124,92,255,0.8))' : 'none',
            }}
          >
            {deco.emoji}
            {decorMode && (
              <button
                onClick={() => removeDecoration(p.uid)}
                style={{ position: 'absolute', top: -8, right: -10, width: 22, height: 22, borderRadius: 999, background: '#ef4444', color: 'white', fontSize: 13, lineHeight: '22px', textAlign: 'center' }}
              >✕</button>
            )}
          </motion.div>
        )
      })}
    </>
  )
}
