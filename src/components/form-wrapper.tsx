import {
	FormProvider,
	type UseFormReturn,
	type SubmitHandler,
	type SubmitErrorHandler,
	type FieldValues,
} from 'react-hook-form'

export type FormWrapperProps<T extends FieldValues> = {
	className?: string
	children: React.ReactNode
	methods: UseFormReturn<T>
	onValidSubmit: SubmitHandler<T>
	onInvalidSubmit?: SubmitErrorHandler<T>
}

const defaultOnInValidSubmit: SubmitErrorHandler<FieldValues> = (error) => {
	console.log(error)
}

const FormWrapper = <T extends FieldValues>({
	children,
	className,
	methods,
	onValidSubmit,
	onInvalidSubmit,
}: FormWrapperProps<T>) => {
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(
					onValidSubmit,
					onInvalidSubmit ?? defaultOnInValidSubmit
				)}
				className={className}
			>
				{children}
			</form>
		</FormProvider>
	)
}

export default FormWrapper
