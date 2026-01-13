import { z } from 'zod';
export declare const CalculateClinicalScoreSchema: z.ZodObject<{
    calculator: z.ZodEnum<["curb65", "centor", "wells_dvt", "wells_pe", "heart", "cha2ds2_vasc", "gcs", "qsofa", "alvarado", "glasgow_blatchford", "nihss"]>;
    inputs: z.ZodUnion<[z.ZodObject<{
        confusion: z.ZodBoolean;
        urea: z.ZodOptional<z.ZodNumber>;
        respiratoryRate: z.ZodNumber;
        bloodPressure: z.ZodObject<{
            systolic: z.ZodNumber;
            diastolic: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            systolic: number;
            diastolic: number;
        }, {
            systolic: number;
            diastolic: number;
        }>;
        age: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        age: number;
        confusion: boolean;
        respiratoryRate: number;
        bloodPressure: {
            systolic: number;
            diastolic: number;
        };
        urea?: number | undefined;
    }, {
        age: number;
        confusion: boolean;
        respiratoryRate: number;
        bloodPressure: {
            systolic: number;
            diastolic: number;
        };
        urea?: number | undefined;
    }>, z.ZodObject<{
        fever: z.ZodBoolean;
        tonsillarExudate: z.ZodBoolean;
        tenderAnteriorNodes: z.ZodBoolean;
        noCough: z.ZodBoolean;
        age: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        age: number;
        fever: boolean;
        tonsillarExudate: boolean;
        tenderAnteriorNodes: boolean;
        noCough: boolean;
    }, {
        age: number;
        fever: boolean;
        tonsillarExudate: boolean;
        tenderAnteriorNodes: boolean;
        noCough: boolean;
    }>, z.ZodObject<{
        activeCancer: z.ZodBoolean;
        paralysisOrImmobilization: z.ZodBoolean;
        recentlyBedridden: z.ZodBoolean;
        localizedTenderness: z.ZodBoolean;
        entireLegSwollen: z.ZodBoolean;
        calfSwelling: z.ZodBoolean;
        pittingEdema: z.ZodBoolean;
        collateralVeins: z.ZodBoolean;
        previousDVT: z.ZodBoolean;
        alternativeDiagnosis: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        activeCancer: boolean;
        paralysisOrImmobilization: boolean;
        recentlyBedridden: boolean;
        localizedTenderness: boolean;
        entireLegSwollen: boolean;
        calfSwelling: boolean;
        pittingEdema: boolean;
        collateralVeins: boolean;
        previousDVT: boolean;
        alternativeDiagnosis: boolean;
    }, {
        activeCancer: boolean;
        paralysisOrImmobilization: boolean;
        recentlyBedridden: boolean;
        localizedTenderness: boolean;
        entireLegSwollen: boolean;
        calfSwelling: boolean;
        pittingEdema: boolean;
        collateralVeins: boolean;
        previousDVT: boolean;
        alternativeDiagnosis: boolean;
    }>, z.ZodObject<{
        clinicalDVTSigns: z.ZodBoolean;
        peIsLikelyDiagnosis: z.ZodBoolean;
        heartRateOver100: z.ZodBoolean;
        immobilizationOrSurgery: z.ZodBoolean;
        previousPEorDVT: z.ZodBoolean;
        hemoptysis: z.ZodBoolean;
        malignancy: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        clinicalDVTSigns: boolean;
        peIsLikelyDiagnosis: boolean;
        heartRateOver100: boolean;
        immobilizationOrSurgery: boolean;
        previousPEorDVT: boolean;
        hemoptysis: boolean;
        malignancy: boolean;
    }, {
        clinicalDVTSigns: boolean;
        peIsLikelyDiagnosis: boolean;
        heartRateOver100: boolean;
        immobilizationOrSurgery: boolean;
        previousPEorDVT: boolean;
        hemoptysis: boolean;
        malignancy: boolean;
    }>, z.ZodObject<{
        history: z.ZodEnum<["highly_suspicious", "moderately_suspicious", "slightly_suspicious"]>;
        ecg: z.ZodEnum<["significant_st_depression", "nonspecific_changes", "normal"]>;
        age: z.ZodNumber;
        riskFactors: z.ZodNumber;
        troponin: z.ZodEnum<["high", "moderate", "normal"]>;
    }, "strip", z.ZodTypeAny, {
        age: number;
        history: "highly_suspicious" | "moderately_suspicious" | "slightly_suspicious";
        ecg: "significant_st_depression" | "nonspecific_changes" | "normal";
        riskFactors: number;
        troponin: "normal" | "high" | "moderate";
    }, {
        age: number;
        history: "highly_suspicious" | "moderately_suspicious" | "slightly_suspicious";
        ecg: "significant_st_depression" | "nonspecific_changes" | "normal";
        riskFactors: number;
        troponin: "normal" | "high" | "moderate";
    }>, z.ZodObject<{
        congestiveHeartFailure: z.ZodBoolean;
        hypertension: z.ZodBoolean;
        age: z.ZodNumber;
        diabetes: z.ZodBoolean;
        strokeTIAThrombus: z.ZodBoolean;
        vascularDisease: z.ZodBoolean;
        sex: z.ZodEnum<["male", "female"]>;
    }, "strip", z.ZodTypeAny, {
        age: number;
        sex: "male" | "female";
        congestiveHeartFailure: boolean;
        hypertension: boolean;
        diabetes: boolean;
        strokeTIAThrombus: boolean;
        vascularDisease: boolean;
    }, {
        age: number;
        sex: "male" | "female";
        congestiveHeartFailure: boolean;
        hypertension: boolean;
        diabetes: boolean;
        strokeTIAThrombus: boolean;
        vascularDisease: boolean;
    }>, z.ZodObject<{
        eyeOpening: z.ZodEnum<["spontaneous", "to_speech", "to_pain", "none"]>;
        verbalResponse: z.ZodEnum<["oriented", "confused", "inappropriate_words", "incomprehensible", "none"]>;
        motorResponse: z.ZodEnum<["obeys_commands", "localizes_pain", "withdraws_from_pain", "abnormal_flexion", "abnormal_extension", "none"]>;
    }, "strip", z.ZodTypeAny, {
        eyeOpening: "spontaneous" | "to_speech" | "to_pain" | "none";
        verbalResponse: "none" | "oriented" | "confused" | "inappropriate_words" | "incomprehensible";
        motorResponse: "none" | "obeys_commands" | "localizes_pain" | "withdraws_from_pain" | "abnormal_flexion" | "abnormal_extension";
    }, {
        eyeOpening: "spontaneous" | "to_speech" | "to_pain" | "none";
        verbalResponse: "none" | "oriented" | "confused" | "inappropriate_words" | "incomprehensible";
        motorResponse: "none" | "obeys_commands" | "localizes_pain" | "withdraws_from_pain" | "abnormal_flexion" | "abnormal_extension";
    }>, z.ZodObject<{
        respiratoryRate: z.ZodNumber;
        alteredMentalStatus: z.ZodBoolean;
        systolicBloodPressure: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        respiratoryRate: number;
        alteredMentalStatus: boolean;
        systolicBloodPressure: number;
    }, {
        respiratoryRate: number;
        alteredMentalStatus: boolean;
        systolicBloodPressure: number;
    }>, z.ZodObject<{
        rlqPain: z.ZodBoolean;
        anorexia: z.ZodBoolean;
        nauseaVomiting: z.ZodBoolean;
        rlqTenderness: z.ZodBoolean;
        reboundTenderness: z.ZodBoolean;
        elevatedTemperature: z.ZodBoolean;
        leukocytosis: z.ZodBoolean;
        leftShift: z.ZodBoolean;
        migrationPain: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        rlqPain: boolean;
        anorexia: boolean;
        nauseaVomiting: boolean;
        rlqTenderness: boolean;
        reboundTenderness: boolean;
        elevatedTemperature: boolean;
        leukocytosis: boolean;
        leftShift: boolean;
        migrationPain: boolean;
    }, {
        rlqPain: boolean;
        anorexia: boolean;
        nauseaVomiting: boolean;
        rlqTenderness: boolean;
        reboundTenderness: boolean;
        elevatedTemperature: boolean;
        leukocytosis: boolean;
        leftShift: boolean;
        migrationPain: boolean;
    }>, z.ZodObject<{
        bun: z.ZodOptional<z.ZodNumber>;
        hemoglobin: z.ZodNumber;
        systolicBloodPressure: z.ZodNumber;
        pulse: z.ZodNumber;
        melena: z.ZodBoolean;
        syncope: z.ZodBoolean;
        hepaticDisease: z.ZodBoolean;
        cardiacFailure: z.ZodBoolean;
        sex: z.ZodEnum<["male", "female"]>;
    }, "strip", z.ZodTypeAny, {
        sex: "male" | "female";
        systolicBloodPressure: number;
        hemoglobin: number;
        pulse: number;
        melena: boolean;
        syncope: boolean;
        hepaticDisease: boolean;
        cardiacFailure: boolean;
        bun?: number | undefined;
    }, {
        sex: "male" | "female";
        systolicBloodPressure: number;
        hemoglobin: number;
        pulse: number;
        melena: boolean;
        syncope: boolean;
        hepaticDisease: boolean;
        cardiacFailure: boolean;
        bun?: number | undefined;
    }>, z.ZodObject<{
        levelOfConsciousness: z.ZodEnum<["alert", "arouses_minor", "arouses_repeated", "coma"]>;
        locQuestions: z.ZodEnum<["both_correct", "one_correct", "neither_correct"]>;
        locCommands: z.ZodEnum<["both_correct", "one_correct", "neither_correct"]>;
        bestGaze: z.ZodEnum<["normal", "partial_palsy", "forced_deviation"]>;
        visual: z.ZodEnum<["no_loss", "partial_hemianopia", "complete_hemianopia"]>;
        facialPalsy: z.ZodEnum<["normal", "minor", "partial", "complete"]>;
        motorArmLeft: z.ZodEnum<["no_drift", "drift", "some_effort", "no_effort", "no_movement", "amputation"]>;
        motorArmRight: z.ZodEnum<["no_drift", "drift", "some_effort", "no_effort", "no_movement", "amputation"]>;
        motorLegLeft: z.ZodEnum<["no_drift", "drift", "some_effort", "no_effort", "no_movement", "amputation"]>;
        motorLegRight: z.ZodEnum<["no_drift", "drift", "some_effort", "no_effort", "no_movement", "amputation"]>;
        limbAtaxia: z.ZodEnum<["absent", "present_one", "present_two"]>;
        sensory: z.ZodEnum<["normal", "mild_loss", "severe_loss"]>;
        bestLanguage: z.ZodEnum<["no_aphasia", "mild_aphasia", "severe_aphasia", "mute"]>;
        dysarthria: z.ZodEnum<["normal", "mild", "severe", "intubated"]>;
        extinctionInattention: z.ZodEnum<["no_abnormality", "visual_tactile_spatial", "profound_hemi_inattention"]>;
    }, "strip", z.ZodTypeAny, {
        levelOfConsciousness: "alert" | "arouses_minor" | "arouses_repeated" | "coma";
        locQuestions: "both_correct" | "one_correct" | "neither_correct";
        locCommands: "both_correct" | "one_correct" | "neither_correct";
        bestGaze: "normal" | "partial_palsy" | "forced_deviation";
        visual: "no_loss" | "partial_hemianopia" | "complete_hemianopia";
        facialPalsy: "normal" | "minor" | "partial" | "complete";
        motorArmLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorArmRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        limbAtaxia: "absent" | "present_one" | "present_two";
        sensory: "normal" | "mild_loss" | "severe_loss";
        bestLanguage: "no_aphasia" | "mild_aphasia" | "severe_aphasia" | "mute";
        dysarthria: "normal" | "mild" | "severe" | "intubated";
        extinctionInattention: "no_abnormality" | "visual_tactile_spatial" | "profound_hemi_inattention";
    }, {
        levelOfConsciousness: "alert" | "arouses_minor" | "arouses_repeated" | "coma";
        locQuestions: "both_correct" | "one_correct" | "neither_correct";
        locCommands: "both_correct" | "one_correct" | "neither_correct";
        bestGaze: "normal" | "partial_palsy" | "forced_deviation";
        visual: "no_loss" | "partial_hemianopia" | "complete_hemianopia";
        facialPalsy: "normal" | "minor" | "partial" | "complete";
        motorArmLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorArmRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        limbAtaxia: "absent" | "present_one" | "present_two";
        sensory: "normal" | "mild_loss" | "severe_loss";
        bestLanguage: "no_aphasia" | "mild_aphasia" | "severe_aphasia" | "mute";
        dysarthria: "normal" | "mild" | "severe" | "intubated";
        extinctionInattention: "no_abnormality" | "visual_tactile_spatial" | "profound_hemi_inattention";
    }>]>;
}, "strip", z.ZodTypeAny, {
    calculator: "curb65" | "centor" | "wells_dvt" | "wells_pe" | "heart" | "cha2ds2_vasc" | "gcs" | "qsofa" | "alvarado" | "glasgow_blatchford" | "nihss";
    inputs: {
        age: number;
        confusion: boolean;
        respiratoryRate: number;
        bloodPressure: {
            systolic: number;
            diastolic: number;
        };
        urea?: number | undefined;
    } | {
        age: number;
        fever: boolean;
        tonsillarExudate: boolean;
        tenderAnteriorNodes: boolean;
        noCough: boolean;
    } | {
        activeCancer: boolean;
        paralysisOrImmobilization: boolean;
        recentlyBedridden: boolean;
        localizedTenderness: boolean;
        entireLegSwollen: boolean;
        calfSwelling: boolean;
        pittingEdema: boolean;
        collateralVeins: boolean;
        previousDVT: boolean;
        alternativeDiagnosis: boolean;
    } | {
        clinicalDVTSigns: boolean;
        peIsLikelyDiagnosis: boolean;
        heartRateOver100: boolean;
        immobilizationOrSurgery: boolean;
        previousPEorDVT: boolean;
        hemoptysis: boolean;
        malignancy: boolean;
    } | {
        age: number;
        history: "highly_suspicious" | "moderately_suspicious" | "slightly_suspicious";
        ecg: "significant_st_depression" | "nonspecific_changes" | "normal";
        riskFactors: number;
        troponin: "normal" | "high" | "moderate";
    } | {
        age: number;
        sex: "male" | "female";
        congestiveHeartFailure: boolean;
        hypertension: boolean;
        diabetes: boolean;
        strokeTIAThrombus: boolean;
        vascularDisease: boolean;
    } | {
        eyeOpening: "spontaneous" | "to_speech" | "to_pain" | "none";
        verbalResponse: "none" | "oriented" | "confused" | "inappropriate_words" | "incomprehensible";
        motorResponse: "none" | "obeys_commands" | "localizes_pain" | "withdraws_from_pain" | "abnormal_flexion" | "abnormal_extension";
    } | {
        respiratoryRate: number;
        alteredMentalStatus: boolean;
        systolicBloodPressure: number;
    } | {
        rlqPain: boolean;
        anorexia: boolean;
        nauseaVomiting: boolean;
        rlqTenderness: boolean;
        reboundTenderness: boolean;
        elevatedTemperature: boolean;
        leukocytosis: boolean;
        leftShift: boolean;
        migrationPain: boolean;
    } | {
        sex: "male" | "female";
        systolicBloodPressure: number;
        hemoglobin: number;
        pulse: number;
        melena: boolean;
        syncope: boolean;
        hepaticDisease: boolean;
        cardiacFailure: boolean;
        bun?: number | undefined;
    } | {
        levelOfConsciousness: "alert" | "arouses_minor" | "arouses_repeated" | "coma";
        locQuestions: "both_correct" | "one_correct" | "neither_correct";
        locCommands: "both_correct" | "one_correct" | "neither_correct";
        bestGaze: "normal" | "partial_palsy" | "forced_deviation";
        visual: "no_loss" | "partial_hemianopia" | "complete_hemianopia";
        facialPalsy: "normal" | "minor" | "partial" | "complete";
        motorArmLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorArmRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        limbAtaxia: "absent" | "present_one" | "present_two";
        sensory: "normal" | "mild_loss" | "severe_loss";
        bestLanguage: "no_aphasia" | "mild_aphasia" | "severe_aphasia" | "mute";
        dysarthria: "normal" | "mild" | "severe" | "intubated";
        extinctionInattention: "no_abnormality" | "visual_tactile_spatial" | "profound_hemi_inattention";
    };
}, {
    calculator: "curb65" | "centor" | "wells_dvt" | "wells_pe" | "heart" | "cha2ds2_vasc" | "gcs" | "qsofa" | "alvarado" | "glasgow_blatchford" | "nihss";
    inputs: {
        age: number;
        confusion: boolean;
        respiratoryRate: number;
        bloodPressure: {
            systolic: number;
            diastolic: number;
        };
        urea?: number | undefined;
    } | {
        age: number;
        fever: boolean;
        tonsillarExudate: boolean;
        tenderAnteriorNodes: boolean;
        noCough: boolean;
    } | {
        activeCancer: boolean;
        paralysisOrImmobilization: boolean;
        recentlyBedridden: boolean;
        localizedTenderness: boolean;
        entireLegSwollen: boolean;
        calfSwelling: boolean;
        pittingEdema: boolean;
        collateralVeins: boolean;
        previousDVT: boolean;
        alternativeDiagnosis: boolean;
    } | {
        clinicalDVTSigns: boolean;
        peIsLikelyDiagnosis: boolean;
        heartRateOver100: boolean;
        immobilizationOrSurgery: boolean;
        previousPEorDVT: boolean;
        hemoptysis: boolean;
        malignancy: boolean;
    } | {
        age: number;
        history: "highly_suspicious" | "moderately_suspicious" | "slightly_suspicious";
        ecg: "significant_st_depression" | "nonspecific_changes" | "normal";
        riskFactors: number;
        troponin: "normal" | "high" | "moderate";
    } | {
        age: number;
        sex: "male" | "female";
        congestiveHeartFailure: boolean;
        hypertension: boolean;
        diabetes: boolean;
        strokeTIAThrombus: boolean;
        vascularDisease: boolean;
    } | {
        eyeOpening: "spontaneous" | "to_speech" | "to_pain" | "none";
        verbalResponse: "none" | "oriented" | "confused" | "inappropriate_words" | "incomprehensible";
        motorResponse: "none" | "obeys_commands" | "localizes_pain" | "withdraws_from_pain" | "abnormal_flexion" | "abnormal_extension";
    } | {
        respiratoryRate: number;
        alteredMentalStatus: boolean;
        systolicBloodPressure: number;
    } | {
        rlqPain: boolean;
        anorexia: boolean;
        nauseaVomiting: boolean;
        rlqTenderness: boolean;
        reboundTenderness: boolean;
        elevatedTemperature: boolean;
        leukocytosis: boolean;
        leftShift: boolean;
        migrationPain: boolean;
    } | {
        sex: "male" | "female";
        systolicBloodPressure: number;
        hemoglobin: number;
        pulse: number;
        melena: boolean;
        syncope: boolean;
        hepaticDisease: boolean;
        cardiacFailure: boolean;
        bun?: number | undefined;
    } | {
        levelOfConsciousness: "alert" | "arouses_minor" | "arouses_repeated" | "coma";
        locQuestions: "both_correct" | "one_correct" | "neither_correct";
        locCommands: "both_correct" | "one_correct" | "neither_correct";
        bestGaze: "normal" | "partial_palsy" | "forced_deviation";
        visual: "no_loss" | "partial_hemianopia" | "complete_hemianopia";
        facialPalsy: "normal" | "minor" | "partial" | "complete";
        motorArmLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorArmRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegLeft: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        motorLegRight: "no_drift" | "drift" | "some_effort" | "no_effort" | "no_movement" | "amputation";
        limbAtaxia: "absent" | "present_one" | "present_two";
        sensory: "normal" | "mild_loss" | "severe_loss";
        bestLanguage: "no_aphasia" | "mild_aphasia" | "severe_aphasia" | "mute";
        dysarthria: "normal" | "mild" | "severe" | "intubated";
        extinctionInattention: "no_abnormality" | "visual_tactile_spatial" | "profound_hemi_inattention";
    };
}>;
export type CalculateClinicalScoreInput = z.infer<typeof CalculateClinicalScoreSchema>;
interface ScoreResult {
    score: number;
    maxScore: number;
    interpretation: string;
    recommendation: string;
    riskCategory: string;
    details: string;
}
export declare function calculateClinicalScore(args: CalculateClinicalScoreInput): Promise<ScoreResult>;
export {};
