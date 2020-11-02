import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Container from './elements/Container'
import useWindowSize from '@heydays/useWindowSize'

type Props = {
  className?: string
}

const Header: React.FC<Props> = ({ className }) => {
  const headerRef = useRef<HTMLElement | null>(null)
  const windowSize = useWindowSize({ debounce: 200 })

  useEffect(() => {
    if (headerRef?.current) {
      const height = headerRef?.current?.getBoundingClientRect()?.height
      document.documentElement.style.setProperty(
        '--header-height',
        height + 'px'
      )
    }
  }, [headerRef, windowSize])

  return (
    <Container>
      <header className={className} ref={headerRef}>
        <h1>
          <Link href="/">
            <a>NEXT STARTER</a>
          </Link>
        </h1>
      </header>
    </Container>
  )
}

export default styled(Header)(
  ({ theme: t }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${t.spacing.md('mt')};
  `
)
