import {SessionProvider} from 'next-auth/react'

import {api} from 'utils/api'

import '../styles/globals.scss'

import {type NextPage} from 'next'
import {type AppProps, type AppType} from 'next/app'
import {type Session} from 'next-auth'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
	P,
	IP
> & {getLayout?: (page: React.ReactElement) => React.ReactNode}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

const MyApp: AppType<{session: Session | null}> = ({
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
