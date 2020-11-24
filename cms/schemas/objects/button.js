import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'button',
  title: 'Button',
  type: 'object',
  icon: () => <EmojiIcon small>⏺</EmojiIcon>,
  fieldsets: [
    {
      name: 'appearance',
      title: 'Appearance',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'event',
      title: 'Action',
      type: 'array',
      description: 'Select what is going to happen when you click the button',
      of: [
        { type: 'internalLink', name: 'internalLink' },
        { type: 'link', name: 'link' },
        {
          type: 'object',
          name: 'alert',
          title: 'Alert',
          icon: () => <EmojiIcon small>🚨</EmojiIcon>,
          description: 'This is just for fun to demonstrate the possibilites',
          fields: [
            {
              type: 'string',
              title: 'Alert text',
              name: 'text'
            }
          ]
        }
      ],
      options: {
        sortable: false
      },
      validation: Rule => Rule.min(1).max(1)
    },
    {
      name: 'type',
      title: 'Style',
      type: 'string',
      description: 'This determines the button style.',
      fieldset: 'appearance',
      options: {
        list: [
          { value: 'primary', title: 'Primary' },
          { value: 'secondary', title: 'Secondary' }
        ]
      }
    },
    {
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'Defaults to normal size.',
      fieldset: 'appearance',
      options: {
        list: [
          { value: 'sm', title: 'Small' },
          { value: 'lg', title: 'Large' }
        ]
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      linkTitle: 'link.title'
    },
    prepare({ title, linkTitle }) {
      return {
        title: title || linkTitle || 'No title'
      }
    }
  }
}
