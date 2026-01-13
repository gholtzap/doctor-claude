import { z } from 'zod';
import { GCSInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateGCS(inputs: z.infer<typeof GCSInputSchema>): ScoreResult;
