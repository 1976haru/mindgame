export type HeroDomain = '기초질서' | '약속과 책임' | '공정과 차별' | '권리와 의무' | '안전과 보호'
export type HeroRarity = 'silver' | 'gold' | 'platinum'

export interface Hero {
  id: string
  name: string
  era: string                 // 시대
  domain: HeroDomain
  rarity: HeroRarity
  quote: string               // 명언 (어린이 버전으로 풀이)
  achievement: string         // 업적 한 줄
  childFriendlyStory: string  // 어린이용 일화 (3~4문장)
  unlockEpisodeId: string     // 어느 에피소드 클리어 시 획득
}

// 도메인 아이콘
export const DOMAIN_ICONS: Record<HeroDomain, string> = {
  '기초질서': '🚦',
  '약속과 책임': '🤝',
  '공정과 차별': '⚖️',
  '권리와 의무': '🏛️',
  '안전과 보호': '🛡️'
}

export const HEROES: Hero[] = [
  // ===== 기초질서 (3장) =====
  { id: 'sejong', name: '세종대왕', era: '조선', domain: '기초질서', rarity: 'platinum',
    quote: '백성이 글을 알아야 자기 권리를 안다',
    achievement: '한글 창제로 모두가 법을 읽을 수 있게 함',
    childFriendlyStory: '세종대왕은 백성이 어려운 한자 때문에 자기 권리도 모르는 게 안타까웠어요. 그래서 직접 한글을 만들었지요. 모두가 글을 알아야 공정한 세상이 된다고 믿었어요.',
    unlockEpisodeId: 'ep01' },
  { id: 'jeongyakyong', name: '정약용', era: '조선', domain: '기초질서', rarity: 'gold',
    quote: '공평한 저울이 있어야 공평한 세상이 된다',
    achievement: '목민심서 - 공정한 공무원의 자세',
    childFriendlyStory: '정약용 선생은 백성을 사랑하는 마음으로 공무원이 어떻게 일해야 하는지 책을 썼어요. 어려운 사람을 더 도와주고, 모두에게 공평해야 한다고요.',
    unlockEpisodeId: 'ep02' },
  { id: 'jangyeongsil', name: '장영실', era: '조선', domain: '기초질서', rarity: 'gold',
    quote: '신분이 아니라 능력으로 사람을 보아야 한다',
    achievement: '신분의 벽을 뛰어넘은 발명가',
    childFriendlyStory: '장영실은 노비의 아들로 태어났지만 똑똑한 머리로 측우기와 해시계를 만들었어요. 세종대왕은 신분보다 능력을 보고 그를 신하로 삼았답니다.',
    unlockEpisodeId: 'ep03' },

  // ===== 약속과 책임 (3장) =====
  { id: 'yisunsin', name: '이순신', era: '조선', domain: '약속과 책임', rarity: 'platinum',
    quote: '신의를 지키는 사람은 흔들리지 않는다',
    achievement: '나라를 지킨다는 약속을 끝까지 지킴',
    childFriendlyStory: '이순신 장군은 어려운 상황에서도 나라를 지키겠다는 약속을 끝까지 지켰어요. 12척의 배로 133척의 적을 이긴 비밀은 약속을 지키는 마음이었어요.',
    unlockEpisodeId: 'ep04' },
  { id: 'ahnjunggeun', name: '안중근', era: '대한제국', domain: '약속과 책임', rarity: 'platinum',
    quote: '하루라도 책을 읽지 않으면 입에 가시가 돋친다',
    achievement: '독립의 약속을 목숨으로 지킴',
    childFriendlyStory: '안중근 의사는 나라의 독립을 위해 자기 손가락을 잘라 맹세했어요. 그리고 그 약속을 끝까지 지켰지요. 무엇이든 약속한 일은 끝까지 한다는 마음이 영웅을 만들어요.',
    unlockEpisodeId: 'ep05' },
  { id: 'yugwansun', name: '유관순', era: '일제강점기', domain: '약속과 책임', rarity: 'gold',
    quote: '내 나라를 사랑하는 마음은 약속이다',
    achievement: '16살에 만세운동의 약속을 지킴',
    childFriendlyStory: '유관순 누나는 너와 비슷한 나이에 큰 약속을 했어요. "우리나라 사람들이 자유롭게 살게 하겠다"는 약속. 그 약속을 지키기 위해 두려움 없이 일어섰답니다.',
    unlockEpisodeId: 'ep06' },

  // ===== 공정과 차별 (3장) =====
  { id: 'heojun', name: '허준', era: '조선', domain: '공정과 차별', rarity: 'gold',
    quote: '의술 앞에 양반과 백성이 따로 없다',
    achievement: '동의보감 - 모든 백성을 위한 의학서',
    childFriendlyStory: '허준 선생은 부자든 가난한 사람이든 똑같이 정성껏 치료했어요. 동의보감은 가난한 백성도 약초로 병을 고칠 수 있게 만든 책이에요.',
    unlockEpisodeId: 'ep07' },
  { id: 'shinsaimdang', name: '신사임당', era: '조선', domain: '공정과 차별', rarity: 'gold',
    quote: '여자도 글을 쓰고 그림을 그릴 수 있다',
    achievement: '여성에게도 배움의 기회가 있어야 함을 보임',
    childFriendlyStory: '옛날엔 여자는 공부하면 안 된다고 생각했어요. 하지만 신사임당은 시도 쓰고 그림도 그리며 모두에게 똑같은 기회가 필요하다는 걸 보여주었어요.',
    unlockEpisodeId: 'ep08' },
  { id: 'baekjeong_park', name: '박성춘', era: '대한제국', domain: '공정과 차별', rarity: 'silver',
    quote: '모든 사람은 평등하게 태어났다',
    achievement: '백정 출신으로 최초로 신분차별 반대 연설',
    childFriendlyStory: '박성춘 어르신은 가장 차별받던 신분이었지만, 모든 사람이 평등하다고 처음으로 큰 목소리를 냈어요. 만민공동회에서의 그 연설이 우리나라 인권의 첫걸음이 되었답니다.',
    unlockEpisodeId: 'ep09' },

  // ===== 권리와 의무 (3장) =====
  { id: 'kimgu', name: '김구', era: '대한민국임시정부', domain: '권리와 의무', rarity: 'platinum',
    quote: '문화의 힘이 가장 큰 힘이다',
    achievement: '백범일지 - 자유와 책임의 의미',
    childFriendlyStory: '김구 선생님은 우리나라 사람들이 자유롭게 살 권리가 있다고 평생 외쳤어요. 그리고 자유에는 책임이 따른다고도 가르쳐주셨답니다.',
    unlockEpisodeId: 'ep10' },
  { id: 'ihoeyoung', name: '이회영', era: '일제강점기', domain: '권리와 의무', rarity: 'gold',
    quote: '가진 자는 가진 만큼 책임을 다한다',
    achievement: '전 재산을 독립운동에 바친 노블레스 오블리주',
    childFriendlyStory: '이회영 선생님 가족은 엄청난 부자였어요. 하지만 나라를 위해 모든 재산을 다 썼답니다. 더 많이 가진 사람은 더 큰 책임이 있다는 걸 보여주셨어요.',
    unlockEpisodeId: 'ep11' },
  { id: 'uljimundeok', name: '을지문덕', era: '고구려', domain: '권리와 의무', rarity: 'silver',
    quote: '자기 땅을 지키는 것은 모두의 의무다',
    achievement: '살수대첩 - 백성과 군사가 함께 나라를 지킴',
    childFriendlyStory: '을지문덕 장군은 30만 적군을 단 2700명으로 막아냈어요. 어떻게? 모든 백성이 자기 나라를 지킬 의무를 함께 졌기 때문이에요.',
    unlockEpisodeId: 'ep12' },

  // ===== 안전과 보호 (3장) =====
  { id: 'ulpaso', name: '을파소', era: '고구려', domain: '안전과 보호', rarity: 'gold',
    quote: '약한 사람을 돌보는 나라가 강한 나라다',
    achievement: '진대법 - 굶주린 백성을 보호하는 최초의 사회보장제',
    childFriendlyStory: '을파소 재상은 굶주린 백성에게 봄에 곡식을 빌려주고 가을에 돌려받는 법을 만들었어요. 어려운 사람을 보호하는 게 진짜 강한 나라라고 믿었어요.',
    unlockEpisodeId: 'ep13' },
  { id: 'ahnchanho', name: '안창호', era: '일제강점기', domain: '안전과 보호', rarity: 'gold',
    quote: '거짓말은 사람을 해치는 큰 폭력이다',
    achievement: '정직과 신뢰의 가르침',
    childFriendlyStory: '안창호 선생님은 "농담으로라도 거짓말을 하지 말자"고 하셨어요. 작은 거짓말이 큰 폭력이 되고, 정직이 사람을 보호한다고 가르치셨답니다.',
    unlockEpisodeId: 'ep14' },
  { id: 'kimmandeok', name: '김만덕', era: '조선', domain: '안전과 보호', rarity: 'platinum',
    quote: '내가 가진 것으로 위험에 빠진 이웃을 구한다',
    achievement: '제주 대기근 때 전 재산으로 굶주린 백성 구함',
    childFriendlyStory: '김만덕 할머니는 제주도의 큰 상인이었어요. 흉년으로 제주 사람들이 굶어 죽자, 자기 재산을 다 털어 쌀을 사다가 나눠줬어요. 위험에 빠진 이웃을 보호하는 게 진짜 어른의 모습이지요.',
    unlockEpisodeId: 'ep15' }
]

export const HERO_BY_ID: Record<string, Hero> =
  HEROES.reduce((acc, h) => { acc[h.id] = h; return acc }, {} as Record<string, Hero>)

export function getHeroById(id: string): Hero | undefined {
  return HERO_BY_ID[id]
}

export function getHeroByEpisode(episodeId: string): Hero | undefined {
  return HEROES.find(h => h.unlockEpisodeId === episodeId)
}
