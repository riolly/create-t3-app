import React from 'react'
import {ErrorMessage} from '@hookform/error-message'
import cN from 'clsx'

import {capFirstChar} from 'utils/literal'

import {
	type FieldValues,
	type Path,
	type UseFormRegister,
	type FieldErrorsImpl,
	type FieldName,
} from 'react-hook-form'
import {type FieldValuesFromFieldErrors} from '@hookform/error-message'

type Errors<T extends FieldValues> = Partial<FieldErrorsImpl<T>>

type InputProps<T extends FieldValues> =
	React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
		name: Path<T>
		register: UseFormRegister<T>
		errors: Errors<T>
		label?: string
		wrapperClassName?: string
		labelClassName?: string
		inputClassName?: string
		errorClassName?: string
	}

const TextAreaInput = <T extends FieldValues>({
	name,
	label,
	register,
	errors,
	wrapperClassName,
	labelClassName,
	inputClassName = '',
	errorClassName,
	...props
}: InputProps<T>) => {
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
		<div className={cN('flex flex-col', wrapperClassName)}>
			<label htmlFor={name} className={labelClassName}>
				{label ?? capFirstChar(name)}
			</label>
			<textarea
				id={name}
				{...register(name)}
				{...props}
				className={cN(
					'resize-none overflow-hidden rounded bg-light-bg/80 py-2 px-4',
					inputClassName
				)}
			/>
			<ErrorMessage
				name={name as FieldName<FieldValuesFromFieldErrors<Errors<T>>>}
				errors={errors}
				render={({message}) => (
					<small
						className={cN('mt-0.5 font-medium text-red-500', errorClassName)}
					>
						{message}
					</small>
				)}
			/>
		</div>
	)
}

export default TextAreaInput
