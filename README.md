# 🌱 마음 정원 (Mind Garden)

> 아이의 감정이 자라는 곳. 매일 3분, 마음을 표현하면 정원이 살아납니다.

초등학생을 위한 정서 케어 게임. 광고 없음, 서버 없음, 오프라인 동작.
Claude Code로 100% 개발 가능. 플레이스토어 출시 목표.

---

## 🚀 빠른 실행 (Windows + PowerShell)

```powershell
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

브라우저가 자동으로 `http://localhost:5173` 으로 열립니다.

---

## 📁 프로젝트 구조

```
mind-garden/
├── src/
│   ├── components/
│   │   ├── plants/           # 식물 SVG (8종 → 확장 예정 60종)
│   │   ├── friends/          # 친구 SVG (2종 → 확장 예정 8종)
│   │   ├── screens/          # 화면 컴포넌트
│   │   └── minigames/        # 미니게임 (1종 → 확장 예정 4종)
│   ├── data/
│   │   ├── emotions.ts       # 8가지 감정 정의
│   │   ├── plants.ts         # 식물 도감
│   │   └── friends.ts        # 친구 도감
│   ├── store/
│   │   └── appStore.ts       # Zustand 전역 상태
│   ├── utils/
│   │   ├── storage.ts        # IndexedDB
│   │   └── helpers.ts
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx               # 화면 라우터
│   └── main.tsx
├── package.json
└── README.md
```

---

## ✨ MVP 1.0에 구현된 것

✅ 이름 입력 → 정원 깨어남 (와! 모먼트 ①)
✅ 8가지 감정 선택 (기쁨/슬픔/화남/무서움/설렘/뿌듯/심심/평온)
✅ 별 1~5개로 강도 표현
✅ 감정에 맞는 식물 자람 애니메이션 (와! 모먼트 ②)
✅ 친구 등장 (와! 모먼트 ③, 슬픔/무서움 → 위로 토끼, 기쁨/설렘/뿌듯 → 축하 나비)
✅ 자란 식물이 정원에 누적
✅ 호흡 풍선 미니게임 (박스 호흡)
✅ IndexedDB 오프라인 저장
✅ 모바일 최적화 디자인

---

## 🤖 Claude Code로 확장하기 (복붙용 프롬프트)

각 영역을 Claude Code에 그대로 붙여넣으면 일관된 패턴으로 확장됩니다.

### 1️⃣ 식물 60종 확장

```
@src/data/plants.ts 와 @src/components/plants/PlantComponents.tsx 를 참고해서
식물 도감을 60종으로 확장해줘.

규칙:
- 8가지 감정(joy/sad/angry/fear/excited/proud/bored/calm) 각각 7~8종씩
- 강도(1~5) 구간을 나눠서 다양한 식물이 나오도록
- 희귀도: common 60%, rare 25%, epic 12%, legendary 3%
- 각 식물마다 PLANT_COMPONENTS에 SVG 컴포넌트 추가
- 기존 8종 패턴을 그대로 따라가되, 색감과 모양은 감정에 맞게 창의적으로
- 어린이가 좋아할 만한 귀엽고 따뜻한 디자인
- flavorText는 정서적으로 위로/응원/축하가 되는 문장으로

getPlantForEmotion 함수도 희귀도 가중치 추첨 로직으로 업데이트해줘.
```

### 2️⃣ 친구 8마리 확장

```
@src/data/friends.ts 와 @src/components/friends/FriendComponents.tsx 를 참고해서
친구를 8마리로 확장해줘.

추가할 친구:
1. 응원 다람쥐 - proud, excited (도전 후 도토리 선물)
2. 차분 거북이 - angry (깊은 숨 같이 쉬어줌, 호흡 게임 추천)
3. 용기 여우 - fear (손전등으로 어둠 비춰줌)
4. 호기심 부엉이 - 새 감정 처음 표현 시 등장 (모든 감정)
5. 꿈꾸는 고래 - calm, bored (밤 시간대만)
6. 비밀 유니콘 - 30일 출석 시 1회 등장 (레어)

각 친구마다:
- 감정-친구 매칭 규칙 (triggerEmotions)
- 어울리는 멘트 (greeting)
- SVG 컴포넌트 (애니메이션 포함, motion 활용)
- FRIEND_COMPONENTS 매핑 추가

getFriendForEmotion 함수가 여러 친구 중 가중 랜덤으로 고르도록 개선.
```

### 3️⃣ 미니게임 3종 추가

```
@src/components/minigames/BreathingScreen.tsx 의 패턴을 따라서
3개의 미니게임을 추가해줘.

추가할 게임:
1. WorryBubbleScreen.tsx - 걱정 비눗방울 (불안/무서움)
   - 화면 하단 입력창에 걱정 적기 → 비눗방울에 담겨 떠오름 → 탭하면 터지며 사라짐
   - 5개 터뜨리면 완료

2. GratitudeStarScreen.tsx - 감사 별찾기 (슬픔/심심)
   - 밤하늘에 별 3개 떠 있음, 각 별 탭하면 "오늘 좋았던 것" 입력창
   - 3개 다 채우면 별자리가 빛나며 연결됨

3. ColorPaintScreen.tsx - 마음 색칠 (화남/혼란)
   - 빈 식물 윤곽선에 색칠 (탭하면 색이 칠해짐)
   - 8색 팔레트, 완성하면 정원에 저장

각 게임은 GardenScreen 하단에 진입 버튼 추가.
감정 입력 후 PlantGrowingScreen에서 해당 감정이면 미니게임 추천 모달 띄우기.
```

### 4️⃣ 기억의 나무 (7일 출석 보상)

```
새 기능: 기억의 나무

@src/store/appStore.ts 에 다음 추가:
- 출석일 수 계산 (entries의 unique date 카운트)
- 7일 이상 → 기억의 나무 잠금 해제

@src/components/screens/GardenScreen.tsx 의 정원 중앙에 큰 나무 추가:
- 잠금 해제 전: 작은 묘목 회색
- 7일+: 큰 나무, 가지에 그동안 자란 식물들이 별처럼 매달림
- 탭하면 새 화면 MemoryTreeScreen.tsx
  - 한 달 캘린더 + 각 날짜에 그날의 감정 식물 미니
  - 별 탭하면 그날의 entry detail (날짜, 감정, note)
```

### 5️⃣ 사운드 추가 (Howler.js)

```
@public/sounds/ 폴더에 효과음 추가 후 (Freesound나 Pixabay에서 다운로드):
- seed_fall.mp3 (씨앗 떨어짐)
- plant_grow.mp3 (식물 자람)
- sparkle.mp3 (반짝)
- friend_arrive.mp3 (친구 등장)
- breathe_in.mp3, breathe_out.mp3 (호흡)
- bgm_garden.mp3 (배경음악, 부드러운 피아노 루프)

@src/utils/sound.ts 를 만들어서 Howl 인스턴스 캐싱.
playSound(name) 헬퍼 함수 export.
각 화면에서 적절한 타이밍에 호출.

설정 화면에서 음소거 토글 가능하게.
```

### 6️⃣ Capacitor로 Android APK 빌드

```
이 프로젝트를 Android 앱으로 만들기 위한 Capacitor 설정을 추가해줘:

1. capacitor 패키지 설치 (@capacitor/core, @capacitor/cli, @capacitor/android)
2. capacitor.config.ts 생성 (appId: com.mindgarden.app, appName: 마음 정원)
3. npm run build → npx cap add android → npx cap sync 흐름 안내
4. Android Studio에서 열어서 APK/AAB 빌드하는 단계 README에 추가
5. 앱 아이콘과 스플래시 이미지를 위한 가이드
6. 화면 회전 비활성화 (세로 고정), 상태바 색상 설정
```

### 7️⃣ 부모 리포트 (확장 수익화)

```
주간 리포트 화면 추가:

@src/components/screens/ParentReportScreen.tsx
- 지난 7일 감정 분포 도넛 차트
- 가장 자주 나타난 감정 TOP 3
- AI 인사이트 영역 (현재는 룰베이스, 추후 Claude API)
- "○○이는 이번 주에 ___을 가장 많이 느꼈어요" 같은 문장
- PIN 잠금으로 부모만 접근 (4자리)

설정 화면에서 PIN 등록/변경 가능.
```

---

## 🎯 개발 일정

| 주차 | 작업 |
|------|------|
| **0주 (지금)** | MVP 1.0 (이 ZIP) |
| 1주 | 식물 60종 확장 |
| 2주 | 친구 8마리 + 미니게임 3종 |
| 3주 | 기억의 나무, 사운드 |
| 4주 | 부모 리포트, 설정 화면 |
| 5주 | Capacitor 빌드, 테스트 |
| 6주 | Play Console 등록 (심사 1~2주) |

---

## 🔒 개인정보 & COPPA 준수

- 모든 데이터는 **기기 내 IndexedDB만** 사용
- 서버 전송 없음, 계정 없음, 광고 없음
- 한국 정보통신망법 + 미국 COPPA 자동 충족
- 13세 미만 어린이 안전 카테고리로 출시 가능

---

## 💰 수익화 모델

- ✅ 식물/정원 스킨 IAP ($1.99)
- ✅ 가족 프리미엄 구독 ($3.99/월) - 리포트, 무제한, AI 코치
- ✅ B2B 학교 라이선스 (장기)
- ❌ 광고, 가챠, 다크패턴 일체 없음

---

## 🐛 문제 해결

**npm install 에러:**
- Node.js 18+ 확인 (`node -v`)
- `npm cache clean --force` 후 재시도

**식물이 안 보임:**
- 브라우저 콘솔에서 IndexedDB 확인
- DevTools → Application → IndexedDB → mind-garden-db

**처음부터 다시 시작하려면:**
- 브라우저 DevTools → Application → Clear storage → Clear site data

---

## 📜 라이선스

MIT
