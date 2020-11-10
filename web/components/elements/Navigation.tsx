import LinkResolver from '@heydays/LinkResolver'
import useSanity from '@heydays/useSanity'
import { AnimateSharedLayout, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React from 'react'
import { resolveRoute } from 'routes'
import styled, { css } from 'styled-components'

type Props = {
  className?: string
}

const Navigation: React.FC<Props> = ({ className }) => {
  const cms = useSanity()
  const mainMenuItems = cms?.data?.global?.primaryMenu?.item
  if (!mainMenuItems) return null
  const router = useRouter()
  return (
    <nav className={className}>
      <AnimateSharedLayout type="crossfade">
        {mainMenuItems.map((item: any) => {
          const isActive = router.asPath === resolveRoute(item?.reference)
          return (
            <MenuItem
              key={item._key}
              as={LinkResolver}
              // isActive={isActive}
              link={item.reference}
            >
              {item.linkText}
              {isActive && (
                <motion.div animate className="line" layoutId="line" />
              )}
            </MenuItem>
          )
        })}
      </AnimateSharedLayout>
    </nav>
  )
}

const MenuItem = styled.div<{ isActive: boolean }>(
  ({ isActive }) => css`
    margin-right: 1rem;
    /* ${isActive &&
      css`
        background: red;
      `} */
  `
)

export default styled(Navigation)`
  display: flex;
  .line {
    height: 1px;
    width: 100%;
    background: black;
  }
`
