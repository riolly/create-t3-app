export function capFirstChar(str: string): string {
	return str[0]?.toUpperCase() + str.slice(1)
}

export function pickFirstWord(str: string, maxChar?: number): string {
	let result = str.slice(0, str.indexOf(' ') - 0)

	if (maxChar) {
		result = result.slice(0, maxChar)
	}

	return result
}
