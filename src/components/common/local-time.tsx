"use client";

import { parseIsoOffsetToInstant } from "@helpers/parse-supabase-date";
import type { Temporal } from "@lib/temporal";
import { useEffect, useMemo, useState } from "react";

const DEFAULT_TZ = "America/Chicago";

function getClientTimeZone(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function toZdt(value: Temporal.Instant | string, timeZone: string): Temporal.ZonedDateTime {
	const instant = typeof value === "string" ? parseIsoOffsetToInstant(value) : value;
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

type LocalTimeProps = Readonly<{
	value: Temporal.Instant | string;
	variant?: "short" | "long" | "verbose" | Intl.DateTimeFormatOptions;
	locale?: string; // optional pinning; omit to use runtime default
}>;

export default function LocalTime({ value, variant = "short", locale }: LocalTimeProps) {
	const [timeZone, setTimeZone] = useState<string>(DEFAULT_TZ);

	useEffect(() => {
		const tz = getClientTimeZone();
		if (tz !== DEFAULT_TZ) {
			setTimeZone(tz);
		}
	}, []);

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

	const zdt = toZdt(value, timeZone);
	const text = formatZdt(zdt, locale, formatOptions);

	return <span suppressHydrationWarning>{text}</span>;
}
