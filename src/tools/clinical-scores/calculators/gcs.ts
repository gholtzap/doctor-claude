import { z } from 'zod';
import { GCSInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance, formatEnumLabel } from '../utils.js';

export function calculateGCS(inputs: z.infer<typeof GCSInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  const eyeScores = {
    spontaneous: 4,
    to_speech: 3,
    to_pain: 2,
    none: 1,
  };
  const eyeScore = eyeScores[inputs.eyeOpening];
  score += eyeScore;
  details.push(`Eye opening (${formatEnumLabel(inputs.eyeOpening)}): ${eyeScore}`);

  const verbalScores = {
    oriented: 5,
    confused: 4,
    inappropriate_words: 3,
    incomprehensible: 2,
    none: 1,
  };
  const verbalScore = verbalScores[inputs.verbalResponse];
  score += verbalScore;
  details.push(`Verbal response (${formatEnumLabel(inputs.verbalResponse)}): ${verbalScore}`);

  const motorScores = {
    obeys_commands: 6,
    localizes_pain: 5,
    withdraws_from_pain: 4,
    abnormal_flexion: 3,
    abnormal_extension: 2,
    none: 1,
  };
  const motorScore = motorScores[inputs.motorResponse];
  score += motorScore;
  details.push(`Motor response (${formatEnumLabel(inputs.motorResponse)}): ${motorScore}`);

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('gcs', score);

  return {
    score,
    maxScore: 15,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
