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

export default function App() {
  const currentScreen = useAppStore(s => s.currentScreen)
  const loaded = useAppStore(s => s.loaded)
  const initialize = useAppStore(s => s.initialize)

  useEffect(() => {
    if (!loaded) {
      // SplashScreen에서 호출하지만 안전장치
      const t = setTimeout(() => initialize(), 2000)
      return () => clearTimeout(t)
    }
  }, [loaded, initialize])

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
      default:                return <SplashScreen />
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
