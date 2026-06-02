"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { QuizQuestion } from '@/data/quiz-questions';
import styles from './ScopeQuiz.module.css';

type QuizStepProps = {
  question: QuizQuestion;
  selectedValue: string | null;
  onSelect: (value: string) => void;
  stepNumber: string;
  totalSteps: string;
};

export default function QuizStep({ question, selectedValue, onSelect, stepNumber, totalSteps }: QuizStepProps) {
  // Dynamically get the icon from lucide-react
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[question.icon || 'HelpCircle'] || LucideIcons.HelpCircle;

  return (
    <div className={styles.stepContainer}>
      <div className={styles.introHero}>
        <div className={styles.headerTitleGroup}>
          {IconComponent && (
            <IconComponent className={styles.headerIcon} strokeWidth={2.5} />
          )}
          <h3 className={styles.questionTitle}>{question.title}</h3>
        </div>
        <div className={styles.stepCounter}>
          {stepNumber} / {totalSteps}
        </div>
      </div>
      
      <div className={styles.introContent}>
        <div className={`${styles.optionsStack} ${question.id === 'q1-service' ? styles.gridOptions : ''}`}>
          {question.options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${question.id === 'q1-service' ? styles.optionSquare : styles.optionPill} ${selectedValue === option.value ? styles.optionSelected : ''}`}
              onClick={() => onSelect(option.value)}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
