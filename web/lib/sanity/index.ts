import sanityClient, { ClientConfig } from '@sanity/client'
import { groq } from 'next-sanity'
import {
  PAGEBUILDER,
  EDITOR,
  NAVIGATION,
  BASE_LINK,
} from './queries/fragments.groq'

const config: ClientConfig = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  useProjectHostname: true,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '4tzgku1d',
  useCdn: process.env.NODE_ENV === 'production',
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
}

const client = sanityClient(config)

export const getFrontpage = () => {
  const query = groq`
  *[_id == 'siteSettings'][0] {
    frontpage->{
      ...,
      excerpt[] {
        ${EDITOR}
      },
      ${PAGEBUILDER}
    }
  }
  `
  return client.fetch(query)
}

export const getPage = (params) => {
  // const query = `
  //   *[_type == 'page' && slug.current == $slug][0] {
  //     ...,
  //     excerpt[] {
  //       ${EDITOR}
  //     },
  //     ${PAGEBUILDER}
  //   }
  // `
  const query = groq`
  *[_type == 'page' && slug.current == $slug][0] {
    ...,
    excerpt[] {
      ${EDITOR}
    },
    ${PAGEBUILDER},
  }
  `
  return client.fetch(query, params)
}

export const getPages = () => {
  const query = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`
  return client.fetch(query)
}

export const getSettings = () => {
  const query = groq`*[_type == 'siteSettings']{
    ...,
    primaryMenu->,
    secondaryMenu->,
    frontpage->{
      ${BASE_LINK}
    },
    privacypage->{
      ${BASE_LINK}
    },
    designTokens->,
  }`
  return client.fetch(query).then((res) => res[0])
}

export const getCompanyInfo = () => {
  const query = groq`*[_type == 'companyInfo']`
  return client.fetch(query)
}

export const getGlobalSettings = () => {
  const query = groq`
  {
    "companyInfo": *[_id == 'companyInfo'][0]{
      ...
    },
    "siteSettings": *[_id == 'siteSettings'][0]{
      ...,
      footerMenus[]->{
        ${NAVIGATION}
      },
      primaryMenu->{
        ${NAVIGATION}
      }
    }
  }
  `
  return client.fetch(query)
}

export const getArticles = () => {
  // const query = groq`*[_type == 'article'] {
  //   ${BASE_ARTICLE},
  // }
  // `
  const query = `
  *[_type == "article" && defined(slug.current)][].slug.current
`
  return client.fetch(query)
}

export const getArticle = (params: { slug: string }) => {
  const query = groq`*[_type == 'article' && slug.current == $slug][0] {
  ...,
  excerpt[] {
    ${EDITOR}
  },
  ${PAGEBUILDER}
}
`
  return client.fetch(query, params)
}

export default client
