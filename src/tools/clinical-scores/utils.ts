import { UREA_TO_BUN_CONVERSION, UREA_MMOL_THRESHOLD } from './constants.js';
import type { ClinicalGuidance, RenalScoreResult } from './types.js';
import { CLINICAL_GUIDANCE } from './guidance.js';
import {
  SOFA_URINE_OUTPUT_THRESHOLD_CRITICAL,
  SOFA_URINE_OUTPUT_THRESHOLD_SEVERE,
  SOFA_CREATININE_THRESHOLD_CRITICAL,
  SOFA_CREATININE_THRESHOLD_SEVERE,
  SOFA_CREATININE_THRESHOLD_MODERATE,
  SOFA_CREATININE_THRESHOLD_MILD,
} from './constants.js';

export const convertUreaToBUN = (urea: number): number => {
  const isLikelyMmol = urea <= UREA_MMOL_THRESHOLD;
  return isLikelyMmol ? urea * UREA_TO_BUN_CONVERSION : urea;
};

export const normalizeFiO2 = (fio2: number): number => {
  return fio2 > 1 ? fio2 / 100 : fio2;
};

export const formatEnumLabel = (value: string) => value.replace(/_/g, ' ');

export function getRiskGuidance(
  calculator: keyof typeof CLINICAL_GUIDANCE,
  score: number,
  context?: any
): ClinicalGuidance {
  const thresholds = CLINICAL_GUIDANCE[calculator];

  for (const { threshold, guidance } of thresholds) {
    if (score < threshold) {
      const interpretation = typeof guidance.interpretation === 'function'
        ? guidance.interpretation(score, context?.sex)
        : guidance.interpretation;
      const recommendation = typeof guidance.recommendation === 'function'
        ? guidance.recommendation(score, context?.sex)
        : guidance.recommendation;

      return {
        riskCategory: guidance.riskCategory,
        interpretation,
        recommendation,
      };
    }
  }

  const lastGuidance = thresholds[thresholds.length - 1].guidance;
  const interpretation = typeof lastGuidance.interpretation === 'function'
    ? lastGuidance.interpretation(score, context?.sex)
    : lastGuidance.interpretation;
  const recommendation = typeof lastGuidance.recommendation === 'function'
    ? lastGuidance.recommendation(score, context?.sex)
    : lastGuidance.recommendation;

  return {
    riskCategory: lastGuidance.riskCategory,
    interpretation,
    recommendation,
  };
}

export function calculateRenalScore(
  creatinine: number,
  urineOutput: number | undefined
): RenalScoreResult {
  if (urineOutput !== undefined && urineOutput < SOFA_URINE_OUTPUT_THRESHOLD_CRITICAL) {
    return {
      score: 4,
      detail: `Renal: Creatinine ${creatinine.toFixed(1)} mg/dL and urine output <${SOFA_URINE_OUTPUT_THRESHOLD_CRITICAL} mL/day = 4`,
    };
  }

  if (creatinine >= SOFA_CREATININE_THRESHOLD_CRITICAL) {
    return {
      score: 4,
      detail: `Renal: Creatinine ≥${SOFA_CREATININE_THRESHOLD_CRITICAL} mg/dL = 4`,
    };
  }

  if (urineOutput !== undefined && urineOutput < SOFA_URINE_OUTPUT_THRESHOLD_SEVERE) {
    return {
      score: 3,
      detail: `Renal: Creatinine ${creatinine.toFixed(1)} mg/dL and urine output <${SOFA_URINE_OUTPUT_THRESHOLD_SEVERE} mL/day = 3`,
    };
  }

  if (creatinine >= SOFA_CREATININE_THRESHOLD_SEVERE) {
    return {
      score: 3,
      detail: `Renal: Creatinine ≥${SOFA_CREATININE_THRESHOLD_SEVERE} mg/dL = 3`,
    };
  }

  if (creatinine >= SOFA_CREATININE_THRESHOLD_MODERATE) {
    return {
      score: 2,
      detail: `Renal: Creatinine ≥${SOFA_CREATININE_THRESHOLD_MODERATE} mg/dL = 2`,
    };
  }

  if (creatinine >= SOFA_CREATININE_THRESHOLD_MILD) {
    return {
      score: 1,
      detail: `Renal: Creatinine ≥${SOFA_CREATININE_THRESHOLD_MILD} mg/dL = 1`,
    };
  }

  return {
    score: 0,
    detail: `Renal: Creatinine <${SOFA_CREATININE_THRESHOLD_MILD} mg/dL = 0`,
  };
}
