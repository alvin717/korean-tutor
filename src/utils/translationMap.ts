/**
 * Dictionary mapping Korean lesson titles, unit titles, and common UI terms
 * to their accurate English counterparts for hover translation.
 */
export const LESSON_TRANSLATIONS: Record<string, string> = {
  // Unit 1: 한글 자모와 기초 발음
  '기본 모음과 첫 단어': 'Basic Vowels & First Words',
  '기본 자음과 음절 결합': 'Basic Consonants & Syllable Building',
  '받침과 7종성법': 'Final Consonants (Batchim) & 7 Rules',
  '음운 변동: 연음 법칙': 'Sound Changes: Liaison & Linking Rules',
  'Unit 1 체크포인트: 한글 마스터 퀘스트': 'Unit 1 Checkpoint: Hangul Master Quest',
  '기본 자음 (ㄱ, ㄴ, ㄷ, ㄹ)': 'Basic Consonants (g, n, d, r)',
  '받침(종성) 소리 규칙': 'Final Consonants (Batchim) Rules',
  '첫인사와 자기소개': 'Greetings & Self-Introduction',

  // Unit 2: 인사말 및 자기소개
  '첫 만남과 일상 인사': 'First Meetings & Daily Greetings',
  '국적과 신분 말하기': 'Stating Nationality & Occupation',
  '이름과 안부 묻고 답하기': 'Asking Names & How You Are Doing',
  'Unit 2 체크포인트: 실전 자기소개 퀘스트': 'Unit 2 Checkpoint: Self-Introduction Quest',
  '이것은 무엇입니까? (사물 이름)': 'What is this? (Objects & Things)',
  '식당에서 음식 주문하기 (-주세요)': 'Ordering Food at a Restaurant (-Juseyo)',
  '숫자와 가격 계산하기 (얼마예요?)': 'Numbers & Asking Prices (How much is it?)',
  '초급 필수 동사 (가다, 오다, 먹다)': 'Essential Verbs (Go, Come, Eat)',

  // Unit 3: 카페와 식당에서 주문하기
  '커피 한 잔 주세요': 'One Coffee, Please (-Juseyo)',
  '한국 식당에서 음식 시키기': 'Ordering Food in Korean Restaurants',
  '맛과 맵기 취향 표현하기': 'Expressing Taste & Spice Preferences',
  'Unit 3 체크포인트: K-푸드 주문 마스터': 'Unit 3 Checkpoint: K-Food Ordering Master',
  '지금 뭐 해요? (-아/어요 현재형)': 'What are you doing now? (Present Tense)',
  '어디에 가요? (장소와 이동 -에 가다)': 'Where are you going? (Places & Movement)',
  '주말에 뭐 했어요? (-았/었어요 과거형)': 'What did you do on weekend? (Past Tense)',
  '한국의 사계절과 날씨 표현': 'Korea’s 4 Seasons & Weather',

  // Unit 4: 숫자, 시간, 날짜와 쇼핑
  '한자어 수사와 가격 묻기': 'Sino-Korean Numbers & Asking Prices',
  '고유어 수사와 시간 말하기': 'Native Korean Numbers & Telling Time',
  '쇼핑과 물건 고르기': 'Shopping & Choosing Items',
  'Unit 4 체크포인트: 쇼핑 & 시간 약속 마스터': 'Unit 4 Checkpoint: Shopping & Appointments Master',
  '가족과 친구 소개하기': 'Introducing Family & Friends',
  '길 찾기와 방향 (-로 가세요)': 'Asking for Directions (-Go this way)',
  '주말 약속 잡기 (-(으)ㄹ래요?)': 'Making Weekend Plans (Shall we...?)',
  '초급 1 종합 복습 & 체크포인트': 'Beginner 1 Final Review & Checkpoint',

  // Unit 5: 위치, 방향과 길 찾기
  '위치와 공간 표현하기': 'Expressing Locations & Positions',
  '길 묻기와 방향 안내': 'Asking Directions & Guidance',
  '대중교통 이용하기': 'Using Public Transportation',
  'Unit 5 체크포인트: 서울 탐방 길 찾기 퀘스트': 'Unit 5 Checkpoint: Seoul Exploration Quest',
  '쇼핑하기 (색상, 치수와 단위명사)': 'Shopping (Colors, Sizes & Counters)',
  '취미와 여가 생활': 'Hobbies & Leisure Activities',
  '전화 통화와 약속 확인': 'Phone Calls & Confirming Plans',
  'Unit 5 마스터 챌린지': 'Unit 5 Master Challenge',

  // Unit 6: K-컬처 & 일상 리액션 회화
  '취미와 좋아하는 것 말하기': 'Talking About Hobbies & Likes',
  '한국인의 실전 감탄사와 리액션': 'Authentic Korean Exclamations & Reactions',
  '주말 약속과 함께하기 제안': 'Making Weekend Plans & Invitations',
  'Unit 6 & 초급 1 총괄 졸업 퀘스트': 'Unit 6 & Beginner 1 Final Graduation Quest',
  '감정과 기분 표현하기': 'Expressing Emotions & Feelings',
  '집과 방 묘사하기': 'Describing Houses & Rooms',
  '미래 계획과 희망 (-고 싶어요)': 'Future Plans & Wishes (-I want to)',
  '초급 1 졸업 최종 마스터 퀘스트': 'Beginner 1 Graduation Final Quest',

  // Unit 7: 하루 일과와 시간/날짜
  '지금 몇 시예요? (시간 묻고 답하기)': 'What time is it now? (Telling Time)',
  '아침부터 밤까지 (하루 루틴)': 'From Morning to Night (Daily Routine)',
  '행동의 순서 (-기 전에 / -(으)ㄴ 후에)': 'Sequence of Actions (Before / After)',
  'Unit 7 복습 & 타임테이블 챌린지': 'Unit 7 Review & Timetable Challenge',

  // Unit 8: 병원, 약국 & 건강 증상
  '어디가 아프세요? (신체 부위와 증상)': 'Where does it hurt? (Body & Symptoms)',
  '약국에서 약 사기 (복약 지도)': 'Pharmacy Visit (Taking Medicine)',
  '의무와 금지 (-아야 돼요 / -면 안 돼요)': 'Obligations & Prohibitions (Must / Must Not)',
  'Unit 8 헬스케어 종합 마스터': 'Unit 8 Healthcare Master Review',

  // Unit 9: 대중교통과 국내 여행
  '지하철 환승과 출구 찾기': 'Subway Transfers & Finding Exits',
  '버스와 택시 이용하기': 'Taking Buses & Taxis',
  'KTX 타고 부산 여행 (목적: -(으)러 가다)': 'KTX Trip to Busan (Purpose: In order to)',
  'Unit 9 전국 여행 퀘스트': 'Unit 9 Nationwide Travel Quest',

  // Unit 10: 취미, 약속과 주말 계획
  '취미가 뭐예요? (관심사와 취미 활동)': 'What is your hobby? (Interests)',
  '할 수 있어요 vs 할 수 없어요 (가능/불가능)': 'I can vs I cannot (Ability & Possibility)',
  '약속 변경과 이유 말하기 (-아/어서)': 'Rescheduling Plans & Stating Reasons',
  '초급 2 종합 졸업 마스터 퀘스트': 'Beginner 2 Graduation Final Master Quest',

  // Speed drill
  '랜덤 스피드 챌린지 5문항': 'Random 5-Question Speed Challenge',
};

export const UNIT_TRANSLATIONS: Record<string, string> = {
  // Current 10 Units in curriculumData
  'Unit 1: 한글 자모와 기초 발음': 'Unit 1: Hangul Vowels & Basic Pronunciation',
  'Unit 2: 인사말 및 자기소개': 'Unit 2: Greetings & Self-Introduction',
  'Unit 3: 카페와 식당에서 주문하기': 'Unit 3: Ordering at Cafes & Restaurants',
  'Unit 4: 숫자, 시간, 날짜와 쇼핑': 'Unit 4: Numbers, Time, Dates & Shopping',
  'Unit 5: 위치, 방향과 길 찾기': 'Unit 5: Locations, Directions & Finding Ways',
  'Unit 6: K-컬처 & 일상 리액션 회화': 'Unit 6: K-Culture & Daily Conversational Reactions',
  'Unit 7: 하루 일과와 시간/날짜': 'Unit 7: Daily Routine, Time & Dates',
  'Unit 8: 병원, 약국 & 건강 증상': 'Unit 8: Hospital, Pharmacy & Health Symptoms',
  'Unit 9: 대중교통과 국내 여행': 'Unit 9: Public Transit & Korea Travel',
  'Unit 10: 취미, 약속과 주말 계획': 'Unit 10: Hobbies, Plans & Weekend Activities',

  // Alternative titles
  'Unit 1: 한글 자모와 발음 기초': 'Unit 1: Hangul Alphabet & Pronunciation',
  'Unit 2: 일상 표현과 기본 회화': 'Unit 2: Daily Expressions & Greetings',
  'Unit 3: 시간, 장소 & 기본 시제': 'Unit 3: Time, Places & Basic Tenses',
  'Unit 4: 인간관계 & 실전 생활 회화': 'Unit 4: Relationships & Practical Dialogue',
  'Unit 5: 쇼핑, 취미 & 여가 생활': 'Unit 5: Shopping, Hobbies & Leisure',
  'Unit 6: 감정, 묘사 & 초급 1 졸업': 'Unit 6: Emotions, Descriptions & Beginner 1',
};

export function getLessonTitleEn(title: string): string {
  if (LESSON_TRANSLATIONS[title]) return LESSON_TRANSLATIONS[title];
  // fallback simple translation or cleaned title
  return title.replace(/Unit \d+/, '').trim() || 'Lesson Quiz';
}

export function getUnitTitleEn(title: string): string {
  return UNIT_TRANSLATIONS[title] || title;
}
