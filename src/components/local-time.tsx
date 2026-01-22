"use client";

import { parseIsoOffsetToInstant } from "@helpers/parse-supabase-date";
import type { Temporal } from "@shared/lib/temporal";

function getClientTimeZone(): string {
	if (typeof window === "undefined") {
		return "UTC";
	}

	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function toLocal(value: Temporal.Instant | string): Temporal.ZonedDateTime {
	const timeZone = getClientTimeZone();
	const instant = typeof value === "string" ? parseIsoOffsetToInstant(value) : value;
	return instant.toZonedDateTimeISO(timeZone);
}

export function toLocalString(
	value: Temporal.Instant | string,
	options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	},
): string {
	const zdt = toLocal(value);

	return new Intl.DateTimeFormat(undefined, {
		...options,
		timeZone: zdt.timeZoneId,
	}).format(new Date(zdt.epochMilliseconds));
}

interface LocalTimeProps {
	value: Temporal.Instant | string;
	options?: "short" | "long" | "verbose" | Intl.DateTimeFormatOptions;
}

export default function LocalTime({ value, options = "short" }: LocalTimeProps) {
	let formatOptions: Intl.DateTimeFormatOptions;

	switch (options) {
		case "short":
			formatOptions = {
				year: "numeric",
				month: "numeric",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
			};
			break;
		case "long":
			formatOptions = {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit",
				weekday: "long",
			};
			break;
		case "verbose":
			formatOptions = {
				year: "numeric",
				month: "long",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				weekday: "long",
				timeZoneName: "short",
			};
			break;
		default:
			formatOptions = options;
	}

	return <>{toLocalString(value, formatOptions)}</>;
}
