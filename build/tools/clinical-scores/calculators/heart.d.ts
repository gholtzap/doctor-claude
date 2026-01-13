import { z } from 'zod';
import { HEARTInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateHEART(inputs: z.infer<typeof HEARTInputSchema>): ScoreResult;
