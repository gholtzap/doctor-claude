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

3. {optional} set your patient profile (more info below)

4. launch claude code and type `/mcp__doctor_claude__diagnostic_consultation`

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
/mcp__doctor_claude__diagnostic_consultation
```

## Clinical Score Calculators

Doctor Claude includes evidence-based clinical decision rule calculators:

### Available Calculators

**Sepsis & Infection**
- **SOFA Score** - Sequential Organ Failure Assessment. Gold standard for assessing organ dysfunction in critically ill patients. Part of Sepsis-3 definition. Scores 6 organ systems (respiration, coagulation, liver, cardiovascular, CNS, renal) from 0-4 each (max 24).
- **qSOFA** - Quick SOFA for sepsis screening (respiratory rate, mental status, blood pressure)

**Pneumonia**
- **CURB-65** - Pneumonia severity and mortality risk (confusion, urea, respiratory rate, blood pressure, age)

**Cardiovascular**
- **HEART Score** - Chest pain cardiac event risk (history, ECG, age, risk factors, troponin)
- **CHA2DS2-VASc** - Stroke risk in atrial fibrillation

**Thromboembolism**
- **Wells DVT** - Deep vein thrombosis probability
- **Wells PE** - Pulmonary embolism probability

**Neurology**
- **NIHSS** - NIH Stroke Scale for stroke severity assessment
- **Glasgow Coma Scale (GCS)** - Consciousness level assessment

**Gastrointestinal**
- **Alvarado Score** - Appendicitis risk assessment
- **Glasgow-Blatchford Score** - Upper GI bleeding risk and need for intervention

**Other**
- **Centor Score** - Streptococcal pharyngitis probability