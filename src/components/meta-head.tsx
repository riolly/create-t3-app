import Head from 'next/head'

type HeadProps = {
	title: string
	description: string
	imageUrl: string
	type?: 'website' | 'article'
	children?: React.ReactNode
}

const MetaHead = ({
	title,
	description,
	imageUrl,
	type = 'article',
	children,
}: HeadProps) => {
	const desc = description.slice(0, 160)

	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={desc} />

			<meta property='og:type' content={type} />
			{/* <meta property='og:url' content={url} /> */}
			<meta property='og:title' content={title} />
			<meta property='og:description' content={desc} />
			<meta property='og:image' content={imageUrl} />

			<meta name='twitter:card' content='summary_large_image' />
			<meta
				property='twitter:domain'
				content={process.env.NEXT_PUBLIC_VERCEL_URL}
			/>
			{/* <meta property='twitter:url' content={url} /> */}
			<meta name='twitter:title' content={title} />
			<meta name='twitter:description' content={desc} />
			<meta name='twitter:image' content={imageUrl} />
			{children}
		</Head>
	)
}

export default MetaHead
