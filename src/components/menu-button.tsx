import {Menu, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'

type HeroIcon = (props: React.ComponentProps<'svg'>) => JSX.Element

type ItemType = {
	label: string
	Icon: HeroIcon
	onClick: () => void
}

export default function MenuButton({
	children,
	menuItems,
}: {
	children: React.ReactNode
	menuItems: ItemType[]
}) {
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button className='inline-flex w-full justify-center rounded-full bg-bg-light bg-opacity-25 p-1 text-sm font-medium text-light-primary hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-light-primary focus-visible:ring-opacity-75'>
					{children}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-light-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='px-1 py-1'>
						{menuItems.map(({Icon, label, onClick}) => (
							<Menu.Item key={label}>
								{({active}) => (
									<button
										onClick={onClick}
										className={`
											group flex w-fit items-center whitespace-nowrap rounded-md px-2 py-2 text-sm
											${active ? 'bg-primary-normal text-light-primary' : 'text-dark-primary'} 
										`}
									>
										<Icon
											className={`
												mr-2 h-5 w-5 
												${active ? 'text-secondary-lighter' : 'text-secondary-darker'}
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
