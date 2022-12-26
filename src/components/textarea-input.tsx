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
	return (
		<div className={`flex flex-col ${wrapperClassName}`}>
			<label htmlFor={name} className={`text-light-head ${labelClassName}`}>
				{label ?? capFirstChar(name)}
			</label>
			<textarea
				id={name}
				className={`rounded bg-light-bg/80 py-2 px-4 ${inputClassName}`}
				{...register(name)}
				{...props}
			/>
			<ErrorMessage
				name={name}
				errors={errors}
				render={({message}) => (
					<small
						className={`mt-0.5 font-medium text-red-500 ${errorClassName}`}
					>
						{message}
					</small>
				)}
			/>
		</div>
	)
}

export default TextAreaInput
