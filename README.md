# Doctor Claude

An MCP server that:
1. Provides Claude Code with access to peer-reviewed medical information from trusted sources: MedlinePlus and StatPearls (NCBI).
2. Acts as an unliscensed diagnostic medical expert.

## Installation

### Quick Setup (Recommended)

1. Clone and navigate to the repository:
```bash
git clone https://github.com/gholtzap/doctor-claude.git
cd doctor-claude
```

2. Run the setup script:
```bash
./setup.sh
```

### Manual Setup

1. Clone and navigate to the repository:
```bash
git clone https://github.com/gholtzap/doctor-claude.git
cd doctor-claude
```

2. Install dependencies and build:
```bash
npm install
npm run build
```

3. Add to Claude Code (must be run from the repository directory):
```bash
claude mcp add --transport stdio doctor-claude -- node $(pwd)/build/index.js
```
**Important:** Make sure you're in the `doctor-claude` directory when running the above command.

### Next Steps

1. (Optional) Set your patient profile (see below)
2. Launch Claude Code and type `/doctor-claude:diagnostic_consultation`

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

**Privacy:** Your profile has the same privacy level as sending it in a claude chat. I, the developer, have 0 access to any profiles, as they are stored locally on your machine.

## Prompts

### diagnostic_consultation

Engages Claude in a systematic medical consultation process. Automatically includes your patient profile if available.

**Important:** This is for educational purposes only. If you are feeling unwell, see a doctor.

**Usage in Claude Code:**
```bash
/doctor-claude:diagnostic_consultation
```