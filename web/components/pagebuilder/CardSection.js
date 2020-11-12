import React from 'react'
import Grid, { GridItem } from '../elements/Grid'
import Animate from '@heydays/animation/Animate'
import Card from '../elements/Card'

const CardSection = ({ className, title, cardsList = [], ...props }) => {
  return (
    <div className={className}>
      {title && <h2>{title}</h2>}
      <Grid gap>
        {cardsList.map(card => {
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
    </div>
  )
}

export default CardSection
