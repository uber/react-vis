---
slug: the-merits-of-mocking
title: The Merits of Mocking
date: '2018-11-05'
author: Kent C. Dodds
description:
  '_What are you doing when you mock something, and when is it worth the cost?_'
keywords:
  - javascript
  - testing
banner: ./images/banner.jpg
bannerCredit:
  "Photo by [Charles Deluvio
  \U0001F1F5\U0001F1ED\U0001F1E8\U0001F1E6](https://unsplash.com/photos/pOUA8Xay514)
  on [Unsplash](https://unsplash.com)"
---

> _The more your tests resemble the way your software is used, the more
> confidence they can give
> you. — _[_me_](https://twitter.com/kentcdodds/status/977018512689455106)

[One of the biggest challenges people face with testing is knowing what to test](https://twitter.com/kentcdodds/status/1048645068616163328).
There are lots of reasons for that, but one big, flashing-lights reason is
mocking. Many people don't know when to add a mock version of code or have their
test run the actual code directly. These are challenges I'll help you work
through in the JavaScript Mocking Fundamentals module of my Testing JavaScript
course.

**Mocking lets you fake it so you _can_ make it.** If you couldn't have a fake
version of certain modules or services, testing the checkout process of an app
would cost you a lot of money in credit card fees. Talk about paying a high
price for confidence! 🤑 So instead, we make a fake version of that credit card
charging service to avoid paying the fees.

But mocking comes with a cost of its own.

**Mocking severs the real-world connection between what you're testing and what
you're mocking.** Even if we have confidence that our code works with our fake
version of the credit card service, we can't have 100% confidence that our code
will work in production with the real version of the credit card service.

**When you mock something, you're making a trade-off.** You're trading
confidence for something else. For me, that something else is usually
practicality — meaning I wouldn't be able to test this thing at all, or it may
be pretty difficult/messy, without mocking. (Like in our credit card example.)

**In my UI unit and integration tests, I have a rule.** I never make actual
network calls; instead, I'll mock the server response by mocking the module
responsible for making the network calls. I'll also mock animation libraries to
avoid waiting for animations before elements are removed from the page. Other
than that, most of my UI tests are using the real production code. For E2E
tests, I avoid mocking anything (with the exception of the backend hitting fake
or test services and not actual credit card services, for example).

**Saving a few milliseconds per test?** That's not a good reason to mock. People
like shallow rendering — component mocking to the max — because it's faster.
That's true, but we're talking milliseconds faster. If it takes a long time to
render your entire component tree, sounds to me like you have a real performance
bug in your software that needs to be addressed. I realize that time adds up
(50ms per test \* 1000 tests = 50 seconds). But the less you mock, the fewer
tests you need, and trading confidence for a minute or two faster test suite is
a bad trade. 😵

**There's a time and a place for mocking.** And when you need to mock, Jest
makes it easy with some really sweet mocking utilities. In
[testingjavascript.com](https://testingjavascript.com) I'll show you how to
implement some of Jest's mocking capabilities in raw node so you can get an idea
of what's going on. It's brilliant. Here's an example of simulating Jest's
inline mock functionality in pure node:

```js
function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = {calls: []}
  return mockFn
}

const utilsPath = require.resolve('../utils')
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
}
```

Now, any code that requires that utils module will get the mock function version
of that module.

It's not quite as capable as Jest's inline mocking abilities, but we'll cover
that in more hands-on detail in the JavaScript Mocking Fundamentals module of
the course!

See you [there](https://testingjavascript.com).

— Kent.

**Things to not miss**:

- [Episode 061 — React with Kent C. Dodds](https://6figuredev.com/podcast/episode-061-react-with-kent-c-dodds)
  on [The 6 Figure Developer podcast](https://6figuredev.com).
