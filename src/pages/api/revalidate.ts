import {decrypt, type encrypt} from 'server/utils/crypto'
import {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<{
		revalidated: boolean
		path: string
		message?: string
		error?: unknown
	}>
) {
	const body = JSON.parse(req.body) as ReturnType<typeof encrypt>
	const decryptedPath = decrypt(body)

	const defaultRes = {revalidated: false, path: decryptedPath}
	if (req.method !== 'POST') {
		return res.status(400).json({...defaultRes, message: 'Invalid HTTP method'})
	}

	if (!decryptedPath) {
		return res.status(400).json({...defaultRes, message: 'Path required'})
	}

	try {
		await res.revalidate(decryptedPath)
		console.log('[REVALIDATE SUCCESS]', decryptedPath)
		return res.status(200).json({...defaultRes, revalidated: true})
	} catch (error) {
		console.log('[REVALIDATE ERROR]', error)
		return res
			.status(500)
			.json({...defaultRes, message: 'Invalidation error', error})
	}
}
