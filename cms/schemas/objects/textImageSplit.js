import React from 'react'
import CloudinaryPreview from '../../custom/components/previews/CloudinaryPreview'
import d from '../defaults'

export default {
  name: 'textImageSplit',
  title: 'Text Image Split',
  type: 'object',
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
      console.log('prepare -> media', media)
      return {
        title,
        media: () => <CloudinaryPreview media={media} fallback="🐋" />,
        subtitle: 'Text Image Split'
      }
    }
  }
}
