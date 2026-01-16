import { z } from 'zod';
import { GRACEInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
import { getRiskGuidance } from '../utils.js';

const AGE_POINTS = [
  { max: 39, points: 0 },
  { max: 49, points: 18 },
  { max: 59, points: 36 },
  { max: 69, points: 55 },
  { max: 79, points: 73 },
  { max: 200, points: 91 },
];

const HEART_RATE_POINTS = [
  { max: 69, points: 0 },
  { max: 89, points: 7 },
  { max: 109, points: 13 },
  { max: 149, points: 23 },
  { max: 199, points: 36 },
  { max: 500, points: 46 },
];

const SYSTOLIC_BP_POINTS = [
  { max: 99, points: 43 },
  { max: 119, points: 34 },
  { max: 139, points: 24 },
  { max: 159, points: 15 },
  { max: 199, points: 7 },
  { max: 500, points: 0 },
];

const CREATININE_POINTS = [
  { max: 0.39, points: 2 },
  { max: 0.79, points: 5 },
  { max: 1.19, points: 8 },
  { max: 1.59, points: 11 },
  { max: 1.99, points: 14 },
  { max: 3.99, points: 23 },
  { max: 100, points: 31 },
];

const KILLIP_CLASS_POINTS = [0, 21, 43, 64];

function getPointsFromRange(value: number, ranges: { max: number; points: number }[]): number {
  for (const range of ranges) {
    if (value <= range.max) {
      return range.points;
    }
  }
  return ranges[ranges.length - 1].points;
}

export function calculateGRACE(inputs: z.infer<typeof GRACEInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  const agePoints = getPointsFromRange(inputs.age, AGE_POINTS);
  score += agePoints;
  details.push(`Age ${inputs.age} years: +${agePoints}`);

  const hrPoints = getPointsFromRange(inputs.heartRate, HEART_RATE_POINTS);
  score += hrPoints;
  details.push(`Heart rate ${inputs.heartRate} bpm: +${hrPoints}`);

  const bpPoints = getPointsFromRange(inputs.systolicBloodPressure, SYSTOLIC_BP_POINTS);
  score += bpPoints;
  details.push(`Systolic BP ${inputs.systolicBloodPressure} mmHg: +${bpPoints}`);

  const creatPoints = getPointsFromRange(inputs.creatinine, CREATININE_POINTS);
  score += creatPoints;
  details.push(`Creatinine ${inputs.creatinine.toFixed(2)} mg/dL: +${creatPoints}`);

  const killipPoints = KILLIP_CLASS_POINTS[inputs.killipClass - 1];
  score += killipPoints;
  details.push(`Killip class ${inputs.killipClass}: +${killipPoints}`);

  if (inputs.cardiacArrest) {
    score += 43;
    details.push('Cardiac arrest at admission: +43');
  }

  if (inputs.stDeviation) {
    score += 30;
    details.push('ST-segment deviation: +30');
  }

  if (inputs.elevatedCardiacMarkers) {
    score += 15;
    details.push('Elevated cardiac biomarkers: +15');
  }

  const { riskCategory, interpretation, recommendation } = getRiskGuidance('grace', score);

  return {
    score,
    maxScore: 372,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}
