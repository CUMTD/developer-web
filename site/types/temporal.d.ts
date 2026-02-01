import type { Temporal as TemporalPolyfill } from "@js-temporal/polyfill";

declare global {
	const Temporal: typeof TemporalPolyfill;
}
