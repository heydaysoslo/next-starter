import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'
import { aspect, CloudinaryNode } from 'types'
// import { getImageSrc, getAspect } from '../../utils/cloudinary'

/*
Image transformations:
https://cloudinary.com/documentation/image_transformation_reference
*/

type Props = {
  node: CloudinaryNode
  aspectRatio?: aspect
}

const CloudinaryImage: React.FC<Props> = ({ node, aspectRatio = null }) => {
  if (!node) {
    return null
  }
  // Set aspect ratio as style prop to prevent generating a class for every ratio
  // const originalRatio =
  //   node?.aspectRatio ||
  //   node?.cldImage?.aspectRatio ||
  //   node?.aspect_ratio ||
  //   null
  // const passedRatio = aspectRatio && getAspect(aspectRatio)
  // Get the passed ratio first, then fallback to image original ratio
  // const ratioValue = passedRatio || originalRatio
  // const src = getImageSrc(node?.cldImage ? node.cldImage : node, ratioValue)
  // const ratioStyle = ratioValue
  //   ? { paddingBottom: `${100 / ratioValue}%` }
  //   : undefined
  return (
    <Wrapper>
      {/* <div className="spacer" style={ratioStyle} /> */}
      {/* <img src={src.lqip} aria-hidden="true" alt={node.alt} /> */}
      {/* <img
        className="lazyload"
        alt={node.alt}
        src={src.empty}
        data-sizes="auto"
        data-srcset={src.srcset}
      /> */}
      {node?.cldImage?.secure_url && node?.cldImage?.width && node?.cldImage?.height && <Image width={node.cldImage.width} height={node.cldImage.height} src={node.cldImage.secure_url} alt={node.alt} />}
      {/* <pre>{JSON.stringify(node,null,2)}</pre> */}
      {/* <noscript>
        <img src={src.noscript} alt={node.alt} />
      </noscript> */}
    </Wrapper>
  )
}

const Wrapper = styled.div(
  ({ theme }) => css`
    /* width: 100%;
    position: relative;
    overflow: hidden; */
    /* backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0, 0, 0), translateZ(0); */
    /* .spacer {
      display: block;
      width: 100%;
      background: rgba(125, 125, 125, 0.05);
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transition: opacity 500ms, transform 500ms;
    } */
  `
)

export default CloudinaryImage
