import { z } from 'zod';
import { NIHSSInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateNIHSS(inputs: z.infer<typeof NIHSSInputSchema>): ScoreResult;
