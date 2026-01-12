# Doctor Claude

An MCP server that:
1. Provides Claude Code with access to peer-reviewed medical information from trusted sources: MedlinePlus and StatPearls (NCBI).
2. Acts as an unliscensed diagnostic medical expert.

## Installation

1. setup
```bash
npm install
npm run build
```

2. add to claude code:
```bash
claude mcp add --transport stdio doctor-claude -- node $(pwd)/build/index.js
```

## Prompts

### diagnostic_consultation

Engages Claude in a systematic medical consultation process. 

**Important:** This is for educational purposes only. Claude will provide disclaimers and emphasize the need for professional medical care.

**Usage in Claude Code:**
```bash
/mcp__doctor_claude__diagnostic_consultation
```


## Tools

### search_medical_info

Search for peer-reviewed medical information from MedlinePlus and StatPearls.

**Parameters:**
- `query` (string, required): Medical topic or condition to search for
- `source` (enum, optional): "medlineplus" | "statpearls" | "both" (default: "both")

**Returns:** Array of search results with titles, URLs, and descriptions

**Example:**
```json
{
  "query": "allergic rhinitis",
  "source": "both"
}
```

### fetch_medical_article

Fetch and parse the full content of a medical article.

**Parameters:**
- `url` (string, required): URL of the article (must be from allowed domains)

**Returns:** Structured article with sections (symptoms, treatment, etc.)

**Example:**
```json
{
  "url": "https://medlineplus.gov/ency/article/000813.htm"
}
```