import confetti from 'canvas-confetti';

/**
 * Fires an energetic dual-cannon firework fanfare when a question is correctly answered!
 * Launches multi-colored bursts from bottom-left and bottom-right upwards,
 * followed by a center star sparkle burst.
 */
export function triggerCorrectFireworks() {
  if (typeof window === 'undefined') return;

  // Left cannon: bursts up and towards center
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 65,
    origin: { x: 0.12, y: 0.82 },
    colors: ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#3B82F6', '#EC4899'],
    ticks: 180,
    gravity: 1.1,
    scalar: 1.15,
    zIndex: 9999,
  });

  // Right cannon: bursts up and towards center
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 65,
    origin: { x: 0.88, y: 0.82 },
    colors: ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#8B5CF6', '#F43F5E'],
    ticks: 180,
    gravity: 1.1,
    scalar: 1.15,
    zIndex: 9999,
  });

  // Center sparkling golden stars pop
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 90,
      origin: { x: 0.5, y: 0.62 },
      shapes: ['star'],
      colors: ['#F59E0B', '#FCD34D', '#FBBF24', '#10B981', '#FFFFFF'],
      scalar: 1.35,
      ticks: 160,
      zIndex: 9999,
    });
  }, 130);
}

/**
 * Grand finale fireworks show when a full lesson is completed!
 * Multiple firework bursts exploding in sequence across the screen.
 */
export function triggerGrandLessonFireworks() {
  if (typeof window === 'undefined') return;

  const duration = 2.2 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 80, zIndex: 9999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left explosion
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.45), y: Math.random() * 0.4 + 0.15 },
      colors: ['#10B981', '#F59E0B', '#6366F1', '#EC4899', '#FBBF24'],
    });

    // Right explosion
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.55, 0.85), y: Math.random() * 0.4 + 0.15 },
      colors: ['#3B82F6', '#10B981', '#F59E0B', '#A855F7', '#EC4899'],
    });
  }, 220);
}
