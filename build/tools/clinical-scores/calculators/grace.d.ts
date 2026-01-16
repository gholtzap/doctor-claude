import { z } from 'zod';
import { GRACEInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateGRACE(inputs: z.infer<typeof GRACEInputSchema>): ScoreResult;
