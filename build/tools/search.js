import { z } from 'zod';
import { searchMedlinePlus } from '../scrapers/medlineplus.js';
import { searchStatPearls } from '../scrapers/statpearls.js';
export const SearchMedicalInfoSchema = z.object({
    query: z.string().describe('The medical topic or condition to search for'),
    source: z.enum(['medlineplus', 'statpearls', 'both'])
        .default('both')
        .describe('Which source(s) to search: medlineplus, statpearls, or both')
});
export async function searchMedicalInfo(args) {
    const { query, source } = args;
    const results = [];
    try {
        if (source === 'medlineplus' || source === 'both') {
            const medlinePlusResults = await searchMedlinePlus(query);
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
            const statPearlsResults = await searchStatPearls(query);
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
        return results;
    }
    catch (error) {
        throw new Error(`Search failed: ${error instanceof Error ? error.message : String(error)}`);
    }
}
