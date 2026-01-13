import { z } from 'zod';
import { CHA2DS2VAScInputSchema } from '../schemas.js';
import type { ScoreResult } from '../types.js';
export declare function calculateCHA2DS2VASc(inputs: z.infer<typeof CHA2DS2VAScInputSchema>): ScoreResult;
