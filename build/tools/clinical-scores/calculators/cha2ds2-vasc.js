import { getRiskGuidance } from '../utils.js';
import { CHA2DS2_AGE_HIGH_THRESHOLD, CHA2DS2_AGE_MODERATE_THRESHOLD, } from '../constants.js';
export function calculateCHA2DS2VASc(inputs) {
    let score = 0;
    const details = [];
    if (inputs.congestiveHeartFailure) {
        score += 1;
        details.push('Congestive heart failure: +1');
    }
    if (inputs.hypertension) {
        score += 1;
        details.push('Hypertension: +1');
    }
    if (inputs.age >= CHA2DS2_AGE_HIGH_THRESHOLD) {
        score += 2;
        details.push(`Age ≥${CHA2DS2_AGE_HIGH_THRESHOLD}: +2`);
    }
    else if (inputs.age >= CHA2DS2_AGE_MODERATE_THRESHOLD) {
        score += 1;
        details.push(`Age ${CHA2DS2_AGE_MODERATE_THRESHOLD}-${CHA2DS2_AGE_HIGH_THRESHOLD - 1}: +1`);
    }
    if (inputs.diabetes) {
        score += 1;
        details.push('Diabetes: +1');
    }
    if (inputs.strokeTIAThrombus) {
        score += 2;
        details.push('Prior stroke/TIA/thromboembolism: +2');
    }
    if (inputs.vascularDisease) {
        score += 1;
        details.push('Vascular disease: +1');
    }
    if (inputs.sex === 'female') {
        score += 1;
        details.push('Female sex: +1');
    }
    const { riskCategory, interpretation, recommendation } = getRiskGuidance('cha2ds2_vasc', score, { sex: inputs.sex });
    return {
        score,
        maxScore: 9,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
