import { z } from 'zod';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';
export const PatientProfileSchema = z.object({
    age: z.number().min(0).max(150).optional(),
    weight: z.object({
        value: z.number().min(0),
        unit: z.enum(['kg', 'lbs'])
    }).optional(),
    height: z.object({
        value: z.number().min(0),
        unit: z.enum(['cm', 'in', 'ft'])
    }).optional(),
    sex: z.enum(['male', 'female', 'other']).optional(),
    chronicConditions: z.array(z.string()).optional(),
    medications: z.array(z.string()).optional(),
    allergies: z.array(z.string()).optional(),
    surgicalHistory: z.array(z.string()).optional(),
    familyHistory: z.array(z.string()).optional(),
});
const PROFILE_DIR = path.join(os.homedir(), '.doctor-claude');
const PROFILE_FILE = path.join(PROFILE_DIR, 'profile.json');
const LOCAL_PROFILE_FILES = [
    'patient-profile.json',
    '.doctor-claude-profile.json'
];
async function ensureProfileDir() {
    try {
        await fs.mkdir(PROFILE_DIR, { recursive: true });
    }
    catch (error) {
        console.error('[Profile] Error creating profile directory:', error);
        throw new Error('Failed to create profile directory');
    }
}
async function findLocalProfile() {
    for (const filename of LOCAL_PROFILE_FILES) {
        const localPath = path.join(process.cwd(), filename);
        try {
            await fs.access(localPath);
            console.error(`[Profile] Found local profile at: ${localPath}`);
            return localPath;
        }
        catch {
            continue;
        }
    }
    return null;
}
export async function saveProfile(profile) {
    await ensureProfileDir();
    const validated = PatientProfileSchema.parse(profile);
    try {
        await fs.writeFile(PROFILE_FILE, JSON.stringify(validated, null, 2), 'utf-8');
        console.error('[Profile] Profile saved successfully');
    }
    catch (error) {
        console.error('[Profile] Error saving profile:', error);
        throw new Error('Failed to save profile');
    }
}
export async function loadProfile() {
    const localProfile = await findLocalProfile();
    const profilePath = localProfile || PROFILE_FILE;
    try {
        const data = await fs.readFile(profilePath, 'utf-8');
        const parsed = JSON.parse(data);
        return PatientProfileSchema.parse(parsed);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return null;
        }
        console.error('[Profile] Error loading profile:', error);
        throw new Error('Failed to load profile');
    }
}
export async function clearProfile() {
    try {
        await fs.unlink(PROFILE_FILE);
        console.error('[Profile] Profile cleared successfully');
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            return;
        }
        console.error('[Profile] Error clearing profile:', error);
        throw new Error('Failed to clear profile');
    }
}
export function formatProfileForPrompt(profile) {
    if (!profile) {
        return '';
    }
    const parts = [];
    if (profile.age !== undefined) {
        parts.push(`Age: ${profile.age} years`);
    }
    if (profile.sex) {
        parts.push(`Sex: ${profile.sex}`);
    }
    if (profile.weight) {
        parts.push(`Weight: ${profile.weight.value} ${profile.weight.unit}`);
    }
    if (profile.height) {
        parts.push(`Height: ${profile.height.value} ${profile.height.unit}`);
    }
    if (profile.chronicConditions && profile.chronicConditions.length > 0) {
        parts.push(`Chronic Conditions: ${profile.chronicConditions.join(', ')}`);
    }
    if (profile.medications && profile.medications.length > 0) {
        parts.push(`Current Medications: ${profile.medications.join(', ')}`);
    }
    if (profile.allergies && profile.allergies.length > 0) {
        parts.push(`Allergies: ${profile.allergies.join(', ')}`);
    }
    if (profile.surgicalHistory && profile.surgicalHistory.length > 0) {
        parts.push(`Surgical History: ${profile.surgicalHistory.join(', ')}`);
    }
    if (profile.familyHistory && profile.familyHistory.length > 0) {
        parts.push(`Family History: ${profile.familyHistory.join(', ')}`);
    }
    if (parts.length === 0) {
        return '';
    }
    return `\n\n**PATIENT PROFILE:**\n${parts.join('\n')}\n`;
}
