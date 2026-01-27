export function readStorage(key: string): string | null {
	if (typeof window === "undefined") {
		return null;
	}

	const stored = window.localStorage.getItem(key);
	return stored;
}

export function readStorageJSON<T>(key: string): T | null {
	const stored = readStorage(key);
	if (!stored) {
		return null;
	}

	try {
		return JSON.parse(stored) as T;
	} catch {
		return null;
	}
}

export function readStorageBoolean(key: string, defaultValue: boolean = false): boolean {
	const stored = readStorage(key);
	if (stored === "true") {
		return true;
	}
	if (stored === "false") {
		return false;
	}
	return defaultValue;
}

export function writeStorage(key: string, value: unknown) {
	if (typeof window === "undefined") {
		return;
	}

	if (typeof value === "object") {
		window.localStorage.setItem(key, JSON.stringify(value));
	} else {
		window.localStorage.setItem(key, String(value));
	}
}
