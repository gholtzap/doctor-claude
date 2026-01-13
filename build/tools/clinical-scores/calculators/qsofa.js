import { getRiskGuidance } from '../utils.js';
import { QSOFA_RESPIRATORY_RATE_THRESHOLD, QSOFA_SYSTOLIC_BP_THRESHOLD, } from '../constants.js';
export function calculateQSOFA(inputs) {
    let score = 0;
    const details = [];
    if (inputs.respiratoryRate >= QSOFA_RESPIRATORY_RATE_THRESHOLD) {
        score += 1;
        details.push(`Respiratory rate ≥${QSOFA_RESPIRATORY_RATE_THRESHOLD}: +1`);
    }
    if (inputs.alteredMentalStatus) {
        score += 1;
        details.push('Altered mental status: +1');
    }
    if (inputs.systolicBloodPressure <= QSOFA_SYSTOLIC_BP_THRESHOLD) {
        score += 1;
        details.push(`Systolic BP ≤${QSOFA_SYSTOLIC_BP_THRESHOLD} mmHg: +1`);
    }
    const { riskCategory, interpretation, recommendation } = getRiskGuidance('qsofa', score);
    return {
        score,
        maxScore: 3,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
