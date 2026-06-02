export type QuizOption = {
  value: string;
  label: string;
  complexityScore?: number; // Used for Q2, Q3, Q4 to calculate multiplier
};

export type QuizQuestion = {
  id: string;
  title: string;
  type: 'service' | 'status' | 'stage' | 'goals' | 'budget';
  icon?: string;
  options: QuizOption[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1-service',
    title: 'WHAT TYPE OF PROJECT ARE YOU LOOKING FOR?',
    type: 'service',
    icon: 'LayoutGrid',
    options: [
      { value: 'GRAPHIC_DESIGN', label: 'Visual Identity' },
      { value: 'WEBSITE_DEV', label: 'Website' },
      { value: 'WEB_APP', label: 'Web Application' },
      { value: 'UI_UX_DESIGN', label: 'UI/UX Design' },
      { value: 'VIDEO_AI_CONTENT', label: 'Video/AI Content' },
      { value: 'FULL_PACKAGE', label: 'Full Package' },
    ],
  },
  {
    id: 'q2-status',
    title: 'WHAT IS YOUR CURRENT PROJECT STATUS?',
    type: 'status',
    icon: 'Sparkles',
    options: [
      { value: 'scratch', label: 'From Scratch', complexityScore: 3 },
      { value: 'optimization', label: 'Optimization', complexityScore: 1 },
      { value: 'expansion', label: 'Expansion', complexityScore: 2 },
    ],
  },
  {
    id: 'q3-stage',
    title: 'WHAT STAGE IS YOUR BUSINESS AT?',
    type: 'stage',
    icon: 'Rocket',
    options: [
      { value: 'mvp', label: 'New Idea / MVP', complexityScore: 1 },
      { value: 'growing', label: 'Growing Business', complexityScore: 2 },
      { value: 'enterprise', label: 'Established Enterprise', complexityScore: 3 },
    ],
  },
  {
    id: 'q4-goals',
    title: 'WHAT ARE YOUR PROJECT GOALS?',
    type: 'goals',
    icon: 'Target',
    options: [
      { value: 'speed', label: 'Speed / Function', complexityScore: 1 },
      { value: 'aesthetics', label: 'High-End Aesthetics', complexityScore: 2 },
      { value: 'automation', label: 'Complex Automation', complexityScore: 3 },
    ],
  },
  {
    id: 'q5-budget',
    title: 'WHAT IS YOUR BUDGET COMFORT LEVEL?',
    type: 'budget',
    icon: 'Wallet',
    options: [
      { value: 'economy', label: 'Economy' },
      { value: 'standard', label: 'Standard' },
      { value: 'premium', label: 'Premium' },
    ],
  },
];
