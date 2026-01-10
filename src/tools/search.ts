import { z } from 'zod';
import { searchMedlinePlus, type MedlinePlusSearchResult } from '../scrapers/medlineplus.js';
import { searchStatPearls, type StatPearlsSearchResult } from '../scrapers/statpearls.js';

export const SearchMedicalInfoSchema = z.object({
  query: z.string().describe('The medical topic or condition to search for'),
  source: z.enum(['medlineplus', 'statpearls', 'both'])
    .default('both')
    .describe('Which source(s) to search: medlineplus, statpearls, or both')
});

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

export async function searchMedicalInfo(args: SearchMedicalInfoArgs): Promise<SearchResult[]> {
  const { query, source } = args;
  const results: SearchResult[] = [];

  try {
    // Search MedlinePlus
    if (source === 'medlineplus' || source === 'both') {
      const medlinePlusResults = await searchMedlinePlus(query);
      results.push(...medlinePlusResults.map((r: MedlinePlusSearchResult): SearchResult => ({
        source: 'medlineplus',
        title: r.title,
        url: r.url,
        description: r.description,
        metadata: {
          type: r.type
        }
      })));
    }

    // Search StatPearls
    if (source === 'statpearls' || source === 'both') {
      const statPearlsResults = await searchStatPearls(query);
      results.push(...statPearlsResults.map((r: StatPearlsSearchResult): SearchResult => ({
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
  } catch (error) {
    throw new Error(`Search failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
