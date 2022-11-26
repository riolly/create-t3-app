import Link, {LinkProps} from 'next/link'
import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import {ArrowPathIcon as LoadingIcon} from '@heroicons/react/24/outline'

export interface NativeButtonProps
	extends DetailedHTMLProps<
			ButtonHTMLAttributes<HTMLButtonElement>,
			HTMLButtonElement
		>,
		React.AriaAttributes {}

type Extension = {
	children: React.ReactNode
	className?: string
	variant: 'filled' | 'outlined'
	isLoading?: boolean
}
type CustomButtonProps = NativeButtonProps & Extension
type LinkButtonProps = LinkProps & Extension

const base =
	'relative whitespace-nowrap text-light-primary w-fit rounded-xl shadow-md transition ease-out focus:outline-none focus:ring-2 active:translate-y-2 active:shadow-md active:shadow-primary-lighter disabled:pointer-events-none disabled:border-gray-600 disabled:border-2 disabled:bg-gray-400'

const outlined =
	'border-[0.2rem] border-primary-normal px-5 py-2 hover:border-secondary-lighter hover:bg-primary-darker hover:shadow-primary-lightest focus:border-secondary-normal focus:ring-bg-light active:bg-primary-darkest'

const filled =
	'bg-primary-normal px-6 py-2.5 hover:bg-primary-lighter hover:text-primary-darkest hover:shadow-primary-lightest focus:ring-secondary-normal focus:ring-offset-2 active:bg-primary-lightest'

function Children({
	isLoading,
	children,
}: {
	isLoading: boolean
	children: React.ReactNode
}) {
	return (
		<>
			<span
				className={`
					flex items-center gap-2
					${isLoading ? 'invisible' : 'visible'}
				`}
			>
				{children}
			</span>
			<span
				className={`
					absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
					${isLoading ? 'visible' : 'invisible'} 
				`}
			>
				<LoadingIcon className='h-6 w-6 animate-spin text-light-primary' />
			</span>
		</>
	)
}

export function Button({
	children,
	className,
	variant,
	isLoading = false,
	...props
}: CustomButtonProps) {
	const variantClass = variant === 'outlined' ? outlined : filled

	return (
		<button
			{...props}
			disabled={isLoading}
			className={`${className} ${base} ${variantClass}`}
		>
			<Children isLoading={isLoading}>{children}</Children>
		</button>
	)
}

export function LinkButton({
	children,
	className,
	variant,
	isLoading = false,
	...props
}: LinkButtonProps) {
	const variantClass = variant === 'outlined' ? outlined : filled

	return (
		<Link {...props} className={`${className} ${base} ${variantClass}`}>
			<Children isLoading={isLoading}>{children}</Children>
		</Link>
	)
}
