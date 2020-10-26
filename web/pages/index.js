import { getFrontpage, getArticles } from '../lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'

export const getStaticProps = async () => {
  const [data] = await getFrontpage()
  const articles = await getArticles()
  return {
    props: { frontpage: data.frontpage, articles }
  }
}

export default function Home({ frontpage, articles }) {
  return <TemplateResolver page={frontpage} />
}
