#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, ListPromptsRequestSchema, GetPromptRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { searchMedicalInfo, SearchMedicalInfoSchema } from './tools/search.js';
import { fetchMedicalArticle, FetchMedicalArticleSchema } from './tools/fetch.js';
import { getDiagnosticPrompt } from './prompts/diagnostic.js';
/**
 * Doctor Claude MCP Server
 * Provides tools for searching and retrieving peer-reviewed medical information
 * from MedlinePlus and StatPearls (NCBI).
 */
class DoctorClaudeServer {
    server;
    constructor() {
        this.server = new Server({
            name: 'doctor-claude',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
                prompts: {},
            },
        });
        this.setupToolHandlers();
        this.setupPromptHandlers();
        this.setupErrorHandling();
    }
    setupToolHandlers() {
        // List available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'search_medical_info',
                    description: 'Search for peer-reviewed medical information from MedlinePlus and StatPearls (NCBI). ' +
                        'Returns a list of relevant articles with titles, URLs, and descriptions.',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            query: {
                                type: 'string',
                                description: 'The medical topic or condition to search for',
                            },
                            source: {
                                type: 'string',
                                enum: ['medlineplus', 'statpearls', 'both'],
                                default: 'both',
                                description: 'Which source(s) to search: medlineplus, statpearls, or both',
                            },
                        },
                        required: ['query'],
                    },
                },
                {
                    name: 'fetch_medical_article',
                    description: 'Fetch and parse the full content of a medical article from MedlinePlus or StatPearls. ' +
                        'Only URLs from medlineplus.gov and ncbi.nlm.nih.gov are allowed for security.',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            url: {
                                type: 'string',
                                description: 'The URL of the medical article to fetch (must be from medlineplus.gov or ncbi.nlm.nih.gov)',
                            },
                        },
                        required: ['url'],
                    },
                },
            ],
        }));
        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            try {
                if (name === 'search_medical_info') {
                    const validatedArgs = SearchMedicalInfoSchema.parse(args);
                    const results = await searchMedicalInfo(validatedArgs);
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(results, null, 2),
                            },
                        ],
                    };
                }
                else if (name === 'fetch_medical_article') {
                    const validatedArgs = FetchMedicalArticleSchema.parse(args);
                    const article = await fetchMedicalArticle(validatedArgs);
                    // Format the article for readability
                    const formattedArticle = this.formatArticle(article);
                    return {
                        content: [
                            {
                                type: 'text',
                                text: formattedArticle,
                            },
                        ],
                    };
                }
                else {
                    throw new Error(`Unknown tool: ${name}`);
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error);
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${errorMessage}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    formatArticle(article) {
        let formatted = `# ${article.title}\n\n`;
        formatted += `**Source:** ${article.source}\n`;
        formatted += `**URL:** ${article.url}\n`;
        if (article.authors) {
            formatted += `**Authors:** ${article.authors}\n`;
        }
        if (article.lastUpdated) {
            formatted += `**Last Updated:** ${article.lastUpdated}\n`;
        }
        formatted += '\n---\n\n';
        for (const section of article.sections) {
            formatted += `## ${section.name}\n\n`;
            formatted += `${section.content}\n\n`;
        }
        return formatted;
    }
    setupPromptHandlers() {
        // List available prompts
        this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
            prompts: [
                {
                    name: 'diagnostic_consultation',
                    description: 'Engage in a medical diagnostic consultation, asking questions and researching conditions',
                    arguments: [
                        {
                            name: 'chief_complaint',
                            description: 'The main symptom or concern (optional - can be asked during consultation)',
                            required: false,
                        },
                    ],
                },
            ],
        }));
        // Handle prompt requests
        this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
            const { name, arguments: args } = request.params;
            if (name === 'diagnostic_consultation') {
                const chiefComplaint = args?.chief_complaint;
                const promptText = getDiagnosticPrompt(chiefComplaint);
                return {
                    description: 'Medical diagnostic consultation with systematic symptom assessment',
                    messages: [
                        {
                            role: 'user',
                            content: {
                                type: 'text',
                                text: 'Help me understand my symptoms.',
                            },
                        },
                        {
                            role: 'assistant',
                            content: {
                                type: 'text',
                                text: promptText,
                            },
                        },
                    ],
                };
            }
            throw new Error(`Unknown prompt: ${name}`);
        });
    }
    setupErrorHandling() {
        this.server.onerror = (error) => {
            console.error('[MCP Error]', error);
        };
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Doctor Claude MCP server running on stdio');
    }
}
// Start the server
const server = new DoctorClaudeServer();
server.run().catch((error) => {
    console.error('Fatal error running server:', error);
    process.exit(1);
});
