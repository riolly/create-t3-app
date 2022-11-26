import {createCipheriv, createDecipheriv, randomBytes} from 'node:crypto'
import {env} from 'env/server.mjs'

const encrypt = (text: string) => {
	const iv = randomBytes(16)
	const cipher = createCipheriv(env.CRYPTO_ALGORITHM, env.REVALIDATION_KEY, iv)
	const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

	return {
		iv: iv.toString('hex'),
		content: encrypted.toString('hex'),
	}
}

const decrypt = (hash: ReturnType<typeof encrypt>) => {
	const decipher = createDecipheriv(
		env.CRYPTO_ALGORITHM,
		env.REVALIDATION_KEY,
		Buffer.from(hash.iv, 'hex')
	)

	const decrpyted = Buffer.concat([
		decipher.update(Buffer.from(hash.content, 'hex')),
		decipher.final(),
	])

	return decrpyted.toString()
}

export {encrypt, decrypt}
