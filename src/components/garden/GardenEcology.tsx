// 🦋🌤️ 정원 생태계 오버레이 (Phase 5) — 날씨 효과 + 찾아온 생물
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { activeCreatures } from '../../data/creatures'
import { getTodayWeather, WEATHER_INFO, WeatherType } from '../../utils/weather'
import { isNightTime } from '../../utils/timeUtils'

function WeatherFx({ weather }: { weather: WeatherType }) {
  if (weather === 'rain' || weather === 'snow') {
    const emoji = weather === 'rain' ? '💧' : '❄️'
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: '110%', opacity: [0, 0.8, 0] }}
            transition={{ duration: weather === 'rain' ? 1.1 : 3, delay: i * 0.2, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', left: `${(i * 7 + 5) % 100}%`, fontSize: weather === 'rain' ? 14 : 16 }}
          >{emoji}</motion.div>
        ))}
      </div>
    )
  }
  if (weather === 'fog') {
    return <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(180deg, rgba(220,220,235,0.18), rgba(220,220,235,0.06))', backdropFilter: 'blur(1px)' }} />
  }
  if (weather === 'rainbow') {
    return <div style={{ position: 'absolute', top: 8, left: 0, right: 0, textAlign: 'center', fontSize: 40, pointerEvents: 'none' }}>🌈</div>
  }
  return null
}

export function GardenEcology() {
  const game = useAppStore(s => s.game)
  const entries = useAppStore(s => s.entries)
  const weather = useMemo(() => getTodayWeather(), [])
  const isNight = isNightTime()
  const creatures = useMemo(
    () => activeCreatures({ game, entries, isNight, weather }),
    [game, entries, isNight, weather],
  )

  return (
    <>
      <WeatherFx weather={weather} />

      {/* 날씨 배지 */}
      <div style={{ position: 'absolute', right: 12, top: 56, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 999, padding: '4px 10px', fontSize: 14, zIndex: 3 }}>
        {WEATHER_INFO[weather].emoji} <span style={{ color: 'var(--color-text-soft)' }}>{WEATHER_INFO[weather].name}</span>
      </div>

      {/* 찾아온 생물 */}
      {creatures.map((c, i) => (
        <motion.div key={c.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, 30, -20, 10, 0], y: [0, -16, 8, -10, 0] }}
          transition={{ opacity: { duration: 0.6 }, x: { duration: 8 + i, repeat: Infinity }, y: { duration: 6 + i, repeat: Infinity } }}
          title={`${c.name} · ${c.behavior}`}
          style={{ position: 'absolute', left: `${12 + (i * 17) % 70}%`, top: `${22 + (i * 13) % 45}%`, fontSize: 30, zIndex: 2, pointerEvents: 'none' }}
        >
          {c.icon}
        </motion.div>
      ))}
    </>
  )
}
