import {useFormContext} from 'react-hook-form'
import {ErrorMessage} from '@hookform/error-message'
import {capFirstChar} from 'utils/literal'

type InputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	name: string
	label?: string
	wrapperClassName?: string
	labelClassName?: string
	inputClassName?: string
	errorClassName?: string
}

const TextAreaInput = ({
	name,
	label,
	wrapperClassName,
	labelClassName,
	inputClassName,
	errorClassName,
	...props
}: InputProps) => {
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
				className={`bg-light-bg/80 rounded py-2 px-4 ${inputClassName}`}
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
