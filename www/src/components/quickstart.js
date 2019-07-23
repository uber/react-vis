import React from 'react'
import Img from 'gatsby-image'
import {css} from '@emotion/core'
import Container from 'components/container'
import SEO from 'components/seo'
import Layout from 'components/layout'
import Link from 'components/link'
import {bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'

function Blog({data: {allMdx}, pageContext: {pagination}, subscribeForm}) {
  const {page} = pagination

  const posts = page
    .map(id =>
      allMdx.edges.find(
        edge =>
          edge.node.id === id &&
          edge.node.parent.sourceInstanceName !== 'pages',
      ),
    )
    .filter(post => post !== undefined)

  return (
    <Layout headerColor={theme.colors.white} subscribeForm={subscribeForm}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 10px;
          a,
          p {
          }
          h2 {
            a {
              color: inherit;
            }
          }
          small {
            display: block;
          }
        `}
      >
        {posts.map(({node: post}) => (
          <div
            key={post.id}
            css={css`
              :not(:first-of-type) {
                margin-top: 20px;
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              :first-of-type {
                margin-top: 20px;
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              .gatsby-image-wrapper {
              }
              background: white;
              padding: 40px;
              ${bpMaxSM} {
                padding: 20px;
              }
              display: flex;
              flex-direction: column;
            `}
          >
            {post.frontmatter.banner && (
              <div
                css={css`
                  padding-bottom: 10px;
                  ${bpMaxSM} {
                    padding: 20px;
                  }
                `}
              >
                <Link
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={post.fields.slug}
                >
                  <Img fluid={post.frontmatter.banner.childImageSharp.fluid} />
                </Link>
              </div>
            )}
            <h2
              css={css`
                margin-top: 30px;
                margin-bottom: 10px;
              `}
            >
              <Link
                aria-label={`View ${post.frontmatter.title} article`}
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            <p
              css={css`
                margin-top: 10px;
              `}
            >
              {post.excerpt}
            </p>
          </div>
        ))}
        <br />
      </Container>
    </Layout>
  )
}

export default Blog
