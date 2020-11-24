import React from 'react'
import EmojiIcon from '../../custom/components/icons/EmojiIcon'

export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: () => <EmojiIcon>🗞</EmojiIcon>,
  initialValue: () => ({
    publishDate: new Date().toISOString()
  }),
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
      name: 'isFeatured',
      title: 'Feature Article',
      type: 'boolean',
      description: 'The articles checked with this will always appear first.'
    },
    {
      name: 'mainImage',
      title: 'Featured image',
      type: 'mainImage'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      description:
        'An excerpt is a summary for the page. It is good to spend a little time on this to give users, google and social media a overview of what this page is about. Example usage is in cards and SEO',
      type: 'editorMinimal'
    },
    {
      name: 'publishDate',
      title: 'Publish date',
      description: 'Use this for scheduled articles.',
      type: 'datetime'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'editor'
    },
    {
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'personReference'
        }
      ]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'tag' }]
        }
      ]
    },
    // Martin: I'm not sure if pagebuilder should be a part of the article template.
    // This could probably be a "one of" for special needs.
    // {
    //   name: 'pagebuilder',
    //   title: 'Page builder',
    //   type: 'pagebuilder'
    // },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      options: {
        collapsible: true,
        collapsed: true
      }
    }
  ]
}
