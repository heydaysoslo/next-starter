import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import Spacer from './Spacer'

const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <Spacer />
      <Container>Footer</Container>
      <Spacer />
    </footer>
  )
}

export default styled(Footer)`
  border-top: 1px solid black;
`
