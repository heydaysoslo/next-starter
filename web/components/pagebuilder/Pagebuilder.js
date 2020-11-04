import React from 'react'
import dynamic from 'next/dynamic'
import styled, { css } from 'styled-components'

import Stagger from '@heydays/animation/Stagger'

const sectionTypes = {
  section: dynamic(() => import('./Section')),
  cardSection: dynamic(() => import('./CardSection')),
  textSection: dynamic(() => import('./TextSection')),
  imageSection: dynamic(() => import('./FullImageSection')),
  textImageSplit: dynamic(() => import('./TextImageSplit')),
  carousel: dynamic(() => import('./CarouselSection')),
  tabs: dynamic(() => import('../elements/Tabs')),
  videoSection: dynamic(() => import('./VideoSection'))
}

const StyledPageBuilder = styled.div(
  ({ theme }) => css`
    .PageBuilder__item {
      ${theme.spacing.section('mt')};
    }
  `
)

const PageBuilder = ({ sections }) => {
  return (
    <StyledPageBuilder>
      <Stagger>
        {sections?.map((section, index) => {
          const Component = sectionTypes[section._type] || null
          return Component ? (
            <div key={section._key} className="PageBuilder__item">
              <Component
                {...section}
                prevComp={sections[index - 1] ? sections[index - 1] : null}
                nextComp={sections[index + 1] ? sections[index + 1] : null}
              />
            </div>
          ) : (
            <p key={section._key} style={{ background: 'yellow' }}>
              Component {section._type} not found
            </p>
          )
        })}
      </Stagger>
    </StyledPageBuilder>
  )
}

export default PageBuilder
