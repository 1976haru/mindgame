import { EmotionType } from './emotions'

export interface Friend {
  id: string
  name: string
  triggerEmotions: EmotionType[]   // 어떤 감정일 때 찾아오는지
  greeting: string                  // 등장 시 멘트
  description: string
  comfortMessages: string[]         // 클릭 시 추가 위로 메시지 (랜덤)
  nightOnly?: boolean               // 밤 8시 이후에만 등장
  legendary?: boolean               // 특별 잠금 해제 친구
  unlockCondition?: string
}

// v2.0: 8마리 친구 (8가지 감정 커버 + 레전더리 유니콘)
export const FRIENDS: Friend[] = [
  {
    id: 'comfort_rabbit',
    name: '위로 토끼',
    triggerEmotions: ['sad', 'fear'],
    greeting: '괜찮아... 내가 옆에 있어줄게.',
    description: '슬프거나 무서울 때 조용히 옆에 와서 앉아주는 친구',
    comfortMessages: [
      '울어도 괜찮아. 눈물은 마음을 깨끗이 씻어줘.',
      '네 마음, 내가 다 알아. 천천히 쉬어도 돼.',
      '슬픈 날도 지나가. 내일은 또 새로운 날이야.',
      '여기 따뜻한 당근차 한 잔. 같이 마실래?',
      '너는 혼자가 아니야. 내가 늘 곁에 있을게.'
    ]
  },
  {
    id: 'celebrate_butterfly',
    name: '축하 나비',
    triggerEmotions: ['joy', 'excited'],
    greeting: '와! 오늘 정말 멋진 날이야! 같이 춤출까?',
    description: '기쁜 날 정원을 빛나비로 가득 채워주는 친구',
    comfortMessages: [
      '반짝반짝! 네 기쁨이 정원을 빛내고 있어.',
      '신나는 마음은 나눌수록 커진대. 나랑 같이 날아볼까?',
      '오늘의 기쁨, 꼭 기억해 둬!',
      '두근거리는 마음이 예쁜 색으로 보여.',
      '함께라서 더 즐거운 하루야!'
    ]
  },
  {
    id: 'proud_squirrel',
    name: '뿌듯 다람쥐',
    triggerEmotions: ['proud'],
    greeting: '도토리 줄게! 너 정말 대단해!',
    description: '자랑스러운 일을 해낸 날 도토리 선물을 들고 오는 친구',
    comfortMessages: [
      '네가 해낸 거 다 봤어. 정말 멋졌어!',
      '작은 노력도 모이면 큰 보물이 돼. 도토리처럼!',
      '스스로를 칭찬해 줘. 그래도 돼.',
      '이 도토리는 너의 자랑스러운 마음이야.',
      '다음에도 분명 잘할 거야. 난 믿어!'
    ]
  },
  {
    id: 'calm_turtle',
    name: '차분 거북이',
    triggerEmotions: ['angry'],
    greeting: '휴~ 같이 깊은 숨 쉬어보자.',
    description: '화가 날 때 천천히 숨 쉬는 법을 알려주는 느긋한 친구',
    comfortMessages: [
      '화가 나는 건 나쁜 게 아니야. 천천히 가라앉히면 돼.',
      '하나, 둘, 셋... 같이 숨을 크게 쉬어볼까?',
      '급할수록 천천히. 거북이처럼 느긋하게.',
      '화난 마음도 곧 잔잔해질 거야.',
      '내 등껍질 안에서 잠깐 쉬어도 좋아.'
    ]
  },
  {
    id: 'courage_fox',
    name: '용기 여우',
    triggerEmotions: ['fear'],
    greeting: '내 손전등으로 어둠을 비춰줄게!',
    description: '무서운 밤에 작은 손전등을 들고 길을 밝혀주는 용감한 친구',
    comfortMessages: [
      '무서운 건 다들 똑같아. 너만 그런 게 아니야.',
      '한 발짝만 용기 내면, 생각보다 안 무서워.',
      '내 손전등이 있으면 어둠도 무섭지 않아.',
      '용기는 무섭지 않은 게 아니라, 무서워도 해내는 거야.',
      '내가 길을 비춰줄게. 같이 가자!'
    ]
  },
  {
    id: 'curious_owl',
    name: '호기심 부엉이',
    triggerEmotions: ['bored'],
    greeting: '심심해? 내가 재미있는 이야기 들려줄게!',
    description: '심심한 날 신기한 이야기와 놀이를 가져오는 똑똑한 친구',
    comfortMessages: [
      '심심함은 새로운 놀이의 시작이야!',
      '저 구름은 무슨 모양 같아? 상상해 볼까?',
      '오늘은 어떤 신기한 걸 발견할 수 있을까?',
      '심심할 땐 그림을 그려보는 건 어때?',
      '세상엔 재미있는 게 정말 많아. 같이 찾아보자!'
    ]
  },
  {
    id: 'dreaming_whale',
    name: '꿈꾸는 고래',
    triggerEmotions: ['calm'],
    greeting: '잔잔한 바다처럼 평온하구나...',
    description: '고요한 밤에만 하늘 바다를 헤엄쳐 오는 신비로운 친구',
    nightOnly: true,
    comfortMessages: [
      '깊은 바다처럼 마음이 고요하네.',
      '별빛 바다를 함께 헤엄쳐 볼까?',
      '평온한 마음은 가장 큰 힘이야.',
      '오늘 하루도 수고했어. 푹 쉬자.',
      '잔잔한 파도 소리를 들어봐... 마음이 편안해질 거야.'
    ]
  },
  {
    id: 'secret_unicorn',
    name: '비밀 유니콘',
    triggerEmotions: ['joy', 'sad', 'angry', 'fear', 'excited', 'proud', 'bored', 'calm'],
    greeting: '너는 정말 특별해.',
    description: '오랫동안 마음을 가꾼 사람에게만 나타나는 전설의 친구',
    legendary: true,
    unlockCondition: '30일 출석 시 단 한 번 만날 수 있어요',
    comfortMessages: [
      '네가 매일 마음을 돌본 걸 다 알고 있어.',
      '기쁨도 슬픔도 모두 소중한 너의 일부야.',
      '너는 이미 충분히 빛나고 있어.',
      '무지개 너머에서 늘 너를 응원하고 있었어.',
      '특별한 너에게, 특별한 마법을 선물할게. ✨'
    ]
  }
]

export const FRIEND_BY_ID: Record<string, Friend> =
  FRIENDS.reduce((acc, f) => { acc[f.id] = f; return acc }, {} as Record<string, Friend>)

/**
 * 감정에 맞는 친구를 찾음.
 * isNight=false면 밤 전용 친구(꿈꾸는 고래)는 제외.
 * 레전더리(유니콘)는 일반 추첨에서 제외 — 별도 이벤트로만 등장.
 */
export function getFriendForEmotion(emotion: EmotionType, isNight = false): Friend | null {
  const candidates = FRIENDS.filter(
    f => !f.legendary && f.triggerEmotions.includes(emotion) && (!f.nightOnly || isNight)
  )
  return candidates[0] || null
}

export function getFriendById(id: string): Friend | undefined {
  return FRIEND_BY_ID[id]
}

export function randomComfortMessage(friend: Friend): string {
  return friend.comfortMessages[Math.floor(Math.random() * friend.comfortMessages.length)]
}
