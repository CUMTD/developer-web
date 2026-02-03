export default function toTitleCase(str: string): string {
	// Convert the entire string to lowercase first for consistency
	const lowerCasedStr = str.toLocaleLowerCase();

	// Split the string into an array of words based on hyphens
	const words = lowerCasedStr.replace(/ /g, "-").split("-");

	// Process each word: capitalize the first letter and keep the rest lowercase
	const titleCasedWords = words.map((word) => {
		if (word.length === 0) {
			return "";
		}
		// charAt(0) gets the first character, toUpperCase() capitalizes it
		// slice(1) gets the rest of the word from the second character onwards
		return word.charAt(0).toLocaleUpperCase() + word.slice(1);
	});

	// Join the words back into a single string with spaces
	return titleCasedWords.join(" ");
}
