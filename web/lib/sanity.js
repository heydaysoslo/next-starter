import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook
} from 'next-sanity'

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production'
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
}

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = source => createImageUrlBuilder(config).image(source)

// Set up the live preview subsscription hook
// export const usePreviewSubscription = createPreviewSubscriptionHook(config)
export const usePreviewSubscriptionClient = createPreviewSubscriptionHook(
  config
)

// [WIP] Fix to resolve references in preview subscription
export const usePreviewSubscription = (
  query,
  { params, initialData, enabled }
) => {
  const { data: newData } = usePreviewSubscriptionClient(query, {
    params,
    initialData,
    enabled
  })
  //
  // Current problem: sanityClient token renders undefined and drafts are not returned
  //
  // const [newData, setNewData] = useState(initialData)
  // const getResolvedPreview = () => {
  //   if (enabled) {
  //     // console.log('GET PREVIEW', getClient(true))
  //     getPreview(query, params).then(res => {
  //       console.log('GET PREVIEW', res)
  //       setNewData(res)
  //     })
  //   }
  // }
  // useEffect(getResolvedPreview, [data])
  return { data: newData }
}

// Set up Portable Text serialization
export const PortableText = createPortableTextComponent({
  ...config,
  // Serializers passed to @sanity/block-content-to-react
  // (https://github.com/sanity-io/block-content-to-react)
  serializers: {}
})

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)
// Set up a preview client with serverless authentication for drafts
export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

// Helper function for easily switching between normal client and preview client
export const getClient = usePreview =>
  usePreview ? previewClient : sanityClient

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config)

const BASE_ARTICLE = groq`
  _id,
  _type,
  title,
  slug {
    current
  },
  isFeatured,
  mainImage,
  excerpt,
  publishDate,
  categories[] {
    reference->{...}
  },
  tags[] {
    reference->{...}
  }
`

const BASE_LINK = groq`
  _id,
  slug,
  _type,
  title
`

const EDITOR = groq`
  ...,
  event[] {
    ...,
    reference->{
      ${BASE_LINK}
    }
  },
  markDefs[] {
    ...,
    event[] {
      ...,
      reference->{
        ${BASE_LINK}
      }
    },
    _type == "internalLink" => {
      "reference": {
        "slug": @.reference->slug,
        "_type": @.reference->_type,
        "_id": @.reference->_id,
        "title": @.reference->title,
      }
    }
  }
`

export const PAGEBUILDER = groq`
pagebuilder {
  sections[] {
    ...,
    body[] {
      ${EDITOR}
    },
    seeAllLink {
      reference->{
        ${BASE_LINK}
      },
    },
    content[] {
      ${EDITOR}
    },
    cardsList[] {
      content[] {
        ${EDITOR}
      },
      editorMinimal[] {
        ${EDITOR}
      },
      ...
    },
    reusableSection->{...},
    reusableSectionReference{
      reusableSection->{...}
    },
    ...
  },
  ...
}
`

export const pageQuery = groq`
*[_type == 'page' && slug.current == $slug][0] {
  ...,
  excerpt[] {
    ${EDITOR}
  },
  ${PAGEBUILDER},
}
`

export const pagesQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

export const articleQuery = groq`
*[_type == 'article' && slug.current == $slug][0] {
  ...,
  excerpt[] {
    ${EDITOR}
  },
  ${PAGEBUILDER}
}
`

export const articlesQuery = groq`
  *[_type == "article" && defined(slug.current)][].slug.current
`

export const frontpageQuery = groq`
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

export const getFrontpage = () => {
  const query = groq`
  *[_id == 'siteSettings'] {
    frontpage->{
      ...,
      excerpt[] {
        ${EDITOR}
      },
      ${PAGEBUILDER}
    }
  }`
  return getClient(false).fetch(query)
}

export const getPage = (params, preview = false) => {
  const query = groq`
    *[_type == 'page' && slug.current == $slug][0] {
      ...,
      excerpt[] {
        ${EDITOR}
      },
      ${PAGEBUILDER}
    }
  `
  return getClient(preview).fetch(query, params)
}

export const getPages = () => {
  const query = groq`*[_type == 'page']`
  return getClient(false).fetch(query)
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
  return getClient(false)
    .fetch(query)
    .then(res => res[0])
}

export const getCompanyInfo = () => {
  const query = groq`*[_type == 'companyInfo']`
  return getClient(false).fetch(query)
}

const NAV_ITEM = groq`
  ...,
  reference->{
    ${BASE_LINK}
  },
  event[] {
    ...,
    reference->{
      ${BASE_LINK}
    }
  }
`

const NAVIGATION = groq`
  ...,
  item[] {
    ${NAV_ITEM}
  }
`

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
  return getClient(false).fetch(query)
}

export const getArticles = preview => {
  const query = groq`*[_type == 'article'] {
    ${BASE_ARTICLE},
  }
  `
  return getClient(preview).fetch(query)
}

export const getArticle = params => {
  const query = groq`*[_type == 'article' && slug.current == $slug] {
    ${BASE_ARTICLE},
    body[] {
      ${EDITOR}
    }
  }
  `
  return getClient(false).fetch(query, params)
}

export const getPreview = (query, params) => {
  return getClient(true).fetch(query, params)
}

export default getClient(false)
