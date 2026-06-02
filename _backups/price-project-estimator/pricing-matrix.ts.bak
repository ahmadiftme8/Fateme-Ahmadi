/**
 * Base prices for each service type (in USD)
 */
export const BASE_PRICES: Record<string, number> = {
  GRAPHIC_DESIGN: 100,
  VIDEO_AI_CONTENT: 150,
  UI_UX_DESIGN: 200,
  WEBSITE_DEV: 280,
  WEB_APP: 450,
  FULL_PACKAGE: 600,
};

/**
 * Complexity multipliers based on combined score from Q2, Q3, Q4
 * Score ranges:
 * - Low (3-4): Simple projects
 * - Medium (5-6): Moderate complexity
 * - High (7-9): Complex projects
 */
export const COMPLEXITY_MULTIPLIERS = {
  LOW: 1.2,    // Score 3-4
  MEDIUM: 2.0, // Score 5-6
  HIGH: 4.5,   // Score 7-9
};

/**
 * Budget thresholds for detecting budget gaps
 * These represent the approximate upper limit for each budget tier
 */
export const BUDGET_THRESHOLDS: Record<string, number> = {
  economy: 500,
  standard: 1200,
  premium: 5000,
};

/**
 * Price range variance - used to show min/max range
 * e.g., 0.15 means ±15% from calculated price
 */
export const PRICE_VARIANCE = 0.15;
