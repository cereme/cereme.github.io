import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from '../layout'

import { rhythm } from '../utils/typography'
import { AppThumbnailItem } from '../components/app-thumbnail-item'
import { Contents } from '../components/contents'
import { Header } from '../components/header'
import { useRenderedCount } from '../hooks/useRenderedCount'
import * as Lang from '../constants'

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const apps = data.allMarkdownRemark.edges
  const rootPath = `${__PATH_PREFIX__}/`
  console.log(apps)
  return (
    <Layout location={location} title={siteMetadata.title}>
      <Header title={"Apps"} location={location} rootPath={rootPath} shortDescription={"개인 토이프로젝트들"} />
      <div
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(36),
          padding: `${rhythm(1 / 2)} ${rhythm(3 / 4)} ${rhythm(1.5)} ${rhythm(
            3 / 4
          )}`,
        }}
      >
        {apps.map(e => (
          <AppThumbnailItem
            node={e.node}
            key={e.node.fields.slug}
          />
        ))}
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___order], order: DESC }
      filter: { frontmatter: { category: { eq: null }, order: { ne: null } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            type
            order
            description
            link
          }
        }
      }
    }
  }
`
