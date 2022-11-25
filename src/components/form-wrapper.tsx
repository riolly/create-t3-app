import {
	FormProvider,
	type UseFormReturn,
	type SubmitHandler,
	type SubmitErrorHandler,
	type FieldValues,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
	className: string
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
	onInvalidSubmit = defaultOnInValidSubmit,
}: Props<T>) => {
	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onValidSubmit, onInvalidSubmit)}
				className={className}
			>
				{children}
			</form>
		</FormProvider>
	)
}

export default FormWrapper
