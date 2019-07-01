import React from 'react'
import {css} from '@emotion/core'
import Layout from '../components/layout'
import Container from 'components/container'
import SEO from '../components/seo'
import theme from '../../config/theme'
import talks from '../data/talks'
import Presentations from 'components/presentations'

export default function Talks() {
  return (
    <Layout headerColor={theme.colors.white}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        <Presentations presentations={talks} />
      </Container>
    </Layout>
  )
}
