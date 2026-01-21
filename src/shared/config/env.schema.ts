import { z } from "zod";

export const GlobalEnvSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
	SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
	SUPABASE_PROJECT_REF: z.string().min(1),
});

export const ServerEnvSchema = z.object({
	// SAMPLE_SERVER_VAR: z.string().min(1),
});
