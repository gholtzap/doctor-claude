import { z } from 'zod';
import { searchMedlinePlus } from '../scrapers/medlineplus.js';
import { searchStatPearls } from '../scrapers/statpearls.js';
export const SearchMedicalInfoSchema = z.object({
    query: z.string().describe('The medical topic or condition to search for'),
    source: z.enum(['medlineplus', 'statpearls', 'both'])
        .default('both')
        .describe('Which source(s) to search: medlineplus, statpearls, or both')
});
function simplifyQuery(query) {
    const terms = query.toLowerCase().split(/\s+/).filter(t => t.length > 3);
    if (terms.length <= 2)
        return [];
    const commonWords = ['with', 'and', 'the', 'for', 'from', 'that', 'this', 'related', 'associated'];
    const significantTerms = terms.filter(t => !commonWords.includes(t));
    const fallbacks = [];
    if (significantTerms.length >= 4) {
        fallbacks.push(significantTerms.slice(0, 3).join(' '));
    }
    if (significantTerms.length >= 2) {
        fallbacks.push(significantTerms.slice(0, 2).join(' '));
    }
    if (significantTerms.length >= 1) {
        fallbacks.push(significantTerms[0]);
    }
    return fallbacks;
}
export async function searchMedicalInfo(args) {
    const { query, source } = args;
    let results = [];
    console.error(`[DEBUG] searchMedicalInfo called with query: "${query}", source: "${source}"`);
    try {
        if (source === 'medlineplus' || source === 'both') {
            console.error('[DEBUG] Searching MedlinePlus...');
            let medlinePlusResults = await searchMedlinePlus(query);
            console.error(`[DEBUG] MedlinePlus returned ${medlinePlusResults.length} results`);
            if (medlinePlusResults.length === 0) {
                const fallbacks = simplifyQuery(query);
                for (const fallback of fallbacks) {
                    console.error(`[DEBUG] Trying fallback query: "${fallback}"`);
                    medlinePlusResults = await searchMedlinePlus(fallback);
                    if (medlinePlusResults.length > 0) {
                        console.error(`[DEBUG] Fallback succeeded with ${medlinePlusResults.length} results`);
                        break;
                    }
                }
            }
            results.push(...medlinePlusResults.map((r) => ({
                source: 'medlineplus',
                title: r.title,
                url: r.url,
                description: r.description,
                metadata: {
                    type: r.type
                }
            })));
        }
        if (source === 'statpearls' || source === 'both') {
            console.error('[DEBUG] Searching StatPearls...');
            let statPearlsResults = await searchStatPearls(query);
            console.error(`[DEBUG] StatPearls returned ${statPearlsResults.length} results`);
            if (statPearlsResults.length === 0) {
                const fallbacks = simplifyQuery(query);
                for (const fallback of fallbacks) {
                    console.error(`[DEBUG] Trying fallback query: "${fallback}"`);
                    statPearlsResults = await searchStatPearls(fallback);
                    if (statPearlsResults.length > 0) {
                        console.error(`[DEBUG] Fallback succeeded with ${statPearlsResults.length} results`);
                        break;
                    }
                }
            }
            results.push(...statPearlsResults.map((r) => ({
                source: 'statpearls',
                title: r.title,
                url: r.url,
                description: r.description,
                metadata: {
                    authors: r.authors,
                    updated: r.updated
                }
            })));
        }
        console.error(`[DEBUG] Total results: ${results.length}`);
        return results;
    }
    catch (error) {
        console.error(`[DEBUG] Error in searchMedicalInfo:`, error);
        throw new Error(`Search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
