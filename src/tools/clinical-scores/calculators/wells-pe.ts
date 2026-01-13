import { z } from 'zod';
import { WellsPEInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance } from '../utils.js';

export function calculateWellsPE(inputs: z.infer<typeof WellsPEInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.clinicalDVTSigns) {
    score += 3;
    details.push('Clinical signs of DVT: +3');
  }

  if (inputs.peIsLikelyDiagnosis) {
    score += 3;
    details.push('PE is most likely diagnosis: +3');
  }

  if (inputs.heartRateOver100) {
    score += 1.5;
    details.push('Heart rate >100: +1.5');
  }

  if (inputs.immobilizationOrSurgery) {
    score += 1.5;
    details.push('Immobilization ≥3 days or recent surgery: +1.5');
  }

  if (inputs.previousPEorDVT) {
    score += 1.5;
    details.push('Previous PE or DVT: +1.5');
  }

  if (inputs.hemoptysis) {
    score += 1;
    details.push('Hemoptysis: +1');
  }

  if (inputs.malignancy) {
    score += 1;
    details.push('Malignancy: +1');
  }

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('wells_pe', score);

  return {
    score,
    maxScore: 12.5,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
