import { z } from 'zod';
import { TIMIInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance } from '../utils.js';
import {
  TIMI_AGE_THRESHOLD,
  TIMI_RISK_FACTORS_THRESHOLD,
} from '../constants.js';

export function calculateTIMI(inputs: z.infer<typeof TIMIInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.age >= TIMI_AGE_THRESHOLD) {
    score += 1;
    details.push(`Age ≥${TIMI_AGE_THRESHOLD} years: +1`);
  }

  if (inputs.riskFactors >= TIMI_RISK_FACTORS_THRESHOLD) {
    score += 1;
    details.push(`≥${TIMI_RISK_FACTORS_THRESHOLD} CAD risk factors: +1`);
  }

  if (inputs.knownCAD) {
    score += 1;
    details.push('Known CAD (stenosis ≥50%): +1');
  }

  if (inputs.aspirinUse) {
    score += 1;
    details.push('Aspirin use in past 7 days: +1');
  }

  if (inputs.severeAngina) {
    score += 1;
    details.push('Severe angina (≥2 episodes in 24h): +1');
  }

  if (inputs.stChanges) {
    score += 1;
    details.push('ST changes ≥0.5mm: +1');
  }

  if (inputs.elevatedCardiacMarkers) {
    score += 1;
    details.push('Elevated cardiac markers: +1');
  }

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('timi', score);

  return {
    score,
    maxScore: 7,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
