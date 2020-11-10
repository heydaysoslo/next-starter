import LinkResolver from '@heydays/LinkResolver'
import useSanity from '@heydays/useSanity'
import React from 'react'
import styled from 'styled-components'

const MainMenu = ({ className }) => {
  const cms = useSanity()
  const mainMenuItems = cms?.data?.global?.primaryMenu?.item
  if (!mainMenuItems) {
    return null
  }
  return (
    <nav className={className}>
      {mainMenuItems.map(item => {
        return (
          <LinkResolver
            key={item._key}
            className="MainMenu__item"
            link={item.reference}
          >
            {item.linkText}
          </LinkResolver>
        )
      })}
    </nav>
  )
}

export default styled(MainMenu)`
  display: flex;
  .MainMenu__item {
    margin-right: 1rem;
  }
`
