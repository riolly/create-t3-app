export function capFirstChar(str: string): string {
	// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
	return str[0]?.toUpperCase() + str.slice(1)
}

export function pickFirstWord(str: string, maxChar?: number): string {
	let result = str.slice(0, str.indexOf(' ') - 0)

	if (maxChar) {
		result = result.slice(0, maxChar)
	}

	return result
}

export const slugify = (title: string, id?: string) => {
	let slug = title
		.normalize('NFD') // split an accented letter in the base letter and the accent
		.replace(/[\u0300-\u036F]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^\d a-z]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, '-') // separator

	if (id) slug += `_${id}`
	return slug
}

export const extractIdFromSlug = (str: string) => {
	return str.slice(str.lastIndexOf('_') + 1)
}
