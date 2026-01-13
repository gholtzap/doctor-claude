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

## Patient Profile

Create a `patient-profile.json` file in your working directory to provide personalized medical context during consultations. This file is automatically loaded when you start a diagnostic consultation.

**Example file (`patient-profile.json`):**
```json
{
  "age": 45,
  "sex": "female",
  "weight": { "value": 150, "unit": "lbs" },
  "height": { "value": 65, "unit": "in" },
  "chronicConditions": ["Type 2 Diabetes", "Hypertension"],
  "medications": ["Metformin 500mg twice daily", "Lisinopril 10mg daily"],
  "allergies": ["Penicillin", "Shellfish"],
  "surgicalHistory": ["Appendectomy (2015)"],
  "familyHistory": ["Mother: Breast cancer", "Father: Heart disease"]
}
```

All fields are optional. Copy `patient-profile.example.json` to `patient-profile.json` and customize it.

**Privacy:** Your profile is stored locally and never transmitted anywhere except as context when you use the diagnostic consultation prompt.

## Prompts

### diagnostic_consultation

Engages Claude in a systematic medical consultation process. Automatically includes your patient profile if available.

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

### set_patient_profile

Save patient profile information programmatically (alternative to creating a JSON file).

**Parameters:** All optional
- `age` (number): Patient age in years
- `sex` (enum): "male" | "female" | "other"
- `weight` (object): `{ value: number, unit: "kg" | "lbs" }`
- `height` (object): `{ value: number, unit: "cm" | "in" | "ft" }`
- `chronicConditions` (array of strings)
- `medications` (array of strings)
- `allergies` (array of strings)
- `surgicalHistory` (array of strings)
- `familyHistory` (array of strings)

### get_patient_profile

Retrieve the saved patient profile.

### delete_patient_profile

Delete the saved patient profile.