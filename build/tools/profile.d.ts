import { z } from 'zod';
import { type PatientProfile } from '../profile/manager.js';
export declare const SetPatientProfileSchema: z.ZodObject<{
    age: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["kg", "lbs"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "kg" | "lbs";
    }, {
        value: number;
        unit: "kg" | "lbs";
    }>>;
    height: z.ZodOptional<z.ZodObject<{
        value: z.ZodNumber;
        unit: z.ZodEnum<["cm", "in", "ft"]>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        unit: "cm" | "in" | "ft";
    }, {
        value: number;
        unit: "cm" | "in" | "ft";
    }>>;
    sex: z.ZodOptional<z.ZodEnum<["male", "female", "other"]>>;
    chronicConditions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    medications: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allergies: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    surgicalHistory: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    familyHistory: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    age?: number | undefined;
    weight?: {
        value: number;
        unit: "kg" | "lbs";
    } | undefined;
    height?: {
        value: number;
        unit: "cm" | "in" | "ft";
    } | undefined;
    sex?: "male" | "female" | "other" | undefined;
    chronicConditions?: string[] | undefined;
    medications?: string[] | undefined;
    allergies?: string[] | undefined;
    surgicalHistory?: string[] | undefined;
    familyHistory?: string[] | undefined;
}, {
    age?: number | undefined;
    weight?: {
        value: number;
        unit: "kg" | "lbs";
    } | undefined;
    height?: {
        value: number;
        unit: "cm" | "in" | "ft";
    } | undefined;
    sex?: "male" | "female" | "other" | undefined;
    chronicConditions?: string[] | undefined;
    medications?: string[] | undefined;
    allergies?: string[] | undefined;
    surgicalHistory?: string[] | undefined;
    familyHistory?: string[] | undefined;
}>;
export type SetPatientProfileArgs = z.infer<typeof SetPatientProfileSchema>;
export declare function setPatientProfile(args: SetPatientProfileArgs): Promise<string>;
export declare function getPatientProfile(): Promise<PatientProfile | null>;
export declare function deletePatientProfile(): Promise<string>;
