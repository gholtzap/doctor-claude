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
const WellsDVTInputSchema = z.object({
    activeCancer: z.boolean().describe('Active cancer (treatment ongoing, within 6 months, or palliative)'),
    paralysisOrImmobilization: z.boolean().describe('Paralysis, paresis, or recent plaster immobilization of lower extremities'),
    recentlyBedridden: z.boolean().describe('Recently bedridden >3 days or major surgery within 12 weeks'),
    localizedTenderness: z.boolean().describe('Localized tenderness along deep venous system'),
    entireLegSwollen: z.boolean().describe('Entire leg swollen'),
    calfSwelling: z.boolean().describe('Calf swelling >3cm compared to asymptomatic leg'),
    pittingEdema: z.boolean().describe('Pitting edema confined to symptomatic leg'),
    collateralVeins: z.boolean().describe('Collateral superficial veins (non-varicose)'),
    previousDVT: z.boolean().describe('Previously documented DVT'),
    alternativeDiagnosis: z.boolean().describe('Alternative diagnosis at least as likely as DVT'),
});
const WellsPEInputSchema = z.object({
    clinicalDVTSigns: z.boolean().describe('Clinical signs and symptoms of DVT (leg swelling, pain with palpation)'),
    peIsLikelyDiagnosis: z.boolean().describe('PE is the most likely diagnosis or equally likely'),
    heartRateOver100: z.boolean().describe('Heart rate >100 bpm'),
    immobilizationOrSurgery: z.boolean().describe('Immobilization ≥3 days or surgery in previous 4 weeks'),
    previousPEorDVT: z.boolean().describe('Previous PE or DVT'),
    hemoptysis: z.boolean().describe('Hemoptysis (coughing up blood)'),
    malignancy: z.boolean().describe('Malignancy (treatment ongoing, within 6 months, or palliative)'),
});
const HEARTInputSchema = z.object({
    history: z.enum(['highly_suspicious', 'moderately_suspicious', 'slightly_suspicious']).describe('History: highly_suspicious (2pts) - chest pain pressure-like and related to exertion; moderately_suspicious (1pt) - some concerning features but not definitive; slightly_suspicious (0pts) - probably not cardiac'),
    ecg: z.enum(['significant_st_depression', 'nonspecific_changes', 'normal']).describe('ECG: significant_st_depression (2pts), nonspecific_changes (1pt) like T-wave inversion or ST elevation <1mm, normal (0pts)'),
    age: z.number().describe('Patient age in years'),
    riskFactors: z.number().min(0).describe('Number of cardiac risk factors (0-5+): hypertension, hyperlipidemia, diabetes, obesity (BMI>30), smoking (current or quit <3mo), family history of premature CAD'),
    troponin: z.enum(['high', 'moderate', 'normal']).describe('Troponin level: high (2pts) ≥3x normal limit; moderate (1pt) 1-3x normal limit; normal (0pts) ≤normal limit'),
});
export const CalculateClinicalScoreSchema = z.object({
    calculator: z.enum(['curb65', 'centor', 'wells_dvt', 'wells_pe', 'heart']).describe('Which clinical calculator to use'),
    inputs: z.union([CURB65InputSchema, CentorInputSchema, WellsDVTInputSchema, WellsPEInputSchema, HEARTInputSchema]).describe('Input parameters for the selected calculator'),
});
function calculateCURB65(inputs) {
    let score = 0;
    const details = [];
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
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score === 0 || score === 1) {
        riskCategory = 'Low Risk';
        interpretation = 'Low risk of mortality (1.5% for score 0, 3.2% for score 1)';
        recommendation = 'Consider outpatient treatment. Patients can typically be managed at home with oral antibiotics if pneumonia is confirmed.';
    }
    else if (score === 2) {
        riskCategory = 'Moderate Risk';
        interpretation = 'Moderate risk of mortality (13%)';
        recommendation = 'Consider hospital admission or close outpatient monitoring. Short inpatient observation may be appropriate.';
    }
    else {
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
function calculateCentor(inputs) {
    let score = 0;
    const details = [];
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
    }
    else if (inputs.age >= 15 && inputs.age <= 44) {
        details.push('Age 15-44: +0');
    }
    else if (inputs.age >= 45) {
        score -= 1;
        details.push('Age ≥45: -1');
    }
    const maxScore = 4;
    const adjustedScore = Math.max(0, score);
    let interpretation;
    let recommendation;
    let riskCategory;
    if (adjustedScore <= 1) {
        riskCategory = 'Very Low Risk';
        interpretation = `${adjustedScore <= 0 ? '1-2.5%' : '5-10%'} probability of streptococcal pharyngitis`;
        recommendation = 'No testing or antibiotics needed. Symptomatic treatment is appropriate. Streptococcal infection is unlikely.';
    }
    else if (adjustedScore === 2 || adjustedScore === 3) {
        riskCategory = 'Moderate Risk';
        interpretation = `${adjustedScore === 2 ? '11-17%' : '28-35%'} probability of streptococcal pharyngitis`;
        recommendation = 'Rapid antigen detection test (RADT) or throat culture recommended. Treat with antibiotics if test is positive.';
    }
    else {
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
function calculateWellsDVT(inputs) {
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
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score <= 0) {
        riskCategory = 'Low Probability';
        interpretation = 'Low probability of DVT (~5%)';
        recommendation = 'D-dimer testing recommended. If D-dimer is negative, DVT is effectively ruled out. If positive, proceed to ultrasound imaging.';
    }
    else if (score <= 2) {
        riskCategory = 'Moderate Probability';
        interpretation = 'Moderate probability of DVT (~17%)';
        recommendation = 'D-dimer testing recommended. If negative, DVT unlikely. If positive, compression ultrasound is indicated.';
    }
    else {
        riskCategory = 'High Probability';
        interpretation = 'High probability of DVT (~53%)';
        recommendation = 'Compression ultrasound imaging strongly recommended. Consider empiric anticoagulation while awaiting imaging if no contraindications.';
    }
    return {
        score,
        maxScore: 9,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
function calculateWellsPE(inputs) {
    let score = 0;
    const details = [];
    if (inputs.clinicalDVTSigns) {
        score += 3;
        details.push('Clinical signs of DVT: +3');
    }
    if (inputs.peIsLikelyDiagnosis) {
        score += 3;
        details.push('PE is most likely diagnosis: +3');
    }
    if (inputs.heartRateOver100) {
        score += 1.5;
        details.push('Heart rate >100: +1.5');
    }
    if (inputs.immobilizationOrSurgery) {
        score += 1.5;
        details.push('Immobilization ≥3 days or recent surgery: +1.5');
    }
    if (inputs.previousPEorDVT) {
        score += 1.5;
        details.push('Previous PE or DVT: +1.5');
    }
    if (inputs.hemoptysis) {
        score += 1;
        details.push('Hemoptysis: +1');
    }
    if (inputs.malignancy) {
        score += 1;
        details.push('Malignancy: +1');
    }
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score < 2) {
        riskCategory = 'Low Probability';
        interpretation = 'Low probability of PE (~2%)';
        recommendation = 'D-dimer testing recommended. If D-dimer is negative, PE is effectively ruled out. If positive, proceed to CT pulmonary angiography (CTPA).';
    }
    else if (score <= 6) {
        riskCategory = 'Moderate Probability';
        interpretation = 'Moderate probability of PE (~20-30%)';
        recommendation = 'D-dimer or CTPA recommended depending on clinical judgment. If D-dimer positive or not performed, CTPA is indicated.';
    }
    else {
        riskCategory = 'High Probability';
        interpretation = 'High probability of PE (~65%)';
        recommendation = 'CT pulmonary angiography (CTPA) strongly recommended. Consider empiric anticoagulation if no contraindications while awaiting imaging.';
    }
    return {
        score,
        maxScore: 12.5,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
function calculateHEART(inputs) {
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
    if (inputs.age >= 65) {
        score += 2;
        details.push('Age ≥65 = +2');
    }
    else if (inputs.age >= 45) {
        score += 1;
        details.push('Age 45-64 = +1');
    }
    else {
        details.push('Age <45 = +0');
    }
    if (inputs.riskFactors >= 3) {
        score += 2;
        details.push('Risk factors ≥3 = +2');
    }
    else if (inputs.riskFactors >= 1) {
        score += 1;
        details.push('Risk factors 1-2 = +1');
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
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score <= 3) {
        riskCategory = 'Low Risk';
        interpretation = 'Low risk of major adverse cardiac events (MACE) at 6 weeks: 0.9-1.7%';
        recommendation = 'Early discharge with outpatient follow-up is appropriate. No further cardiac workup needed unless clinically indicated. Consider non-cardiac causes of chest pain.';
    }
    else if (score <= 6) {
        riskCategory = 'Moderate Risk';
        interpretation = 'Moderate risk of MACE at 6 weeks: 12-17%';
        recommendation = 'Observation with serial troponins and ECGs recommended. Stress testing or coronary CT angiography may be appropriate. Cardiology consultation should be considered.';
    }
    else {
        riskCategory = 'High Risk';
        interpretation = 'High risk of MACE at 6 weeks: 50-65%';
        recommendation = 'Urgent cardiology consultation recommended. Early invasive strategy with coronary angiography should be strongly considered. Admit for continuous monitoring and treatment.';
    }
    return {
        score,
        maxScore: 10,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
export async function calculateClinicalScore(args) {
    const { calculator, inputs } = args;
    if (calculator === 'curb65') {
        const validated = CURB65InputSchema.parse(inputs);
        return calculateCURB65(validated);
    }
    else if (calculator === 'centor') {
        const validated = CentorInputSchema.parse(inputs);
        return calculateCentor(validated);
    }
    else if (calculator === 'wells_dvt') {
        const validated = WellsDVTInputSchema.parse(inputs);
        return calculateWellsDVT(validated);
    }
    else if (calculator === 'wells_pe') {
        const validated = WellsPEInputSchema.parse(inputs);
        return calculateWellsPE(validated);
    }
    else if (calculator === 'heart') {
        const validated = HEARTInputSchema.parse(inputs);
        return calculateHEART(validated);
    }
    throw new Error(`Unknown calculator: ${calculator}`);
}
