import {useAutoAnimate} from '@formkit/auto-animate/react'

const DivAnimate = ({
	className,
	children,
	...props
}: {
	className?: string
	children: React.ReactNode
}) => {
	const [ref] = useAutoAnimate<HTMLDivElement>()
	return (
		<div className={className} ref={ref} {...props}>
			{children}
		</div>
	)
}
export default DivAnimate
