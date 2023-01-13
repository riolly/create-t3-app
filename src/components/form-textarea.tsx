import React from 'react'
import {useFormContext} from 'react-hook-form'
import {ErrorMessage} from '@hookform/error-message'
import {capFirstChar} from 'utils/literal'

type InputProps<T> = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	name: keyof T
	label?: string
	wrapperClassName?: string
	labelClassName?: string
	inputClassName?: string
	errorClassName?: string
}

const TextAreaInput = <T,>({
	name,
	label,
	wrapperClassName,
	labelClassName,
	inputClassName,
	errorClassName,
	...props
}: InputProps<T>) => {
	const {
		register,
		formState: {errors},
	} = useFormContext()

	React.useEffect(() => {
		const textarea = document.querySelector(`#${name}`) as HTMLTextAreaElement
		const resizeHeight = () => {
			textarea.style.height = 'auto'
			textarea.style.height = `${textarea.scrollHeight}px`
		}

		textarea.addEventListener('input', resizeHeight)
		return () => {
			textarea.removeEventListener('input', resizeHeight)
		}
	}, [name])

	return (
		<div className={`flex flex-col ${wrapperClassName ?? ''}`}>
			<label htmlFor={name} className={labelClassName ?? ''}>
				{label ?? capFirstChar(name)}
			</label>
			<textarea
				id={name}
				{...register(name)}
				{...props}
				className={`resize-none overflow-hidden rounded bg-light-bg/80 py-2 px-4 ${
					inputClassName ?? ''
				}`}
			/>
			<ErrorMessage
				name={name}
				errors={errors}
				render={({message}) => (
					<small
						className={`mt-0.5 font-medium text-red-500 ${
							errorClassName ?? ''
						}`}
					>
						{message}
					</small>
				)}
			/>
		</div>
	)
}

export default TextAreaInput
