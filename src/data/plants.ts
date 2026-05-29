import { EmotionType } from './emotions'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface PlantSpecies {
  id: string
  name: string                   // "햇살민들레"
  emotion: EmotionType
  minIntensity: number          // 별 1개 이상
  maxIntensity: number          // 별 5개 이하
  rarity: Rarity
  description: string
  flavorText: string            // 도감 설명
  empathyPoints: number         // 공감 에너지 (common:1, rare:3, epic:7, legendary:15)
  unlockCondition?: string      // 잠금 해제 조건 설명 (legendary용)
}

// 희귀도별 공감 에너지
export const EMPATHY_BY_RARITY: Record<Rarity, number> = {
  common: 1,
  rare: 3,
  epic: 7,
  legendary: 15
}

// v2.0: 8가지 감정 × 강도 매트릭스 = 60종 (legendary 16종 포함)
export const PLANT_SPECIES: PlantSpecies[] = [
  // ===== JOY (기쁨) - 8종 =====
  { id: 'sunshine_dandelion', name: '햇살민들레', emotion: 'joy', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '햇빛처럼 환하게 웃는 노란 꽃',
    flavorText: '기쁜 날엔 이 꽃이 피어나요. 바람이 불면 씨앗이 날아가 또 다른 기쁨이 돼요.' },
  { id: 'yellow_laughflower', name: '노란 웃음꽃', emotion: 'joy', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '웃을 때마다 꽃잎이 살랑살랑 흔들려요',
    flavorText: '깔깔 웃으면 이 꽃도 같이 웃어요. 웃음은 나눌수록 커진답니다.' },
  { id: 'giggle_balloonvine', name: '깔깔 풍선덩굴', emotion: 'joy', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '진짜 풍선처럼 둥둥 떠오르는 덩굴',
    flavorText: '기쁨이 가득 차면 풍선처럼 두둥실! 하늘까지 닿을 것 같아요.' },
  { id: 'rainbow_sunflower', name: '무지개 해바라기', emotion: 'joy', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '꽃잎마다 무지개 색이 도는 해바라기',
    flavorText: '큰 기쁨은 무지개처럼 일곱 빛깔로 빛나요.' },
  { id: 'starlight_joytree', name: '별빛 환희나무', emotion: 'joy', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '밤하늘 별을 가지마다 매단 나무',
    flavorText: '최고로 기쁜 날, 별빛이 나무에 내려앉아요.' },
  { id: 'golden_smilerose', name: '황금 미소장미', emotion: 'joy', minIntensity: 4, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '금빛으로 빛나는 미소 짓는 장미',
    flavorText: '행복한 마음이 황금빛 장미로 피어났어요.' },
  { id: 'angel_laughflower', name: '천사의 웃음꽃', emotion: 'joy', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '7일 연속 기쁨 감정을 심으면 피어나요',
    description: '천사의 날개를 닮은 새하얀 빛의 꽃',
    flavorText: '7일 동안 기쁨을 키우면, 천사가 내려와 이 꽃을 선물해요.' },
  { id: 'diamond_joygem', name: '다이아 기쁨수정', emotion: 'joy', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '30일 출석하면 받을 수 있어요',
    description: '단단한 기쁨이 보석이 된 수정 식물',
    flavorText: '꾸준한 마음이 모이면, 다이아몬드처럼 단단한 기쁨이 돼요.' },

  // ===== SAD (슬픔) - 8종 =====
  { id: 'moonlight_tearflower', name: '달빛 눈물꽃', emotion: 'sad', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '달빛 아래서만 피는 푸른 꽃',
    flavorText: '슬픔도 아름다울 수 있어요. 이 꽃은 눈물 한 방울로 자라요.' },
  { id: 'blue_sighmoss', name: '푸른 한숨이끼', emotion: 'sad', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '한숨처럼 부드럽게 퍼지는 파란 이끼',
    flavorText: '후~ 한숨을 쉬면 마음이 조금 가벼워져요.' },
  { id: 'rainy_bellflower', name: '비오는 종꽃', emotion: 'sad', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '빗방울을 머금은 종 모양 꽃',
    flavorText: '비가 그치면 무지개가 뜨듯, 슬픔 뒤엔 맑은 마음이 와요.' },
  { id: 'mist_memoryflower', name: '안개 추억꽃', emotion: 'sad', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '안개처럼 아련한 빛을 내는 꽃',
    flavorText: '그리운 마음이 안개가 되어 이 꽃을 감싸요.' },
  { id: 'deepsea_pearlflower', name: '깊은 바다 진주꽃', emotion: 'sad', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '깊은 바닷속 진주를 품은 꽃',
    flavorText: '가장 깊은 슬픔은 진주처럼 단단하고 빛나는 마음을 만들어요.' },
  { id: 'star_tearflower', name: '별이 된 눈물', emotion: 'sad', minIntensity: 4, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '눈물이 하늘로 올라가 별이 된 꽃',
    flavorText: '흘린 눈물은 사라지지 않고 밤하늘 별이 된대요.' },
  { id: 'comfort_rainbow', name: '위로의 무지개', emotion: 'sad', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '슬픔을 느낀 뒤 친구를 도왔을 때 피어나요',
    description: '슬픔을 딛고 친구를 도울 때 뜨는 무지개 식물',
    flavorText: '내 슬픔을 알기에 친구의 슬픔도 안아줄 수 있어요. 그때 무지개가 떠요.' },
  { id: 'healing_lily', name: '치유의 백합', emotion: 'sad', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '슬픔에서 평온으로 마음을 3번 바꾸면 피어나요',
    description: '아픈 마음을 어루만지는 새하얀 백합',
    flavorText: '슬픔이 평온으로 바뀔 때마다, 이 백합이 한 송이씩 피어나요.' },

  // ===== ANGRY (화남) - 7종 =====
  { id: 'lava_cactus', name: '용암 선인장', emotion: 'angry', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '뜨거운 마음을 닮은 빨간 선인장',
    flavorText: '화가 나는 건 나쁜 게 아니에요. 이 선인장은 그 에너지를 꽃으로 바꿔줘요.' },
  { id: 'flame_thornbush', name: '불꽃 가시덤불', emotion: 'angry', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '불꽃처럼 타오르는 가시덤불',
    flavorText: '욱하는 마음은 불꽃 같아요. 잠깐 기다리면 가라앉아요.' },
  { id: 'storm_lightningflower', name: '폭풍 번개꽃', emotion: 'angry', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '번개처럼 번쩍이는 노란 꽃',
    flavorText: '번개가 치면 천둥이 울리듯, 화난 마음도 큰 소리를 내고 싶어해요.' },
  { id: 'volcano_bud', name: '화산 봉오리', emotion: 'angry', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '곧 터질 것 같은 화산 모양 봉오리',
    flavorText: '부글부글 끓어오를 땐, 깊게 숨을 쉬어봐요.' },
  { id: 'dragon_scaleplant', name: '용의 비늘식물', emotion: 'angry', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '용의 비늘처럼 단단하고 빛나는 잎',
    flavorText: '가장 큰 화는 용처럼 강해요. 그 힘을 좋은 곳에 쓰면 영웅이 돼요.' },
  { id: 'peace_olive', name: '평화의 올리브', emotion: 'angry', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '화날 때 호흡 게임을 5번 하면 피어나요',
    description: '화를 가라앉힌 마음에 피는 올리브 나무',
    flavorText: '화를 잘 다스린 사람만이 진짜 평화를 알아요. 비둘기가 올리브 가지를 물고 와요.' },
  { id: 'justice_swordflower', name: '정의의 검꽃', emotion: 'angry', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '솔로몬 재판소의 화남 관련 사건을 해결하면 피어나요',
    description: '정의로운 마음을 검 모양으로 피운 꽃',
    flavorText: '옳지 않은 일에 내는 화는 정의가 돼요. 그 마음이 검꽃으로 피어나요.' },

  // ===== FEAR (무서움) - 7종 =====
  { id: 'shadow_mushroom', name: '그림자 버섯', emotion: 'fear', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '어둠 속에서 빛나는 보라색 버섯',
    flavorText: '무서울 때 이 버섯이 작은 빛을 내요. 어둠 속에도 친구가 있어요.' },
  { id: 'firefly_lampgrass', name: '반딧불 등불풀', emotion: 'fear', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '반딧불이가 머무는 작은 등불 모양 풀',
    flavorText: '어두운 밤에도 작은 빛 하나면 무섭지 않아요.' },
  { id: 'shield_spiderweb', name: '보호막 가시거미줄', emotion: 'fear', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '나를 지켜주는 반짝이는 거미줄',
    flavorText: '무서운 걸 막아주는 보호막. 이제 조금 안심이 돼요.' },
  { id: 'dark_lighthouseflower', name: '어둠 속 등대꽃', emotion: 'fear', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '깜깜한 밤바다를 비추는 등대 꽃',
    flavorText: '아무리 어두워도, 등대가 길을 비춰줘요.' },
  { id: 'starlight_armortree', name: '별빛 갑옷나무', emotion: 'fear', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '별빛 갑옷을 두른 든든한 나무',
    flavorText: '가장 무서운 순간에도, 별빛 갑옷이 너를 지켜줄 거예요.' },
  { id: 'courage_lionmane', name: '용기의 사자갈기', emotion: 'fear', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '무서움을 5번 이겨내면 피어나요',
    description: '사자 갈기처럼 용감하게 피어난 꽃',
    flavorText: '무서움을 이겨낼 때마다 용기가 자라요. 사자처럼 용감한 마음이 돼요.' },
  { id: 'guardian_angeltree', name: '수호천사 나무', emotion: 'fear', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '친구를 보호하는 미션을 완료하면 피어나요',
    description: '친구를 지키는 마음에 피는 천사 나무',
    flavorText: '내가 무서웠던 만큼, 친구를 지켜줄 수 있어요. 수호천사가 함께해요.' },

  // ===== EXCITED (설렘) - 8종 =====
  { id: 'sparkle_blossom', name: '반짝 봉오리', emotion: 'excited', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '두근거림이 보이는 분홍 꽃',
    flavorText: '설렘은 마음의 별가루. 이 꽃은 매일 조금씩 빛을 모아요.' },
  { id: 'thump_heartflower', name: '두근 심장꽃', emotion: 'excited', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '두근두근 콩닥콩닥 뛰는 하트 꽃',
    flavorText: '심장이 콩닥콩닥! 좋은 일이 생길 것 같은 기분이에요.' },
  { id: 'firework_flameflower', name: '폭죽 화염초', emotion: 'excited', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '폭죽처럼 팡팡 터지는 꽃',
    flavorText: '설렘이 가득 차면 폭죽처럼 팡! 하고 터져요.' },
  { id: 'stardust_waterfallflower', name: '별가루 폭포꽃', emotion: 'excited', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '별가루가 폭포처럼 쏟아지는 꽃',
    flavorText: '두근거림이 별가루 폭포가 되어 쏟아져요.' },
  { id: 'firstlove_cherryblossom', name: '첫사랑 벚꽃', emotion: 'excited', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '연분홍빛으로 흩날리는 벚꽃',
    flavorText: '처음 느끼는 두근거림은 벚꽃처럼 곱고 따뜻해요.' },
  { id: 'adventurer_flagtree', name: '모험가의 깃발나무', emotion: 'excited', minIntensity: 4, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '모험을 떠나는 깃발이 달린 나무',
    flavorText: '새로운 모험을 기다리는 설렘이 깃발이 되어 펄럭여요.' },
  { id: 'destiny_starflower', name: '운명의 별꽃', emotion: 'excited', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '새로운 도전을 한 뒤 피어나요',
    description: '운명처럼 빛나는 다섯 갈래 별 꽃',
    flavorText: '용기 내어 새로운 걸 도전하면, 운명의 별이 너를 비춰요.' },
  { id: 'dream_goldentree', name: '꿈을 이룬 황금나무', emotion: 'excited', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '모든 감정을 30번 이상 심으면 피어나요',
    description: '모든 마음을 다 키운 사람에게 피는 황금나무',
    flavorText: '기쁨도 슬픔도 모두 키워본 마음에, 꿈을 이룬 황금나무가 피어나요.' },

  // ===== PROUD (뿌듯) - 8종 =====
  { id: 'medal_sunflower', name: '훈장 해바라기', emotion: 'proud', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '금빛 메달을 단 큰 해바라기',
    flavorText: '오늘 너는 정말 잘했어. 이 꽃이 그걸 기억해줄 거예요.' },
  { id: 'goldmedal_dandelion', name: '금메달 민들레', emotion: 'proud', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '금메달처럼 반짝이는 민들레',
    flavorText: '작은 일도 끝까지 해낸 너에게 주는 금메달이에요.' },
  { id: 'glory_laurelflower', name: '영광의 월계관꽃', emotion: 'proud', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '승리자가 쓰는 월계관 모양 꽃',
    flavorText: '열심히 노력한 사람의 머리에 씌워주는 월계관이에요.' },
  { id: 'champion_trophyflower', name: '챔피언 트로피꽃', emotion: 'proud', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '반짝이는 우승 트로피 모양 꽃',
    flavorText: '최선을 다한 너는 이미 챔피언이에요!' },
  { id: 'crown_rose', name: '왕관 장미', emotion: 'proud', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '왕관을 쓴 위풍당당 장미',
    flavorText: '가장 뿌듯한 날, 너는 마음의 왕이 돼요.' },
  { id: 'hall_of_fame_tree', name: '명예의 전당 나무', emotion: 'proud', minIntensity: 4, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '이름이 새겨지는 명예의 전당 나무',
    flavorText: '자랑스러운 일을 한 사람의 이름이 이 나무에 새겨져요.' },
  { id: 'solomon_wisdomflower', name: '솔로몬의 지혜꽃', emotion: 'proud', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '솔로몬 재판소를 5번 해결하면 피어나요',
    description: '솔로몬의 지혜가 담긴 황금 부엉이 꽃',
    flavorText: '지혜로운 판단을 다섯 번 하면, 솔로몬의 지혜꽃이 피어나요.' },
  { id: 'hero_footprint', name: '영웅의 발자국', emotion: 'proud', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '모든 영웅 카드를 모으면 피어나요',
    description: '위대한 영웅들의 발자국에 피는 빛의 꽃',
    flavorText: '15명의 영웅을 모두 만나면, 그들의 발자국에 이 꽃이 피어나요.' },

  // ===== BORED (심심) - 7종 =====
  { id: 'cloud_moss', name: '구름 이끼', emotion: 'bored', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '구름처럼 폭신한 회색 이끼',
    flavorText: '심심한 것도 마음의 휴식이에요. 이 이끼 위에 누우면 좋아요.' },
  { id: 'yawn_balloonmoss', name: '하품 풍선이끼', emotion: 'bored', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '하품하듯 부풀었다 줄어드는 이끼',
    flavorText: '하아~ 하품이 나올 땐, 새로운 놀이를 찾아볼까요?' },
  { id: 'time_sandflower', name: '시간 모래꽃', emotion: 'bored', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '모래시계처럼 시간이 흐르는 꽃',
    flavorText: '심심한 시간도 모래알처럼 소중히 흘러가요.' },
  { id: 'dreaming_cottoncandytree', name: '꿈꾸는 솜사탕나무', emotion: 'bored', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '솜사탕처럼 폭신한 분홍 구름 나무',
    flavorText: '심심할 땐 상상의 나래를 펴봐요. 솜사탕 구름을 타고 어디든 갈 수 있어요.' },
  { id: 'imagination_fountain', name: '상상력 분수', emotion: 'bored', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '온갖 상상이 솟아나는 무지개 분수',
    flavorText: '심심함은 상상력의 시작! 분수처럼 멋진 생각이 솟아나요.' },
  { id: 'inventor_garden', name: '발명가의 정원', emotion: 'bored', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '심심할 때 창작 활동(색칠)을 하면 피어나요',
    description: '심심함을 발명으로 바꾼 정원',
    flavorText: '위대한 발명은 심심함에서 시작됐어요. 너의 상상이 정원을 가득 채워요.' },
  { id: 'curiosity_paradise', name: '호기심 천국', emotion: 'bored', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '모든 영역(정원·왕국·도감·미니게임)을 방문하면 피어나요',
    description: '온갖 신기한 것이 가득한 호기심 천국 식물',
    flavorText: '여기저기 둘러본 너의 호기심이, 천국 같은 정원을 만들었어요.' },

  // ===== CALM (평온) - 7종 =====
  { id: 'calm_lotus', name: '고요 연꽃', emotion: 'calm', minIntensity: 1, maxIntensity: 2, rarity: 'common', empathyPoints: 1,
    description: '잔잔한 물 위에 떠 있는 연꽃',
    flavorText: '평온한 마음은 가장 깊은 힘이에요. 이 연꽃은 그 마음을 닮았어요.' },
  { id: 'wind_chimegrass', name: '바람 풍경초', emotion: 'calm', minIntensity: 2, maxIntensity: 3, rarity: 'common', empathyPoints: 1,
    description: '바람에 딸랑딸랑 흔들리는 풍경 풀',
    flavorText: '바람이 불면 딸랑딸랑, 마음이 편안해지는 소리가 나요.' },
  { id: 'lake_mirrorflower', name: '호수 거울꽃', emotion: 'calm', minIntensity: 3, maxIntensity: 4, rarity: 'rare', empathyPoints: 3,
    description: '잔잔한 호수처럼 맑은 거울 꽃',
    flavorText: '마음이 호수처럼 잔잔하면, 모든 것이 또렷하게 보여요.' },
  { id: 'meditation_bodhitree', name: '명상의 보리수', emotion: 'calm', minIntensity: 4, maxIntensity: 5, rarity: 'rare', empathyPoints: 3,
    description: '깊은 평온이 깃든 보리수 나무',
    flavorText: '조용히 눈을 감으면, 마음 깊은 곳의 평화가 느껴져요.' },
  { id: 'enlightenment_whitelotus', name: '깨달음 흰 연꽃', emotion: 'calm', minIntensity: 5, maxIntensity: 5, rarity: 'epic', empathyPoints: 7,
    description: '진흙 속에서 피어난 새하얀 연꽃',
    flavorText: '가장 깊은 평온은 진흙 속에서도 깨끗이 피는 흰 연꽃 같아요.' },
  { id: 'thousand_year_silencetree', name: '천 년의 고요나무', emotion: 'calm', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '100일 연속 출석하면 피어나요',
    description: '천 년 동안 고요히 자라온 거대한 나무',
    flavorText: '오랜 시간 한결같은 마음이, 천 년의 고요나무를 키워냈어요.' },
  { id: 'heart_essenceflower', name: '마음의 정수꽃', emotion: 'calm', minIntensity: 1, maxIntensity: 5, rarity: 'legendary', empathyPoints: 15,
    unlockCondition: '8가지 감정을 모두 평온으로 바꾸면 피어나요',
    description: '모든 감정을 평온으로 품은 마음의 정수',
    flavorText: '기쁨도 슬픔도 화남도, 모두 평온으로 안아낸 마음에 피는 가장 귀한 꽃이에요.' }
]

// 빠른 조회용 맵
export const PLANT_BY_ID: Record<string, PlantSpecies> =
  PLANT_SPECIES.reduce((acc, p) => { acc[p.id] = p; return acc }, {} as Record<string, PlantSpecies>)

export function getPlantById(id: string): PlantSpecies | undefined {
  return PLANT_BY_ID[id]
}

// 레전더리 식물 목록 (잠금 해제 대상)
export const LEGENDARY_PLANTS: PlantSpecies[] = PLANT_SPECIES.filter(p => p.rarity === 'legendary')

/**
 * 감정+강도 → 식물 추첨.
 * 강도에 맞는 common/rare/epic 후보 중 희귀도 가중치로 추첨.
 * unlockedLegendaries에 포함된 레전더리는 낮은 확률로 후보에 추가.
 */
export function getPlantForEmotion(
  emotion: EmotionType,
  intensity: number,
  unlockedLegendaries: string[] = []
): PlantSpecies {
  // 강도 범위에 맞는 일반 후보
  const candidates = PLANT_SPECIES.filter(
    p =>
      p.emotion === emotion &&
      p.rarity !== 'legendary' &&
      intensity >= p.minIntensity &&
      intensity <= p.maxIntensity
  )

  // 잠금 해제된 같은 감정의 레전더리 (희귀하게 등장)
  const legendaries = PLANT_SPECIES.filter(
    p => p.emotion === emotion && p.rarity === 'legendary' && unlockedLegendaries.includes(p.id)
  )

  const pool = [...candidates, ...legendaries]
  if (pool.length === 0) {
    // 안전장치: 같은 감정 중 아무거나
    return PLANT_SPECIES.find(p => p.emotion === emotion) || PLANT_SPECIES[0]
  }

  // 희귀도 가중치 (희귀할수록 확률 낮음)
  const weight: Record<Rarity, number> = { common: 60, rare: 28, epic: 10, legendary: 4 }
  const total = pool.reduce((sum, p) => sum + weight[p.rarity], 0)
  let roll = Math.random() * total
  for (const p of pool) {
    roll -= weight[p.rarity]
    if (roll <= 0) return p
  }
  return pool[0]
}
