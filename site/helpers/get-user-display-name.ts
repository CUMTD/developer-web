export default function getUserDisplayName(fullName: unknown, email: string | null | undefined): string {
	if (typeof fullName === "string") {
		const trimmedFullName = fullName.trim();
		if (trimmedFullName.length > 0) {
			return trimmedFullName;
		}
	}

	if (typeof email === "string") {
		const trimmedEmail = email.trim();
		const atIndex = trimmedEmail.indexOf("@");

		if (atIndex > 0) {
			return trimmedEmail.slice(0, atIndex);
		}
	}

	return "Unknown User";
}
