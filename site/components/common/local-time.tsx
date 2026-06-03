"use client";

import { parseIsoOffsetToInstant } from "@helpers/parse-supabase-date";
import type { Temporal, TemporalModule } from "@lib/temporal";
import { getNativeTemporal, loadTemporal } from "@lib/temporal";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_TZ = "America/Chicago";

function getClientTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function toZdt(value: Temporal.Instant | string, timeZone: string, temporal: TemporalModule): Temporal.ZonedDateTime {
	const instant = typeof value === "string" ? parseIsoOffsetToInstant(value, temporal) : value;
	return instant.toZonedDateTimeISO(timeZone);
}

function formatZdt(
	zdt: Temporal.ZonedDateTime,
	locale: string | undefined,
	options: Intl.DateTimeFormatOptions,
): string {
	return new Intl.DateTimeFormat(locale, {
		...options,
		timeZone: zdt.timeZoneId,
	}).format(new Date(zdt.epochMilliseconds));
}

/**
 * Fallback formatter used server-side and while the Temporal polyfill is loading (Safari only).
 * Produces equivalent output to the Temporal formatter for ISO 8601 strings.
 */
function formatFallback(
	value: Temporal.Instant | string,
	timeZone: string,
	locale: string | undefined,
	options: Intl.DateTimeFormatOptions,
): string {
	const ms = typeof value === "string" ? new Date(value).getTime() : value.epochMilliseconds;
	return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(new Date(ms));
}

type LocalTimeProps = Readonly<{
	value: Temporal.Instant | string;
	variant?: "short" | "long" | "verbose" | Intl.DateTimeFormatOptions;
	locale?: string; // optional pinning; omit to use runtime default
}>;

export default function LocalTime({ value, variant = "short", locale }: LocalTimeProps) {
	const [timeZone, setTimeZone] = useState<string>(DEFAULT_TZ);

	// Initialize with native Temporal synchronously on Chrome 144+, Edge 144+, Firefox 139+.
	// Returns null on Safari and server-side (Node.js 22 has no native Temporal).
	const [temporal, setTemporal] = useState<TemporalModule | null>(getNativeTemporal);

	useEffect(() => {
		const tz = getClientTimeZone();
		if (tz !== DEFAULT_TZ) {
			setTimeZone(tz);
		}
	}, []);

	useEffect(() => {
		// Only runs for browsers without native Temporal (currently Safari).
		// The polyfill chunk is not downloaded by Chrome, Edge, or Firefox.
		if (temporal === null) {
			void loadTemporal().then(setTemporal);
		}
	}, [temporal]);

	const formatOptions: Intl.DateTimeFormatOptions = useMemo(() => {
		switch (variant) {
			case "short": {
				return { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "2-digit" };
			}
			case "long": {
				return {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "2-digit",
					weekday: "long",
				};
			}
			case "verbose": {
				return {
					year: "numeric",
					month: "long",
					day: "2-digit",
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
					weekday: "long",
					timeZoneName: "short",
				};
			}
			default: {
				return variant;
			}
		}
	}, [variant]);

	const text =
		temporal !== null
			? formatZdt(toZdt(value, timeZone, temporal), locale, formatOptions)
			: formatFallback(value, timeZone, locale, formatOptions);

	return <span suppressHydrationWarning>{text}</span>;
}
