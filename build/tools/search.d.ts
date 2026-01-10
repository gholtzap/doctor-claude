import { z } from 'zod';
export declare const SearchMedicalInfoSchema: z.ZodObject<{
    query: z.ZodString;
    source: z.ZodDefault<z.ZodEnum<["medlineplus", "statpearls", "both"]>>;
}, "strip", z.ZodTypeAny, {
    query: string;
    source: "medlineplus" | "statpearls" | "both";
}, {
    query: string;
    source?: "medlineplus" | "statpearls" | "both" | undefined;
}>;
export type SearchMedicalInfoArgs = z.infer<typeof SearchMedicalInfoSchema>;
export interface SearchResult {
    source: 'medlineplus' | 'statpearls';
    title: string;
    url: string;
    description: string;
    metadata?: {
        type?: string;
        authors?: string;
        updated?: string;
    };
}
export declare function searchMedicalInfo(args: SearchMedicalInfoArgs): Promise<SearchResult[]>;
