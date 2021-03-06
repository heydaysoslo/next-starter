import React from 'react'
import styled, { css } from 'styled-components'
import Grid, { GridItem } from '../elements/Grid'
import Animate from '@heydays/animation/Animate'
import Card from '../elements/Card'
import Container from '@heydays/Container'

const StyledCardSection = styled.section(
  ({ theme }) => css`
    ${theme.spacing.md('mt')};
  `
)

StyledCardSection.Title = styled.h2`
  display: none;
`

const CardSection = ({ className, title, cardsList = [], ...props }) => {
  return (
    <StyledCardSection className={className}>
      <Container>
        {title && <StyledCardSection.Title>{title}</StyledCardSection.Title>}
        <Grid gap>
          {cardsList.map?.((card) => {
            return (
              <GridItem span={{ md: 4 }} key={card?._key}>
                <Animate>
                  <Card
                    title={card?.content?.title || card?.title}
                    image={card?.content?.mainImage || card?.image}
                    excerpt={card?.content?.excerpt || card?.editorMinimal}
                    link={card?.content}
                  />
                </Animate>
              </GridItem>
            )
          })}
        </Grid>
      </Container>
    </StyledCardSection>
  )
}

export default CardSection
