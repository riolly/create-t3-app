import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useSession, signIn, signOut} from 'next-auth/react'
import Image from 'next/image'

import {Button} from 'components/button'

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
			label: 'article',
			Icon: ArticleOutlineIcon,
			IconActive: ArticleSolidIcon,
		},
	]

	return (
		<div className='relative min-h-screen bg-gradient-to-br from-primary-darkest to-dark-bg'>
			<div className='fixed bottom-0 z-10 flex w-full items-center justify-between border-t-0 bg-primary-darkest/50 bg-opacity-30 py-2 underline-offset-4 shadow-sm backdrop-blur-lg md:relative md:bg-inherit'>
				<div className='w-12' />
				<nav className='flex h-fit items-center gap-2'>
					{routes.map(({href, label, Icon, IconActive}, i) => {
						const isActive = pathname === href
						return (
							<React.Fragment key={label}>
								<Link
									href={href}
									className={`
										flex items-start gap-2 rounded px-2 py-1 font-medium text-light-head 
										${isActive ? 'pointer-events-none' : 'hover:underline'}
									`}
								>
									{isActive ? (
										<IconActive className='h-6 w-6 rounded-lg text-xl ' />
									) : (
										<Icon className='h-6 w-6' />
									)}
									<span className={isActive ? 'underline' : ''}>
										{capFirstChar(label)}
									</span>
								</Link>

								{i !== routes.length - 1 && (
									<span className='invisible text-light-head md:visible'>
										&#9671;
									</span>
								)}
							</React.Fragment>
						)
					})}
					<div />
				</nav>

				<AuthButton className='px-2 md:px-4' />
			</div>
			<div className='container mx-auto py-12'>{children}</div>
		</div>
	)
}

function AuthButton({className}: {className?: string}) {
	const {status, data} = useSession()
	const menuItems = [
		{label: 'Sign out', Icon: LogoutIcon, onClick: () => signOut()},
	]

	return (
		<div className={className}>
			{status === 'authenticated' ? (
				<MenuButton
					menuItems={menuItems}
					itemsClassName='-top-full md:top-full right-0'
					buttonClassName='hover:bg-opacity-50 transition-all duration-500'
				>
					{data.user?.image ? (
						<Image
							src={data.user.image}
							alt='user picture'
							width={32}
							height={32}
							className='rounded-full'
						/>
					) : (
						<div className='h-8 w-8 rounded-full bg-light-bg p-1'>
							<UserIcon className='h-full w-full text-secondary-normal' />
						</div>
					)}
				</MenuButton>
			) : (
				<Button
					variant='filled'
					className='rounded-lg bg-transparent px-2 py-1 text-sm font-medium'
					onClick={() => void signIn()}
				>
					<span className='hidden md:block'>Signin</span>
					<LoginIcon className='h-7 w-7 rotate-180 text-xl md:h-6 md:w-6' />
				</Button>
			)}
		</div>
	)
}

import {Menu, Transition} from '@headlessui/react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

type MenuButtonProps = {
	children: React.ReactNode
	menuItems: {
		label: string
		Icon: HeroIcon
		onClick: () => void
	}[]
	buttonClassName?: string
	itemsClassName?: string
	itemClassName?: string
	iconClassName?: string
}

function MenuButton({
	children,
	menuItems,
	buttonClassName,
	itemsClassName,
	itemClassName,
	iconClassName,
}: MenuButtonProps) {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button
					className={`inline-flex w-full justify-center rounded-full bg-light-bg bg-opacity-25 p-1 text-sm font-medium text-light-head hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-light-head focus-visible:ring-opacity-75 ${
						buttonClassName ?? ''
					}`}
				>
					{children}
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
					className={`absolute w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-light-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
						itemsClassName ?? ''
					}`}
				>
					<div className='px-1 py-1'>
						{menuItems.map(({Icon, label, onClick}) => (
							<Menu.Item key={label}>
								{({active}) => (
									<button
										onClick={onClick}
										className={`
											group flex w-fit items-center whitespace-nowrap rounded-md px-2 py-2 text-sm
											${active ? 'bg-primary-normal text-light-head' : 'text-dark-head'}
											${itemClassName ?? ''}
										`}
									>
										<Icon
											className={`
												mr-2 h-5 w-5 
												${active ? 'text-secondary-lighter' : 'text-secondary-darker'}
												${iconClassName ?? ''}
											`}
											aria-hidden='true'
										/>
										{label}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
