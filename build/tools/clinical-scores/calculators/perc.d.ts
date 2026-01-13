import { z } from 'zod';
import { PERCInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculatePERC(inputs: z.infer<typeof PERCInputSchema>): ScoreResult;
