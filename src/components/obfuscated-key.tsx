export function obfuscateKeyString(key: string) {
	if (key.length <= 8) {
		return "*".repeat(key.length);
	}

	return `${key.slice(0, 4)}***************************${key.slice(-4)}`;
}

type ObfuscatedKeyChildProps = Readonly<{
	children: string | null | undefined;
}>;

type ObfuscatedKeyAttributeProps = Readonly<{
	apiKey: string;
}>;

type ObfuscatedKeyProps = ObfuscatedKeyChildProps | ObfuscatedKeyAttributeProps;

function isAttributeProps(props: ObfuscatedKeyProps): props is ObfuscatedKeyAttributeProps {
	return (props as ObfuscatedKeyAttributeProps)?.apiKey !== undefined;
}

export default function ObfuscatedKey(props: ObfuscatedKeyProps) {
	let key: string;

	if (isAttributeProps(props)) {
		key = props.apiKey;
	} else {
		key = props.children || "";
	}

	return <>{obfuscateKeyString(key)}</>;
}
