import { saveProfile, loadProfile, clearProfile, PatientProfileSchema } from '../profile/manager.js';
export const SetPatientProfileSchema = PatientProfileSchema;
export async function setPatientProfile(args) {
    await saveProfile(args);
    return 'Patient profile saved successfully';
}
export async function getPatientProfile() {
    return await loadProfile();
}
export async function deletePatientProfile() {
    await clearProfile();
    return 'Patient profile cleared successfully';
}
