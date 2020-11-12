import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
import styled, { css } from 'styled-components'

const sectionTypes = {
  section: dynamic(() => import('./Section')),
  cardSection: dynamic(() => import('./CardSection')),
  textSection: dynamic(() => import('./TextSection')),
  imageSection: dynamic(() => import('./FullImageSection')),
  textImageSplit: dynamic(() => import('./TextImageSplit')),
  carousel: dynamic(() => import('./CarouselSection')),
  tabs: dynamic(() => import('../elements/Tabs')),
  videoSection: dynamic(() => import('./VideoSection')),
  reusableSectionReference: ({ reusableSection }) => (
    <PageBuilder sections={reusableSection?.pagebuilder?.sections} />
  )
}

const StyledPageBuilder = styled.div(
  ({ theme }) => css`
    .PageBuilder__item {
      ${theme.spacing.section('mt')};
    }
  `
)

type section = {
  _type: keyof typeof sectionTypes
  _key: string
}

type Props = {
  sections: section[]
}

const PageBuilder: React.FC<Props> = ({ sections }) => {
  return (
    <StyledPageBuilder>
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
    </StyledPageBuilder>
  )
}

export default PageBuilder
