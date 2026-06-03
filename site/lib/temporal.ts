import type { Temporal } from "@js-temporal/polyfill";

/** The runtime type of the Temporal namespace object. */
export type TemporalModule = typeof import("@js-temporal/polyfill").Temporal;

// Re-export for type-only use (Temporal.Instant, Temporal.ZonedDateTime, etc.)
export type { Temporal };

/** Cached Temporal implementation (native or lazily-loaded polyfill). */
let cached: TemporalModule | null = null;

/**
 * Returns the native Temporal synchronously if the current environment supports it, null otherwise.
 * Native support: Chrome 144+, Edge 144+, Firefox 139+. Not yet in Node.js 22 or Safari.
 */
export function getNativeTemporal(): TemporalModule | null {
	if (cached !== null) return cached;
	if ("Temporal" in globalThis) {
		// globalThis.Temporal is declared in site/types/temporal.d.ts.
		// Cast through unknown to avoid a structural incompatibility in the polyfill's Now type.
		cached = globalThis.Temporal as unknown as TemporalModule;
		return cached;
	}
	return null;
}

/**
 * Returns the Temporal implementation asynchronously.
 * Uses native Temporal when available; for browsers without support (currently Safari),
 * lazily loads the polyfill as a separate JS chunk — it will not be downloaded by
 * Chrome, Edge, or Firefox users.
 */
export async function loadTemporal(): Promise<TemporalModule> {
	const native = getNativeTemporal();
	if (native !== null) return native;

	// Dynamic import creates a separate lazy chunk. This chunk is only downloaded
	// by browsers that lack native Temporal support (currently Safari).
	const { Temporal: polyfill } = await import("@js-temporal/polyfill");
	cached = polyfill;
	return polyfill;
}
