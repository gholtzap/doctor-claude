import { z } from 'zod';
import { CURB65InputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateCURB65(inputs: z.infer<typeof CURB65InputSchema>): ScoreResult;
