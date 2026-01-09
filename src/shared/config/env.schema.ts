import { z } from "zod";

export const ClientEnvSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
});

export const ServerEnvSchema = z.object({
	// SAMPLE_SERVER_VAR: z.string().min(1),
});
