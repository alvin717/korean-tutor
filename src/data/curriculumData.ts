import { Unit, SrsItem, LeaderboardUser, UserState } from '../types';

export const UNITS_DATA: Unit[] = [
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Unit 1: 한글 자모와 기초 발음',
    subtitle: '기본 모음과 자음, 받침(종성), 연음 결합 원리 마스터하기',
    themeColor: 'from-emerald-500 to-green-600',
    totalVocab: 24,
    checkpointGrammar: ['한글 음절 구조 (초성+중성+종성)', '기본 모음 6종과 이중 모음', '7종성법 (대표 받침 소리)', '연음 법칙 (Liaison)'],
    guidebook: {
      title: 'Unit 1 한글 기초 문법 & 발음 가이드',
      grammarPoints: [
        {
          title: '초성 이응(ㅇ)의 무음 규칙',
          explanation: '한글 음절은 자음 없이 시작할 수 없습니다. 모음 단독 소리를 표기할 때는 초성 자리에 소리값이 없는 자음 "ㅇ"을 넣습니다.',
          examples: [
            { korean: '아 = ㅇ + ㅏ [a]', english: 'Vowel "a" with silent initial consonant "ㅇ"' },
            { korean: '우 = ㅇ + ㅜ [u]', english: 'Vowel "u" with silent initial consonant "ㅇ"' }
          ]
        },
        {
          title: '받침의 7대표음 규칙',
          explanation: '한국어 받침(종성) 글자는 27개에 달하지만, 음절 끝에서 실제 발음되는 대표 소리는 [ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ] 단 7가지로 파열이 닫힙니다.',
          examples: [
            { korean: '옷, 낮, 꽃 → 모두 [옫, 낟, 꼳] (ㄷ 대표음)', english: 'End consonant simplifies to [d/t]' },
            { korean: '잎, 밥 → [입, 밥] (ㅂ 대표음)', english: 'End consonant simplifies to [b/p]' }
          ]
        },
        {
          title: '연음 법칙 (Liaison)',
          explanation: '받침 뒤에 모음으로 시작하는 음절(초성 ㅇ)이 오면, 받침 소리가 다음 음절의 첫소리로 넘어가서 부드럽게 발음됩니다.',
          examples: [
            { korean: '한국어 → [한구거]', english: 'Han-gug-eo becomes [Han-gu-geo]' },
            { korean: '음악 → [으막]', english: 'Eum-ak becomes [Eu-mak]' }
          ]
        }
      ],
      keyVocab: [
        { korean: '아이', english: 'Child', pronunciation: 'a-i' },
        { korean: '오이', english: 'Cucumber', pronunciation: 'o-i' },
        { korean: '우유', english: 'Milk', pronunciation: 'u-yu' },
        { korean: '나무', english: 'Tree', pronunciation: 'na-mu' },
        { korean: '물', english: 'Water', pronunciation: 'mul' },
        { korean: '밥', english: 'Rice / Meal', pronunciation: 'bap' },
        { korean: '책', english: 'Book', pronunciation: 'chaek' },
        { korean: '집', english: 'House', pronunciation: 'jip' }
      ],
      cultureTip: '한글은 1443년 조선의 세종대왕이 백성들이 쉽게 글을 익히도록 창제한 가장 과학적인 표음 문자입니다. 자음은 발음 기관의 모양을, 모음은 하늘(•), 땅(ㅡ), 사람(ㅣ)의 천지인을 본떠 만들었습니다.'
    },
    lessons: [
      {
        id: 'lesson-1-1',
        unitId: 'unit-1',
        unitTitle: 'Unit 1: 한글 자모와 기초 발음',
        title: '기본 모음과 첫 단어',
        description: '가장 자주 쓰이는 한글 모음(ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, ㅣ)과 기본 어휘를 익힙니다.',
        level: '초급 1',
        xpReward: 15,
        difficulty: 1,
        status: 'available',
        questions: [
          {
            id: 'q1-1-1',
            type: 'word-match',
            prompt: '단어 매칭 (Word Matching)',
            subPrompt: '한글 단어와 알맞은 영어 뜻을 짝지어 보세요.',
            wordPairs: [
              { korean: '아이', english: 'Child' },
              { korean: '오이', english: 'Cucumber' },
              { korean: '우유', english: 'Milk' },
              { korean: '여우', english: 'Fox' }
            ],
            correctAnswer: 'matched',
            explanation: '아이(Child), 오이(Cucumber), 우유(Milk), 여우(Fox)는 기본 모음으로 구성된 필수 어휘입니다.',
            hint: '우유는 마시는 흰색 음료예요.'
          },
          {
            id: 'q1-1-2',
            type: 'listening',
            prompt: '듣기 퀴즈 (Listening Quiz)',
            subPrompt: '원어민 발음을 듣고 올바른 단어를 선택하세요.',
            audioPrompt: '우유',
            options: ['아이', '오이', '우유', '여우'],
            correctAnswer: '우유',
            explanation: '[u-yu]로 발음되는 "우유(Milk)"입니다.',
            hint: '모음 ㅜ(u)와 ㅠ(yu)의 결합입니다.'
          },
          {
            id: 'q1-1-3',
            type: 'speaking',
            prompt: '말하기 연습 (Speaking Practice)',
            subPrompt: '마이크 버튼을 누르고 화면의 단어를 소리내어 발음해 보세요.',
            koreanText: '아이',
            romanization: 'a-i',
            englishText: 'Child',
            correctAnswer: '아이',
            explanation: 'ㅏ(a)와 ㅣ(i)를 또렷하게 연속으로 소리냅니다.',
            hint: 'a-i로 부드럽게 발음하세요.'
          },
          {
            id: 'q1-1-4',
            type: 'sentence-arrange',
            prompt: '문장 배열 (Sentence Assembly)',
            subPrompt: '"아이가 우유를 마셔요" 문장을 올바른 순서로 배열하세요.',
            options: ['아이가', '마셔요', '우유를'],
            correctAnswer: ['아이가', '우유를', '마셔요'],
            explanation: '한국어 기본 어순은 [주어(S) + 목적어(O) + 서술어(V)] 구조입니다.',
            grammarFocus: 'SOV 기본 어순'
          },
          {
            id: 'q1-1-5',
            type: 'dictation',
            prompt: '받아쓰기 (Dictation)',
            subPrompt: '들려주는 한국어 단어를 듣고 정확히 입력하세요.',
            audioPrompt: '오이',
            koreanText: '오이',
            romanization: 'o-i',
            correctAnswer: '오이',
            explanation: '오이(Cucumber)는 초록색 채소 단어입니다.'
          }
        ]
      },
      {
        id: 'lesson-1-2',
        unitId: 'unit-1',
        unitTitle: 'Unit 1: 한글 자모와 기초 발음',
        title: '기본 자음과 음절 결합',
        description: '자음(ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ)과 모음이 만나 하나의 글자를 이루는 원리를 배웁니다.',
        level: '초급 1',
        xpReward: 15,
        difficulty: 1,
        status: 'available',
        questions: [
          {
            id: 'q1-2-1',
            type: 'word-match',
            prompt: '자음 결합 단어 매칭',
            subPrompt: '단어와 뜻을 올바르게 짝지으세요.',
            wordPairs: [
              { korean: '나무', english: 'Tree' },
              { korean: '다리', english: 'Leg / Bridge' },
              { korean: '모자', english: 'Hat' },
              { korean: '바지', english: 'Pants' }
            ],
            correctAnswer: 'matched',
            explanation: '나무(Tree), 다리(Leg), 모자(Hat), 바지(Pants)는 일상에서 자주 쓰이는 자음 결합 단어입니다.'
          },
          {
            id: 'q1-2-2',
            type: 'speaking',
            prompt: '자음 발음 연습',
            subPrompt: '소리내어 화면의 단어를 발음해 보세요.',
            koreanText: '나무',
            romanization: 'na-mu',
            englishText: 'Tree',
            correctAnswer: '나무',
            explanation: 'ㄴ(n) + ㅏ(a) = 나, ㅁ(m) + ㅜ(u) = 무 입니다.'
          },
          {
            id: 'q1-2-3',
            type: 'fill-blank',
            prompt: '빈칸 단어 채우기',
            subPrompt: '문맥에 어울리는 알맞은 단어를 선택하세요.',
            koreanText: '머리에 멋진 [  ]를 써요.',
            options: ['모자', '바지', '다리'],
            correctAnswer: '모자',
            explanation: '머리에 착용하는 물건은 "모자(Hat)"입니다.'
          },
          {
            id: 'q1-2-4',
            type: 'sentence-arrange',
            prompt: '문장 완성하기',
            subPrompt: '"아이가 모자를 써요"를 어순대로 맞추세요.',
            options: ['아이가', '써요', '모자를'],
            correctAnswer: ['아이가', '모자를', '써요'],
            explanation: '주어(아이가) + 목적어(모자를) + 서술어(써요) 순서입니다.'
          },
          {
            id: 'q1-2-5',
            type: 'dictation',
            prompt: '자음 결합 단어 받아쓰기',
            subPrompt: '발음을 듣고 한글 단어를 쓰세요.',
            audioPrompt: '다리',
            koreanText: '다리',
            correctAnswer: '다리',
            explanation: '다리(Leg 또는 Bridge)는 ㄷ+ㅏ, ㄹ+ㅣ 로 구성됩니다.'
          }
        ]
      },
      {
        id: 'lesson-1-3',
        unitId: 'unit-1',
        unitTitle: 'Unit 1: 한글 자모와 기초 발음',
        title: '받침과 7종성법',
        description: '글자 아래에 들어가는 받침(종성) 소리와 대표 발음을 학습합니다.',
        level: '초급 1',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q1-3-1',
            type: 'word-match',
            prompt: '받침 필수 어휘 매칭',
            subPrompt: '받침이 들어간 대표 어휘와 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '물', english: 'Water' },
              { korean: '밥', english: 'Rice / Meal' },
              { korean: '책', english: 'Book' },
              { korean: '집', english: 'House / Home' }
            ],
            correctAnswer: 'matched',
            explanation: '물(ㄹ 받침), 밥(ㅂ 받침), 책(ㄱ 받침), 집(ㅂ 받침)은 매일 사용하는 어휘입니다.'
          },
          {
            id: 'q1-3-2',
            type: 'listening',
            prompt: '받침 구별 듣기 평가',
            subPrompt: '원어민 소리를 듣고 일치하는 단어를 고르세요.',
            audioPrompt: '한국',
            options: ['한국', '중국', '미국', '영국'],
            correctAnswer: '한국',
            explanation: '한국(Korea)은 ㅎ+ㅏ+ㄴ(한), ㄱ+ㅜ+ㄱ(국) 받침 구조입니다.'
          },
          {
            id: 'q1-3-3',
            type: 'fill-blank',
            prompt: '받침에 따른 주격조사 (이/가)',
            subPrompt: '단어의 받침 유무에 알맞은 조사를 고르세요.',
            koreanText: '물[  ] 시원해요.',
            options: ['이', '가', '은'],
            correctAnswer: '이',
            explanation: '"물"에는 받침(ㄹ)이 있으므로 주격조사 "이"가 결합합니다. (받침 있음: 이, 받침 없음: 가)'
          },
          {
            id: 'q1-3-4',
            type: 'sentence-arrange',
            prompt: '문장 순서 배열',
            subPrompt: '"저는 집에서 책을 읽어요" 순서로 배치하세요.',
            options: ['저는', '집에서', '책을', '읽어요'],
            correctAnswer: ['저는', '집에서', '책을', '읽어요'],
            explanation: '주어(저는) + 장소(집에서) + 목적어(책을) + 동사(읽어요) 순서입니다.'
          },
          {
            id: 'q1-3-5',
            type: 'dictation',
            prompt: '받침 단어 받아쓰기',
            subPrompt: '소리를 듣고 글자를 적으세요.',
            audioPrompt: '밥',
            koreanText: '밥',
            correctAnswer: '밥',
            explanation: '밥(Meal/Rice)은 ㅂ+ㅏ+ㅂ 으로 종성 ㅂ이 소리를 닫아줍니다.'
          }
        ]
      },
      {
        id: 'lesson-1-4',
        unitId: 'unit-1',
        unitTitle: 'Unit 1: 한글 자모와 기초 발음',
        title: '음운 변동: 연음 법칙',
        description: '받침 뒤에 모음이 올 때 소리가 부드럽게 이어지는 연음 현상을 마스터합니다.',
        level: '초급 1',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q1-4-1',
            type: 'listening',
            prompt: '연음 발음 듣기',
            subPrompt: '원어민의 자연스러운 연음 소리를 듣고 표기 단어를 고르세요.',
            audioPrompt: '한국어',
            options: ['한국어', '한구거', '한국', '국어'],
            correctAnswer: '한국어',
            explanation: '발음은 [한구거]이지만 올바른 한글 맞춤법 표기는 "한국어"입니다.',
            hint: '소리는 [한구거]로 납니다.'
          },
          {
            id: 'q1-4-2',
            type: 'speaking',
            prompt: '연음 발음 실전 말하기',
            subPrompt: '[으막]으로 부드럽게 이어 발음해 보세요.',
            koreanText: '음악',
            romanization: 'eu-mak',
            englishText: 'Music',
            correctAnswer: '음악',
            explanation: 'ㅁ 받침이 뒤의 무음 ㅇ 자리로 옮겨가 [으막]으로 소리납니다.'
          },
          {
            id: 'q1-4-3',
            type: 'word-match',
            prompt: '연음 대표 단어 매칭',
            subPrompt: '연음이 일어나는 단어와 뜻을 연결하세요.',
            wordPairs: [
              { korean: '한국어', english: 'Korean language' },
              { korean: '음악', english: 'Music' },
              { korean: '월요일', english: 'Monday' },
              { korean: '꽃이', english: 'Flower (subject)' }
            ],
            correctAnswer: 'matched',
            explanation: '한국어[한구거], 음악[으막], 월요일[워료일], 꽃이[꼬치]로 연음됩니다.'
          },
          {
            id: 'q1-4-4',
            type: 'fill-blank',
            prompt: '빈칸 조사 채우기',
            subPrompt: '받침과 조사가 결합할 때의 문장을 완성하세요.',
            koreanText: '아침에 신나는 음악[  ] 들어요.',
            options: ['을', '를', '이'],
            correctAnswer: '을',
            explanation: '"음악"에는 받침(ㄱ)이 있으므로 목적격 조사 "을"이 옵니다. 발음은 [으마글]이 됩니다.'
          },
          {
            id: 'q1-4-5',
            type: 'dictation',
            prompt: '연음 단어 받아쓰기',
            subPrompt: '소리를 듣고 정확한 맞춤법으로 표기하세요.',
            audioPrompt: '음악',
            koreanText: '음악',
            correctAnswer: '음악',
            explanation: '소리는 [으막]이지만 단어 표기는 "음악"입니다.'
          }
        ]
      },
      {
        id: 'lesson-1-5',
        unitId: 'unit-1',
        unitTitle: 'Unit 1: 한글 자모와 기초 발음',
        title: 'Unit 1 체크포인트: 한글 마스터 퀘스트',
        description: 'Unit 1의 모음, 자음, 받침, 연음 법칙 전 과정을 종합 평가합니다.',
        level: '초급 1',
        xpReward: 30,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q1-5-1',
            type: 'word-match',
            prompt: 'Unit 1 종합 어휘 마스터',
            subPrompt: '기초 어휘 쌍을 모두 맞추세요.',
            wordPairs: [
              { korean: '물', english: 'Water' },
              { korean: '우유', english: 'Milk' },
              { korean: '책', english: 'Book' },
              { korean: '한국어', english: 'Korean language' }
            ],
            correctAnswer: 'matched',
            explanation: 'Unit 1의 핵심 어휘들입니다.'
          },
          {
            id: 'q1-5-2',
            type: 'listening',
            prompt: '실전 청취 평가',
            subPrompt: '자연스러운 속도의 한국어 문장을 듣고 고르세요.',
            audioPrompt: '아이가 집에서 책을 읽어요.',
            options: [
              '아이가 집에서 책을 읽어요.',
              '아이가 밖에서 밥을 먹어요.',
              '선생님이 학교에서 가르쳐요.',
              '친구가 커피를 마셔요.'
            ],
            correctAnswer: '아이가 집에서 책을 읽어요.',
            explanation: '[아이가 지베서 채글 일거요] 연음이 반영된 자연스러운 문장입니다.'
          },
          {
            id: 'q1-5-3',
            type: 'sentence-arrange',
            prompt: '문장 완성 챌린지',
            subPrompt: '"저는 한국어를 공부해요"를 바르게 정렬하세요.',
            options: ['저는', '공부해요', '한국어를'],
            correctAnswer: ['저는', '한국어를', '공부해요'],
            explanation: '주어(저는) + 목적어(한국어를) + 서술어(공부해요) 순서입니다.'
          },
          {
            id: 'q1-5-4',
            type: 'dictation',
            prompt: '종합 진단 받아쓰기',
            subPrompt: '원어민 소리를 듣고 문장을 적으세요.',
            audioPrompt: '물이 시원해요',
            koreanText: '물이 시원해요',
            correctAnswer: '물이 시원해요',
            explanation: '물(water) + 이(subject marker) + 시원해요(is cool/refreshing).'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Unit 2: 인사말 및 자기소개',
    subtitle: '정중한 존댓말(-이에요/예요, -습니다)과 국적, 직업 표현',
    themeColor: 'from-blue-500 to-indigo-600',
    totalVocab: 26,
    checkpointGrammar: ['주제 보조사 -은/는', '서술격 조사 -이에요/예요', '안부 및 감사 인사 표현', '의문문 종결어미 -(으)세요?'],
    guidebook: {
      title: 'Unit 2 인사 & 자기소개 문법 가이드',
      grammarPoints: [
        {
          title: '주제 보조사 -은/는',
          explanation: '문장의 화제나 주제를 나타내며, 다른 대상과의 대조를 나타낼 때 사용합니다. 앞말에 받침이 있으면 "은", 없으면 "는"을 씁니다.',
          examples: [
            { korean: '저는 (저 + 는: 받침 X)', english: 'As for me / I am' },
            { korean: '선생님은 (선생님 + 은: 받침 O)', english: 'As for the teacher' }
          ]
        },
        {
          title: '서술격 조사 -이에요/예요',
          explanation: '명사 뒤에 붙어 "~입니다(is/am/are)"의 친근한 존댓말 서술을 만듭니다. 받침이 있으면 "-이에요", 받침이 없으면 "-예요"를 씁니다.',
          examples: [
            { korean: '학생 + 이에요 = 학생이에요.', english: 'I am a student. (받침 O)' },
            { korean: '의사 + 예요 = 의사예요.', english: 'I am a doctor. (받침 X)' }
          ]
        },
        {
          title: '한국어 인사 예절 (헤어질 때)',
          explanation: '떠나는 사람에게는 "안녕히 가세요(Go peacefully)", 남아있는 사람에게는 "안녕히 계세요(Stay peacefully)"라고 인사합니다.',
          examples: [
            { korean: '안녕히 가세요 (떠나는 사람에게)', english: 'Goodbye (to someone leaving)' },
            { korean: '안녕히 계세요 (남아있는 사람에게)', english: 'Goodbye (to someone staying)' }
          ]
        }
      ],
      keyVocab: [
        { korean: '안녕하세요', english: 'Hello', pronunciation: 'an-nyeong-ha-se-yo' },
        { korean: '감사합니다', english: 'Thank you', pronunciation: 'gam-sa-ham-ni-da' },
        { korean: '죄송합니다', english: "I'm sorry", pronunciation: 'joe-song-ham-ni-da' },
        { korean: '학생', english: 'Student', pronunciation: 'hak-saeng' },
        { korean: '회사원', english: 'Office worker', pronunciation: 'hoe-sa-won' },
        { korean: '선생님', english: 'Teacher', pronunciation: 'seon-saeng-nim' },
        { korean: '한국 사람', english: 'Korean person', pronunciation: 'han-guk sa-ram' }
      ],
      cultureTip: '한국에서는 처음 만났을 때 가볍게 고개를 15~30도 숙이며 인사하는 것이 정중한 예의입니다. 명함을 주고받을 때는 반드시 두 손을 사용합니다.'
    },
    lessons: [
      {
        id: 'lesson-2-1',
        unitId: 'unit-2',
        unitTitle: 'Unit 2: 인사말 및 자기소개',
        title: '첫 만남과 일상 인사',
        description: '만났을 때와 헤어질 때의 한국어 기본 예절 인사를 배웁니다.',
        level: '초급 1',
        xpReward: 20,
        difficulty: 1,
        status: 'available',
        questions: [
          {
            id: 'q2-1-1',
            type: 'word-match',
            prompt: '인사말 매칭',
            subPrompt: '상황별 인사말과 영어 표현을 짝지으세요.',
            wordPairs: [
              { korean: '안녕하세요', english: 'Hello' },
              { korean: '감사합니다', english: 'Thank you' },
              { korean: '죄송합니다', english: "I'm sorry" },
              { korean: '안녕히 가세요', english: 'Goodbye (to one leaving)' }
            ],
            correctAnswer: 'matched',
            explanation: '한국어는 존댓말 문화가 중요하므로 공손한 인사말을 익혀야 합니다.'
          },
          {
            id: 'q2-1-2',
            type: 'speaking',
            prompt: '정중하게 인사하기',
            subPrompt: '마이크를 켜고 큰 소리로 인사해 보세요.',
            koreanText: '안녕하세요! 반갑습니다.',
            romanization: 'an-nyeong-ha-se-yo! ban-gap-seum-ni-da.',
            englishText: 'Hello! Nice to meet you.',
            correctAnswer: '안녕하세요! 반갑습니다.',
            explanation: '자연스러운 억양으로 끝을 살짝 올려 말합니다.'
          },
          {
            id: 'q2-1-3',
            type: 'fill-blank',
            prompt: '헤어질 때 인사 고르기',
            subPrompt: '집에 남아있는 사람에게 손님이 건넬 인사말은?',
            koreanText: '저는 이제 가볼게요. [  ]!',
            options: ['안녕히 계세요', '안녕히 가세요', '죄송합니다'],
            correctAnswer: '안녕히 계세요',
            explanation: '남아있는 사람에게는 "안녕히 계세요(Stay in peace)"라고 인사합니다.'
          },
          {
            id: 'q2-1-4',
            type: 'dictation',
            prompt: '감사 인사 받아쓰기',
            subPrompt: '소리를 듣고 감사의 말을 입력하세요.',
            audioPrompt: '감사합니다',
            koreanText: '감사합니다',
            correctAnswer: '감사합니다',
            explanation: '감사합니다는 가장 대표적인 감사 표현입니다.'
          }
        ]
      },
      {
        id: 'lesson-2-2',
        unitId: 'unit-2',
        unitTitle: 'Unit 2: 인사말 및 자기소개',
        title: '국적과 신분 말하기',
        description: '어느 나라 사람인지와 직업을 -이에요/예요로 소개합니다.',
        level: '초급 1',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q2-2-1',
            type: 'fill-blank',
            prompt: '서술격 조사 -이에요/예요',
            subPrompt: '받침 유무에 맞는 올바른 서술어를 고르세요.',
            koreanText: '저는 학생[  ].',
            options: ['이에요', '예요', '은'],
            correctAnswer: '이에요',
            explanation: '"학생"은 받침(ㅇ)이 있으므로 "-이에요"가 결합합니다. (받침 없음: -예요, 예: 의사예요)',
            grammarFocus: '서술격 조사 -이에요/예요'
          },
          {
            id: 'q2-2-2',
            type: 'sentence-arrange',
            prompt: '국적 소개 문장 배열',
            subPrompt: '"저는 한국 사람이에요"를 순서대로 정렬하세요.',
            options: ['저는', '한국 사람이에요'],
            correctAnswer: ['저는', '한국 사람이에요'],
            explanation: '주제어 "저는" 뒤에 신분/국적 서술어가 위치합니다.'
          },
          {
            id: 'q2-2-3',
            type: 'word-match',
            prompt: '직업 단어 매칭',
            subPrompt: '직업 어휘와 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '학생', english: 'Student' },
              { korean: '선생님', english: 'Teacher' },
              { korean: '회사원', english: 'Office worker' },
              { korean: '의사', english: 'Doctor' }
            ],
            correctAnswer: 'matched',
            explanation: '자기소개 시 자주 쓰이는 직업 명사들입니다.'
          },
          {
            id: 'q2-2-4',
            type: 'dictation',
            prompt: '자기소개 문장 받아쓰기',
            subPrompt: '들리는 문장을 그대로 적으세요.',
            audioPrompt: '저는 회사원이에요',
            koreanText: '저는 회사원이에요',
            correctAnswer: '저는 회사원이에요',
            explanation: '회사원(Office worker) + 이에요(am/is).'
          }
        ]
      },
      {
        id: 'lesson-2-3',
        unitId: 'unit-2',
        unitTitle: 'Unit 2: 인사말 및 자기소개',
        title: '이름과 안부 묻고 답하기',
        description: '상대방의 이름을 정중히 묻고 안부를 나누는 대화를 연습합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q2-3-1',
            type: 'listening',
            prompt: '이름 질문 듣기',
            subPrompt: '원어민 질문을 듣고 가장 자연스러운 대답을 고르세요.',
            audioPrompt: '이름이 뭐예요?',
            options: [
              '저는 알렉스예요.',
              '네, 학생이에요.',
              '안녕히 가세요.',
              '한국 사람이에요.'
            ],
            correctAnswer: '저는 알렉스예요.',
            explanation: '"이름이 뭐예요?(What is your name?)"에 대한 올바른 응답은 "저는 [이름]이에요/예요"입니다.'
          },
          {
            id: 'q2-3-2',
            type: 'speaking',
            prompt: '자신의 이름 말하기',
            subPrompt: '또박또박 발음해 보세요.',
            koreanText: '제 이름은 민지예요.',
            romanization: 'je i-reum-eun min-ji-ye-yo.',
            englishText: 'My name is Minji.',
            correctAnswer: '제 이름은 민지예요.',
            explanation: '"제 이름은 ~(My name is ~)" 표현을 사용합니다.'
          },
          {
            id: 'q2-3-3',
            type: 'fill-blank',
            prompt: '주제 보조사 (은/는)',
            subPrompt: '받침에 알맞은 주제 보조사를 고르세요.',
            koreanText: '제 이름[  ] 알렉스예요.',
            options: ['은', '는', '이'],
            correctAnswer: '은',
            explanation: '"이름"은 받침(ㅁ)이 있으므로 "-은"을 씁니다.'
          },
          {
            id: 'q2-3-4',
            type: 'sentence-arrange',
            prompt: '안부 묻는 문장 배열',
            subPrompt: '"요즘 어떻게 지내세요?" 순서로 맞추세요.',
            options: ['지내세요?', '요즘', '어떻게'],
            correctAnswer: ['요즘', '어떻게', '지내세요?'],
            explanation: '시간 부사(요즘) + 의문사(어떻게) + 서술어(지내세요?) 순서입니다.'
          }
        ]
      },
      {
        id: 'lesson-2-4',
        unitId: 'unit-2',
        unitTitle: 'Unit 2: 인사말 및 자기소개',
        title: 'Unit 2 체크포인트: 실전 자기소개 퀘스트',
        description: 'Unit 2의 인사말, 국적, 직업, 안부 표현을 종합 테스트합니다.',
        level: '초급 1',
        xpReward: 30,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q2-4-1',
            type: 'listening',
            prompt: '실전 자기소개 청취',
            subPrompt: '소개를 듣고 화자의 직업을 파악하세요.',
            audioPrompt: '안녕하세요, 저는 미국에서 온 마이클이에요. 저는 영어 선생님이에요.',
            options: ['영어 선생님', '의사', '회사원', '학생'],
            correctAnswer: '영어 선생님',
            explanation: '화자는 "영어 선생님이에요"라고 명확히 밝혔습니다.'
          },
          {
            id: 'q2-4-2',
            type: 'sentence-arrange',
            prompt: '완전한 자기소개 문장 구성',
            subPrompt: '"안녕하세요, 만나서 정말 반갑습니다" 순서로 맞추세요.',
            options: ['안녕하세요,', '반갑습니다', '만나서', '정말'],
            correctAnswer: ['안녕하세요,', '만나서', '정말', '반갑습니다'],
            explanation: '자연스러운 첫 대면 인사 표현입니다.'
          },
          {
            id: 'q2-4-3',
            type: 'word-match',
            prompt: 'Unit 2 핵심 표현 총정리',
            subPrompt: '의미에 맞는 짝을 맞추세요.',
            wordPairs: [
              { korean: '반갑습니다', english: 'Nice to meet you' },
              { korean: '어떻게 지내세요?', english: 'How are you doing?' },
              { korean: '잘 지내요', english: "I'm doing well" },
              { korean: '선생님', english: 'Teacher' }
            ],
            correctAnswer: 'matched',
            explanation: 'Unit 2 종합 복습입니다.'
          },
          {
            id: 'q2-4-4',
            type: 'dictation',
            prompt: '종합 대화 받아쓰기',
            subPrompt: '들려주는 문장을 정확히 받아적으세요.',
            audioPrompt: '만나서 반갑습니다',
            koreanText: '만나서 반갑습니다',
            correctAnswer: '만나서 반갑습니다',
            explanation: '정중한 첫 인사말입니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Unit 3: 카페와 식당에서 주문하기',
    subtitle: '원하는 메뉴를 말하고 수량을 요청하는 실전 K-푸드 회화',
    themeColor: 'from-amber-500 to-orange-600',
    totalVocab: 28,
    checkpointGrammar: ['목적격 조사 -을/를', '요청형 어미 -(으)세요 / 주세요', '단위 명사 (잔, 개, 인분)', '숫자와 수량 결합'],
    guidebook: {
      title: 'Unit 3 주문 및 음식 표현 가이드',
      grammarPoints: [
        {
          title: '목적격 조사 -을/를',
          explanation: '동사의 행동이나 동작이 가해지는 목적어 뒤에 붙습니다. 받침이 있으면 "을", 받침이 없으면 "를"을 씁니다.',
          examples: [
            { korean: '커피(받침 X) + 를 마셔요', english: 'Drink coffee' },
            { korean: '밥(받침 O) + 을 먹어요', english: 'Eat rice/meal' }
          ]
        },
        {
          title: '요청 표현 "~ 주세요"',
          explanation: '명사 뒤에 "주세요(Please give me)"를 붙이면 식당, 카페, 상점에서 원하는 것을 손쉽게 주문할 수 있습니다.',
          examples: [
            { korean: '물 좀 주세요.', english: 'Please give me some water.' },
            { korean: '메뉴판 주세요.', english: 'Please give me the menu.' }
          ]
        },
        {
          title: '단위 명사와 고유어 숫자',
          explanation: '물건이나 음식을 셀 때는 고유어 숫자(하나, 둘, 셋, 넷)와 단위 명사를 결합합니다. 이때 하나, 둘, 셋, 넷은 [한, 두, 세, 네]로 바뀝니다.',
          examples: [
            { korean: '커피 한 잔 (1 cup)', english: 'One cup of coffee' },
            { korean: '비빔밥 두 그릇 (2 bowls)', english: 'Two bowls of bibimbap' },
            { korean: '삼겹살 삼 인분 (3 servings)', english: 'Three servings of pork belly' }
          ]
        }
      ],
      keyVocab: [
        { korean: '아메리카노', english: 'Americano', pronunciation: 'a-me-ri-ka-no' },
        { korean: '비빔밥', english: 'Bibimbap', pronunciation: 'bi-bim-bap' },
        { korean: '김치찌개', english: 'Kimchi stew', pronunciation: 'gim-chi-jji-gae' },
        { korean: '맛있어요', english: 'It is delicious', pronunciation: 'ma-si-sseo-yo' },
        { korean: '매워요', english: 'It is spicy', pronunciation: 'mae-wo-yo' },
        { korean: '얼마예요?', english: 'How much is it?', pronunciation: 'eol-ma-ye-yo?' },
        { korean: '영수증', english: 'Receipt', pronunciation: 'yeong-su-jeung' }
      ],
      cultureTip: '한국 식당에서는 테이블 옆 서랍에 숟가락, 젓가락, 휴지가 들어있는 경우가 많습니다. 물과 추가 반찬은 "셀프(Self-service)"인 곳이 많으며 팁(Tip) 문화가 없습니다.'
    },
    lessons: [
      {
        id: 'lesson-3-1',
        unitId: 'unit-3',
        unitTitle: 'Unit 3: 카페와 식당에서 주문하기',
        title: '커피 한 잔 주세요',
        description: '카페에서 따뜻한/차가운 음료를 고르고 수량을 주문합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q3-1-1',
            type: 'listening',
            prompt: '주문 듣기 평가',
            subPrompt: '직원의 질문을 듣고 알맞은 주문을 고르세요.',
            audioPrompt: '따뜻한 아메리카노 한 잔 주세요.',
            options: [
              '따뜻한 아메리카노 한 잔 주세요.',
              '차가운 녹차 두 잔 주세요.',
              '여기서 먹고 갈게요.',
              '영수증 버려주세요.'
            ],
            correctAnswer: '따뜻한 아메리카노 한 잔 주세요.',
            explanation: '"따뜻한(Hot) 아메리카노 한 잔(One cup) 주세요(Please give me)" 입니다.'
          },
          {
            id: 'q3-1-2',
            type: 'sentence-arrange',
            prompt: '주문 문장 배열',
            subPrompt: '"아이스 아메리카노 두 잔 주세요" 순서로 정렬하세요.',
            options: ['아이스 아메리카노', '두 잔', '주세요'],
            correctAnswer: ['아이스 아메리카노', '두 잔', '주세요'],
            explanation: '[메뉴 이름] + [수량 + 단위 명사] + [주세요] 공식입니다.'
          },
          {
            id: 'q3-1-3',
            type: 'fill-blank',
            prompt: '목적격 조사 선택',
            subPrompt: '문장에 들어갈 알맞은 조사를 고르세요.',
            koreanText: '커피[  ] 마셔요.',
            options: ['를', '을', '에'],
            correctAnswer: '를',
            explanation: '"커피"는 받침이 없으므로 목적격 조사 "를"이 옵니다. (받침 있음: 을, 예: 물을 마셔요)'
          },
          {
            id: 'q3-1-4',
            type: 'dictation',
            prompt: '음료 주문 받아쓰기',
            subPrompt: '소리를 듣고 들린 문장을 작성하세요.',
            audioPrompt: '물 주세요',
            koreanText: '물 주세요',
            correctAnswer: '물 주세요',
            explanation: '식당과 카페에서 가장 기본적으로 사용하는 요청 표현입니다.'
          }
        ]
      },
      {
        id: 'lesson-3-2',
        unitId: 'unit-3',
        unitTitle: 'Unit 3: 카페와 식당에서 주문하기',
        title: '한국 식당에서 음식 시키기',
        description: '비빔밥, 김치찌개 등 대표 K-푸드를 인분 수에 맞게 주문합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q3-2-1',
            type: 'word-match',
            prompt: '대표 한식 메뉴 매칭',
            subPrompt: '음식 이름과 설명을 짝지으세요.',
            wordPairs: [
              { korean: '비빔밥', english: 'Bibimbap (Mixed rice)' },
              { korean: '김치찌개', english: 'Kimchi stew' },
              { korean: '불고기', english: 'Bulgogi (Marinated beef)' },
              { korean: '삼겹살', english: 'Samgyeopsal (Pork belly)' }
            ],
            correctAnswer: 'matched',
            explanation: '한국 식당 어디서나 볼 수 있는 대표 메뉴입니다.'
          },
          {
            id: 'q3-2-2',
            type: 'speaking',
            prompt: '식당 주문 말하기',
            subPrompt: '소리내어 음식을 주문해 보세요.',
            koreanText: '여기 비빔밥 하나 주세요!',
            romanization: 'yeo-gi bi-bim-bap ha-na ju-se-yo!',
            englishText: 'Here, one bibimbap please!',
            correctAnswer: '여기 비빔밥 하나 주세요!',
            explanation: '"여기~(Here~)"로 종업원의 주의를 환기시킨 뒤 메뉴를 말합니다.'
          },
          {
            id: 'q3-2-3',
            type: 'fill-blank',
            prompt: '식당 수량 표현 채우기',
            subPrompt: '고기를 2인분 주문할 때 들어갈 단위 명사는?',
            koreanText: '삼겹살 2[  ] 주세요.',
            options: ['인분', '잔', '개', '병'],
            correctAnswer: '인분',
            explanation: '식당에서 고기나 요리를 시킬 때는 사람 수 기준 "인분(servings)"을 씁니다.'
          },
          {
            id: 'q3-2-4',
            type: 'sentence-arrange',
            prompt: '식당 요청 문장 배열',
            subPrompt: '"물 좀 더 주세요" 순서로 맞추세요.',
            options: ['물', '더 주세요', '좀'],
            correctAnswer: ['물', '좀', '더 주세요'],
            explanation: '"좀(a little)"을 넣으면 더욱 공손하고 자연스러운 한국어 요청이 됩니다.'
          }
        ]
      },
      {
        id: 'lesson-3-3',
        unitId: 'unit-3',
        unitTitle: 'Unit 3: 카페와 식당에서 주문하기',
        title: '맛과 맵기 취향 표현하기',
        description: '음식이 맛있는지, 매운지, 덜 맵게 해달라고 요청하는 방법을 배웁니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q3-3-1',
            type: 'word-match',
            prompt: '맛 형용사 매칭',
            subPrompt: '맛 표현과 뜻을 연결하세요.',
            wordPairs: [
              { korean: '맛있어요', english: 'Delicious / Tasty' },
              { korean: '매워요', english: 'Spicy' },
              { korean: '달아요', english: 'Sweet' },
              { korean: '짜요', english: 'Salty' }
            ],
            correctAnswer: 'matched',
            explanation: '음식의 맛을 표현하는 4대 기본 형용사입니다.'
          },
          {
            id: 'q3-3-2',
            type: 'fill-blank',
            prompt: '맵기 조절 요청하기',
            subPrompt: '매운 것을 잘 못 먹을 때 하는 표현은?',
            koreanText: '조금 [  ] 맵게 해주세요.',
            options: ['덜', '더', '잘'],
            correctAnswer: '덜',
            explanation: '"덜 맵게 해주세요(Please make it less spicy)"는 외국인 학습자에게 매우 유용한 필수 표현입니다.'
          },
          {
            id: 'q3-3-3',
            type: 'listening',
            prompt: '음식 평가 듣기',
            subPrompt: '들리는 문장의 뜻으로 올바른 것을 고르세요.',
            audioPrompt: '이 찌개는 정말 맛있어요!',
            options: [
              '이 찌개는 정말 맛있어요!',
              '이 음식은 너무 짜요.',
              '음식이 아직 안 나왔어요.',
              '물을 더 주세요.'
            ],
            correctAnswer: '이 찌개는 정말 맛있어요!',
            explanation: '"정말 맛있어요!(It is really delicious!)" 감탄 표현입니다.'
          },
          {
            id: 'q3-3-4',
            type: 'dictation',
            prompt: '맛 표현 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '너무 맛있어요',
            koreanText: '너무 맛있어요',
            correctAnswer: '너무 맛있어요',
            explanation: '너무(Very) + 맛있어요(Delicious).'
          }
        ]
      },
      {
        id: 'lesson-3-4',
        unitId: 'unit-3',
        unitTitle: 'Unit 3: 카페와 식당에서 주문하기',
        title: 'Unit 3 체크포인트: K-푸드 주문 마스터',
        description: '카페와 식당의 주문, 수량 표현, 맵기 조절, 계산 요청을 종합 점검합니다.',
        level: '초급 1',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q3-4-1',
            type: 'listening',
            prompt: '실전 주문 및 결제 청취',
            subPrompt: '카페 직원의 질문을 듣고 올바른 대답을 고르세요.',
            audioPrompt: '드시고 가세요, 아니면 포장해 드릴까요?',
            options: [
              '먹고 갈게요.',
              '아메리카노 세 잔 주세요.',
              '카드로 할게요.',
              '감사합니다.'
            ],
            correctAnswer: '먹고 갈게요.',
            explanation: '매장 내 음용 여부를 물었으므로 "먹고 갈게요(For here)" 또는 "포장해 주세요(To go)"로 대답합니다.'
          },
          {
            id: 'q3-4-2',
            type: 'sentence-arrange',
            prompt: '식당 결제 문장 배열',
            subPrompt: '"계산서 주세요. 카드로 할게요" 순서로 맞추세요.',
            options: ['카드로 할게요.', '계산서 주세요.', '얼마예요?'],
            correctAnswer: ['계산서 주세요.', '카드로 할게요.'],
            explanation: '정중한 식당 결제 표현입니다.'
          },
          {
            id: 'q3-4-3',
            type: 'word-match',
            prompt: '식당 필수 어휘 짝맞추기',
            subPrompt: '의미를 연결하세요.',
            wordPairs: [
              { korean: '영수증', english: 'Receipt' },
              { korean: '포장', english: 'Takeout / To go' },
              { korean: '메뉴판', english: 'Menu board' },
              { korean: '계산', english: 'Payment / Bill' }
            ],
            correctAnswer: 'matched',
            explanation: '결제 및 주문 관련 핵심 명사입니다.'
          },
          {
            id: 'q3-4-4',
            type: 'dictation',
            prompt: '실전 결제 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '영수증 주세요',
            koreanText: '영수증 주세요',
            correctAnswer: '영수증 주세요',
            explanation: '영수증(Receipt) + 주세요(Please give me).'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Unit 4: 숫자, 시간, 날짜와 쇼핑',
    subtitle: '한자어 수사(가격/날짜)와 고유어 수사(시간/개수) 완벽 정복',
    themeColor: 'from-purple-500 to-pink-600',
    totalVocab: 30,
    checkpointGrammar: ['한자어 수사 (일, 이, 삼, 사... 만, 억)', '고유어 수사 (하나, 둘, 셋, 넷)', '시간 표현 (~시 ~분)', '가격 묻기와 할인 요청'],
    guidebook: {
      title: 'Unit 4 한국어 숫자 체계 & 쇼핑 가이드',
      grammarPoints: [
        {
          title: '한국어의 2가지 숫자 체계',
          explanation: '한국어는 상황에 따라 두 가지 숫자를 철저히 구별해 사용합니다. 한자어 수사는 돈(가격), 날짜, 전화번호, 층수에 쓰이고, 고유어 수사는 시간(시), 개수, 나이에 쓰입니다.',
          examples: [
            { korean: '한자어: 일, 이, 삼, 사, 오, 육, 칠, 팔, 구, 십', english: 'Sino-Korean (used for money, dates, minutes)' },
            { korean: '고유어: 하나, 둘, 셋, 넷, 다섯, 여섯, 일곱, 여덟', english: 'Native Korean (used for hours, counting objects)' }
          ]
        },
        {
          title: '시간 말하기: [고유어 시] + [한자어 분]',
          explanation: '시간을 말할 때 "몇 시"는 고유어 수사로, "몇 분"은 한자어 수사로 말하는 독특한 결합 규칙이 있습니다.',
          examples: [
            { korean: '3시 30분 = 세 시 삼십 분', english: '3:30 (Se-si Sam-sip-bun)' },
            { korean: '1시 15분 = 한 시 십오 분', english: '1:15 (Han-si Sip-o-bun)' }
          ]
        },
        {
          title: '쇼핑할 때 가격 묻기',
          explanation: '물건을 가리키며 "이거 얼마예요?(How much is this?)"라고 묻습니다. 조금 깎아달라고 할 때는 "조금만 깎아주세요"라고 애교있게 말할 수 있습니다.',
          examples: [
            { korean: '이 옷 얼마예요?', english: 'How much is this clothing?' },
            { korean: '만 이천 원이에요.', english: 'It is 12,000 won.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '얼마예요?', english: 'How much is it?', pronunciation: 'eol-ma-ye-yo?' },
        { korean: '원 (KRW)', english: 'Won (Currency)', pronunciation: 'won' },
        { korean: '지금 몇 시예요?', english: 'What time is it now?', pronunciation: 'ji-geum myeot si-ye-yo?' },
        { korean: '오늘', english: 'Today', pronunciation: 'o-neul' },
        { korean: '내일', english: 'Tomorrow', pronunciation: 'nae-il' },
        { korean: '월요일', english: 'Monday', pronunciation: 'wo-ryo-il' },
        { korean: '주말', english: 'Weekend', pronunciation: 'ju-mal' }
      ],
      cultureTip: '한국의 화폐 단위는 원(₩)이며, 지폐는 1,000원(퇴계 이황), 5,000원(율곡 이이), 10,000원(세종대왕), 50,000원(신사임당) 4종류가 있습니다. 대부분의 상점에서 신용카드와 간편결제(삼성페이, 네이버페이)가 대중화되어 있습니다.'
    },
    lessons: [
      {
        id: 'lesson-4-1',
        unitId: 'unit-4',
        unitTitle: 'Unit 4: 숫자, 시간, 날짜와 쇼핑',
        title: '한자어 수사와 가격 묻기',
        description: '일, 이, 삼, 사...와 만 원 단위 금액을 읽고 가격을 묻습니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q4-1-1',
            type: 'word-match',
            prompt: '한자어 숫자 매칭',
            subPrompt: '숫자와 한글 표기를 바르게 연결하세요.',
            wordPairs: [
              { korean: '일', english: '1 (One)' },
              { korean: '오', english: '5 (Five)' },
              { korean: '십', english: '10 (Ten)' },
              { korean: '백', english: '100 (Hundred)' }
            ],
            correctAnswer: 'matched',
            explanation: '가격이나 날짜에 쓰이는 한자어 수사입니다.'
          },
          {
            id: 'q4-1-2',
            type: 'listening',
            prompt: '가격 듣고 고르기',
            subPrompt: '상점 주인의 말을 듣고 올바른 금액을 고르세요.',
            audioPrompt: '이 사과는 삼천 원이에요.',
            options: ['3,000원', '5,000원', '30,000원', '13,000원'],
            correctAnswer: '3,000원',
            explanation: '"삼천 원(Sam-cheon won)"은 3,000원입니다.'
          },
          {
            id: 'q4-1-3',
            type: 'sentence-arrange',
            prompt: '가격 묻는 문장 배열',
            subPrompt: '"이 가방 얼마예요?" 순서로 맞추세요.',
            options: ['가방', '이', '얼마예요?'],
            correctAnswer: ['이', '가방', '얼마예요?'],
            explanation: '지시사(이) + 명사(가방) + 의문사(얼마예요?) 구조입니다.'
          },
          {
            id: 'q4-1-4',
            type: 'dictation',
            prompt: '금액 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '만 원이에요',
            koreanText: '만 원이에요',
            correctAnswer: '만 원이에요',
            explanation: '만(10,000) + 원(Won) + 이에요.'
          }
        ]
      },
      {
        id: 'lesson-4-2',
        unitId: 'unit-4',
        unitTitle: 'Unit 4: 숫자, 시간, 날짜와 쇼핑',
        title: '고유어 수사와 시간 말하기',
        description: '하나, 둘, 셋... 고유어 수사로 몇 시 몇 분인지 시간을 묻고 답합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q4-2-1',
            type: 'word-match',
            prompt: '고유어 수사 매칭',
            subPrompt: '고유어 숫자와 수량을 짝지으세요.',
            wordPairs: [
              { korean: '하나 (한 개)', english: 'One item' },
              { korean: '둘 (두 개)', english: 'Two items' },
              { korean: '셋 (세 개)', english: 'Three items' },
              { korean: '넷 (네 개)', english: 'Four items' }
            ],
            correctAnswer: 'matched',
            explanation: '물건을 셀 때 단위 명사 앞에서는 한, 두, 세, 네로 단축됩니다.'
          },
          {
            id: 'q4-2-2',
            type: 'listening',
            prompt: '시간 청취 평가',
            subPrompt: '안내 방송의 시각을 듣고 선택하세요.',
            audioPrompt: '지금은 오후 두 시 삼십 분입니다.',
            options: ['오후 2:30', '오전 2:15', '오후 3:20', '오전 12:30'],
            correctAnswer: '오후 2:30',
            explanation: '두 시(2:00) + 삼십 분(:30)입니다.'
          },
          {
            id: 'q4-2-3',
            type: 'speaking',
            prompt: '시간 묻기 말하기',
            subPrompt: '마이크를 켜고 현재 시간을 물어보세요.',
            koreanText: '지금 몇 시예요?',
            romanization: 'ji-geum myeot si-ye-yo?',
            englishText: 'What time is it now?',
            correctAnswer: '지금 몇 시예요?',
            explanation: '자연스럽게 [지금 멷 씨에요]로 발음합니다.'
          },
          {
            id: 'q4-2-4',
            type: 'fill-blank',
            prompt: '시간 단위 완성하기',
            subPrompt: '오전 9시 정각을 나타내는 문장을 채우세요.',
            koreanText: '수업은 아침 [  ] 시에 시작해요.',
            options: ['아홉', '구', '열'],
            correctAnswer: '아홉',
            explanation: '시간의 "시" 앞에는 고유어 숫자 "아홉(9)"을 씁니다.'
          }
        ]
      },
      {
        id: 'lesson-4-3',
        unitId: 'unit-4',
        unitTitle: 'Unit 4: 숫자, 시간, 날짜와 쇼핑',
        title: '쇼핑과 물건 고르기',
        description: '가게에서 다른 사이즈나 색상을 찾고 결제하는 실전 쇼핑 표현을 배웁니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q4-3-1',
            type: 'fill-blank',
            prompt: '쇼핑 요청 표현 채우기',
            subPrompt: '물건이 작아서 더 큰 것을 찾을 때 하는 말은?',
            koreanText: '더 [  ] 것 있어요?',
            options: ['큰', '작은', '비싼'],
            correctAnswer: '큰',
            explanation: '"더 큰 것 있어요?(Do you have a bigger one?)" 유용한 쇼핑 표현입니다.'
          },
          {
            id: 'q4-3-2',
            type: 'sentence-arrange',
            prompt: '결제 의사 표현 배열',
            subPrompt: '"마음에 들어요. 이걸로 주세요" 순서로 맞추세요.',
            options: ['이걸로 주세요.', '마음에 들어요.'],
            correctAnswer: ['마음에 들어요.', '이걸로 주세요.'],
            explanation: '"마음에 들어요(I like it) + 이걸로 주세요(I will take this one)".'
          },
          {
            id: 'q4-3-3',
            type: 'word-match',
            prompt: '쇼핑 관련 어휘 짝맞추기',
            subPrompt: '어휘와 뜻을 매칭하세요.',
            wordPairs: [
              { korean: '할인', english: 'Discount / Sale' },
              { korean: '교환', english: 'Exchange' },
              { korean: '환불', english: 'Refund' },
              { korean: '신용카드', english: 'Credit card' }
            ],
            correctAnswer: 'matched',
            explanation: '백화점, 아울렛, 편의점 필수 쇼핑 어휘입니다.'
          },
          {
            id: 'q4-3-4',
            type: 'dictation',
            prompt: '쇼핑 표현 받아쓰기',
            subPrompt: '소리를 듣고 입력하세요.',
            audioPrompt: '이거 입어봐도 돼요?',
            koreanText: '이거 입어봐도 돼요?',
            correctAnswer: '이거 입어봐도 돼요?',
            explanation: '"Can I try this on?" 탈의실에서 옷을 입어볼 때 쓰는 표현입니다.'
          }
        ]
      },
      {
        id: 'lesson-4-4',
        unitId: 'unit-4',
        unitTitle: 'Unit 4: 숫자, 시간, 날짜와 쇼핑',
        title: 'Unit 4 체크포인트: 쇼핑 & 시간 약속 마스터',
        description: '숫자 체계, 시간, 날짜, 쇼핑 대화를 총괄 진단합니다.',
        level: '초급 1',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q4-4-1',
            type: 'listening',
            prompt: '약속 시간 청취 평가',
            subPrompt: '두 사람의 대화를 듣고 만나는 시간을 고르세요.',
            audioPrompt: '우리 내일 오후 세 시 반에 홍대입구역에서 만나요.',
            options: ['내일 오후 3:30', '오늘 오전 3:30', '내일 오후 4:00', '주말 오전 10:00'],
            correctAnswer: '내일 오후 3:30',
            explanation: '내일(Tomorrow) + 오후 세 시 반(3:30 PM)입니다.'
          },
          {
            id: 'q4-4-2',
            type: 'sentence-arrange',
            prompt: '실전 쇼핑 흥정 문장 배열',
            subPrompt: '"너무 예뻐요. 조금만 깎아주세요" 순서로 맞추세요.',
            options: ['너무 예뻐요.', '조금만', '깎아주세요.'],
            correctAnswer: ['너무 예뻐요.', '조금만', '깎아주세요.'],
            explanation: '전통시장이나 옷가게에서 쓰는 친근한 흥정 문장입니다.'
          },
          {
            id: 'q4-4-3',
            type: 'word-match',
            prompt: '요일 어휘 마스터',
            subPrompt: '한국어 요일을 올바르게 매칭하세요.',
            wordPairs: [
              { korean: '월요일', english: 'Monday' },
              { korean: '수요일', english: 'Wednesday' },
              { korean: '금요일', english: 'Friday' },
              { korean: '일요일', english: 'Sunday' }
            ],
            correctAnswer: 'matched',
            explanation: '월화수목금토일 주간 요일 체계입니다.'
          },
          {
            id: 'q4-4-4',
            type: 'dictation',
            prompt: '약속 문장 받아쓰기',
            subPrompt: '소리를 듣고 받아적으세요.',
            audioPrompt: '주말에 만나요',
            koreanText: '주말에 만나요',
            correctAnswer: '주말에 만나요',
            explanation: '주말(Weekend) + 에(at) + 만나요(See you / Let\'s meet).'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Unit 5: 위치, 방향과 길 찾기',
    subtitle: '지하철, 버스 등 한국의 편리한 대중교통과 길 묻기 실전 회화',
    themeColor: 'from-cyan-500 to-teal-600',
    totalVocab: 28,
    checkpointGrammar: ['장소 조사 -에 / -에서', '위치 명사 (앞, 뒤, 옆, 위, 아래, 사이)', '방향 조사 -(으)로', '길 찾기 질문과 응답 패턴'],
    guidebook: {
      title: 'Unit 5 위치 & 길 찾기 가이드',
      grammarPoints: [
        {
          title: '장소 조사 "-에" vs "-에서"',
          explanation: '"-에"는 사람이 존재하거나(있어요/없어요) 이동의 목적지(가요/와요)에 쓰이며, "-에서"는 어떤 행동이나 동작이 일어나는 장소(~에서 밥을 먹어요)에 쓰입니다.',
          examples: [
            { korean: '지하철역에 있어요. (존재 장소)', english: 'I am at the subway station.' },
            { korean: '카페에서 친구를 만나요. (행동 장소)', english: 'I meet a friend at the cafe.' }
          ]
        },
        {
          title: '위치 명사 표현',
          explanation: '기준이 되는 명사 뒤에 위치 명사를 붙여 구체적인 위치를 표현합니다.',
          examples: [
            { korean: '은행 앞 / 은행 뒤', english: 'In front of / behind the bank' },
            { korean: '편의점 옆 / 편의점 안', english: 'Next to / inside the convenience store' }
          ]
        },
        {
          title: '방향을 나타내는 조사 "-(으)로"',
          explanation: '이동하는 방향이나 경로를 나타냅니다. 받침이 없거나 "ㄹ" 받침일 때는 "-로", 그 외 받침이 있을 때는 "-으로"를 씁니다.',
          examples: [
            { korean: '오른쪽으로 가세요. (오른쪽 + 으로)', english: 'Please go to the right.' },
            { korean: '앞으로 똑바로 가세요. (앞 + 으로)', english: 'Go straight ahead.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '화장실이 어디예요?', english: 'Where is the restroom?', pronunciation: 'hwa-jang-si-ri eo-di-ye-yo?' },
        { korean: '지하철역', english: 'Subway station', pronunciation: 'ji-ha-cheol-yeok' },
        { korean: '버스 정류장', english: 'Bus stop', pronunciation: 'beo-seu jeong-ryu-jang' },
        { korean: '오른쪽 / 왼쪽', english: 'Right / Left', pronunciation: 'o-reun-jjok / oen-jjok' },
        { korean: '직진하세요', english: 'Go straight', pronunciation: 'jik-jin-ha-se-yo' },
        { korean: '출구', english: 'Exit', pronunciation: 'chul-gu' },
        { korean: '타다 / 내리다', english: 'To get on / To get off', pronunciation: 'ta-da / nae-ri-da' }
      ],
      cultureTip: '한국의 대중교통은 티머니(T-money) 또는 교통카드로 지하철과 버스를 자유롭게 환승할 수 있습니다. 지하철 환승 음악은 전통 국악인 "풍년(Good Harvest)"이 유명합니다.'
    },
    lessons: [
      {
        id: 'lesson-5-1',
        unitId: 'unit-5',
        unitTitle: 'Unit 5: 위치, 방향과 길 찾기',
        title: '위치와 공간 표현하기',
        description: '앞, 뒤, 옆, 위, 아래 등 사물과 건물의 위치를 표현합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q5-1-1',
            type: 'word-match',
            prompt: '위치 명사 매칭',
            subPrompt: '위치 단어와 뜻을 바르게 짝지으세요.',
            wordPairs: [
              { korean: '앞', english: 'Front' },
              { korean: '뒤', english: 'Behind / Back' },
              { korean: '옆', english: 'Side / Next to' },
              { korean: '위', english: 'Above / On top' }
            ],
            correctAnswer: 'matched',
            explanation: '공간의 위치를 나타내는 핵심 기초 명사입니다.'
          },
          {
            id: 'q5-1-2',
            type: 'fill-blank',
            prompt: '장소와 위치 표현 채우기',
            subPrompt: '약국이 은행 바로 곁에 있을 때 알맞은 표현은?',
            koreanText: '약국은 은행 [  ]에 있어요.',
            options: ['옆', '위', '밑'],
            correctAnswer: '옆',
            explanation: '"옆(Next to)"을 사용하여 "은행 옆에 있어요"라고 합니다.'
          },
          {
            id: 'q5-1-3',
            type: 'speaking',
            prompt: '위치 질문하기',
            subPrompt: '화장실 위치를 물어보세요.',
            koreanText: '화장실이 어디에 있어요?',
            romanization: 'hwa-jang-si-ri eo-di-e i-sseo-yo?',
            englishText: 'Where is the restroom?',
            correctAnswer: '화장실이 어디에 있어요?',
            explanation: '여행 중 가장 많이 쓰이는 필수 질문입니다.'
          },
          {
            id: 'q5-1-4',
            type: 'dictation',
            prompt: '위치 문장 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '의자 위에 책이 있어요',
            koreanText: '의자 위에 책이 있어요',
            correctAnswer: '의자 위에 책이 있어요',
            explanation: '의자 위(On the chair) + 에 + 책이 있어요.'
          }
        ]
      },
      {
        id: 'lesson-5-2',
        unitId: 'unit-5',
        unitTitle: 'Unit 5: 위치, 방향과 길 찾기',
        title: '길 묻기와 방향 안내',
        description: '오른쪽, 왼쪽, 직진 등 길을 안내받고 방향을 찾아갑니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q5-2-1',
            type: 'listening',
            prompt: '길 안내 듣기 평가',
            subPrompt: '길 안내를 듣고 가야 할 방향을 고르세요.',
            audioPrompt: '앞으로 똑바로 가다가 오른쪽으로 가세요.',
            options: [
              '앞으로 직진 후 오른쪽으로 가기',
              '뒤로 돌아가기',
              '왼쪽으로 꺾은 후 멈추기',
              '지하철 타기'
            ],
            correctAnswer: '앞으로 직진 후 오른쪽으로 가기',
            explanation: '"앞으로 똑바로(Go straight) + 오른쪽으로 가세요(Turn right)" 안내입니다.'
          },
          {
            id: 'q5-2-2',
            type: 'sentence-arrange',
            prompt: '길 묻는 정중한 문장 배열',
            subPrompt: '"실례지만 지하철역이 어디예요?" 순서로 맞추세요.',
            options: ['지하철역이', '실례지만', '어디예요?'],
            correctAnswer: ['실례지만', '지하철역이', '어디예요?'],
            explanation: '"실례지만(Excuse me)"으로 시작하면 매우 공손합니다.'
          },
          {
            id: 'q5-2-3',
            type: 'fill-blank',
            prompt: '방향 조사 (으)로 채우기',
            subPrompt: '받침에 알맞은 방향 조사를 고르세요.',
            koreanText: '저 사거리에서 왼쪽[  ] 가세요.',
            options: ['으로', '로', '에'],
            correctAnswer: '으로',
            explanation: '"왼쪽"은 받침(ㄱ)이 있으므로 "-으로"가 결합합니다. (받침 없음: -로, 예: 오른쪽으로)'
          },
          {
            id: 'q5-2-4',
            type: 'dictation',
            prompt: '방향 안내 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '오른쪽으로 가세요',
            koreanText: '오른쪽으로 가세요',
            correctAnswer: '오른쪽으로 가세요',
            explanation: '오른쪽(Right) + 으로(direction marker) + 가세요(Please go).'
          }
        ]
      },
      {
        id: 'lesson-5-3',
        unitId: 'unit-5',
        unitTitle: 'Unit 5: 위치, 방향과 길 찾기',
        title: '대중교통 이용하기',
        description: '지하철 호선, 버스 타기, 교통카드 충전과 환승 표현을 익힙니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q5-3-1',
            type: 'word-match',
            prompt: '대중교통 어휘 매칭',
            subPrompt: '교통 관련 단어와 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '지하철역', english: 'Subway station' },
              { korean: '버스 정류장', english: 'Bus stop' },
              { korean: '교통카드', english: 'Transit card' },
              { korean: '환승', english: 'Transfer' }
            ],
            correctAnswer: 'matched',
            explanation: '한국 대중교통 이용 시 필수적인 단어들입니다.'
          },
          {
            id: 'q5-3-2',
            type: 'listening',
            prompt: '지하철 탑승 안내 청취',
            subPrompt: '안내 방송을 듣고 몇 호선으로 갈아타야 하는지 고르세요.',
            audioPrompt: '이번 역에서 2호선으로 갈아타실 수 있습니다.',
            options: ['2호선', '1호선', '4호선', '공항철도'],
            correctAnswer: '2호선',
            explanation: '"2호선(Line 2)으로 갈아타실 수 있습니다" 안내입니다.'
          },
          {
            id: 'q5-3-3',
            type: 'fill-blank',
            prompt: '하차 요청 표현 채우기',
            subPrompt: '버스에서 내릴 때 기사님께 알리는 말은?',
            koreanText: '기사님, 이번 정류장에서 [  ]!',
            options: ['내려요', '타요', '가요'],
            correctAnswer: '내려요',
            explanation: '"내려요!(Getting off!)" 또는 "내려주세요"라고 외치면 정차해 줍니다.'
          },
          {
            id: 'q5-3-4',
            type: 'speaking',
            prompt: '출구 묻기 말하기',
            subPrompt: '원하는 출구 위치를 물어보세요.',
            koreanText: '3번 출구가 어디예요?',
            romanization: 'sam-beon chul-gu-ga eo-di-ye-yo?',
            englishText: 'Where is Exit 3?',
            correctAnswer: '3번 출구가 어디예요?',
            explanation: '출구(Exit) 번호를 묻는 표현입니다.'
          }
        ]
      },
      {
        id: 'lesson-5-4',
        unitId: 'unit-5',
        unitTitle: 'Unit 5: 위치, 방향과 길 찾기',
        title: 'Unit 5 체크포인트: 서울 탐방 길 찾기 퀘스트',
        description: '위치 명사, 방향 지시, 대중교통 탑승 회화를 총정리 평가합니다.',
        level: '초급 1',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q5-4-1',
            type: 'listening',
            prompt: '실전 복합 길 안내 청취',
            subPrompt: '행인의 설명을 듣고 목적지 위치를 파악하세요.',
            audioPrompt: '지하철역 2번 출구로 나와서 100미터 직진하면 편의점 옆에 있어요.',
            options: [
              '2번 출구 직진 후 편의점 옆',
              '지하철역 안 화장실 앞',
              '버스 정류장 건너편',
              '1번 출구 계단 밑'
            ],
            correctAnswer: '2번 출구 직진 후 편의점 옆',
            explanation: '정확한 위치 설명이 포함된 실전 청취 평가입니다.'
          },
          {
            id: 'q5-4-2',
            type: 'sentence-arrange',
            prompt: '길 안내 문장 배열',
            subPrompt: '"여기서 버스를 타고 시청역에서 내리세요" 순서로 정렬하세요.',
            options: ['여기서 버스를 타고', '내리세요.', '시청역에서'],
            correctAnswer: ['여기서 버스를 타고', '시청역에서', '내리세요.'],
            explanation: '대중교통 탑승과 하차 경로 안내입니다.'
          },
          {
            id: 'q5-4-3',
            type: 'word-match',
            prompt: 'Unit 5 공간 어휘 총정리',
            subPrompt: '짝을 맞추세요.',
            wordPairs: [
              { korean: '직진', english: 'Go straight' },
              { korean: '출구', english: 'Exit' },
              { korean: '횡단보도', english: 'Crosswalk' },
              { korean: '신호등', english: 'Traffic light' }
            ],
            correctAnswer: 'matched',
            explanation: '길 찾기 핵심 명사입니다.'
          },
          {
            id: 'q5-4-4',
            type: 'dictation',
            prompt: '길 찾기 받아쓰기',
            subPrompt: '소리를 듣고 받아적으세요.',
            audioPrompt: '앞으로 쭉 가세요',
            koreanText: '앞으로 쭉 가세요',
            correctAnswer: '앞으로 쭉 가세요',
            explanation: '쭉(Straight/All the way) + 가세요.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'Unit 6: K-컬처 & 일상 리액션 회화',
    subtitle: 'K-POP, 한국 드라마 대화와 자연스러운 한국인 감탄사/리액션 마스터',
    themeColor: 'from-rose-500 to-red-600',
    totalVocab: 32,
    checkpointGrammar: ['좋아하다 / 싫어하다 (취향 표현)', '제안형 어미 -(으)ㄹ까요? / -자', '감탄사와 공감 리액션 (진짜요?, 대박!, 화이팅)', '초급 1 총괄 평가'],
    guidebook: {
      title: 'Unit 6 K-컬처 & 리액션 회화 가이드',
      grammarPoints: [
        {
          title: '취향 표현: ~을/를 좋아해요',
          explanation: '취미나 관심사를 말할 때 명사 뒤에 목적격 조사 "-을/를"과 함께 "좋아해요(I like)"를 씁니다.',
          examples: [
            { korean: '한국 드라마를 좋아해요.', english: 'I like Korean dramas.' },
            { korean: 'K-POP 노래를 자주 들어요.', english: 'I often listen to K-POP songs.' }
          ]
        },
        {
          title: '제안과 의견 묻기: -(으)ㄹ까요?',
          explanation: '상대방에게 함께 무언가를 하자고 제안하거나 의견을 물을 때 씁니다.',
          examples: [
            { korean: '같이 점심 먹을까요? (먹다 + 을까요?)', english: 'Shall we have lunch together?' },
            { korean: '영화 볼까요? (보다 + ㄹ까요?)', english: 'Shall we watch a movie?' }
          ]
        },
        {
          title: '한국인이 가장 많이 쓰는 실전 감탄사',
          explanation: '대화할 때 적절한 추임새와 리액션을 넣으면 한국인 원어민과 훨씬 친근하고 생동감 있게 교감할 수 있습니다.',
          examples: [
            { korean: '진짜요? / 정말요?', english: 'Really? (Surprise or confirmation)' },
            { korean: '대박! / 헐!', english: 'Awesome! / OMG! (Informal excitement)' },
            { korean: '화이팅! (파이팅!)', english: 'Cheer up! / You can do it!' }
          ]
        }
      ],
      keyVocab: [
        { korean: '한국 드라마', english: 'K-Drama', pronunciation: 'han-guk deu-ra-ma' },
        { korean: '노래방', english: 'Karaoke', pronunciation: 'no-rae-bang' },
        { korean: '진짜요?', english: 'Really?', pronunciation: 'jin-jja-yo?' },
        { korean: '대박!', english: 'Awesome / Jackpot!', pronunciation: 'dae-bak!' },
        { korean: '화이팅!', english: 'Fighting! / Cheers!', pronunciation: 'hwa-i-ting!' },
        { korean: '재미있어요', english: 'It is fun / interesting', pronunciation: 'jae-mi-i-sseo-yo' },
        { korean: '같이 가요', english: "Let's go together", pronunciation: 'ga-chi ga-yo' }
      ],
      cultureTip: '한국의 "노래방(Noraebang)"은 방을 빌려 친구들과 노래를 부르는 대표적인 여가 문화입니다. 탬버린을 흔들며 호응하고, 보너스 시간(서비스 시간)을 주는 독특한 정(情) 문화가 있습니다.'
    },
    lessons: [
      {
        id: 'lesson-6-1',
        unitId: 'unit-6',
        unitTitle: 'Unit 6: K-컬처 & 일상 리액션 회화',
        title: '취미와 좋아하는 것 말하기',
        description: 'K-POP, 드라마, 영화 등 취미를 공유하고 취향을 표현합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q6-1-1',
            type: 'word-match',
            prompt: '취미 어휘 매칭',
            subPrompt: '취미 활동과 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '음악 듣기', english: 'Listening to music' },
              { korean: '영화 보기', english: 'Watching movies' },
              { korean: '운동하기', english: 'Exercising' },
              { korean: '요리하기', english: 'Cooking' }
            ],
            correctAnswer: 'matched',
            explanation: '일상 회화에서 취미를 소개할 때 쓰는 명사형 표현입니다.'
          },
          {
            id: 'q6-1-2',
            type: 'speaking',
            prompt: 'K-드라마 취향 말하기',
            subPrompt: '소리내어 자신의 취향을 말해 보세요.',
            koreanText: '저는 한국 드라마를 정말 좋아해요.',
            romanization: 'jeo-neun han-guk deu-ra-ma-reul jeong-mal jo-a-hae-yo.',
            englishText: 'I really like Korean dramas.',
            correctAnswer: '저는 한국 드라마를 정말 좋아해요.',
            explanation: '자연스러운 어조로 말해 보세요.'
          },
          {
            id: 'q6-1-3',
            type: 'fill-blank',
            prompt: '재미 표현 채우기',
            subPrompt: '드라마가 아주 흥미로울 때 알맞은 형용사는?',
            koreanText: '이 드라마는 스토리가 너무 [  ].',
            options: ['재미있어요', '매워요', '차가워요'],
            correctAnswer: '재미있어요',
            explanation: '"재미있어요(It is fun/interesting)"는 콘텐츠 감상 시 가장 기본이 되는 긍정 표현입니다.'
          },
          {
            id: 'q6-1-4',
            type: 'sentence-arrange',
            prompt: '취미 소개 문장 배열',
            subPrompt: '"주말에 친구와 영화를 봐요" 순서로 정렬하세요.',
            options: ['주말에', '영화를 봐요', '친구와'],
            correctAnswer: ['주말에', '친구와', '영화를 봐요'],
            explanation: '시간(주말에) + 동반자(친구와) + 목적어/동사(영화를 봐요) 순서입니다.'
          }
        ]
      },
      {
        id: 'lesson-6-2',
        unitId: 'unit-6',
        unitTitle: 'Unit 6: K-컬처 & 일상 리액션 회화',
        title: '한국인의 실전 감탄사와 리액션',
        description: '진짜요?, 대박!, 화이팅! 등 원어민처럼 대화에 활력을 불어넣는 리액션을 배웁니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q6-2-1',
            type: 'word-match',
            prompt: 'K-리액션 감탄사 매칭',
            subPrompt: '감탄사와 알맞은 뉘앙스를 짝지으세요.',
            wordPairs: [
              { korean: '대박!', english: 'Awesome! / Wow!' },
              { korean: '진짜요?', english: 'Really? / Is that true?' },
              { korean: '화이팅!', english: 'You got this! / Fighting!' },
              { korean: '그렇군요', english: 'I see / Got it' }
            ],
            correctAnswer: 'matched',
            explanation: '한국인이 매일 쓰는 대표 감탄사들입니다.'
          },
          {
            id: 'q6-2-2',
            type: 'listening',
            prompt: '리액션 청취 평가',
            subPrompt: '친구의 축하 말에 어울리는 응답을 고르세요.',
            audioPrompt: 'Alex님, 이번 시험 100점 맞았어요!',
            options: [
              '와, 대박! 정말 축하해요!',
              '안녕히 계세요.',
              '얼마예요?',
              '매운 것 못 먹어요.'
            ],
            correctAnswer: '와, 대박! 정말 축하해요!',
            explanation: '기쁜 소식에 놀라움과 축하를 전하는 "대박! 축하해요!"가 가장 자연스럽습니다.'
          },
          {
            id: 'q6-2-3',
            type: 'fill-blank',
            prompt: '응원 표현 채우기',
            subPrompt: '시험이나 경기를 앞둔 친구에게 건넬 응원은?',
            koreanText: '내일 시험 잘 봐! 힘내, [  ]!',
            options: ['화이팅', '죄송합니다', '감사합니다'],
            correctAnswer: '화이팅',
            explanation: '"화이팅!(Fighting!)"은 한국에서 전 국민이 사용하는 가장 보편적인 응원 구호입니다.'
          },
          {
            id: 'q6-2-4',
            type: 'dictation',
            prompt: '리액션 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '진짜 대박이에요',
            koreanText: '진짜 대박이에요',
            correctAnswer: '진짜 대박이에요',
            explanation: '진짜(Really) + 대박이에요(Awesome).'
          }
        ]
      },
      {
        id: 'lesson-6-3',
        unitId: 'unit-6',
        unitTitle: 'Unit 6: K-컬처 & 일상 리액션 회화',
        title: '주말 약속과 함께하기 제안',
        description: '-(으)ㄹ까요?를 사용하여 친구와 함께 식사나 쇼핑을 제안합니다.',
        level: '초급 1',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q6-3-1',
            type: 'fill-blank',
            prompt: '제안형 어미 -(으)ㄹ까요?',
            subPrompt: '함께 식사하자고 제안할 때 알맞은 어미는?',
            koreanText: '우리 오늘 저녁 같이 [  ]?',
            options: ['먹을까요', '먹어요', '먹었어요'],
            correctAnswer: '먹을까요',
            explanation: '상대방의 의향을 물으며 부드럽게 제안하는 어미는 "-(으)ㄹ까요?"입니다.'
          },
          {
            id: 'q6-3-2',
            type: 'sentence-arrange',
            prompt: '약속 제안 문장 배열',
            subPrompt: '"주말에 같이 노래방 갈까요?" 순서로 맞추세요.',
            options: ['노래방 갈까요?', '주말에', '같이'],
            correctAnswer: ['주말에', '같이', '노래방 갈까요?'],
            explanation: '시간(주말에) + 부사(같이) + 서술어(노래방 갈까요?) 순서입니다.'
          },
          {
            id: 'q6-3-3',
            type: 'speaking',
            prompt: '동의하기 말하기',
            subPrompt: '제안에 기쁘게 찬성해 보세요.',
            koreanText: '좋아요, 같이 가요!',
            romanization: 'jo-a-yo, ga-chi ga-yo!',
            englishText: "Sounds good, let's go together!",
            correctAnswer: '좋아요, 같이 가요!',
            explanation: '상대방의 제안을 수락할 때 가장 자연스러운 표현입니다.'
          },
          {
            id: 'q6-3-4',
            type: 'dictation',
            prompt: '약속 문장 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '다음에 또 만나요',
            koreanText: '다음에 또 만나요',
            correctAnswer: '다음에 또 만나요',
            explanation: '헤어질 때 기약하는 친근한 인사입니다.'
          }
        ]
      },
      {
        id: 'lesson-6-4',
        unitId: 'unit-6',
        unitTitle: 'Unit 6: K-컬처 & 일상 리액션 회화',
        title: 'Unit 6 & 초급 1 총괄 졸업 퀘스트',
        description: '자모 발음부터 인사, 주문, 쇼핑, 길 찾기, K-컬처까지 초급 1 전 단계를 총망라 평가합니다.',
        level: '초급 1',
        xpReward: 50,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q6-4-1',
            type: 'listening',
            prompt: '초급 1 총괄 청취 평가',
            subPrompt: '원어민의 일상 대화를 듣고 이어질 말로 가장 알맞은 것을 고르세요.',
            audioPrompt: '한국어 공부가 많이 어려우셨죠?',
            options: [
              '조금 어렵지만 정말 재미있어요!',
              '물 한 잔 주세요.',
              '오른쪽으로 가세요.',
              '저는 회사원이에요.'
            ],
            correctAnswer: '조금 어렵지만 정말 재미있어요!',
            explanation: '학습 소감을 묻는 질문에 대한 적절한 응답입니다.'
          },
          {
            id: 'q6-4-2',
            type: 'sentence-arrange',
            prompt: '종합 대화 문장 배열',
            subPrompt: '"저는 한국어를 열심히 배워서 한국에 여행 갈 거예요" 순서로 정렬하세요.',
            options: ['저는 한국어를', '열심히 배워서', '여행 갈 거예요.', '한국에'],
            correctAnswer: ['저는 한국어를', '열심히 배워서', '한국에', '여행 갈 거예요.'],
            explanation: '목표를 표현하는 고급 초급 문장 구조입니다.'
          },
          {
            id: 'q6-4-3',
            type: 'word-match',
            prompt: '초급 1 마스터 챔피언 매칭',
            subPrompt: '핵심 표현을 최종 매칭하세요.',
            wordPairs: [
              { korean: '안녕하세요', english: 'Hello' },
              { korean: '감사합니다', english: 'Thank you' },
              { korean: '화이팅!', english: 'Fighting!' },
              { korean: '대박!', english: 'Awesome!' }
            ],
            correctAnswer: 'matched',
            explanation: '초급 1 전 과정의 최고 핵심 단어입니다.'
          },
          {
            id: 'q6-4-4',
            type: 'dictation',
            prompt: '초급 1 졸업 최종 받아쓰기',
            subPrompt: '마지막 격려 문장을 듣고 완벽하게 적어보세요.',
            audioPrompt: '한국어 정복을 축하합니다',
            koreanText: '한국어 정복을 축하합니다',
            correctAnswer: '한국어 정복을 축하합니다',
            explanation: '축하합니다! K-Lingo 초급 1 전 과정을 성공적으로 완주하셨습니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'Unit 7: 하루 일과와 시간/날짜',
    subtitle: '한국어 시간 읽기(시/분), 하루 루틴과 순서 표현 (-기 전에, -(으)ㄴ 후에) 마스터',
    themeColor: 'from-sky-500 to-blue-600',
    totalVocab: 28,
    checkpointGrammar: [
      '순우리말 시 vs 한자어 분 (시간 체계)',
      '시간 명사 뒤 조사 "-에"',
      '동작의 선후 순서: -기 전에 vs -(으)ㄴ 후에',
      '빈도 부사 (매일, 항상, 자주, 가끔, 전혀)'
    ],
    guidebook: {
      title: 'Unit 7 시간 & 하루 일과 표현 가이드',
      grammarPoints: [
        {
          title: '시간 표기법: [순우리말] 시 + [한자어] 분',
          explanation: '한국어에서 시간을 말할 때 "시(Hour)"는 순우리말 수사(한, 두, 세, 네...)를 쓰고, "분(Minute)"은 한자어 수사(일, 이, 삼, 사...)를 씁니다.',
          examples: [
            { korean: '1시 15분 = 한 시 십오 분', english: '1:15 = Han si sip-o bun' },
            { korean: '7시 30분 = 일곱 시 반 (삼십 분)', english: '7:30 = Il-gop si ban' }
          ]
        },
        {
          title: '시간의 조사: -에',
          explanation: '특정 시간이나 요일 뒤에 붙어 동작이 일어나는 시점을 나타냅니다. 단, "오늘, 내일, 어제, 지금" 뒤에는 붙이지 않습니다.',
          examples: [
            { korean: '아침 7시에 일어나요.', english: 'I wake up at 7 in the morning.' },
            { korean: '주말에 친구를 만나요.', english: 'I meet a friend on the weekend.' }
          ]
        },
        {
          title: '순서 표현: -기 전에 vs -(으)ㄴ 후에',
          explanation: '동작의 전후 순서를 나타냅니다. 동사 어간 + -기 전에(Before doing), 동사 어간 + -(으)ㄴ 후에(After doing).',
          examples: [
            { korean: '밥을 먹기 전에 손을 씻어요.', english: 'I wash my hands before eating.' },
            { korean: '수업이 끝난 후에 도서관에 가요.', english: 'I go to the library after class ends.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '지금', english: 'Now', pronunciation: 'ji-geum' },
        { korean: '몇 시', english: 'What time', pronunciation: 'myeot si' },
        { korean: '오전 / 오후', english: 'AM / PM', pronunciation: 'o-jeon / o-hu' },
        { korean: '일어나다', english: 'To wake up', pronunciation: 'i-reo-na-da' },
        { korean: '자다', english: 'To sleep', pronunciation: 'ja-da' },
        { korean: '출근하다', english: 'To go to work', pronunciation: 'chul-geun-ha-da' },
        { korean: '퇴근하다', english: 'To leave work', pronunciation: 'toe-geun-ha-da' },
        { korean: '매일', english: 'Every day', pronunciation: 'mae-il' }
      ],
      cultureTip: '한국 직장인들은 퇴근할 때 동료들에게 "먼저 퇴근하겠습니다" 또는 "수고하셨습니다 / 내일 뵙겠습니다"라는 정중한 퇴근 인사를 건네는 문화를 가지고 있습니다.'
    },
    lessons: [
      {
        id: 'lesson-7-1',
        unitId: 'unit-7',
        unitTitle: 'Unit 7: 하루 일과와 시간/날짜',
        title: '지금 몇 시예요? (시간 묻고 답하기)',
        description: '시(순우리말)와 분(한자어)의 결합 원리를 익히고 현재 시간을 정확히 말합니다.',
        level: '초급 2',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q7-1-1',
            type: 'word-match',
            prompt: '시간 어휘 매칭',
            subPrompt: '시간 표현과 영어 뜻을 올바르게 짝지으세요.',
            wordPairs: [
              { korean: '한 시', english: '1 o’clock' },
              { korean: '두 시 반', english: '2:30 (half past two)' },
              { korean: '오전', english: 'Morning / AM' },
              { korean: '오후', english: 'Afternoon / PM' }
            ],
            correctAnswer: 'matched',
            explanation: '시는 순우리말(한, 두, 세, 네...), 반은 30분을 뜻합니다.'
          },
          {
            id: 'q7-1-2',
            type: 'listening',
            prompt: '시간 듣기 평가',
            subPrompt: '원어민이 말하는 시간을 듣고 알맞은 시간을 고르세요.',
            audioPrompt: '지금 세 시 십오 분이에요',
            options: ['3시 15분', '3시 50분', '4시 15분', '2시 15분'],
            correctAnswer: '3시 15분',
            explanation: '세 시(3시) + 십오 분(15분)입니다.'
          },
          {
            id: 'q7-1-3',
            type: 'speaking',
            prompt: '시간 질문 말하기',
            subPrompt: '상대방에게 시간을 정중하게 물어보세요.',
            koreanText: '지금 몇 시예요?',
            romanization: 'ji-geum myeot si-ye-yo?',
            englishText: 'What time is it now?',
            correctAnswer: '지금 몇 시예요?',
            explanation: '몇 시(what time) + 예요(is it)를 자연스럽게 발음합니다.'
          },
          {
            id: 'q7-1-4',
            type: 'sentence-arrange',
            prompt: '시간 답변 문장 배열',
            subPrompt: '"지금은 오후 두 시입니다" 순서로 배열하세요.',
            options: ['오후', '두 시입니다.', '지금은'],
            correctAnswer: ['지금은', '오후', '두 시입니다.'],
            explanation: '주어(지금은) + 시간대(오후) + 시각 서술어(두 시입니다) 순서입니다.'
          }
        ]
      },
      {
        id: 'lesson-7-2',
        unitId: 'unit-7',
        unitTitle: 'Unit 7: 하루 일과와 시간/날짜',
        title: '아침부터 밤까지 (하루 루틴)',
        description: '기상, 식사, 출근, 취침 등 일상 행동과 시간 조사 "-에"를 배웁니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q7-2-1',
            type: 'fill-blank',
            prompt: '시간 조사 빈칸 채우기',
            subPrompt: '문맥에 가장 알맞은 조사를 고르세요.',
            koreanText: '저는 아침 7시[  ] 일어나요.',
            options: ['에', '를', '에서', '으로'],
            correctAnswer: '에',
            explanation: '특정 시각에 일어나는 동작 앞에는 시간 조사 "-에"를 씁니다.'
          },
          {
            id: 'q7-2-2',
            type: 'sentence-arrange',
            prompt: '하루 일과 문장 배열',
            subPrompt: '"밤 11시에 잠을 자요" 순서로 만드세요.',
            options: ['잠을 자요.', '밤 11시에'],
            correctAnswer: ['밤 11시에', '잠을 자요.'],
            explanation: '시간 부사구(밤 11시에)가 문장 앞에 위치합니다.'
          },
          {
            id: 'q7-2-3',
            type: 'listening',
            prompt: '퇴근 시간 듣기',
            subPrompt: '소리를 듣고 언제 퇴근하는지 고르세요.',
            audioPrompt: '보통 오후 여섯 시에 퇴근해요',
            options: ['오후 6시', '오후 7시', '오전 6시', '밤 10시'],
            correctAnswer: '오후 6시',
            explanation: '오후(Afternoon) + 여섯 시(6 o’clock)입니다.'
          },
          {
            id: 'q7-2-4',
            type: 'dictation',
            prompt: '아침 식사 문장 받아쓰기',
            subPrompt: '음성을 듣고 문장을 적으세요.',
            audioPrompt: '아침 여덟 시에 밥을 먹어요',
            koreanText: '아침 여덟 시에 밥을 먹어요',
            correctAnswer: '아침 여덟 시에 밥을 먹어요',
            explanation: '아침 여덟 시에(At 8am) + 밥을 먹어요(I eat a meal).'
          }
        ]
      },
      {
        id: 'lesson-7-3',
        unitId: 'unit-7',
        unitTitle: 'Unit 7: 하루 일과와 시간/날짜',
        title: '행동의 순서 (-기 전에 / -(으)ㄴ 후에)',
        description: '앞뒤 동작의 선후 관계와 일상의 인과/시간 연결 어미를 배웁니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q7-3-1',
            type: 'fill-blank',
            prompt: '선후 순서 어미 선택',
            subPrompt: '식사 전에 손을 씻는 문장을 완성하세요.',
            koreanText: '밥을 [  ] 전에 손을 깨끗이 씻어요.',
            options: ['먹기', '먹은', '먹고', '먹으면'],
            correctAnswer: '먹기',
            explanation: '"~하기 전에"는 동사 어간 뒤에 "-기 전에"를 붙입니다.'
          },
          {
            id: 'q7-3-2',
            type: 'speaking',
            prompt: '식후 커피 습관 말하기',
            subPrompt: '식사 후 루틴을 소리내어 말해보세요.',
            koreanText: '점심을 먹은 후에 커피를 마셔요.',
            romanization: 'jeom-si-meul meo-geun hu-e keo-pi-reul ma-syeo-yo.',
            englishText: 'I drink coffee after having lunch.',
            correctAnswer: '점심을 먹은 후에 커피를 마셔요.',
            explanation: '"동사 + -(으)ㄴ 후에"는 ~한 뒤에라는 뜻입니다.'
          },
          {
            id: 'q7-3-3',
            type: 'word-match',
            prompt: '빈도 부사 매칭',
            subPrompt: '자주 쓰는 빈도 표현을 짝지으세요.',
            wordPairs: [
              { korean: '항상', english: 'Always' },
              { korean: '자주', english: 'Often' },
              { korean: '가끔', english: 'Sometimes' },
              { korean: '전혀', english: 'Not at all (Never)' }
            ],
            correctAnswer: 'matched',
            explanation: '일상 습관의 빈도를 나타내는 대표 부사입니다.'
          },
          {
            id: 'q7-3-4',
            type: 'sentence-arrange',
            prompt: '외출 전 점검 문장 배열',
            subPrompt: '"집을 나가기 전에 불을 꺼요" 순서로 맞추세요.',
            options: ['불을 꺼요.', '나가기 전에', '집을'],
            correctAnswer: ['집을', '나가기 전에', '불을 꺼요.'],
            explanation: '목적어(집을) + 조건절(나가기 전에) + 주동작(불을 꺼요) 구조입니다.'
          }
        ]
      },
      {
        id: 'lesson-7-4',
        unitId: 'unit-7',
        unitTitle: 'Unit 7: 하루 일과와 시간/날짜',
        title: 'Unit 7 복습 & 타임테이블 챌린지',
        description: '시간 읽기부터 하루 일과, 선후 연결 어미까지 실전 일정 회화를 점검합니다.',
        level: '초급 2',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q7-4-1',
            type: 'listening',
            prompt: '약속 시간 청취',
            subPrompt: '대화를 듣고 약속 시간을 고르세요.',
            audioPrompt: '우리 내일 오후 세 시 반에 만날까요?',
            options: ['오후 3시 30분', '오후 2시 30분', '오전 3시 30분', '오후 4시 00분'],
            correctAnswer: '오후 3시 30분',
            explanation: '오후 세 시 반은 오후 3시 30분을 의미합니다.'
          },
          {
            id: 'q7-4-2',
            type: 'sentence-arrange',
            prompt: '완벽한 루틴 문장 배열',
            subPrompt: '"저는 매일 아침 운동을 한 후에 샤워를 해요"를 맞추세요.',
            options: ['샤워를 해요.', '매일 아침', '운동을 한 후에', '저는'],
            correctAnswer: ['저는', '매일 아침', '운동을 한 후에', '샤워를 해요.'],
            explanation: '주어 + 시간부사 + 선행동작절 + 본동작 순서입니다.'
          },
          {
            id: 'q7-4-3',
            type: 'dictation',
            prompt: '시간 약속 받아쓰기',
            subPrompt: '음성을 듣고 정확하게 받아적으세요.',
            audioPrompt: '내일 열 시에 만나요',
            koreanText: '내일 열 시에 만나요',
            correctAnswer: '내일 열 시에 만나요',
            explanation: '내일(Tomorrow) + 열 시에(at 10 o’clock) + 만나요(Let’s meet).'
          },
          {
            id: 'q7-4-4',
            type: 'speaking',
            prompt: '퇴근 인사 말하기',
            subPrompt: '한국 직장 문화의 퇴근 인사를 소리내어 말해보세요.',
            koreanText: '오늘 모두 수고하셨습니다. 내일 봬요!',
            romanization: 'o-neul mo-du su-go-ha-syeot-seum-ni-da. nae-il bwae-yo!',
            englishText: 'Thank you for your hard work today. See you tomorrow!',
            correctAnswer: '오늘 모두 수고하셨습니다. 내일 봬요!',
            explanation: '자연스럽고 예의 바른 한국식 퇴근 인사입니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-8',
    unitNumber: 8,
    title: 'Unit 8: 병원, 약국 & 건강 증상',
    subtitle: '신체 부위 명칭, 증상 설명하기 및 약 복용법과 의무/금지 표현 마스터',
    themeColor: 'from-rose-500 to-pink-600',
    totalVocab: 30,
    checkpointGrammar: [
      '어디가 아프세요? (증상 질문)',
      '신체 부위 + 이/가 아파요 / -에 걸렸어요',
      '의무 표현: -아야/어야 돼요',
      '금지 표현: -(으)면 안 돼요'
    ],
    guidebook: {
      title: 'Unit 8 병원 & 약국 필수 표현 가이드',
      grammarPoints: [
        {
          title: '증상 말하기: [신체]이/가 아파요 & [병명]에 걸렸어요',
          explanation: '아픈 부위를 말할 때는 조사 "-이/가"와 "아파요(it hurts)"를 쓰고, 감기나 독감 같은 병에는 "-에 걸렸어요(caught a cold)"를 씁니다.',
          examples: [
            { korean: '머리가 너무 아파요. (두통)', english: 'My head hurts so much. (Headache)' },
            { korean: '감기에 걸려서 열이 나요.', english: 'I have a fever because I caught a cold.' }
          ]
        },
        {
          title: '의무와 필요: -아야/어야 돼요',
          explanation: '반드시 해야 하는 행동이나 복용 지시를 나타낼 때 씁니다. 모음 ㅏ, ㅗ 뒤는 -아야 돼요, 그 외는 -어야 돼요.',
          examples: [
            { korean: '이 약을 하루 세 번 먹어야 돼요.', english: 'You must take this medicine three times a day.' },
            { korean: '오늘은 집에서 푹 쉬어야 돼요.', english: 'You need to get a good rest at home today.' }
          ]
        },
        {
          title: '금지 표현: -(으)면 안 돼요',
          explanation: '해서는 안 되는 행동을 경고하거나 안내할 때 씁니다. 받침 없으면 -면 안 돼요, 받침 있으면 -으면 안 돼요.',
          examples: [
            { korean: '약을 먹은 후에는 술을 마시면 안 돼요.', english: 'You must not drink alcohol after taking medicine.' },
            { korean: '차가운 물을 마시면 안 돼요.', english: 'You shouldn’t drink cold water.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '머리 / 두통', english: 'Head / Headache', pronunciation: 'meo-ri / du-tong' },
        { korean: '배 / 복통', english: 'Stomach / Stomachache', pronunciation: 'bae / bok-tong' },
        { korean: '목', english: 'Throat / Neck', pronunciation: 'mok' },
        { korean: '감기약', english: 'Cold medicine', pronunciation: 'gam-gi-yak' },
        { korean: '열이 나다', english: 'To have a fever', pronunciation: 'yeo-ri na-da' },
        { korean: '식후 30분', english: '30 mins after meals', pronunciation: 'sik-hu sam-sip bun' },
        { korean: '푹 쉬다', english: 'To rest well', pronunciation: 'puk swi-da' }
      ],
      cultureTip: '한국의 약 봉투에는 "식후 30분 복용", "1일 3회" 등 복약 지침이 QR코드나 인쇄물로 아주 상세하게 기재되어 있으며, 일반의약품은 약국에서 쉽게 상담받을 수 있습니다.'
    },
    lessons: [
      {
        id: 'lesson-8-1',
        unitId: 'unit-8',
        unitTitle: 'Unit 8: 병원, 약국 & 건강 증상',
        title: '어디가 아프세요? (신체 부위와 증상)',
        description: '머리, 배, 목, 다리 등 신체 부위와 통증을 구체적으로 표현합니다.',
        level: '초급 2',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q8-1-1',
            type: 'word-match',
            prompt: '신체 부위 매칭',
            subPrompt: '신체 명사와 영어 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '머리', english: 'Head' },
              { korean: '배', english: 'Stomach / Belly' },
              { korean: '목', english: 'Throat / Neck' },
              { korean: '눈', english: 'Eye' }
            ],
            correctAnswer: 'matched',
            explanation: '통증 부위를 설명할 때 가장 기본이 되는 신체 단어들입니다.'
          },
          {
            id: 'q8-1-2',
            type: 'speaking',
            prompt: '통증 호소하기',
            subPrompt: '의사에게 아픈 부위를 또렷하게 말해보세요.',
            koreanText: '어제부터 목이 아프고 열이 나요.',
            romanization: 'eo-je-bu-teo mo-gi a-peu-go yeo-ri na-yo.',
            englishText: 'My throat hurts and I have a fever since yesterday.',
            correctAnswer: '어제부터 목이 아프고 열이 나요.',
            explanation: '목이 아프고(throat hurts and) + 열이 나요(have a fever).'
          },
          {
            id: 'q8-1-3',
            type: 'fill-blank',
            prompt: '감기 증상 빈칸 채우기',
            subPrompt: '"감기에 걸렸어요"를 완성하세요.',
            koreanText: '기침이 나고 [  ]에 걸린 것 같아요.',
            options: ['감기', '약국', '병원', '건강'],
            correctAnswer: '감기',
            explanation: '"감기에 걸리다"는 감기를 앓는다는 고정 표현입니다.'
          },
          {
            id: 'q8-1-4',
            type: 'listening',
            prompt: '의사의 질문 듣기',
            subPrompt: '의사가 묻는 말을 듣고 올바른 한국어 질문을 고르세요.',
            audioPrompt: '어디가 불편해서 오셨어요?',
            options: [
              '어디가 불편해서 오셨어요?',
              '어디에 살고 계세요?',
              '무엇을 드시고 싶으세요?',
              '몇 시에 오셨어요?'
            ],
            correctAnswer: '어디가 불편해서 오셨어요?',
            explanation: '한국 병원에서 진료를 시작할 때 의사가 건네는 전형적인 질문입니다.'
          }
        ]
      },
      {
        id: 'lesson-8-2',
        unitId: 'unit-8',
        unitTitle: 'Unit 8: 병원, 약국 & 건강 증상',
        title: '약국에서 약 사기 (복약 지도)',
        description: '약사에게 증상에 맞는 약을 요청하고 복용법 설명을 듣고 이해합니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q8-2-1',
            type: 'sentence-arrange',
            prompt: '약국 구매 문장 배열',
            subPrompt: '"두통약 하나만 주세요" 순서로 맞추세요.',
            options: ['주세요.', '하나만', '두통약'],
            correctAnswer: ['두통약', '하나만', '주세요.'],
            explanation: '약품명(두통약) + 수량(하나만) + 청유(주세요).'
          },
          {
            id: 'q8-2-2',
            type: 'listening',
            prompt: '약 복용법 청취',
            subPrompt: '약사의 설명을 듣고 약을 언제 먹어야 하는지 고르세요.',
            audioPrompt: '이 약은 밥을 먹은 후에 드세요',
            options: ['식후 (밥 먹은 후)', '식전 (밥 먹기 전)', '취침 직전', '아침에만'],
            correctAnswer: '식후 (밥 먹은 후)',
            explanation: '"밥을 먹은 후에(식후)" 복용하라는 지침입니다.'
          },
          {
            id: 'q8-2-3',
            type: 'word-match',
            prompt: '약국 주요 용어 매칭',
            subPrompt: '약국에서 자주 보이는 단어들을 매칭하세요.',
            wordPairs: [
              { korean: '소화제', english: 'Digestive medicine' },
              { korean: '진통제', english: 'Painkiller' },
              { korean: '감기약', english: 'Cold medicine' },
              { korean: '파스', english: 'Pain relief patch' }
            ],
            correctAnswer: 'matched',
            explanation: '약국에서 처방전 없이 자주 찾는 일반의약품입니다.'
          },
          {
            id: 'q8-2-4',
            type: 'dictation',
            prompt: '복용 설명 받아쓰기',
            subPrompt: '소리를 듣고 적으세요.',
            audioPrompt: '하루 세 번 드세요',
            koreanText: '하루 세 번 드세요',
            correctAnswer: '하루 세 번 드세요',
            explanation: '하루(Per day) + 세 번(3 times) + 드세요(Please take).'
          }
        ]
      },
      {
        id: 'lesson-8-3',
        unitId: 'unit-8',
        unitTitle: 'Unit 8: 병원, 약국 & 건강 증상',
        title: '의무와 금지 (-아야 돼요 / -면 안 돼요)',
        description: '치료를 위해 꼭 해야 하는 행동과 피해야 하는 금기 사항을 표현합니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q8-3-1',
            type: 'fill-blank',
            prompt: '금지 표현 완성하기',
            subPrompt: '음주 금지 문장을 완성하세요.',
            koreanText: '약 복용 중에는 술을 [  ] 안 돼요.',
            options: ['마시면', '마셔야', '마시러', '마시는데'],
            correctAnswer: '마시면',
            explanation: '금지 어미는 "-(으)면 안 돼요"입니다.'
          },
          {
            id: 'q8-3-2',
            type: 'speaking',
            prompt: '휴식의 의무 말하기',
            subPrompt: '환자에게 휴식을 권유하는 문장을 발음하세요.',
            koreanText: '오늘은 무리하지 말고 푹 쉬어야 돼요.',
            romanization: 'o-neu-reun mu-ri-ha-ji mal-go puk swi-eo-ya dwae-yo.',
            englishText: 'You need to take a good rest today without overdoing it.',
            correctAnswer: '오늘은 무리하지 말고 푹 쉬어야 돼요.',
            explanation: '"-어야 돼요"는 꼭 해야 한다는 의무를 부드럽게 표현합니다.'
          },
          {
            id: 'q8-3-3',
            type: 'sentence-arrange',
            prompt: '조심할 사항 문장 배열',
            subPrompt: '"물을 많이 마셔야 돼요" 순서로 배열하세요.',
            options: ['마셔야 돼요.', '물을', '많이'],
            correctAnswer: ['물을', '많이', '마셔야 돼요.'],
            explanation: '목적어(물을) + 부사(많이) + 의무 서술어(마셔야 돼요).'
          },
          {
            id: 'q8-3-4',
            type: 'fill-blank',
            prompt: '의무 어미 완성하기',
            subPrompt: '병원 방문이 필요한 상황을 표현하세요.',
            koreanText: '열이 계속 나면 병원에 [  ] 돼요.',
            options: ['가야', '가면', '가서', '가고'],
            correctAnswer: '가야',
            explanation: '가다 + -아야 돼요 = 가야 돼요.'
          }
        ]
      },
      {
        id: 'lesson-8-4',
        unitId: 'unit-8',
        unitTitle: 'Unit 8: 병원, 약국 & 건강 증상',
        title: 'Unit 8 헬스케어 종합 마스터',
        description: '병원 진료 상황과 약국 대화를 총망라하여 롤플레잉 챌린지를 수행합니다.',
        level: '초급 2',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q8-4-1',
            type: 'listening',
            prompt: '종합 진료 대화 청취',
            subPrompt: '의사의 진단을 듣고 가장 알맞은 환자의 대답을 고르세요.',
            audioPrompt: '목이 많이 부으셨네요. 따뜻한 물을 자주 드셔야 합니다.',
            options: [
              '네, 명심하고 따뜻한 물 많이 마실게요.',
              '저는 영화 보는 것을 좋아해요.',
              '오른쪽으로 쭉 가세요.',
              '물 한 잔만 주세요.'
            ],
            correctAnswer: '네, 명심하고 따뜻한 물 많이 마실게요.',
            explanation: '의사의 처방 지시에 알맞게 순응하는 답변입니다.'
          },
          {
            id: 'q8-4-2',
            type: 'sentence-arrange',
            prompt: '종합 복약 지도 문장 배열',
            subPrompt: '"식사 후 30분에 이 약을 드세요" 순서로 만드세요.',
            options: ['이 약을 드세요.', '식사 후 30분에'],
            correctAnswer: ['식사 후 30분에', '이 약을 드세요.'],
            explanation: '시간 조건(식사 후 30분에) + 복용 권유(이 약을 드세요).'
          },
          {
            id: 'q8-4-3',
            type: 'dictation',
            prompt: '쾌유 기원 받아쓰기',
            subPrompt: '상대방의 빠른 쾌유를 비는 인사를 적으세요.',
            audioPrompt: '빨리 나으세요',
            koreanText: '빨리 나으세요',
            correctAnswer: '빨리 나으세요',
            explanation: '아픈 사람에게 건네는 따뜻한 한국어 인사 "Get well soon"입니다.'
          },
          {
            id: 'q8-4-4',
            type: 'word-match',
            prompt: '건강 표현 최종 매칭',
            subPrompt: '증상과 행동을 짝지으세요.',
            wordPairs: [
              { korean: '감기에 걸리다', english: 'Catch a cold' },
              { korean: '열이 나다', english: 'Have a fever' },
              { korean: '푹 쉬다', english: 'Get plenty of rest' },
              { korean: '빨리 낫다', english: 'Recover quickly' }
            ],
            correctAnswer: 'matched',
            explanation: '건강과 질병 회화의 핵심 숙어입니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-9',
    unitNumber: 9,
    title: 'Unit 9: 대중교통과 국내 여행',
    subtitle: '지하철 환승, 버스/택시 이용, KTX 기차표 예매와 목적 표현 (-러 가다)',
    themeColor: 'from-teal-500 to-emerald-600',
    totalVocab: 32,
    checkpointGrammar: [
      '수단/방법의 조사: -(으)로 (지하철로 가요)',
      '목적 이동 어미: -(으)러 가다/오다',
      '범위와 시간: ~에서 ~까지 얼마나 걸려요?',
      '교통카드(티머니) 태그와 환승 규칙'
    ],
    guidebook: {
      title: 'Unit 9 한국 대중교통 & 여행 가이드',
      grammarPoints: [
        {
          title: '교통수단의 조사: -(으)로',
          explanation: '어떤 교통수단이나 도구를 이용해 이동할 때 씁니다. 받침 없거나 ㄹ이면 -로, 그 외 받침은 -으로.',
          examples: [
            { korean: '부산까지 KTX로 가요.', english: 'I go to Busan by KTX.' },
            { korean: '회사에 지하철로 출근해요.', english: 'I commute to work by subway.' }
          ]
        },
        {
          title: '목적을 나타내는 어미: -(으)러 가다/오다',
          explanation: '어떤 목적을 달성하기 위해 이동할 때 동사 어간 뒤에 붙입니다. (In order to do something).',
          examples: [
            { korean: '친구를 만나러 홍대에 가요.', english: 'I go to Hongdae to meet a friend.' },
            { korean: '한국어를 배우러 한국에 왔어요.', english: 'I came to Korea to learn Korean.' }
          ]
        },
        {
          title: '출발지와 도착지: ~에서 ~까지',
          explanation: '공간이나 시간의 시작점(~에서, From)과 종착점(~까지, To)을 명시합니다.',
          examples: [
            { korean: '서울역에서 부산역까지 2시간 반 걸려요.', english: 'It takes 2.5 hours from Seoul Station to Busan Station.' },
            { korean: '여기에서 저기까지 걸어갈 수 있어요.', english: 'You can walk from here to there.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '지하철 / 호선', english: 'Subway / Line number', pronunciation: 'ji-ha-cheol / ho-seon' },
        { korean: '환승역', english: 'Transfer station', pronunciation: 'hwan-seung-yeok' },
        { korean: '교통카드', english: 'Transit card (T-money)', pronunciation: 'gyo-tong-ka-deu' },
        { korean: '타다 / 내리다', english: 'To get on / To get off', pronunciation: 'ta-da / nae-ri-da' },
        { korean: '갈아타다', english: 'To transfer / change', pronunciation: 'ga-ra-ta-da' },
        { korean: '기차표', english: 'Train ticket', pronunciation: 'gi-cha-pyo' },
        { korean: '얼마나 걸려요?', english: 'How long does it take?', pronunciation: 'eol-ma-na geol-lyeo-yo?' }
      ],
      cultureTip: '한국의 수도권 지하철은 노선 번호와 고유 색상(1호선 파랑, 2호선 초록, 3호선 주황 등)이 직관적으로 구분되어 있으며, 교통카드를 찍고 내린 뒤 30분 이내에 버스로 갈아타면 환승 무료/할인이 적용됩니다.'
    },
    lessons: [
      {
        id: 'lesson-9-1',
        unitId: 'unit-9',
        unitTitle: 'Unit 9: 대중교통과 국내 여행',
        title: '지하철 환승과 출구 찾기',
        description: '호선 갈아타기, 환승역 표지판 읽기, 목적지 출구 찾기를 마스터합니다.',
        level: '초급 2',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q9-1-1',
            type: 'word-match',
            prompt: '지하철 어휘 매칭',
            subPrompt: '지하철 관련 단어와 뜻을 연결하세요.',
            wordPairs: [
              { korean: '환승', english: 'Transfer' },
              { korean: '출구', english: 'Exit' },
              { korean: '2호선', english: 'Line 2' },
              { korean: '갈아타다', english: 'To transfer / switch trains' }
            ],
            correctAnswer: 'matched',
            explanation: '한국 지하철 이용의 핵심 필수 어휘입니다.'
          },
          {
            id: 'q9-1-2',
            type: 'listening',
            prompt: '지하철 방송 청취',
            subPrompt: '안내 방송을 듣고 이번 역에서 무엇을 해야 하는지 고르세요.',
            audioPrompt: '이번 역은 시청, 시청역입니다. 2호선으로 갈아타실 고객께서는 내리시기 바랍니다.',
            options: [
              '2호선으로 갈아타야 한다.',
              '3호선으로 갈아타야 한다.',
              '지하철 밖으로 나가야 한다.',
              '기차표를 예매해야 한다.'
            ],
            correctAnswer: '2호선으로 갈아타야 한다.',
            explanation: '실제 서울 지하철의 유명한 환승 안내 방송 패턴입니다.'
          },
          {
            id: 'q9-1-3',
            type: 'speaking',
            prompt: '출구 묻기 말하기',
            subPrompt: '역무원에게 출구를 정중히 물어보세요.',
            koreanText: '남산타워에 가려면 몇 번 출구로 나가야 돼요?',
            romanization: 'nam-san-ta-wo-e ga-ryeo-myeon myeot beon chul-gu-ro na-ga-ya dwae-yo?',
            englishText: 'Which exit should I take to go to Namsan Tower?',
            correctAnswer: '남산타워에 가려면 몇 번 출구로 나가야 돼요?',
            explanation: '몇 번 출구(Which exit) + 로 나가야 돼요(should I take).'
          },
          {
            id: 'q9-1-4',
            type: 'sentence-arrange',
            prompt: '환승 안내 문장 배열',
            subPrompt: '"강남역에서 신분당선으로 갈아타세요"를 만드세요.',
            options: ['갈아타세요.', '신분당선으로', '강남역에서'],
            correctAnswer: ['강남역에서', '신분당선으로', '갈아타세요.'],
            explanation: '장소(강남역에서) + 노선(신분당선으로) + 행동(갈아타세요).'
          }
        ]
      },
      {
        id: 'lesson-9-2',
        unitId: 'unit-9',
        unitTitle: 'Unit 9: 대중교통과 국내 여행',
        title: '버스와 택시 이용하기',
        description: '정류장 찾기, 기사님께 목적지 말하기, 교통카드 태그 회화를 배웁니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q9-2-1',
            type: 'speaking',
            prompt: '택시 기사님께 행선지 말하기',
            subPrompt: '택시에 타서 목적지를 당당하게 말씀해 보세요.',
            koreanText: '기사님, 명동역으로 가주세요.',
            romanization: 'gi-sa-nim, myeong-dong-yeo-geu-ro ga-ju-se-yo.',
            englishText: 'Driver, please take me to Myeongdong Station.',
            correctAnswer: '기사님, 명동역으로 가주세요.',
            explanation: '기사님(Driver) + 장소(명동역으로) + 가주세요(please take me).'
          },
          {
            id: 'q9-2-2',
            type: 'fill-blank',
            prompt: '교통수단 조사 채우기',
            subPrompt: '"버스로 가요"를 완성하세요.',
            koreanText: '여기에서 공항까지 [  ]로 갈 수 있어요.',
            options: ['버스', '지하철에', '택시를', '비행기가'],
            correctAnswer: '버스',
            explanation: '받침 없는 명사 버스 뒤에 수단 조사 "-로"가 붙습니다.'
          },
          {
            id: 'q9-2-3',
            type: 'listening',
            prompt: '소요 시간 질문 듣기',
            subPrompt: '소리를 듣고 무슨 뜻인지 고르세요.',
            audioPrompt: '거기까지 얼마나 걸려요?',
            options: [
              '거기까지 시간이 얼마나 걸리나요?',
              '거기까지 요금이 얼마인가요?',
              '어디에서 내려야 하나요?',
              '교통카드가 있나요?'
            ],
            correctAnswer: '거기까지 시간이 얼마나 걸리나요?',
            explanation: '"얼마나 걸려요?"는 소요 시간을 물을 때 사용하는 필수 관용구입니다.'
          },
          {
            id: 'q9-2-4',
            type: 'dictation',
            prompt: '하차 요청 받아쓰기',
            subPrompt: '버스 기사님께 내린다고 알릴 때 쓰는 말을 적으세요.',
            audioPrompt: '이번 정류장에서 내려주세요',
            koreanText: '이번 정류장에서 내려주세요',
            correctAnswer: '이번 정류장에서 내려주세요',
            explanation: '이번 정류장에서(At this stop) + 내려주세요(Please let me off).'
          }
        ]
      },
      {
        id: 'lesson-9-3',
        unitId: 'unit-9',
        unitTitle: 'Unit 9: 대중교통과 국내 여행',
        title: 'KTX 타고 부산 여행 (목적: -(으)러 가다)',
        description: '기차표 예매와 목적 표현 "-(으)러 가다/오다"를 활용해 여행 계획을 세웁니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q9-3-1',
            type: 'fill-blank',
            prompt: '목적 이동 어미 채우기',
            subPrompt: '바다를 보러 가는 문장을 완성하세요.',
            koreanText: '주말에 바다를 [  ] 부산에 가요.',
            options: ['보러', '보고', '보면', '보아서'],
            correctAnswer: '보러',
            explanation: '목적을 나타내는 어미는 동사 어간 뒤의 "-(으)러"입니다.'
          },
          {
            id: 'q9-3-2',
            type: 'sentence-arrange',
            prompt: '기차표 예매 문장 배열',
            subPrompt: '"부산행 KTX 표 두 장 주세요"를 완성하세요.',
            options: ['주세요.', 'KTX 표', '두 장', '부산행'],
            correctAnswer: ['부산행', 'KTX 표', '두 장', '주세요.'],
            explanation: '행선지(부산행) + 열차종류(KTX 표) + 수량(두 장) + 요청(주세요).'
          },
          {
            id: 'q9-3-3',
            type: 'speaking',
            prompt: '여행 목적 말하기',
            subPrompt: '친구에게 한국 여행 이유를 말해보세요.',
            koreanText: '맛있는 한식을 먹으러 전주에 갈 거예요.',
            romanization: 'ma-sin-neun han-si-geul meo-geu-reo jeon-ju-e gal geo-ye-yo.',
            englishText: 'I will go to Jeonju to eat delicious Korean food.',
            correctAnswer: '맛있는 한식을 먹으러 전주에 갈 거예요.',
            explanation: '먹다(받침 있음) + 으러 = 먹으러.'
          },
          {
            id: 'q9-3-4',
            type: 'word-match',
            prompt: '여행지 및 교통 어휘 매칭',
            subPrompt: '단어와 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '편도 / 왕복', english: 'One-way / Round-trip' },
              { korean: '출발 시간', english: 'Departure time' },
              { korean: '도착역', english: 'Arrival station' },
              { korean: '좌석 번호', english: 'Seat number' }
            ],
            correctAnswer: 'matched',
            explanation: '기차표나 버스표를 예매할 때 확인해야 하는 주요 항목입니다.'
          }
        ]
      },
      {
        id: 'lesson-9-4',
        unitId: 'unit-9',
        unitTitle: 'Unit 9: 대중교통과 국내 여행',
        title: 'Unit 9 전국 여행 퀘스트',
        description: '교통수단부터 환승, 소요 시간, 목적 표현까지 여행 실전 상황을 총점검합니다.',
        level: '초급 2',
        xpReward: 35,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q9-4-1',
            type: 'listening',
            prompt: '소요 시간 대화 청취',
            subPrompt: '대화를 듣고 서울에서 부산까지 KTX로 얼마나 걸리는지 고르세요.',
            audioPrompt: '서울역에서 부산역까지 KTX로 두 시간 반 정도 걸려요.',
            options: ['약 2시간 30분', '약 1시간 30분', '약 3시간 30분', '약 4시간'],
            correctAnswer: '약 2시간 30분',
            explanation: '"두 시간 반 정도(about 2.5 hours)" 걸립니다.'
          },
          {
            id: 'q9-4-2',
            type: 'sentence-arrange',
            prompt: '종합 여행 문장 배열',
            subPrompt: '"저는 이번 휴가에 친구를 만나러 제주도에 비행기로 가요"를 완성하세요.',
            options: ['제주도에 비행기로 가요.', '친구를 만나러', '저는 이번 휴가에'],
            correctAnswer: ['저는 이번 휴가에', '친구를 만나러', '제주도에 비행기로 가요.'],
            explanation: '시간 부사구 + 목적절 + 행선지 및 수단 서술어 구조입니다.'
          },
          {
            id: 'q9-4-3',
            type: 'dictation',
            prompt: '교통카드 충전 받아쓰기',
            subPrompt: '편의점에서 교통카드를 충전할 때 쓰는 표현을 적으세요.',
            audioPrompt: '교통카드 만 원 충전해 주세요',
            koreanText: '교통카드 만 원 충전해 주세요',
            correctAnswer: '교통카드 만 원 충전해 주세요',
            explanation: '교통카드(Transit card) + 만 원(10,000 KRW) + 충전해 주세요(Please top up).'
          },
          {
            id: 'q9-4-4',
            type: 'speaking',
            prompt: '여행 설렘 표현 말하기',
            subPrompt: '한국 여행의 기대감을 활기차게 말해보세요.',
            koreanText: '한국 여행이 정말 기대돼요!',
            romanization: 'han-guk yeo-haeng-i jeong-mal gi-dae-dwae-yo!',
            englishText: "I'm really looking forward to traveling in Korea!",
            correctAnswer: '한국 여행이 정말 기대돼요!',
            explanation: '"기대돼요(I am looking forward to it)"는 자연스러운 감정 표현입니다.'
          }
        ]
      }
    ]
  },
  {
    id: 'unit-10',
    unitNumber: 10,
    title: 'Unit 10: 취미, 약속과 주말 계획',
    subtitle: '취미와 관심사 소개, 능력/가능 표현 (-(으)ㄹ 수 있다), 약속 변경과 이유 말하기',
    themeColor: 'from-indigo-500 to-violet-600',
    totalVocab: 35,
    checkpointGrammar: [
      '능력/가능: -(으)ㄹ 수 있어요 / 없어요',
      '원인/이유: -아/어서 (선약이 있어서)',
      '동사의 명사화: -는 것 (음악 듣는 것)',
      '초급 2 종합 졸업 퀘스트 (TOPIK 2급 수준 점검)'
    ],
    guidebook: {
      title: 'Unit 10 취미 & 약속 조율 심화 가이드',
      grammarPoints: [
        {
          title: '가능과 불가능: -(으)ㄹ 수 있어요 vs 없어요',
          explanation: '무언가를 할 수 있는 능력이나 상황적 가능성을 나타냅니다. 불가능할 때는 "없어요" 또는 부사 "못"을 씁니다.',
          examples: [
            { korean: '저는 매운 음식을 잘 먹을 수 있어요.', english: 'I can eat spicy food well.' },
            { korean: '내일은 약속이 있어서 갈 수 없어요 (못 가요).', english: 'I have plans tomorrow so I cannot go.' }
          ]
        },
        {
          title: '원인과 이유: -아/어서',
          explanation: '앞 문장이 뒤 문장의 이유나 원인이 될 때 씁니다. 단, 명령문(-으세요)이나 청유문(-자, -(으)ㅂ시다)에는 쓸 수 없습니다.',
          examples: [
            { korean: '날씨가 좋아서 산책을 해요.', english: 'Because the weather is nice, I take a walk.' },
            { korean: '감기에 걸려서 학교에 못 갔어요.', english: 'I could not go to school because I caught a cold.' }
          ]
        },
        {
          title: '동사를 명사로 만들기: -는 것',
          explanation: '동사 뒤에 "-는 것"을 붙이면 "~하는 행위/일"이라는 명사구로 변환되어 주어나 목적어로 쓸 수 있습니다.',
          examples: [
            { korean: '제 취미는 사진을 찍는 것이에요.', english: 'My hobby is taking photos.' },
            { korean: '한국 노래를 부르는 것을 좋아해요.', english: 'I like singing Korean songs.' }
          ]
        }
      ],
      keyVocab: [
        { korean: '취미', english: 'Hobby', pronunciation: 'chwi-mi' },
        { korean: '등산하다', english: 'To hike mountains', pronunciation: 'deung-san-ha-da' },
        { korean: '사진을 찍다', english: 'To take pictures', pronunciation: 'sa-ji-neul jjik-da' },
        { korean: '선약', english: 'Previous engagement', pronunciation: 'seon-yak' },
        { korean: '약속을 미루다', english: 'To postpone an appointment', pronunciation: 'yak-so-geul mi-ru-da' },
        { korean: '죄송하지만', english: 'I am sorry, but...', pronunciation: 'joe-song-ha-ji-man' },
        { korean: '가능하다', english: 'To be possible', pronunciation: 'ga-neung-ha-da' }
      ],
      cultureTip: '한국인들과 약속을 잡을 때는 카카오톡이나 메시지로 미리 시간과 장소를 확인하는 것이 일반적이며, 부득이하게 약속 시간을 미루거나 취소해야 할 때는 "죄송하지만 급한 사정이 생겨서..."와 같이 정중히 사유를 밝히는 것이 큰 배려입니다.'
    },
    lessons: [
      {
        id: 'lesson-10-1',
        unitId: 'unit-10',
        unitTitle: 'Unit 10: 취미, 약속과 주말 계획',
        title: '취미가 뭐예요? (관심사와 취미 활동)',
        description: '등산, 사진, 요리, 게임 등 여가 활동을 "-는 것" 명사형으로 표현합니다.',
        level: '초급 2',
        xpReward: 20,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q10-1-1',
            type: 'word-match',
            prompt: '취미 명사 매칭',
            subPrompt: '취미 표현과 뜻을 짝지으세요.',
            wordPairs: [
              { korean: '등산', english: 'Hiking / Mountain climbing' },
              { korean: '사진 촬영', english: 'Photography' },
              { korean: '악기 연주', english: 'Playing an instrument' },
              { korean: '독서', english: 'Reading books' }
            ],
            correctAnswer: 'matched',
            explanation: '취미를 묻고 답할 때 자주 등장하는 고빈도 어휘입니다.'
          },
          {
            id: 'q10-1-2',
            type: 'speaking',
            prompt: '자신의 취미 소개하기',
            subPrompt: '소리내어 취미를 멋지게 말해보세요.',
            koreanText: '제 취미는 주말에 요리하는 것이에요.',
            romanization: 'je chwi-mi-neun ju-ma-re yo-ri-ha-neun geo-si-e-yo.',
            englishText: 'My hobby is cooking on weekends.',
            correctAnswer: '제 취미는 주말에 요리하는 것이에요.',
            explanation: '요리하다 + 는 것 = 요리하는 것(cooking).'
          },
          {
            id: 'q10-1-3',
            type: 'fill-blank',
            prompt: '명사화 어미 채우기',
            subPrompt: '"듣는 것"을 알맞게 완성하세요.',
            koreanText: '저는 케이팝 음악을 [  ] 좋아해요.',
            options: ['듣는 것을', '들어서', '들으면', '듣기 전에'],
            correctAnswer: '듣는 것을',
            explanation: '좋아하는 대상을 나타내는 목적어에는 "-는 것을"을 씁니다.'
          },
          {
            id: 'q10-1-4',
            type: 'sentence-arrange',
            prompt: '주말 취미 문장 배열',
            subPrompt: '"주말마다 공원에서 자전거를 타요"를 맞추세요.',
            options: ['자전거를 타요.', '공원에서', '주말마다'],
            correctAnswer: ['주말마다', '공원에서', '자전거를 타요.'],
            explanation: '시간부사(주말마다) + 장소(공원에서) + 동작(자전거를 타요).'
          }
        ]
      },
      {
        id: 'lesson-10-2',
        unitId: 'unit-10',
        unitTitle: 'Unit 10: 취미, 약속과 주말 계획',
        title: '할 수 있어요 vs 할 수 없어요 (가능/불가능)',
        description: '자신의 능력과 언어/스포츠/요리 실력을 "-(으)ㄹ 수 있다"로 표현합니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 2,
        status: 'available',
        questions: [
          {
            id: 'q10-2-1',
            type: 'fill-blank',
            prompt: '가능 어미 채우기',
            subPrompt: '한국 요리를 할 수 있다는 문장을 완성하세요.',
            koreanText: '저는 김치찌개를 맛있게 [  ] 수 있어요.',
            options: ['만들', '만들어', '만들고', '만들면'],
            correctAnswer: '만들',
            explanation: '만들다(ㄹ 받침) + 수 있어요 = 만들 수 있어요.'
          },
          {
            id: 'q10-2-2',
            type: 'speaking',
            prompt: '한국어 구사 능력 말하기',
            subPrompt: '자신의 한국어 능력을 겸손하고 자신감 있게 말해보세요.',
            koreanText: '한국어로 간단한 대화를 할 수 있어요.',
            romanization: 'han-gu-geo-ro gan-dan-han dae-hwa-reul hal su i-sseo-yo.',
            englishText: 'I can have simple conversations in Korean.',
            correctAnswer: '한국어로 간단한 대화를 할 수 있어요.',
            explanation: '하다 + ㄹ 수 있어요 = 할 수 있어요.'
          },
          {
            id: 'q10-2-3',
            type: 'listening',
            prompt: '불가능 표현 청취',
            subPrompt: '소리를 듣고 상대방이 왜 올 수 없는지 파악하세요.',
            audioPrompt: '죄송해요, 내일 일이 너무 많아서 파티에 갈 수 없어요.',
            options: [
              '내일 일이 너무 많아서 못 간다.',
              '파티를 싫어해서 안 간다.',
              '길을 몰라서 못 간다.',
              '파티 날짜가 바뀌어서 못 간다.'
            ],
            correctAnswer: '내일 일이 너무 많아서 못 간다.',
            explanation: '"일이 너무 많아서(too much work) 갈 수 없어요(cannot go)".'
          },
          {
            id: 'q10-2-4',
            type: 'dictation',
            prompt: '수영 능력 받아쓰기',
            subPrompt: '음성을 듣고 문장을 적으세요.',
            audioPrompt: '저는 수영을 전혀 할 수 없어요',
            koreanText: '저는 수영을 전혀 할 수 없어요',
            correctAnswer: '저는 수영을 전혀 할 수 없어요',
            explanation: '전혀(Not at all) + 할 수 없어요(Cannot do).'
          }
        ]
      },
      {
        id: 'lesson-10-3',
        unitId: 'unit-10',
        unitTitle: 'Unit 10: 취미, 약속과 주말 계획',
        title: '약속 변경과 이유 말하기 (-아/어서)',
        description: '부득이한 일정 변경을 정중하게 사과하고 이유를 밝히며 대안을 제시합니다.',
        level: '초급 2',
        xpReward: 25,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q10-3-1',
            type: 'fill-blank',
            prompt: '이유 어미 채우기',
            subPrompt: '선약 때문에 약속을 미루는 문장을 완성하세요.',
            koreanText: '선약이 [  ] 약속을 다음 주로 미룰 수 있을까요?',
            options: ['있어서', '있으면', '있고', '있는데'],
            correctAnswer: '있어서',
            explanation: '원인이나 이유를 나타내는 어미는 "-아/어서"입니다.'
          },
          {
            id: 'q10-3-2',
            type: 'sentence-arrange',
            prompt: '정중한 사과 문장 배열',
            subPrompt: '"약속 시간에 늦어서 정말 죄송합니다" 순서로 맞추세요.',
            options: ['정말 죄송합니다.', '약속 시간에 늦어서'],
            correctAnswer: ['약속 시간에 늦어서', '정말 죄송합니다.'],
            explanation: '이유(약속 시간에 늦어서) + 사과(정말 죄송합니다).'
          },
          {
            id: 'q10-3-3',
            type: 'speaking',
            prompt: '약속 시간 변경 제안 말하기',
            subPrompt: '약속을 한 시간 뒤로 미룰 수 있는지 물어보세요.',
            koreanText: '혹시 한 시간 뒤에 만날 수 있을까요?',
            romanization: 'hok-si han si-gan dwi-e man-nal su i-sseul-kka-yo?',
            englishText: 'Could we possibly meet one hour later?',
            correctAnswer: '혹시 한 시간 뒤에 만날 수 있을까요?',
            explanation: '혹시(By any chance) + 만날 수 있을까요(Could we meet?).'
          },
          {
            id: 'q10-3-4',
            type: 'word-match',
            prompt: '약속 조율 단어 매칭',
            subPrompt: '약속 관련 어휘를 짝지으세요.',
            wordPairs: [
              { korean: '선약', english: 'Prior appointment / Previous engagement' },
              { korean: '미루다', english: 'To postpone / delay' },
              { korean: '취소하다', english: 'To cancel' },
              { korean: '변경하다', english: 'To change / modify' }
            ],
            correctAnswer: 'matched',
            explanation: '성인 일상 회화에서 약속을 매끄럽게 조율하는 핵심 동사들입니다.'
          }
        ]
      },
      {
        id: 'lesson-10-4',
        unitId: 'unit-10',
        unitTitle: 'Unit 10: 취미, 약속과 주말 계획',
        title: '초급 2 종합 졸업 마스터 퀘스트',
        description: '시간, 병원, 교통, 취미, 이유 설명까지 초급 전 단계를 마스터하고 TOPIK 2급 수준에 도달합니다.',
        level: '초급 2',
        xpReward: 50,
        difficulty: 3,
        status: 'available',
        questions: [
          {
            id: 'q10-4-1',
            type: 'listening',
            prompt: '초급 2 졸업 청취 종합 평가',
            subPrompt: '원어민의 주말 약속 대화를 듣고 일치하는 내용을 고르세요.',
            audioPrompt: '이번 토요일에 날씨가 좋으면 한강 공원에서 같이 치킨 먹을래요?',
            options: [
              '토요일에 한강 공원에서 치킨을 먹자고 제안하고 있다.',
              '토요일에 부산으로 여행을 가자고 제안하고 있다.',
              '약속을 다음 주로 미루자고 말하고 있다.',
              '병원에 같이 가달라고 부탁하고 있다.'
            ],
            correctAnswer: '토요일에 한강 공원에서 치킨을 먹자고 제안하고 있다.',
            explanation: '한국 청년들의 대표적인 주말 여가 문화인 한강 치맥 제안입니다.'
          },
          {
            id: 'q10-4-2',
            type: 'sentence-arrange',
            prompt: '초급 2 마스터 문장 배열',
            subPrompt: '"저는 한국어를 유창하게 해서 한국 친구들과 깊은 대화를 나누고 싶어요"를 완성하세요.',
            options: ['대화를 나누고 싶어요.', '깊은', '저는 한국어를 유창하게 해서', '한국 친구들과'],
            correctAnswer: ['저는 한국어를 유창하게 해서', '한국 친구들과', '깊은', '대화를 나누고 싶어요.'],
            explanation: '한국어 학습자의 최고 목표를 담은 자연스러운 복합 문장입니다.'
          },
          {
            id: 'q10-4-3',
            type: 'word-match',
            prompt: '초급 2 최고 핵심 단어 매칭',
            subPrompt: '단어와 뜻을 최종 연결하세요.',
            wordPairs: [
              { korean: '유창하다', english: 'Fluent' },
              { korean: '성공하다', english: 'To succeed' },
              { korean: '도전하다', english: 'To take on a challenge' },
              { korean: '자랑스럽다', english: 'To be proud' }
            ],
            correctAnswer: 'matched',
            explanation: '초급 2 과정을 졸업하는 학습자를 위한 영예로운 성취 단어들입니다.'
          },
          {
            id: 'q10-4-4',
            type: 'dictation',
            prompt: '초급 2 졸업 최종 받아쓰기',
            subPrompt: '마지막 격려 문장을 듣고 자신 있게 적으세요.',
            audioPrompt: '당신은 이미 훌륭한 한국어 구사자입니다',
            koreanText: '당신은 이미 훌륭한 한국어 구사자입니다',
            correctAnswer: '당신은 이미 훌륭한 한국어 구사자입니다',
            explanation: '축하합니다! 총 10개 유닛, 40개 레슨의 K-Lingo 커리큘럼을 모두 마스터하셨습니다!'
          }
        ]
      }
    ]
  }
];

export const INITIAL_USER_STATE: UserState = {
  userId: 'user_kor_8921',
  name: 'Alex Kim',
  avatar: '🐯',
  streakCount: 7,
  streakFreezeCount: 2,
  isStreakActiveToday: false,
  hearts: 5,
  maxHearts: 5,
  gems: 480,
  xpTotal: 1240,
  todayXp: 45,
  dailyGoalXp: 50,
  league: '골드',
  leagueRank: 4,
  topikLevelForecast: {
    level: 'TOPIK I (1급)',
    score: 84,
    passProbability: 92
  },
  completedLessonIds: []
};

export const INITIAL_SRS_ITEMS: SrsItem[] = [
  {
    id: 'srs-1',
    word: '안녕하세요',
    meaning: 'Hello / Good day',
    partOfSpeech: '인사말',
    romanization: 'an-nyeong-ha-se-yo',
    stability: 18.4,
    difficulty: 2.1,
    retrievability: 0.94,
    reps: 6,
    lapses: 0,
    lastReviewDate: '2026-09-02',
    nextReviewDate: '2026-09-20',
    halfLifeDays: 18.4
  },
  {
    id: 'srs-2',
    word: '감사합니다',
    meaning: 'Thank you (formal)',
    partOfSpeech: '인사말',
    romanization: 'gam-sa-ham-ni-da',
    stability: 12.0,
    difficulty: 3.2,
    retrievability: 0.88,
    reps: 5,
    lapses: 0,
    lastReviewDate: '2026-09-01',
    nextReviewDate: '2026-09-13',
    halfLifeDays: 12.0
  },
  {
    id: 'srs-3',
    word: '은 / 는 (조사)',
    meaning: 'Topic marker particles',
    partOfSpeech: '조사',
    romanization: 'eun / neun',
    stability: 3.2,
    difficulty: 7.8,
    retrievability: 0.62, // Due for review!
    reps: 4,
    lapses: 2,
    lastReviewDate: '2026-09-01',
    nextReviewDate: '2026-09-04',
    halfLifeDays: 3.2
  },
  {
    id: 'srs-4',
    word: '이 / 가 (조사)',
    meaning: 'Subject marker particles',
    partOfSpeech: '조사',
    romanization: 'i / ga',
    stability: 2.8,
    difficulty: 8.2,
    retrievability: 0.58, // Urgent review!
    reps: 4,
    lapses: 3,
    lastReviewDate: '2026-09-01',
    nextReviewDate: '2026-09-03',
    halfLifeDays: 2.8
  },
  {
    id: 'srs-5',
    word: '물',
    meaning: 'Water',
    partOfSpeech: '명사',
    romanization: 'mul',
    stability: 24.5,
    difficulty: 1.5,
    retrievability: 0.98,
    reps: 8,
    lapses: 0,
    lastReviewDate: '2026-08-28',
    nextReviewDate: '2026-09-22',
    halfLifeDays: 24.5
  },
  {
    id: 'srs-6',
    word: '-아/어요 (활용)',
    meaning: 'Polite present tense ending',
    partOfSpeech: '어미',
    romanization: '-a/eo-yo',
    stability: 4.1,
    difficulty: 6.9,
    retrievability: 0.69,
    reps: 3,
    lapses: 1,
    lastReviewDate: '2026-08-31',
    nextReviewDate: '2026-09-04',
    halfLifeDays: 4.1
  },
  {
    id: 'srs-7',
    word: '얼마예요?',
    meaning: 'How much is it?',
    partOfSpeech: '회화 표현',
    romanization: 'eol-ma-ye-yo?',
    stability: 6.5,
    difficulty: 4.2,
    retrievability: 0.72,
    reps: 4,
    lapses: 1,
    lastReviewDate: '2026-09-01',
    nextReviewDate: '2026-09-07',
    halfLifeDays: 6.5
  },
  {
    id: 'srs-8',
    word: '화장실',
    meaning: 'Restroom / Bathroom',
    partOfSpeech: '명사',
    romanization: 'hwa-jang-sil',
    stability: 15.2,
    difficulty: 2.5,
    retrievability: 0.91,
    reps: 5,
    lapses: 0,
    lastReviewDate: '2026-08-29',
    nextReviewDate: '2026-09-14',
    halfLifeDays: 15.2
  },
  {
    id: 'srs-9',
    word: '대박!',
    meaning: 'Awesome! / Jackpot!',
    partOfSpeech: '감탄사',
    romanization: 'dae-bak!',
    stability: 8.8,
    difficulty: 2.0,
    retrievability: 0.85,
    reps: 4,
    lapses: 0,
    lastReviewDate: '2026-08-30',
    nextReviewDate: '2026-09-10',
    halfLifeDays: 8.8
  },
  {
    id: 'srs-10',
    word: '주세요',
    meaning: 'Please give me',
    partOfSpeech: '어미/동사',
    romanization: 'ju-se-yo',
    stability: 16.0,
    difficulty: 2.3,
    retrievability: 0.92,
    reps: 6,
    lapses: 0,
    lastReviewDate: '2026-09-02',
    nextReviewDate: '2026-09-18',
    halfLifeDays: 16.0
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  { id: 'u-1', name: 'Min-ji Park', avatar: '🦊', xp: 1850, rank: 1, change: 'same' },
  { id: 'u-2', name: 'Liam Chen', avatar: '🐼', xp: 1640, rank: 2, change: 'up' },
  { id: 'u-3', name: 'Sophia Miller', avatar: '🐱', xp: 1420, rank: 3, change: 'down' },
  { id: 'current-user', name: 'Alex Kim (나)', avatar: '🐯', xp: 1240, rank: 4, isCurrentUser: true, change: 'up' },
  { id: 'u-5', name: 'Kenji Sato', avatar: '🐻', xp: 1110, rank: 5, change: 'down' },
  { id: 'u-6', name: 'Emma Wilson', avatar: '🐰', xp: 980, rank: 6, change: 'same' },
  { id: 'u-7', name: 'Carlos Gomez', avatar: '🦁', xp: 820, rank: 7, change: 'down' },
  { id: 'u-8', name: 'Aisha Rahman', avatar: '🐨', xp: 750, rank: 8, change: 'same' },
  { id: 'u-9', name: 'Lucas Martin', avatar: '🐸', xp: 620, rank: 9, change: 'down' },
  { id: 'u-10', name: 'Yuki Tanaka', avatar: '🦉', xp: 510, rank: 10, change: 'same' }
];
