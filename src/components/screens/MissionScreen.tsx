import { useAppStore } from '../../store/appStore'
import { getMission } from '../../data/missions'
import { DOJO_BY_ID } from '../../data/dojos'
import { MentorAvatar } from '../mentors/MentorComponents'
import { EngineResult } from '../missions/engines/types'
import { MultipleChoiceEngine } from '../missions/engines/MultipleChoiceEngine'
import { PitchMatchEngine } from '../missions/engines/PitchMatchEngine'
import { RhythmTapEngine } from '../missions/engines/RhythmTapEngine'
import { DanceSequenceEngine } from '../missions/engines/DanceSequenceEngine'
import { CardMatchEngine } from '../missions/engines/CardMatchEngine'
import { CardOrderEngine } from '../missions/engines/CardOrderEngine'
import { DictationEngine } from '../missions/engines/DictationEngine'
import { NumberPuzzleEngine } from '../missions/engines/NumberPuzzleEngine'

export function MissionScreen() {
  const activeMissionId = useAppStore(s => s.activeMissionId)
  const setScreen = useAppStore(s => s.setScreen)
  const completeMission = useAppStore(s => s.completeMission)
  const recordMissionAttempt = useAppStore(s => s.recordMissionAttempt)
  const setMissionOutcome = useAppStore(s => s.setMissionOutcome)

  const mission = activeMissionId ? getMission(activeMissionId) : undefined
  if (!mission) { setScreen('dojoHall'); return null }
  const dojo = DOJO_BY_ID[mission.dojoId]

  const handle = async (success: boolean, _result?: EngineResult) => {
    if (success) {
      const r = await completeMission(mission.dojoId, mission.id)
      setMissionOutcome({ dojoId: mission.dojoId, missionId: mission.id, success: true, rankedUp: r.rankedUp, shihanReady: r.shihanReady })
    } else {
      recordMissionAttempt(mission.dojoId, false)
      setMissionOutcome({ dojoId: mission.dojoId, missionId: mission.id, success: false, rankedUp: null, shihanReady: false })
    }
    setScreen('missionResult')
  }

  const engineProps = { config: mission.config, color: dojo.color, onComplete: handle }

  const renderEngine = () => {
    switch (mission.missionType) {
      case 'multiple_choice':
      case 'visual_quiz':     return <MultipleChoiceEngine {...engineProps} />
      case 'pitch_match':     return <PitchMatchEngine {...engineProps} />
      case 'rhythm_tap':      return <RhythmTapEngine {...engineProps} />
      case 'dance_sequence':  return <DanceSequenceEngine {...engineProps} />
      case 'card_match':      return <CardMatchEngine {...engineProps} />
      case 'card_order':      return <CardOrderEngine {...engineProps} />
      case 'dictation':
      case 'letter_assemble': return <DictationEngine {...engineProps} />
      case 'number_puzzle':
      case 'pattern_match':   return <NumberPuzzleEngine {...engineProps} />
      default:                return <MultipleChoiceEngine {...engineProps} />
    }
  }

  // rhythm_tap 은 전체 화면을 사용하므로 헤더를 겹치지 않게 처리
  const fullscreen = mission.missionType === 'rhythm_tap'

  return (
    <div className="screen" style={{ justifyContent: fullscreen ? 'center' : 'flex-start', padding: 0 }}>
      {!fullscreen && (
        <div style={{ width: '100%', padding: '14px 16px 4px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setScreen('dojoDetail')} style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>✕</button>
          <MentorAvatar mentorId={dojo.mentor.id} size={44} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{mission.title}</div>
            <div style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{mission.passCondition}</div>
          </div>
        </div>
      )}
      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: fullscreen ? 0 : '12px 16px 24px' }}>
        {renderEngine()}
      </div>
    </div>
  )
}
