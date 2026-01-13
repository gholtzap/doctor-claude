export declare const CLINICAL_GUIDANCE: {
    readonly curb65: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
    readonly centor: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
    readonly wells_dvt: readonly [{
        readonly threshold: 1;
        readonly guidance: {
            readonly riskCategory: "Low Probability";
            readonly interpretation: "Low probability of DVT (~5%)";
            readonly recommendation: "D-dimer testing recommended. If D-dimer is negative, DVT is effectively ruled out. If positive, proceed to ultrasound imaging.";
        };
    }, {
        readonly threshold: 3;
        readonly guidance: {
            readonly riskCategory: "Moderate Probability";
            readonly interpretation: "Moderate probability of DVT (~17%)";
            readonly recommendation: "D-dimer testing recommended. If negative, DVT unlikely. If positive, compression ultrasound is indicated.";
        };
    }, {
        readonly threshold: 10;
        readonly guidance: {
            readonly riskCategory: "High Probability";
            readonly interpretation: "High probability of DVT (~53%)";
            readonly recommendation: "Compression ultrasound imaging strongly recommended. Consider empiric anticoagulation while awaiting imaging if no contraindications.";
        };
    }];
    readonly wells_pe: readonly [{
        readonly threshold: 2;
        readonly guidance: {
            readonly riskCategory: "Low Probability";
            readonly interpretation: "Low probability of PE (~2%)";
            readonly recommendation: "D-dimer testing recommended. If D-dimer is negative, PE is effectively ruled out. If positive, proceed to CT pulmonary angiography (CTPA).";
        };
    }, {
        readonly threshold: 7;
        readonly guidance: {
            readonly riskCategory: "Moderate Probability";
            readonly interpretation: "Moderate probability of PE (~20-30%)";
            readonly recommendation: "D-dimer or CTPA recommended depending on clinical judgment. If D-dimer positive or not performed, CTPA is indicated.";
        };
    }, {
        readonly threshold: 13;
        readonly guidance: {
            readonly riskCategory: "High Probability";
            readonly interpretation: "High probability of PE (~65%)";
            readonly recommendation: "CT pulmonary angiography (CTPA) strongly recommended. Consider empiric anticoagulation if no contraindications while awaiting imaging.";
        };
    }];
    readonly heart: readonly [{
        readonly threshold: 4;
        readonly guidance: {
            readonly riskCategory: "Low Risk";
            readonly interpretation: "Low risk of major adverse cardiac events (MACE) at 6 weeks: 0.9-1.7%";
            readonly recommendation: "Early discharge with outpatient follow-up is appropriate. No further cardiac workup needed unless clinically indicated. Consider non-cardiac causes of chest pain.";
        };
    }, {
        readonly threshold: 7;
        readonly guidance: {
            readonly riskCategory: "Moderate Risk";
            readonly interpretation: "Moderate risk of MACE at 6 weeks: 12-17%";
            readonly recommendation: "Observation with serial troponins and ECGs recommended. Stress testing or coronary CT angiography may be appropriate. Cardiology consultation should be considered.";
        };
    }, {
        readonly threshold: 11;
        readonly guidance: {
            readonly riskCategory: "High Risk";
            readonly interpretation: "High risk of MACE at 6 weeks: 50-65%";
            readonly recommendation: "Urgent cardiology consultation recommended. Early invasive strategy with coronary angiography should be strongly considered. Admit for continuous monitoring and treatment.";
        };
    }];
    readonly cha2ds2_vasc: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number, sex?: string) => string);
            recommendation: string | ((score: number, sex?: string) => string);
        };
    }[];
    readonly gcs: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
    readonly qsofa: readonly [{
        readonly threshold: 2;
        readonly guidance: {
            readonly riskCategory: "Low Risk";
            readonly interpretation: "Low risk of sepsis-related mortality and poor outcomes";
            readonly recommendation: "qSOFA <2 does not rule out infection or sepsis. Continue clinical assessment. If infection suspected, consider full SOFA score and lactate measurement. Monitor closely for deterioration.";
        };
    }, {
        readonly threshold: 4;
        readonly guidance: {
            readonly riskCategory: "High Risk";
            readonly interpretation: "High risk of sepsis-related mortality (in-hospital mortality ~10% for qSOFA ≥2 vs ~1% for qSOFA <2)";
            readonly recommendation: "qSOFA ≥2 suggests sepsis with organ dysfunction. URGENT: Obtain lactate, blood cultures, and complete blood count. Calculate full SOFA score. Initiate sepsis bundle immediately: IV fluids, broad-spectrum antibiotics within 1 hour, and consider ICU admission. Reassess frequently.";
        };
    }];
    readonly alvarado: readonly [{
        readonly threshold: 5;
        readonly guidance: {
            readonly riskCategory: "Low Risk";
            readonly interpretation: "Low probability of acute appendicitis (5-20% likelihood)";
            readonly recommendation: "Appendicitis unlikely. Consider alternative diagnoses. Outpatient management with close follow-up is appropriate. Discharge with return precautions. Re-evaluate if symptoms worsen or persist beyond 24-48 hours.";
        };
    }, {
        readonly threshold: 7;
        readonly guidance: {
            readonly riskCategory: "Intermediate Risk";
            readonly interpretation: "Moderate probability of acute appendicitis (30-65% likelihood)";
            readonly recommendation: "Appendicitis possible. Further evaluation recommended with CT scan or ultrasound imaging. Active observation with serial abdominal exams. Consider surgical consultation. Admission for observation may be appropriate if imaging unavailable or equivocal.";
        };
    }, {
        readonly threshold: 9;
        readonly guidance: {
            readonly riskCategory: "High Risk";
            readonly interpretation: "High probability of acute appendicitis (65-85% likelihood)";
            readonly recommendation: "Surgical consultation strongly recommended. CT scan or ultrasound can help confirm diagnosis and assess for complications (perforation, abscess). May proceed to surgery based on clinical judgment. NPO (nothing by mouth) and IV hydration. Consider antibiotics.";
        };
    }, {
        readonly threshold: 11;
        readonly guidance: {
            readonly riskCategory: "Very High Risk";
            readonly interpretation: "Very high probability of acute appendicitis (>85% likelihood)";
            readonly recommendation: "Urgent surgical consultation required. Imaging (CT/ultrasound) recommended but should not significantly delay surgery if patient is clinically unstable. NPO, IV fluids, analgesia, and preoperative antibiotics. Appendectomy is indicated.";
        };
    }];
    readonly glasgow_blatchford: readonly [{
        readonly threshold: 1;
        readonly guidance: {
            readonly riskCategory: "Very Low Risk";
            readonly interpretation: "Very low risk of requiring intervention. Risk of rebleeding, intervention, or mortality is <1%.";
            readonly recommendation: "Patient may be considered for early discharge and outpatient management. No endoscopy required urgently. Ensure adequate follow-up arranged. GBS of 0 has high negative predictive value for needing intervention.";
        };
    }, {
        readonly threshold: 2;
        readonly guidance: {
            readonly riskCategory: "Low Risk";
            readonly interpretation: "Low risk of requiring intervention. Still consider for potential outpatient management with close follow-up.";
            readonly recommendation: "Consider early discharge with outpatient gastroenterology follow-up if clinically stable and no other concerning features. Some patients may benefit from brief observation period.";
        };
    }, {
        readonly threshold: 6;
        readonly guidance: {
            readonly riskCategory: "Moderate Risk";
            readonly interpretation: "Moderate risk of requiring intervention (transfusion, endoscopy, surgery).";
            readonly recommendation: "Hospital admission recommended. Arrange upper endoscopy within 24 hours. Type and crossmatch blood. Consider proton pump inhibitor (PPI) infusion. Monitor hemoglobin serially. Gastroenterology consultation advised.";
        };
    }, {
        readonly threshold: 12;
        readonly guidance: {
            readonly riskCategory: "High Risk";
            readonly interpretation: "High risk of requiring urgent intervention. Significant likelihood of need for transfusion, endoscopic or surgical intervention.";
            readonly recommendation: "Hospital admission required. Urgent upper endoscopy (within 12-24 hours). IV PPI infusion. Aggressive fluid resuscitation. Type and crossmatch 2-4 units PRBCs. Urgent gastroenterology consultation. Consider ICU admission for close monitoring. NPO status.";
        };
    }, {
        readonly threshold: 24;
        readonly guidance: {
            readonly riskCategory: "Very High Risk";
            readonly interpretation: "Very high risk of mortality and need for urgent intervention. Critical upper GI bleeding.";
            readonly recommendation: "URGENT: ICU admission. Immediate gastroenterology consultation for urgent upper endoscopy. Large-bore IV access. Aggressive resuscitation with crystalloids and blood products. Transfuse to maintain Hgb >7 g/dL (>8 in cardiovascular disease). High-dose IV PPI. Consider intubation for airway protection if massive hematemesis or altered mental status. Surgery backup may be needed.";
        };
    }];
    readonly nihss: readonly [{
        readonly threshold: 1;
        readonly guidance: {
            readonly riskCategory: "No Stroke";
            readonly interpretation: "No stroke symptoms detected. Patient appears neurologically intact.";
            readonly recommendation: "No acute stroke treatment indicated based on NIHSS alone. Consider other causes of symptoms if clinically suspected stroke. Document baseline NIHSS for future reference.";
        };
    }, {
        readonly threshold: 5;
        readonly guidance: {
            readonly riskCategory: "Minor Stroke";
            readonly interpretation: "Minor stroke (NIHSS 1-4). Small neurological deficit present.";
            readonly recommendation: "Consider thrombolytic therapy if within time window and no contraindications (though benefit may be modest for very low scores). Admit to stroke unit. Imaging (CT/MRI) to rule out hemorrhage and confirm ischemia. May be candidate for IV tPA or mechanical thrombectomy based on imaging. Aspirin if not receiving tPA.";
        };
    }, {
        readonly threshold: 16;
        readonly guidance: {
            readonly riskCategory: "Moderate Stroke";
            readonly interpretation: "Moderate stroke (NIHSS 5-15). Significant neurological deficit.";
            readonly recommendation: "URGENT: Candidate for thrombolytic therapy (IV tPA) if within 4.5 hours and no contraindications. Consider mechanical thrombectomy if large vessel occlusion and within time window (up to 24 hours for select patients). Immediate CT/MRI to exclude hemorrhage. Neurology and/or stroke team consultation. Admit to stroke unit or ICU. Close monitoring for neurological deterioration.";
        };
    }, {
        readonly threshold: 21;
        readonly guidance: {
            readonly riskCategory: "Moderate-Severe Stroke";
            readonly interpretation: "Moderate to severe stroke (NIHSS 16-20). Major neurological impairment.";
            readonly recommendation: "URGENT: High priority for mechanical thrombectomy if large vessel occlusion identified on CT angiography (CTA). IV tPA if eligible and within time window. Immediate neurology/stroke team consultation. ICU admission for close monitoring. High risk for hemorrhagic transformation and cerebral edema. Consider intubation if airway compromise or GCS <8. Neurosurgical consultation may be needed.";
        };
    }, {
        readonly threshold: 43;
        readonly guidance: {
            readonly riskCategory: "Severe Stroke";
            readonly interpretation: "Severe stroke (NIHSS ≥21). Profound neurological deficit. High mortality risk.";
            readonly recommendation: "CRITICAL: Emergent mechanical thrombectomy evaluation if large vessel occlusion present. May still benefit from IV tPA if eligible. ICU admission required. Likely need for airway protection/intubation. Risk of malignant cerebral edema is very high - neurosurgical consultation for possible decompressive hemicraniectomy. ICP monitoring may be indicated. Discuss goals of care with family. Multidisciplinary stroke team activation essential.";
        };
    }];
    readonly sofa: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
    readonly perc: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
    readonly timi: {
        threshold: number;
        guidance: {
            riskCategory: string;
            interpretation: string | ((score: number) => string);
            recommendation: string;
        };
    }[];
};
