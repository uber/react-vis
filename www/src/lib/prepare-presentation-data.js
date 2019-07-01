import stripIndent from 'strip-indent'
import slugify from '@sindresorhus/slugify'

function preparePresentationData(presentation) {
  return {
    // defaults
    slug: slugify(presentation.title || ''),

    ...presentation,

    // overrides
    title: stripIndent(presentation.title || ''),
    description: stripIndent(presentation.description || ''),
    resources: (presentation.resources || []).map(r => stripIndent(r)),
    deliveries: (presentation.deliveries || [])
      .map(delivery => ({
        ...delivery,
        endDate: delivery.endDate || delivery.date,
        isFuture: moreRecent(delivery.date),
      }))
      .sort((a, b) => {
        return moreRecent(a.date, b.date) ? -1 : 1
      }),
    tags: presentation.tags || [],
  }
}

function sortByPresentationDate(a, b) {
  const mostRecentA = mostRecent(a.deliveries.map(({date}) => date))
  const mostRecentB = mostRecent(b.deliveries.map(({date}) => date))
  return moreRecent(mostRecentA, mostRecentB) ? -1 : 1
}

function mostRecent(dates = []) {
  return dates.reduce((recent, compare) => {
    return moreRecent(compare, recent) ? compare : recent
  }, [])
}

// returns true if a is more recent than b
function moreRecent(a, b = new Date()) {
  if (typeof a === 'string') {
    a = new Date(...a.split('-'))
  }
  if (typeof b === 'string') {
    b = new Date(...b.split('-'))
  }
  return a > b
}

export {preparePresentationData, sortByPresentationDate}
