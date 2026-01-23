// Provide client-side env vars with zod validation
// Only NEXT_PUBLIC_* vars here

import type { z } from "zod";
import { GlobalEnvSchema } from "./env.schema";

const rawClientEnv = {
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
	NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
} as const;

export const globalEnv = GlobalEnvSchema.parse(rawClientEnv);

export type GlobalEnv = z.infer<typeof GlobalEnvSchema>;
