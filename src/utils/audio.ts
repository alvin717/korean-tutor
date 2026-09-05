import { FanfareThemeId, FanfareThemeOption } from '../types';

export const FANFARE_THEMES: FanfareThemeOption[] = [
  {
    id: 'classic',
    nameKo: '클래식 로열 브라스',
    nameEn: 'Classic Royal Brass',
    icon: '🎺',
    descKo: '황실의 승전보를 알리는 당당한 금관 트럼펫 팡파레',
    descEn: 'Triumphant brass trumpet fanfare with sparkle',
    tag: '위풍당당',
  },
  {
    id: 'arcade',
    nameKo: '8비트 아케이드 레벨업',
    nameEn: '8-Bit Arcade Level Up',
    icon: '👾',
    descKo: '레트로 게임보이의 짜릿하고 톡톡 튀는 승리 효과음',
    descEn: 'Crisp retro 8-bit chiptune victory jingle',
    tag: '레트로 칩튠',
  },
  {
    id: 'champion',
    nameKo: '오케스트라 챔피언',
    nameEn: 'Orchestra Champion',
    icon: '🏛️',
    descKo: '시상식 트로피 수여식의 웅장한 대합주 화음과 펀치',
    descEn: 'Majestic orchestral champion fanfare with deep bass',
    tag: '웅장한 화음',
  },
  {
    id: 'sparkle',
    nameKo: '매직 스파클 크리스탈 벨',
    nameEn: 'Magic Sparkle Chimes',
    icon: '✨',
    descKo: '은하수 별가루가 쏟아져 내리는 맑고 영롱한 크리스털 벨',
    descEn: 'Enchanting crystal chimes like falling stardust',
    tag: '영롱한 별빛',
  },
  {
    id: 'festival',
    nameKo: '페스티벌 삼바 카니발',
    nameEn: 'Festival Carnival Samba',
    icon: '🎉',
    descKo: '축제 퍼레이드의 흥겨운 싱코페이션 바운스 리듬',
    descEn: 'Uplifting syncopated carnival celebration groove',
    tag: '흥겨운 리듬',
  },
];

class SoundEffects {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private preferredFanfareTheme: FanfareThemeId | 'random' = 'random';
  private lastPlayedFanfare: FanfareThemeId = 'classic';
  private listeners: ((theme: FanfareThemeId) => void)[] = [];

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('korean_learner_fanfare_theme');
        if (saved && (saved === 'random' || FANFARE_THEMES.some(t => t.id === saved))) {
          this.preferredFanfareTheme = saved as FanfareThemeId | 'random';
        }
      } catch {
        // Ignore
      }
    }
  }

  public getFanfareTheme(): FanfareThemeId | 'random' {
    return this.preferredFanfareTheme;
  }

  public setFanfareTheme(theme: FanfareThemeId | 'random') {
    this.preferredFanfareTheme = theme;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('korean_learner_fanfare_theme', theme);
      } catch {
        // Ignore
      }
    }
  }

  public getLastPlayedFanfare(): FanfareThemeId {
    return this.lastPlayedFanfare;
  }

  public onFanfarePlay(listener: (theme: FanfareThemeId) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyFanfare(theme: FanfareThemeId) {
    this.listeners.forEach(l => {
      try {
        l(theme);
      } catch {
        // Ignore
      }
    });
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Duolingo-style crisp positive arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {
      // Ignore audio errors gracefully
    }
  }

  /**
   * Play celebratory fanfare for correct answers & quiz completions.
   * Can play a specific theme or randomly rotate among 5 distinct musical themes.
   */
  public playFanfare(requestedTheme?: FanfareThemeId | 'random') {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      let targetTheme: FanfareThemeId;
      const preference = requestedTheme || this.preferredFanfareTheme;

      if (preference === 'random') {
        const allThemes: FanfareThemeId[] = ['classic', 'arcade', 'champion', 'sparkle', 'festival'];
        // Pick among remaining themes to avoid consecutive repetition
        const candidates = allThemes.filter(t => t !== this.lastPlayedFanfare);
        targetTheme = candidates[Math.floor(Math.random() * candidates.length)] || 'classic';
      } else {
        targetTheme = preference;
      }

      this.lastPlayedFanfare = targetTheme;
      this.notifyFanfare(targetTheme);

      const now = this.ctx.currentTime;
      switch (targetTheme) {
        case 'arcade':
          this.playArcadeFanfare(now);
          break;
        case 'champion':
          this.playChampionFanfare(now);
          break;
        case 'sparkle':
          this.playSparkleFanfare(now);
          break;
        case 'festival':
          this.playFestivalFanfare(now);
          break;
        case 'classic':
        default:
          this.playClassicFanfare(now);
          break;
      }
    } catch {
      // Ignore audio errors gracefully
    }
  }

  /**
   * Fanfare 1: Classic Royal Brass
   * Ascending triumphant brass trumpet fanfare with overtone sparkle
   */
  private playClassicFanfare(now: number) {
    if (!this.ctx) return;
    const notes = [
      { freq: 392.00, delay: 0, dur: 0.12 },     // G4
      { freq: 523.25, delay: 0.08, dur: 0.12 },   // C5
      { freq: 659.25, delay: 0.16, dur: 0.14 },   // E5
      { freq: 783.99, delay: 0.26, dur: 0.16 },   // G5
      { freq: 1046.50, delay: 0.38, dur: 0.55 },  // C6
    ];

    notes.forEach(({ freq, delay, dur }) => {
      if (!this.ctx) return;
      // Main trumpet body
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.20, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.05);

      // Subtle brass overtone
      const overtone = this.ctx.createOscillator();
      const otGain = this.ctx.createGain();
      overtone.type = 'sawtooth';
      overtone.frequency.setValueAtTime(freq, now + delay);

      otGain.gain.setValueAtTime(0, now + delay);
      otGain.gain.linearRampToValueAtTime(0.05, now + delay + 0.02);
      otGain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur * 0.8);

      overtone.connect(otGain);
      otGain.connect(this.ctx.destination);
      overtone.start(now + delay);
      overtone.stop(now + delay + dur + 0.05);
    });

    // High celebration sparkle shimmer (C7 overtone)
    const shimmer = this.ctx.createOscillator();
    const shimmerGain = this.ctx.createGain();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(2093.00, now + 0.38);
    shimmerGain.gain.setValueAtTime(0.08, now + 0.38);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.90);

    shimmer.connect(shimmerGain);
    shimmerGain.connect(this.ctx.destination);
    shimmer.start(now + 0.38);
    shimmer.stop(now + 0.95);
  }

  /**
   * Fanfare 2: 8-Bit Arcade Level Up
   * High-speed retro chiptune square-wave arpeggio with celebratory star finish
   */
  private playArcadeFanfare(now: number) {
    if (!this.ctx) return;
    // Rapid ascending 8-bit scale
    const arpeggio = [
      { freq: 523.25, delay: 0.00, dur: 0.05 },  // C5
      { freq: 659.25, delay: 0.05, dur: 0.05 },  // E5
      { freq: 783.99, delay: 0.10, dur: 0.05 },  // G5
      { freq: 987.77, delay: 0.15, dur: 0.05 },  // B5
      { freq: 1046.50, delay: 0.20, dur: 0.06 }, // C6
      { freq: 1318.51, delay: 0.26, dur: 0.07 }, // E6
    ];

    arpeggio.forEach(({ freq, delay, dur }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.12, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    });

    // Retro two-stage victory chord
    const finalChord1 = [783.99, 1318.51]; // G5 + E6
    finalChord1.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + 0.34);

      gain.gain.setValueAtTime(0, now + 0.34);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.44);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.34);
      osc.stop(now + 0.46);
    });

    // High triumphant power chord (C6 + G6 + C7)
    const finalChord2 = [1046.50, 1567.98, 2093.00];
    finalChord2.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, now + 0.46);

      gain.gain.setValueAtTime(0, now + 0.46);
      gain.gain.linearRampToValueAtTime(0.13, now + 0.47);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.90);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.46);
      osc.stop(now + 0.95);
    });
  }

  /**
   * Fanfare 3: Orchestra Champion Majestic
   * Grand cinematic brass chord hits with deep drum impact and massive major triad
   */
  private playChampionFanfare(now: number) {
    if (!this.ctx) return;

    // Deep sub-bass boom impact
    const kick = this.ctx.createOscillator();
    const kickGain = this.ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(140, now);
    kick.frequency.exponentialRampToValueAtTime(45, now + 0.22);
    kickGain.gain.setValueAtTime(0.20, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    kick.connect(kickGain);
    kickGain.connect(this.ctx.destination);
    kick.start(now);
    kick.stop(now + 0.25);

    // Hit 1: F Major triad (F4, A4, C5)
    const hit1 = [349.23, 440.00, 523.25];
    hit1.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    });

    // Hit 2: G Major triad (G4, B4, D5)
    const hit2 = [392.00, 493.88, 587.33];
    hit2.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.16);

      gain.gain.setValueAtTime(0, now + 0.16);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.30);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.16);
      osc.stop(now + 0.32);
    });

    // Grand Finale: Massive C Major chord (C4, G4, C5, E5, G5, C6)
    const finale = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    finale.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = i % 2 === 0 ? 'triangle' : 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + 0.34);

      gain.gain.setValueAtTime(0, now + 0.34);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.36);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.34);
      osc.stop(now + 1.0);
    });
  }

  /**
   * Fanfare 4: Magic Sparkle Chimes
   * Cascading pure crystal chime bells with dreamy echo reverberation
   */
  private playSparkleFanfare(now: number) {
    if (!this.ctx) return;

    // Beautiful celestial arpeggio (E Major 7 / 9 scale)
    const bells = [
      { freq: 659.25, delay: 0.00, dur: 0.50 },  // E5
      { freq: 830.61, delay: 0.06, dur: 0.52 },  // G#5
      { freq: 987.77, delay: 0.12, dur: 0.55 },  // B5
      { freq: 1318.51, delay: 0.18, dur: 0.60 }, // E6
      { freq: 1661.22, delay: 0.24, dur: 0.65 }, // G#6
      { freq: 1975.53, delay: 0.30, dur: 0.70 }, // B6
      { freq: 2637.02, delay: 0.38, dur: 0.85 }, // E7 (Crystal Star Peak)
    ];

    bells.forEach(({ freq, delay, dur }) => {
      if (!this.ctx) return;
      // Fundamental pure tone
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.14, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.05);

      // Glassy harmonic overtone
      const overtone = this.ctx.createOscillator();
      const otGain = this.ctx.createGain();
      overtone.type = 'sine';
      overtone.frequency.setValueAtTime(freq * 2.76, now + delay); // Metallic bell ratio

      otGain.gain.setValueAtTime(0, now + delay);
      otGain.gain.linearRampToValueAtTime(0.04, now + delay + 0.01);
      otGain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur * 0.4);

      overtone.connect(otGain);
      otGain.connect(this.ctx.destination);
      overtone.start(now + delay);
      overtone.stop(now + delay + dur + 0.05);
    });
  }

  /**
   * Fanfare 5: Festival Carnival Samba
   * Syncopated rhythmic celebration bounce with Latin carnival flair
   */
  private playFestivalFanfare(now: number) {
    if (!this.ctx) return;

    // Rhythmic bounce melody: Da! Da! Da-da-da! Ba-bam!
    const rhythmicNotes = [
      { freq: 523.25, delay: 0.00, dur: 0.09 }, // C5
      { freq: 659.25, delay: 0.12, dur: 0.09 }, // E5
      { freq: 783.99, delay: 0.22, dur: 0.07 }, // G5
      { freq: 880.00, delay: 0.29, dur: 0.07 }, // A5
      { freq: 783.99, delay: 0.36, dur: 0.09 }, // G5
    ];

    rhythmicNotes.forEach(({ freq, delay, dur }) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);

      // Percussive click accent (like an agogo bell)
      const click = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      click.type = 'sine';
      click.frequency.setValueAtTime(1760, now + delay);
      clickGain.gain.setValueAtTime(0.06, now + delay);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.04);
      click.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      click.start(now + delay);
      click.stop(now + delay + 0.05);
    });

    // Big Carnival Double Finish
    // Punch 1 (0.47s): E5 + G5
    const punch1 = [659.25, 783.99];
    punch1.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.46);
      gain.gain.setValueAtTime(0, now + 0.46);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.47);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.46);
      osc.stop(now + 0.57);
    });

    // Punch 2 (0.58s): C6 + E6 + G6 Grand Samba Splash!
    const punch2 = [1046.50, 1318.51, 1567.98];
    punch2.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + 0.58);
      gain.gain.setValueAtTime(0, now + 0.58);
      gain.gain.linearRampToValueAtTime(0.19, now + 0.59);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + 0.58);
      osc.stop(now + 1.10);
    });
  }

  public playError() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }

  public playTap() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Ignore
    }
  }

  public playStreakFanfare() {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C major
      chord.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.65);
      });
    } catch {
      // Ignore
    }
  }
}

export const sounds = new SoundEffects();

let cachedVoices: SpeechSynthesisVoice[] = [];

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  const loadVoices = () => {
    try {
      cachedVoices = window.speechSynthesis.getVoices();
    } catch {
      // Ignore
    }
  };
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function getAvailableVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  try {
    cachedVoices = window.speechSynthesis.getVoices();
  } catch {
    // Ignore
  }
  return cachedVoices;
}

/**
 * Cancel any ongoing speech synthesis
 */
export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
}

/**
 * Native Web Speech API Text-to-Speech for Korean words and sentences
 */
export function speakKorean(text: string, rate: number = 0.85): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick a Korean voice if available
    const voices = getAvailableVoices();
    const koreanVoice = voices.find(v =>
      v.lang.toLowerCase().startsWith('ko') ||
      v.name.includes('Korean') ||
      v.name.includes('한국') ||
      v.name.includes('Yuna') ||
      v.name.includes('Heami')
    );
    if (koreanVoice) {
      utterance.voice = koreanVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Korean TTS error:', err);
    return false;
  }
}

/**
 * Native Web Speech API Text-to-Speech for English words and sentences with authentic English voice
 */
export function speakEnglish(text: string, rate: number = 0.9): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = getAvailableVoices();
    const englishVoice = voices.find(v =>
      (v.lang === 'en-US' || v.lang.startsWith('en')) &&
      (v.name.includes('Natural') ||
       v.name.includes('Google') ||
       v.name.includes('Samantha') ||
       v.name.includes('Daniel') ||
       v.name.includes('Jenny') ||
       v.name.includes('Zira') ||
       v.name.includes('US English'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('English TTS error:', err);
    return false;
  }
}

/**
 * Multi-language native speech synthesis for learner's native language
 * (e.g. ja-JP, zh-CN, vi-VN, es-ES, fr-FR, de-DE, id-ID, th-TH, pt-BR)
 */
export function speakForeign(text: string, langCode: string = 'en-US', rate: number = 0.9): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  try {
    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langCode;
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voices = getAvailableVoices();
    const prefix = langCode.split('-')[0].toLowerCase();
    const matchVoice = voices.find(v =>
      v.lang.toLowerCase() === langCode.toLowerCase() ||
      v.lang.toLowerCase().startsWith(prefix)
    );

    if (matchVoice) {
      utterance.voice = matchVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Foreign TTS error:', err);
    return false;
  }
}

/**
 * Intelligently speak text using Korean or English pronunciation based on content or hint
 */
export function speakByLanguage(text: string, langHint?: 'kr' | 'en'): boolean {
  if (langHint === 'en') {
    return speakEnglish(text);
  }
  if (langHint === 'kr') {
    return speakKorean(text);
  }
  const hasHangul = /[\uac00-\ud7af\u1100-\u11ff]/.test(text);
  return hasHangul ? speakKorean(text) : speakEnglish(text);
}
