import { DojoMission } from '../dojos'

const R = (empathy: number) => ({ empathy })

export const MUSIC_MISSIONS: DojoMission[] = [
  {
    id: 'music-9', dojoId: 'music', rank: 9, title: '음을 들어봐요', description: '도·레·미 중 어떤 음인지 맞춰요',
    missionType: 'pitch_match', passCondition: '5문제 중 4개 맞히기', rewards: R(4),
    config: {
      needCorrect: 4,
      pitchRounds: [
        { play: '도', choices: ['도', '레', '미'], answer: 0 },
        { play: '미', choices: ['도', '레', '미'], answer: 2 },
        { play: '레', choices: ['도', '레', '미'], answer: 1 },
        { play: '미', choices: ['레', '미', '도'], answer: 1 },
        { play: '도', choices: ['미', '도', '레'], answer: 1 }
      ]
    }
  },
  {
    id: 'music-8', dojoId: 'music', rank: 8, title: '리듬 따라하기', description: '박자에 맞춰 화면을 탭해요',
    missionType: 'rhythm_tap', passCondition: '8박 중 70% 성공', rewards: R(4),
    config: { beats: 8, tempo: 750, tolerance: 240 }
  },
  {
    id: 'music-7', dojoId: 'music', rank: 7, title: '악기 알아맞히기', description: '그림을 보고 악기 이름을 골라요',
    missionType: 'multiple_choice', passCondition: '5문제 중 4개', rewards: R(5),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '이 악기의 이름은?', emoji: '🎹', choices: ['피아노', '기타', '북', '나팔'], answer: 0 },
        { prompt: '이 악기의 이름은?', emoji: '🥁', choices: ['북', '피아노', '바이올린', '플루트'], answer: 0 },
        { prompt: '이 악기의 이름은?', emoji: '🎸', choices: ['기타', '북', '피아노', '나팔'], answer: 0 },
        { prompt: '이 악기의 이름은?', emoji: '🎻', choices: ['바이올린', '기타', '북', '피아노'], answer: 0 },
        { prompt: '이 악기의 이름은?', emoji: '🎺', choices: ['트럼펫(나팔)', '피아노', '기타', '북'], answer: 0 }
      ]
    }
  },
  {
    id: 'music-6', dojoId: 'music', rank: 6, title: '조금 빠른 리듬', description: '조금 더 빠른 박자에 맞춰요',
    missionType: 'rhythm_tap', passCondition: '12박 중 70% 성공', rewards: R(5),
    config: { beats: 12, tempo: 640, tolerance: 220 }
  },
  {
    id: 'music-5', dojoId: 'music', rank: 5, title: '도레미파솔', description: '다섯 음 중 어떤 음인지 맞춰요',
    missionType: 'pitch_match', passCondition: '5문제 중 4개', rewards: R(6),
    config: {
      needCorrect: 4,
      pitchRounds: [
        { play: '파', choices: ['미', '파', '솔'], answer: 1 },
        { play: '솔', choices: ['파', '솔', '라'], answer: 1 },
        { play: '도', choices: ['도', '솔', '미'], answer: 0 },
        { play: '미', choices: ['레', '미', '파'], answer: 1 },
        { play: '솔', choices: ['도', '솔', '파'], answer: 1 }
      ]
    }
  },
  {
    id: 'music-4', dojoId: 'music', rank: 4, title: '음악 이야기', description: '음악에 대한 상식을 맞춰요',
    missionType: 'multiple_choice', passCondition: '5문제 중 4개', rewards: R(6),
    config: {
      needCorrect: 4,
      questions: [
        { prompt: '여러 사람이 함께 부르는 노래를?', choices: ['합창', '독창', '박수', '연주'], answer: 0 },
        { prompt: '혼자서 부르는 노래는?', choices: ['독창', '합창', '연주', '춤'], answer: 0 },
        { prompt: '낮은 도와 높은 도 중, 더 높은 소리는?', emoji: '🎹', choices: ['높은 도', '낮은 도'], answer: 0 },
        { prompt: '피아노 건반을 오른쪽으로 갈수록 소리는?', emoji: '🎹', choices: ['높아져요', '낮아져요'], answer: 0 },
        { prompt: '노래에서 일정하게 반복되는 박은?', choices: ['박자', '색깔', '냄새', '무게'], answer: 0 }
      ]
    }
  },
  {
    id: 'music-3', dojoId: 'music', rank: 3, title: '정확한 음감', description: '한 음을 정확히 맞춰요',
    missionType: 'pitch_match', passCondition: '6문제 중 5개', rewards: R(7),
    config: {
      needCorrect: 5,
      pitchRounds: [
        { play: '라', choices: ['솔', '라', '시'], answer: 1 },
        { play: '시', choices: ['라', '시', "도'"], answer: 1 },
        { play: "도'", choices: ['시', "도'", '라'], answer: 1 },
        { play: '파', choices: ['미', '파', '솔'], answer: 1 },
        { play: '레', choices: ['도', '레', '미'], answer: 1 },
        { play: '솔', choices: ['파', '솔', '라'], answer: 1 }
      ]
    }
  },
  {
    id: 'music-2', dojoId: 'music', rank: 2, title: '빠른 리듬 도전', description: '빠른 박자를 정확히 따라쳐요',
    missionType: 'rhythm_tap', passCondition: '16박 중 70% 성공', rewards: R(8),
    config: { beats: 16, tempo: 520, tolerance: 190 }
  },
  {
    id: 'music-1', dojoId: 'music', rank: 1, title: '멜로디 듣기', description: '멜로디를 듣고 마지막 음을 맞춰요',
    missionType: 'pitch_match', passCondition: '5문제 중 4개', rewards: R(10),
    config: {
      needCorrect: 4,
      pitchRounds: [
        { play: '도-미-솔', choices: ['솔', '도', '미'], answer: 0 },
        { play: '미-파-솔', choices: ['솔', '미', '파'], answer: 0 },
        { play: '솔-미-도', choices: ['도', '솔', '미'], answer: 0 },
        { play: '도-레-미', choices: ['미', '도', '레'], answer: 0 },
        { play: '라-솔-파', choices: ['파', '라', '솔'], answer: 0 }
      ]
    }
  }
]
