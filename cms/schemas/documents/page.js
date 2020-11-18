import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: () => <EmojiIcon>📄</EmojiIcon>,
  initialValue: {
    template: 'default'
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description:
        'Some frontend will require a slug to be set to be able to show the post',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'An excerpt is a summary for the page. It is good to spend a little time on this to give users, google and social media a overview of what this page is about. Example usage is in cards and SEO.',
      type: 'editorMinimal'
    },
    // {
    //   name: 'menuTheme',
    //   title: 'Menu Theme',
    //   type: 'menuTheme',
    //   fieldset: 'settings'
    // },
    {
      name: 'pagebuilder',
      title: 'Page builder',
      type: 'pagebuilder'
    },
    {
      name: 'template',
      title: 'Template',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Contact', value: 'contact' },
          { title: 'News', value: 'news' }
        ]
      }
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mainImage',
      template: 'template'
    },
    prepare({ title = 'No title', image, template }) {
      return {
        title,
        media: image,
        subtitle: `Template: ${template || 'default'}`
      }
    }
  }
}
