import React from 'react'
import {useFetch} from 'react-async'
import {useStaticQuery, graphql} from 'gatsby'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import intersection from 'lodash/intersection'

const workshopQuery = graphql`
  query {
    data: allMdx(filter: {fields: {isWorkshop: {eq: true}}}) {
      edges {
        node {
          frontmatter {
            tech
            title
            description
            keywords
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

const WorkshopEvents = React.createContext()

function WorkshopEventsProvider(props) {
  const headers = {Accept: 'application/json'}
  const {data, error, isLoading} = useFetch(
    `${process.env.NETLIFY_FUNCTIONS_URL}/tickets`,
    {headers},
  )
  const value = React.useMemo(() => ({data, error, isLoading}), [
    data,
    error,
    isLoading,
  ])
  return <WorkshopEvents.Provider value={value} {...props} />
}

function useStaticWorkshops() {
  const {data} = useStaticQuery(workshopQuery)
  const workshops = data.edges.reduce((acc, edge) => {
    const {node} = edge
    return [
      ...acc,
      {
        tech: node.frontmatter.tech,
        title: node.frontmatter.title,
        slug: node.fields.slug,
        keywords: node.frontmatter.keywords,
      },
    ]
  }, [])
  return workshops
}

function useWorkshopEvents({keywords: keywordsFilter} = {}) {
  const context = React.useContext(WorkshopEvents)
  const workshops = useStaticWorkshops()
  if (!context) {
    throw new Error(
      'useWorkshopEvents must be used within a WorkshopEventsProvider',
    )
  }
  const {data} = context
  const events = get(data, 'events', []).map(event => {
    const workshop =
      workshops.find(w => {
        return w.title.toLowerCase() === event.title.toLowerCase()
      }) || {}
    return {
      ...workshop,
      ...event,
      workshopSlug: workshop.slug,
    }
  })
  const eventsByKeywords = isEmpty(keywordsFilter)
    ? []
    : events.filter(
        event => !isEmpty(intersection(event.keywords, keywordsFilter)),
      )
  return {
    ...context,
    events,
    eventsByKeywords,
  }
}

export {WorkshopEventsProvider, useWorkshopEvents}
