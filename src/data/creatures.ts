// 🦋 정원 생물 (Phase 5)
// 식물 성장·돌봄·날씨·장식 조건에 따라 생물이 찾아온다. 일부는 수학과 연결.
import type { GameState } from '../utils/storage'
import type { GardenEntry } from '../utils/storage'
import type { WeatherType } from '../utils/weather'
import { entryStage } from './growth'
import { levelForXp } from './gardenLevels'

export interface CreatureCtx {
  game: GameState
  entries: GardenEntry[]
  isNight: boolean
  weather: WeatherType
}

export interface Creature {
  id: string
  name: string
  icon: string
  condition: string         // 사람이 읽는 등장 조건
  behavior: string
  mathBonus?: string
  met: (ctx: CreatureCtx) => boolean
}

function bloomCount(entries: GardenEntry[]): number {
  return entries.filter(e => { const s = entryStage(e); return s === 'bloom' || s === 'fruit' }).length
}
function fruitCount(entries: GardenEntry[]): number {
  return entries.filter(e => entryStage(e) === 'fruit').length
}
function hasDeco(game: GameState, decoId: string): boolean {
  return game.placedDecorations.some(p => p.decoId === decoId)
}

export const CREATURES: Creature[] = [
  { id: 'butterfly', name: '나비', icon: '🦋', condition: '꽃이 활짝 핀 식물 3개 이상', behavior: '꽃 사이를 날아다녀요',
    mathBonus: '나비가 앉은 꽃 개수 세기', met: c => bloomCount(c.entries) >= 3 },
  { id: 'bee', name: '꿀벌', icon: '🐝', condition: '꽃 5개 이상', behavior: '꿀을 모아요',
    mathBonus: '벌집에 꿀 나누기 (나눗셈)', met: c => bloomCount(c.entries) >= 5 },
  { id: 'bird', name: '새', icon: '🐦', condition: '열매 맺은 식물', behavior: '새집에 둥지를 틀어요',
    met: c => fruitCount(c.entries) >= 1 },
  { id: 'ladybug', name: '무당벌레', icon: '🐞', condition: '잡초 뽑기 10회', behavior: '해충을 잡아줘요',
    mathBonus: '무당벌레 점 개수 세기', met: c => c.game.weedCount >= 10 },
  { id: 'firefly', name: '반딧불이', icon: '✨', condition: '밤 시간 (20시~)', behavior: '밤 정원에 반짝여요',
    met: c => c.isNight },
  { id: 'frog', name: '개구리', icon: '🐸', condition: '연못 장식 설치', behavior: '연못에서 폴짝 뛰어요',
    met: c => hasDeco(c.game, 'pond') },
  { id: 'rabbit', name: '토끼', icon: '🐰', condition: '정원 레벨 3 이상', behavior: '정원을 뛰어다녀요',
    met: c => levelForXp(c.game.gardenXp) >= 3 },
  { id: 'snail', name: '달팽이', icon: '🐌', condition: '비 오는 날', behavior: '천천히 기어가요 (기다림도 멋진 거예요)',
    met: c => c.weather === 'rain' },
]

export function activeCreatures(ctx: CreatureCtx): Creature[] {
  return CREATURES.filter(c => c.met(ctx))
}
