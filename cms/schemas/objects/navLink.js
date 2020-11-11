export default {
  name: 'navLink',
  title: 'Link',
  type: 'object',
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
        { type: 'internalLink' },
        { type: 'link' },
        {
          type: 'object',
          name: 'alert',
          title: 'Alert',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      linkTitle: 'link.title'
    },
    prepare({ title, linkTitle }) {
      return {
        title: title || linkTitle || 'No title',
        media: MdTouchApp
      }
    }
  }
}
