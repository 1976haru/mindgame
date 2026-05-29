import { HeroDomain } from './heroes'

export type Difficulty = 'easy' | 'medium' | 'hard'

export interface EpisodeChoice {
  text: string
  correct: boolean
}

export interface EpisodeCharacter {
  avatar: string   // AnimalCharacters id
  name: string
  plea: string     // 자기 입장
}

export interface ComicPanel {
  avatar?: string
  caption: string
}

export interface Episode {
  id: string
  domain: HeroDomain
  difficulty: Difficulty
  title: string
  situation: ComicPanel[]      // 1단계: 상황 (만화 컷)
  characters: EpisodeCharacter[] // 2단계: 인물의 호소
  question: string             // 3단계: 질문
  choices: EpisodeChoice[]     // 3단계: 선택지
  explanation: string          // 4단계: 솔로몬 해설
  lawPrinciple: string         // 4단계: 한 줄 법 원리
  realLaw?: string             // 실제 법 (고학년)
  rewardHeroId: string
  rewardBuildingId: string
}

export const EPISODES: Episode[] = [
  // ===== 🟢 기초질서 (easy) =====
  {
    id: 'ep01', domain: '기초질서', difficulty: 'easy', title: '줄서기 대소동',
    situation: [
      { avatar: 'bear', caption: '빵집 앞에 친구들이 길게 줄을 섰어요.' },
      { avatar: 'rabbit', caption: '그런데 아기 토끼가 줄 맨 앞으로 쏙 끼어들었어요!' },
      { avatar: 'bear', caption: '곰돌이가 깜짝 놀랐어요. "벌써 30분이나 기다렸는데..."' }
    ],
    characters: [
      { avatar: 'rabbit', name: '아기 토끼', plea: '나는 아기라서 빨리 사야 해! 먼저 사게 해줘!' },
      { avatar: 'bear', name: '곰돌이', plea: '저는 30분이나 줄을 서서 기다렸어요. 순서대로 해야죠!' }
    ],
    question: '누가 먼저 빵을 살까요?',
    choices: [
      { text: '아기 토끼가 먼저 사요', correct: false },
      { text: '줄 선 순서대로 곰돌이가 먼저 사요', correct: true },
      { text: '가위바위보로 정해요', correct: false }
    ],
    explanation: '줄서기는 모두에게 공정한 약속이에요. "먼저 온 사람이 먼저"라는 규칙이 없다면, 힘세거나 목소리 큰 사람이 항상 먼저가 될 거예요. 약속의 줄은 모두를 똑같이 대하는 거예요.',
    lawPrinciple: '공정한 절차가 공정한 결과를 만들어요',
    rewardHeroId: 'sejong', rewardBuildingId: 'fountain'
  },
  {
    id: 'ep02', domain: '기초질서', difficulty: 'easy', title: '횡단보도의 약속',
    situation: [
      { avatar: 'dog', caption: '빨간 신호등 앞, 길에는 차가 한 대도 없어요.' },
      { avatar: 'dog', caption: '강아지는 "차도 없는데 그냥 건널까?" 생각했어요.' },
      { avatar: 'raccoon', caption: '운전사 너구리가 외쳤어요. "신호 지켜야지!"' }
    ],
    characters: [
      { avatar: 'dog', name: '강아지', plea: '차가 한 대도 없는데, 그냥 건너도 되지 않아?' },
      { avatar: 'raccoon', name: '너구리 운전사', plea: '신호는 모두의 약속이야. 갑자기 차가 올 수도 있어!' }
    ],
    question: '빨간불에 차가 없으면 건너도 될까요?',
    choices: [
      { text: '차가 없으면 건너도 돼요', correct: false },
      { text: '신호는 모두의 약속이니 지켜야 해요', correct: true },
      { text: '어른이 옆에 있으면 건너도 돼요', correct: false }
    ],
    explanation: '신호는 운전자와 걷는 사람 모두의 약속이에요. 한 명만 약속을 어겨도 큰 사고가 날 수 있어요. 약속을 지키는 건 나 자신을 지키는 거예요.',
    lawPrinciple: '교통신호는 생명을 지키는 약속이에요',
    rewardHeroId: 'jeongyakyong', rewardBuildingId: 'library'
  },
  {
    id: 'ep03', domain: '기초질서', difficulty: 'easy', title: '도서관에서 시끄러운 친구',
    situation: [
      { avatar: 'rabbit', caption: '조용한 도서관에서 토끼가 큰 소리로 떠들어요.' },
      { avatar: 'squirrel', caption: '사서 다람쥐가 "조용히 해줄래?" 부탁했어요.' },
      { avatar: 'rabbit', caption: '토끼가 말했어요. "여기서 떠드는 건 내 자유야!"' }
    ],
    characters: [
      { avatar: 'rabbit', name: '토끼', plea: '말하는 건 내 자유잖아! 왜 막는 거야?' },
      { avatar: 'squirrel', name: '사서 다람쥐', plea: '다른 친구들도 조용히 책 읽을 권리가 있어요.' }
    ],
    question: '도서관에서 자유롭게 떠들어도 될까요?',
    choices: [
      { text: '자유니까 떠들어도 돼요', correct: false },
      { text: '다른 사람을 방해하지 않는 게 진짜 자유예요', correct: true },
      { text: '조금만 작게 말하면 돼요', correct: false }
    ],
    explanation: '내 자유는 다른 사람의 자유가 시작되는 곳에서 끝나요. 도서관은 모두가 책 읽을 권리를 가진 곳이에요. 내 권리만큼 다른 사람의 권리도 소중해요.',
    lawPrinciple: '내 권리는 남의 권리와 똑같이 소중해요',
    rewardHeroId: 'jangyeongsil', rewardBuildingId: 'school'
  },

  // ===== 🟡 약속과 책임 (medium) =====
  {
    id: 'ep04', domain: '약속과 책임', difficulty: 'medium', title: '빌린 책을 잃어버린 친구',
    situation: [
      { avatar: 'owl', caption: '부엉이가 아끼는 책을 여우에게 빌려줬어요.' },
      { avatar: 'fox', caption: '그런데 여우가 그만 책을 잃어버렸어요.' },
      { avatar: 'fox', caption: '여우가 말했어요. "어차피 헌책이잖아, 괜찮지?"' }
    ],
    characters: [
      { avatar: 'fox', name: '여우', plea: '오래된 헌책인데... 그냥 미안하다고 하면 안 될까?' },
      { avatar: 'owl', name: '부엉이', plea: '나한테는 소중한 책이었어. 빌린 건 돌려줘야지.' }
    ],
    question: '여우는 어떻게 해야 할까요?',
    choices: [
      { text: '헌책이니까 미안하다고만 해요', correct: false },
      { text: '새 책을 사서 돌려줘요', correct: true },
      { text: '다른 책으로 바꿔줘요', correct: false }
    ],
    explanation: '빌린 것은 빌린 그대로 돌려주는 게 약속이에요. 내 부주의로 잃어버렸다면 책임을 져야 해요. 헌책이든 새책이든 친구에게는 소중한 물건이에요.',
    lawPrinciple: '빌린 것에는 돌려줄 책임이 따라요',
    rewardHeroId: 'yisunsin', rewardBuildingId: 'bell_tower'
  },
  {
    id: 'ep05', domain: '약속과 책임', difficulty: 'medium', title: '거짓말이 만든 큰 사건',
    situation: [
      { avatar: 'dog', caption: '강아지가 재미로 "늑대가 나타났다!" 외쳤어요.' },
      { avatar: 'bear', caption: '마을 친구들이 깜짝 놀라 달려왔지만 거짓말이었죠.' },
      { avatar: 'dog', caption: '다음 날, 진짜 늑대가 나타났는데... 아무도 오지 않았어요.' }
    ],
    characters: [
      { avatar: 'dog', name: '강아지', plea: '그냥 장난이었는데... 왜 아무도 안 믿어주지?' },
      { avatar: 'bear', name: '마을 친구', plea: '거짓말을 자꾸 하니까 이제 못 믿겠어.' }
    ],
    question: '거짓말은 왜 위험할까요?',
    choices: [
      { text: '한 번 정도는 괜찮아요', correct: false },
      { text: '신뢰는 한 번 깨지면 되돌리기 어려워요', correct: true },
      { text: '어른들 거짓말이 더 나빠요', correct: false }
    ],
    explanation: '신뢰는 작은 약속들이 모여 만들어져요. 거짓말 한 번은 작아 보여도 신뢰의 다리를 무너뜨려요. 정말 도움이 필요할 때 아무도 믿어주지 않게 돼요.',
    lawPrinciple: '믿음을 지키는 것이 가장 큰 약속이에요',
    rewardHeroId: 'ahnjunggeun', rewardBuildingId: 'trust_bridge'
  },
  {
    id: 'ep06', domain: '약속과 책임', difficulty: 'medium', title: '약속 시간에 늦은 친구',
    situation: [
      { avatar: 'turtle', caption: '토끼와 거북이가 만나기로 약속했어요.' },
      { avatar: 'rabbit', caption: '그런데 토끼는 매번 한 시간씩 늦게 와요.' },
      { avatar: 'turtle', caption: '거북이는 오늘도 한참을 기다렸어요.' }
    ],
    characters: [
      { avatar: 'rabbit', name: '토끼', plea: '조금 늦은 거잖아. 미안하다고 했으니 됐지?' },
      { avatar: 'turtle', name: '거북이', plea: '기다리는 동안 내 소중한 시간이 사라졌어.' }
    ],
    question: '왜 약속 시간을 지켜야 할까요?',
    choices: [
      { text: '늦어도 미안하다고 하면 돼요', correct: false },
      { text: '친구의 시간도 내 시간만큼 소중하니까요', correct: true },
      { text: '친한 친구는 늦어도 괜찮아요', correct: false }
    ],
    explanation: '시간은 누구에게나 똑같이 소중해요. 약속 시간을 안 지키는 건 친구의 시간을 함부로 쓰는 거예요. 작은 약속을 잘 지키는 사람이 큰 약속도 지킬 수 있어요.',
    lawPrinciple: '약속은 작은 것부터 지키는 거예요',
    rewardHeroId: 'yugwansun', rewardBuildingId: 'clock_tower'
  },

  // ===== 🟡 공정과 차별 (medium) =====
  {
    id: 'ep07', domain: '공정과 차별', difficulty: 'medium', title: '사다리는 누구에게?',
    situation: [
      { avatar: 'giraffe', caption: '높은 나무에 맛있는 사과가 잔뜩 열렸어요.' },
      { avatar: 'giraffe', caption: '키 큰 기린은 손쉽게 사과를 따 먹어요.' },
      { avatar: 'rabbit', caption: '하지만 키 작은 토끼는 아무리 뛰어도 닿지 않아요. 사다리는 하나뿐!' }
    ],
    characters: [
      { avatar: 'giraffe', name: '기린', plea: '사다리는 똑같이 반반 나눠 쓰는 게 공평하지 않아?' },
      { avatar: 'rabbit', name: '토끼', plea: '나는 사다리가 없으면 하나도 못 먹어...' }
    ],
    question: '사다리는 누구에게 더 필요할까요?',
    choices: [
      { text: '똑같이 반씩 나눠 써요', correct: false },
      { text: '못 닿는 토끼가 더 많이 써요', correct: true },
      { text: '먼저 가져온 기린이 써요', correct: false }
    ],
    explanation: '"똑같이"가 항상 "공정"은 아니에요. 진짜 공정은 "필요한 사람에게 필요한 만큼"이에요. 어려움이 있는 사람을 더 도와주는 게 진짜 평등이에요.',
    lawPrinciple: '필요한 사람을 더 돕는 것이 진짜 평등이에요',
    rewardHeroId: 'heojun', rewardBuildingId: 'scale_tower'
  },
  {
    id: 'ep08', domain: '공정과 차별', difficulty: 'medium', title: '여자아이는 축구하면 안 돼?',
    situation: [
      { avatar: 'cat', caption: '운동장에서 강아지들이 축구를 하고 있어요.' },
      { avatar: 'cat', caption: '고양이가 "나도 같이 하고 싶어!" 다가왔어요.' },
      { avatar: 'dog', caption: '강아지가 말했어요. "여자는 축구 못 해."' }
    ],
    characters: [
      { avatar: 'dog', name: '강아지', plea: '축구는 힘든 운동이라 여자애는 어려울 거야.' },
      { avatar: 'cat', name: '고양이', plea: '나도 축구 좋아하고 잘할 수 있어! 왜 안 돼?' }
    ],
    question: '고양이는 축구하면 안 될까요?',
    choices: [
      { text: '여자는 다른 걸 해야 해요', correct: false },
      { text: '성별과 상관없이 좋아하는 걸 할 권리가 있어요', correct: true },
      { text: '축구는 어려우니 안 돼요', correct: false }
    ],
    explanation: '남자, 여자라는 이유로 누군가의 권리를 막을 수 없어요. 좋아하는 일을 할 자유는 모두에게 똑같이 있어요. 신사임당 시대에도 여자가 그림을 그렸어요. 지금은 더더욱 가능하답니다.',
    lawPrinciple: '성별로 사람을 차별하면 안 돼요',
    realLaw: '헌법 제11조 (평등권)',
    rewardHeroId: 'shinsaimdang', rewardBuildingId: 'equality_garden'
  },
  {
    id: 'ep09', domain: '공정과 차별', difficulty: 'medium', title: '가난을 놀리는 친구들',
    situation: [
      { avatar: 'squirrel', caption: '다람쥐의 옷이 조금 낡았어요.' },
      { avatar: 'hamster', caption: '햄스터들이 "가난뱅이야~" 하고 놀렸어요.' },
      { avatar: 'squirrel', caption: '다람쥐는 고개를 푹 숙였어요.' }
    ],
    characters: [
      { avatar: 'hamster', name: '햄스터', plea: '그냥 농담이었어. 뭐가 잘못이야?' },
      { avatar: 'squirrel', name: '다람쥐', plea: '우리 집 사정 때문인데... 너무 속상해.' }
    ],
    question: '친구의 가난을 놀려도 될까요?',
    choices: [
      { text: '농담이면 괜찮아요', correct: false },
      { text: '가난은 그 사람의 잘못이 아니에요', correct: true },
      { text: '가난한 친구가 잘못한 거예요', correct: false }
    ],
    explanation: '사람마다 사정이 달라요. 가난은 그 사람의 잘못이 아니에요. 박성춘 어르신은 백정이라는 차별을 이겨내고 "모든 사람은 평등하다"고 외쳤어요. 친구의 환경으로 놀리는 건 큰 폭력이에요.',
    lawPrinciple: '모든 사람은 똑같이 존엄하고 귀해요',
    realLaw: '헌법 제10조 (인간의 존엄과 가치)',
    rewardHeroId: 'baekjeong_park', rewardBuildingId: 'dignity_plaza'
  },

  // ===== 🔴 권리와 의무 (hard) =====
  {
    id: 'ep10', domain: '권리와 의무', difficulty: 'hard', title: '표현의 자유, 어디까지?',
    situation: [
      { avatar: 'dog', caption: '강아지가 친구의 우스운 사진을 허락 없이 찍었어요.' },
      { avatar: 'dog', caption: 'SNS에 "재미있는 표정ㅋㅋ" 하며 올렸어요.' },
      { avatar: 'cat', caption: '사진 속 친구는 무척 부끄럽고 속상했어요.' }
    ],
    characters: [
      { avatar: 'dog', name: '강아지', plea: '내가 올리고 싶은 걸 올리는 건 내 자유잖아!' },
      { avatar: 'cat', name: '친구', plea: '내 허락도 없이 내 사진을 올리면 어떡해...' }
    ],
    question: '표현의 자유는 어디까지 괜찮을까요?',
    choices: [
      { text: '모든 표현은 자유예요', correct: false },
      { text: '다른 사람의 권리를 해치면 안 돼요', correct: true },
      { text: '친구 사이니까 괜찮아요', correct: false }
    ],
    explanation: '표현의 자유는 아주 중요한 권리예요. 하지만 다른 사람의 권리를 해치는 건 자유가 아니라 폭력이에요. 사진에는 그 사람의 초상권이 있어요. 김구 선생님도 "문화의 힘"은 서로를 존중하는 데서 온다고 하셨어요.',
    lawPrinciple: '내 자유는 남의 권리를 해치지 않는 선까지예요',
    realLaw: '헌법 제37조 제2항 · 정보통신망법 제44조',
    rewardHeroId: 'kimgu', rewardBuildingId: 'liberty_bell'
  },
  {
    id: 'ep11', domain: '권리와 의무', difficulty: 'hard', title: '돈으로 친구를 사도 될까?',
    situation: [
      { avatar: 'raccoon', caption: '부잣집 너구리가 매일 친구들에게 간식을 사줘요.' },
      { avatar: 'raccoon', caption: '너구리가 말했어요. "내가 사줘야 나랑 놀아주는 거야."' },
      { avatar: 'rabbit', caption: '친구들은 간식 때문에 어쩔 수 없이 함께 있어요.' }
    ],
    characters: [
      { avatar: 'raccoon', name: '너구리', plea: '돈이 많으니까 친구한테 베푸는 게 뭐가 나빠?' },
      { avatar: 'rabbit', name: '친구', plea: '간식 없이도 진짜로 친해지고 싶은데...' }
    ],
    question: '돈으로 친구를 사는 건 어떨까요?',
    choices: [
      { text: '돈이 있으니 괜찮아요', correct: false },
      { text: '진짜 친구는 마음으로 사귀고, 가진 것엔 책임이 따라요', correct: true },
      { text: '친구가 좋아하면 괜찮아요', correct: false }
    ],
    explanation: '가진 것이 많을수록 그것을 어떻게 쓰느냐가 더 중요해요. 이회영 선생님 가족은 큰 부자였지만 나라를 위해 모두 썼어요. 진짜 친구는 돈이 아니라 마음으로 만들어요.',
    lawPrinciple: '많이 가진 사람은 더 큰 책임이 있어요',
    rewardHeroId: 'ihoeyoung', rewardBuildingId: 'responsibility_pillar'
  },
  {
    id: 'ep12', domain: '권리와 의무', difficulty: 'hard', title: '청소를 떠넘기는 친구',
    situation: [
      { avatar: 'dog', caption: '우리 반 청소 당번 시간이에요.' },
      { avatar: 'fox', caption: '한 친구가 매번 슬그머니 사라져요.' },
      { avatar: 'fox', caption: '"나는 청소 안 하기로 했어!" 하고 도망가요.' }
    ],
    characters: [
      { avatar: 'fox', name: '도망가는 친구', plea: '청소하기 싫어. 안 하는 것도 내 자유 아니야?' },
      { avatar: 'dog', name: '반 친구', plea: '우리 반은 다 같이 쓰는 곳이잖아. 같이 해야지.' }
    ],
    question: '공동의 의무를 안 하는 건 어떨까요?',
    choices: [
      { text: '안 하는 것도 본인 자유예요', correct: false },
      { text: '함께 사는 공동체에선 모두가 의무를 나눠야 해요', correct: true },
      { text: '다른 친구가 대신 하면 돼요', correct: false }
    ],
    explanation: '권리만 있고 의무가 없는 건 없어요. 우리 반은 우리 모두의 것이에요. 을지문덕 장군이 적을 막은 건 모든 백성이 함께 의무를 다했기 때문이에요. 작은 의무를 다하는 사람이 진짜 시민이에요.',
    lawPrinciple: '권리에는 언제나 의무가 함께 따라와요',
    rewardHeroId: 'uljimundeok', rewardBuildingId: 'citizen_hall'
  },

  // ===== 🔴 안전과 보호 (hard) =====
  {
    id: 'ep13', domain: '안전과 보호', difficulty: 'hard', title: '괴롭힘을 본 친구',
    situation: [
      { avatar: 'hamster', caption: '한 친구가 다른 친구를 괴롭히는 걸 봤어요.' },
      { avatar: 'rabbit', caption: '약한 친구는 울먹이고 있어요.' },
      { avatar: 'dog', caption: '"내 일 아니니까 모르는 척하자..." 망설여져요.' }
    ],
    characters: [
      { avatar: 'dog', name: '목격한 나', plea: '끼어들면 나도 당할까 봐 무서워...' },
      { avatar: 'rabbit', name: '괴롭힘 당하는 친구', plea: '누가 좀 도와줬으면 좋겠어...' }
    ],
    question: '이럴 때 어떻게 해야 할까요?',
    choices: [
      { text: '무서우니까 모르는 척해요', correct: false },
      { text: '선생님이나 어른에게 알려서 도움을 요청해요', correct: true },
      { text: '같이 놀려서 괴롭히는 편에 서요', correct: false }
    ],
    explanation: '못 본 척하는 것도 괴롭힘을 돕는 일이 될 수 있어요. 직접 막지 못해도 어른에게 알릴 수 있어요. 을파소 재상은 "약한 사람을 돌보는 나라가 강한 나라"라고 했어요. 너의 작은 용기가 친구를 구할 수 있어요.',
    lawPrinciple: '약한 친구를 지키는 건 모두의 일이에요',
    realLaw: '학교폭력예방 및 대책에 관한 법률',
    rewardHeroId: 'ulpaso', rewardBuildingId: 'guardian_wall'
  },
  {
    id: 'ep14', domain: '안전과 보호', difficulty: 'hard', title: '이상한 어른의 부탁',
    situation: [
      { avatar: 'dog', caption: '길에서 모르는 너구리 어른이 다가왔어요.' },
      { avatar: 'raccoon', caption: '"엄마가 너 찾고 있어, 나랑 같이 가자."' },
      { avatar: 'dog', caption: '그런데 강아지는 엄마가 어디 있는지 잘 알고 있어요.' }
    ],
    characters: [
      { avatar: 'raccoon', name: '모르는 어른', plea: '어른이 도와주려는 거니까 따라오면 돼.' },
      { avatar: 'dog', name: '강아지', plea: '엄마는 분명 집에 있는데... 뭔가 이상해.' }
    ],
    question: '어떻게 해야 할까요?',
    choices: [
      { text: '어른이니까 따라가요', correct: false },
      { text: '단호히 거절하고 안전한 곳(가게·경찰)으로 가요', correct: true },
      { text: '일단 이야기는 들어봐요', correct: false }
    ],
    explanation: '모르는 어른이 도와달라거나 따라오라고 하면 조심해야 해요. 안창호 선생님은 "거짓말은 큰 폭력"이라고 했어요. 어른이라고 다 안전한 건 아니에요. 너의 안전이 가장 중요해요.',
    lawPrinciple: '내 안전을 지키는 것이 가장 먼저예요',
    realLaw: '아동복지법',
    rewardHeroId: 'ahnchanho', rewardBuildingId: 'honesty_lighthouse'
  },
  {
    id: 'ep15', domain: '안전과 보호', difficulty: 'hard', title: '어려움에 빠진 친구 (최종)',
    situation: [
      { avatar: 'bear', caption: '같은 반 친구네 집이 갑자기 어려워졌대요.' },
      { avatar: 'rabbit', caption: '그 친구는 학교에도 잘 못 나와요.' },
      { avatar: 'dog', caption: '"어떻게 하면 친구를 도울 수 있을까?" 고민이 돼요.' }
    ],
    characters: [
      { avatar: 'hamster', name: '수군대는 친구', plea: '불쌍하다고 다 같이 이야기해주면 되지 않아?' },
      { avatar: 'dog', name: '고민하는 나', plea: '친구가 부끄럽지 않게 도와주고 싶어.' }
    ],
    question: '친구를 어떻게 도와줄까요?',
    choices: [
      { text: '여기저기 떠벌리며 불쌍해해요', correct: false },
      { text: '조용히 선생님과 의논해서 도울 방법을 찾아요', correct: true },
      { text: '내 일이 아니니 모르는 척해요', correct: false }
    ],
    explanation: '위기에 빠진 사람을 돕는 건 큰 공감이에요. 하지만 자존심을 다치게 하지 않고 도와야 진짜 도움이에요. 김만덕 할머니는 자기 재산으로 굶주린 제주 사람들을 구했지만, 그들을 부끄럽게 하지 않았어요. 진짜 공감은 상대를 존중하는 거예요.',
    lawPrinciple: '공감은 모든 법의 뿌리예요',
    rewardHeroId: 'kimmandeok', rewardBuildingId: 'sharing_granary'
  }
]

export const EPISODE_BY_ID: Record<string, Episode> =
  EPISODES.reduce((acc, e) => { acc[e.id] = e; return acc }, {} as Record<string, Episode>)

export function getEpisodeById(id: string): Episode | undefined {
  return EPISODE_BY_ID[id]
}

/** 잠금 해제 여부: 첫 에피소드는 항상 열림, 이후는 직전 에피소드 클리어 시 */
export function isEpisodeUnlocked(episodeId: string, cleared: string[]): boolean {
  const idx = EPISODES.findIndex(e => e.id === episodeId)
  if (idx <= 0) return true
  return cleared.includes(EPISODES[idx - 1].id)
}
