export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export function getCurrentSeason(): Season {
  const m = new Date().getMonth() + 1
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  if (m >= 9 && m <= 11) return 'autumn'
  return 'winter'
}

export const SEASON_INFO: Record<Season, { label: string; emoji: string }> = {
  spring: { label: '봄', emoji: '🌸' },
  summer: { label: '여름', emoji: '☀️' },
  autumn: { label: '가을', emoji: '🍂' },
  winter: { label: '겨울', emoji: '❄️' }
}
