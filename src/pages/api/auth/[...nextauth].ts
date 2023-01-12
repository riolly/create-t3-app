import NextAuth from 'next-auth'
// Prisma adapter for NextAuth, optional and can be removed
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

import {env} from 'env/server.mjs'
import {prisma} from 'server/db'

import {type NextAuthOptions} from 'next-auth'

export const authOptions: NextAuthOptions = {
	// Include user.id on session
	callbacks: {
		session({session, user}) {
			if (session.user) {
				session.user.id = user.id
			}
			return session
		},
		// jwt({token}) {
		// 	return token
		// },
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			httpOptions: {
				timeout: 10_000,
			},
		}),
		/**
		 * ...add more providers here
		 *
		 * Most other providers require a bit more work than the Discord provider.
		 * For example, the GitHub provider requires you to add the
		 * `refresh_token_expires_in` field to the Account model. Refer to the
		 * NextAuth.js docs for the provider you want to use. Example:
		 * @see https://next-auth.js.org/providers/github
		 */
	],
}

export default NextAuth(authOptions)
