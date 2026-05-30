// 🌿 식물 돌보기 시트 (Phase 2 · 원예치료)
// 정원에서 식물을 탭하면 열리는 하단 시트. 돌보기 5종 + 식물과 대화 + 별명 짓기.
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { PlantWithGrowth } from '../plants/PlantWithGrowth'
import { PLANT_BY_ID } from '../../data/plants'
import {
  CARE_LIST, CareType, careCooldownRemaining, formatCooldown, getPlantTalk, TALK_REPLIES, CARE_ACTIONS, plantTalkClipId,
} from '../../data/careActions'
import { plantGrowClip } from '../../data/voiceExtra'
import { playVoice } from '../../utils/voice'
import {
  entryStage, calculateHealth, STAGE_BY_ID, HEALTH_STATES, nextStage, STAGE_REQUIREMENTS, entryCarePoints,
} from '../../data/growth'
import type { GardenEntry } from '../../utils/storage'
import { playSound } from '../../utils/sound'
import { GardenMathModal } from './GardenMathModal'
import { problemForContext, MathProblem } from '../../data/mathGarden'

interface Props {
  entryId: string
  onClose: () => void
}

export function PlantCareSheet({ entryId, onClose }: Props) {
  const entry = useAppStore(s => s.entries.find(e => e.id === entryId)) as GardenEntry | undefined
  const empathy = useAppStore(s => s.game.empathyEnergy)
  const grade = useAppStore(s => s.game.studentGrade)
  const careForPlant = useAppStore(s => s.careForPlant)
  const setPlantNickname = useAppStore(s => s.setPlantNickname)
  const harvestPlant = useAppStore(s => s.harvestPlant)
  const [mathProblem, setMathProblem] = useState<MathProblem | null>(null)

  const [message, setMessage] = useState<string | null>(null)
  const [talking, setTalking] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameDraft, setNameDraft] = useState(entry?.nickname ?? '')
  const [drops, setDrops] = useState<number[]>([])
  const [tick, setTick] = useState(0) // 쿨다운 표시 갱신용

  if (!entry) return null
  const species = PLANT_BY_ID[entry.plantId]
  const stage = entryStage(entry)
  const health = calculateHealth(entry)
  const stageInfo = STAGE_BY_ID[stage]
  const next = nextStage(stage)
  const careNow = entryCarePoints(entry)
  const careNeed = next ? STAGE_REQUIREMENTS[next].care : careNow
  const careRatio = next ? Math.min(1, careNow / careNeed) : 1

  const handleCare = async (type: CareType) => {
    const res = await careForPlant(entryId, type)
    if (!res.ok) {
      if (res.reason === 'energy') setMessage('공감 에너지가 부족해요 💜')
      else setMessage('아직 조금 더 기다려야 해요 🕊️')
      return
    }
    if (type === 'water') {
      setDrops(Array.from({ length: 5 }, (_, i) => i))
      playSound('pop')
      setTimeout(() => setDrops([]), 900)
    } else {
      playSound('sparkle')
    }
    if (res.grew) {
      playSound('grow')
      void playVoice(plantGrowClip(careNow)) // 위로 토끼 성장 축하 음성
      setMessage('식물이 한 단계 자랐어요! 🌱✨')
    } else {
      setMessage(CARE_ACTIONS[type].therapyMessage)
    }
    setTick(t => t + 1)
  }

  const handleTalk = () => {
    setTalking(true)
    setMessage(getPlantTalk(entry.emotion, stage))
    void playVoice(plantTalkClipId(entry.emotion, stage)) // 식물(위로 토끼) 음성
    void careForPlant(entryId, 'talk') // 대화도 돌봄(+1)
    setTick(t => t + 1)
  }

  const displayName = entry.nickname ? `${entry.nickname} (${species?.name ?? '식물'})` : (species?.name ?? '식물')

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end' }}
    >
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 480, margin: '0 auto', background: 'rgba(22,22,40,0.98)',
          backdropFilter: 'blur(12px)', borderTopLeftRadius: 24, borderTopRightRadius: 24,
          padding: '14px 20px calc(20px + env(safe-area-inset-bottom))', borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ width: 40, height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.2)', margin: '0 auto 14px' }} />

        {/* 식물 정보 */}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 }}>
          <div style={{ position: 'relative' }}>
            <PlantWithGrowth entry={entry} size={84} />
            {/* 물방울 애니메이션 */}
            <AnimatePresence>
              {drops.map(i => (
                <motion.div key={i}
                  initial={{ y: -20, opacity: 0, x: i * 10 - 20 }}
                  animate={{ y: 50, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                  style={{ position: 'absolute', top: 0, left: '50%', fontSize: 16 }}
                >💧</motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div style={{ flex: 1 }}>
            {editingName ? (
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  value={nameDraft} onChange={e => setNameDraft(e.target.value)} maxLength={8} placeholder="별명"
                  style={{ flex: 1, fontSize: 18, padding: '6px 10px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}
                />
                <button onClick={() => { void setPlantNickname(entryId, nameDraft); setEditingName(false) }}
                  style={{ fontSize: 18, padding: '6px 12px', borderRadius: 10, background: 'var(--color-accent)', color: 'white' }}>✓</button>
              </div>
            ) : (
              <button onClick={() => { setNameDraft(entry.nickname ?? ''); setEditingName(true) }} style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: 20, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>
                  {displayName} <span style={{ fontSize: 14, opacity: 0.6 }}>✏️</span>
                </h3>
              </button>
            )}
            <p style={{ fontSize: 16, color: 'var(--color-text-soft)', marginTop: 2 }}>
              {stageInfo.name} · {HEALTH_STATES[health].emoji} {HEALTH_STATES[health].name}
            </p>
            {/* 성장 진행바 */}
            <div style={{ marginTop: 6 }}>
              <div style={{ height: 8, borderRadius: 8, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <motion.div animate={{ width: `${careRatio * 100}%` }}
                  style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg,#5eebb7,#7c5cff)' }} />
              </div>
              <p style={{ fontSize: 13, color: 'var(--color-text-soft)', marginTop: 3 }}>
                {next ? `다음 단계까지 돌봄 ${careNow}/${careNeed}` : '활짝 다 자랐어요! 🌸'}
              </p>
            </div>
          </div>
        </div>

        {/* 메시지 (원예치료/대화) */}
        <AnimatePresence mode="wait">
          {message && (
            <motion.div key={message}
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ background: 'rgba(124,92,255,0.15)', borderRadius: 14, padding: '12px 16px', marginBottom: 12, fontSize: 17, lineHeight: 1.5, color: 'var(--color-text)' }}
            >
              💬 {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 대화 답장 선택지 */}
        {talking && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {TALK_REPLIES.map(r => (
              <motion.button key={r.text} whileTap={{ scale: 0.95 }}
                onClick={() => { setMessage(r.back); setTalking(false) }}
                style={{ fontSize: 16, padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)' }}>
                {r.text}
              </motion.button>
            ))}
          </div>
        )}

        {/* 돌보기 버튼 */}
        <div key={tick} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {CARE_LIST.map(action => {
            const remain = careCooldownRemaining(entry, action.type)
            const onCd = remain > 0
            return (
              <motion.button key={action.type} whileTap={{ scale: onCd ? 1 : 0.93 }}
                onClick={() => (action.type === 'talk' ? handleTalk() : handleCare(action.type))}
                disabled={onCd}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '12px 6px', borderRadius: 14,
                  background: onCd ? 'rgba(255,255,255,0.05)' : 'rgba(94,235,183,0.14)',
                  opacity: onCd ? 0.5 : 1, color: 'var(--color-text)',
                }}>
                <span style={{ fontSize: 26 }}>{action.icon}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{action.name}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-soft)' }}>
                  {onCd ? `${formatCooldown(remain)} 후` : action.empathyCost > 0 ? `💜${action.empathyCost}` : `+${action.carePoints}`}
                </span>
              </motion.button>
            )
          })}
          <motion.button whileTap={{ scale: 0.95 }} onClick={onClose}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, padding: '12px 6px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text-soft)' }}>
            <span style={{ fontSize: 26 }}>✓</span>
            <span style={{ fontSize: 14 }}>닫기</span>
          </motion.button>
        </div>
        {/* 열매 수확 (열매 단계에서만) */}
        {stage === 'fruit' && (
          <motion.button whileTap={{ scale: 0.97 }}
            onClick={async () => { const r = await harvestPlant(entryId); if (r.ok) { playSound('treasure'); setMessage(`열매를 수확했어요! 💜+${r.empathy}, 씨앗 +1 🌰`) } }}
            style={{ width: '100%', marginTop: 10, padding: '12px', fontSize: 16, fontWeight: 700, borderRadius: 14, background: 'linear-gradient(135deg,#fbbf24,#ef9a3d)', color: 'white' }}>
            🧺 열매 수확하기 (💜+5, 씨앗 +1)
          </motion.button>
        )}

        {/* 숨겨진 수학: 선택적 보너스 */}
        <motion.button whileTap={{ scale: 0.97 }} onClick={() => setMathProblem(problemForContext(stage === 'fruit' ? 'harvest' : 'water', grade))}
          style={{ width: '100%', marginTop: 10, padding: '12px', fontSize: 16, fontWeight: 600, borderRadius: 14, background: 'rgba(124,92,255,0.16)', color: 'var(--color-accent)' }}>
          🧮 {stage === 'fruit' ? '수확 수학' : '물방울 수학'} 풀기 (보너스 💜)
        </motion.button>

        <p style={{ fontSize: 13, color: 'var(--color-text-soft)', textAlign: 'center', marginTop: 10 }}>
          💜 {empathy} · 돌보면 식물이 무럭무럭 자라요
        </p>
      </motion.div>

      <AnimatePresence>
        {mathProblem && <GardenMathModal problem={mathProblem} onClose={() => setMathProblem(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}
