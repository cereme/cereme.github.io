import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import * as Lang from '../constants'

export default ({ data }) => {
  const { siteMetadata } = data.site
  const bios = data.allMarkdownRemark.edges
  const bio = bios
    .filter(({ node }) => node.frontmatter.type === "bio")
    .map(({ node }) => node)[0]

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
        <div dangerouslySetInnerHTML={{ __html: bio.html }} />
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
    allMarkdownRemark(filter: { frontmatter: { category: { eq: null } } }) {
      edges {
        node {
          id
          excerpt(pruneLength: 160)
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            type
          }
        }
      }
    }
  }
`
