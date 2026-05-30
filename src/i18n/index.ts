// 🌍 다국어(i18n) — 한국어/영어/일본어
// UI 문자열은 키→언어별 텍스트. 음성/자막 대본은 voiceI18n.ts에서 별도 관리.
export type Lang = 'ko' | 'en' | 'ja'

export const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

// 자연스러운 현지화 번역(직역 금지). 어린이 친화 구어체.
const STRINGS: Record<string, Record<Lang, string>> = {
  // 공통/네비
  'nav.garden': { ko: '정원', en: 'Garden', ja: 'にわ' },
  'nav.kingdom': { ko: '왕국', en: 'Kingdom', ja: 'おうこく' },
  'nav.dojo': { ko: '도장', en: 'Dojo', ja: 'どうじょう' },
  'nav.collection': { ko: '도감', en: 'Cards', ja: 'ずかん' },
  'nav.settings': { ko: '설정', en: 'Settings', ja: 'せってい' },
  // 메인 액션
  'action.todaysHeart': { ko: '오늘의 마음 ✨', en: "Today's Feeling ✨", ja: 'きょうのきもち ✨' },
  'action.start': { ko: '정원 만들기 ✨', en: 'Create My Garden ✨', ja: 'にわをつくる ✨' },
  'action.next': { ko: '다음 →', en: 'Next →', ja: 'つぎへ →' },
  'action.back': { ko: '← 돌아가기', en: '← Back', ja: '← もどる' },
  'action.retry': { ko: '다시 해보기', en: 'Try Again', ja: 'もういちど' },
  // 이름 입력
  'name.title': { ko: '만나서 반가워!', en: 'Nice to meet you!', ja: 'はじめまして！' },
  'name.ask': { ko: '너의 이름을 알려줄래?', en: "What's your name?", ja: 'なまえをおしえてね' },
  'name.placeholder': { ko: '이름', en: 'Name', ja: 'なまえ' },
  // 설정
  'settings.title': { ko: '설정', en: 'Settings', ja: 'せってい' },
  'settings.language': { ko: '언어', en: 'Language', ja: 'げんご' },
  'settings.sfx': { ko: '효과음', en: 'Sound Effects', ja: 'こうかおん' },
  'settings.bgm': { ko: '배경음', en: 'Music', ja: 'おんがく' },
  'settings.voice': { ko: '캐릭터 목소리', en: 'Character Voices', ja: 'キャラクターのこえ' },
  'settings.subtitle': { ko: '자막', en: 'Subtitles', ja: 'じまく' },
  'settings.on': { ko: '켜짐', en: 'On', ja: 'オン' },
  'settings.off': { ko: '꺼짐', en: 'Off', ja: 'オフ' },
  // 감정
  'emotion.joy': { ko: '기쁨', en: 'Joy', ja: 'うれしい' },
  'emotion.sad': { ko: '슬픔', en: 'Sadness', ja: 'かなしい' },
  'emotion.angry': { ko: '화남', en: 'Anger', ja: 'おこり' },
  'emotion.fear': { ko: '무서움', en: 'Fear', ja: 'こわい' },
  'emotion.excited': { ko: '설렘', en: 'Excitement', ja: 'ワクワク' },
  'emotion.proud': { ko: '뿌듯', en: 'Pride', ja: 'ほこらしい' },
  'emotion.bored': { ko: '심심', en: 'Boredom', ja: 'たいくつ' },
  'emotion.calm': { ko: '평온', en: 'Calm', ja: 'おだやか' },
  // 정원
  'garden.empty': { ko: '아직 정원이 비어있어요.', en: 'Your garden is still empty.', ja: 'にわはまだからっぽ。' },
  'garden.emptyAsk': { ko: '오늘의 마음을 들려줄래요?', en: 'Want to share how you feel today?', ja: 'きょうのきもちをきかせて？' },
}

export function t(key: string, lang: Lang): string {
  const entry = STRINGS[key]
  if (!entry) return key
  return entry[lang] ?? entry.ko
}
