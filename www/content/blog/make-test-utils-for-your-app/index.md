---
slug: test-utils
title: Make Test Utils For Your App
date: '2019-06-03'
author: 'Kent C. Dodds'
description:
  '_Why every serious app should have custom test utilities and how to do that
  with Jest (even with create-react-app)_'
categories:
  - 'testing'
keywords:
  - 'react'
  - 'javascript'
  - 'jest'
  - 'react testing library'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Helen Williams](https://unsplash.com/photos/_7Eg9GeV1lo)'
published: false
---

Every app has similar but unique requirements from how components should be
rendered (like what context providers the components need) to the kinds of data
tests typically need generated. This is why in the
[React Testing Library documentation](https://testing-library.com/react), we
have
[a section about creating a custom render method](https://testing-library.com/docs/react-testing-library/setup#custom-render).
I want to talk a little bit about why this is necessary, what else you might put
in a file like that, and how to accomplish it with Jest (and create-react-app).

## Why App Test Utils?

Let's take this component as an example:

```javascript
// book-list-screen.js
// BookDetails is rendered at the route /book/:bookId
// and shows the details of the user's book

function BookDetails({bookId}) {
  // useUserBook is a custom hook
  // which requires a <UserBooksProvider />
  const userBooks = useUserBook({bookId})
  return (
    // <BookList> and <BookRow> are emotion components
    // that require emotion's ThemeProvider
    <BookDetailsContainer>
      {userBooks.map(book => (
        <BookRow key={book.id} book={book} />
      ))}
    </BookDetailsContainer>
  )
}
```

To test this we'll need to render the `<BookListScreen />` within emotion's
`<ThemeProvider />` and the app's `<UserBooksProvider />`. We'll also want to
create some test book data. Let's try that:

```javascript
// __tests__/book-list-screen.js
import React from 'react'
import {render} from '@testing-library/react'
// app-theme is in src/app-theme. I'll show you how to set that up later.
import theme from 'app-theme'
import BookListScreen from '../book-list-screen'

test(`renders the user's book list`, () => {
  const {getByText} = render(
    <ThemeProvider theme={theme}>
      <BookListScreen />
    </ThemeProvider>,
  )
})
```
