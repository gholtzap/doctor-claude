/**
 * Diagnostic consultation prompt template
 * Guides Claude through a systematic medical consultation process
 */
export declare function getDiagnosticPrompt(chiefComplaint?: string): string;
export declare function getFollowUpQuestions(symptomCategory: string): string[];
