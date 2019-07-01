---
slug: introducing-the-react-testing-library
title: "Introducing the react-testing-library \U0001F410"
date: '2018-04-02'
author: React Vis
description:
  _A simpler replacement for enzyme that encourages good testing practices._
keywords:
  - react
  - javascript
  - testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Rob Potter](https://unsplash.com/photos/mrZVkCKyaPk) on
  [Unsplash](https://unsplash.com/search/photos/goat)'
---

Two weeks ago, I wrote
[a new library](https://github.com/testing-library/react-testing-library)! I've
been thinking about it for a while. But two weeks ago I started getting pretty
serious about it:

https://twitter.com/react-vis/status/974278185540964352

Read on to get an idea of what I mean by "damaging practices."

### [react-testing-library](https://github.com/testing-library/react-testing-library)

![The library emoji is the goat. No particular reason...](./images/0.png)

> Simple and complete React DOM testing utilities that encourage good testing
> practices.

### The problem

You want to write maintainable tests for your React components. As a part of
this goal, you want your tests to avoid including implementation details of your
components and rather focus on making your tests give you the confidence for
which they are intended. As part of this, you want your testbase to be
maintainable in the long run so refactors of your components (changes to
implementation but not functionality) don't break your tests and slow you and
your team down.

### This solution

The `react-testing-library` is a very light-weight solution for testing React
components. It provides light utility functions on top of `react-dom` and
`react-dom/test-utils`, in a way that encourages better testing practices. It's
primary guiding principle is:

https://twitter.com/react-vis/status/977018512689455106

So rather than dealing with instances of rendered react components, your tests
will work with actual DOM nodes. The utilities this library provides facilitate
querying the DOM in the same way the user would. Finding for elements by their
label text (just like a user would), finding links and buttons from their text
(like a user would). It also exposes a recommended way to find elements by a
`data-testid` as an "escape hatch" for elements where the text content and label
do not make sense or is not practical.

This library encourages your applications to be more accessible and allows you
to get your tests closer to using your components the way a user will, which
allows your tests to give you more confidence that your application will work
when a real user uses it.

This library is a replacement for [enzyme](http://airbnb.io/enzyme). While you
_can_ follow these guidelines using enzyme itself, enforcing this is harder
because of all the extra utilities that enzyme provides (utilities which
facilitate testing implementation details). Read more about this in
[the FAQ](https://github.com/testing-library/react-testing-library/blob/master/README.md#faq).

Also, while the react-testing-library is intended for react-dom, it can support
React Native with
[this short setup file](https://github.com/testing-library/react-testing-library/issues/22#issuecomment-376756260).

**What this library is not**:

1.  A test runner or framework
2.  Specific to a testing framework (though we recommend Jest as our preference,
    the library works with any framework, and even
    [in codesandbox](https://codesandbox.io/s/5z6x4r7n0p)!)

### Practical Example

```jsx
import React from 'react'
import {render, Simulate, wait} from 'react-testing-library'
// this adds custom expect matchers
import 'react-testing-library/extend-expect'
// the mock lives in a __mocks__ directory
import axiosMock from 'axios'
import GreetingFetcher from '../greeting-fetcher'
test('displays greeting when clicking Load Greeting', async () => {
  // Arrange
  axiosMock.get.mockImplementationOnce(({name}) =>
    Promise.resolve({
      data: {greeting: `Hello ${name}`},
    }),
  )
  const {getByLabelText, getByText, getByTestId, container} = render(
    <GreetingFetcher />,
  )

  // Act
  getByLabelText('name').value = 'Mary'
  Simulate.click(getByText('Load Greeting'))
  // let's wait for our mocked `get` request promise to resolve
  // wait will wait until the callback doesn't throw an error
  await wait(() => getByTestId('greeting-text'))

  // Assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  // here's a custom matcher!
  expect(getByTestId('greeting-text')).toHaveTextContent('Hello Mary')
  // snapshots work great with regular DOM nodes!
  expect(container.firstChild).toMatchSnapshot()
})
```

The most important takeaway from this example is:

> **The test is written in such a way that resembles how the user is using your
> application.**

Let's explore this further...

Our `GreetingFetcher` might render some HTML like this:

```jsx
<div>
  <label for="name-input">Name</label>
  <input id="name-input" />
  <button>Load Greeting</button>
  <div data-testid="greeting-text" />
</div>
```

So the functionality is: Set the name, click the "Load Greeting" button, and a
server request is made to load greeting text with that name.

In your test you'll need to find the `<input />` so you can set its `value` to
something. Conventional wisdom suggests you could use the `id` property in a CSS
selector: `#name-input`. But is that what the user does to find that input?
Definitely not! They look at the screen and find the input with the label "Name"
and fill that in. So that's what our test is doing with `getByLabelText`. It
gets the form control based on its label.

Often in tests using enzyme, to find the "Load Greeting" button you might use a
CSS selector or even find by component `displayName` or the component
constructor. But when the user wants to load the greeting, they don't care about
those implementation details, instead they're going to find and click the button
that says "Load Greeting." And that's exactly what our test is doing with the
`getByText` helper!

In addition, the `wait` resembles exactly what the users does. They wait for the
greeting text to appear, however long that takes. In our tests we're mocking
that out so it happens basically instantly, but our test doesn't actually care
how long it takes. We don't have to use a `setTimeout` in our test or anything.
We simply say: "Hey, wait until the `greeting-text` node appears." (Note, in
this case it's using a `data-testid` attribute which is an escape hatch for
situations where it doesn't make sense to find an element by any other
mechanism.
[A `data-testid` is definitely better then alternatives.](/blog/making-your-ui-tests-resilient-to-change)

### High-level Overview API

Originally, the library only provided `queryByTestId` as a utility as suggested
in my blog post
"[Making your UI tests resilient to change](/blog/making-your-ui-tests-resilient-to-change)".
But thanks to feedback on that blog post from
[Bergé Greg](https://twitter.com/neoziro) as well as inspiration from
[a fantastic (and short!) talk](https://youtu.be/qfnkDyHVJzs&t=5h39m19s) by
[Jamie White](https://twitter.com/jgwhite), I added several more and now I'm
even happier with this solution.

You can read more about the library and its APIs in
[the official docs](https://github.com/testing-library/react-testing-library).
Here's a high-level overview of what this library gives you:

- [`Simulate`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#simulate):
  a re-export from the `Simulate` utility from
  [the](https://reactjs.org/docs/test-utils.html#simulate)
  [`react-dom/test-utils`](https://reactjs.org/docs/test-utils.html#simulate)
  [](https://reactjs.org/docs/test-utils.html#simulate)
  [`Simulate`](https://reactjs.org/docs/test-utils.html#simulate)
  [object](https://reactjs.org/docs/test-utils.html#simulate).
- [`wait`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#wait):
  allows you to wait for a non-deterministic period of time in your tests.
  Normally you should
  [mock out API requests](https://github.com/testing-library/react-testing-library/blob/master/src/__tests__/fetch.js)
  or
  [animations](https://github.com/testing-library/react-testing-library/blob/master/src/__tests__/mock.react-transition-group.js),
  but even if you're dealing with immediately resolved promises, you'll need
  your tests to wait for the next tick of the event loop and `wait` is really
  good for that. (Big shout out to
  [Łukasz Gozda Gandecki](https://twitter.com/lgandecki) who
  [introduced this](https://github.com/testing-library/react-testing-library/issues/21)
  as a replacement for the (now deprecated)`flushPromises` API).
- [`render`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#render):
  This is the meat of the library. It's fairly simple. It creates a `div`with
  `document.createElement`, then uses `ReactDOM.render` to render to that `div`.

The `render` function returns the following objects and utilities:

- [`container`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#container):
  The `div` your component was rendered to
- [`unmount`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#unmount):
  A simple wrapper over `ReactDOM.unmountComponentAtNode`to unmount your
  component (to facilitate easier testing of `componentWillUnmount` for
  example).
- [`getByLabelText`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbylabeltexttext-textmatch-options-selector-string---htmlelement):
  Get a form control associated to a label
- [`getByPlaceholderText`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbyplaceholdertexttext-textmatch-htmlelement):
  Placeholders aren't proper alternatives to labels, but if this makes more
  sense for your use case it's available.
- [`getByText`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbytexttext-textmatch-htmlelement):
  Get any element by its text content.
- [`getByAltText`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbyalttexttext-textmatch-htmlelement):
  Get an element (like an `<img`) by it's `alt` attribute value.
- [`getByTestId`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#getbytestidtext-textmatch-htmlelement):
  Get an element by its `data-testid` attribute.

Each of those `get*` utilities will throw a useful error message if no element
can be found. There's also an associated `query*` API for each which will return
`null`instead of throwing an error which can be useful for asserting that an
element is _not_ in the DOM.

Also, for these `get*` utilities, to find a matching element, you can pass:

- a case-insensitive substring: `lo world` matches `Hello World`
- a regex: `/^Hello World$/` matches `Hello World`
- a function that accepts the text and the element:
  `(text, el) => el.tagName === 'SPAN' && text.startsWith('Hello')` would match
  a span that has content that starts with `Hello`

### Custom Jest Matchers

Thanks to [Anto Aravinth Belgin Rayen](https://github.com/antoaravinth), we have
some handy custom Jest matchers as well:

- [`toBeInTheDOM`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#tobeinthedom):
  Assert whether an element present in the DOM or not.
- [`toHaveTextContent`](https://github.com/testing-library/react-testing-library/blob/fd2df8d18652786a95bce34741180137f9d2cef2/README.md#tohavetextcontent):
  Check whether the given element has a text content or not.

> Note: now these have been extracted to
> [jest-dom](https://github.com/testing-library/jest-dom) which is maintained by
> [Ernesto García](https://github.com/gnapse)

### Conclusion

A big feature of this library is that it doesn't have utilities that enable
testing implementation details. It focuses on providing utilities that encourage
good testing and software practices. I hope that by using
[the](https://github.com/testing-library/react-testing-library)
[`react-testing-library`](https://github.com/testing-library/react-testing-library)your
React testbases are easier to understand and maintain.

**Learn more about Testing from me**:

[Frontend Masters](https://frontendmasters.com) in Minneapolis (and online) this
month!:

- [Testing Practices and Principles](https://frontendmasters.com/workshops/testing-practices-principles)
- [Testing React Applications](https://frontendmasters.com/workshops/testing-react-apps)

**Things to not miss**:

- I am now on Patreon! Support these newsletters and other things I do!
  [patreon.com/react-vis](https://www.patreon.com/react-vis)
- [React Dev Summit](https://reactdevsummit.com): Coupon code "KENT" gets 10%
  off the ticket price
- [polyfill.io](https://polyfill.io): It's more than just an amazing service,
  it's a node module that you can use yourself. This last week I did exactly
  that and it's amazing. I'll probably write about it eventually.
- Oh, by the way, I was originally going to call this library:
  `react-dom-testing-assistant` or `rdta`, but after
  [I tweeted about it](https://twitter.com/react-vis/status/975422070656921601),
  [Ryan suggested](https://twitter.com/ryanflorence/status/975424602699530240)`react-testing-library`
  and I couldn't pass it up.
