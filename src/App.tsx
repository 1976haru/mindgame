import { useEffect } from 'react'
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
import { setSfxMuted } from './utils/sound'

export default function App() {
  const currentScreen = useAppStore(s => s.currentScreen)
  const loaded = useAppStore(s => s.loaded)
  const initialize = useAppStore(s => s.initialize)
  const muteSfx = useAppStore(s => s.game.muteSfx)

  useEffect(() => {
    if (!loaded) {
      const t = setTimeout(() => initialize(), 2000)
      return () => clearTimeout(t)
    }
  }, [loaded, initialize])

  useEffect(() => { setSfxMuted(muteSfx) }, [muteSfx])

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
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
