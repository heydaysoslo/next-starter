import React, { useContext, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'
import Switch from '@heydays/Switch'
import Container from './elements/Container'
import useWindowSize from '@heydays/useWindowSize'
import AppContext from './context/appContext'
import MainMenu from './elements/MainMenu'

type Props = {
  className?: string
  isDark: boolean
}

const Header: React.FC<Props> = ({ className }) => {
  const headerRef = useRef<HTMLElement | null>(null)
  const windowSize = useWindowSize({ debounce: 200 })
  const { state, actions } = useContext(AppContext)

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
        <div className="Header__tools">
          <MainMenu className="" />
          <Switch
            size={60}
            state={state.darkTheme}
            onClick={() => actions.toggleDarkTheme()}
          />
        </div>
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
    .Header__tools {
      display: flex;
      align-items: center;
    }
  `
)
