import React from 'react'

import { Top } from '../components/top'
import { Header } from '../components/header'
import { Footer } from '../components/footer'
import { rhythm } from '../utils/typography'

import './index.scss'

export const Layout = ({ location, title, shortDescription, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRoot = location.pathname === rootPath
  // TODO: refactor
  const isAnotherPath = (location.pathname === "/about") || (location.pathname === "/apps");

  return (
    <React.Fragment>
      <Top title={title} location={location} rootPath={rootPath} />
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: !isAnotherPath ? `${rhythm(1)} ${rhythm(3 / 4)}` : `${rhythm(0)} ${rhythm(1 / 4)}`,
        }}
      >
        <Header title={title} location={location} rootPath={rootPath} shortDescription={shortDescription} />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  )
}
