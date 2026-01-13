import { z } from 'zod';
import { HASBLEDInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateHASBLED(inputs: z.infer<typeof HASBLEDInputSchema>): ScoreResult;
