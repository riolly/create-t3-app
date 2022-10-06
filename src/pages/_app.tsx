import {SessionProvider} from 'next-auth/react'
import {trpc} from '../utils/trpc'

import '../styles/globals.scss'

import type {AppType} from 'next/app'
import type {Session} from 'next-auth'

const MyApp: AppType<{session: Session | null}> = ({Component, pageProps}) => {
	return (
		<SessionProvider session={pageProps.session}>
			<Component {...pageProps} />
		</SessionProvider>
	)
}

export default trpc.withTRPC(MyApp)
