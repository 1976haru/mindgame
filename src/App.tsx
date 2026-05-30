import { useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAppStore } from './store/appStore'
import { SplashScreen } from './components/screens/SplashScreen'
import { NameInputScreen } from './components/screens/NameInputScreen'
import { GardenAwakenScreen } from './components/screens/GardenAwakenScreen'
import { GardenScreen } from './components/screens/GardenScreen'
import { EmotionSelectScreen } from './components/screens/EmotionSelectScreen'
import { IntensitySelectScreen } from './components/screens/IntensitySelectScreen'
import { PlantGrowingScreen } from './components/screens/PlantGrowingScreen'
import { FriendVisitScreen } from './components/screens/FriendVisitScreen'
import { BreathingScreen } from './components/minigames/BreathingScreen'
import { MinigamesScreen } from './components/screens/MinigamesScreen'
import { WorryBubbleScreen } from './components/minigames/WorryBubbleScreen'
import { GratitudeStarScreen } from './components/minigames/GratitudeStarScreen'
import { ColorPaintScreen } from './components/minigames/ColorPaintScreen'
import { SolomonIntroScreen } from './components/screens/SolomonIntroScreen'
import { KingdomScreen } from './components/screens/KingdomScreen'
import { CollectionScreen } from './components/screens/CollectionScreen'
import { HeroCollectionScreen } from './components/screens/HeroCollectionScreen'
import { SettingsScreen } from './components/screens/SettingsScreen'
import { EpisodeListScreen } from './components/screens/EpisodeListScreen'
import { CourtroomScreen } from './components/screens/CourtroomScreen'
import { FusionScreen } from './components/screens/FusionScreen'
import { TreasureChestScreen } from './components/screens/TreasureChestScreen'
import { MyLawbookScreen } from './components/screens/MyLawbookScreen'
import { ParentReportScreen } from './components/screens/ParentReportScreen'
import { DojoHallScreen } from './components/screens/DojoHallScreen'
import { DojoDetailScreen } from './components/screens/DojoDetailScreen'
import { MissionResultScreen } from './components/screens/MissionResultScreen'
import { MissionScreen } from './components/screens/MissionScreen'
import { DailyChallengeScreen } from './components/screens/DailyChallengeScreen'
import { VersusScreen } from './components/screens/VersusScreen'
import { SolomonExamScreen } from './components/screens/SolomonExamScreen'
import { ShihanCutsceneScreen } from './components/screens/ShihanCutsceneScreen'
import { HallOfFameScreen } from './components/screens/HallOfFameScreen'
import { Subtitle } from './components/common/Subtitle'
import * as Tone from 'tone'
import { setSfxMuted, setSoundVolume } from './utils/sound'
import { setVoiceMuted, setVoiceVolume } from './utils/voice'
import { startBGM, stopBGM, setMusicMuted, setMusicVolume, BgmType } from './utils/music'
import { setMelodyMuted } from './utils/melodies'
import { setSfxVolume } from './utils/sfx'
import { Screen } from './store/appStore'

// 화면별 배경음악 매핑. splash/nameInput은 첫 인터랙션 전이라 무음.
function bgmForScreen(screen: Screen): BgmType | null {
  if (['splash', 'nameInput'].includes(screen)) return null
  if (['dojoHall', 'dojoDetail', 'mission', 'missionResult', 'solomonExam', 'shihanCutscene', 'dailyChallenge', 'versus'].includes(screen)) return 'dojo'
  if (['kingdom', 'episodeList', 'courtroom', 'solomonIntro', 'hallOfFame'].includes(screen)) return 'kingdom'
  // 그 외(정원 계열): 밤(20시~6시)이면 잔잔한 밤 테마
  const hour = new Date().getHours()
  return hour >= 20 || hour < 6 ? 'night' : 'garden'
}

// 인증서 화면은 jsPDF·html2canvas(무거움)를 쓰므로 지연 로딩 → 메인 번들 경량화
const CertificateScreen = lazy(() => import('./components/screens/CertificateScreen').then(m => ({ default: m.CertificateScreen })))

export default function App() {
  const currentScreen = useAppStore(s => s.currentScreen)
  const loaded = useAppStore(s => s.loaded)
  const initialize = useAppStore(s => s.initialize)
  const muteSfx = useAppStore(s => s.game.muteSfx)
  const muteBgm = useAppStore(s => s.game.muteBgm)
  const muteVoice = useAppStore(s => s.game.muteVoice)
  const masterVolume = useAppStore(s => s.game.masterVolume)

  useEffect(() => {
    if (!loaded) {
      const t = setTimeout(() => initialize(), 2000)
      return () => clearTimeout(t)
    }
  }, [loaded, initialize])

  // 첫 사용자 인터랙션에서 오디오 활성화 (브라우저 자동재생 정책)
  useEffect(() => {
    const unlock = () => { void Tone.start() }
    window.addEventListener('pointerdown', unlock, { once: true })
    return () => window.removeEventListener('pointerdown', unlock)
  }, [])

  // 음소거 설정 동기화
  useEffect(() => { setSfxMuted(muteSfx) }, [muteSfx])
  useEffect(() => { setVoiceMuted(muteVoice) }, [muteVoice])
  useEffect(() => { setMusicMuted(muteBgm); setMelodyMuted(muteBgm) }, [muteBgm])

  // 전체 음량 동기화
  useEffect(() => {
    setSoundVolume(masterVolume)
    setMusicVolume(masterVolume)
    setVoiceVolume(masterVolume)
    setSfxVolume(masterVolume)
  }, [masterVolume])

  // 화면 전환에 따른 배경음악 (음소거면 자동으로 무음)
  useEffect(() => {
    const type = bgmForScreen(currentScreen)
    if (!type) { stopBGM(); return }
    void startBGM(type)
  }, [currentScreen, muteBgm])

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':          return <SplashScreen />
      case 'nameInput':       return <NameInputScreen />
      case 'gardenAwaken':    return <GardenAwakenScreen />
      case 'garden':          return <GardenScreen />
      case 'emotionSelect':   return <EmotionSelectScreen />
      case 'intensitySelect': return <IntensitySelectScreen />
      case 'plantGrowing':    return <PlantGrowingScreen />
      case 'friendVisit':     return <FriendVisitScreen />
      case 'breathing':       return <BreathingScreen />
      case 'minigames':       return <MinigamesScreen />
      case 'worryBubble':     return <WorryBubbleScreen />
      case 'gratitudeStar':   return <GratitudeStarScreen />
      case 'colorPaint':      return <ColorPaintScreen />
      case 'solomonIntro':    return <SolomonIntroScreen />
      case 'kingdom':         return <KingdomScreen />
      case 'collection':      return <CollectionScreen />
      case 'heroCollection':  return <HeroCollectionScreen />
      case 'settings':        return <SettingsScreen />
      case 'episodeList':     return <EpisodeListScreen />
      case 'courtroom':       return <CourtroomScreen />
      case 'fusion':          return <FusionScreen />
      case 'treasureChest':   return <TreasureChestScreen />
      case 'myLawbook':       return <MyLawbookScreen />
      case 'parentReport':    return <ParentReportScreen />
      case 'dojoHall':        return <DojoHallScreen />
      case 'dojoDetail':      return <DojoDetailScreen />
      case 'mission':         return <MissionScreen />
      case 'missionResult':   return <MissionResultScreen />
      case 'dailyChallenge':  return <DailyChallengeScreen />
      case 'versus':          return <VersusScreen />
      case 'solomonExam':     return <SolomonExamScreen />
      case 'shihanCutscene':  return <ShihanCutsceneScreen />
      case 'hallOfFame':      return <HallOfFameScreen />
      case 'certificate':     return <CertificateScreen />
      default:                return <GardenScreen />
    }
  }

  return (
    <>
      <div className="starry-bg" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Suspense fallback={<div className="screen"><div style={{ fontSize: 40 }}>🌱</div></div>}>
            {renderScreen()}
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Subtitle />
    </>
  )
}
