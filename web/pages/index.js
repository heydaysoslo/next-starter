import { getClient, usePreviewSubscription, frontpageQuery } from '@cms'
import TemplateResolver from '../components/resolvers/TemplateResolver'
import Layout from 'components/Layout'

export default function Home({ data, preview }) {
  const { data: post } = usePreviewSubscription(frontpageQuery, {
    initialData: data,
    enabled: preview
  })

  return (
    <Layout page={post?.frontpage} preview={preview}>
      <TemplateResolver page={post?.frontpage} />
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const { frontpage } = await getClient(preview).fetch(frontpageQuery)
  return {
    props: {
      preview,
      data: { frontpage }
    }
  }
}
