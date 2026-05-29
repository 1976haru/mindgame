import { GameState } from './storage'
import { EmotionType } from '../data/emotions'

const ALL_AREAS = ['garden', 'kingdom', 'collection', 'minigames']
const ALL_EMOTIONS: EmotionType[] = ['joy', 'sad', 'angry', 'fear', 'excited', 'proud', 'bored', 'calm']

/**
 * 현재 게임 상태에서 잠금 해제되어야 하는 레전더리 식물 id 목록을 계산.
 * (이미 해제된 것 포함 — 호출부에서 신규분만 골라냄)
 */
export function computeUnlockedLegendaries(g: GameState): string[] {
  const ids: string[] = []
  const att = g.attendanceDates.length
  const cleared = g.clearedEpisodes.length
  const allEmotions30 = ALL_EMOTIONS.every(e => g.emotionCounts[e] >= 30)
  const everyEmotionOnce = ALL_EMOTIONS.every(e => g.emotionCounts[e] >= 1)

  // joy
  if (g.consecutiveJoyDays >= 7) ids.push('angel_laughflower')
  if (att >= 30) ids.push('diamond_joygem')
  // sad
  if (g.emotionCounts.sad >= 1 && cleared >= 1) ids.push('comfort_rainbow')
  if (g.sadToCalmTransitions >= 3) ids.push('healing_lily')
  // angry
  if (g.angryBreathingCount >= 5) ids.push('peace_olive')
  if (cleared >= 1 && g.emotionCounts.angry >= 3) ids.push('justice_swordflower')
  // fear
  if (g.fearOvercome >= 5) ids.push('courage_lionmane')
  if (g.clearedEpisodes.includes('ep13')) ids.push('guardian_angeltree')
  // excited
  if (g.emotionCounts.excited >= 1 && g.visitedAreas.includes('kingdom')) ids.push('destiny_starflower')
  if (allEmotions30) ids.push('dream_goldentree')
  // proud
  if (cleared >= 5) ids.push('solomon_wisdomflower')
  if (g.unlockedHeroes.length >= 15) ids.push('hero_footprint')
  // bored
  if (g.paintedCount >= 1) ids.push('inventor_garden')
  if (ALL_AREAS.every(a => g.visitedAreas.includes(a))) ids.push('curiosity_paradise')
  // calm
  if (att >= 100) ids.push('thousand_year_silencetree')
  if (g.emotionCounts.calm >= 8 && everyEmotionOnce) ids.push('heart_essenceflower')

  return ids
}

/** 보물상자 마일스톤 (출석일 기준) */
export const TREASURE_MILESTONES = [7, 14, 21, 30]

export function pendingTreasureMilestone(g: GameState): number | null {
  const att = g.attendanceDates.length
  for (const m of TREASURE_MILESTONES) {
    if (att >= m && !g.treasureClaimedMilestones.includes(m)) return m
  }
  return null
}

/** 모든 영역의 빛이 돌아왔는지 (왕국 부활 = 15 에피소드 클리어) */
export function isKingdomFullyRestored(g: GameState): boolean {
  return g.clearedEpisodes.length >= 15
}
