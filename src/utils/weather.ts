// 🌤️ 날씨 시스템 (Phase 5)
// 날짜(하루 단위 고정) + 계절 기반. 비는 자동으로 식물에 물을 주고, 슬픔 식물이 좋아한다(공감).
import { getCurrentSeason, Season } from './seasonUtils'
import { todayString } from './helpers'

export type WeatherType = 'sunny' | 'rain' | 'rainbow' | 'snow' | 'fog'

export interface WeatherInfo {
  type: WeatherType
  name: string
  emoji: string
  description: string
  autoWater: boolean        // 자동으로 식물에 물을 주는가
}

export const WEATHER_INFO: Record<WeatherType, WeatherInfo> = {
  sunny: { type: 'sunny', name: '맑음', emoji: '☀️', description: '햇살이 따뜻한 날이에요', autoWater: false },
  rain: { type: 'rain', name: '비', emoji: '🌧️', description: '비가 내려 식물이 시원해해요', autoWater: true },
  rainbow: { type: 'rainbow', name: '무지개', emoji: '🌈', description: '비 갠 뒤 무지개가 떴어요! 특별한 날', autoWater: false },
  snow: { type: 'snow', name: '눈', emoji: '❄️', description: '눈이 내려요. 식물이 포근히 쉬는 시간', autoWater: false },
  fog: { type: 'fog', name: '안개', emoji: '🌫️', description: '안개가 살포시 정원을 감쌌어요', autoWater: false },
}

// 날짜 문자열을 안정적인 숫자로 (하루 동안 같은 날씨 유지)
function hashDate(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

function weatherPoolFor(season: Season): WeatherType[] {
  // 가중치: 맑음을 가장 흔하게, 계절별 특색 추가
  const base: WeatherType[] = ['sunny', 'sunny', 'sunny', 'rain', 'fog', 'rainbow']
  if (season === 'winter') return [...base, 'snow', 'snow']
  if (season === 'summer') return [...base, 'rain', 'sunny']
  if (season === 'spring') return [...base, 'rainbow', 'rain']
  return base
}

// 오늘의 날씨 (하루 동안 고정)
export function getTodayWeather(): WeatherType {
  const season = getCurrentSeason()
  const pool = weatherPoolFor(season)
  const idx = hashDate(todayString()) % pool.length
  return pool[idx]
}
