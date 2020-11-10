import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import {
  getClient,
  articleQuery,
  articlesQuery,
  usePreviewSubscription,
  getGlobalSettings
} from '@cms'

import TemplateResolver from '../../components/resolvers/TemplateResolver'
import Layout from '../../components/Layout'

export default function Article({ data, global, preview }) {
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
    <Layout page={post} global={global} preview={preview}>
      <TemplateResolver page={post} />
    </Layout>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const post = await getClient(preview).fetch(articleQuery, {
    slug: params.slug
  })
  const global = await getGlobalSettings()
  return {
    props: {
      preview,
      data: post,
      global
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
