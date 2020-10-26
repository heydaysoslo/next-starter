import sanityClient from '@sanity/client'

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production'
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
}

/**
 * @note Prefix template literals with `/* groq /*` for syntax highligthing
 * https://github.com/sanity-io/vscode-sanity
 */

const BASE_ARTICLE = /* groq */ `
  _id,
  title,
  slug {
  current
  },
  mainImage
`

export const PAGEBUILDER = /* groq */ `
pagebuilder {
  sections[]{
    seeAllLink {
      reference->{slug, title,_type},
      ...
    },
    cardsList[]{
      content->{...},
      ...
    },
    ...
  },
  ...
}
`

const client = sanityClient(options)

export const getFrontpage = () => {
  const query = /* groq */ `
  *[_id == 'siteSettings'] {
    frontpage->{
      ...,
      ${PAGEBUILDER}
    }
  }`
  return client.fetch(query)
}

export const getPage = params => {
  const query = /* groq */ `
  *[_type == 'page' && slug.current == $slug]{
    ...,
    ${PAGEBUILDER}
  }
  `
  return client.fetch(query, params)
}
export const getPages = () => {
  const query = /* groq */ `
  *[_type == 'page']`

  return client.fetch(query)
}

export const getSettings = () => {
  const query = /* groq */ `*[_type == 'siteSettings']{
    ...,
    primaryMenu->,
    secondaryMenu->,
    frontpage->{
      ...,
      ${PAGEBUILDER}
    },
    privacypage->,
    designTokens->
  }`
  return client.fetch(query).then(res => res[0])
}

export const getCompanyInfo = () => {
  const query = /* groq */ `*[_type == 'companyInfo']`
  return client.fetch(query)
}

export const getGlobalSettings = () => {
  const query = /* groq */ `*[_type == 'global']`
  return client.fetch(query)
}

export const getArticles = () => {
  const query = /* groq */ `*[_type == 'article'] {
    ${BASE_ARTICLE},
    seo
  }
  `
  return client.fetch(query)
}

export const getArticle = params => {
  const query = /* groq */ `*[_type == 'article' && slug.current == $slug] {
    ${BASE_ARTICLE}
  }
  `
  return client.fetch(query, params)
}

export const getPreview = (previewClient, query, params) => {
  return previewClient.fetch(query, params)
}

export default client
