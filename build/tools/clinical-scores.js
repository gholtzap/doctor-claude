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
const CHA2DS2VAScInputSchema = z.object({
    congestiveHeartFailure: z.boolean().describe('History of congestive heart failure or left ventricular dysfunction (ejection fraction ≤40%)'),
    hypertension: z.boolean().describe('History of hypertension or currently on antihypertensive medication'),
    age: z.number().describe('Patient age in years'),
    diabetes: z.boolean().describe('History of diabetes mellitus'),
    strokeTIAThrombus: z.boolean().describe('Previous stroke, TIA, or thromboembolism'),
    vascularDisease: z.boolean().describe('Vascular disease: prior myocardial infarction, peripheral arterial disease, or aortic plaque'),
    sex: z.enum(['male', 'female']).describe('Biological sex'),
});
const GCSInputSchema = z.object({
    eyeOpening: z.enum(['spontaneous', 'to_speech', 'to_pain', 'none']).describe('Eye opening response: spontaneous (4pts) - eyes open spontaneously; to_speech (3pts) - eyes open to verbal command; to_pain (2pts) - eyes open to painful stimulus; none (1pt) - no eye opening'),
    verbalResponse: z.enum(['oriented', 'confused', 'inappropriate_words', 'incomprehensible', 'none']).describe('Verbal response: oriented (5pts) - oriented to person, place, time; confused (4pts) - confused conversation; inappropriate_words (3pts) - inappropriate words, discernible words; incomprehensible (2pts) - incomprehensible sounds, moaning; none (1pt) - no verbal response'),
    motorResponse: z.enum(['obeys_commands', 'localizes_pain', 'withdraws_from_pain', 'abnormal_flexion', 'abnormal_extension', 'none']).describe('Motor response: obeys_commands (6pts) - obeys commands; localizes_pain (5pts) - localizes to painful stimulus; withdraws_from_pain (4pts) - withdraws from pain; abnormal_flexion (3pts) - abnormal flexion/decorticate posturing; abnormal_extension (2pts) - abnormal extension/decerebrate posturing; none (1pt) - no motor response'),
});
const QSOFAInputSchema = z.object({
    respiratoryRate: z.number().describe('Respiratory rate (breaths per minute)'),
    alteredMentalStatus: z.boolean().describe('Altered mental status (GCS <15, confusion, disorientation, lethargy)'),
    systolicBloodPressure: z.number().describe('Systolic blood pressure in mmHg'),
});
const AlvaradoInputSchema = z.object({
    rlqPain: z.boolean().describe('Right lower quadrant (RLQ) pain present'),
    anorexia: z.boolean().describe('Anorexia or loss of appetite'),
    nauseaVomiting: z.boolean().describe('Nausea or vomiting'),
    rlqTenderness: z.boolean().describe('Tenderness in right lower quadrant on examination'),
    reboundTenderness: z.boolean().describe('Rebound tenderness present'),
    elevatedTemperature: z.boolean().describe('Elevated temperature ≥37.3°C (99.1°F)'),
    leukocytosis: z.boolean().describe('Leukocytosis: white blood cell count >10,000/μL'),
    leftShift: z.boolean().describe('Left shift: neutrophils >75%'),
    migrationPain: z.boolean().describe('Migration of pain from periumbilical area to right lower quadrant'),
});
const GlasgowBlatchfordInputSchema = z.object({
    bun: z.number().optional().describe('Blood urea nitrogen (BUN) in mg/dL, or urea in mmol/L'),
    hemoglobin: z.number().describe('Hemoglobin in g/dL'),
    systolicBloodPressure: z.number().describe('Systolic blood pressure in mmHg'),
    pulse: z.number().describe('Heart rate in beats per minute'),
    melena: z.boolean().describe('Presentation with melena (black, tarry stools)'),
    syncope: z.boolean().describe('Presentation with syncope (fainting)'),
    hepaticDisease: z.boolean().describe('History of hepatic disease (cirrhosis, chronic liver disease)'),
    cardiacFailure: z.boolean().describe('History of cardiac failure'),
    sex: z.enum(['male', 'female']).describe('Biological sex (affects hemoglobin scoring)'),
});
export const CalculateClinicalScoreSchema = z.object({
    calculator: z.enum(['curb65', 'centor', 'wells_dvt', 'wells_pe', 'heart', 'cha2ds2_vasc', 'gcs', 'qsofa', 'alvarado', 'glasgow_blatchford']).describe('Which clinical calculator to use'),
    inputs: z.union([CURB65InputSchema, CentorInputSchema, WellsDVTInputSchema, WellsPEInputSchema, HEARTInputSchema, CHA2DS2VAScInputSchema, GCSInputSchema, QSOFAInputSchema, AlvaradoInputSchema, GlasgowBlatchfordInputSchema]).describe('Input parameters for the selected calculator'),
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
function calculateCHA2DS2VASc(inputs) {
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
    if (inputs.age >= 75) {
        score += 2;
        details.push('Age ≥75: +2');
    }
    else if (inputs.age >= 65) {
        score += 1;
        details.push('Age 65-74: +1');
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
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score === 0) {
        riskCategory = 'Very Low Risk';
        interpretation = 'Very low stroke risk (0-0.2% per year)';
        recommendation = 'No antithrombotic therapy recommended. Annual reassessment of stroke risk factors is advised.';
    }
    else if (score === 1) {
        riskCategory = 'Low Risk';
        interpretation = 'Low stroke risk (0.6-1.3% per year)';
        if (inputs.sex === 'female' && score === 1) {
            recommendation = 'For females with score of 1 (sex alone), no anticoagulation needed. For males with score of 1, consider oral anticoagulation or aspirin based on patient preferences and bleeding risk.';
        }
        else {
            recommendation = 'Consider oral anticoagulation or aspirin. Discuss risks and benefits with patient. Assess bleeding risk using HAS-BLED score.';
        }
    }
    else if (score === 2) {
        riskCategory = 'Low-Moderate Risk';
        interpretation = 'Low-moderate stroke risk (2.2% per year)';
        recommendation = 'Oral anticoagulation recommended (direct oral anticoagulant or warfarin). Assess bleeding risk using HAS-BLED score. Benefits typically outweigh risks.';
    }
    else if (score <= 4) {
        riskCategory = 'Moderate Risk';
        interpretation = `Moderate stroke risk (${score === 3 ? '3.2%' : '4.8%'} per year)`;
        recommendation = 'Oral anticoagulation strongly recommended unless contraindicated. Direct oral anticoagulants (DOACs) are generally preferred over warfarin. Assess bleeding risk using HAS-BLED score.';
    }
    else if (score <= 6) {
        riskCategory = 'Moderate-High Risk';
        interpretation = `Moderate-high stroke risk (${score === 5 ? '6.7%' : '10%'} per year)`;
        recommendation = 'Oral anticoagulation strongly recommended. DOACs preferred over warfarin in most cases. Careful monitoring and bleeding risk assessment essential.';
    }
    else {
        riskCategory = 'High Risk';
        interpretation = 'High stroke risk (>10% per year)';
        recommendation = 'Oral anticoagulation essential unless absolute contraindication exists. DOACs preferred. Consider specialist referral for anticoagulation management and close monitoring.';
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
function calculateGCS(inputs) {
    let score = 0;
    const details = [];
    const eyeScores = {
        spontaneous: 4,
        to_speech: 3,
        to_pain: 2,
        none: 1,
    };
    const eyeScore = eyeScores[inputs.eyeOpening];
    score += eyeScore;
    details.push(`Eye opening (${inputs.eyeOpening.replace(/_/g, ' ')}): ${eyeScore}`);
    const verbalScores = {
        oriented: 5,
        confused: 4,
        inappropriate_words: 3,
        incomprehensible: 2,
        none: 1,
    };
    const verbalScore = verbalScores[inputs.verbalResponse];
    score += verbalScore;
    details.push(`Verbal response (${inputs.verbalResponse.replace(/_/g, ' ')}): ${verbalScore}`);
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
    details.push(`Motor response (${inputs.motorResponse.replace(/_/g, ' ')}): ${motorScore}`);
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score >= 13) {
        riskCategory = 'Mild';
        interpretation = 'Mild impairment (GCS 13-15). Patient is likely to have good neurological function.';
        recommendation = 'Mild head injury. Observe for deterioration. Most patients with GCS 13-15 can be managed with observation. Consider CT if mechanism concerning or other high-risk features present.';
    }
    else if (score >= 9) {
        riskCategory = 'Moderate';
        interpretation = 'Moderate impairment (GCS 9-12). Significant neurological dysfunction present.';
        recommendation = 'Moderate head injury. Requires hospital admission and close monitoring. CT imaging indicated. Consider neurosurgical consultation. May require ICU admission for frequent neurological assessments.';
    }
    else {
        riskCategory = 'Severe';
        interpretation = `Severe impairment (GCS 3-8). Critical neurological dysfunction. ${score === 3 ? 'GCS 3 is the lowest possible score indicating deep coma.' : ''}`;
        recommendation = 'Severe head injury. Immediate ICU admission required. Definitive airway management (intubation) strongly recommended for GCS ≤8. Emergency CT imaging and neurosurgical consultation essential. Consider ICP monitoring.';
    }
    return {
        score,
        maxScore: 15,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
function calculateQSOFA(inputs) {
    let score = 0;
    const details = [];
    if (inputs.respiratoryRate >= 22) {
        score += 1;
        details.push('Respiratory rate ≥22: +1');
    }
    if (inputs.alteredMentalStatus) {
        score += 1;
        details.push('Altered mental status: +1');
    }
    if (inputs.systolicBloodPressure <= 100) {
        score += 1;
        details.push('Systolic BP ≤100 mmHg: +1');
    }
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score < 2) {
        riskCategory = 'Low Risk';
        interpretation = 'Low risk of sepsis-related mortality and poor outcomes';
        recommendation = 'qSOFA <2 does not rule out infection or sepsis. Continue clinical assessment. If infection suspected, consider full SOFA score and lactate measurement. Monitor closely for deterioration.';
    }
    else {
        riskCategory = 'High Risk';
        interpretation = 'High risk of sepsis-related mortality (in-hospital mortality ~10% for qSOFA ≥2 vs ~1% for qSOFA <2)';
        recommendation = 'qSOFA ≥2 suggests sepsis with organ dysfunction. URGENT: Obtain lactate, blood cultures, and complete blood count. Calculate full SOFA score. Initiate sepsis bundle immediately: IV fluids, broad-spectrum antibiotics within 1 hour, and consider ICU admission. Reassess frequently.';
    }
    return {
        score,
        maxScore: 3,
        interpretation,
        recommendation,
        riskCategory,
        details: details.join('\n'),
    };
}
function calculateAlvarado(inputs) {
    let score = 0;
    const details = [];
    if (inputs.migrationPain) {
        score += 1;
        details.push('Migration of pain to RLQ: +1');
    }
    if (inputs.anorexia) {
        score += 1;
        details.push('Anorexia: +1');
    }
    if (inputs.nauseaVomiting) {
        score += 1;
        details.push('Nausea/vomiting: +1');
    }
    if (inputs.rlqTenderness) {
        score += 2;
        details.push('RLQ tenderness: +2');
    }
    if (inputs.reboundTenderness) {
        score += 1;
        details.push('Rebound tenderness: +1');
    }
    if (inputs.elevatedTemperature) {
        score += 1;
        details.push('Elevated temperature ≥37.3°C: +1');
    }
    if (inputs.leukocytosis) {
        score += 2;
        details.push('Leukocytosis (WBC >10,000): +2');
    }
    if (inputs.leftShift) {
        score += 1;
        details.push('Left shift (neutrophils >75%): +1');
    }
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score <= 4) {
        riskCategory = 'Low Risk';
        interpretation = 'Low probability of acute appendicitis (5-20% likelihood)';
        recommendation = 'Appendicitis unlikely. Consider alternative diagnoses. Outpatient management with close follow-up is appropriate. Discharge with return precautions. Re-evaluate if symptoms worsen or persist beyond 24-48 hours.';
    }
    else if (score <= 6) {
        riskCategory = 'Intermediate Risk';
        interpretation = 'Moderate probability of acute appendicitis (30-65% likelihood)';
        recommendation = 'Appendicitis possible. Further evaluation recommended with CT scan or ultrasound imaging. Active observation with serial abdominal exams. Consider surgical consultation. Admission for observation may be appropriate if imaging unavailable or equivocal.';
    }
    else if (score <= 8) {
        riskCategory = 'High Risk';
        interpretation = 'High probability of acute appendicitis (65-85% likelihood)';
        recommendation = 'Surgical consultation strongly recommended. CT scan or ultrasound can help confirm diagnosis and assess for complications (perforation, abscess). May proceed to surgery based on clinical judgment. NPO (nothing by mouth) and IV hydration. Consider antibiotics.';
    }
    else {
        riskCategory = 'Very High Risk';
        interpretation = 'Very high probability of acute appendicitis (>85% likelihood)';
        recommendation = 'Urgent surgical consultation required. Imaging (CT/ultrasound) recommended but should not significantly delay surgery if patient is clinically unstable. NPO, IV fluids, analgesia, and preoperative antibiotics. Appendectomy is indicated.';
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
function calculateGlasgowBlatchford(inputs) {
    let score = 0;
    const details = [];
    if (inputs.bun !== undefined) {
        const bunMgDl = inputs.bun > 50 ? inputs.bun : inputs.bun * 2.8;
        if (bunMgDl >= 70) {
            score += 6;
            details.push('BUN ≥70 mg/dL: +6');
        }
        else if (bunMgDl >= 56) {
            score += 4;
            details.push('BUN 56-69.9 mg/dL: +4');
        }
        else if (bunMgDl >= 28) {
            score += 3;
            details.push('BUN 28-55.9 mg/dL: +3');
        }
        else if (bunMgDl >= 18.2) {
            score += 2;
            details.push('BUN 18.2-27.9 mg/dL: +2');
        }
    }
    if (inputs.sex === 'male') {
        if (inputs.hemoglobin < 10) {
            score += 6;
            details.push('Hemoglobin <10 g/dL (male): +6');
        }
        else if (inputs.hemoglobin < 12) {
            score += 3;
            details.push('Hemoglobin 10-11.9 g/dL (male): +3');
        }
        else if (inputs.hemoglobin >= 12 && inputs.hemoglobin < 13) {
            score += 1;
            details.push('Hemoglobin 12-12.9 g/dL (male): +1');
        }
    }
    else {
        if (inputs.hemoglobin < 10) {
            score += 6;
            details.push('Hemoglobin <10 g/dL (female): +6');
        }
        else if (inputs.hemoglobin >= 10 && inputs.hemoglobin < 12) {
            score += 1;
            details.push('Hemoglobin 10-11.9 g/dL (female): +1');
        }
    }
    if (inputs.systolicBloodPressure < 90) {
        score += 3;
        details.push('Systolic BP <90 mmHg: +3');
    }
    else if (inputs.systolicBloodPressure >= 90 && inputs.systolicBloodPressure < 100) {
        score += 2;
        details.push('Systolic BP 90-99 mmHg: +2');
    }
    else if (inputs.systolicBloodPressure >= 100 && inputs.systolicBloodPressure < 110) {
        score += 1;
        details.push('Systolic BP 100-109 mmHg: +1');
    }
    if (inputs.pulse >= 100) {
        score += 1;
        details.push('Pulse ≥100 bpm: +1');
    }
    if (inputs.melena) {
        score += 1;
        details.push('Melena present: +1');
    }
    if (inputs.syncope) {
        score += 2;
        details.push('Syncope: +2');
    }
    if (inputs.hepaticDisease) {
        score += 2;
        details.push('Hepatic disease: +2');
    }
    if (inputs.cardiacFailure) {
        score += 2;
        details.push('Cardiac failure: +2');
    }
    let interpretation;
    let recommendation;
    let riskCategory;
    if (score === 0) {
        riskCategory = 'Very Low Risk';
        interpretation = 'Very low risk of requiring intervention. Risk of rebleeding, intervention, or mortality is <1%.';
        recommendation = 'Patient may be considered for early discharge and outpatient management. No endoscopy required urgently. Ensure adequate follow-up arranged. GBS of 0 has high negative predictive value for needing intervention.';
    }
    else if (score <= 1) {
        riskCategory = 'Low Risk';
        interpretation = 'Low risk of requiring intervention. Still consider for potential outpatient management with close follow-up.';
        recommendation = 'Consider early discharge with outpatient gastroenterology follow-up if clinically stable and no other concerning features. Some patients may benefit from brief observation period.';
    }
    else if (score <= 5) {
        riskCategory = 'Moderate Risk';
        interpretation = 'Moderate risk of requiring intervention (transfusion, endoscopy, surgery).';
        recommendation = 'Hospital admission recommended. Arrange upper endoscopy within 24 hours. Type and crossmatch blood. Consider proton pump inhibitor (PPI) infusion. Monitor hemoglobin serially. Gastroenterology consultation advised.';
    }
    else if (score <= 11) {
        riskCategory = 'High Risk';
        interpretation = 'High risk of requiring urgent intervention. Significant likelihood of need for transfusion, endoscopic or surgical intervention.';
        recommendation = 'Hospital admission required. Urgent upper endoscopy (within 12-24 hours). IV PPI infusion. Aggressive fluid resuscitation. Type and crossmatch 2-4 units PRBCs. Urgent gastroenterology consultation. Consider ICU admission for close monitoring. NPO status.';
    }
    else {
        riskCategory = 'Very High Risk';
        interpretation = 'Very high risk of mortality and need for urgent intervention. Critical upper GI bleeding.';
        recommendation = 'URGENT: ICU admission. Immediate gastroenterology consultation for urgent upper endoscopy. Large-bore IV access. Aggressive resuscitation with crystalloids and blood products. Transfuse to maintain Hgb >7 g/dL (>8 in cardiovascular disease). High-dose IV PPI. Consider intubation for airway protection if massive hematemesis or altered mental status. Surgery backup may be needed.';
    }
    return {
        score,
        maxScore: 23,
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
    else if (calculator === 'cha2ds2_vasc') {
        const validated = CHA2DS2VAScInputSchema.parse(inputs);
        return calculateCHA2DS2VASc(validated);
    }
    else if (calculator === 'gcs') {
        const validated = GCSInputSchema.parse(inputs);
        return calculateGCS(validated);
    }
    else if (calculator === 'qsofa') {
        const validated = QSOFAInputSchema.parse(inputs);
        return calculateQSOFA(validated);
    }
    else if (calculator === 'alvarado') {
        const validated = AlvaradoInputSchema.parse(inputs);
        return calculateAlvarado(validated);
    }
    else if (calculator === 'glasgow_blatchford') {
        const validated = GlasgowBlatchfordInputSchema.parse(inputs);
        return calculateGlasgowBlatchford(validated);
    }
    throw new Error(`Unknown calculator: ${calculator}`);
}
