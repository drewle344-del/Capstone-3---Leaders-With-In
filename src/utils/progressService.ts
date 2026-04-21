// Progress and Level System

export interface LevelThreshold {
  level: number;
  requiredXP: number;
}

export interface UserProgress {
  total_xp: number;
  level: number;
  completed_scenarios: number[];
  history: ProgressEntry[];
}

export interface ProgressEntry {
  scenario_id: number;
  xp_earned: number;
  bonus_xp_earned: number;
  was_best_answer: boolean;
  timestamp: string;
}

// Level thresholds: exponential progression
export const LEVEL_THRESHOLDS: LevelThreshold[] = [
  { level: 1, requiredXP: 0 },
  { level: 2, requiredXP: 50 },
  { level: 3, requiredXP: 120 },
  { level: 4, requiredXP: 200 },
  { level: 5, requiredXP: 300 },
  { level: 6, requiredXP: 420 },
  { level: 7, requiredXP: 560 },
  { level: 8, requiredXP: 720 },
  { level: 9, requiredXP: 900 },
  { level: 10, requiredXP: 1100 },
];

// XP amounts
export const BASE_XP_PER_SCENARIO = 10;
export const BONUS_XP_FOR_BEST_ANSWER = 5;

/**
 * Calculate current level based on total XP
 */
export const calculateLevel = (totalXP: number): number => {
  let currentLevel = 1;
  
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i].requiredXP) {
      currentLevel = LEVEL_THRESHOLDS[i].level;
      break;
    }
  }
  
  return currentLevel;
};

/**
 * Get XP required for next level
 */
export const getNextLevelXP = (currentLevel: number): number => {
  const nextLevel = currentLevel + 1;
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === nextLevel);
  return threshold ? threshold.requiredXP : LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1].requiredXP;
};

/**
 * Get current level's required XP
 */
export const getCurrentLevelXP = (currentLevel: number): number => {
  const threshold = LEVEL_THRESHOLDS.find(t => t.level === currentLevel);
  return threshold ? threshold.requiredXP : 0;
};

/**
 * Calculate XP progress toward next level (as percentage)
 */
export const getProgressPercentage = (totalXP: number, currentLevel: number): number => {
  const currentLevelXP = getCurrentLevelXP(currentLevel);
  const nextLevelXP = getNextLevelXP(currentLevel);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  if (xpNeededForLevel === 0) return 100;
  return Math.min((xpInCurrentLevel / xpNeededForLevel) * 100, 100);
};

/**
 * Get XP progress details towards next level
 */
export const getProgressDetails = (totalXP: number, currentLevel: number) => {
  const currentLevelXP = getCurrentLevelXP(currentLevel);
  const nextLevelXP = getNextLevelXP(currentLevel);
  const xpInCurrentLevel = totalXP - currentLevelXP;
  const xpNeededForLevel = nextLevelXP - currentLevelXP;

  return {
    currentXP: xpInCurrentLevel,
    requiredXP: xpNeededForLevel,
    percentage: getProgressPercentage(totalXP, currentLevel),
  };
};

/**
 * Calculate XP earned for a scenario
 */
export const calculateXPEarned = (wasBestAnswer: boolean): { baseXP: number; bonusXP: number } => {
  return {
    baseXP: BASE_XP_PER_SCENARIO,
    bonusXP: wasBestAnswer ? BONUS_XP_FOR_BEST_ANSWER : 0,
  };
};

/**
 * Create default user progress
 */
export const getDefaultProgress = (): UserProgress => ({
  total_xp: 0,
  level: 1,
  completed_scenarios: [],
  history: [],
});

/**
 * Load progress from localStorage
 */
export const loadProgress = (): UserProgress => {
  const saved = localStorage.getItem('leadershipProgress');
  if (saved) {
    return JSON.parse(saved);
  }
  return getDefaultProgress();
};

/**
 * Save progress to localStorage
 */
export const saveProgress = (progress: UserProgress): void => {
  localStorage.setItem('leadershipProgress', JSON.stringify(progress));
};

/**
 * Add scenario completion and update progress
 */
export const addScenarioCompletion = (
  progress: UserProgress,
  scenarioId: number,
  wasBestAnswer: boolean
): { updatedProgress: UserProgress; leveledUp: boolean; oldLevel: number; newLevel: number } => {
  const { baseXP, bonusXP } = calculateXPEarned(wasBestAnswer);
  const oldLevel = progress.level;

  // Update progress
  progress.total_xp += baseXP + bonusXP;
  progress.completed_scenarios.push(scenarioId);
  progress.history.push({
    scenario_id: scenarioId,
    xp_earned: baseXP,
    bonus_xp_earned: bonusXP,
    was_best_answer: wasBestAnswer,
    timestamp: new Date().toISOString(),
  });

  // Recalculate level
  const newLevel = calculateLevel(progress.total_xp);
  progress.level = newLevel;

  const leveledUp = newLevel > oldLevel;

  return {
    updatedProgress: progress,
    leveledUp,
    oldLevel,
    newLevel,
  };
};
