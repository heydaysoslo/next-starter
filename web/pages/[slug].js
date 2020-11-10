import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import TemplateResolver from '@heydays/TemplateResolver'
import { getClient, usePreviewSubscription, pageQuery, pagesQuery } from '@cms'
import Layout from '../components/Layout'

export default function Post({ data, preview }) {
  const router = useRouter()

  if (!router.isFallback && !data?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { data: post } = usePreviewSubscription(pageQuery, {
    params: { slug: data?.slug?.current },
    initialData: data,
    enabled: preview
  })

  return (
    <Layout preview={preview}>
      <TemplateResolver page={post} />
    </Layout>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const post = await getClient(preview).fetch(pageQuery, {
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
  const paths = await getClient().fetch(pagesQuery)
  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true
  }
}
