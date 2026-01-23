"use client";

import { globalEnv } from "@shared/config/env.global";
import { useEffect } from "react";

let hasInited = false;

export function PlausibleAnalytics(): null {
	useEffect(() => {
		if (process.env.NODE_ENV !== "production") {
			return;
		}

		if (hasInited) {
			return;
		}

		const domain = globalEnv.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

		if (!domain) {
			return;
		}

		const start = () => {
			// Mark as initialized before async work
			// to prevent double-init if something re-mounts
			hasInited = true;

			void (async () => {
				try {
					const mod = await import("@plausible-analytics/tracker");

					mod.init({
						domain,
						autoCapturePageviews: true,
					});
				} catch (err) {
					// If init fails, allow a later retry
					hasInited = false;

					console.warn("Plausible init failed", err);
				}
			})();
		};

		// Use requestIdleCallback to avoid blocking page load
		// with a timeout fallback for browsers that don't support it (Safari)
		const requestIdle =
			window.requestIdleCallback ??
			((cb: IdleRequestCallback) => {
				window.setTimeout(() => {
					cb({
						didTimeout: false,
						timeRemaining: () => 0,
					} as IdleDeadline);
				}, 0);
			});

		requestIdle(start, { timeout: 2000 });
	}, []);

	return null;
}
