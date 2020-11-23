import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

import EmojiIcon from './custom/components/icons/EmojiIcon'
// import EyeIcon from 'part:@sanity/base/eye-icon'
// import EditIcon from 'part:@sanity/base/edit-icon'

import SeoPreview from './custom/components/previews/seo/SeoPreviews'
import Preview from './custom/components/previews/preview/Preview'

const EyeIcon = () => <EmojiIcon small>👀</EmojiIcon>
const EditIcon = () => <EmojiIcon small>📝</EmojiIcon>

export default () =>
  S.list()
    .title('Content')
    .items([
      createDocsList('menu', { title: 'Navigation' }),
      createDocsList('frontpage'),
      createDocsList('page'),
      createDocsList('article'),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      createDocsList('designTokens', {
        withPreviews: true
      }),
      S.listItem()
        .title('Global')
        .icon(() => <EmojiIcon>🌍</EmojiIcon>)
        .child(
          S.list()
            .title('Global')
            .items([
              createSingleton('companyInfo', {
                withPreviews: false,
                icon: () => <EmojiIcon>🏢</EmojiIcon>
              }),
              createSingleton('globalContent', {
                withPreviews: false,
                icon: () => <EmojiIcon>🌍</EmojiIcon>
              })
            ])
        ),
      S.listItem()
        .title('Settings')
        .icon(() => <EmojiIcon>⚙️</EmojiIcon>)
        .child(
          S.list()
            .title('Settings')
            .items([
              createSingleton('siteSettings', {
                withPreviews: false,
                icon: () => <EmojiIcon>⚙️</EmojiIcon>
              })
            ])
        )
    ])

/**
 * Helper functions
 */

const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())

const hiddenDocTypes = listItem =>
  ![
    'companyInfo',
    'siteSettings',
    'article',
    'frontpage',
    'menu',
    'companyInfo',
    'globalContent',
    'page',
    'designTokens'
  ].includes(listItem.getId())

const createSingleton = (id, options = {}) => {
  const { withPreviews = true, icon = FaFileO } = options
  const title = camel2title(id)
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.editor()
        .id(id)
        .schemaType(id)
        .documentId(id)
        .views(
          withPreviews && [
            S.view.form().icon(EditIcon),
            S.view
              .component(SeoPreview)
              .icon(EyeIcon)
              .title('SEO Preview'),
            S.view
              .component(Preview)
              .icon(EyeIcon)
              .title('Preview')
          ]
        )
    )
}

const createDocsList = (id, options = {}) => {
  const { withPreviews = true, title = camel2title(id) } = options
  // const title = camel2title(id)
  return S.listItem()
    .title(title)
    .schemaType(id)
    .child(
      S.documentTypeList(id)
        .title(title)
        .child(documentId =>
          S.document()
            .documentId(documentId)
            .schemaType(id)
            .views(
              withPreviews && [
                S.view.form().icon(EditIcon),
                S.view
                  .component(SeoPreview)
                  .icon(EyeIcon)
                  .title('SEO Preview'),
                S.view
                  .component(Preview)
                  .icon(EyeIcon)
                  .title('Preview')
              ]
            )
        )
    )
}
