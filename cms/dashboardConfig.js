/**
 * https://www.sanity.io/docs/content-studio/dashboard
 * Insta
 * https://www.sanity.io/docs/dashboard/installing-and-configuring-widgets
 */
export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'document-list',
      options: {
        title: 'Recent articles',
        order: '_createdAt desc',
        types: ['article']
      },
      layout: { width: 'medium' }
    },
    { name: 'project-users', layout: { height: 'auto', width: 'auto' } },
    {
      name: 'project-info',
      layout: {
        width: 'auto',
        height: 'auto'
      }
    }
  ]
}
