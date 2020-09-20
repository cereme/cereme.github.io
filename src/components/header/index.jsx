import React from 'react'
import { Link } from 'gatsby'
import { ThemeSwitch } from './../theme-switch'

import './index.scss'

export const Header = ({ title, location, rootPath, shortDescription }) => {
  const isRoot = location.pathname === rootPath
  const isAppPage = location.pathname === "/apps"
  const headerLink = isAppPage ? `/apps` : `/`
  return (
    (isRoot || isAppPage) && (
      <div className="header-container">
        <h1 className="home-header">
          <Link to={headerLink} className="link">
            {title}
          </Link>
          <div className="mobile-theme-switch"><ThemeSwitch /></div>
        </h1>
        <Link to={`/about`} className="shortDescription-header link">
          {shortDescription}
        </Link>
        <div className="theme-switch"><ThemeSwitch /></div>
      </div>

    )
  )
}
