import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
import styled from '@emotion/styled'
import Img from 'gatsby-image'
import {darken} from 'polished'
import {Carousel} from 'react-responsive-carousel'
import Container from './container'
import Link from './link'
import {bpMaxMD, bpMaxSM} from '../lib/breakpoints'
import theme from '../../config/theme'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
})

const Block = styled(Container)({
  background: 'white',
  borderRadius: '5px',
  padding: '60px 50px',
  [bpMaxMD]: {
    padding: 'auto',
  },
  display: 'grid',
  gridGap: '40px',
  gridTemplateColumns: '1fr 2fr',
  img: {
    margin: '0',
  },
  h2: {
    fontSize: '34px',
    margin: '0',
  },
  h3: {
    letterSpacing: '-0.01rem',
    fontSize: '20px',
    marginTop: '10px',
    marginBottom: '25px',
  },
  p: {
    maxWidth: '350px',
  },
  '.carousel .slide': {
    background: 'transparent',
  },
  [bpMaxSM]: {
    borderRadius: '0',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    h2: {
      fontSize: '24px',
    },
    img: {
      padding: '50px',
    },
  },
})

const Button = styled(Link)({
  padding: '10px 15px',
  borderRadius: '3px',
  background: theme.colors.green,
  color: 'white',
  ':hover, :focus': {
    color: 'white',
    background: darken(0.1, theme.colors.green),
  },
})

const TestingCta = () => {
  const {allFile} = useStaticQuery(
    graphql`
      query {
        allFile(
          sort: {fields: name, order: DESC}
          filter: {relativeDirectory: {eq: "images/testing"}}
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    `,
  )
  return (
    <Block>
      <Carousel
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
      >
        {allFile.edges.map(({node}) => (
          <Img
            fluid={node.childImageSharp.fluid}
            key={node.id}
            alt={node.name.replace(/-/g, ' ').substring(2)}
          />
        ))}
      </Carousel>
      <Content>
        <h2>Content</h2>
        <h3>Your essential guide to flawless testing.</h3>
        <p>
          Jump on this self-paced workshop and learn the smart, efficient way to
          test any JavaScript application.{' '}
          <span role="img" aria-label="trophy">
            🏆
          </span>
        </p>
        <Button to="https://testingjavascript.com/">Start Now</Button>
      </Content>
    </Block>
  )
}

export default TestingCta
