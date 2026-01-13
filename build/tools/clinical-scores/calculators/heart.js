import { getRiskGuidance } from '../utils.js';
import { HEART_AGE_HIGH_THRESHOLD, HEART_AGE_MODERATE_THRESHOLD, HEART_RISK_FACTORS_HIGH_THRESHOLD, HEART_RISK_FACTORS_LOW_THRESHOLD, } from '../constants.js';
export function calculateHEART(inputs) {
    let score = 0;
    const details = [];
    if (inputs.history === 'highly_suspicious') {
        score += 2;
        details.push('History: Highly suspicious = +2');
    }
    else if (inputs.history === 'moderately_suspicious') {
        score += 1;
        details.push('History: Moderately suspicious = +1');
    }
    else {
        details.push('History: Slightly suspicious = +0');
    }
    if (inputs.ecg === 'significant_st_depression') {
        score += 2;
        details.push('ECG: Significant ST depression = +2');
    }
    else if (inputs.ecg === 'nonspecific_changes') {
        score += 1;
        details.push('ECG: Non-specific changes = +1');
    }
    else {
        details.push('ECG: Normal = +0');
    }
    if (inputs.age >= HEART_AGE_HIGH_THRESHOLD) {
        score += 2;
        details.push(`Age ≥${HEART_AGE_HIGH_THRESHOLD} = +2`);
    }
    else if (inputs.age >= HEART_AGE_MODERATE_THRESHOLD) {
        score += 1;
        details.push(`Age ${HEART_AGE_MODERATE_THRESHOLD}-${HEART_AGE_HIGH_THRESHOLD - 1} = +1`);
    }
    else {
        details.push(`Age <${HEART_AGE_MODERATE_THRESHOLD} = +0`);
    }
    if (inputs.riskFactors >= HEART_RISK_FACTORS_HIGH_THRESHOLD) {
        score += 2;
        details.push(`Risk factors ≥${HEART_RISK_FACTORS_HIGH_THRESHOLD} = +2`);
    }
    else if (inputs.riskFactors >= HEART_RISK_FACTORS_LOW_THRESHOLD) {
        score += 1;
        details.push(`Risk factors ${HEART_RISK_FACTORS_LOW_THRESHOLD}-${HEART_RISK_FACTORS_HIGH_THRESHOLD - 1} = +1`);
    }
    else {
        details.push('Risk factors: None = +0');
    }
    if (inputs.troponin === 'high') {
        score += 2;
        details.push('Troponin ≥3x normal = +2');
    }
    else if (inputs.troponin === 'moderate') {
        score += 1;
        details.push('Troponin 1-3x normal = +1');
    }
    else {
        details.push('Troponin normal = +0');
    }
    const { riskCategory, interpretation, recommendation } = getRiskGuidance('heart', score);
    return {
        score,
        maxScore: 10,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
