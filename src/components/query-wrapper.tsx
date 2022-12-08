import React from 'react'
import {type DefaultErrorShape} from '@trpc/server'
import {type DefaultErrorData} from '@trpc/server/dist/error/formatter'
import {type UseTRPCQueryResult} from '@trpc/react-query/shared'
import {useAutoAnimate} from '@formkit/auto-animate/react'

type ErrorType = {
	message: string
	data?: DefaultErrorData | null
	shape?: DefaultErrorShape | null
}

type Props<T> = UseTRPCQueryResult<T, ErrorType> & {
	children: (data: T | never[]) => JSX.Element
	Loading?: JSX.Element
	Empty?: JSX.Element
	Error?: (error: ErrorType) => JSX.Element
}

const QueryWrapper = <T,>({
	isLoading,
	isError,
	data,
	error,
	refetch,
	isInitialLoading,
	Loading: CustomLoading,
	Empty: CustomEmpty,
	Error: CustomError,
	children,
}: Props<T>) => {
	const duration = 350
	const [containerRef] = useAutoAnimate<HTMLDivElement>({duration})
	const [listRef] = useAutoAnimate<HTMLDivElement>({duration})

	React.useEffect(() => {
		// TODO: Find a better way to handle animation after redirect
		const timer = setTimeout(() => {
			if (!isInitialLoading) {
				refetch()
			}
		}, duration)
		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div ref={containerRef}>
			{isLoading ? (
				<Loading CustomLoading={CustomLoading} />
			) : isError ? (
				<Error error={error} CustomError={CustomError} refetch={refetch} />
			) : (Array.isArray(data) && data.length === 0) || data === null ? (
				<Empty CustomEmpty={CustomEmpty} />
			) : (
				<React.Fragment />
			)}
			<div className={children([]).props.className} ref={listRef}>
				{data && children(data).props.children}
			</div>
		</div>
	)
}

const Loading = ({CustomLoading}: {CustomLoading?: JSX.Element}) =>
	CustomLoading ?? <p className='text-gray-200'>Loading...</p>

const Error = ({
	error,
	CustomError,
	refetch,
}: {
	error: ErrorType
	CustomError?: (error: ErrorType) => JSX.Element
	refetch: () => void
}) =>
	CustomError ? (
		CustomError(error)
	) : (
		<>
			{error.data && (
				<p className='text-gray-200'>
					[{error.data.httpStatus}] {error.data.code} at {error.data.path}
				</p>
			)}
			<pre className='text-gray-200'>{error.message}</pre>
			<button
				onClick={() => refetch()}
				className='mt-2 rounded border px-2 text-gray-200'
			>
				Retry
			</button>
		</>
	)

const Empty = ({CustomEmpty}: {CustomEmpty?: JSX.Element}) =>
	CustomEmpty ?? <p className='text-gray-200'>There is not data</p>

export default QueryWrapper
