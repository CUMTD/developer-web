import type { Temporal } from "@js-temporal/polyfill";
import type { TemporalModule } from "@lib/temporal";

/**
 * Parses an ISO 8601 string with a UTC offset into a Temporal.Instant.
 * Accepts strings like "2024-01-15T10:30:00+05:00" from Supabase.
 */
export function parseIsoOffsetToInstant(value: string, temporal: TemporalModule): Temporal.Instant {
	try {
		// Temporal.Instant.from() accepts ISO 8601 strings with an offset (+00:00, -05:00, etc.)
		return temporal.Instant.from(value);
	} catch (err) {
		throw new Error(`Invalid ISO timestamp: "${value}"`, { cause: err });
	}
}
