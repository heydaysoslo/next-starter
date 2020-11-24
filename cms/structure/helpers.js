import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import EmojiIcon from '../custom/components/icons/EmojiIcon'
import SeoPreview from '../custom/components/previews/seo/SeoPreviews'
import Preview from '../custom/components/previews/preview/Preview'

const EyeIcon = () => <EmojiIcon small>👀</EmojiIcon>
const EditIcon = () => <EmojiIcon small>📝</EmojiIcon>

const camel2title = camelCase =>
  camelCase
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase())

export const createDocsList = (id, options = {}) => {
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

export const createSingleton = (id, options = {}) => {
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
