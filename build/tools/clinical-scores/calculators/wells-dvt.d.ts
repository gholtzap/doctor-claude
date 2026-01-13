import { z } from 'zod';
import { WellsDVTInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateWellsDVT(inputs: z.infer<typeof WellsDVTInputSchema>): ScoreResult;
