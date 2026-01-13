import { z } from 'zod';
import { SOFAInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateSOFA(inputs: z.infer<typeof SOFAInputSchema>): ScoreResult;
