import Head from 'next/head'
import sanity from '../lib/sanity'
import CloudinaryMediaResolver from '../components/resolvers/CloudinaryMediaResolver'

const query = `*[_type == "frontpage"] {
  _id,
  title,
  mainImage
}[0]
`

export const getStaticProps = async () => {
  const data = await sanity.fetch(query)
  return {
    props: { data } // will be passed to the page component as props
  }
}

export default function Home({ data }) {
  const { title, mainImage } = data
  const [res, setRes] = React.useState(null)

  React.useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(res => setRes(res))
  }, [])

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>{title}</h1>
      {res?.name && <p>Hello, {res.name}</p>}
      <CloudinaryMediaResolver node={mainImage} />
    </div>
  )
}
