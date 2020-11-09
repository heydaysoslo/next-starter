import { getClient } from '@cms'
import { groq } from 'next-sanity'
import { resolveRoute } from '../../routes'

const previewQuery = groq`
  *[_id == $id][0] {
    _id,
    _type,
    slug {
      current
    }
  }
`

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (req.query.secret !== process.env.SANITY_PREVIEW_SECRET || !req.query.id) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Fetch the headless CMS to check if the provided `id` exists
  const document = await getClient(true).fetch(previewQuery, {
    id: req.query.id.replace('drafts.', '')
  })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!document) {
    return res
      .status(401)
      .json({ message: `Invalid document id "${req.query.id}"` })
  }

  // Enable Preview Mode by setting cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: resolveRoute(document) })
  res.end()
}
