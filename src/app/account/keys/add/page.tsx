import { H1 } from "@components/heading";
import { createClient } from "@shared/lib/supabase/server";
import { unauthorized } from "next/navigation";
import ApiKeyAddForm from "./components/api-key-add-form";

export default async function AddApiKeyPage() {
	const supabase = await createClient();
	const { data: authData } = await supabase.auth.getClaims();

	if (authData === null) {
		unauthorized();
	}

	return (
		<>
			<H1>Add API Key</H1>
			<ApiKeyAddForm />
		</>
	);
}
