import React from 'react'
import {render} from 'react-testing-library'
import Subscribe from '../subscribe'

test('subscribe renders first name and email', () => {
  const {getByLabelText} = render(<Subscribe />)

  expect(getByLabelText(/first name/i)).toBeDefined()
  expect(getByLabelText(/email/i)).toBeDefined()
})
