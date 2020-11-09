import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'
import Tabs from 'sanity-plugin-tabs'
import d from '../defaults'

export default {
  type: 'document',
  title: `Global Content`,
  name: `globalContent`,
  icon: () => <EmojiIcon>🌍</EmojiIcon>,
  fields: [
    {
      name: 'globalInner',
      title: 'Global',
      type: 'object',
      inputComponent: Tabs,
      fieldsets: [
        { name: 'newsletter', title: 'Newsletter' },
        { name: 'footer', title: 'Footer' }
      ],
      options: {
        // setting layout to object will group the tab content in an object fieldset border.
        // ... Useful for when your tab is in between other fields inside a document.
        layout: 'object'
      },

      fields: [
        {
          name: 'footer',
          title: 'Footer',
          type: 'object',
          fieldset: 'footer',
          fields: [d.title]
        },
        {
          name: 'newsletter',
          title: 'Newsletter',
          type: 'object',
          fieldset: 'newsletter',
          fields: [d.title, d.editor]
        }
      ]
    }
  ]
}
