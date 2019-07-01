require('dotenv').config()
const axios = require('axios')
const _ = require('lodash')
const cache = require('memory-cache')
const {isFuture} = require('date-fns')

const site = 'kent-c-dodds'

axios.defaults.headers.common.Authorization = `Bearer ${
  process.env.TITO_API_SECRET
}`
axios.defaults.headers.common.Accept = 'application/json'

function buildEvents(eventsData) {
  const events = _.map(
    _.filter(_.sortBy(eventsData, 'start_date'), event => {
      return isFuture(new Date(event.start_date)) && event.live
    }),
    eventData => {
      const {slug, url, logo, title} = eventData
      function getReleases(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/releases`)
          .then(({data}) => data.releases)
      }

      function getDiscountCodes(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/discount_codes`)
          .then(({data}) =>
            _.filter(data.discount_codes, code => {
              return (
                code.code === 'early' &&
                code.state === 'current' &&
                (code.quantity || 0) > code.quantity_used
              )
            }),
          )
      }

      function getActivities(eventSlug) {
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}/activities`)
          .then(({data}) => data.activities)
      }

      function getEvent(eventSlug) {
        // this one gives back a bunch of data and was added so we could get the location
        // when we have more time, we may be able to see if we can get rid of some of the other
        // requests because this one seems to have a lot of the same data as the others.
        return axios
          .get(`https://api.tito.io/v3/${site}/${eventSlug}`)
          .then(({data}) => data.event)
      }

      return axios
        .all([
          getReleases(slug),
          getDiscountCodes(slug),
          getActivities(slug),
          getEvent(slug),
        ])
        .then(
          axios.spread((releases, codes, activities, event) => {
            const discounts = _.reduce(
              _.map(codes, code => {
                return {url: code.share_url, code: code.code, ends: code.end_at}
              }),
              (acc, discount) => {
                return {
                  ...acc,
                  [discount.code]: {
                    url: discount.url,
                    ends: discount.ends,
                  },
                }
              },
              {},
            )

            const activity = _.first(activities)

            const tickets = _.reduce(
              releases,
              (acc, release) => {
                return {
                  quantity: acc.quantity + release.quantity,
                  sold: acc.sold + release.tickets_count,
                  remaining:
                    acc.remaining + (release.quantity - release.tickets_count),
                }
              },
              {
                quantity: 0,
                sold: 0,
                remaining: 0,
              },
            )
            return {
              ...tickets,
              location: event.location,
              slug,
              discounts,
              title,
              logo,
              url,
              date: event.date_or_range,
              startTime: _.get(activity, 'start_at'),
              endTime: _.get(activity, 'end_at'),
            }
          }),
        )
    },
  )

  return axios.all(events).then(axios.spread((...rest) => rest))
}

export function handler() {
  const cacheDuration = 1000 * 60 * 30 //30mins
  const cachedEvents = cache.get('events')

  if (cachedEvents) {
    return Promise.resolve({
      statusCode: 200,
      body: cachedEvents,
    })
  }

  return axios
    .get(`https://api.tito.io/v3/${site}/events`)
    .then(({data}) => data.events)
    .then(buildEvents)
    .then(events => {
      cache.put('events', JSON.stringify({events}), cacheDuration)
      return {
        statusCode: 200,
        body: JSON.stringify({events}),
      }
    })
    .catch(({response}) => {
      return {
        statusCode: response.status,
        body: JSON.stringify({error: response.statusText}),
      }
    })
}
