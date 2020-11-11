// import Link from 'react-icons/lib/io/link'
// Follow sanity recommendations for internal/external links
// https://www.sanity.io/guides/portable-text-internal-and-external-links
import { FiLink } from 'react-icons'
// import InternalLinkRenderer from '../../custom/components/InternalLinkRenderer'
import { defaultLinkFields } from '../defaults/linkDefaults'

export default {
  name: 'internalLink',
  type: 'object',
  title: 'Internal link',
  blockEditor: {
    // render: InternalLinkRenderer, // this is occasionaly crashing for some weird reason
    icon: FiLink
  },
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      to: [{ type: 'article' }, { type: 'page' }, { type: 'frontpage' }]
    },
    ...defaultLinkFields
  ],
  preview: {
    select: {
      title: 'reference.title',
      linkText: 'linkText'
    },
    prepare({ title, linkText }) {
      return {
        title: linkText || title || 'No link title'
        // media: Link
      }
    }
  }
}
