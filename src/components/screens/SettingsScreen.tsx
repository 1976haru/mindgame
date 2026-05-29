import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { BottomNav } from '../common/BottomNav'

export function SettingsScreen() {
  const game = useAppStore(s => s.game)
  const profile = useAppStore(s => s.profile)
  const toggleMute = useAppStore(s => s.toggleMute)
  const setBirthday = useAppStore(s => s.setBirthday)
  const setParentPin = useAppStore(s => s.setParentPin)
  const resetAll = useAppStore(s => s.resetAll)
  const setScreen = useAppStore(s => s.setScreen)

  const [birthInput, setBirthInput] = useState(game.birthday || '')
  const [pinInput, setPinInput] = useState('')
  const [resetStep, setResetStep] = useState(0)

  const row: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 14, marginBottom: 10 }

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0 }}>
      <div style={{ width: '100%', padding: '18px 20px 4px' }}>
        <h2 style={{ fontSize: 24, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>설정</h2>
      </div>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '12px 16px' }}>
        {/* 소리 */}
        <div style={row}>
          <span>🔊 효과음</span>
          <button onClick={() => toggleMute('sfx')} style={{ padding: '6px 16px', borderRadius: 999, background: game.muteSfx ? 'rgba(255,255,255,0.1)' : 'var(--color-green)', color: game.muteSfx ? 'var(--color-text-soft)' : '#0f0f1e', fontWeight: 700 }}>
            {game.muteSfx ? '꺼짐' : '켜짐'}
          </button>
        </div>
        <div style={row}>
          <span>🎵 배경음</span>
          <button onClick={() => toggleMute('bgm')} style={{ padding: '6px 16px', borderRadius: 999, background: game.muteBgm ? 'rgba(255,255,255,0.1)' : 'var(--color-green)', color: game.muteBgm ? 'var(--color-text-soft)' : '#0f0f1e', fontWeight: 700 }}>
            {game.muteBgm ? '꺼짐' : '켜짐'}
          </button>
        </div>

        {/* 생일 */}
        <div style={{ ...row, flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
          <span>🎂 생일 등록 (계절 이벤트용)</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={birthInput} onChange={e => setBirthInput(e.target.value)} placeholder="MM-DD (예: 05-29)" maxLength={5}
              style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none' }} />
            <button onClick={() => { if (/^\d{2}-\d{2}$/.test(birthInput)) setBirthday(birthInput) }} style={{ padding: '0 16px', borderRadius: 10, background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>저장</button>
          </div>
          {game.birthday && <span style={{ fontSize: 12, color: 'var(--color-green)' }}>등록됨: {game.birthday} 🎉</span>}
        </div>

        {/* 부모 PIN */}
        <div style={{ ...row, flexDirection: 'column', alignItems: 'stretch', gap: 8 }}>
          <span>🔐 부모 PIN {game.parentPin ? '(등록됨)' : '(미등록)'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={pinInput} onChange={e => setPinInput(e.target.value.replace(/\D/g, ''))} placeholder="숫자 4자리" maxLength={4} inputMode="numeric"
              style={{ flex: 1, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.1)', color: 'var(--color-text)', border: 'none', letterSpacing: 4 }} />
            <button onClick={() => { if (pinInput.length === 4) { setParentPin(pinInput); setPinInput('') } }} style={{ padding: '0 16px', borderRadius: 10, background: 'var(--color-primary)', color: 'white', fontWeight: 700 }}>저장</button>
          </div>
          <button onClick={() => setScreen('parentReport')} style={{ padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.08)', color: 'var(--color-text)', fontSize: 14 }}>📊 부모 리포트 보기</button>
        </div>

        {/* 데이터 초기화 */}
        <div style={{ ...row, flexDirection: 'column', alignItems: 'stretch', gap: 8, borderColor: 'rgba(255,126,126,0.3)' }}>
          <span style={{ color: '#ff7e7e' }}>🗑️ 데이터 초기화</span>
          {resetStep === 0 && <button onClick={() => setResetStep(1)} style={{ padding: '10px', borderRadius: 10, background: 'rgba(255,126,126,0.15)', color: '#ff7e7e' }}>처음부터 다시 시작하기</button>}
          {resetStep === 1 && <button onClick={() => setResetStep(2)} style={{ padding: '10px', borderRadius: 10, background: 'rgba(255,126,126,0.25)', color: '#ff7e7e' }}>정말이에요? 한 번 더 눌러주세요</button>}
          {resetStep === 2 && <button onClick={() => resetAll()} style={{ padding: '10px', borderRadius: 10, background: '#ff5e5e', color: 'white', fontWeight: 700 }}>모든 정원을 지우고 초기화 ⚠️</button>}
        </div>

        {/* 앱 정보 */}
        <div style={{ textAlign: 'center', marginTop: 16, color: 'var(--color-text-soft)', fontSize: 12, lineHeight: 1.7 }}>
          <p>마음 정원: 솔로몬의 후계자 v2.0</p>
          <p>{profile?.name}님과 함께한 정원 💚</p>
          <p style={{ opacity: 0.6 }}>광고·추적 없는 안전한 어린이 앱</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
