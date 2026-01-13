import { z } from 'zod';
export declare const CalculateClinicalScoreSchema: z.ZodObject<{
    calculator: z.ZodEnum<["curb65", "centor", "wells_dvt", "wells_pe", "heart"]>;
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
    }>]>;
}, "strip", z.ZodTypeAny, {
    calculator: "curb65" | "centor" | "wells_dvt" | "wells_pe" | "heart";
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
    };
}, {
    calculator: "curb65" | "centor" | "wells_dvt" | "wells_pe" | "heart";
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
