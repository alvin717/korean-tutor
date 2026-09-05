// FSRS (Free Spaced Repetition Scheduler) and HLR simulation helper

export interface CalculationResult {
  newStability: number;
  newDifficulty: number;
  retrievability: number;
  nextIntervalDays: number;
  nextReviewDateString: string;
}

export function simulateFsrsReview(
  currentStability: number,
  currentDifficulty: number,
  lastReviewedDaysAgo: number,
  grade: 1 | 2 | 3 | 4 // 1: Again, 2: Hard, 3: Good, 4: Easy
): CalculationResult {
  // Retrievability before review based on power law
  const retrievability = Math.max(
    0.01,
    Math.min(1.0, Math.pow(1.0 + 0.19 * (lastReviewedDaysAgo / Math.max(0.1, currentStability)), -0.5))
  );

  // Difficulty adjustment
  const deltaD = -0.86 * (grade - 3);
  const rawDifficulty = currentDifficulty + deltaD;
  const meanReversion = 0.01 * 5.0 + 0.99 * Math.max(1.0, Math.min(10.0, rawDifficulty));
  const newDifficulty = Number(meanReversion.toFixed(2));

  // Stability adjustment
  let newStability: number;
  if (grade === 1) {
    // Lapse (Failed)
    newStability = Math.max(0.2, 0.4 * Math.pow(newDifficulty, -0.3) * Math.pow(currentStability + 1, 0.2));
  } else {
    // Successful recall
    const hardPenalty = grade === 2 ? 0.75 : 1.0;
    const easyBonus = grade === 4 ? 1.35 : 1.0;
    const boostFactor =
      Math.exp(1.49) *
      (11 - newDifficulty) *
      Math.pow(Math.max(0.5, currentStability), -0.14) *
      Math.max(0.1, Math.exp((1 - retrievability) * 0.94) - 1) *
      hardPenalty *
      easyBonus;

    newStability = currentStability * (1.0 + Math.min(4.0, Math.max(0.1, boostFactor * 0.2)));
  }
  newStability = Number(newStability.toFixed(2));

  // Desired target retention = 90%
  const targetRetention = 0.90;
  const nextIntervalDays = Math.max(
    1,
    Math.round(newStability * (Math.pow(targetRetention, -2.0) - 1.0) / 0.19)
  );

  const nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + nextIntervalDays);
  const nextReviewDateString = nextDate.toISOString().split('T')[0];

  return {
    newStability,
    newDifficulty,
    retrievability: Number(retrievability.toFixed(3)),
    nextIntervalDays,
    nextReviewDateString
  };
}
