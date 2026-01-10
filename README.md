# Doctor Claude MCP Server

A Model Context Protocol (MCP) server that provides Claude with access to peer-reviewed medical information from trusted sources: MedlinePlus and StatPearls (NCBI).

## Features

- **Domain-restricted**: Only fetches content from `medlineplus.gov` and `ncbi.nlm.nih.gov`
- **Two MCP tools**:
  - `search_medical_info`: Search for medical topics across both sources
  - `fetch_medical_article`: Retrieve full article content with structured sections
- **Diagnostic consultation prompt**: Guides Claude through a systematic medical interview process
- **Structured output**: Extracts and organizes medical information into readable sections

## Installation

```bash
npm install
npm run build
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

## Prompts

### diagnostic_consultation

Engages Claude in a systematic medical consultation process. Claude will:
- Ask detailed questions about symptoms
- Search and read medical literature
- Perform differential analysis
- Provide educational information using appropriate clinical uncertainty
- Recommend appropriate care

**Clinical Communication Standards:**
- Uses probabilistic language ("may suggest", "consistent with", "more likely")
- Avoids absolute statements and overconfident predictions
- Acknowledges uncertainty and limits of remote assessment
- Emphasizes need for professional testing and evaluation
- Presents differential diagnoses rather than single conclusions

**Important:** This is for educational purposes only. Claude will provide disclaimers and emphasize the need for professional medical care.

**Usage in Claude Code:**
```bash
# Invoke the diagnostic consultation prompt
/mcp__doctor_claude__diagnostic_consultation

# With a chief complaint (pass as first argument)
/mcp__doctor_claude__diagnostic_consultation "I have a persistent cough"
```

**How it works:**
1. Claude greets you and explains the consultation process
2. Asks systematic questions about your symptoms (onset, duration, severity, etc.)
3. Searches MedlinePlus and StatPearls for relevant conditions
4. Reads full articles about potential diagnoses
5. Asks targeted follow-up questions to differentiate conditions
6. Explains possible conditions in plain language
7. Recommends when/how to seek professional care

## Usage with Claude Code

Add the MCP server using the CLI:

```bash
claude mcp add --transport stdio doctor-claude -- node /Users/gmh/dev/doctor-claude/build/index.js
```

Then start using it:
```bash
# Basic search
"Search for information about diabetes"

# Diagnostic consultation
"Use the diagnostic_consultation prompt"
```

## Usage with Claude Desktop

Add to your Claude Desktop config file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "doctor-claude": {
      "command": "node",
      "args": ["/absolute/path/to/doctor-claude/build/index.js"]
    }
  }
}
```

## Testing

### With MCP Inspector

```bash
npm run inspector
```

This will launch the MCP Inspector for interactive testing.

### Manual Testing

```bash
npm run build
node build/index.js
```

## Development

```bash
# Watch mode for development
npm run watch
```

## Trusted Sources

- **MedlinePlus**: U.S. National Library of Medicine's health information service
- **StatPearls**: NCBI's peer-reviewed medical education resource

## Security

The server implements domain allowlisting to ensure only trusted medical sources are accessed. Any attempt to fetch content from other domains will be rejected.

## License

MIT
