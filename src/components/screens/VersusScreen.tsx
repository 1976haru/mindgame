import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { MissionConfig } from '../../data/dojos'
import { MultipleChoiceEngine } from '../missions/engines/MultipleChoiceEngine'
import { EngineResult } from '../missions/engines/types'

type Stage = 'setup' | 'p1' | 'ready2' | 'p2' | 'result'

const QUIZ: MissionConfig = {
  needCorrect: 0,
  questions: [
    { prompt: '우리나라의 수도는?', emoji: '🏙️', choices: ['서울', '부산', '제주', '대구'], answer: 0 },
    { prompt: '2 + 3 = ?', choices: ['5', '4', '6', '7'], answer: 0 },
    { prompt: '한글을 만든 임금은?', choices: ['세종대왕', '이순신', '단군', '왕건'], answer: 0 },
    { prompt: '무지개는 몇 가지 색?', emoji: '🌈', choices: ['7가지', '3가지', '5가지', '10가지'], answer: 0 },
    { prompt: '물이 얼면 무엇이 될까요?', emoji: '🧊', choices: ['얼음', '수증기', '구름', '비'], answer: 0 }
  ]
}

export function VersusScreen() {
  const setScreen = useAppStore(s => s.setScreen)
  const [stage, setStage] = useState<Stage>('setup')
  const [n1, setN1] = useState('')
  const [n2, setN2] = useState('')
  const [s1, setS1] = useState(0)
  const [s2, setS2] = useState(0)

  const name1 = n1.trim() || '1번 친구'
  const name2 = n2.trim() || '2번 친구'

  const onP1Done = (_ok: boolean, r?: EngineResult) => { setS1(r?.score ?? 0); setStage('ready2') }
  const onP2Done = (_ok: boolean, r?: EngineResult) => { setS2(r?.score ?? 0); setStage('result') }

  const winner = s1 > s2 ? name1 : s2 > s1 ? name2 : null

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('dojoHall')} style={{ padding: '8px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>←</button>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>🤺 친구 대결</h2>
      </div>

      <div style={{ flex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 16 }}>
        {stage === 'setup' && (
          <>
            <p style={{ fontSize: 18, textAlign: 'center', lineHeight: 1.5 }}>같은 폰으로 두 친구가 번갈아 풀어요!<br />똑같은 5문제 퀴즈로 겨뤄봐요.</p>
            <input value={n1} onChange={e => setN1(e.target.value)} placeholder="1번 친구 이름" maxLength={8}
              style={{ width: '100%', maxWidth: 300, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none', textAlign: 'center' }} />
            <input value={n2} onChange={e => setN2(e.target.value)} placeholder="2번 친구 이름" maxLength={8}
              style={{ width: '100%', maxWidth: 300, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none', textAlign: 'center' }} />
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStage('p1')}
              style={{ padding: '14px 36px', fontSize: 20, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white' }}>대결 시작!</motion.button>
          </>
        )}

        {stage === 'p1' && (
          <>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#60a5fa' }}>🔵 {name1} 차례!</p>
            <MultipleChoiceEngine config={QUIZ} color="#60a5fa" onComplete={onP1Done} />
          </>
        )}

        {stage === 'ready2' && (
          <>
            <p style={{ fontSize: 20, fontWeight: 700 }}>{name1}: {s1}점 완료!</p>
            <p style={{ fontSize: 18, textAlign: 'center' }}>이제 폰을 {name2}에게 넘겨주세요.</p>
            <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStage('p2')}
              style={{ padding: '14px 36px', fontSize: 20, fontWeight: 700, borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#ec4899,#ff9ec7)', color: 'white' }}>🔴 {name2} 시작!</motion.button>
          </>
        )}

        {stage === 'p2' && (
          <>
            <p style={{ fontSize: 20, fontWeight: 700, color: '#ec4899' }}>🔴 {name2} 차례!</p>
            <MultipleChoiceEngine config={QUIZ} color="#ec4899" onComplete={onP2Done} />
          </>
        )}

        {stage === 'result' && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 64 }}>{winner ? '🏆' : '🤝'}</div>
            <h2 style={{ fontSize: 26, fontFamily: 'var(--font-script)', color: 'var(--color-accent)', margin: '8px 0' }}>
              {winner ? `${winner} 승리!` : '비겼어요!'}
            </h2>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center', margin: '16px 0' }}>
              <div><div style={{ fontSize: 16, color: '#60a5fa' }}>{name1}</div><div style={{ fontSize: 32, fontWeight: 700 }}>{s1}</div></div>
              <div style={{ fontSize: 28, alignSelf: 'center' }}>:</div>
              <div><div style={{ fontSize: 16, color: '#ec4899' }}>{name2}</div><div style={{ fontSize: 32, fontWeight: 700 }}>{s2}</div></div>
            </div>
            <p style={{ fontSize: 16, color: 'var(--color-text-soft)', marginBottom: 16 }}>{winner ? `${winner === name1 ? name2 : name1}도 정말 잘했어요!` : '두 친구 모두 멋져요!'}</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button onClick={() => { setS1(0); setS2(0); setStage('p1') }} style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', fontWeight: 700 }}>다시 한번!</button>
              <button onClick={() => setScreen('dojoHall')} style={{ padding: '12px 24px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', fontWeight: 700 }}>도장으로</button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
