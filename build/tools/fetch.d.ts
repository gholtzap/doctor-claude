import { z } from 'zod';
export declare const FetchMedicalArticleSchema: z.ZodObject<{
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
}, {
    url: string;
}>;
export type FetchMedicalArticleArgs = z.infer<typeof FetchMedicalArticleSchema>;
export interface ArticleSection {
    name: string;
    content: string;
}
export interface MedicalArticle {
    source: 'medlineplus' | 'statpearls';
    title: string;
    url: string;
    authors?: string;
    lastUpdated?: string;
    sections: ArticleSection[];
}
export declare function fetchMedicalArticle(args: FetchMedicalArticleArgs): Promise<MedicalArticle>;
