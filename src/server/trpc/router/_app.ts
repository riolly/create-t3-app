// src/server/trpc/router/_app.ts
import {router} from '../trpc'
import {authRouter} from './auth'
import {articleRouter} from './article'

export const appRouter = router({
	auth: authRouter,
	article: articleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
