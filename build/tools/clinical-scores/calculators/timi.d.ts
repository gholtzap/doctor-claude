import { z } from 'zod';
import { TIMIInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateTIMI(inputs: z.infer<typeof TIMIInputSchema>): ScoreResult;
