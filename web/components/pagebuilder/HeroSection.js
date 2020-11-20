import React from 'react'
import Spacer from '@heydays/Spacer'
import Container from '@heydays/Container'
import { H1 } from '@heydays/Typography'
import styled, { css } from 'styled-components'

const HeroSection = ({ className, title }) => {
  return (
    <header className={className}>
      <Container>
        <Spacer size="header" />
        <H1>{title}</H1>
      </Container>
    </header>
  )
}

export default styled(HeroSection)(
  ({ theme }) => css`
    text-align: center;
  `
)
