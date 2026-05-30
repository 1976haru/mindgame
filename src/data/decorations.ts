// 🎍 정원 장식 + 테마 (Phase 4)
// 공감 에너지로 구매해 정원에 자유롭게 배치. 일부는 생물 등장 조건(Phase 5)과 연결.

export type DecoCategory = 'structure' | 'water' | 'light' | 'nature' | 'fun'

export interface Decoration {
  id: string
  name: string
  emoji: string
  cost: number              // 공감 에너지
  category: DecoCategory
  unlockLevel: number       // 이 정원 레벨부터 구매 가능
}

export const DECORATIONS: Decoration[] = [
  // structure
  { id: 'fence', name: '울타리', emoji: '🪵', cost: 4, category: 'structure', unlockLevel: 2 },
  { id: 'bench', name: '벤치', emoji: '🪑', cost: 6, category: 'structure', unlockLevel: 2 },
  { id: 'signpost', name: '표지판', emoji: '🪧', cost: 4, category: 'structure', unlockLevel: 2 },
  { id: 'windmill', name: '풍차', emoji: '🎡', cost: 14, category: 'structure', unlockLevel: 4 },
  { id: 'tent', name: '텐트', emoji: '⛺', cost: 12, category: 'structure', unlockLevel: 4 },
  // water (생물 등장 조건)
  { id: 'pond', name: '연못', emoji: '🪷', cost: 10, category: 'water', unlockLevel: 3 },
  { id: 'fountain', name: '분수', emoji: '⛲', cost: 16, category: 'water', unlockLevel: 4 },
  { id: 'well', name: '우물', emoji: '🪣', cost: 8, category: 'water', unlockLevel: 3 },
  // light
  { id: 'lamp', name: '가로등', emoji: '🏮', cost: 8, category: 'light', unlockLevel: 3 },
  { id: 'lantern', name: '랜턴', emoji: '🕯️', cost: 5, category: 'light', unlockLevel: 2 },
  { id: 'star_string', name: '별 전구', emoji: '🌟', cost: 10, category: 'light', unlockLevel: 3 },
  // nature
  { id: 'mushroom', name: '버섯', emoji: '🍄', cost: 3, category: 'nature', unlockLevel: 2 },
  { id: 'rock', name: '바위', emoji: '🪨', cost: 2, category: 'nature', unlockLevel: 2 },
  { id: 'birdhouse', name: '새집', emoji: '🏚️', cost: 9, category: 'nature', unlockLevel: 3 },
  { id: 'rainbow', name: '무지개', emoji: '🌈', cost: 20, category: 'nature', unlockLevel: 5 },
  { id: 'cherry_tree', name: '벚나무', emoji: '🌸', cost: 15, category: 'nature', unlockLevel: 4 },
  { id: 'palm', name: '야자수', emoji: '🌴', cost: 12, category: 'nature', unlockLevel: 4 },
  // fun
  { id: 'swing', name: '그네', emoji: '🛝', cost: 11, category: 'fun', unlockLevel: 3 },
  { id: 'balloon', name: '풍선', emoji: '🎈', cost: 5, category: 'fun', unlockLevel: 2 },
  { id: 'kite', name: '연', emoji: '🪁', cost: 6, category: 'fun', unlockLevel: 3 },
  { id: 'gift', name: '선물상자', emoji: '🎁', cost: 7, category: 'fun', unlockLevel: 3 },
  { id: 'castle', name: '모래성', emoji: '🏰', cost: 18, category: 'fun', unlockLevel: 5 },
]

export const DECO_BY_ID: Record<string, Decoration> = DECORATIONS.reduce(
  (acc, d) => { acc[d.id] = d; return acc },
  {} as Record<string, Decoration>,
)

export const CATEGORY_LABELS: Record<DecoCategory, string> = {
  structure: '구조물', water: '물', light: '조명', nature: '자연', fun: '놀이',
}

// === 정원 테마 ===
export interface GardenTheme {
  id: string
  name: string
  emoji: string
  cost: number
  background: string        // CSS 그라데이션
}

export const GARDEN_THEMES: GardenTheme[] = [
  { id: 'default', name: '기본', emoji: '🌿', cost: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(94,235,183,0.05) 60%, rgba(94,235,183,0.15) 100%)' },
  { id: 'sunset', name: '노을 정원', emoji: '🌅', cost: 12, background: 'linear-gradient(180deg, rgba(255,158,199,0.12) 0%, rgba(251,191,36,0.12) 60%, rgba(124,92,255,0.18) 100%)' },
  { id: 'space', name: '우주 정원', emoji: '🪐', cost: 20, background: 'linear-gradient(180deg, rgba(20,20,50,0.5) 0%, rgba(124,92,255,0.25) 100%)' },
  { id: 'candy', name: '사탕 정원', emoji: '🍬', cost: 20, background: 'linear-gradient(180deg, rgba(255,158,199,0.2) 0%, rgba(167,139,250,0.2) 100%)' },
  { id: 'ocean', name: '바다 정원', emoji: '🌊', cost: 16, background: 'linear-gradient(180deg, rgba(126,179,255,0.15) 0%, rgba(94,235,183,0.2) 100%)' },
]

export const THEME_BY_ID: Record<string, GardenTheme> = GARDEN_THEMES.reduce(
  (acc, t) => { acc[t.id] = t; return acc },
  {} as Record<string, GardenTheme>,
)
