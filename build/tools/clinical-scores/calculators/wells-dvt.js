import { getRiskGuidance } from '../utils.js';
export function calculateWellsDVT(inputs) {
    let score = 0;
    const details = [];
    if (inputs.activeCancer) {
        score += 1;
        details.push('Active cancer: +1');
    }
    if (inputs.paralysisOrImmobilization) {
        score += 1;
        details.push('Paralysis/immobilization: +1');
    }
    if (inputs.recentlyBedridden) {
        score += 1;
        details.push('Recently bedridden >3 days or major surgery: +1');
    }
    if (inputs.localizedTenderness) {
        score += 1;
        details.push('Localized tenderness along deep venous system: +1');
    }
    if (inputs.entireLegSwollen) {
        score += 1;
        details.push('Entire leg swollen: +1');
    }
    if (inputs.calfSwelling) {
        score += 1;
        details.push('Calf swelling >3cm: +1');
    }
    if (inputs.pittingEdema) {
        score += 1;
        details.push('Pitting edema confined to symptomatic leg: +1');
    }
    if (inputs.collateralVeins) {
        score += 1;
        details.push('Collateral superficial veins: +1');
    }
    if (inputs.previousDVT) {
        score += 1;
        details.push('Previously documented DVT: +1');
    }
    if (inputs.alternativeDiagnosis) {
        score -= 2;
        details.push('Alternative diagnosis as likely: -2');
    }
    const { riskCategory, interpretation, recommendation } = getRiskGuidance('wells_dvt', score);
    return {
        score,
        maxScore: 9,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
