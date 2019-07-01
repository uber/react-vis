import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import Blog from 'components/blog'
import {TinyLetterSubscribe} from 'components/forms/subscribe'

function WritingBlog(props) {
  return <Blog {...props} subscribeForm={<TinyLetterSubscribe />} />
}

export default function WritingBlogWithData(props) {
  return (
    <StaticQuery
      query={graphql`
        query {
          allMdx(
            sort: {fields: [frontmatter___date], order: DESC}
            filter: {
              frontmatter: {published: {ne: false}, unlisted: {ne: true}}
              fileAbsolutePath: {regex: "//content/writing-blog//"}
            }
          ) {
            edges {
              node {
                excerpt(pruneLength: 300)
                id
                fields {
                  title
                  isWriting
                  slug
                  date
                }
                parent {
                  ... on File {
                    sourceInstanceName
                  }
                }
                frontmatter {
                  title
                  date(formatString: "MMMM DD, YYYY")
                  banner {
                    ...bannerImage640
                  }
                  slug
                  keywords
                }
              }
            }
          }
        }
      `}
      render={data => <WritingBlog data={data} {...props} />}
    />
  )
}
