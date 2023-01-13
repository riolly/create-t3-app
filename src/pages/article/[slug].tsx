import React from 'react'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'
import {
	type GetStaticPaths,
	type GetStaticProps,
	type InferGetStaticPropsType,
} from 'next'
import dayjs from 'dayjs'

import {prisma} from 'server/db'
import {api} from 'utils/api'
import {extractIdFromSlug, slugify} from 'utils/literal'

import {
	articleUpdateSchema,
	type ArticleUpdateType,
	type ArticleType,
} from 'schema/article'

import {useAutoAnimate} from '@formkit/auto-animate/react'

import {FormProvider, useForm, type SubmitHandler} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

import NavbarLayout from 'layouts/navbar'
import MetaHead from 'components/meta-head'
import TextAreaInput from 'components/form-textarea'
import {Button} from 'components/button'
import {
	PencilSquareIcon,
	TrashIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline'

export const getStaticProps: GetStaticProps<{
	article: ArticleType
}> = async ({params}) => {
	if (!params?.slug) return {notFound: true}

	const id = extractIdFromSlug(params.slug as string)

	const article = await prisma.article.findUnique({
		where: {id},
		include: {author: {select: {name: true, image: true}}},
	})

	if (!article) return {notFound: true}

	return {
		props: {article},
		revalidate: true,
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	const articles = await prisma.article.findMany()
	const articleSlugs = articles.map(({id, title}) => ({
		params: {slug: slugify(title, id)},
	}))

	return {
		paths: articleSlugs,
		fallback: 'blocking',
	}
}

const ArticleDetailsPage = ({
	article,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	const router = useRouter()
	const [isEdit, setIsEdit] = React.useState(false)

	const {mutate: deleteArticle, isLoading: isDeleteLoading} =
		api.article.delete.useMutation({
			onError: (err) => alert(err.message),
			onSuccess: () => router.push('/article'),
		})

	const {mutate: updateArticle, isLoading: isUpdateLoading} =
		api.article.update.useMutation({
			onError: (err) => alert(err.message),
			onSuccess: () => {
				void router.push('/article')
			},
		})

	const defaultValues = {
		id: article.id,
		title: article.title,
		content: article.content,
		authorId: article.authorId,
	}

	const methods = useForm<ArticleUpdateType>({
		resolver: zodResolver(articleUpdateSchema),
		defaultValues,
	})

	const onValidSubmit: SubmitHandler<ArticleUpdateType> = (data) => {
		updateArticle(data)
	}

	const onCancel = () => {
		methods.reset()
		setIsEdit(false)
	}

	const [toggleAnimation] = useAutoAnimate<HTMLDivElement>()

	const {status, data} = useSession()

	return (
		<>
			<MetaHead
				title={article.title}
				description={article.content}
				// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
				imageUrl={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/images/articles.jpg`}
			/>
			<main
				className='container mx-auto max-w-screen-md space-y-8 px-6'
				ref={toggleAnimation}
			>
				{isEdit ? (
					<FormProvider {...methods}>
						<form
							onSubmit={(...args) =>
								void methods.handleSubmit(onValidSubmit)(...args)
							}
							className='col-span-full flex flex-col gap-4 md:col-span-2'
						>
							<TextAreaInput<ArticleUpdateType> name='title' />
							<TextAreaInput<ArticleUpdateType> name='content' rows={10} />

							<div className='flex gap-4'>
								<Button
									type='submit'
									variant='filled'
									isLoading={isUpdateLoading}
								>
									Update <PencilSquareIcon className='h-4 w-4' />
								</Button>
								<Button
									variant='outlined'
									type='reset'
									onClick={() => onCancel()}
								>
									Cancel <XMarkIcon className='h-4 w-4' />
								</Button>
							</div>
						</form>
					</FormProvider>
				) : (
					<>
						<div>
							<h1 className='text-3xl'>{article.title}</h1>
							<p className='italic'>by {article.author.name}</p>
							<p className='float-right -mt-2 text-sm italic md:text-base'>
								{dayjs(article.updatedAt).format('D MMMM YYYY')}
							</p>
						</div>
						<p className='whitespace-pre-wrap md:text-lg'>{article.content}</p>
						{status === 'authenticated' &&
							data.user?.id === article.authorId && (
								<div className='flex gap-4'>
									<Button
										variant='filled'
										isLoading={isDeleteLoading}
										onClick={() => deleteArticle(defaultValues)}
										className='bg-light-bg px-4 text-red-500 hover:bg-red-500 hover:text-light-body'
									>
										Delete <TrashIcon className='h-4 w-4' />
									</Button>
									<Button
										variant='filled'
										onClick={() => setIsEdit(true)}
										className='bg-light-bg px-4 text-violet-500 hover:bg-violet-500 hover:text-light-body'
									>
										Update <PencilSquareIcon className='h-4 w-4' />
									</Button>
								</div>
							)}
					</>
				)}
			</main>
		</>
	)
}

export default ArticleDetailsPage

ArticleDetailsPage.getLayout = (page: React.ReactElement) => (
	<NavbarLayout>{page}</NavbarLayout>
)
