import { z } from "zod";

export const ClientEnvSchema = z.object({
	NEXT_PUBLIC_BASE_URL: z.url(),
});

export const ServerEnvSchema = z.object({
	// SAMPLE_SERVER_VAR: z.string().min(1),
});
