import { CountryInfo, ExchangeScene, NativeCountry } from '../types';

export const SUPPORTED_COUNTRIES: CountryInfo[] = [
  {
    code: 'US',
    nameKo: '미국 (영어)',
    nameNative: 'United States (English)',
    flag: '🇺🇸',
    languageName: 'English',
    langCode: 'en-US',
    partnerName: 'Chris',
    partnerCity: 'New York',
    partnerAvatar: '🗽'
  },
  {
    code: 'JP',
    nameKo: '일본 (일본어)',
    nameNative: '日本 (日本語)',
    flag: '🇯🇵',
    languageName: '日本語',
    langCode: 'ja-JP',
    partnerName: '유토 (Yuto)',
    partnerCity: 'Tokyo',
    partnerAvatar: '🗼'
  },
  {
    code: 'CN',
    nameKo: '중국 (중국어)',
    nameNative: '中国 (中文)',
    flag: '🇨🇳',
    languageName: '中文',
    langCode: 'zh-CN',
    partnerName: '웨이 (Wei)',
    partnerCity: 'Beijing',
    partnerAvatar: '🏮'
  },
  {
    code: 'VN',
    nameKo: '베트남 (베트남어)',
    nameNative: 'Việt Nam (Tiếng Việt)',
    flag: '🇻🇳',
    languageName: 'Tiếng Việt',
    langCode: 'vi-VN',
    partnerName: '린 (Linh)',
    partnerCity: 'Hanoi',
    partnerAvatar: '🛵'
  },
  {
    code: 'ES',
    nameKo: '스페인·중남미 (스페인어)',
    nameNative: 'España (Español)',
    flag: '🇪🇸',
    languageName: 'Español',
    langCode: 'es-ES',
    partnerName: '소피아 (Sofia)',
    partnerCity: 'Madrid',
    partnerAvatar: '💃'
  },
  {
    code: 'FR',
    nameKo: '프랑스 (프랑스어)',
    nameNative: 'France (Français)',
    flag: '🇫🇷',
    languageName: 'Français',
    langCode: 'fr-FR',
    partnerName: '뤼카 (Lucas)',
    partnerCity: 'Paris',
    partnerAvatar: '🥐'
  },
  {
    code: 'DE',
    nameKo: '독일 (독일어)',
    nameNative: 'Deutschland (Deutsch)',
    flag: '🇩🇪',
    languageName: 'Deutsch',
    langCode: 'de-DE',
    partnerName: '펠릭스 (Felix)',
    partnerCity: 'Berlin',
    partnerAvatar: '🥨'
  },
  {
    code: 'ID',
    nameKo: '인도네시아 (인도네시아어)',
    nameNative: 'Indonesia (Bahasa Indonesia)',
    flag: '🇮🇩',
    languageName: 'Bahasa Indonesia',
    langCode: 'id-ID',
    partnerName: '부디 (Budi)',
    partnerCity: 'Jakarta',
    partnerAvatar: '🌴'
  },
  {
    code: 'TH',
    nameKo: '태국 (태국어)',
    nameNative: 'ไทย (ภาษาไทย)',
    flag: '🇹🇭',
    languageName: 'ภาษาไทย',
    langCode: 'th-TH',
    partnerName: '솜차이 (Somchai)',
    partnerCity: 'Bangkok',
    partnerAvatar: '🛺'
  },
  {
    code: 'BR',
    nameKo: '브라질 (포르투갈어)',
    nameNative: 'Brasil (Português)',
    flag: '🇧🇷',
    languageName: 'Português',
    langCode: 'pt-BR',
    partnerName: '마테우스 (Mateus)',
    partnerCity: 'São Paulo',
    partnerAvatar: '⚽'
  }
];

export const DAILY_EXCHANGE_SCENES: ExchangeScene[] = [
  // Scene 1: 07:00 기상 & 아침 모닝 루틴
  {
    id: 'scene-1-morning',
    timeSlot: '07:00',
    periodKo: '아침 기상 & 모닝 루틴',
    periodEn: 'Waking Up & Morning Routine',
    icon: '🌅',
    situationSummaryKo: '알람을 끄고 침대에서 눈을 뜨며 가족이나 룸메이트에게 첫인사를 건네는 시간',
    situationSummaryEn: 'Turning off the alarm, getting out of bed, and greeting family or roommates',
    partnerGreetingPromptKo: '안녕! 방금 알람 끄고 일어났어. 너희 나라에서는 아침에 일어났을 때 가족이나 친구에게 뭐라고 인사해?',
    partnerGreetingPromptEn: "Good morning! Just woke up. How do people naturally greet each other in the morning in your country?",

    nativeTeachTask: {
      questionKo: '아침에 침대에서 일어나 가족이나 룸메이트에게 건네는 가장 자연스러운 아침 인사는?',
      questionEn: 'Which natural morning greeting would you teach to your Korean friend?',
      options: [
        {
          id: 'opt-1-1',
          phraseByCountry: {
            US: 'Good morning! Did you sleep well?',
            JP: 'おはよう！よく眠れた？ (Ohayou! Yoku nemureta?)',
            CN: '早安！昨晚睡得好吗？ (Zǎo ān! Zuówǎn shuì de hǎo ma?)',
            VN: 'Chào buổi sáng! Cậu ngủ ngon không?',
            ES: '¡Buenos días! ¿Dormiste bien?',
            FR: 'Bonjour ! Tu as bien dormi ?',
            DE: 'Guten Morgen! Hast du gut geschlafen?',
            ID: 'Selamat pagi! Tidurmu nyenyak semalam?',
            TH: 'อรุณสวัสดิ์! เมื่อคืนหลับสบายไหม? (A-run-sa-wat! Muea-khuen lap sa-bai mai?)',
            BR: 'Bom dia! Dormiu bem?'
          },
          meaningKo: '좋은 아침! 잘 잤어?',
          isBestMatch: true,
          explanationKo: '가장 일상적이고 다정한 아침 인사 표현입니다.',
          explanationEn: 'The most natural and warm morning greeting.'
        },
        {
          id: 'opt-1-2',
          phraseByCountry: {
            US: 'I am so exhausted, 5 more minutes please...',
            JP: 'あと5分だけ寝かせて… (Ato go-fun dake nekasete...)',
            CN: '我还想再睡五分钟… (Wǒ hái xiǎng zài shuì wǔ fēnzhōng...)',
            VN: 'Cho tớ ngủ thêm 5 phút nữa đi...',
            ES: 'Estoy agotado, 5 minutos más por favor...',
            FR: 'Je suis crevé, encore 5 minutes s\'il te plaît...',
            DE: 'Ich bin so müde, bitte noch 5 Minuten...',
            ID: 'Aku masih ngantuk banget, 5 menit lagi ya...',
            TH: 'ง่วงมาก ขออีก 5 นาทีนะ... (Nguang mak, kho ik ha na-thi na...)',
            BR: 'Tô morto de sono, mais 5 minutinhos por favor...'
          },
          meaningKo: '너무 피곤해, 5분만 더 잘래...',
          isBestMatch: false,
          explanationKo: '늦잠 잘 때 쓰는 유쾌한 투정 표현입니다!',
          explanationEn: 'A playful expression when hitting snooze.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '좋은 아침이에요! 잘 잤어요?',
      romanization: 'Jo-eun a-chim-i-e-yo! Jal ja-sseo-yo?',
      phoneticSpelling: '[조은 아치미에요! 잘 자써요?]',
      translationByCountry: {
        US: 'Good morning! Did you sleep well?',
        JP: 'おはようございます！よく眠れましたか？',
        CN: '早上好！睡得好吗？',
        VN: 'Chào buổi sáng! Bạn ngủ ngon chứ?',
        ES: '¡Buenos días! ¿Dormiste bien?',
        FR: 'Bonjour ! Tu as bien dormi ?',
        DE: 'Guten Morgen! Hast du gut geschlafen?',
        ID: 'Selamat pagi! Tidurmu nyenyak?',
        TH: 'อรุณสวัสดิ์ครับ/ค่ะ! หลับสบายไหม?',
        BR: 'Bom dia! Dormiu bem?'
      },
      usageContextKo: '가족, 친구, 룸메이트에게 쓰는 표준적이고 다정한 아침 인사입니다. 어른께는 "안녕히 주무셨어요?"를 씁니다.',
      usageContextEn: 'Friendly polite morning greeting. Use "안녕히 주무셨어요?" for elders or bosses.',
      culturalNoteKo: '한국에서는 아침에 수면의 질을 묻는 "잘 잤어?"가 단순한 사실 확인을 넘어 상대방의 컨디션을 챙기는 따뜻한 인사말이에요.',
      culturalNoteEn: 'In Korea, asking "Did you sleep well?" conveys genuine warmth and care for the other person’s well-being.',
      exampleDialogue: [
        {
          speaker: 'korean',
          speakerNameKo: '민수 (한국 친구)',
          speakerNameNative: 'Minsu (Korean Friend)',
          korean: '좋은 아침! 오늘 푹 잘 잤어?',
          romanization: 'Jo-eun a-chim! O-neul puk jal ja-sseo?',
          translationByCountry: {
            US: 'Morning! Did you sleep soundly today?',
            JP: 'おはよう！今日ぐっすり眠れた？',
            CN: '早上好！今天睡得香吗？',
            VN: 'Chào buổi sáng! Hôm nay cậu ngủ say chứ?',
            ES: '¡Buen día! ¿Dormiste bien hoy?',
            FR: 'Bonjour ! Tu as bien dormi aujourd’hui ?',
            DE: 'Morgen! Hast du heute gut geschlafen?',
            ID: 'Pagi! Tidurmu nyenyak hari ini?',
            TH: 'อรุณสวัสดิ์! วันนี้หลับสบายดีไหม?',
            BR: 'Bom dia! Dormiu bem hoje?'
          }
        },
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '응! 알람 소리 듣고 바로 일어났어.',
          romanization: 'Eung! Al-ram so-ri deut-go ba-ro il-eo-na-sseo.',
          translationByCountry: {
            US: 'Yeah! I got up right after hearing the alarm.',
            JP: 'うん！アラーム聞いてすぐ起きたよ。',
            CN: '嗯！听到闹钟就马上起来了。',
            VN: 'Ừ! Nghe tiếng chuông báo thức là dậy liền.',
            ES: '¡Sí! Me levanté justo al oír la alarma.',
            FR: 'Oui ! Je me suis levé dès le réveil.',
            DE: 'Ja! Bin direkt beim Wecker aufgestanden.',
            ID: 'Iya! Aku langsung bangun pas alarm bunyi.',
            TH: 'ใช่! ได้ยินเสียงนาฬิกาปลุกก็ลุกเลย',
            BR: 'Sim! Levantei assim que o alarme tocou.'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '아침에 한국인 친구 민수가 "좋은 아침! 어제 푹 잤어?"라고 물어왔습니다. 가장 자연스러운 나의 대답은?',
      situationEn: 'Korean friend Minsu asks "Good morning! Did you sleep well?". What is the most natural reply?',
      koreanFriendPrompt: '좋은 아침! 어제 푹 잤어?',
      options: [
        {
          id: 'rp-1-1',
          korean: '응, 푹 잘 잤어! 너는 잘 잤어?',
          romanization: 'Eung, puk jal ja-sseo! Neo-neun jal ja-sseo?',
          translationByCountry: {
            US: 'Yeah, I slept really well! Did you sleep well too?',
            JP: 'うん、ぐっすり眠れたよ！そっちはどう？',
            CN: '嗯，睡得很香！你睡得好吗？',
            VN: 'Ừ, tớ ngủ ngon lắm! Cậu ngủ ngon không?',
            ES: '¡Sí, dormí de maravilla! ¿Y tú?',
            FR: 'Oui, j’ai super bien dormi ! Et toi ?',
            DE: 'Ja, hab super geschlafen! Und du?',
            ID: 'Iya, nyenyak banget! Kamu gimana?',
            TH: 'อื้อ หลับสบายมากเลย! เธอหล่ะ?',
            BR: 'Sim, dormi super bem! E você?'
          },
          isCorrect: true,
          friendReactionKo: '우와, 한국 사람처럼 자연스럽게 되물어봐 줘서 고마워! 나도 푹 잤어.',
          friendReactionEn: 'Awesome, asking back just like a native speaker! I slept great too.'
        },
        {
          id: 'rp-1-2',
          korean: '저는 밥을 먹었습니다.',
          romanization: 'Jeo-neun bab-eul meog-eot-seum-ni-da.',
          translationByCountry: {
            US: 'I ate a meal.',
            JP: '私はご飯を食べました。',
            CN: '我吃了饭。',
            VN: 'Tôi đã ăn cơm.',
            ES: 'Yo comí comida.',
            FR: 'J’ai mangé.',
            DE: 'Ich habe gegessen.',
            ID: 'Saya sudah makan.',
            TH: 'ฉันกินข้าวแล้ว',
            BR: 'Eu comi comida.'
          },
          isCorrect: false,
          friendReactionKo: '수면을 물어봤는데 갑자기 밥 얘기가 나왔네! "푹 잘 잤어"라고 대답해 봐!',
          friendReactionEn: 'I asked about your sleep, but you mentioned food! Try saying "푹 잘 잤어"!'
        }
      ]
    }
  },

  // Scene 2: 08:30 아침 식사 & 출근/등교길
  {
    id: 'scene-2-commute',
    timeSlot: '08:30',
    periodKo: '아침 식사 & 출근/등교길',
    periodEn: 'Breakfast & Commute',
    icon: '🍳',
    situationSummaryKo: '간단히 아침을 챙겨 먹고 지하철이나 버스를 타고 목적지로 이동하는 출근·등교 시간',
    situationSummaryEn: 'Grabbing a quick breakfast and heading to work or school via subway or bus',
    partnerGreetingPromptKo: '한국은 지금 출근 시간이라 지하철에 사람이 꽉 찼어! 너희 나라에서는 출근길 대중교통이나 아침 이동 때 어떤 말을 자주 써?',
    partnerGreetingPromptEn: 'Rush hour in Korea means packed subways! What expressions do people commonly use during morning commutes in your country?',

    nativeTeachTask: {
      questionKo: '출근/등교길 붐비는 지하철에서 내리려고 사람들을 헤치며 지나갈 때 쓰는 말은?',
      questionEn: 'What do you say when trying to get off a crowded train/bus in your country?',
      options: [
        {
          id: 'opt-2-1',
          phraseByCountry: {
            US: 'Excuse me, getting off! Please let me through.',
            JP: 'すみません、降ります！通してください。 (Sumimasen, orimasu!)',
            CN: '借过一下，我要下车！ (Jièguò yíxià, wǒ yào xiàchē!)',
            VN: 'Xin lỗi, cho tôi xuống với ạ!',
            ES: 'Disculpe, ¡bajo aquí! Permiso por favor.',
            FR: 'Pardon, je descends ! Laissez-moi passer s’il vous plaît.',
            DE: 'Entschuldigung, ich muss raus! Bitte durchlassen.',
            ID: 'Permisi, mau turun! Tolong beri jalan ya.',
            TH: 'ขอโทษครับ/ค่ะ ขอลงหน่อยครับ/ค่ะ! (Kho-thot khrap/kha, kho long noi!)',
            BR: 'Com licença, vou descer! Dá licença por favor.'
          },
          meaningKo: '잠시만요, 내릴게요! 지나가겠습니다.',
          isBestMatch: true,
          explanationKo: '만원 교통수단에서 내릴 때 꼭 필요한 핵심 에티켓 표현입니다.',
          explanationEn: 'Essential polite phrase when navigating through a crowded train or bus.'
        },
        {
          id: 'opt-2-2',
          phraseByCountry: {
            US: 'Where is the nearest ticket vending machine?',
            JP: '切符売り場はどこですか？ (Kippu uriba wa doko desu ka?)',
            CN: '售票处在哪里？ (Shòupiàochù zài nǎlǐ?)',
            VN: 'Quầy bán vé ở đâu vậy?',
            ES: '¿Dónde está la máquina de boletos?',
            FR: 'Où est le distributeur de billets ?',
            DE: 'Wo ist der Fahrkartenautomat?',
            ID: 'Di mana mesin tiket terdekat?',
            TH: 'ที่ขายตั๋วอยู่ที่ไหน? (Thi khai tua yu thi nai?)',
            BR: 'Onde fica a máquina de bilhetes?'
          },
          meaningKo: '표 파는 곳이 어디예요?',
          isBestMatch: false,
          explanationKo: '표를 살 때 쓰는 역내 질문입니다.',
          explanationEn: 'Useful when buying tickets, but not for getting off a train.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '잠시만요, 내릴게요!',
      romanization: 'Jam-si-man-yo, nae-ril-ge-yo!',
      phoneticSpelling: '[잠시만뇨, 내릴께요!]',
      translationByCountry: {
        US: 'Excuse me, getting off!',
        JP: 'すみません、降ります！',
        CN: '借过，我要下车！',
        VN: 'Xin phép, tôi xuống xe!',
        ES: '¡Permiso, me bajo!',
        FR: 'Pardon, je descends !',
        DE: 'Entschuldigung, ich steige aus!',
        ID: 'Permisi, saya mau turun!',
        TH: 'ขอทางหน่อยครับ/ค่ะ ขอลง!',
        BR: 'Com licença, vou descer!'
      },
      usageContextKo: '한국의 붐비는 지하철이나 버스에서 문 앞으로 나갈 때 큰 소리로 외치면 사람들이 길을 비켜줍니다.',
      usageContextEn: 'Essential phrase shouted clearly when pushing through crowded Seoul metro doors.',
      culturalNoteKo: '한국인들은 아침 출근길 지하철을 콩나물시루 같다고 해서 "지옥철(Hell-subway)"이라고 부르기도 해요!',
      culturalNoteEn: 'Koreans jokingly call the super crowded rush-hour subway "Ji-ok-cheol" (Hell Metro)!',
      exampleDialogue: [
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '죄송합니다, 잠시만요! 이번 역에서 내릴게요.',
          romanization: 'Joe-song-ham-ni-da, jam-si-man-yo! I-beon yeog-e-seo nae-ril-ge-yo.',
          translationByCountry: {
            US: 'Excuse me, sorry! Getting off at this station.',
            JP: 'すみません、ちょっと通してください！この駅で降ります。',
            CN: '不好意思，借过！我在这站下车。',
            VN: 'Xin lỗi, cho tôi qua với! Tôi xuống ga này.',
            ES: 'Disculpe, ¡permiso! Me bajo en esta estación.',
            FR: 'Pardonnez-moi ! Je descends à cette station.',
            DE: 'Entschuldigung, Verzeihung! Ich steige an dieser Station aus.',
            ID: 'Maaf, permisi! Saya turun di stasiun ini.',
            TH: 'ขอโทษครับ/ค่ะ ขอทางหน่อย! จะลงสถานีนี้ครับ/ค่ะ',
            BR: 'Desculpe, com licença! Vou descer nesta estação.'
          }
        },
        {
          speaker: 'korean',
          speakerNameKo: '승객 (승객분)',
          speakerNameNative: 'Passenger',
          korean: '네, 조심히 지나가세요~',
          romanization: 'Ne, jo-sim-hi ji-na-ga-se-yo~',
          translationByCountry: {
            US: 'Sure, pass through carefully~',
            JP: 'はい、お気をつけてどうぞ〜',
            CN: '好的，请小心过〜',
            VN: 'Vâng, đi cẩn thận nhé~',
            ES: 'Sí, pase con cuidado~',
            FR: 'Oui, passez prudemment~',
            DE: 'Ja, gehen Sie vorsichtig durch~',
            ID: 'Ya, hati-hati lewatnya ya~',
            TH: 'ครับ/ค่ะ ค่อยๆ เดินนะ~',
            BR: 'Sim, passe com cuidado~'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '지하철 문 앞에 서 있는 사람들에게 가로막혀 내리지 못할 위기입니다! 뭐라고 말해야 할까요?',
      situationEn: 'You are blocked by people near the subway doors and need to get off! What should you say?',
      koreanFriendPrompt: '(안내방송: 이번 역은 강남, 강남역입니다. 내리실 문은 오른쪽입니다.)',
      options: [
        {
          id: 'rp-2-1',
          korean: '저기요, 잠시만요! 저 이번에 내릴게요!',
          romanization: 'Jeo-gi-yo, jam-si-man-yo! Jeo i-beon-e nae-ril-ge-yo!',
          translationByCountry: {
            US: 'Excuse me, just a moment! I am getting off now!',
            JP: 'あの、すみません！今回降ります！',
            CN: '劳驾，借过一下！我这站下车！',
            VN: 'Anh/chị ơi, xin phép! Tớ xuống ga này!',
            ES: '¡Disculpe, permiso! ¡Me bajo en esta!',
            FR: 'Pardonnez-moi, s’il vous plaît ! Je descends maintenant !',
            DE: 'Entschuldigung, bitte kurz! Ich steige jetzt aus!',
            ID: 'Permisi sebentar! Saya mau turun di sini!',
            TH: 'ขอโทษนะคะ/ครับ ขอทางหน่อย! จะลงป้ายนี้แล้ว!',
            BR: 'Com licença, um minutinho! Vou descer agora!'
          },
          isCorrect: true,
          friendReactionKo: '완벽해! 이렇게 똑 부러지게 말하면 아무리 복잡한 강남역이어도 바로 비켜줘!',
          friendReactionEn: 'Perfect! If you say it assertively like this, people will clear the way immediately.'
        },
        {
          id: 'rp-2-2',
          korean: '이 지하철은 아주 빠릅니다.',
          romanization: 'I ji-ha-cheol-eun a-ju ppa-reum-ni-da.',
          translationByCountry: {
            US: 'This subway is very fast.',
            JP: 'この地下鉄はとても速いです。',
            CN: '这趟地铁非常快。',
            VN: 'Tàu điện ngầm này nhanh quá.',
            ES: 'Este metro es muy rápido.',
            FR: 'Ce métro est très rapide.',
            DE: 'Diese U-Bahn ist sehr schnell.',
            ID: 'Kereta bawah tanah ini sangat cepat.',
            TH: 'รถไฟใต้ดินนี้เร็วมาก',
            BR: 'Esse metrô é muito rápido.'
          },
          isCorrect: false,
          friendReactionKo: '지금 빨리 내려야 하는데 지하철 속도를 칭찬하고 있으면 못 내려!',
          friendReactionEn: 'You need to get off right now, not compliment how fast the train is!'
        }
      ]
    }
  },

  // Scene 3: 12:30 점심 시간 & 메뉴 고르기
  {
    id: 'scene-3-lunch',
    timeSlot: '12:30',
    periodKo: '점심 시간 & 메뉴 고르기',
    periodEn: 'Lunch Break & Food Choice',
    icon: '💻',
    situationSummaryKo: '동료나 친구들과 함께 무엇을 먹을지 메뉴를 고르고 식당으로 향하는 즐거운 점심시간',
    situationSummaryEn: 'Deciding what to eat for lunch with colleagues/friends and heading to a restaurant',
    partnerGreetingPromptKo: '드디어 점심시간이다! 배고파 죽겠어~ 너희 나라에서는 친구끼리 점심 뭐 먹을지 정할 때 어떤 표현을 제일 많이 써?',
    partnerGreetingPromptEn: 'Finally lunchtime! I’m starving. What phrase do you use most often in your country when deciding lunch with friends?',

    nativeTeachTask: {
      questionKo: '친구에게 "오늘 점심 뭐 먹을래? 땡기는 거 있어?"라고 묻는 캐주얼한 표현은?',
      questionEn: 'How do you ask a friend what they are craving for lunch?',
      options: [
        {
          id: 'opt-3-1',
          phraseByCountry: {
            US: 'What are you craving for lunch today? Any ideas?',
            JP: '今日のお昼何食べる？何か食べたいものある？ (Kyou no ohiru nani taberu?)',
            CN: '今天中午吃什么？有什么想吃的吗？ (Jīntiān zhōngwǔ chī shénme?)',
            VN: 'Trưa nay ăn gì đây? Cậu thèm món gì không?',
            ES: '¿Qué se te antoja para almorzar hoy? ¿Alguna idea?',
            FR: 'Qu’est-ce qui te ferait plaisir pour le déjeuner ? Tu as une idée ?',
            DE: 'Worauf hast du heute Mittag Lust? Irgendwelche Ideen?',
            ID: 'Mau makan siang apa hari ini? Lagi kepengen apa?',
            TH: 'เที่ยงนี้กินอะไรดี? อยากกินอะไรเป็นพิเศษไหม? (Thiang ni kin a-rai di?)',
            BR: 'O que você tá a fim de comer no almoço hoje? Alguma ideia?'
          },
          meaningKo: '오늘 점심 뭐 먹을래? 특별히 땡기는 거 있어?',
          isBestMatch: true,
          explanationKo: '친구끼리 점심 메뉴를 고를 때 가장 친근하고 자주 쓰는 표현입니다.',
          explanationEn: 'Most natural way to discuss lunch cravings with friends.'
        },
        {
          id: 'opt-3-2',
          phraseByCountry: {
            US: 'Water please.',
            JP: 'お水をください。 (Omizu o kudasai.)',
            CN: '请给我水。 (Qǐng gěi wǒ shuǐ.)',
            VN: 'Cho tôi xin nước.',
            ES: 'Agua por favor.',
            FR: 'De l’eau s’il vous plaît.',
            DE: 'Wasser bitte.',
            ID: 'Tolong air putih ya.',
            TH: 'ขอน้ำหน่อยครับ/ค่ะ (Kho nam noi khrap/kha)',
            BR: 'Água por favor.'
          },
          meaningKo: '물 주세요.',
          isBestMatch: false,
          explanationKo: '식당에 들어간 뒤 물을 요청할 때 쓰는 말입니다.',
          explanationEn: 'Used inside the restaurant to ask for water, not for picking a menu.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '오늘 점심 뭐 땡겨요? 김치찌개 어때요?',
      romanization: 'O-neul jeom-sim mwo ttaeng-gyeo-yo? Gim-chi-jji-gae eo-ttae-yo?',
      phoneticSpelling: '[오늘 점심 뭐 땡겨요? 김치찌개 어때요?]',
      translationByCountry: {
        US: 'What are you craving for lunch today? How about kimchi stew?',
        JP: '今日のお昼、何が食べたい気分？キムチチゲはどう？',
        CN: '今天中午想吃什么？泡菜汤怎么样？',
        VN: 'Trưa nay thèm món gì? Canh kim chi được không?',
        ES: '¿Qué se te antoja para almorzar hoy? ¿Qué tal un estofado de kimchi?',
        FR: 'Tu as envie de quoi pour le déjeuner ? Que dis-tu d’un ragoût de kimchi ?',
        DE: 'Worauf hast du heute Mittag Lust? Wie wäre es mit Kimchi-Eintopf?',
        ID: 'Lagi kepengen apa makan siang ini? Gimana kalau kimchi jjigae?',
        TH: 'เที่ยงนี้อยากกินอะไร? ซุปกิมจิตัดไหม?',
        BR: 'O que tá com vontade de comer no almoço? Que tal sopa de kimchi?'
      },
      usageContextKo: '"땡기다"는 특정 음식이 먹고 싶다는 친근한 구어체 슬랭 표현입니다. 정중하게는 "드시고 싶은 메뉴 있으세요?"를 씁니다.',
      usageContextEn: '"땡기다" is authentic slang meaning "to crave a specific food".',
      culturalNoteKo: '한국인에게 "밥 먹었어?"는 단순 식사 여부뿐 아니라 "너 잘 지내고 있지?"라는 한국 특유의 정(情)이 담긴 대표적인 안부 인사예요.',
      culturalNoteEn: 'In Korean culture, asking if you’ve eaten lunch is the quintessential expression of affectionate caring.',
      exampleDialogue: [
        {
          speaker: 'korean',
          speakerNameKo: '민수 (한국 친구)',
          speakerNameNative: 'Minsu (Korean Friend)',
          korean: '오늘 날씨도 쌀쌀한데 따뜻한 국물 요리 땡기지 않아?',
          romanization: 'O-neul nal-ssi-do ssal-ssal-han-de tta-tteut-han guk-mul yo-ri ttaeng-gi-ji an-a?',
          translationByCountry: {
            US: 'It is a bit chilly today, doesn’t a warm soup sound amazing?',
            JP: '今日肌寒いし、温かいスープ料理が恋しくない？',
            CN: '今天有点凉，不想喝点热汤吗？',
            VN: 'Hôm nay trời se lạnh, cậu có thèm món canh nóng không?',
            ES: 'Hace algo de frío hoy, ¿no se te antoja una sopa caliente?',
            FR: 'Il fait un peu frais aujourd’hui, une bonne soupe chaude te tente ?',
            DE: 'Heute ist es etwas kühl, Lust auf eine warme Suppe?',
            ID: 'Hari ini agak dingin ya, kepengen yang berkuah hangat gak?',
            TH: 'วันนี้อากาศเย็นๆ อยากกินอะไรร้อนๆ น้ำซุปไหม?',
            BR: 'Hoje tá friozinho, não dá vontade de uma comidinha quente com caldo?'
          }
        },
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '완전 좋아! 회사 앞 부대찌개 집으로 가자.',
          romanization: 'Wan-jeon jo-a! Hoe-sa ap bu-dae-jji-gae jib-eu-ro ga-ja.',
          translationByCountry: {
            US: 'Sounds fantastic! Let’s head to that army stew spot in front of the office.',
            JP: 'いいね！会社の前のプデチゲ屋さんに行こう。',
            CN: '太棒了！去公司前边那家部队火锅吧。',
            VN: 'Tuyệt vời luôn! Đi quán lẩu quân đội trước công ty đi.',
            ES: '¡Me encanta! Vamos al lugar de budae jjigae frente a la oficina.',
            FR: 'Carrément ! Allons au resto de budae jjigae devant le bureau.',
            DE: 'Super gerne! Lass uns zu dem Budae-Jjigae-Laden vorm Büro gehen.',
            ID: 'Mau banget! Yuk ke tempat budae jjigae di depan kantor.',
            TH: 'ดีเลย! ไปร้านบูเดชิเกหน้าบริษัทกัน',
            BR: 'Fechou demais! Bora naquele lugar de budae jjigae na frente da firma.'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '민수가 "매운 떡볶이 먹으러 갈래?"라고 물었을 때, "좋아, 완전 땡겼어!"라고 한국어로 가장 자연스럽게 반응하는 것은?',
      situationEn: 'Minsu asks "Wanna grab spicy tteokbokki?". How do you say "Sounds great, I was totally craving that!"?',
      koreanFriendPrompt: '오늘 점심에 매콤한 떡볶이 먹으러 갈래?',
      options: [
        {
          id: 'rp-3-1',
          korean: '좋아! 마침 매운 거 완전 땡겼는데 가자!',
          romanization: 'Jo-a! Ma-chim mae-un geo wan-jeon ttaeng-gyeot-neun-de ga-ja!',
          translationByCountry: {
            US: 'Awesome! I was just totally craving spicy food, let’s go!',
            JP: 'いいね！ちょうど辛いものが食べたかったの、行こう！',
            CN: '好啊！正好超想吃辣的，走吧！',
            VN: 'Được luôn! Vừa hay tớ đang cực kỳ thèm đồ cay, đi thôi!',
            ES: '¡Genial! Justo se me antojaba algo picante, ¡vamos!',
            FR: 'Génial ! J’avais justement trop envie d’un truc épicé, on y va !',
            DE: 'Klasse! Hatte gerade total Lust auf was Scharfes, los geht’s!',
            ID: 'Yuk! Pas banget lagi kepengen yang pedas-pedas nih!',
            TH: 'ดีเลย! กำลังอยากกินเผ็ดๆ พอดี ไปกัน!',
            BR: 'Show! Tava morrendo de vontade de comida apimentada, bora!'
          },
          isCorrect: true,
          friendReactionKo: '우와, "마침 땡겼는데"라는 표현까지 쓰다니! 한국 사람 다 됐네!',
          friendReactionEn: 'Incredible, using "마침 땡겼는데" makes you sound like a true local!'
        },
        {
          id: 'rp-3-2',
          korean: '지금은 오후 열두 시 삼십 분입니다.',
          romanization: 'Ji-geum-eun o-hu yeol-du si sam-sip bun-im-ni-da.',
          translationByCountry: {
            US: 'Right now it is 12:30 PM.',
            JP: '今は午後12時30分です。',
            CN: '现在是下午十二点三十分。',
            VN: 'Bây giờ là 12 giờ 30 phút chiều.',
            ES: 'Ahora son las 12:30 de la tarde.',
            FR: 'Il est actuellement 12h30.',
            DE: 'Es ist gerade 12:30 Uhr.',
            ID: 'Sekarang jam 12 lewat 30 menit siang.',
            TH: 'ตอนนี้เวลาเที่ยงสามสิบนาที',
            BR: 'Agora são 12h30 da tarde.'
          },
          isCorrect: false,
          friendReactionKo: '메뉴 제안을 했는데 왜 시계 시간을 브리핑해줘! 크크',
          friendReactionEn: 'I proposed lunch, why are you reading the clock like a robot! Haha'
        }
      ]
    }
  },

  // Scene 4: 16:30 나른한 오후 커피 & 디저트
  {
    id: 'scene-4-afternoon',
    timeSlot: '16:30',
    periodKo: '오후 커피 & 디저트 충전',
    periodEn: 'Afternoon Coffee & Recharge',
    icon: '☕',
    situationSummaryKo: '식곤증이 몰려오는 오후 4시, 카페에서 시원한 커피나 달콤한 음료를 마시며 에너지를 채우는 시간',
    situationSummaryEn: 'Overcoming afternoon drowsiness with a coffee run or sweet beverage with friends',
    partnerGreetingPromptKo: '하품이 계속 나온다... 너무 졸려! 한국 직장인들은 오후에 "아아(아이스 아메리카노)"를 꼭 마시거든. 너희 나라 사람들은 오후 4시에 졸릴 때 어떤 말을 해?',
    partnerGreetingPromptEn: 'Can’t stop yawning... so sleepy! In Korea, we always get an "Ah-Ah" (Iced Americano). What do people say when drowsy in the afternoon in your country?',

    nativeTeachTask: {
      questionKo: '오후에 너무 졸려서 "카페인 수혈이 시급해! 커피 한잔하러 가자"라고 말하고 싶을 때 알맞은 표현은?',
      questionEn: 'How do you say "I desperately need caffeine! Let’s grab a coffee" in your language?',
      options: [
        {
          id: 'opt-4-1',
          phraseByCountry: {
            US: 'I desperately need a caffeine fix. Who wants coffee?',
            JP: 'カフェイン補給しないと倒れそう！コーヒー買いに行かない？ (Kafein hokyuu!)',
            CN: '我急需续命咖啡！谁要一起去买？ (Wǒ jíxū xùmìng kāfēi!)',
            VN: 'Cần nạp cafein gấp! Ai đi cà phê với tớ không?',
            ES: '¡Necesito una dosis urgente de cafeína! ¿Quién quiere café?',
            FR: 'J’ai un besoin urgent de caféine. Qui veut un café ?',
            DE: 'Ich brauche dringend Koffein. Wer kommt mit zum Kaffee holen?',
            ID: 'Butuh asupan kafein darurat nih! Siapa mau kopi?',
            TH: 'ต้องการคาเฟอีนด่วนๆ เลย! มีใครไปกินกาแฟไหม? (Tong-kan ka-fe-in duan!)',
            BR: 'Preciso de cafeína na veia urgente! Quem anima um café?'
          },
          meaningKo: '카페인 수혈이 시급해! 커피 마시러 갈 사람?',
          isBestMatch: true,
          explanationKo: '나른한 오후 직장이나 학교에서 커피 동행을 모을 때 쓰는 전형적인 표현입니다.',
          explanationEn: 'Classic phrase used in offices and campuses for afternoon coffee runs.'
        },
        {
          id: 'opt-4-2',
          phraseByCountry: {
            US: 'Please write down your phone number.',
            JP: '電話番号を書いてください。 (Denwa bangou o kaite kudasai.)',
            CN: '请留下您的电话号码。 (Qǐng liúxià nín de diànhuà hàomǎ.)',
            VN: 'Xin vui lòng để lại số điện thoại.',
            ES: 'Por favor anote su número de teléfono.',
            FR: 'Veuillez inscrire votre numéro de téléphone.',
            DE: 'Bitte schreiben Sie Ihre Telefonnummer auf.',
            ID: 'Tolong tulis nomor telepon Anda.',
            TH: 'กรุณาเขียนเบอร์โทรศัพท์ด้วยครับ/ค่ะ',
            BR: 'Por favor anote o seu telefone.'
          },
          meaningKo: '전화번호를 적어주세요.',
          isBestMatch: false,
          explanationKo: '연락처를 물어볼 때 쓰는 다른 상황 표현입니다.',
          explanationEn: 'Used to ask for contact info, completely unrelated to coffee.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '아, 당 떨어졌다! 시원한 아아 한 잔 때릴까요?',
      romanization: 'A, dang tteol-eo-jyeot-da! Si-won-han a-a han jan ttae-ril-kka-yo?',
      phoneticSpelling: '[아, 당 떠러졷따! 시원한 아아 한 잔 때릴까요?]',
      translationByCountry: {
        US: 'Ah, my sugar levels crashed! Care to smash a cup of iced Americano?',
        JP: 'あー、糖分切れた！冷たいアイスアメリカーノ一杯キメない？',
        CN: '哎呀，血糖低了！要不要整一杯冰美式？',
        VN: 'A, tụt đường huyết rồi! Làm một ly cà phê đá giải nhiệt không?',
        ES: '¡Uff, se me bajó el azúcar! ¿Nos echamos un americano helado?',
        FR: 'Ah, coup de barre ! On se prend un americano glacé ?',
        DE: 'Uff, Unterzuckerung! Lust auf einen eiskalten Americano?',
        ID: 'Aduh, kurang gula nih! Mau hajar es americano segelas gak?',
        TH: 'โอ๊ย น้ำตาลตกแล้ว! ไปจัดอเมริกาโน่เย็นสักแก้วไหม?',
        BR: 'Nossa, caiu minha pressão de doce! Bora mandar um americano gelado?'
      },
      usageContextKo: '"당 떨어졌다"는 에너지가 고갈되었을 때, "아아"는 아이스 아메리카노 줄임말, "한 잔 때리다"는 시원하게 마시자는 위트 있는 표현입니다.',
      usageContextEn: '"당 떨어졌다" (blood sugar dropped) & "아아" (Iced Americano) & "때리다" (to hit/smash a drink) are super fun Korean slang!',
      culturalNoteKo: '한국에는 한겨울 영하 15도 날씨에도 차가운 아이스 아메리카노만 고집하는 사람들을 일컫는 "얼죽아(얼어 죽어도 아이스)"라는 유행어가 있어요!',
      culturalNoteEn: 'Korea coined the famous phrase "Eol-Juk-Ah" — meaning "Even if I freeze to death, I will drink Iced Americano"!',
      exampleDialogue: [
        {
          speaker: 'korean',
          speakerNameKo: '민수 (한국 친구)',
          speakerNameNative: 'Minsu (Korean Friend)',
          korean: '나 눈꺼풀이 천근만근이야. 카페 가서 커피 테이크아웃 해올래?',
          romanization: 'Na nun-kko-pul-i cheon-geun-man-geun-i-ya. Ka-pe ga-seo keo-pi te-i-keu-a-ut hae-ol-rae?',
          translationByCountry: {
            US: 'My eyelids feel heavy as rocks. Wanna hit a cafe and grab takeaway coffee?',
            JP: 'まぶたが重すぎて限界… カフェ行ってテイクアウトしてこない？',
            CN: '我眼皮沉得像千斤顶。要去咖啡厅打包杯咖啡吗？',
            VN: 'Mắt tớ díp lại rồi đây này. Đi tiệm cà phê mua mang về nhé?',
            ES: 'Mis párpados pesan una tonelada. ¿Vamos a una cafetería por algo para llevar?',
            FR: 'Mes paupières sont super lourdes. On va chercher un café à emporter ?',
            DE: 'Meine Augenlider sind bleischwer. Gehen wir zum Café und holen was zum Mitnehmen?',
            ID: 'Kelopak mataku berat banget nih. Mau mampir kafe beli kopi bungkus gak?',
            TH: 'หนังตาหนักมากไม่ไหวแล้ว ไปซื้อกาแฟเทคอะเวย์ที่คาเฟ่กันไหม?',
            BR: 'Minhas pálpebras tão pesando uma tonelada. Bora pegar um café pra viagem?'
          }
        },
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '좋아요! 저는 얼죽아니까 아이스 아메리카노 부탁해요.',
          romanization: 'Jo-a-yo! Jeo-neun eol-juk-a-ni-kka a-i-seu a-me-ri-ka-no bu-tak-hae-yo.',
          translationByCountry: {
            US: 'Awesome! I am an "Eol-Juk-Ah", so Iced Americano for me please.',
            JP: 'いいね！私は「凍え死んでもアイス」派だからアイスアメリカーノで！',
            CN: '好呀！我是“冻死也要喝冰的”，请给我来杯冰美式。',
            VN: 'Được luôn! Tớ theo hệ "chết rét vẫn uống đá", cho tớ ly Americano đá nhé.',
            ES: '¡Genial! Soy del club "helado hasta morir", así que un americano frío por favor.',
            FR: 'Super ! Je fais partie des inconditionnels du glacé, un americano glacé pour moi.',
            DE: 'Klasse! Ich trinke immer Eiskaffee, also bitte einen Iced Americano.',
            ID: 'Boleh! Aku tim "dingin sampai beku", pesenin es americano ya.',
            TH: 'ดีครับ/ค่ะ! ฉันสายหนาวแค่ไหนก็กินเย็น ขออเมริกาโน่เย็นแก้วนึงนะ',
            BR: 'Perfeito! Sou do time que toma gelado até no inverno, quero americano com gelo.'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '카페 주문 카운터에서 직원이 "주문 도와드릴까요?"라고 물어봅니다. 아이스 아메리카노 한 잔을 테이크아웃으로 주문해 보세요!',
      situationEn: 'The barista asks "May I take your order?". Order one iced Americano for takeout in Korean!',
      koreanFriendPrompt: '어서오세요! 주문 도와드릴까요?',
      options: [
        {
          id: 'rp-4-1',
          korean: '아이스 아메리카노 한 잔 테이크아웃으로 부탁드려요!',
          romanization: 'A-i-seu a-me-ri-ka-no han jan te-i-keu-a-ut-eu-ro bu-tak-deu-ryeo-yo!',
          translationByCountry: {
            US: 'One iced Americano for takeout, please!',
            JP: 'アイスアメリカーノ1杯、テイクアウトでお願いします！',
            CN: '请给我一杯冰美式，打包带走！',
            VN: 'Cho tôi một ly Americano đá mang về nhé!',
            ES: '¡Un americano helado para llevar, por favor!',
            FR: 'Un americano glacé à emporter s’il vous plaît !',
            DE: 'Einen Iced Americano zum Mitnehmen, bitte!',
            ID: 'Tolong es americano satu gelas dibungkus ya!',
            TH: 'ขออเมริกาโน่เย็นแก้วนึง ใส่แก้วกลับบ้านครับ/ค่ะ!',
            BR: 'Um americano gelado para viagem, por favor!'
          },
          isCorrect: true,
          friendReactionKo: '바리스타가 바로 "네, 진동벨로 알려드릴게요!" 할 정도로 완벽한 주문이었어!',
          friendReactionEn: 'Spot on! The barista would hand you the buzzer with a smile right away.'
        },
        {
          id: 'rp-4-2',
          korean: '여기서 책을 빌릴 수 있습니까?',
          romanization: 'Yeo-gi-seo chaek-eul bil-ril su it-seum-ni-kka?',
          translationByCountry: {
            US: 'Can I borrow a book here?',
            JP: 'ここで本を借りられますか？',
            CN: '这里可以借书吗？',
            VN: 'Ở đây có mượn sách được không?',
            ES: '¿Puedo pedir prestado un libro aquí?',
            FR: 'Puis-je emprunter un livre ici ?',
            DE: 'Kann ich hier ein Buch ausleihen?',
            ID: 'Bisa pinjam buku di sini?',
            TH: 'ที่นี่ขอยืมหนังสือได้ไหมครับ/ค่ะ?',
            BR: 'Posso pegar um livro emprestado aqui?'
          },
          isCorrect: false,
          friendReactionKo: '카페에 와서 도서관 책 대출을 물어보면 바리스타가 당황해! 하하',
          friendReactionEn: 'Asking the barista to borrow a library book will baffle them! Haha'
        }
      ]
    }
  },

  // Scene 5: 19:30 퇴근/하교 후 저녁 식사 & 힐링
  {
    id: 'scene-5-evening',
    timeSlot: '19:30',
    periodKo: '퇴근/하교 후 저녁 식사 & 힐링',
    periodEn: 'Evening Dinner & Unwinding',
    icon: '🌙',
    situationSummaryKo: '하루 일과를 무사히 마치고 집으로 돌아와 저녁을 먹거나 맥주 한 캔을 마시며 스트레스를 푸는 저녁 시간',
    situationSummaryEn: 'Finishing the workday, coming home for dinner, or chilling out with comforting food and drinks',
    partnerGreetingPromptKo: '야호, 드디어 퇴근했다! 오늘 진짜 불태웠어. 너희 나라에서는 하루를 고생해서 마치고 집에 올 때 서로에게 어떤 따뜻한 말을 건네?',
    partnerGreetingPromptEn: 'Yay, work is finally done! Burned through a busy day. What warm words do people say after a long day in your country?',

    nativeTeachTask: {
      questionKo: '하루 동안 수고한 친구나 가족에게 "오늘 하루 정말 고생 많았어!"라고 위로하는 말은?',
      questionEn: 'How do you tell a friend or family member "You worked so hard today, great job!"?',
      options: [
        {
          id: 'opt-5-1',
          phraseByCountry: {
            US: 'You worked so hard today! Kick back and relax tonight.',
            JP: '今日もお疲れ様！ゆっくり休んでね。(Kyou mo otsukaresama!)',
            CN: '今天辛苦啦！晚上好好歇歇。(Jīntiān xīnkǔ la!)',
            VN: 'Hôm nay cậu vất vả rồi! Tối nay nghỉ ngơi cho khỏe nhé.',
            ES: '¡Trabajaste muy duro hoy! Descansa y relájate esta noche.',
            FR: 'Tu as bien bossé aujourd’hui ! Repose-toi bien ce soir.',
            DE: 'Du hast heute so hart gearbeitet! Ruh dich heute Abend gut aus.',
            ID: 'Kamu kerja keras banget hari ini! Istirahat yang cukup ya malam ini.',
            TH: 'วันนี้เหนื่อยมากเลยใช่ไหม พักผ่อนเยอะๆ นะ! (Wan ni nueai mak loei sai mai)',
            BR: 'Você ralou muito hoje! Relaxa e descansa agora à noite.'
          },
          meaningKo: '오늘 하루 정말 수고 많았어! 저녁엔 푹 쉬어.',
          isBestMatch: true,
          explanationKo: '하루의 노고를 인정하고 따뜻한 위로를 건네는 대표 표현입니다.',
          explanationEn: 'Heartwarming phrase acknowledging effort and encouraging deep rest.'
        },
        {
          id: 'opt-5-2',
          phraseByCountry: {
            US: 'Please show me your passport.',
            JP: 'パスポートを見せてください。(Pasupooto o misete kudasai.)',
            CN: '请出示您的护照。(Qǐng chūshì nín de hùzhào.)',
            VN: 'Xin vui lòng cho xem hộ chiếu.',
            ES: 'Por favor muestre su pasaporte.',
            FR: 'Veuillez montrer votre passeport.',
            DE: 'Bitte zeigen Sie Ihren Reisepass.',
            ID: 'Tolong tunjukkan paspor Anda.',
            TH: 'กรุณาแสดงหนังสือเดินทางด้วยครับ/ค่ะ',
            BR: 'Por favor mostre seu passaporte.'
          },
          meaningKo: '여권을 보여주세요.',
          isBestMatch: false,
          explanationKo: '공항 출입국 심사대에서 쓰는 표현입니다.',
          explanationEn: 'Used at airport immigration, not at the end of a workday.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '오늘 하루도 정말 고생 많았어요! 토닥토닥~',
      romanization: 'O-neul ha-ru-do jeong-mal go-saeng man-a-sseo-yo! To-dak-to-dak~',
      phoneticSpelling: '[오늘 하루도 정말 고생 만아써요! 토닥토닥~]',
      translationByCountry: {
        US: 'You worked so hard today as well! Pat on the back~',
        JP: '今日もお疲れ様でした！よしよし〜',
        CN: '今天一天也辛苦啦！抱抱摸摸头〜',
        VN: 'Hôm nay cậu cũng vất vả nhiều rồi! Thương thương nè~',
        ES: '¡Trabajaste durísimo hoy también! Una palmadita de ánimo~',
        FR: 'Tu as fait du super boulot aujourd’hui aussi ! Petite tape d’encouragement~',
        DE: 'Du hast heute wieder so viel geleistet! Auf die Schulter klopf~',
        ID: 'Hari ini kamu sudah berjuang hebat! Semangat ya, puk-puk~',
        TH: 'วันนี้ก็เหนื่อยมาทั้งวันแล้ว เก่งมากเลยนะ ตบไหล่ปุๆ~',
        BR: 'Você deu o sangue hoje de novo! Parabéns pelo esforço~'
      },
      usageContextKo: '"고생 많았어요"는 상대방의 땀과 노력을 알아주는 가장 감동적인 한국어 인사입니다. 직장 동료에게는 "오늘도 수고하셨습니다!"를 씁니다.',
      usageContextEn: '"고생 많았어요" is a deeply empathetic Korean phrase validating hard work and emotional endurance.',
      culturalNoteKo: '한국인들은 퇴근 후 맛있는 치킨과 시원한 맥주를 마시며 하루의 피로를 씻는 "치맥(Chi-Maek)" 문화를 사랑해요!',
      culturalNoteEn: 'Koreans love unwinding with "Chi-Maek" — crispy fried chicken paired with ice-cold beer!',
      exampleDialogue: [
        {
          speaker: 'korean',
          speakerNameKo: '민수 (한국 친구)',
          speakerNameNative: 'Minsu (Korean Friend)',
          korean: '집에 오니까 살 것 같다! 저녁으로 치킨 한 마리 시켜 먹을까?',
          romanization: 'Jib-e o-ni-kka sal geot gat-da! Jeo-nyeog-eu-ro chi-kin han ma-ri si-kyeo meog-eul-kka?',
          translationByCountry: {
            US: 'Coming home feels like heaven! Shall we order fried chicken for dinner?',
            JP: '家に帰ってくると生き返る〜！夕飯にチキン頼まない？',
            CN: '一回家感觉活过来了！晚饭点只炸鸡吃怎么样？',
            VN: 'Về tới nhà là thấy sống lại rồi! Hay tối nay gọi gà rán ăn nhé?',
            ES: '¡Llegar a casa es la gloria! ¿Pedimos pollo frito para cenar?',
            FR: 'Être à la maison fait tellement de bien ! On se commande du poulet frit ce soir ?',
            DE: 'Endlich zu Hause, welch eine Erleichterung! Bestellen wir Hähnchen zum Abendessen?',
            ID: 'Sampai rumah langsung berasa hidup lagi! Mau pesan ayam goreng buat makan malam gak?',
            TH: 'กลับถึงบ้านแล้วค่อยยังชั่ว! มื้อเย็นสั่งไก่ทอดมากินกันไหม?',
            BR: 'Chegar em casa não tem preço! Bora pedir frango frito pro jantar?'
          }
        },
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '대찬성! 바삭바삭한 양념치킨 반, 후라이드 반으로 시키자.',
          romanization: 'Dae-chan-seong! Ba-sak-ba-sak-han yang-nyeom-chi-kin ban, hu-ra-i-deu ban-eu-ro si-ki-ja.',
          translationByCountry: {
            US: 'Totally agree! Let’s get half crispy fried and half sweet-spicy yangnyeom.',
            JP: '大賛成！カリカリのヤンニョム半分、フライド半分で頼もう。',
            CN: '举双手赞成！点半份香脆原味，半份甜辣调味炸鸡吧。',
            VN: 'Tán thành cả hai tay! Gọi nửa sốt cay giòn rụm, nửa truyền thống nha.',
            ES: '¡Totalmente de acuerdo! Medio crujiente tradicional y medio bañado en salsa picante dulce.',
            FR: 'Carrément d’accord ! Moitié frit croustillant, moitié sauce yangnyeom.',
            DE: 'Voll dafür! Halb knusprig frittiert und halb würziges Yangnyeom.',
            ID: 'Setuju banget! Pesan setengah goreng krispi, setengah saus yangnyeom ya.',
            TH: 'เห็นด้วยสุดๆ! สั่งแบบครึ่งกรอบครึ่งคลุกซอสยังนยอมนะ',
            BR: 'Super apoio! Metade crocante frito e metade com molho yangnyeom agridoce.'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '친구가 힘든 하루를 보내고 한숨을 쉽니다. 친구를 따뜻하게 격려하는 가장 알맞은 한국어 문장은?',
      situationEn: 'Your friend sighs after an exhausting day. Which Korean sentence offers the best warmth?',
      koreanFriendPrompt: '하... 오늘 보고서 쓰느라 야근까지 하고 진짜 녹초가 됐어.',
      options: [
        {
          id: 'rp-5-1',
          korean: '오늘 정말 고생 많았어! 푹 자고 내일 힘내자.',
          romanization: 'O-neul jeong-mal go-saeng man-a-sseo! Puk ja-go nae-il him-nae-ja.',
          translationByCountry: {
            US: 'You worked so hard today! Get some deep sleep and cheer up tomorrow.',
            JP: '今日本当にお疲れ様！ぐっすり寝て明日も頑張ろう。',
            CN: '今天真的辛苦了！好好睡一觉，明天继续加油。',
            VN: 'Hôm nay cậu vất vả nhiều rồi! Ngủ ngon rồi mai lấy lại năng lượng nhé.',
            ES: '¡Trabajaste durísimo hoy! Duerme profundo y mañana con todo el ánimo.',
            FR: 'Tu as fait d’énormes efforts aujourd’hui ! Dors bien et reprends des forces pour demain.',
            DE: 'Du hast heute wirklich hart geschuftet! Schlaf gut und morgen mit frischer Kraft weiter.',
            ID: 'Hari ini kamu sudah berjuang luar biasa! Tidur nyenyak ya, besok kita semangat lagi.',
            TH: 'วันนี้เหนื่อยมากเลยนะ! หลับให้สบายแล้วพรุ่งนี้สู้ใหม่',
            BR: 'Você deu duro demais hoje! Dorme bem e amanhã bola pra frente com força total.'
          },
          isCorrect: true,
          friendReactionKo: '네 따뜻한 위로 한마디에 피로가 싹 풀린다. 진짜 고마워!',
          friendReactionEn: 'Your warm words just melted all my stress away. Thank you so much!'
        },
        {
          id: 'rp-5-2',
          korean: '여기에 서명해 주십시오.',
          romanization: 'Yeo-gi-e seo-myeong-hae ju-sip-si-o.',
          translationByCountry: {
            US: 'Please sign here.',
            JP: 'ここにサインしてください。',
            CN: '请在这里签字。',
            VN: 'Xin vui lòng ký tên vào đây.',
            ES: 'Por favor firme aquí.',
            FR: 'Veuillez signer ici.',
            DE: 'Bitte unterschreiben Sie hier.',
            ID: 'Tolong tanda tangan di sini.',
            TH: 'กรุณาเซ็นชื่อตรงนี้ครับ/ค่ะ',
            BR: 'Por favor assine aqui.'
          },
          isCorrect: false,
          friendReactionKo: '나 녹초 됐는데 갑자기 무슨 서류에 사인을 하라는 거야? 크크',
          friendReactionEn: 'I’m completely burned out and you’re handing me papers to sign? Haha'
        }
      ]
    }
  },

  // Scene 6: 23:00 잠들기 전 하루 소회 & 편안한 밤 인사
  {
    id: 'scene-6-night',
    timeSlot: '23:00',
    periodKo: '취침 전 하루 마무리 & 밤 인사',
    periodEn: 'Bedtime & Sweet Dreams',
    icon: '🛏️',
    situationSummaryKo: '침대에 누워 불을 끄고 편안한 밤을 기원하며 하루를 끝맺는 마지막 취침 인사 시간',
    situationSummaryEn: 'Tucking into bed, turning off the lights, and exchanging heartfelt goodnight wishes',
    partnerGreetingPromptKo: '이제 방 불 끄고 침대에 누웠어. 너희 나라에서는 자기 전에 친한 사람과 어떤 다정한 굿나잇 인사를 주고받아?',
    partnerGreetingPromptEn: 'Just turned off the lights and tucked into bed. How do people warmly wish each other sweet dreams before sleep in your country?',

    nativeTeachTask: {
      questionKo: '자기 전에 가족이나 연인, 친구에게 "좋은 꿈 꾸고 잘 자!"라고 다정하게 건네는 인사는?',
      questionEn: 'How do you affectionately say "Good night and sweet dreams!" in your language?',
      options: [
        {
          id: 'opt-6-1',
          phraseByCountry: {
            US: 'Good night! Sleep tight and sweet dreams.',
            JP: 'おやすみ！いい夢見てね。(Oyasumi! Ii yume mite ne.)',
            CN: '晚安！做个好梦哦。(Wǎn\'ān! Zuò gè hǎomèng o.)',
            VN: 'Chúc ngủ ngon! Mơ đẹp nhé.',
            ES: '¡Buenas noches! Que duermas bien y sueñes con los angelitos.',
            FR: 'Bonne nuit ! Fais de beaux rêves.',
            DE: 'Gute Nacht! Schlaf gut und träum was Schönes.',
            ID: 'Selamat malam! Tidur nyenyak dan mimpi indah ya.',
            TH: 'ฝันดีนะ! ขอให้ฝันเห็นแต่เรื่องดีๆ (Fan di na!)',
            BR: 'Boa noite! Dorme com os anjos e bons sonhos.'
          },
          meaningKo: '잘 자! 푹 자고 좋은 꿈 꿔.',
          isBestMatch: true,
          explanationKo: '하루를 다정하게 마무리하는 가장 사랑스러운 취침 인사입니다.',
          explanationEn: 'The most affectionate way to conclude the day and wish sweet dreams.'
        },
        {
          id: 'opt-6-2',
          phraseByCountry: {
            US: 'Turn left at the intersection.',
            JP: '交差点を左に曲がってください。(Kousaten o hidari ni magatte kudasai.)',
            CN: '请在十字路口左转。(Qǐng zài shízìlùkǒu zuǒzhuǎn.)',
            VN: 'Rẽ trái ở ngã tư nhé.',
            ES: 'Gire a la izquierda en la intersección.',
            FR: 'Tournez à gauche au croisement.',
            DE: 'Biegen Sie an der Kreuzung links ab.',
            ID: 'Belok kiri di persimpangan ya.',
            TH: 'เลี้ยวซ้ายตรงสี่แยกนะครับ/ค่ะ',
            BR: 'Vire à esquerda no cruzamento.'
          },
          meaningKo: '교차로에서 좌회전하세요.',
          isBestMatch: false,
          explanationKo: '길안내 내비게이션 표현입니다.',
          explanationEn: 'Navigation instructions, not related to bedtime wishes.'
        }
      ]
    },

    koreanTeachInfo: {
      koreanPhrase: '잘 자요, 오늘 밤 좋은 꿈 꿔요!',
      romanization: 'Jal ja-yo, o-neul bam jo-eun kkum kkwo-yo!',
      phoneticSpelling: '[잘 자요, 오늘 밤 조은 꿈 꿔요!]',
      translationByCountry: {
        US: 'Sleep well, have sweet dreams tonight!',
        JP: 'おやすみなさい、今夜いい夢見てね！',
        CN: '晚安，今晚做个好梦！',
        VN: 'Ngủ ngon nhé, đêm nay mơ giấc mơ đẹp nha!',
        ES: '¡Que descanses, que tengas lindos sueños esta noche!',
        FR: 'Dors bien, fais de beaux rêves cette nuit !',
        DE: 'Schlaf gut, hab süße Träume heute Nacht!',
        ID: 'Tidur nyenyak ya, semoga mimpi indah malam ini!',
        TH: 'หลับฝันดีนะ คืนนี้ขอให้ฝันดี!',
        BR: 'Dorme bem, tenha lindos sonhos essa noite!'
      },
      usageContextKo: '친구끼리는 "잘 자, 좋은 꿈 꿔!", 부모님이나 웃어른께는 "안녕히 주무세요, 내일 뵐게요"라고 높여 말합니다.',
      usageContextEn: 'Casual: "잘 자, 좋은 꿈 꿔!". Formal for elders: "안녕히 주무세요, 편안한 밤 되세요".',
      culturalNoteKo: '한국에서는 돼지꿈(Pig dream)이나 용꿈을 꾸면 재물과 큰 행운이 찾아온다는 재미있는 길몽 미신이 있어요!',
      culturalNoteEn: 'In Korea, dreaming of pigs or dragons is believed to bring immense wealth and great fortune!',
      exampleDialogue: [
        {
          speaker: 'korean',
          speakerNameKo: '민수 (한국 친구)',
          speakerNameNative: 'Minsu (Korean Friend)',
          korean: '벌써 밤 11시네! 내일도 출근해야 하니까 이제 잘 준비해야겠다.',
          romanization: 'Beol-sseo bam yeol-han si-ne! Nae-il-do chul-geun-hae-ya ha-ni-kka i-je jal jun-bi-hae-ya-get-da.',
          translationByCountry: {
            US: 'Already 11 PM! Gotta head to work tomorrow, so time to get ready for sleep.',
            JP: 'もう夜11時だ！明日も仕事だしそろそろ寝る準備しなきゃ。',
            CN: '都晚上11点了！明天还得上班，得准备睡了。',
            VN: 'Đã 11 giờ đêm rồi cơ à! Mai còn đi làm nên chuẩn bị đi ngủ thôi.',
            ES: '¡Ya son las 11 de la noche! Mañana hay que trabajar, así que hora de dormir.',
            FR: 'Déjà 23h ! Boulot demain, je vais me préparer pour la nuit.',
            DE: 'Schon 23 Uhr! Morgen wieder Arbeit, Zeit schlafen zu gehen.',
            ID: 'Udah jam 11 malam aja! Besok harus kerja lagi, siap-siap tidur deh.',
            TH: 'ห้าทุ่มแล้วเหรอเนี่ย! พรุ่งนี้ต้องทำงาน ต้องเตรียมเข้านอนแล้ว',
            BR: 'Já são 11 da noite! Amanhã tem trampo, hora de capotar na cama.'
          }
        },
        {
          speaker: 'me',
          speakerNameKo: '나 (학습자)',
          speakerNameNative: 'Me (Learner)',
          korean: '맞아, 오늘 언어교환 정말 즐거웠어! 푹 자고 좋은 꿈 꿔.',
          romanization: 'Maj-a, o-neul eon-eo-gyo-hwan jeong-mal jeul-geo-wot-eo! Puk ja-go jo-eun kkum kkwo.',
          translationByCountry: {
            US: 'Totally, today’s language exchange was so much fun! Sleep tight and sweet dreams.',
            JP: 'そうだね、今日の言語交換本当に楽しかった！ぐっすり寝ていい夢見てね。',
            CN: '没错，今天的语言交流真的很开心！好好睡，做个好梦。',
            VN: 'Đúng rồi, buổi trao đổi ngôn ngữ hôm nay vui lắm! Ngủ ngon và mơ đẹp nha.',
            ES: '¡Totalmente, el intercambio de idiomas de hoy fue genial! Duerme bien y dulces sueños.',
            FR: 'Trop vrai, l’échange linguistique aujourd’hui était génial ! Dors bien et fais de beaux rêves.',
            DE: 'Ganz genau, der Sprachaustausch heute hat riesigen Spaß gemacht! Schlaf gut und träum süß.',
            ID: 'Bener banget, pertukaran bahasa hari ini seru banget! Tidur nyenyak dan mimpi indah ya.',
            TH: 'จริงด้วย วันนี้แลกเปลี่ยนภาษาด้วยสนุกมากเลย! หลับฝันดีนะ',
            BR: 'Com certeza, o intercâmbio de idiomas hoje foi maneiro demais! Dorme bem e bons sonhos.'
          }
        }
      ]
    },

    roleplayChallenge: {
      situationKo: '민수에게 하루를 훈훈하게 마무리하며 밤 인사를 보낼 때, 가장 따뜻하고 올바른 한국어 인사는?',
      situationEn: 'Wishing Minsu a warm good night to conclude the day. What is the best Korean phrase?',
      koreanFriendPrompt: '오늘 하루도 대화 나눠줘서 정말 고마웠어. 편안한 밤 보내!',
      options: [
        {
          id: 'rp-6-1',
          korean: '나도 오늘 정말 즐거웠어! 민수야, 잘 자고 좋은 꿈 꿔!',
          romanization: 'Na-do o-neul jeong-mal jeul-geo-wot-eo! Min-su-ya, jal ja-go jo-eun kkum kkwo!',
          translationByCountry: {
            US: 'I had so much fun too! Good night Minsu, sweet dreams!',
            JP: '私も今日本当に楽しかったよ！ミンスくん、おやすみ、いい夢見てね！',
            CN: '我也超级开心！民秀，晚安，做个好梦！',
            VN: 'Tớ cũng vui lắm luôn! Minsu à, ngủ ngon và mơ đẹp nha!',
            ES: '¡Yo también la pasé genial! ¡Buenas noches Minsu, que tengas dulces sueños!',
            FR: 'Moi aussi j’ai adoré ! Bonne nuit Minsu, fais de beaux rêves !',
            DE: 'Ich hatte auch so viel Spaß! Gute Nacht Minsu, träum was Schönes!',
            ID: 'Aku juga senang banget hari ini! Minsu, selamat tidur dan mimpi indah ya!',
            TH: 'ฉันก็สนุกมากเหมือนกัน! มินซู ฝันดีนะ!',
            BR: 'Eu curti demais também! Boa noite Minsu, bons sonhos!'
          },
          isCorrect: true,
          friendReactionKo: '고마워! 너도 오늘 밤 돼지꿈 꾸고 대박 나길 바랄게~ 안녕!',
          friendReactionEn: 'Thank you! Hope you dream of lucky pigs tonight and strike gold! Good night!'
        },
        {
          id: 'rp-6-2',
          korean: '빨리 일어나세요, 지각입니다!',
          romanization: 'Ppal-ri il-eo-na-se-yo, ji-gak-im-ni-da!',
          translationByCountry: {
            US: 'Wake up quickly, you are late!',
            JP: '早く起きてください、遅刻です！',
            CN: '快点起床，要迟到了！',
            VN: 'Dậy mau lên, trễ giờ rồi!',
            ES: '¡Despiértate rápido, vas a llegar tarde!',
            FR: 'Réveille-toi vite, tu es en retard !',
            DE: 'Wach schnell auf, du bist zu spät!',
            ID: 'Cepat bangun, sudah telat nih!',
            TH: 'รีบตื่นเร็ว สายแล้ว!',
            BR: 'Acorda rápido, tá atrasado!'
          },
          isCorrect: false,
          friendReactionKo: '지금 잘 시간인데 갑자기 지각이라고 깨우면 가슴이 철렁 내려앉잖아! 크크',
          friendReactionEn: 'We are trying to sleep, shouting that I’m late gave me a heart attack! Haha'
        }
      ]
    }
  }
];
