import React from 'react'
import { getCloudinaryImageSource } from 'part:sanity-plugin-asset-source-cloudinary/helpers'
import EmojiIcon from '../icons/EmojiIcon'

const CloudinaryPreview = ({
  media,
  width = 50,
  height = 50,
  fallback = '🖼'
}) => {
  if (!media) return <EmojiIcon>{fallback}</EmojiIcon>
  const mediaObj = media?.cldImage ? media.cldImage : media
  const src = getCloudinaryImageSource(mediaObj, {
    width,
    height
  })
  return <img style={{ maxWidth: '100%' }} src={src} />
}

export default CloudinaryPreview
