import React from 'react'
import { FaExternalLinkAlt } from 'react-icons'

const ExternalLinkRenderer = props => (
  <span>
    {console.log(props.attributes)}
    {props.linkText || props.children} <FaExternalLinkAlt />
  </span>
)

export default ExternalLinkRenderer
