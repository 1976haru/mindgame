import { HeroDomain } from './heroes'

export interface Building {
  id: string
  name: string
  domain: HeroDomain
  cost: number              // 공감 에너지
  unlockEpisode: string     // 어느 에피소드 클리어 후 건설 가능
  description: string
  icon: string
}

// 15개 건물 (에피소드당 1개) — 도메인별 3개
export const BUILDINGS: Building[] = [
  // 기초질서
  { id: 'fountain', name: '공감의 분수', domain: '기초질서', cost: 30, unlockEpisode: 'ep01', icon: '⛲', description: '모두의 마음이 모이는 분수예요.' },
  { id: 'library', name: '지혜의 도서관', domain: '기초질서', cost: 50, unlockEpisode: 'ep02', icon: '📚', description: '책 속에 공정한 규칙이 담겨 있어요.' },
  { id: 'school', name: '한글학당', domain: '기초질서', cost: 80, unlockEpisode: 'ep03', icon: '🏫', description: '누구나 글을 배워 자기 권리를 알 수 있어요.' },
  // 약속과 책임
  { id: 'bell_tower', name: '약속의 종탑', domain: '약속과 책임', cost: 40, unlockEpisode: 'ep04', icon: '🔔', description: '약속을 알리는 맑은 종소리가 울려요.' },
  { id: 'trust_bridge', name: '신뢰의 다리', domain: '약속과 책임', cost: 60, unlockEpisode: 'ep05', icon: '🌉', description: '믿음으로 이어진 튼튼한 다리예요.' },
  { id: 'clock_tower', name: '시간의 시계탑', domain: '약속과 책임', cost: 90, unlockEpisode: 'ep06', icon: '🕰️', description: '모두의 시간이 소중하다는 걸 알려줘요.' },
  // 공정과 차별
  { id: 'scale_tower', name: '공정의 저울탑', domain: '공정과 차별', cost: 40, unlockEpisode: 'ep07', icon: '⚖️', description: '필요한 사람에게 더 주는 공정한 저울이에요.' },
  { id: 'equality_garden', name: '평등의 정원', domain: '공정과 차별', cost: 60, unlockEpisode: 'ep08', icon: '🌷', description: '누구나 좋아하는 일을 할 수 있는 정원이에요.' },
  { id: 'dignity_plaza', name: '존엄의 광장', domain: '공정과 차별', cost: 90, unlockEpisode: 'ep09', icon: '🟦', description: '모든 사람이 똑같이 귀하다는 광장이에요.' },
  // 권리와 의무
  { id: 'liberty_bell', name: '자유의 종', domain: '권리와 의무', cost: 50, unlockEpisode: 'ep10', icon: '🛎️', description: '서로를 존중하는 진짜 자유의 종소리예요.' },
  { id: 'responsibility_pillar', name: '책임의 기둥', domain: '권리와 의무', cost: 70, unlockEpisode: 'ep11', icon: '🏛️', description: '가진 만큼 책임을 다하는 든든한 기둥이에요.' },
  { id: 'citizen_hall', name: '시민의 회관', domain: '권리와 의무', cost: 100, unlockEpisode: 'ep12', icon: '🏢', description: '모두가 작은 의무를 나누는 회관이에요.' },
  // 안전과 보호
  { id: 'guardian_wall', name: '보호의 성벽', domain: '안전과 보호', cost: 50, unlockEpisode: 'ep13', icon: '🧱', description: '약한 친구를 지켜주는 든든한 성벽이에요.' },
  { id: 'honesty_lighthouse', name: '정직의 등대', domain: '안전과 보호', cost: 70, unlockEpisode: 'ep14', icon: '🗼', description: '거짓 없는 빛으로 모두를 지켜줘요.' },
  { id: 'sharing_granary', name: '나눔의 곳간', domain: '안전과 보호', cost: 110, unlockEpisode: 'ep15', icon: '🏯', description: '위험에 빠진 이웃과 나누는 따뜻한 곳간이에요.' }
]

export const BUILDING_BY_ID: Record<string, Building> =
  BUILDINGS.reduce((acc, b) => { acc[b.id] = b; return acc }, {} as Record<string, Building>)

export function getBuildingByEpisode(episodeId: string): Building | undefined {
  return BUILDINGS.find(b => b.unlockEpisode === episodeId)
}
