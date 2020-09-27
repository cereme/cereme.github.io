import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'
import { Header } from '../components/header'

import { rhythm } from '../utils/typography'
import '../styles/about.scss'
import * as Lang from '../constants'

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const abouts = data.allMarkdownRemark.edges
  const rootPath = `${__PATH_PREFIX__}/`
  const about = abouts
    .filter(({ node }) => node.frontmatter.type === "about")
    .map(({ node }) => node)[0]

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Header title={"About me"} location={location} rootPath={rootPath} />
      <div
        className="about"
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${0} ${rhythm(0.5)} ${rhythm(0.5)} ${rhythm(0.5)}`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: about.html }} />
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
            date(formatString: "YYYY-MM-DD")
            type
          }
        }
      }
    }
  }
`
