import React from 'react'
import CloudinaryImage from '../elements/CloudinaryImage'
import CloudinaryBackgroundVideo from '../elements/CloudinaryBackgroundVideo'
import type { aspect, CloudinaryNode } from 'heydays'

type Props = {
  node: CloudinaryNode
  aspectRatio?: aspect
}

const CloudinaryMediaResolver: React.FC<Props> = ({ node, aspectRatio }) => {
  if (
    node?.cldImage?.resource_type === 'image' ||
    node?.resource_type === 'image'
  ) {
    return <CloudinaryImage node={node} aspectRatio={aspectRatio} />
  } else if (
    node?.cldImage?.resource_type === 'video' ||
    node?.resource_type === 'video'
  ) {
    return <CloudinaryBackgroundVideo node={node} />
  }
  return null
}

export default CloudinaryMediaResolver
