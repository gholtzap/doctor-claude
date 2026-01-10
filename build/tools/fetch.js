import { z } from 'zod';
import { fetchMedlinePlusArticle } from '../scrapers/medlineplus.js';
import { fetchStatPearlsArticle } from '../scrapers/statpearls.js';
export const FetchMedicalArticleSchema = z.object({
    url: z.string().url().describe('The URL of the medical article to fetch')
});
const ALLOWED_DOMAINS = [
    'medlineplus.gov',
    'ncbi.nlm.nih.gov'
];
/**
 * Validate that a URL is from an allowed domain
 */
function validateDomain(url) {
    let hostname;
    try {
        const urlObj = new URL(url);
        hostname = urlObj.hostname.toLowerCase();
    }
    catch {
        throw new Error(`Invalid URL: ${url}`);
    }
    const isAllowed = ALLOWED_DOMAINS.some(domain => hostname === domain || hostname.endsWith(`.${domain}`));
    if (!isAllowed) {
        throw new Error(`Domain not allowed: ${hostname}. Only ${ALLOWED_DOMAINS.join(', ')} are permitted.`);
    }
}
/**
 * Determine the source from the URL
 */
function getSourceFromUrl(url) {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('medlineplus.gov')) {
        return 'medlineplus';
    }
    else if (hostname.includes('ncbi.nlm.nih.gov')) {
        return 'statpearls';
    }
    throw new Error('Could not determine source from URL');
}
export async function fetchMedicalArticle(args) {
    const { url } = args;
    // Validate domain
    validateDomain(url);
    // Determine source
    const source = getSourceFromUrl(url);
    try {
        if (source === 'medlineplus') {
            const article = await fetchMedlinePlusArticle(url);
            return {
                source,
                title: article.title,
                url: article.url,
                sections: article.sections
            };
        }
        else {
            const article = await fetchStatPearlsArticle(url);
            return {
                source,
                title: article.title,
                url: article.url,
                authors: article.authors,
                lastUpdated: article.lastUpdated,
                sections: article.sections
            };
        }
    }
    catch (error) {
        throw new Error(`Failed to fetch article: ${error instanceof Error ? error.message : String(error)}`);
    }
}
