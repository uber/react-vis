import React from 'react'
import {graphql} from 'gatsby'
import Layout from 'components/layout'
import Message from 'components/confirm-message/message'
import {
  PleaseConfirmIllustration,
  ThankYouIllustration,
  UnsubscribeIllustration,
} from 'components/confirm-message/illustrations'

export default function Messages({data: {latestArticle}}) {
  return (
    <Layout subscribeForm={null}>
      <div>
        <Message
          fullscreen
          illustration={PleaseConfirmIllustration}
          title="Great, one last thing..."
          body="We just sent you an email with the confirmation link. 
          **Please check your inbox!**"
        />
      </div>
      <div>
        {latestArticle.edges.map(({node: post}) => (
          <Message
            fullscreen
            key={post.id}
            illustration={ThankYouIllustration}
            title="Success! Thank you!"
            body="In case you haven't seen already, here's my latest article:"
            articleTitle={post.frontmatter.title}
            articleSlug={post.frontmatter.slug}
          />
        ))}
      </div>
      <div>
        <Message
          fullscreen
          illustration={UnsubscribeIllustration}
          title="You have been unsubscribed."
          body="As per your request, you have been unsubscribed from all our mailings."
          note="Changed your mind? [Click here to resubscribe](#)"
        />
      </div>
    </Layout>
  )
}

export const latestArticle = graphql`
  query {
    latestArticle: allMdx(
      limit: 1
      sort: {fields: [frontmatter___date], order: DESC}
      filter: {
        frontmatter: {published: {ne: false}}
        fileAbsolutePath: {regex: "//content/blog//"}
      }
    ) {
      totalCount
      edges {
        node {
          id
          fields {
            title
            slug
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")

            slug
          }
        }
      }
    }
  }
`
