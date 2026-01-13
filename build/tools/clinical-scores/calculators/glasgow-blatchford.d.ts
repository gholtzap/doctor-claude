import { z } from 'zod';
import { GlasgowBlatchfordInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateGlasgowBlatchford(inputs: z.infer<typeof GlasgowBlatchfordInputSchema>): ScoreResult;
