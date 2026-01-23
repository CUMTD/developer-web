import { Temporal } from "@shared/lib/temporal";

export function parseIsoOffsetToInstant(value: string): Temporal.Instant {
	try {
		// Temporal.Instant.from() accepts ISO 8601 strings with an offset (+00:00, -05:00, etc.)
		return Temporal.Instant.from(value);
	} catch (err) {
		throw new Error(`Invalid ISO timestamp: "${value}"`, { cause: err });
	}
}
