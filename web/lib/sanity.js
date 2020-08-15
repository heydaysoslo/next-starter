import sanityClient from '@sanity/client'
import sanity from '../../cms/sanity.json'

export default sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: sanity.api.projectId || 'zp7mbokg',
  dataset: sanity.api.dataset || 'production',
  useCdn: true
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
})
