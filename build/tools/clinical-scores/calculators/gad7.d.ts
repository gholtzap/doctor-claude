import { z } from 'zod';
import { GAD7InputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateGAD7(inputs: z.infer<typeof GAD7InputSchema>): ScoreResult;
