const ARABIC_CHARS_REGEX = /[\u0600-\u06FF]/;

export function hasArabic(text: string): boolean {
	const chars = text.replace(/\s/gm, "").split("");
	const charsLen = chars.length;
	for (let i = 0; i < charsLen; i++) {
		if (ARABIC_CHARS_REGEX.test(chars[i])) {
			return true;
		}
	}
	return false;
}

