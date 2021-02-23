import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import TemplateResolver from '@heydays/TemplateResolver'
import Layout from '../components/Layout'
import { getGlobalSettings, getPage, getPages } from '@cms'

export default function Post({ data, global }) {
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
  const post = await getPage({
    slug: params.slug,
  })
  const global = await getGlobalSettings()
  return {
    props: {
      data: post,
      global,
    },
  }
}

export async function getStaticPaths() {
  const paths = await getPages()
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
