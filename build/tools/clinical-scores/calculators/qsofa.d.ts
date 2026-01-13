import { z } from 'zod';
import { QSOFAInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateQSOFA(inputs: z.infer<typeof QSOFAInputSchema>): ScoreResult;
