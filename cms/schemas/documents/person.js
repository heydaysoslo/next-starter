import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: () => <EmojiIcon>🙋🏻‍♀️</EmojiIcon>,
  liveEdit: false,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Some frontend will require a slug to be set to be able to show the person',
      options: {
        source: 'name',
        maxLength: 96
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'mainImage'
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Role or Title of a person. Ex. CEO'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'social',
      title: 'Social Media',
      type: 'social',
      options: {
        collapsible: true,
        collapsed: true
      }
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'editor'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    },
    prepare({ title = 'No title', media }) {
      return {
        title,
        media
      }
    }
  }
}
