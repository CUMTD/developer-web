import { z } from "zod";

export const GlobalEnvSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_URL: z.url(),
	NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(),
	NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().min(1),
	NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: z.string().optional(),
});

export const ServerEnvSchema = z.object({
	SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
	SUPABASE_PROJECT_REF: z.string().min(1),
});
