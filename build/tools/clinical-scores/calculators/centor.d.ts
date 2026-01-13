import { z } from 'zod';
import { CentorInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateCentor(inputs: z.infer<typeof CentorInputSchema>): ScoreResult;
