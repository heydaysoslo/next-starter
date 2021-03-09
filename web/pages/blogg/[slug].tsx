import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { getArticle, getArticles, getGlobalSettings } from 'lib/sanity'

import TemplateResolver from '../../components/resolvers/TemplateResolver'
import Layout from '../../components/Layout'

export default function Article({ data, global }) {
  const router = useRouter()

  if (!router.isFallback && !data?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout page={data} global={global}>
      <TemplateResolver page={data} />
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const post = await getArticle({
    slug: params.slug
  })
  const global = await getGlobalSettings()
  return {
    props: {
      data: post,
      global
    }
  }
}

export async function getStaticPaths() {
  const paths = await getArticles()
  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true
  }
}
