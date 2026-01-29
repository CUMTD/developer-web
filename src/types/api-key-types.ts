import type { Database } from "@t/supabase";

type ApiKeyRow = Database["public"]["Tables"]["api_key"]["Row"];

/**
 * API Key result type for displaying API keys.
 * Used by both get-api-key and get-api-keys server actions.
 */
export type ApiKeyResult = Readonly<Pick<ApiKeyRow, "key" | "name" | "notes" | "created_at" | "is_active">>;

/**
 * Form state for adding a new API key.
 */
export type AddApiKeyFormState = Readonly<{
	ok: boolean;
	message?: string;
	fieldErrors?: Partial<Record<"name" | "notes", string>>;
}>;

/**
 * Form state for updating an existing API key.
 */
export type UpdateApiKeyFormState = Readonly<{
	ok: boolean;
	message?: string;
	fieldErrors?: Partial<Record<"name" | "notes", string>>;
}>;
