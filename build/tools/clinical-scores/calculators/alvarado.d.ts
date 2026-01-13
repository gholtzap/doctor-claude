import { z } from 'zod';
import { AlvaradoInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateAlvarado(inputs: z.infer<typeof AlvaradoInputSchema>): ScoreResult;
