import { z } from 'zod';
import {
  saveProfile,
  loadProfile,
  clearProfile,
  PatientProfileSchema,
  type PatientProfile
} from '../profile/manager.js';

export const SetPatientProfileSchema = PatientProfileSchema;

export type SetPatientProfileArgs = z.infer<typeof SetPatientProfileSchema>;

export async function setPatientProfile(args: SetPatientProfileArgs): Promise<string> {
  await saveProfile(args);
  return 'Patient profile saved successfully';
}

export async function getPatientProfile(): Promise<PatientProfile | null> {
  return await loadProfile();
}

export async function deletePatientProfile(): Promise<string> {
  await clearProfile();
  return 'Patient profile cleared successfully';
}
