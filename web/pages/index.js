import {
  getClient,
  usePreviewSubscription,
  frontpageQuery,
  getGlobalSettings
} from '@cms'
import TemplateResolver from '../components/resolvers/TemplateResolver'
import Layout from 'components/Layout'

export default function Home({ data, global, preview }) {
  const { data: post } = usePreviewSubscription(frontpageQuery, {
    initialData: data,
    enabled: preview
  })

  return (
    <Layout page={post?.frontpage} preview={preview} global={global}>
      <TemplateResolver page={post?.frontpage} />
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const { frontpage } = await getClient(preview).fetch(frontpageQuery)
  const global = await getGlobalSettings()
  return {
    props: {
      preview,
      data: { frontpage },
      global
    }
  }
}
