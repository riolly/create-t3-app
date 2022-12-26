import {Menu, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'

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

export default function MenuButton({
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
					className={`inline-flex w-full justify-center rounded-full bg-light-bg bg-opacity-25 p-1 text-sm font-medium text-light-head hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-light-head focus-visible:ring-opacity-75 ${buttonClassName}`}
				>
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
				<Menu.Items
					className={`absolute w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-light-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${itemsClassName}`}
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
											${itemClassName}
										`}
									>
										<Icon
											className={`
												mr-2 h-5 w-5 
												${active ? 'text-secondary-lighter' : 'text-secondary-darker'}
												${iconClassName}
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
