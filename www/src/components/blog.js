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
  const {page, nextPagePath, previousPagePath} = pagination

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
        <div
          css={{
            marginTop: 20,
            fontStyle: 'italic',
          }}
        >
          {`Looking for something specific? `}
          <Link to="/search">Search for a blogpost here.</Link>
        </div>
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
                overflow-x: scroll;
              `}
            >
              {post.excerpt}
            </p>
            <Link
              to={post.fields.slug}
              aria-label={`view "${post.frontmatter.title}" article`}
            >
              Read →
            </Link>
          </div>
        ))}
        <br />
        <br />
        <div css={{display: 'flex', justifyContent: 'space-around'}}>
          {previousPagePath ? (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          ) : (
            <div />
          )}
          {nextPagePath ? (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          ) : (
            <div />
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default Blog
