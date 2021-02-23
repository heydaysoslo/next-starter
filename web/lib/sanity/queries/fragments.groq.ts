import { groq } from 'next-sanity'

export const BASE_ARTICLE = groq`
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

export const BASE_LINK = groq`
  _id,
  slug,
  _type,
  title
`

export const EDITOR = groq`
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

const CARDSLIST = groq`
cardsList[] {
      ...,
      content-> {
        title,
        slug,
        mainImage,
        ${EDITOR}
      },
      editorMinimal[] {
        ${EDITOR}
      },
      ...
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
    ${CARDSLIST},
    // Resolve nested references from reusableSection
    reusableSection->{
      ...,
      pagebuilder {
        ...,
        sections[] {
          ...,
          ${CARDSLIST}
        }
      }
    },
    ...
  },
  ...
}
`

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

export const NAVIGATION = groq`
  ...,
  item[] {
    ${NAV_ITEM}
  }
`
