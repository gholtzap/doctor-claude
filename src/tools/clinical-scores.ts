import { z } from 'zod';

const CURB65InputSchema = z.object({
  confusion: z.boolean().describe('New onset confusion or altered mental status'),
  urea: z.number().optional().describe('Blood urea nitrogen (BUN) in mg/dL, or urea in mmol/L'),
  respiratoryRate: z.number().describe('Respiratory rate (breaths per minute)'),
  bloodPressure: z.object({
    systolic: z.number().describe('Systolic blood pressure in mmHg'),
    diastolic: z.number().describe('Diastolic blood pressure in mmHg'),
  }).describe('Blood pressure measurement'),
  age: z.number().describe('Patient age in years'),
});

const CentorInputSchema = z.object({
  fever: z.boolean().describe('Temperature > 38°C (100.4°F)'),
  tonsillarExudate: z.boolean().describe('Exudate or swelling on tonsils'),
  tenderAnteriorNodes: z.boolean().describe('Tender anterior cervical lymph nodes'),
  noCough: z.boolean().describe('Absence of cough'),
  age: z.number().describe('Patient age in years'),
});

export const CalculateClinicalScoreSchema = z.object({
  calculator: z.enum(['curb65', 'centor']).describe('Which clinical calculator to use'),
  inputs: z.union([CURB65InputSchema, CentorInputSchema]).describe('Input parameters for the selected calculator'),
});

export type CalculateClinicalScoreInput = z.infer<typeof CalculateClinicalScoreSchema>;

interface ScoreResult {
  score: number;
  maxScore: number;
  interpretation: string;
  recommendation: string;
  riskCategory: string;
  details: string;
}

function calculateCURB65(inputs: z.infer<typeof CURB65InputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.confusion) {
    score += 1;
    details.push('Confusion: +1');
  }

  if (inputs.urea !== undefined) {
    const ureaThreshold = inputs.urea > 40 ? inputs.urea : inputs.urea * 2.8;
    if (ureaThreshold > 19) {
      score += 1;
      details.push('Elevated BUN/Urea: +1');
    }
  }

  if (inputs.respiratoryRate >= 30) {
    score += 1;
    details.push('Respiratory rate ≥30: +1');
  }

  if (inputs.bloodPressure.systolic < 90 || inputs.bloodPressure.diastolic <= 60) {
    score += 1;
    details.push('Low blood pressure: +1');
  }

  if (inputs.age >= 65) {
    score += 1;
    details.push('Age ≥65: +1');
  }

  let interpretation: string;
  let recommendation: string;
  let riskCategory: string;

  if (score === 0 || score === 1) {
    riskCategory = 'Low Risk';
    interpretation = 'Low risk of mortality (1.5% for score 0, 3.2% for score 1)';
    recommendation = 'Consider outpatient treatment. Patients can typically be managed at home with oral antibiotics if pneumonia is confirmed.';
  } else if (score === 2) {
    riskCategory = 'Moderate Risk';
    interpretation = 'Moderate risk of mortality (13%)';
    recommendation = 'Consider hospital admission or close outpatient monitoring. Short inpatient observation may be appropriate.';
  } else {
    riskCategory = 'High Risk';
    interpretation = `High risk of mortality (${score === 3 ? '17%' : score === 4 ? '41.5%' : '57%'})`;
    recommendation = 'Hospital admission recommended. Consider ICU admission for scores 4-5, especially with additional risk factors.';
  }

  return {
    score,
    maxScore: 5,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}

function calculateCentor(inputs: z.infer<typeof CentorInputSchema>): ScoreResult {
  let score = 0;
  const details: string[] = [];

  if (inputs.fever) {
    score += 1;
    details.push('Fever >38°C: +1');
  }

  if (inputs.tonsillarExudate) {
    score += 1;
    details.push('Tonsillar exudate: +1');
  }

  if (inputs.tenderAnteriorNodes) {
    score += 1;
    details.push('Tender anterior cervical nodes: +1');
  }

  if (inputs.noCough) {
    score += 1;
    details.push('Absence of cough: +1');
  }

  if (inputs.age >= 3 && inputs.age <= 14) {
    score += 1;
    details.push('Age 3-14: +1');
  } else if (inputs.age >= 15 && inputs.age <= 44) {
    details.push('Age 15-44: +0');
  } else if (inputs.age >= 45) {
    score -= 1;
    details.push('Age ≥45: -1');
  }

  const maxScore = 4;
  const adjustedScore = Math.max(0, score);

  let interpretation: string;
  let recommendation: string;
  let riskCategory: string;

  if (adjustedScore <= 1) {
    riskCategory = 'Very Low Risk';
    interpretation = `${adjustedScore <= 0 ? '1-2.5%' : '5-10%'} probability of streptococcal pharyngitis`;
    recommendation = 'No testing or antibiotics needed. Symptomatic treatment is appropriate. Streptococcal infection is unlikely.';
  } else if (adjustedScore === 2 || adjustedScore === 3) {
    riskCategory = 'Moderate Risk';
    interpretation = `${adjustedScore === 2 ? '11-17%' : '28-35%'} probability of streptococcal pharyngitis`;
    recommendation = 'Rapid antigen detection test (RADT) or throat culture recommended. Treat with antibiotics if test is positive.';
  } else {
    riskCategory = 'High Risk';
    interpretation = '51-53% probability of streptococcal pharyngitis';
    recommendation = 'Consider empiric antibiotic treatment or perform rapid antigen detection test. High likelihood of streptococcal infection.';
  }

  return {
    score: adjustedScore,
    maxScore,
    interpretation,
    recommendation,
    riskCategory,
    details: details.join('\n'),
  };
}

export async function calculateClinicalScore(
  args: CalculateClinicalScoreInput
): Promise<ScoreResult> {
  const { calculator, inputs } = args;

  if (calculator === 'curb65') {
    const validated = CURB65InputSchema.parse(inputs);
    return calculateCURB65(validated);
  } else if (calculator === 'centor') {
    const validated = CentorInputSchema.parse(inputs);
    return calculateCentor(validated);
  }

  throw new Error(`Unknown calculator: ${calculator}`);
}
