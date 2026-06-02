"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCcw, BriefcaseBusiness, CheckCircle2 } from 'lucide-react';
import { quizQuestions } from '@/data/quiz-questions';
import { calculateEstimate, formatPrice, getServiceLabel, QuizAnswers } from '@/utils/estimator-logic';
import QuizStep from './QuizStep';
import styles from './ScopeQuiz.module.css';

type QuizState = 'intro' | 'quiz' | 'results';

export default function ScopeQuiz() {
  const [state, setState] = useState<QuizState>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});

  const currentQuestion = quizQuestions[currentStep];
  const isLastQuestion = currentStep === quizQuestions.length - 1;
  const isFirstQuestion = currentStep === 0;
  const hasAnswer = currentQuestion && answers[currentQuestion.id];

  const handleStart = () => {
    setState('quiz');
    setCurrentStep(0);
    setAnswers({});
  };

  const handleSelect = (value: string) => {
    if (currentQuestion) {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setState('results');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (isFirstQuestion) {
      setState('intro');
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentStep(0);
    setAnswers({});
  };

  // Format counter (01 / 05)
  const stepNumber = (currentStep + 1).toString().padStart(2, '0');
  const totalSteps = quizQuestions.length.toString().padStart(2, '0');

  // Calculate results
  const result = state === 'results' ? calculateEstimate(answers) : null;

  return (
    <section className={styles.container} id="estimator">
      <AnimatePresence mode="wait">
        {state === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={styles.introCard}
          >
            <div className={styles.introHero}>
              <div className={styles.introIconWrapper}>
                <Sparkles className={styles.heroIcon} />
              </div>
              <h2 className={styles.introTitle}>PROJECT ESTIMATOR</h2>
              <p className={styles.introSubtitle}>
                Find the right service tier for your needs in 30 seconds.
              </p>
            </div>
            
            <div className={styles.introContent}>
              <ul className={styles.benefitsList}>
                <li><CheckCircle2 size={16} className={styles.checkmarkIcon} /> Tailored recommendations</li>
                <li><CheckCircle2 size={16} className={styles.checkmarkIcon} /> Instant estimated ranges</li>
                <li><CheckCircle2 size={16} className={styles.checkmarkIcon} /> No hidden commitments</li>
              </ul>
              
              <button className={styles.startButton} onClick={handleStart}>
                Start Assessment <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {state === 'quiz' && currentQuestion && (
          <motion.div
            key={`question-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={styles.quizCard}
          >
            <QuizStep
              question={currentQuestion}
              selectedValue={answers[currentQuestion.id] || null}
              onSelect={handleSelect}
              stepNumber={stepNumber}
              totalSteps={totalSteps}
            />

            <div className={styles.navButtons}>
              <button 
                className={styles.backButton} 
                onClick={handleBack}
              >
                ← Back
              </button>
              <button 
                className={styles.primaryActionPill} 
                onClick={handleNext}
                disabled={!hasAnswer}
              >
                {isLastQuestion ? 'SEE RESULTS' : 'NEXT STEP'}
              </button>
            </div>
          </motion.div>
        )}

        {state === 'results' && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={styles.resultsCard}
          >
            <div className={styles.introHero}>
              <h2 className={styles.introTitle}>YOUR ESTIMATE</h2>
              <p className={styles.introSubtitle}>{getServiceLabel(result.serviceType)}</p>
              <div className={styles.complexityBadge}>
                {result.complexityLevel} COMPLEXITY
              </div>
            </div>
            
            <div className={styles.introContent}>
              <div className={styles.priceDisplay}>
                <div className={styles.priceValue} style={{ color: 'var(--color-primary)' }}>
                  {formatPrice(result.minPrice)} — {formatPrice(result.maxPrice)}
                </div>
              </div>

              {result.isBudgetGap && (
                <div className={styles.budgetTip}>
                  <div className={styles.tipIcon}>💡</div>
                  <p style={{ color: 'var(--color-primary)', opacity: 0.8 }}>Range reflects advanced features selected in Step 4.</p>
                </div>
              )}

              <Link href="https://calendar.app.google/rjUiNwzF5sr7WvCY7" target="_blank" className={styles.ctaActionPill}>
                BOOK A CALL <BriefcaseBusiness size={18} />
              </Link>

              <div className={styles.restartAction}>
                <button className={styles.restartButton} onClick={handleRestart}>
                  <RefreshCcw size={12} />
                  RESTART
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
