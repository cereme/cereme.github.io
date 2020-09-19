import React from 'react'
import { Link } from 'gatsby'

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
        </h1>
        <Link to={`/bio`} className="shortDescription-header link">
          {shortDescription}
        </Link>
      </div>

    )
  )
}
