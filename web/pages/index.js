import { getFrontpage, getArticles } from '../lib/sanity'
import useFetch from '@heydays/useFetch'
import TemplateResolver from '../components/resolvers/TemplateResolver'

export const getStaticProps = async () => {
  const data = await getFrontpage()
  const articles = await getArticles()
  return {
    props: { frontpage: data[0].frontpage, articles }
  }
}

export default function Home({ frontpage, articles }) {
  return <TemplateResolver page={frontpage} />
}
