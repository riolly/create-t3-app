/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react'
import cN from 'clsx'

import DivAnimate from './div-animate'
import {
	ArrowPathIcon,
	ExclamationTriangleIcon,
	ArchiveBoxIcon,
} from '@heroicons/react/24/outline'

import {type DefaultErrorShape} from '@trpc/server'
import {type DefaultErrorData} from '@trpc/server/dist/error/formatter'
import {type UseTRPCQueryResult} from '@trpc/react-query/shared'

type ErrorType = {
	message: string
	data?: DefaultErrorData | null
	shape?: DefaultErrorShape | null
}

export const LoadingPlaceholder = ({label}: {label?: string}) => {
	return (
		<>
			<ArrowPathIcon className='w-12 animate-spin text-light-head' />
			<p>Loading {label ?? 'data'}...</p>
		</>
	)
}

export const ErrorPlaceholder = ({
	label,
	error,
	refetch,
}: {
	label?: string
	error: ErrorType
	refetch: () => Promise<unknown>
}) => {
	return (
		<>
			<div className='relative'>
				<ExclamationTriangleIcon className='absolute w-12 animate-ping text-light-head' />
				<ExclamationTriangleIcon className='w-12 text-light-head' />
			</div>
			<p>Error while fetching {label ?? 'data'}</p>
			<div className='max-w-full overflow-auto rounded bg-dark-bg/20 px-4 py-2'>
				{error.data && (
					<p>
						[{error.data.httpStatus}] {error.data.code} at {error.data.path}
					</p>
				)}
				<p className='whitespace-pre-wrap break-all text-xs text-light-body'>
					{error.message}
				</p>
			</div>
			<button
				onClick={() => {
					void refetch()
				}}
				className='w-fit self-center rounded border px-3 py-0.5'
			>
				Retry
			</button>
		</>
	)
}

export const EmptyPlaceholder = ({
	label,
	onCreate,
}: {
	label?: string
	onCreate?: () => void
}) => {
	return (
		<>
			<ArchiveBoxIcon className='w-12 text-light-head' />
			<p>There are no {label ?? 'data'} yet</p>
			{!!onCreate && (
				<button
					onClick={onCreate}
					className='w-fit self-center rounded border px-3 py-0.5'
				>
					Create new
				</button>
			)}
		</>
	)
}

type Props<T> = UseTRPCQueryResult<T, ErrorType> & {
	children: (data: T | never[]) => JSX.Element
	label?: string
	className?: string
	onCreate?: () => void
}

export const QueryWrapper = <T,>({
	isLoading,
	isError,
	data,
	error,
	refetch,
	children,
	label,
	className,
	onCreate,
}: Props<T>) => {
	const isEmpty = Array.isArray(data) && data.length === 0

	return (
		<DivAnimate>
			{isLoading || isError || isEmpty ? (
				<DivAnimate
					className={cN(
						'flex h-96 w-full flex-col items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 py-4 px-8',
						className
					)}
				>
					{isLoading ? (
						<LoadingPlaceholder label={label} />
					) : isError ? (
						<ErrorPlaceholder label={label} error={error} refetch={refetch} />
					) : (
						<EmptyPlaceholder label={label} onCreate={onCreate} />
					)}
				</DivAnimate>
			) : (
				children(data)
			)}
		</DivAnimate>
	)
}
