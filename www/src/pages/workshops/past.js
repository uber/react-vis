import React from 'react'
import {css} from '@emotion/core'
import Layout from 'components/layout'
import Container from 'components/container'
import SEO from 'components/seo'
import theme from '../../../config/theme'
import workshops from '../../data/workshops'
import Presentations from 'components/presentations'

export default function Workshops() {
  return (
    <Layout headerColor={theme.colors.white}>
      <SEO />
      <Container
        noVerticalPadding
        css={css`
          margin-top: 30px;
        `}
      >
        <Presentations presentations={workshops} />
      </Container>
    </Layout>
  )
}
