import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { GitHubIcon } from '../social-share/github-icon'

import './index.scss'
import { TopHamburgerButton } from '../top-hamburger-button'
import { TopHamburgerMenu } from '../top-hamburger-menu'

export const Top = ({ title, location, rootPath }) => {
  const isRoot = location.pathname === rootPath
  const [isHamburgerMenuVisible, setHamburgerMenuVisible] = useState(false);
  const toggleHamburgerMenuVisible = () => { setHamburgerMenuVisible(e => !e) }
  const subLinks = [
    {
      to: "/",
      label: "Bio",
    },
    {
      to: "/",
      label: "Resume",
    },
    {
      to: "/",
      label: "Apps",
    },
  ]
  return (
    <React.Fragment>
      <div className="top">
        <Link to={`/`} className="link">
          {title}
        </Link>
        {subLinks.map((link) => (
          <Link to={link.to} className="sub-link">
            {link.label}
          </Link>
        ))}
        <TopHamburgerButton onClick={toggleHamburgerMenuVisible} />
        <GitHubIcon />
      </div>
      { isHamburgerMenuVisible && (
        <TopHamburgerMenu links={subLinks} />
      )}
    </React.Fragment>

  )
}
