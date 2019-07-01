import React from 'react'
import {graphql} from 'gatsby'
import {css} from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/layout'
import Container from 'components/container'
import {rhythm} from '../../lib/typography'
import SEO from 'components/seo'
import theme from '../../../config/theme'
import Hero from 'components/big-hero'
import {uniq, includes, truncate} from 'lodash'
import HeaderImage from '../../images/workshops-hero.svg'

import {
  WorkshopEventsProvider,
  useWorkshopEvents,
} from 'components/workshops/context'
import UpcomingWorkshops from 'components/workshops/upcoming-workshops'
import Workshop from 'components/workshops/workshop'

import jsIcon from '../../images/icons/js.svg'
import reactIcon from '../../images/icons/react.svg'
import testingIcon from '../../images/icons/testing.svg'

export default function RemoteWorkshopsPage(props) {
  return (
    <WorkshopEventsProvider>
      <RemoteWorkshops {...props} />
    </WorkshopEventsProvider>
  )
}

function RemoteWorkshops({data: {workshops}}) {
  const workshopTech = uniq(
    workshops.edges.map(({node: workshop}) => workshop.frontmatter.tech),
  )

  const [displayedTech, setDisplayedTech] = React.useState(workshopTech)
  const {events} = useWorkshopEvents()

  const techToggleIsActive = (getDisplayedTech, tech) => {
    return includes(getDisplayedTech, tech) && getDisplayedTech.length === 1
  }

  const techImage = tech => {
    return (
      (tech === 'react' && `${reactIcon}`) ||
      (tech === 'javascript' && `${jsIcon}`) ||
      (tech === 'testing' && `${testingIcon}`)
    )
  }

  const TechToggle = styled.button`
    padding: 8px 15px 8px 12px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    border: none !important;
    display: flex;
    align-items: center;
    text-transform: capitalize;
    margin: 5px;
    :focus {
      outline: none;
    }
    img {
      margin: 0;
      margin-right: 10px;
    }
    :hover,
    :focus {
      color: ${theme.colors.body_color};
      background: #fafafa !important;
      border: none;
    }
  `

  return (
    <Layout
      hero={
        <Hero
          title="Remote Workshops"
          text="Learning shouldn't depend on location. Remote workshops with Kent are a valuable and effective way to level-up your skills as a web developer."
          image={HeaderImage}
          background="linear-gradient(213deg, #854BF1 0%, #4335DF 100%), linear-gradient(32deg, rgba(255,255,255,0.25) 33%, rgba(153,153,153,0.25) 100%)"
        />
      }
      headerColor={theme.colors.white}
    >
      <SEO />
      <Container noVerticalPadding>
        <UpcomingWorkshops events={events} />

        <div
          css={css`
            text-align: center;
            margin: ${rhythm(2)} 0 ${rhythm(1.5)} 0;
          `}
        >
          <h1>Available Workshops</h1>
          <p>Join the waitlist to get early access and special discounts</p>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: center;
            `}
          >
            {workshopTech.map(tech => (
              <TechToggle
                css={css`
                  ${techToggleIsActive(displayedTech, tech)
                    ? `
                  color: white; background: #2F313E;
                  :hover {
                    color: white !important;
                    background: #232323 !important;}`
                    : `
                  color: black; background: white;
                  :hover {
                    color: black !important;
                    background: #fafafa; !important}`}
                `}
                key={tech}
                onClick={() => {
                  if (techToggleIsActive(displayedTech, tech)) {
                    setDisplayedTech(workshopTech)
                  } else {
                    setDisplayedTech([tech])
                  }
                }}
              >
                <img src={techImage(tech)} alt={tech} /> {tech}
              </TechToggle>
            ))}
          </div>
        </div>
        <div
          css={css`
            display: grid;
            grid-gap: 20px;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            margin-bottom: ${rhythm(2)};
          `}
        >
          {workshops.edges
            .filter(({node: workshop}) => {
              return includes(displayedTech, workshop.frontmatter.tech)
            })
            .map(({node: workshop}) => (
              <Workshop
                key={workshop.id}
                title={workshop.frontmatter.title}
                description={truncate(workshop.frontmatter.description, {
                  length: 190,
                })}
                url={
                  workshop.fields.slug
                    ? workshop.fields.slug
                    : `/workshops/${workshop.frontmatter.slug}`
                }
                tech={workshop.frontmatter.tech}
              />
            ))}
        </div>
      </Container>
    </Layout>
  )
}

export const remoteWorkshopsQuery = graphql`
  query {
    workshops: allMdx(
      filter: {fields: {isWorkshop: {eq: true}, isScheduled: {eq: false}}}
      sort: {order: ASC, fields: [frontmatter___tech]}
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            description
            tech
            slug
          }
          fields {
            slug
          }
        }
      }
      totalCount
    }
  }
`
