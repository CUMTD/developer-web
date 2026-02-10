export function obfuscateKeyString(key: string) {
	if (key.length === 0) {
		// Ensure a minimum obfuscation pattern is shown even for empty keys
		return "****";
	}
	if (key.length <= 8) {
		return "*".repeat(key.length);
	}

	return `${key.slice(0, 4)}${"*".repeat(27)}${key.slice(-4)}`;
}

type ObfuscatedKeyProps = Readonly<{
	apiKey: string;
}>;

export default function ObfuscatedKey({ apiKey }: ObfuscatedKeyProps) {
	return <>{obfuscateKeyString(apiKey)}</>;
}
