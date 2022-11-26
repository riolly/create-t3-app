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

