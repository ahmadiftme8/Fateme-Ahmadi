# Price/Project Estimator Backup

The estimator was removed from the live site on 2026-06-02.

These files are intentionally stored with `.bak` extensions so they are not compiled by TypeScript or included in the Next.js production bundle.

To restore the section:

1. Move each file back to its original path and remove the `.bak` suffix:
   - `ScopeQuiz.tsx.bak` -> `components/estimator/ScopeQuiz.tsx`
   - `QuizStep.tsx.bak` -> `components/estimator/QuizStep.tsx`
   - `ScopeQuiz.module.css.bak` -> `components/estimator/ScopeQuiz.module.css`
   - `quiz-questions.ts.bak` -> `data/quiz-questions.ts`
   - `estimator-logic.ts.bak` -> `utils/estimator-logic.ts`
   - `pricing-matrix.ts.bak` -> `config/pricing-matrix.ts`
2. Add this import back to `app/[locale]/page.tsx`:
   ```ts
   import ScopeQuiz from "@/components/estimator/ScopeQuiz";
   ```
3. Render `<ScopeQuiz />` in the home page where the estimator should appear.

