import React from 'react'
import styled, { css } from 'styled-components'

// import Pagebuilder from '../pagebuilder/Pagebuilder'
import PageBuilderNew from '../pagebuilder/PageBuilderNew'
import { H1, P } from '@heydays/Typography'

const Page = ({ className, title, content, pagebuilder, ...props }) => {
  return (
    <div className={className}>
      <header>
        <P>Page</P>
        {title && <H1>{title}</H1>}
      </header>
      {pagebuilder && (
        <div className="Page__content">
          {pagebuilder?.sections && (
            <PageBuilderNew sections={pagebuilder.sections} />
          )}
        </div>
      )}
    </div>
  )
}

export default styled(Page)(({ theme }) => css``)
