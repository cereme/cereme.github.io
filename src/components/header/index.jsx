import React from 'react'
import { Link } from 'gatsby'
import { ThemeSwitch } from './../theme-switch'

import './index.scss'

export const Header = ({ title, location, rootPath, shortDescription }) => {
  const isRoot = location.pathname === rootPath
  return (
    isRoot && (
      <div className="header-container">
        <h1 className="home-header">
          <Link to={`/`} className="link">
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
