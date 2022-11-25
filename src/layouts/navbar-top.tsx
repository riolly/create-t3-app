import React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useSession, signIn, signOut} from 'next-auth/react'
import Image from 'next/image'

import Button from '@components/button'
import MenuButton from '@components/menu-button'

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

import {capFirstChar} from '@utils/literal'

export default function NavbarTopLayout({
	children,
}: {
	children: React.ReactNode
}) {
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

	const {status, data} = useSession()
	const menuItems = [
		{label: 'Sign out', Icon: LogoutIcon, onClick: () => signOut()},
	]

	return (
		<div className='min-h-screen bg-gradient-to-br from-primary-darkest to-bg-dark '>
			<div className='flex h-12 w-full items-center justify-between border-t-0 bg-opacity-30 pt-1 underline-offset-4 shadow-sm'>
				<div className='w-12' />
				<nav className='flex h-fit items-center md:gap-2'>
					{routes.map(({href, label, Icon, IconActive}, i) => {
						const isActive = pathname === href
						return (
							<React.Fragment key={label}>
								<Link
									href={href}
									className={`
										flex items-start gap-2 rounded px-2 py-1 font-medium text-light-primary 
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
									<span className='invisible text-light-primary md:visible'>
										&#9671;
									</span>
								)}
							</React.Fragment>
						)
					})}
				</nav>
				<div className='px-4'>
					{status === 'authenticated' ? (
						<MenuButton menuItems={menuItems}>
							{data.user?.image ? (
								<Image
									src={data.user.image}
									alt='user picture'
									width={32}
									height={32}
									className='rounded-full'
								/>
							) : (
								<div className='h-8 w-8 rounded-full bg-bg-light p-1'>
									<UserIcon className='h-full w-full text-secondary-normal' />
								</div>
							)}
						</MenuButton>
					) : (
						<Button
							variant='filled'
							className='rounded-lg bg-transparent px-2 py-1 text-sm font-medium'
							onClick={() => signIn()}
						>
							Signin <LoginIcon className='h-6 w-6 rotate-180 text-xl' />
						</Button>
					)}
				</div>
			</div>
			<main className='container mx-auto py-12'>{children}</main>
		</div>
	)
}
