import { getFrontpage, getGlobalSettings } from 'lib/sanity'
import TemplateResolver from '../components/resolvers/TemplateResolver'
import Layout from 'components/Layout'

export default function Home({ data, global }) {
  return (
    <Layout page={data?.frontpage} global={global}>
      <TemplateResolver page={data?.frontpage} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { frontpage } = await getFrontpage()
  const global = await getGlobalSettings()
  return {
    props: {
      data: { frontpage },
      global
    }
  }
}
