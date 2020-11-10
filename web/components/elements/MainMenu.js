import LinkResolver from '@heydays/LinkResolver'
import React, { useContext } from 'react'
import styled from 'styled-components'
import SanityContext from '../context/sanityContext'

const MainMenu = ({ className }) => {
  const cms = useContext(SanityContext)
  const mainMenuItems = cms?.data?.global?.primaryMenu?.item
  return (
    <nav className={className}>
      {mainMenuItems && (
        <ul className="MainMenu__list">
          {mainMenuItems.map(item => {
            return (
              <li className="MainMenu__item" key={item._key}>
                <LinkResolver link={item.reference}>
                  {item.linkText}
                </LinkResolver>
              </li>
            )
          })}
        </ul>
      )}
    </nav>
  )
}

export default styled(MainMenu)`
  .MainMenu__list {
    display: flex;
  }
  .MainMenu__item {
    margin-right: 1rem;
  }
`
