export interface ClinicalGuidance {
  riskCategory: string;
  interpretation: string;
  recommendation: string;
}

export type RiskThresholds<T = number> = {
  threshold: T;
  guidance: ClinicalGuidance;
}[];

export interface ScoreResult {
  score: number;
  maxScore: number;
  interpretation: string;
  recommendation: string;
  riskCategory: string;
  details: string;
}

export interface RenalScoreResult {
  score: number;
  detail: string;
}
