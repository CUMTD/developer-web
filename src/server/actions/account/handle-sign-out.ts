"use server";

import { createClient } from "@server/supabase/server";
import { redirect } from "next/navigation";
import "server-only";

export async function handleSignOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	return redirect("/");
}
