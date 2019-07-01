import React from 'react'
import ScheduledWorkshop from './scheduled-workshop'
import get from 'lodash/get'
import {css} from '@emotion/core'

function UpcomingWorkshops({events, headline}) {
  return (
    <div>
      {events.length ? (
        <div
          css={css`
            margin-top: -30px;
            position: relative;
            z-index: 5;
          `}
        >
          {headline && (
            <h1
              css={css`
                margin-bottom: 45px;
              `}
            >
              {headline}
            </h1>
          )}
          {events.map(event => {
            const discount = get(event, 'discounts.early', false)
            return (
              <ScheduledWorkshop
                buttonText={discount ? 'Secure a Discount' : 'Secure Your Seat'}
                tech={event.tech}
                waitlistUrl={event.url}
                description={event.description}
                title={event.title}
                imageUrl={event.logo.url}
                date={event.date}
                spotsRemaining={event.remaining}
                bookUrl={discount ? discount.url : event.url}
                url={event.workshopSlug}
                soldOut={event.remaining === 0}
                key={event.slug}
                startTime={event.startTime}
                endTime={event.endTime}
                location={event.location}
                discount={discount}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default UpcomingWorkshops
