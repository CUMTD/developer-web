export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "14.1";
	};
	public: {
		Tables: {
			api_key: {
				Row: {
					created_at: string;
					developer_id: string;
					is_active: boolean;
					key: string;
					name: string;
					notes: string | null;
				};
				Insert: {
					created_at?: string;
					developer_id: string;
					is_active?: boolean;
					key?: string;
					name: string;
					notes?: string | null;
				};
				Update: {
					created_at?: string;
					developer_id?: string;
					is_active?: boolean;
					key?: string;
					name?: string;
					notes?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "api_key_developer_id_fkey";
						columns: ["developer_id"];
						isOneToOne: false;
						referencedRelation: "developer";
						referencedColumns: ["id"];
					},
				];
			};
			developer: {
				Row: {
					accepted_tos_version_id: string | null;
					created_at: string;
					current_tokens: number;
					id: string;
					is_active: boolean;
					last_token_count_update: string;
					name: string | null;
					tokens_per_hour: number;
				};
				Insert: {
					accepted_tos_version_id?: string | null;
					created_at?: string;
					current_tokens?: number;
					id: string;
					is_active?: boolean;
					last_token_count_update?: string;
					name?: string | null;
					tokens_per_hour?: number;
				};
				Update: {
					accepted_tos_version_id?: string | null;
					created_at?: string;
					current_tokens?: number;
					id?: string;
					is_active?: boolean;
					last_token_count_update?: string;
					name?: string | null;
					tokens_per_hour?: number;
				};
				Relationships: [
					{
						foreignKeyName: "developer_accepted_tos_version_id_fkey";
						columns: ["accepted_tos_version_id"];
						isOneToOne: false;
						referencedRelation: "tos_version";
						referencedColumns: ["id"];
					},
				];
			};
			developer_tos_acceptance: {
				Row: {
					accepted_at: string;
					developer_id: string;
					tos_version_id: string;
				};
				Insert: {
					accepted_at?: string;
					developer_id: string;
					tos_version_id: string;
				};
				Update: {
					accepted_at?: string;
					developer_id?: string;
					tos_version_id?: string;
				};
				Relationships: [
					{
						foreignKeyName: "developer_tos_acceptance_developer_id_fkey";
						columns: ["developer_id"];
						isOneToOne: false;
						referencedRelation: "developer";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "developer_tos_acceptance_tos_version_id_fkey";
						columns: ["tos_version_id"];
						isOneToOne: false;
						referencedRelation: "tos_version";
						referencedColumns: ["id"];
					},
				];
			};
			tos_version: {
				Row: {
					content: string;
					created_at: string;
					id: string;
					is_current: boolean;
					is_required: boolean;
					supersedes: string | null;
					version: string;
				};
				Insert: {
					content: string;
					created_at?: string;
					id?: string;
					is_current?: boolean;
					is_required?: boolean;
					supersedes?: string | null;
					version: string;
				};
				Update: {
					content?: string;
					created_at?: string;
					id?: string;
					is_current?: boolean;
					is_required?: boolean;
					supersedes?: string | null;
					version?: string;
				};
				Relationships: [
					{
						foreignKeyName: "tos_version_supersedes_fkey";
						columns: ["supersedes"];
						isOneToOne: false;
						referencedRelation: "tos_version";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			accept_required_tos: { Args: never; Returns: undefined };
			validate_api_key: {
				Args: { p_key: string };
				Returns: {
					developer_id: string;
				}[];
			};
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
