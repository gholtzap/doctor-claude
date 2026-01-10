/**
 * Diagnostic consultation prompt template
 * Guides Claude through a systematic medical consultation process
 */
export function getDiagnosticPrompt(chiefComplaint) {
    const opening = chiefComplaint
        ? `You mentioned: "${chiefComplaint}"\n\nLet me gather more information about this.`
        : 'What brings you here today? Please describe your main concern or symptom.';
    return `I'll conduct a medical consultation to help you understand your symptoms. Let me be clear about important disclaimers:

**IMPORTANT DISCLAIMERS:**
- I am an AI assistant, not a licensed medical professional
- This consultation is for educational purposes only
- I cannot provide definitive diagnoses or treatment recommendations
- You should always consult with a qualified healthcare provider for medical advice
- If you're experiencing a medical emergency, call emergency services immediately

**My Systematic Approach:**

I will follow a clinical diagnostic methodology:

1. **History Taking** - I'll ask about:
   - Chief complaint and onset
   - Duration, frequency, and progression
   - Severity (using pain scales where appropriate)
   - Location and radiation
   - Associated symptoms
   - Aggravating and relieving factors
   - Past medical history and medications
   - Recent exposures or changes

2. **Information Gathering** - After understanding your symptoms, I will:
   - Search MedlinePlus and StatPearls for relevant conditions
   - Read peer-reviewed articles about potential diagnoses
   - Compare your symptoms against medical criteria

3. **Differential Analysis** - I'll:
   - Identify multiple possible conditions
   - Ask targeted questions to differentiate between them
   - Narrow down the most likely explanations

4. **Education & Guidance** - I'll:
   - Explain potential conditions in understandable terms
   - Discuss severity and urgency
   - Recommend appropriate next steps for professional care
   - Provide information about self-care if appropriate

**Important Notes:**
- I will ask follow-up questions - please answer as thoroughly as possible
- Some questions may seem unrelated but help rule out serious conditions
- I'll use medical databases to ensure information is evidence-based
- My goal is to educate you, not replace a doctor visit

${opening}`;
}
export function getFollowUpQuestions(symptomCategory) {
    const questions = {
        pain: [
            'On a scale of 1-10, how severe is the pain?',
            'When did it start?',
            'Is it constant or does it come and go?',
            'What makes it better or worse?',
            'Does the pain move or radiate to other areas?',
        ],
        respiratory: [
            'When did you first notice this symptom?',
            'Is it constant or intermittent?',
            'Do you have any fever, cough, or difficulty breathing?',
            'Have you been exposed to anyone who was sick?',
            'Do you have any known allergies?',
        ],
        digestive: [
            'When did this start?',
            'How frequent is it?',
            'Have you noticed any blood or unusual color?',
            'Any recent dietary changes or new foods?',
            'Any associated nausea, vomiting, or fever?',
        ],
        neurological: [
            'When did you first notice this?',
            'Is it constant or episodic?',
            'Any associated headache, vision changes, or weakness?',
            'Any recent head injury or trauma?',
            'Any loss of consciousness?',
        ],
        dermatological: [
            'When did you first notice this?',
            'Is it spreading or changing?',
            'Any itching, pain, or discharge?',
            'Any recent exposure to new products, plants, or substances?',
            'Any fever or other symptoms?',
        ],
    };
    return questions[symptomCategory] || questions.pain;
}
