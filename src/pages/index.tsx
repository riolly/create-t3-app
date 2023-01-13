import Link from 'next/link'
import Image from 'next/image'

import {type NextPageWithLayout} from './_app'
import NavbarLayout from 'layouts/navbar'
import MetaHead from 'components/meta-head'

const HomePage: NextPageWithLayout = () => {
	return (
		<>
			<MetaHead
				title='Create T3 App | Riolly'
				description='The best way to scaffold fullstack app with the power of extended T3 stack'
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				imageUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/home.jpg`}
			/>
			<main className='flex flex-col items-center justify-center gap-8 px-4 md:gap-12'>
				<Link href='https://github.com/riolly/create-t3-app/' target='_blank'>
					<h1 className='text-4xl font-extrabold md:text-[5rem]'>
						Create&nbsp;
						<Image
							width={144}
							height={144}
							className='inline w-12 align-text-bottom md:-mr-4 md:w-24 md:align-text-top'
							src='/mstile-144x144.png'
							alt='T3'
						/>
						&nbsp;App
					</h1>
				</Link>

				<p className='-mt-6 text-xl md:-mt-12 md:text-2xl'>
					Riolly&apos;s opinionated version of&nbsp;
					<Link
						href='https://create.t3.gg/'
						className='font-highlight underline decoration-blue-300 underline-offset-4 transition-all hover:tracking-wider'
						target='_blank'
					>
						create-t3-app
					</Link>
				</p>

				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8'>
					<TechnologyCard
						name='React Hook Form'
						description='When you go full-stack, for sure you need a form before sending data to the server. RHF is best in class.'
						documentation='https://react-hook-form.com/'
					/>
					<TechnologyCard
						name='Headless UI'
						description='Need more complex components like dropdown, modal, popover? HeadlessUI by tailwindlabs is accessible by default.'
						documentation='https://headlessui.com/'
					/>
					<TechnologyCard
						name='Hero Icons'
						description="Who doesn't use icons nowadays? Also created by tailwindlabs, it has enough collection just to get started."
						documentation='https://heroicons.com/'
					/>
					<TechnologyCard
						name='Auto Animate'
						description='Better UX for free just by installing this library and one line of code. No more janky websites.'
						documentation='https://auto-animate.formkit.com/'
					/>
					<TechnologyCard
						name='Dayjs'
						description='You will deal with date sooner or later. day.js is the most versatile yet lightweight.'
						documentation='https://day.js.org/'
					/>
					<TechnologyCard
						name='And many more goodness'
						description='More config & example to kickstart your project more exciting 🚀'
						documentation='https://github.com/riolly/create-t3-app/'
					/>
				</div>
			</main>
		</>
	)
}

export default HomePage

type TechnologyCardProps = {
	name: string
	description: string
	documentation: string
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
	name,
	description,
	documentation,
}) => {
	return (
		<Link
			className='flex max-w-xs flex-col gap-4 rounded-xl bg-light-bg/10 p-4 pl-6 pt-6 hover:bg-light-bg/20'
			href={documentation}
			target='_blank'
		>
			<h3 className='text-xl font-bold md:text-2xl '>{name} 🡵</h3>
			<p className='md:text-lg'>{description}</p>
		</Link>
	)
}

HomePage.getLayout = function getLayout(page: React.ReactElement) {
	return <NavbarLayout>{page}</NavbarLayout>
}
