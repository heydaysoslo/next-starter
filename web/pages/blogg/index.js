import {
  getClient,
  usePreviewSubscription,
  frontpageQuery,
  getGlobalSettings,
  getArticles
} from '@cms'
import Layout from 'components/Layout'
import NewsPage from 'components/pages/NewsPage'

export default function Blogg({ data, global, posts, preview }) {
  const { data: post } = usePreviewSubscription(frontpageQuery, {
    initialData: data,
    enabled: preview
  })

  return (
    <Layout page={post?.frontpage} preview={preview} global={global}>
      <NewsPage posts={posts} />
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const { frontpage } = await getClient(preview).fetch(frontpageQuery)
  const global = await getGlobalSettings()
  const posts = await getArticles(preview)
  return {
    props: {
      preview,
      data: { frontpage },
      global,
      posts
    }
  }
}
