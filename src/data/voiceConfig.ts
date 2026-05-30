// ElevenLabs 음성 설정
// Voice ID는 https://elevenlabs.io Voice Library에서 한국어 지원 음성 선택 후 입력.
// 선택/입력 방법은 VOICE_SETUP.md 참조.
// PLACEHOLDER_* 상태의 캐릭터는 음성 생성에서 자동으로 건너뜀(자막 폴백).

export interface VoiceCharacter {
  id: string // 내부 식별자
  name: string // 캐릭터 이름
  voiceId: string // ElevenLabs Voice ID (사용자 입력 필요)
  description: string // 어떤 목소리가 어울리는지
  settings: {
    stability: number // 0~1, 안정성 (높을수록 일관됨)
    similarity_boost: number // 0~1, 음성 유사도
    style: number // 0~1, 표현력
  }
}

export const VOICE_CHARACTERS: Record<string, VoiceCharacter> = {
  solomon: {
    id: 'solomon',
    name: '솔로몬 부엉이',
    voiceId: 'pFiQo3oKbBBUHzpSF9PO', // ← 한국어 남성, 차분하고 지혜로운 노년
    description: '현명한 할아버지 같은 따뜻하고 권위 있는 남성 목소리',
    settings: { stability: 0.75, similarity_boost: 0.75, style: 0.3 },
  },
  // 멘토 7명
  mozart_squirrel: {
    id: 'mozart_squirrel',
    name: '모차르트 다람쥐',
    voiceId: 'nHOCkCilU5qpFALFAEuy', // ← 밝고 경쾌한 목소리
    description: '활기차고 빠른 톤의 명랑한 목소리',
    settings: { stability: 0.5, similarity_boost: 0.7, style: 0.5 },
  },
  lightning_rabbit: {
    id: 'lightning_rabbit',
    name: '번개 토끼',
    voiceId: 'jYxolqdpkmUicfIhdPBd', // ← 에너지 넘치는 젊은 목소리
    description: '힘차고 응원하는 듯한 활발한 목소리',
    settings: { stability: 0.45, similarity_boost: 0.7, style: 0.6 },
  },
  swan_princess: {
    id: 'swan_princess',
    name: '백조 공주',
    voiceId: '4SXIn0z5npZXq3ZxihdW', // ← 우아한 여성 목소리
    description: '부드럽고 우아한 여성 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.4 },
  },
  time_owl: {
    id: 'time_owl',
    name: '시간 부엉이',
    voiceId: 'IbfOLl326yGMqZomahGg', // ← 학자 같은 차분한 목소리
    description: '지적이고 차분한 학자 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.3 },
  },
  sejong_turtle: {
    id: 'sejong_turtle',
    name: '세종 거북이',
    voiceId: '1MIh4sWscOMnPPee6H2c', // ← 느리고 따뜻한 목소리
    description: '느긋하고 따뜻하며 또박또박한 목소리 (받아쓰기용 - 발음 정확)',
    settings: { stability: 0.85, similarity_boost: 0.8, style: 0.2 },
  },
  curious_fox: {
    id: 'curious_fox',
    name: '호기심 여우',
    voiceId: 'e8UWvHOSyce2b175AUDL', // ← 호기심 많은 발랄한 목소리
    description: '궁금증 가득한 발랄하고 친근한 목소리',
    settings: { stability: 0.5, similarity_boost: 0.7, style: 0.5 },
  },
  number_bear: {
    id: 'number_bear',
    name: '숫자 곰돌이',
    voiceId: 'tNv1bzo5okCGrADIRCQ7', // ← 느긋하고 다정한 목소리
    description: '느긋하고 다정하지만 논리적인 목소리',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.3 },
  },
  // 정원 친구들
  comfort_rabbit: {
    id: 'comfort_rabbit',
    name: '위로 토끼',
    voiceId: 'PLACEHOLDER_COMFORT', // ← 부드러운 위로의 목소리
    description: '따뜻하고 부드럽게 위로하는 목소리',
    settings: { stability: 0.8, similarity_boost: 0.8, style: 0.3 },
  },
  narrator: {
    id: 'narrator',
    name: '내레이터',
    voiceId: 'PLACEHOLDER_NARRATOR', // ← 표준 안내 목소리
    description: '명확하고 친근한 안내 목소리 (UI, 미션 안내용)',
    settings: { stability: 0.7, similarity_boost: 0.75, style: 0.2 },
  },
}

// 받아쓰기 전용 음성 (발음 명확성 최우선)
export const DICTATION_VOICE = 'sejong_turtle'

// Voice ID가 아직 설정되지 않았는지 판별 (생성 스크립트/런타임 공용)
export function isVoiceConfigured(characterId: string): boolean {
  const c = VOICE_CHARACTERS[characterId]
  return !!c && !c.voiceId.startsWith('PLACEHOLDER')
}
