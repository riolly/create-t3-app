import {initTRPC, TRPCError} from '@trpc/server'
import superjson from 'superjson'

import {type Context} from './context'

const t = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({shape}) {
		return shape
	},
})

export const router = t.router

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ctx, next}) => {
	if (!ctx.session || !ctx.session.user) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			message: 'You have to log in to access it.',
		})
	}
	return next({
		ctx: {
			// infers the `session` as non-nullable
			session: {...ctx.session, user: ctx.session.user},
		},
	})
})

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed)

const isAdmin = t.middleware(({ctx, next}) => {
	if (ctx?.session?.user.role !== 'ADMIN') {
		throw new TRPCError({
			code: 'FORBIDDEN',
			message: 'You have to log in as an admin to access it.',
		})
	}
	return next({
		ctx: {
			session: {...ctx.session, user: ctx.session.user},
		},
	})
})

/**
 * Protected procedure for admin only
 **/
export const adminProcedure = t.procedure.use(isAuthed).use(isAdmin)
