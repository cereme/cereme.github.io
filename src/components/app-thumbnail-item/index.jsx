import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'

import './index.scss'

export const AppThumbnailItem = ({ node }) => (
    <a className={`app-item ${TARGET_CLASS}`} href={node.frontmatter.link} target="_blank">
        <div key={node.fields.slug}>
            <h3>{node.frontmatter.title || node.fields.slug}</h3>
            <p>{node.frontmatter.description}</p>
        </div>
    </a>
)
