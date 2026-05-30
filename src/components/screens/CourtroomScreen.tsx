import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { playVoice } from '../../utils/voice'
import { getEpisodeById } from '../../data/episodes'
import { getHeroById } from '../../data/heroes'
import { BUILDING_BY_ID } from '../../data/buildings'
import { AnimalAvatar } from '../characters/AnimalCharacters'
import { SolomonOwl, SpeechBubble } from '../characters/SolomonOwl'
import { HeroCard } from '../heroes/HeroCard'
import { playSound } from '../../utils/sound'

type Step = 'situation' | 'plea' | 'choice' | 'explain' | 'verdict'

export function CourtroomScreen() {
  const activeEpisodeId = useAppStore(s => s.activeEpisodeId)
  const setScreen = useAppStore(s => s.setScreen)
  const clearEpisode = useAppStore(s => s.clearEpisode)

  const ep = activeEpisodeId ? getEpisodeById(activeEpisodeId) : undefined

  const [step, setStep] = useState<Step>('situation')
  const [panelIdx, setPanelIdx] = useState(0)
  const [wrongPick, setWrongPick] = useState<number | null>(null)
  const [explainDone, setExplainDone] = useState(false)
  const [reward, setReward] = useState<{ heroId?: string; buildingId?: string; reward: number } | null>(null)

  // 재판소 입장 시 솔로몬 안내 음성
  useEffect(() => {
    void playVoice('solomon_episode_intro')
  }, [])

  if (!ep) { setScreen('kingdom'); return null }

  const STEPS: Step[] = ['situation', 'plea', 'choice', 'explain', 'verdict']
  const stepNum = STEPS.indexOf(step)

  const handleChoice = (idx: number) => {
    if (ep.choices[idx].correct) {
      playSound('correct')
      void playVoice('solomon_episode_correct')
      setStep('explain')
    } else {
      playSound('wrong')
      void playVoice('solomon_episode_wrong')
      setWrongPick(idx)
      setTimeout(() => setWrongPick(null), 1200)
    }
  }

  const goVerdict = async () => {
    const r = await clearEpisode(ep.id)
    setReward(r)
    playSound('verdict')
    setStep('verdict')
  }

  const hero = reward?.heroId ? getHeroById(reward.heroId) : undefined
  const building = reward?.buildingId ? BUILDING_BY_ID[reward.buildingId] : undefined

  return (
    <div className="screen" style={{ justifyContent: 'flex-start', padding: 0, background: 'linear-gradient(180deg,#16162e 0%,#0f0f1e 100%)' }}>
      {/* 상단: 닫기 + 스텝 표시 */}
      <div style={{ width: '100%', padding: '16px 18px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => setScreen('episodeList')} style={{ padding: '6px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', fontSize: 16 }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, height: 5, borderRadius: 4, background: i <= stepNum ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)' }} />
          ))}
        </div>
      </div>
      <p style={{ fontSize: 16, color: 'var(--color-text-soft)', padding: '0 18px 6px' }}>⚖️ {ep.title}</p>

      <div style={{ flex: 1, width: '100%', overflowY: 'auto', padding: '8px 18px 24px', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {/* 1. 상황 */}
          {step === 'situation' && (
            <motion.div key="situation" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              {ep.situation[panelIdx].avatar && <AnimalAvatar id={ep.situation[panelIdx].avatar!} size={130} />}
              <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 16, padding: '18px 22px', maxWidth: 360, fontSize: 18, lineHeight: 1.6 }}>
                {ep.situation[panelIdx].caption}
              </div>
              <p style={{ fontSize: 16, color: 'var(--color-text-soft)' }}>{panelIdx + 1} / {ep.situation.length}</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => {
                if (panelIdx < ep.situation.length - 1) setPanelIdx(panelIdx + 1)
                else setStep('plea')
              }} style={btn}>다음 →</motion.button>
            </motion.div>
          )}

          {/* 2. 호소 */}
          {step === 'plea' && (
            <motion.div key="plea" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
              <p style={{ textAlign: 'center', color: 'var(--color-text-soft)', fontSize: 16 }}>두 친구의 이야기를 들어봐요</p>
              {ep.characters.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.3 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, flexDirection: i % 2 ? 'row-reverse' : 'row' }}>
                  <AnimalAvatar id={c.avatar} size={80} mood={i % 2 ? 'sad' : 'normal'} />
                  <div style={{ flex: 1, background: i % 2 ? 'rgba(255,158,199,0.14)' : 'rgba(124,92,255,0.14)', borderRadius: 16, padding: '12px 16px' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-accent)', marginBottom: 2 }}>{c.name}</div>
                    <div style={{ fontSize: 18, lineHeight: 1.5 }}>"{c.plea}"</div>
                  </div>
                </motion.div>
              ))}
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep('choice')} style={btn}>판단하러 가기 ⚖️</motion.button>
            </motion.div>
          )}

          {/* 3. 선택 */}
          {step === 'choice' && (
            <motion.div key="choice" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
              <SolomonOwl size={120} expression="thinking" />
              <h3 style={{ textAlign: 'center', fontSize: 20, color: 'var(--color-accent)', fontFamily: 'var(--font-script)' }}>{ep.question}</h3>
              {ep.choices.map((c, i) => (
                <motion.button key={i}
                  animate={wrongPick === i ? { x: [0, -8, 8, -8, 0] } : {}}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleChoice(i)}
                  style={{
                    padding: '16px 18px', borderRadius: 16, fontSize: 16, textAlign: 'left', lineHeight: 1.4,
                    background: wrongPick === i ? 'rgba(248,113,113,0.25)' : ['rgba(96,165,250,0.15)', 'rgba(110,231,183,0.15)', 'rgba(251,191,36,0.15)'][i % 3],
                    border: `2px solid ${wrongPick === i ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
                    color: 'var(--color-text)'
                  }}>
                  {['①', '②', '③'][i]} {c.text}
                </motion.button>
              ))}
              {wrongPick !== null && <p style={{ textAlign: 'center', color: '#f87171', fontSize: 16 }}>음... 다시 한 번 생각해볼까요? 🤔</p>}
            </motion.div>
          )}

          {/* 4. 해설 */}
          {step === 'explain' && (
            <motion.div key="explain" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
              <SolomonOwl size={140} expression="smile" />
              <SpeechBubble text={ep.explanation} speed={28} onDone={() => setExplainDone(true)} />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: explainDone ? 1 : 0 }} style={{ width: '100%', maxWidth: 360 }}>
                <div style={{ background: 'linear-gradient(135deg,#fbbf24,#f59e0b)', borderRadius: 14, padding: '12px 16px', color: '#1f2937', textAlign: 'center', marginBottom: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, opacity: 0.7 }}>오늘의 법 원리</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>📜 {ep.lawPrinciple}</div>
                </div>
                {ep.realLaw && <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--color-text-soft)' }}>관련 법: {ep.realLaw}</p>}
                <motion.button whileTap={{ scale: 0.95 }} onClick={goVerdict} style={{ ...btn, marginTop: 10 }}>판결 선언 ⚖️</motion.button>
              </motion.div>
            </motion.div>
          )}

          {/* 5. 판결 + 보상 */}
          {step === 'verdict' && (
            <motion.div key="verdict" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
              <motion.div initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }} style={{ fontSize: 70 }}>⚖️</motion.div>
              <h2 style={{ fontSize: 26, fontFamily: 'var(--font-script)', color: 'var(--color-accent)' }}>판결!</h2>
              <p style={{ textAlign: 'center', color: 'var(--color-text-soft)', fontSize: 16 }}>현명한 판단이었어요. 왕국에 빛이 돌아옵니다 ✨</p>

              {hero && (
                <motion.div initial={{ scale: 0, rotateY: 180 }} animate={{ scale: 1, rotateY: 0 }} transition={{ delay: 0.3, type: 'spring' }}>
                  <p style={{ textAlign: 'center', fontSize: 16, color: 'var(--color-accent)', marginBottom: 6 }}>🎴 새로운 영웅 카드 획득!</p>
                  <HeroCard hero={hero} width={210} />
                </motion.div>
              )}

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                {building && <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '8px 14px', fontSize: 16 }}>{building.icon} {building.name} 건설 가능!</div>}
                <div style={{ background: 'rgba(124,92,255,0.2)', borderRadius: 12, padding: '8px 14px', fontSize: 16, color: 'var(--color-accent)' }}>💜 공감 +{reward?.reward}</div>
              </motion.div>

              <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} whileTap={{ scale: 0.95 }}
                onClick={() => setScreen('kingdom')} style={{ ...btn, marginTop: 8 }}>왕국으로 돌아가기 🏰</motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const btn: React.CSSProperties = {
  alignSelf: 'center', padding: '14px 32px', fontSize: 17, fontWeight: 700, borderRadius: 'var(--radius-md)',
  background: 'linear-gradient(135deg,#7c5cff,#ff9ec7)', color: 'white', boxShadow: 'var(--shadow-soft)'
}
