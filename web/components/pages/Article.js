import React from 'react'

import { getReadTime } from '../../utils/sanityHelpers'
import Editor from '../editor'
import Grid, { GridItem } from '@heydays/Grid'
import Container from '@heydays/Container'
import PageBuilder from '../pagebuilder/Pagebuilder'
import Author from '../elements/Author'

const Article = page => {
  const { title, body, _rawMainImage, authors, publishDate, pagebuilder } = page
  return (
    <Container>
      <article className="Article">
        <Grid reverse={{ md: true }}>
          <GridItem span={{ sm: 12, md: 9 }}>
            <header>
              {title && <h1>{title}</h1>}
              {_rawMainImage && (
                <div className="Article__image">
                  <SanityImage node={_rawMainImage} />
                </div>
              )}
            </header>
            {body && (
              <div className="Article__content">
                <Editor blocks={body} />
              </div>
            )}
          </GridItem>
          <GridItem span={{ md: 3 }}>
            {body && `Read time: ${getReadTime(body)}min`}
            {publishDate && <p className="Article__date">{publishDate}</p>}
            {authors &&
              authors.map(author => <Author key={author._key} {...author} />)}
          </GridItem>
        </Grid>
        {pagebuilder?.sections && (
          <PageBuilder sections={pagebuilder.sections} />
        )}
      </article>
    </Container>
  )
}

export default Article
