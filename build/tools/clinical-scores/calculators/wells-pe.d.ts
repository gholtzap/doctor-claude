import { z } from 'zod';
import { WellsPEInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateWellsPE(inputs: z.infer<typeof WellsPEInputSchema>): ScoreResult;
