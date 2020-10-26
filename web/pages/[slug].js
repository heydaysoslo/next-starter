import { getPage, getPages } from '../lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'

export const getStaticProps = async ({ params, preview = false }) => {
  const [page] = await getPage(params)
  return {
    props: { page }
  }
}

export async function getStaticPaths() {
  const pages = await getPages()
  return {
    paths: pages.map(page => ({
      params: {
        slug: page.slug.current
      }
    })),
    fallback: true
  }
}

export default function Home({ page }) {
  return <TemplateResolver page={page} />
}
