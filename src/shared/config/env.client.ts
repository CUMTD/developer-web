// Provide client-side env vars with zod validation
// Only NEXT_PUBLIC_* vars here

import type { z } from "zod";
import { ClientEnvSchema } from "./env.schema";

const rawClientEnv = {
	NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
} as const;

export const clientEnv = ClientEnvSchema.parse(rawClientEnv);

export type ClientEnv = z.infer<typeof ClientEnvSchema>;
