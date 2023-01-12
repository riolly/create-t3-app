import {TRPCError} from '@trpc/server'
import {z} from 'zod'

import {createTRPCRouter, publicProcedure, protectedProcedure} from '../trpc'
import {revalidate} from 'server/utils/revalidate'

import {articleCreateSchema, articleUpdateSchema} from 'schema/article'
import {slugify} from 'utils/literal'

const requiredIdSchema = z.object({id: z.string()})
const requiredIdAuthorIdSchema = requiredIdSchema.extend({authorId: z.string()})

export const articleRouter = createTRPCRouter({
	fetchAll: publicProcedure.query(({ctx}) =>
		ctx.prisma.article.findMany({
			include: {author: {select: {name: true, image: true}}},
		})
	),
	fetchOne: publicProcedure.input(requiredIdSchema).query(({ctx, input}) =>
		ctx.prisma.article.findUnique({
			where: {id: input.id},
			include: {author: {select: {name: true, image: true}}},
		})
	),
	create: protectedProcedure
		.input(articleCreateSchema)
		.mutation(({ctx, input}) => {
			return ctx.prisma.article.create({
				data: {
					...input,
					authorId: ctx.session.user.id,
				},
			})
		}),
	update: protectedProcedure
		.input(articleUpdateSchema)
		.mutation(async ({ctx, input: {id, ...input}}) => {
			if (ctx.session.user.id !== input.authorId)
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: 'You are not allowed to update this article',
				})
			return ctx.prisma.article
				.update({
					where: {id},
					data: input,
				})
				.then(async (updated) => {
					await revalidate('article', slugify(input.title, id))
					return updated
				})
		}),
	delete: protectedProcedure
		.input(requiredIdAuthorIdSchema)
		.mutation(({ctx, input}) => {
			if (ctx.session.user.id !== input.authorId)
				throw new TRPCError({
					code: 'FORBIDDEN',
					message: 'You are not allowed to delete this article',
				})
			return ctx.prisma.article.delete({where: {id: input.id}})
		}),
})
