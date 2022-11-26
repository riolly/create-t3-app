import {encrypt} from './crypto'

export const BASE_URL = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000'

export async function revalidate(
	page: string,
	urlParam?: string
): Promise<{
	revalidated: boolean
	path: string
}> {
	const encryptedPath = encrypt(`/${page}/${urlParam ?? ''}`)

	return fetch(`${BASE_URL}/api/revalidate`, {
		method: 'POST',
		body: JSON.stringify(encryptedPath),
	}).then(async (response) => {
		await fetch(`${BASE_URL}/${page}/${urlParam ?? ''}`)
		return response.json()
	})
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
