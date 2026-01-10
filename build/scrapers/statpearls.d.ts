export interface StatPearlsSearchResult {
    title: string;
    url: string;
    description: string;
    authors?: string;
    updated?: string;
}
export interface StatPearlsArticle {
    title: string;
    url: string;
    authors?: string;
    lastUpdated?: string;
    sections: {
        name: string;
        content: string;
    }[];
}
/**
 * Search StatPearls on NCBI for medical information
 * Searches directly within the StatPearls book (NBK430685)
 */
export declare function searchStatPearls(query: string): Promise<StatPearlsSearchResult[]>;
/**
 * Fetch and parse a StatPearls article from NCBI
 */
export declare function fetchStatPearlsArticle(url: string): Promise<StatPearlsArticle>;
