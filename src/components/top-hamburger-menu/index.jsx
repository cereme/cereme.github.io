import React from 'react'
import { Link } from 'gatsby'
import './index.scss'
export const TopHamburgerMenu = ({ links }) => {
    return (
        <div className="top-hamburger-menu">
            {links.map(link => (
                <Link to={link.to} className="sub-link">
                    {link.label}
                </Link>
            ))}
        </div>
    )
}