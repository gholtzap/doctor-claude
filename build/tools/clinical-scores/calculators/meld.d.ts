import { z } from 'zod';
import { MELDInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateMELD(inputs: z.infer<typeof MELDInputSchema>): ScoreResult;
