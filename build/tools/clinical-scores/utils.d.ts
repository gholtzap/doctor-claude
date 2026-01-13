import type { ClinicalGuidance, RenalScoreResult } from './types.js';
import { CLINICAL_GUIDANCE } from './guidance.js';
export declare const convertUreaToBUN: (urea: number) => number;
export declare const normalizeFiO2: (fio2: number) => number;
export declare const formatEnumLabel: (value: string) => string;
export declare function getRiskGuidance(calculator: keyof typeof CLINICAL_GUIDANCE, score: number, context?: any): ClinicalGuidance;
export declare function calculateRenalScore(creatinine: number, urineOutput: number | undefined): RenalScoreResult;
