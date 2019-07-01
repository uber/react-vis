---
slug: ui-testing-myths
title: UI Testing Myths
date: '2018-11-08'
author: React Vis
description: _Some common myths around testing and what the reality is..._
keywords:
  - react
  - testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Geran de Klerk](https://unsplash.com/photos/KsMD_tAdjg0) on
  [Unsplash](https://unsplash.com)'
---

### Myth 1: "Tests always break when I make any changes to the code"

This is actually a truth... if the tests are written incorrectly. If your test
is testing implementation details, then of course they'll break when the
implementation changes! But your user doesn't care about the implementation
details. In fact, they don't even care whether you're using React, Angular, or
jQuery. So for the most part, your tests shouldn't care about that either. 💯

Unfortunately, many tools out there encourage testing implementation details. Do
that and you'll often wind up rewriting tests. "Why am I even testing this!?"
you'll ask yourself, and I don't blame you. That's why on
[TestingJavaScript.com](https://testingjavascript.com) I show you how test the
_right_ way.

### Myth 2: "I can't test a 'connected' redux component"

The conventional wisdom of testing components that use Redux is that you should
test the component in isolation from Redux, and then test the Redux action
creators and reducers separately.

But if you do this, your tests can't give you any confidence that your
components communicate properly _with_ Redux.

Instead, you can actually test your connected component with your real Redux
store. Do this, and you'll get the confidence that your component is rendering
properly, _and_ that the Redux action creators and reducers are all working
together in tandem. Just like they will in production. ✅

On [TestingJavaScript.com](https://testingjavascript.com), I show you how to
test in this way. The same concepts apply for React Router 🔀 and other
providers (like the Theme Provider from [emotion](https://emotion.sh) 👩‍🎤), and
the course will show how to apply this method to those, too!

### Myth 3: "End-to-End tests are slow and brittle"

This, too, can be true if the tests are written incorrectly. A common mistake I
see in E2E testing is doing the same things in every test — for instance, every
test going through the whole registration and login flow before doing whatever
is needed for the test. When you do stuff like this, you start seeing a lot of
duplication, and that's when you start creating things like "page objects"
(which is a poor practice). 😐

On [TestingJavaScript.com](https://testingjavascript.com), I show you how you
can get confidence that the registration and login flows are working, and then
skip those for the rest of your tests so you can significantly speed up the
tests and reduce the points of failure. When you write tests this way and use
tools like
[cypress-testing-library](https://github.com/testing-library/cypress-testing-library),
practices like page objects are totally unnecessary, and your tests are easier
to maintain, more reliable, and run faster. You might even find yourself
replacing Chrome with Cypress as your development workflow tool (which I show
you how to do in the course as well!) 😱
