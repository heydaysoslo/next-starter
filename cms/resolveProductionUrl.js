// export default function resolveProductionUrl(document) {
//   return `http://localhost:3000/_preview/${document._id}`
// }

export default function resolveProductionUrl(document) {
  const projectUrl =
    process.env.SANITY_PREVIEW_SECRET || 'http://localhost:3000'
  const previewSecret = process.env.SANITY_PREVIEW_SECRET || 'heydays'
  return `${projectUrl}/api/preview?secret=${previewSecret}&id=${document._id}`
}
