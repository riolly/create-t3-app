import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {useSession, signIn, signOut} from 'next-auth/react'

import {
	HomeIcon as HomeOutlineIcon,
	DocumentTextIcon as ArticleOutlineIcon,
	ArrowLeftOnRectangleIcon as LoginIcon,
	ArrowRightOnRectangleIcon as LogoutIcon,
} from '@heroicons/react/24/outline'
import {
	HomeIcon as HomeSolidIcon,
	DocumentTextIcon as ArticleSolidIcon,
	UserIcon,
} from '@heroicons/react/24/solid'

import {capFirstChar} from 'utils/literal'
import {Menu, Transition} from '@headlessui/react'

type Icon = (props: React.ComponentProps<'svg'>) => JSX.Element

export default function NavbarLayout({children}: {children: React.ReactNode}) {
	const {pathname} = useRouter()
	const routes = [
		{
			href: '/',
			label: 'home',
			Icon: HomeOutlineIcon,
			IconActive: HomeSolidIcon,
		},
		{
			href: '/article',
			label: 'Articles',
			Icon: ArticleOutlineIcon,
			IconActive: ArticleSolidIcon,
		},
	]

	return (
		<div className='relative min-h-screen bg-gradient-to-br  from-secondary-darkest/80 via-primary-darkest to-dark-bg'>
			<div className='fixed bottom-0 z-10 flex w-full items-center justify-between border-t-0 bg-primary-darkest/50 bg-opacity-30 pt-2 pb-1 underline-offset-4 backdrop-blur-lg md:relative md:bg-inherit md:py-2 md:backdrop-blur-md'>
				<div className='ml-2 hidden h-10 w-10 md:block' />
				<Link
					href='/'
					className='ml-2 flex items-center justify-center rounded-full bg-primary-lighter/30 p-0.5 md:hidden'
				>
					<button className='h-8 w-8 rounded-full bg-dark-bg/50 p-1'>
						<HomeOutlineIcon className='h-full w-full text-primary-lightest' />
					</button>
				</Link>

				<nav className='flex h-fit items-center gap-4'>
					{routes.map(({href, label, Icon, IconActive}, i) => {
						const isActive = pathname === href
						return (
							<React.Fragment key={label}>
								<Link
									href={href}
									className={`
										flex w-16 flex-col items-center gap-0.5 rounded px-2 font-medium text-light-head md:w-fit md:flex-row md:gap-2 md:py-1 
										${label === 'home' ? 'hidden md:flex' : ''}
										${isActive ? 'pointer-events-none' : 'hover:underline'}
									`}
								>
									{isActive ? (
										<IconActive className='h-6 w-6 rounded-lg text-xl' />
									) : (
										<Icon className='h-6 w-6' />
									)}
									<span
										className={`
											whitespace-nowrap text-xs md:text-base
											${isActive ? 'underline' : ''}
										`}
									>
										{capFirstChar(label)}
									</span>
								</Link>

								{i !== routes.length - 1 && (
									<span className='mx-2 hidden text-xs text-light-head md:mx-0 md:block lg:mx-2'>
										&#9671;
									</span>
								)}
							</React.Fragment>
						)
					})}
				</nav>

				<AuthButton className='mr-2 h-10 md:px-4' />
			</div>

			<div className='container fixed bottom-0 mx-auto -mt-0.5 w-full bg-white/[15%] md:relative'>
				<div className='h-0.5' />
			</div>

			<div className='container mx-auto pb-20 pt-8 md:pb-16'>{children}</div>
		</div>
	)
}

function AuthButton({className}: {className?: string}) {
	const {status, data} = useSession()

	return (
		<div className={className}>
			{status === 'authenticated' ? (
				<Menu as='div' className='relative inline-block text-left'>
					<div>
						<Menu.Button
							className={`inline-flex w-full justify-center rounded-full bg-light-bg bg-opacity-25 p-0.5 text-sm font-medium text-light-head transition-all hover:bg-opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-light-head focus-visible:ring-opacity-75 md:-mt-0.5 md:p-1`}
						>
							{data.user?.image ? (
								<Image
									src={data.user.image}
									alt='user picture'
									width={36}
									height={36}
									className='rounded-full'
								/>
							) : (
								<div className='h-9 w-9 rounded-full bg-light-bg p-0.5'>
									<UserIcon className='h-full w-full text-primary-normal' />
								</div>
							)}
						</Menu.Button>
					</div>
					<Transition
						as={React.Fragment}
						enter='transition ease-out duration-100'
						enterFrom='transform opacity-0 scale-95'
						enterTo='transform opacity-100 scale-100'
						leave='transition ease-in duration-75'
						leaveFrom='transform opacity-100 scale-100'
						leaveTo='transform opacity-0 scale-95'
					>
						<Menu.Items
							className={`absolute -top-24 right-0 -mt-2 w-40 origin-top-right divide-y-0 rounded-md bg-light-head py-1.5 px-2 text-primary-darker/75 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:top-full md:mt-2`}
						>
							<div className='flex justify-between p-1 font-body font-medium text-dark-body'>
								<span className='truncate'>{data.user?.name}</span>
							</div>
							<MenuItem
								className='pt-1'
								label='Sign out'
								Icon={LogoutIcon}
								onClick={() => void signOut()}
							/>
						</Menu.Items>
					</Transition>
				</Menu>
			) : (
				<div className='flex items-center justify-center rounded-full bg-primary-lightest bg-opacity-30 p-0.5 transition-all hover:bg-opacity-60 md:rounded-xl'>
					<button
						className='h-8 w-8 items-center rounded-full bg-dark-bg bg-opacity-60 p-1 transition-all hover:bg-opacity-80 md:flex md:w-fit md:rounded-xl'
						onClick={() => void signIn()}
					>
						<LoginIcon className='h-full w-full rotate-180 text-primary-lightest md:ml-0.5' />
						<span className='mx-1 hidden md:block'>Signin</span>
					</button>
				</div>
			)}
		</div>
	)
}

const MenuItem = ({
	label,
	Icon,
	onClick,
	className,
	buttonClassName,
}: {
	label: string
	Icon: Icon
	onClick: () => void
	className?: string
	buttonClassName?: string
}) => {
	return (
		<div className={className}>
			<Menu.Item>
				{({active}) => (
					<button
						onClick={onClick}
						className={`
							group flex w-full items-center justify-between whitespace-nowrap rounded-md bg-primary-darker bg-opacity-75 px-1 py-2 text-light-head transition-colors hover:bg-primary-normal
							${active ? 'bg-primary-lighter text-light-head' : 'text-light-body'}
							${buttonClassName ?? ''}
						`}
					>
						{label}
						<Icon
							className={`
								h-5 w-5 
								${active ? 'text-primary-lightest' : 'text-primary-lighter'}
							`}
							aria-hidden='true'
						/>
					</button>
				)}
			</Menu.Item>
		</div>
	)
}
