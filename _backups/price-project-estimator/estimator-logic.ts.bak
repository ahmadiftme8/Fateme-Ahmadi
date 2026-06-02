import {
  BASE_PRICES,
  COMPLEXITY_MULTIPLIERS,
  BUDGET_THRESHOLDS,
  PRICE_VARIANCE,
} from '@/config/pricing-matrix';
import { quizQuestions } from '@/data/quiz-questions';

export type QuizAnswers = Record<string, string>;

export type EstimateResult = {
  minPrice: number;
  maxPrice: number;
  isBudgetGap: boolean;
  complexityLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  serviceType: string;
};

/**
 * Calculate the complexity score from Q2, Q3, Q4 answers
 */
function calculateComplexityScore(answers: QuizAnswers): number {
  const q2Question = quizQuestions.find(q => q.id === 'q2-status');
  const q3Question = quizQuestions.find(q => q.id === 'q3-stage');
  const q4Question = quizQuestions.find(q => q.id === 'q4-goals');

  let score = 0;

  // Get score from Q2 (status)
  const q2Option = q2Question?.options.find(o => o.value === answers['q2-status']);
  score += q2Option?.complexityScore ?? 0;

  // Get score from Q3 (stage)
  const q3Option = q3Question?.options.find(o => o.value === answers['q3-stage']);
  score += q3Option?.complexityScore ?? 0;

  // Get score from Q4 (goals)
  const q4Option = q4Question?.options.find(o => o.value === answers['q4-goals']);
  score += q4Option?.complexityScore ?? 0;

  return score;
}

/**
 * Determine complexity level from score
 */
function getComplexityLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (score <= 4) return 'LOW';
  if (score <= 6) return 'MEDIUM';
  return 'HIGH';
}

/**
 * Main calculation function - determines price range based on scope
 */
export function calculateEstimate(answers: QuizAnswers): EstimateResult {
  // Step 1: Get base price from service type (Q1)
  const serviceType = answers['q1-service'] || 'GRAPHIC_DESIGN';
  const basePrice = BASE_PRICES[serviceType] ?? BASE_PRICES.GRAPHIC_DESIGN;

  // Step 2: Calculate complexity multiplier from Q2, Q3, Q4
  const complexityScore = calculateComplexityScore(answers);
  const complexityLevel = getComplexityLevel(complexityScore);
  const multiplier = COMPLEXITY_MULTIPLIERS[complexityLevel];

  // Calculate the target price
  const calculatedPrice = basePrice * multiplier;

  // Calculate price range with variance
  const minPrice = Math.round(calculatedPrice * (1 - PRICE_VARIANCE));
  const maxPrice = Math.round(calculatedPrice * (1 + PRICE_VARIANCE));

  // Step 3: Reality check - compare to budget selection (Q5)
  const budgetSelection = answers['q5-budget'] || 'standard';
  const budgetThreshold = BUDGET_THRESHOLDS[budgetSelection] ?? BUDGET_THRESHOLDS.standard;
  
  // Budget gap exists if calculated min price exceeds their budget threshold
  const isBudgetGap = minPrice > budgetThreshold;

  return {
    minPrice,
    maxPrice,
    isBudgetGap,
    complexityLevel,
    serviceType,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}

/**
 * Get display label for service type
 */
export function getServiceLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    GRAPHIC_DESIGN: 'Visual Identity',
    VIDEO_AI_CONTENT: 'Video/AI Content',
    UI_UX_DESIGN: 'UI/UX Design',
    WEBSITE_DEV: 'Website Development',
    WEB_APP: 'Web Application',
    FULL_PACKAGE: 'Full Package',
  };
  return labels[serviceType] || serviceType;
}
