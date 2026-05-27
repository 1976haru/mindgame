import { EmotionType } from './emotions'

export interface PlantSpecies {
  id: string
  name: string                   // "햇살민들레"
  emotion: EmotionType
  minIntensity: number          // 별 1개 이상
  maxIntensity: number          // 별 5개 이하
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  description: string
  flavorText: string            // 도감 설명
}

// MVP 1.0: 감정별 1종씩 8개. Claude Code로 60종까지 확장 예정.
export const PLANT_SPECIES: PlantSpecies[] = [
  {
    id: 'sunshine_dandelion',
    name: '햇살민들레',
    emotion: 'joy',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '햇빛처럼 환하게 웃는 노란 꽃',
    flavorText: '기쁜 날엔 이 꽃이 피어나요. 바람이 불면 씨앗이 날아가 또 다른 기쁨이 돼요.'
  },
  {
    id: 'moonlight_tearflower',
    name: '달빛 눈물꽃',
    emotion: 'sad',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '달빛 아래서만 피는 푸른 꽃',
    flavorText: '슬픔도 아름다울 수 있어요. 이 꽃은 눈물 한 방울로 자라요.'
  },
  {
    id: 'lava_cactus',
    name: '용암 선인장',
    emotion: 'angry',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '뜨거운 마음을 닮은 빨간 선인장',
    flavorText: '화가 나는 건 나쁜 게 아니에요. 이 선인장은 그 에너지를 꽃으로 바꿔줘요.'
  },
  {
    id: 'shadow_mushroom',
    name: '그림자 버섯',
    emotion: 'fear',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '어둠 속에서 빛나는 보라색 버섯',
    flavorText: '무서울 때 이 버섯이 작은 빛을 내요. 어둠 속에도 친구가 있어요.'
  },
  {
    id: 'sparkle_blossom',
    name: '반짝 봉오리',
    emotion: 'excited',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '두근거림이 보이는 분홍 꽃',
    flavorText: '설렘은 마음의 별가루. 이 꽃은 매일 조금씩 빛을 모아요.'
  },
  {
    id: 'medal_sunflower',
    name: '훈장 해바라기',
    emotion: 'proud',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '금빛 메달을 단 큰 해바라기',
    flavorText: '오늘 너는 정말 잘했어. 이 꽃이 그걸 기억해줄 거예요.'
  },
  {
    id: 'cloud_moss',
    name: '구름 이끼',
    emotion: 'bored',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '구름처럼 폭신한 회색 이끼',
    flavorText: '심심한 것도 마음의 휴식이에요. 이 이끼 위에 누우면 좋아요.'
  },
  {
    id: 'calm_lotus',
    name: '고요 연꽃',
    emotion: 'calm',
    minIntensity: 1,
    maxIntensity: 5,
    rarity: 'common',
    description: '잔잔한 물 위에 떠 있는 연꽃',
    flavorText: '평온한 마음은 가장 깊은 힘이에요. 이 연꽃은 그 마음을 닮았어요.'
  }
]

// 감정+강도 → 식물 매칭
export function getPlantForEmotion(emotion: EmotionType, intensity: number): PlantSpecies {
  const matches = PLANT_SPECIES.filter(
    p => p.emotion === emotion &&
         intensity >= p.minIntensity &&
         intensity <= p.maxIntensity
  )
  // MVP는 감정별 1종이라 첫 매칭 반환. 확장 시 희귀도 가중치 추가.
  return matches[0] || PLANT_SPECIES[0]
}
