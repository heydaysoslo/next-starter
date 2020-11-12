import React from 'react'
import styled, { css } from 'styled-components'

import NavItemResolver from '@heydays/NavItemResolver'
import useSanity from '@heydays/useSanity'
import { AnimateSharedLayout } from 'framer-motion'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => {
  const cms = useSanity()
  const mainMenuItems = cms?.data?.global?.primaryMenu?.item
  if (!mainMenuItems) return null
  return (
    <nav className={className}>
      <AnimateSharedLayout type="crossfade">
        {mainMenuItems.map((item: any) => {
          return (
          <NavItemResolver className="Navigation__item" key={item._key} item={item} />
          )
        })}
      </AnimateSharedLayout>
    </nav>
  )
}

export default styled(Navigation)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .line {
    height: 1px;
    width: 100%;
    background: black;
  }
  .Navigation__item {
    margin-left: 10px;
  }
`
