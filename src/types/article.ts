import {z} from 'zod'
import {RouterOutputs} from 'utils/trpc'

export const articleCreateSchema = z.object({
	title: z
		.string()
		.max(160, 'Title is too long')
		.refine((input) => input.trim().split(' ').length > 1, {
			message: 'Describe title more clearly',
		}),
	content: z.string().min(200, 'Description is not long enough'),
})

export const articleUpdateSchema = articleCreateSchema.extend({
	id: z.string(),
	authorId: z.string(),
})

export type ArticleCreateType = z.infer<typeof articleCreateSchema>
export type ArticleUpdateType = z.infer<typeof articleUpdateSchema>
export type ArticleType = Exclude<RouterOutputs['article']['fetchOne'], null>
