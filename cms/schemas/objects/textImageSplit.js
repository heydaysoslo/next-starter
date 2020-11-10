import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'
import d from '../defaults'

const icon = '📰'

export default {
  name: 'textImageSplit',
  title: 'Text Image Split',
  type: 'object',
  icon: () => <EmojiIcon small>{icon}</EmojiIcon>, // Pagebuilder dropdown icon
  fieldsets: [
    { name: 'image', title: 'Image' },
    { name: 'content', title: 'Content' }
  ],
  fields: [
    {
      name: 'textOnTheRight',
      title: 'Text On The Right',
      type: 'boolean'
    },
    {
      ...d.title,
      fieldset: 'content'
    },
    {
      ...d.editorMinimal,
      fieldset: 'content'
    },
    {
      name: 'link',
      title: 'Link',
      type: 'link'
    },
    {
      name: 'media',
      title: 'Media',
      type: 'cloudinaryMedia',
      fieldset: 'image'
    },
    {
      name: 'aspect',
      title: 'Aspect Ratio',
      type: 'aspect',
      fieldset: 'image'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'media'
    },
    prepare({ media, title }) {
      return {
        title,
        media: () => <CloudinaryPreview media={media} fallback={icon} />, // Pagebuilder list preview
        subtitle: 'Text Image Split'
      }
    }
  }
}
