import { z } from 'zod';
export declare const CalculateClinicalScoreSchema: z.ZodObject<{
    calculator: z.ZodEnum<["curb65", "centor"]>;
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
    }>]>;
}, "strip", z.ZodTypeAny, {
    calculator: "curb65" | "centor";
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
    };
}, {
    calculator: "curb65" | "centor";
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
