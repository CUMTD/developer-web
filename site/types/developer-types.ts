import type { Database } from "@t/supabase";

type DeveloperRow = Database["public"]["Tables"]["developer"]["Row"];

/**
 * Developer account details result type.
 */
export type DeveloperResult = Readonly<
	Pick<
		DeveloperRow,
		"id" | "created_at" | "name" | "tokens_per_hour" | "current_tokens" | "last_token_count_update" | "is_active"
	>
>;
