import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playVoice } from '../../utils/voice'
import { DOJO_BY_ID } from '../../data/dojos'
import { getMissionsByRank } from '../../data/missions'
import { SolomonOwl, SpeechBubble } from '../characters/SolomonOwl'
import { EngineResult } from '../missions/engines/types'
import { MultipleChoiceEngine } from '../missions/engines/MultipleChoiceEngine'
import { PitchMatchEngine } from '../missions/engines/PitchMatchEngine'
import { RhythmTapEngine } from '../missions/engines/RhythmTapEngine'
import { DanceSequenceEngine } from '../missions/engines/DanceSequenceEngine'
import { CardMatchEngine } from '../missions/engines/CardMatchEngine'
import { CardOrderEngine } from '../missions/engines/CardOrderEngine'
import { DictationEngine } from '../missions/engines/DictationEngine'
import { NumberPuzzleEngine } from '../missions/engines/NumberPuzzleEngine'

export function SolomonExamScreen() {
  const activeDojoId = useAppStore(s => s.activeDojoId)
  const setScreen = useAppStore(s => s.setScreen)
  const completeShihan = useAppStore(s => s.completeShihan)
  const [stage, setStage] = useState<'intro' | 'exam'>('intro')
  const [introDone, setIntroDone] = useState(false)

  // 시험 시작 시 솔로몬 안내 음성
  useEffect(() => {
    if (stage === 'intro') void playVoice('solomon_exam_intro')
  }, [stage])

  if (!activeDojoId) { setScreen('dojoHall'); return null }
  const dojo = DOJO_BY_ID[activeDojoId]
  // 종합 평가 = 가장 어려운 1급 미션
  const examMission = getMissionsByRank(activeDojoId, 1)[0]

  const finish = async (success: boolean, _r?: EngineResult) => {
    void playVoice(success ? 'solomon_exam_pass' : 'solomon_exam_fail')
    if (success) { await completeShihan(activeDojoId); setScreen('shihanCutscene') }
    else setScreen('dojoDetail')
  }

  const props = { config: examMission?.config ?? {}, color: dojo.color, onComplete: finish }
  const renderEngine = () => {
    if (!examMission) { finish(true); return null }
    switch (examMission.missionType) {
      case 'pitch_match': return <PitchMatchEngine {...props} />
      case 'rhythm_tap': return <RhythmTapEngine {...props} />
      case 'dance_sequence': return <DanceSequenceEngine {...props} />
      case 'card_match': return <CardMatchEngine {...props} />
      case 'card_order': return <CardOrderEngine {...props} />
      case 'dictation': case 'letter_assemble': return <DictationEngine {...props} />
      case 'number_puzzle': case 'pattern_match': return <NumberPuzzleEngine {...props} />
      default: return <MultipleChoiceEngine {...props} />
    }
  }

  return (
    <div className="screen" style={{ justifyContent: stage === 'intro' ? 'center' : 'flex-start', padding: 0, background: 'radial-gradient(ellipse at top,#1a1030 0%,#08081a 70%)' }}>
      {stage === 'intro' ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '0 24px' }} onClick={() => introDone && setStage('exam')}>
          <motion.div initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }}>
            <SolomonOwl size={170} expression="serious" />
          </motion.div>
          <SpeechBubble text={`${dojo.shortName} 도장의 마지막 관문이란다. 너의 진정한 실력을 보여주렴!`} onDone={() => setIntroDone(true)} />
          {introDone && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 16, color: 'var(--color-accent)' }}>화면을 눌러 평가 시작 ⚖️</motion.p>}
        </div>
      ) : (
        <>
          <div style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => setScreen('dojoDetail')} style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>✕</button>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-accent)' }}>⚖️ 솔로몬 평가단 · {dojo.name}</div>
            <div style={{ marginLeft: 'auto' }}><SolomonOwl size={44} expression="thinking" /></div>
          </div>
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px 24px' }}>
            {renderEngine()}
          </div>
        </>
      )}
    </div>
  )
}
