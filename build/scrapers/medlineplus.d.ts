export interface MedlinePlusSearchResult {
    title: string;
    url: string;
    description: string;
    type: string;
}
export interface MedlinePlusArticle {
    title: string;
    url: string;
    sections: {
        name: string;
        content: string;
    }[];
}
/**
 * Search MedlinePlus for medical information
 */
export declare function searchMedlinePlus(query: string): Promise<MedlinePlusSearchResult[]>;
/**
 * Fetch and parse a MedlinePlus article
 */
export declare function fetchMedlinePlusArticle(url: string): Promise<MedlinePlusArticle>;
