import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

export default ({ data, location }) => {
  const { siteMetadata } = data.site

  return (
    <Layout location={location} title={siteMetadata.title}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(0)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        <span> Coming soon!</span>
      </div>
    </Layout>

  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
  }
`
