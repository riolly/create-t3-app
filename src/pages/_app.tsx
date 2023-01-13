import {SessionProvider} from 'next-auth/react'

import {api} from 'utils/api'

import '../styles/globals.scss'

import {type NextPage} from 'next'
import {type AppProps} from 'next/app'
import {type Session} from 'next-auth'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {getLayout?: (page: React.ReactElement) => React.ReactNode}

type AppPropsWithLayout = AppProps<{session: Session | null}> & {
	Component: NextPageWithLayout
}

const MyApp = ({
	Component,
	pageProps: {session, ...pageProps},
}: AppPropsWithLayout) => {
	const getLayout = Component.getLayout || ((page) => page)

	return (
		<SessionProvider session={session}>
			{getLayout(<Component {...pageProps} />)}
		</SessionProvider>
	)
}

export default api.withTRPC(MyApp)
