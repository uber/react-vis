---
slug: react-is-an-implementation-detail
title: React is an implementation detail
date: '2018-10-20'
author: React Vis
description: >-
  _...yep, you read that right. Most of the course actually has nothing to do
  with React specifically._
keywords:
  - javascript
  - testing
  - react
  - Vue
  - Angular
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Andrea Natali](https://unsplash.com/photos/3ud_v3x1lZI) on
  [Unsplash](https://unsplash.com/search/photos/react)'
redirects:
  - '/blog/react-is-an-implementation-detail-and-course-faq'
---

I'm **so excited** about the response to my new
[Testing JavaScript](http://testingjavascript.com) course! I knew the developer
community needed help with testing the right way, but... wow. I'm floored. 🙏

But if you _haven't_ signed up yet (or even if you have), let's talk about React
for a minute.

If you've been following me for a while, you know I'm pretty excited about
React. I'm most effective with React, and I don't use any other frameworks to
get work done on the frontend.

But I'm also a big fan of avoiding testing implementation details, and **React
is an implementation detail!!**

Guess what that means? All the stuff we talk about in
[TestingJavaScript.com](https://testingjavascript.com) is relatively easy to
apply with other frameworks — like whichever framework you're using right now,
or will use in the future.

In fact, I have an entire course showing you how to get up and running with your
own testing utility and enjoy the same benefits that you'll see with
react-testing-library. That's thanks to the fact that react-testing-library
itself is a very small library, and the real brains behind it is
dom-testing-library — which is totally framework-agnostic! Cool right!? 😎

In fact,
[check out this example](https://github.com/react-vis/dom-testing-library-with-anything/blob/9361a120bc52334968e94a10363bab9724d5dbd3/jquery.test.js)
from the course for testing a jQuery plugin with dom-testing-library:

```js
import 'jest-dom/extend-expect'
import $ from 'jquery'
import {getQueriesForElement, fireEvent} from 'dom-testing-library'

$.fn.countify = function countify() {
  this.html(`  
    <div>  
      <button>0</button>  
    </div>  
  `)
  const $button = this.find('button')
  $button._count = 0
  $button.click(() => {
    $button._count++
    $button.text($button._count)
  })
}

// tests:
test('counter increments', () => {
  const div = document.createElement('div')
  $(div).countify()
  const {getByText} = getQueriesForElement(div)
  const counter = getByText('0')
  fireEvent.click(counter)
  expect(counter).toHaveTextContent('1')

  fireEvent.click(counter)
  expect(counter).toHaveTextContent('2')
})
```

The other frameworks are even better, considering most modern frameworks are
component-based. What's so cool is that 99% of the tests you write with these
tools will look basically the same regardless of what framework you use! That's
a huge win.

The hardest part is figuring out how to get some DOM from your component into
the document. And one of the course modules shows you how to do that with 11
frameworks and libraries! I think you'll really like this part of the course!
