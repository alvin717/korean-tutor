export interface ArchitectureDoc {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
}

export const ARCHITECTURE_SPEC = {
  overview: {
    title: 'K-Lingo 전체 앱 아키텍처 및 시스템 청사진',
    summary: 'Duolingo의 Birdbrain AI 엔진과 적응형 학습 모델을 벤치마킹하여, 초급-중급 외국인을 위한 한국어 특화 모바일/웹 크로스 플랫폼 아키텍처를 정의합니다.',
    layers: [
      {
        name: 'Client Layer (크로스 플랫폼 모바일)',
        tech: 'React Native / Flutter + TypeScript, Zustand (상태 관리), WatermelonDB / SQLite (오프라인 캐시), Web Audio & Speech Engine',
        description: '오프라인 우선(Offline-first) 동기화, 제스처 기반 인터랙티브 UI, 60fps 애니메이션 및 네이티브 TTS/STT 오디오 파이프라인 처리'
      },
      {
        name: 'API Gateway & Edge Layer',
        tech: 'Kong Gateway / AWS API Gateway + Cloudflare CDN (Edge SSL & WAF)',
        description: '글로벌 엔드포인트 라우팅, Rate Limiting, JWT 인증 인가, 전 세계 엣지 캐싱 및 WebSocket 영구 연결 관리'
      },
      {
        name: 'Core Application Services (마이크로서비스)',
        tech: 'Node.js (NestJS) & Go (고성능 세션/리더보드), gRPC 내부 통신',
        description: '인증/유저 서비스, 커리큘럼 엔진, 학습 세션 진행 관리, 주간 리그 리더보드 및 상점/인앱결제 트랜잭션'
      },
      {
        name: 'Adaptive AI & ML Engine (Birdbrain AI & SRS)',
        tech: 'Python (FastAPI) + PyTorch, Celery Worker, Redis Queue, ONNX Runtime',
        description: 'IR (Item Response Theory) 기반 문제 난이도 실시간 조정, HLR(Half-Life Regression) & FSRS 간격 반복 스케줄러, Multi-Armed Bandit(MAB) 푸시 알림 타이밍 최적화'
      },
      {
        name: 'Voice & Speech Intelligence',
        tech: 'Google Cloud STT (한국어 특화 모델) + Whisper API, Azure Speech SDK, Praat 기반 음소 레벨 발음 정확도 채점',
        description: '받침 연음, 경음화, 비음화 등 한국어 음운 변동 규칙 검증 엔진'
      },
      {
        name: 'Database & Persistence Layer',
        tech: 'PostgreSQL 16 (Relational Primary) + Citus (수평 샤딩), Redis Cluster (세션/ZSet 랭킹), Amazon S3 (오디오 에셋)',
        description: 'ACID 트랜잭션, 읽기 분산 Read Replica, 사용자 ID 기반 분할 파티셔닝'
      }
    ]
  },
  mvpPriorities: [
    {
      tier: 'P0 (Must Have - MVP 1차 론칭)',
      timeline: '1~6주차',
      items: [
        { name: '한글 자모 & 초급 1 커리큘럼 (3개 유닛, 15개 레슨)', desc: '자모 결합, 기초 인사, 카페 주문 인터랙티브 레슨' },
        { name: '핵심 6종 퀴즈 인터랙션', desc: '단어 매칭, 듣기, 발음 말하기, 문장 배열, 빈칸 채우기, 받아쓰기' },
        { name: '연속 학습(Streak) & 하트(Hearts) 시스템', desc: '매일 자정 리셋 판정, 5개 하트 소모 및 시간 경과 충전' },
        { name: '기본 SRS 간격 반복 엔진 (FSRS 경량 버전)', desc: '단어별 망각 확률 계산 및 매일 5분 복습 큐 제공' },
        { name: '게스트 모드 & 소셜 로그인 (Google / Apple)', desc: '진입 장벽을 최소화한 원클릭 온보딩' }
      ]
    },
    {
      tier: 'P1 (Should Have - MVP 고도화)',
      timeline: '7~10주차',
      items: [
        { name: '주간 리그(Leaderboard) 시스템', desc: '30인 단위 리그 배정, 상위 10인 승격, 하위 5인 강등' },
        { name: '인앱 상점 & 손실 회피 아이템', desc: 'Streak Freeze(스트릭 동결권), 하트 즉시 충전, 더블 XP 부스트' },
        { name: '규칙 기반 푸시 알림 (Streak Alert)', desc: '학습 마감 3시간 전 리마인더 및 주간 성취 리포트' },
        { name: '오프라인 레슨 다운로드', desc: '비행기/지하철 모드에서도 1개 유닛 오프라인 완료 후 동기화' }
      ]
    },
    {
      tier: 'P2 (Could Have - 2차 릴리즈)',
      timeline: '11~14주차',
      items: [
        { name: 'Multi-Armed Bandit 알림 개인화', desc: '클릭률/학습 전환율에 따른 발송 시간대 및 카피 최적화' },
        { name: 'TOPIK 급수 예측 및 약점 분석 리포트', desc: '조사/시제/어휘별 오답률 히트맵 분석' },
        { name: '친구 퀘스트 및 실시간 대결', desc: '친구와 함께하는 주간 목표 달성' }
      ]
    },
    {
      tier: 'P3 (Won\'t Have for MVP)',
      timeline: '차기 로드맵',
      items: [
        { name: '생성형 AI 프리토킹 챗봇 (Duolingo Max 롤플레이)', desc: 'LLM 기반 실시간 상황별 한국어 대화' },
        { name: '다국어 원어민 커뮤니티 & 문장 첨삭 기능', desc: 'P2P 소셜 피드백 기능' }
      ]
    }
  ],
  curriculumUnit1: {
    unitName: 'Unit 1: 한글 자모 및 기초 발음 (The Korean Alphabet & Phonology)',
    targetLevel: 'CEFR A1 / TOPIK 1급 준비반',
    learningObjectives: [
      '한글의 창제 원리(천지인 삼재, 발음 기관 상형)의 직관적 이해',
      '기본 모음 10자, 기본 자음 14자 완벽 식별 및 발음',
      '초성 + 중성 + 종성(받침 7대표음) 음절 결합 메커니즘 체득',
      '한국어의 핵심 연음 법칙 및 자음 동화 초급 현상 습득'
    ],
    lessonsBreakdown: [
      {
        lessonNum: 'Lesson 1',
        title: '기본 모음 6자 (ㅏ, ㅓ, ㅗ, ㅜ, ㅡ, ㅣ)',
        coreWords: ['아이 (Child)', '오이 (Cucumber)', '우유 (Milk)', '이 (Teeth/Two)'],
        grammar: '모음 단독 음절의 경우 무음의 자음 \'ㅇ\'을 초성에 배치 (예: ㅏ -> 아)',
        typesCovered: ['단어 매칭', '원어민 소리 듣기', '발음 말하기']
      },
      {
        lessonNum: 'Lesson 2',
        title: '기본 자음 (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅅ, ㅇ)',
        coreWords: ['나무 (Tree)', '다리 (Leg/Bridge)', '모자 (Hat)', '바지 (Pants)'],
        grammar: '초성 자음과 모음의 결합 (가, 나, 다, 라...), 로마자 전사 표기의 한계와 실전 청취',
        typesCovered: ['문장/음절 배열', '빈칸 채우기', '발음 녹음']
      },
      {
        lessonNum: 'Lesson 3',
        title: '기본 받침과 7종성법 (ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ)',
        coreWords: ['물 (Water)', '밥 (Rice/Meal)', '책 (Book)', '집 (House)', '달 (Moon)'],
        grammar: '모음 아래에 붙는 받침(종성). 영어와 달리 받침 발음은 파열되지 않고 닫히는 비파열음(Unreleased stop)',
        typesCovered: ['단어 매칭', '받아쓰기', '듣기 퀴즈']
      },
      {
        lessonNum: 'Lesson 4',
        title: '음운 변동의 첫걸음: 연음 법칙 (Liaison)',
        coreWords: ['한국어 [한구거]', '음악 [으막]', '집에 [지베]', '물이 [무레]'],
        grammar: '받침 뒤에 모음으로 시작하는 음절이 오면 받침이 다음 음절의 초성으로 이동하여 발음됨',
        typesCovered: ['듣고 고르기', '받아쓰기 (표기와 발음의 차이 구분)']
      },
      {
        lessonNum: 'Lesson 5 (체크포인트 퀘스트)',
        title: 'Unit 1 종합 진단 테스트 & 실전 미니 대화',
        coreWords: ['누구 (Who)', '어디 (Where)', '이것 (This)', '한국 (Korea)'],
        grammar: '단어 조합 및 음절 구성 종합 평가 (80% 이상 득점 시 Unit 2 잠금 해제)',
        typesCovered: ['전체 6종 혼합 평가']
      }
    ]
  },
  srsAlgorithm: {
    title: '적응형 간격 반복 알고리즘 (FSRS v4 & Duolingo HLR)',
    hlrFormula: 'p = 2^(-Δt / h)  (p: 회상 확률, Δt: 경과 시간, h: 단어의 반감기 Half-life)',
    fsrsSummary: 'Free Spaced Repetition Scheduler(FSRS)는 DSR 모델(Difficulty, Stability, Retrievability)을 기반으로 하며, Anki 및 Duolingo의 HLR보다 20% 이상 높은 기억 예측 정확도를 보입니다.',
    variables: [
      { symbol: 'S (Stability)', desc: '기억 안정성 (회상 확률이 90%로 떨어지기까지 걸리는 일수)' },
      { symbol: 'D (Difficulty)', desc: '항목 고유 난이도 (1.0 쉬움 ~ 10.0 극난도)' },
      { symbol: 'R (Retrievability)', desc: '현재 시점의 기억 회상 확률 (R = (1 + Factor * t / S)^(-w))' },
      { symbol: 'G (Grade)', desc: '학습자 응답 등급 (1: Fail, 2: Hard, 3: Good, 4: Easy)' }
    ],
    pseudocode: `
# ==============================================================================
# K-Lingo Adaptive Spaced Repetition Engine (FSRS v4 / HLR Hybrid)
# ==============================================================================

class MemoryItem:
    def __init__(self, word_id: str, initial_difficulty: float = 5.0):
        self.word_id = word_id
        self.stability = 0.4      # 초기 안정성 (0.4일)
        self.difficulty = initial_difficulty  # 기본 난이도 (1.0 ~ 10.0)
        self.reps = 0             # 복습 횟수
        self.lapses = 0           # 망각(오답) 횟수
        self.last_review = None   # 마지막 복습 일시

class SpacedRepetitionEngine:
    # FSRS 최적화 가중치 파라미터 W (Duolingo & FSRS 벤치마크 기반)
    W = [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61]

    def calculate_retrievability(self, item: MemoryItem, current_time: datetime) -> float:
        """현재 시점에서 사용자가 이 항목을 기억하고 있을 확률 R(t) 계산"""
        if item.last_review is None:
            return 0.0
        elapsed_days = (current_time - item.last_review).total_seconds() / 86400.0
        # FSRS Power Law 기억 감쇠 공식
        R = (1.0 + 0.19 * (elapsed_days / item.stability)) ** (-0.5)
        return max(0.0, min(1.0, R))

    def update_item_after_review(self, item: MemoryItem, grade: int, current_time: datetime) -> dict:
        """
        grade:
          1: Again/Fail (오답 - 하트 차감)
          2: Hard (겨우 맞춤/힌트 사용)
          3: Good (정상 정답)
          4: Easy (망설임 없이 즉각 정답)
        """
        R_prior = self.calculate_retrievability(item, current_time)
        item.reps += 1

        # 1. 난이도(Difficulty) 업데이트 (평균 회귀 포함)
        delta_D = -self.W[6] * (grade - 3)
        new_D = item.difficulty + delta_D
        # Mean reversion (기본 난이도로 서서히 수렴)
        item.difficulty = self.W[7] * 5.0 + (1.0 - self.W[7]) * min(max(new_D, 1.0), 10.0)

        # 2. 안정성(Stability) 업데이트
        if grade == 1:
            # 망각 발생 (Lapse) -> 안정성 급락
            item.lapses += 1
            new_S = self.W[11] * (item.difficulty ** -self.W[12]) * ((item.stability + 1) ** self.W[13]) * math.exp((1 - R_prior) * self.W[14])
            item.stability = max(0.1, new_S)
        else:
            # 성공적 회상 -> 간격 증폭
            hard_penalty = self.W[15] if grade == 2 else 1.0
            easy_bonus = self.W[16] if grade == 4 else 1.0
            factor = math.exp(self.W[8]) * (11 - item.difficulty) * (item.stability ** -self.W[9]) * (math.exp((1 - R_prior) * self.W[10]) - 1) * hard_penalty * easy_bonus
            item.stability = item.stability * (1.0 + factor)

        item.last_review = current_time
        
        # 3. 목표 기억 유지율(Desired Retention = 90%) 기준 다음 복습 주기(일) 산출
        target_retention = 0.90
        next_interval_days = item.stability * ((target_retention ** -2.0) - 1.0) / 0.19
        next_review_date = current_time + timedelta(days=max(1, round(next_interval_days)))

        return {
            "word_id": item.word_id,
            "new_stability": round(item.stability, 2),
            "new_difficulty": round(item.difficulty, 2),
            "next_interval_days": max(1, round(next_interval_days)),
            "next_review_date": next_review_date.isoformat()
        }
`
  },
  gamification: {
    title: '게임화(Gamification) 시스템의 심리학적 기제 & 구현 전략',
    principles: [
      {
        psychTitle: '손실 회피 (Loss Aversion - Kahneman & Tversky)',
        concept: '인간은 100달러를 얻는 기쁨보다 100달러를 잃는 고통을 약 2.5배 더 강하게 느낍니다.',
        appFeature: '연속 학습(Streak) & 스트릭 동결권(Streak Freeze)',
        strategy: '연속 일수가 길어질수록(예: 30일, 100일) 사용자는 이를 잃지 않기 위해 매일 5분 학습을 무조건 수행합니다. 실수로 하루를 놓쳤을 때 좌절하여 이탈하지 않도록 유료/젬 아이템 "Streak Freeze"를 제공하여 높은 수익화와 리텐션을 동시에 확보합니다.'
      },
      {
        psychTitle: '가변 비율 강화 스케줄 (Variable Ratio Reinforcement - B.F. Skinner)',
        concept: '예측 불가능한 타이밍과 크기로 보상이 주어질 때 중독 수준의 행동 지속성이 발현됩니다.',
        appFeature: '랜덤 데일리 체스트(Daily Chest) & 서프라이즈 젬 부스터',
        strategy: '레슨 완료 시 고정된 10 XP 외에, 5% 확률의 "슈퍼 젬 체스트", 3일 연속 달성 시 "15분 2배 XP 부스트"를 무작위로 지급하여 슬롯머신과 같은 도파민 보상 회로를 자극합니다.'
      },
      {
        psychTitle: '사회적 비교 이론 & 서바이벌 본능 (Social Comparison - Leon Festinger)',
        concept: '동질 집단과의 순위 비교는 자기 평가와 승부욕을 극대화합니다.',
        appFeature: '30인 주간 리그(Weekly League) & 강등 구역(Demotion Zone)',
        strategy: '매주 월요일 무작위 30명이 브론즈-실버-골드-흑요석 리그로 묶입니다. 상위 10위는 승격의 영예를, 하위 5위는 강등의 위기감을 부여하며, 일요일 마감 직전 역전 경쟁(Sniping)을 유도합니다.'
      },
      {
        psychTitle: '목표 구배 효과 (Goal Gradient Effect - Clark Hull)',
        concept: '결승선이 가까워질수록 목표를 향해 가속도가 붙습니다.',
        appFeature: '레슨 프로그레스 바 & 일일 목표 링(Daily Goal Ring)',
        strategy: '레슨 진행 중 남은 문제 수를 시각적 게이지로 표시하고, 80% 이상 진행 시 호돌이 캐릭터가 "거의 다 왔어요!" 애니메이션으로 응원하여 완료율(Completion rate)을 94%까지 견인합니다.'
      }
    ],
    octalysisFramework: [
      { coreDrive: '1. 서사적 의미 (Epic Meaning)', design: '"한국 드라마와 K-POP을 자막 없이 이해하는 글로벌 메이트" 여정' },
      { coreDrive: '2. 진보와 성취 (Development)', design: '초급 1~3 레벨 뱃지, TOPIK 1급 달성 증명서 발급' },
      { coreDrive: '3. 창의력과 피드백 (Empowerment)', design: '다양한 조합의 문장 만들기, 실시간 발음 시각화 피드백' },
      { coreDrive: '4. 소유권과 보유 (Ownership)', design: '젬으로 구매하는 아바타 한복 코스튬, 나만의 단어장' },
      { coreDrive: '5. 사회적 영향력 (Social Influence)', design: '친구 퀘스트 공조, 친구의 30일 스트릭 축하 하이파이브' },
      { coreDrive: '6. 희소성과 조바심 (Scarcity)', design: '하트 5개 제한(체력 시스템), 자정 마감 스트릭 위험 카운트다운' },
      { coreDrive: '7. 호기심과 불확실성 (Unpredictability)', design: '미스터리 상자, 깜짝 보너스 레벨, 랜덤 퀴즈' },
      { coreDrive: '8. 손실과 회피 (Loss & Avoidance)', design: '스트릭 리셋 경고 푸시 알림, 리그 강등권 탈출 경보' }
    ]
  },
  globalScaling: {
    title: '다국어 확장(i18n) 및 글로벌 분산 데이터베이스 최적화',
    strategies: [
      {
        topic: '1. 다국어(i18n) 아키텍처 & 커리큘럼 카탈로그 분리',
        details: [
          'UI 다국어와 교육 콘텐츠(Curriculum)를 엄격히 분리 설계.',
          '클라이언트 UI: react-i18next / rosetta를 활용한 정적 언어 번들 (English, Japanese, Chinese, Vietnamese, Spanish 등 12개 언어).',
          '교육 카탈로그 DB: [Master Question] -> [Localized Explanation & Options] 1:N 관계 구성. 학습자의 모국어(Base Language)에 맞춰 쿼리하거나 CDN 엣지에서 프리렌더링된 JSON 번들로 서빙.'
        ]
      },
      {
        topic: '2. PostgreSQL 샤딩 및 파티셔닝 전략',
        details: [
          'UserProgress 및 SpacedRepetition 테이블은 사용자 수에 비례하여 수억 건 단위로 팽창.',
          '전략: user_id의 해시 값을 기준으로 파티셔닝 (Hash Partitioning by user_id % 64).',
          '로그/히스토리성 완료 기록은 날짜별(Range Partitioning by completed_at YYYY-MM)로 분할하여 콜드 데이터는 Amazon S3 / BigQuery로 아카이빙.'
        ]
      },
      {
        topic: '3. Redis Cluster를 활용한 실시간 초고속 리더보드',
        details: [
          'RDBMS로 30인 리그 및 전 세계 랭킹을 실시간 집계하면 DB 부하로 서비스 장애 발생.',
          '해법: Redis Sorted Set(ZSET) 자료구조 활용.',
          '명령어: ZINCRBY league:gold:room_492 15 "user_8921" (O(log(N)) 극저지연 연산).',
          '상위 랭킹 조회: ZREVRANGEBYSCORE 및 ZREVRANK로 즉시 순위 및 점수 반환.'
        ]
      },
      {
        topic: '4. 글로벌 멀티 리전 지연시간(Latency) 최소화',
        details: [
          '미국, 일본, 동남아, 유럽 등 글로벌 유저를 위해 AWS Aurora Global Database 또는 Cloud Spanner 멀티 리전 배치.',
          '원어민 오디오 음성(MP3/Opus) 및 일러스트 에셋은 CloudFront / Cloudflare Edge CDN에 영구 캐시(Cache-Control: max-age=31536000).',
          '오프라인 우선(Offline-First) 동기화: 지하철/통신 음영 지역에서 로컬 SQLite에 학습 기록을 저장 후, 온라인 복구 시 배치(Batch) API로 멱등성(Idempotency Key) 보장 동기화.'
        ]
      }
    ]
  }
};
