import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import {
  getClient,
  articleQuery,
  articlesQuery,
  usePreviewSubscription
} from '@cms'

import TemplateResolver from '../../components/resolvers/TemplateResolver'
import Layout from '../../components/Layout'

export default function Article({ data, preview }) {
  const router = useRouter()

  if (!router.isFallback && !data?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { data: post } = usePreviewSubscription(articleQuery, {
    params: { slug: data?.slug?.current },
    initialData: data,
    enabled: preview
  })

  return (
    <Layout page={post} preview={preview}>
      <TemplateResolver page={post} />
    </Layout>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const post = await getClient(preview).fetch(articleQuery, {
    slug: params.slug
  })
  return {
    props: {
      preview,
      data: post
    }
  }
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(articlesQuery)
  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true
  }
}
