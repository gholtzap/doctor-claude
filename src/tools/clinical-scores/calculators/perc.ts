import { z } from 'zod';
import { PERCInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance } from '../utils.js';
import {
  PERC_AGE_THRESHOLD,
  PERC_HEART_RATE_THRESHOLD,
  PERC_O2_SAT_THRESHOLD,
} from '../constants.js';

export function calculatePERC(inputs: z.infer<typeof PERCInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.age >= PERC_AGE_THRESHOLD) {
    score += 1;
    details.push(`Age ≥${PERC_AGE_THRESHOLD} years: +1`);
  }

  if (inputs.heartRate >= PERC_HEART_RATE_THRESHOLD) {
    score += 1;
    details.push(`Heart rate ≥${PERC_HEART_RATE_THRESHOLD} bpm: +1`);
  }

  if (inputs.oxygenSaturation < PERC_O2_SAT_THRESHOLD) {
    score += 1;
    details.push(`O2 saturation <${PERC_O2_SAT_THRESHOLD}% on room air: +1`);
  }

  if (inputs.unilateralLegSwelling) {
    score += 1;
    details.push('Unilateral leg swelling: +1');
  }

  if (inputs.hemoptysis) {
    score += 1;
    details.push('Hemoptysis: +1');
  }

  if (inputs.recentSurgeryOrTrauma) {
    score += 1;
    details.push('Recent surgery or trauma (within 4 weeks): +1');
  }

  if (inputs.priorPEorDVT) {
    score += 1;
    details.push('Prior PE or DVT: +1');
  }

  if (inputs.hormoneUse) {
    score += 1;
    details.push('Hormone use: +1');
  }

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('perc', score);

  return {
    score,
    maxScore: 8,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
