import type { CustomProperties, PlausibleEventOptions } from "@plausible-analytics/tracker";
import throwError from "./throw-error";

function assertClient(): void {
	if (typeof window === "undefined") {
		throwError("trackPlausibleEvent() must only be called from client code.");
	}
}

export async function trackPlausibleEvent(
	event: string,
	props?: CustomProperties,
	interactive = true,
	callback?: (result?: { status: number } | { error: unknown } | undefined) => void,
): Promise<void> {
	assertClient();
	const options: PlausibleEventOptions = {
		props: props ?? {},
		interactive,
		...(callback ? { callback } : {}),
	};

	await trackPlausibleEventWithOptions(event, options);
}

export async function trackPlausibleEventWithOptions(event: string, options?: PlausibleEventOptions): Promise<void> {
	assertClient();
	const mod = await import("@plausible-analytics/tracker");
	mod.track(event, options ?? {});
}
