import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import { createDocsList } from './helpers'

import EmojiIcon from '../custom/components/icons/EmojiIcon'
const BlogIcon = () => <EmojiIcon>🗞</EmojiIcon>

export default S.listItem()
  .title('Blog')
  .icon(BlogIcon)
  .child(
    S.list()
      .title('Blog')
      .items([
        createDocsList('article', { title: 'Articles' }),
        createDocsList('category', { title: 'Categories' }),
        createDocsList('tag', { title: 'Tags' })
      ])
  )
