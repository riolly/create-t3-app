// src/server/trpc/router/_app.ts
import {router} from '../trpc'
import {authRouter} from './auth'
import {exampleRouter} from './example'

export const appRouter = router({
	auth: authRouter,
	example: exampleRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
