import useSanity from '@heydays/useSanity'
import React from 'react'
import styled from 'styled-components'
import Container from './Container'
import Grid, { GridItem } from './Grid'
import NavList from './NavList'
import Spacer from './Spacer'
import { H3 } from './Typography'

const Footer = ({ className }) => {
  const cms = useSanity()
  const menus = cms?.data?.global?.footerMenus
  return (
    <footer className={className}>
      <Spacer />
      <Container>
        <Grid gap>
          <GridItem span={{ xs: 12, md: 6, lg: 3 }}>Next Starter</GridItem>
          {menus &&
            menus.map(menu => {
              return (
                <GridItem key={menu._id} span={{ xs: 12, md: 6, lg: 3 }}>
                  {menu?.title && <H3>{menu.title}</H3>}
                  <NavList
                    className="nav-menu"
                    items={menu?.item}
                    direction="vertical"
                  />
                </GridItem>
              )
            })}
        </Grid>
      </Container>
      <Spacer />
    </footer>
  )
}

export default styled(Footer)`
  border-top: 1px solid black;
  .nav-menu {
    margin-top: 20px;
  }
`
