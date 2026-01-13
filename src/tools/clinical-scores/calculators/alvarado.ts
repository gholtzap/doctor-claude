import { z } from 'zod';
import { AlvaradoInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance } from '../utils.js';

export function calculateAlvarado(inputs: z.infer<typeof AlvaradoInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.migrationPain) {
    score += 1;
    details.push('Migration of pain to RLQ: +1');
  }

  if (inputs.anorexia) {
    score += 1;
    details.push('Anorexia: +1');
  }

  if (inputs.nauseaVomiting) {
    score += 1;
    details.push('Nausea/vomiting: +1');
  }

  if (inputs.rlqTenderness) {
    score += 2;
    details.push('RLQ tenderness: +2');
  }

  if (inputs.reboundTenderness) {
    score += 1;
    details.push('Rebound tenderness: +1');
  }

  if (inputs.elevatedTemperature) {
    score += 1;
    details.push('Elevated temperature ≥37.3°C: +1');
  }

  if (inputs.leukocytosis) {
    score += 2;
    details.push('Leukocytosis (WBC >10,000): +2');
  }

  if (inputs.leftShift) {
    score += 1;
    details.push('Left shift (neutrophils >75%): +1');
  }

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('alvarado', score);

  return {
    score,
    maxScore: 10,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
