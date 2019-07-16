import React from 'react'
import {graphql} from 'gatsby'
import Img from 'gatsby-image'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'
import SEO from 'components/seo'
import {css} from '@emotion/core'
import Container from 'components/container'
import Layout from 'components/layout'
import Share from 'components/share'
import SubscribeForm, {TinyLetterSubscribe} from 'components/forms/subscribe'
import BlogPostFooter from 'components/blog-post-footer'
import TestingCta from 'components/testing-cta'
import Markdown from 'react-markdown'
import {headerFontFamily} from '../lib/typography'
import config from '../../config/website'
import {bpMaxSM} from '../lib/breakpoints'
import get from 'lodash/get'

export default function PostPage(props) {
  return <Post {...props} />
}

function Post({data: {site, mdx}}) {
  const {
    isWriting,
    editLink,
    title,
    slug,
    date,
    description,
    banner,
    bannerCredit,
    noFooter,
    keywords,
  } = mdx.fields

  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout
      site={site}
      frontmatter={mdx.fields}
      headerLink={isWriting ? '/writing/blog' : '/blog'}
      noFooter={noFooter}
      subscribeForm={isWriting ? <TinyLetterSubscribe /> : <SubscribeForm />}
    >
      <SEO
        frontmatter={mdx.fields}
        metaImage={get(mdx, 'fields.banner.childImageSharp.fluid.src')}
        isBlogPost
      />
      <article
        css={css`
          width: 100%;
          display: flex;
          twitter-widget {
            margin-left: auto;
            margin-right: auto;
          }
        `}
      >
        <Container
          css={css`
            padding-top: 20px;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin-bottom: 20px;
              margin-top: 0;
              font-family: ${headerFontFamily};
              font-weight: 300;
            `}
          >
            {title}
          </h1>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-bottom: 20px;
              h3,
              span {
                text-align: center;
                font-size: 15px;
                opacity: 0.6;
                font-family: ${headerFontFamily}, sans-serif;
                font-weight: 500;
                font-weight: normal;
                margin: 0 5px;
              }
            `}
          >
            {date && <h3>{date}</h3>}
          </div>
          {banner && (
            <div
              css={css`
                text-align: center;

                p {
                  margin-bottom: 0;
                }
                ${bpMaxSM} {
                  padding: 0;
                }
              `}
            >
              <Img
                fluid={banner.childImageSharp.fluid}
                alt={site.siteMetadata.keywords.join(', ')}
              />
              {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
            </div>
          )}
          <br />
          {description ? <Markdown>{description}</Markdown> : null}
          <MDXRenderer>{mdx.code.body}</MDXRenderer>
        </Container>
        {/* <SubscribeForm /> */}
      </article>
      <Container noVerticalPadding>
        <p css={{textAlign: 'right'}}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          <span css={{marginLeft: 10, marginRight: 10}}>{` • `}</span>
          <a target="_blank" rel="noopener noreferrer" href={editLink}>
            Edit post on GitHub
          </a>
        </p>
      </Container>
      <Container noVerticalPadding css={{marginBottom: 40}}>
        <Share
          url={blogPostUrl}
          title={title}
          twitterHandle={config.twitterHandle}
        />
      </Container>
      {keywords.map(keyword => keyword.toLowerCase()).includes('testing') && (
        <TestingCta />
      )}
      <Container>
        <BlogPostFooter />
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        keywords
      }
    }
    mdx(fields: {id: {eq: $id}}) {
      fields {
        editLink
        isWriting
        title
        noFooter
        description
        plainTextDescription
        date(formatString: "MMMM DD, YYYY")
        author
        banner {
          ...bannerImage720
        }
        bannerCredit
        slug
        keywords
      }
      code {
        body
      }
    }
  }
`
