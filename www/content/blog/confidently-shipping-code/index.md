---
slug: confidently-shipping-code
title: Confidently Shipping Code
date: '2018-10-08'
author: Kent C. Dodds
description: _Why I care about testing_
keywords:
  - testing
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Vidar Nordli-Mathisen](https://unsplash.com/photos/xgP0GNl9Gzg) on
  [Unsplash](https://unsplash.com)'
---

Have you read the book ["Start With Why"](https://startwithwhy.com/books)? If
you haven't, I recommend it. At least watch
[the TED talk](https://youtu.be/u4ZoJKF_VuA). The premise of the idea is that
"People won't truly buy into a product, service, movement, or idea until they
understand the WHY behind it." This concept hit home with me when I watched that
talk and then read the book a few years ago, and it's shaped the way I
communicate with you in my blog posts, talks, workshops, and courses.

I'd like to share my "why" about testing with you and invite you to consider
what your own "why" might be.

Like many people, at the start of my career I didn't understand automated
software testing. I was introduced to it by my friend
[Joe Eames](https://twitter.com/josepheames), who was then fighting an uphill
battle at the company where we both worked to get people to write tests. I was
an intern at the time, and he took me under his wing a few times to teach me
about automated testing. I thought it was pretty neat, but he moved on to
another job before I really got testing ingrained in my workflow.

Later, when I started writing my first JavaScript library
([geniejs](https://github.com/kentcdodds/genie)), I realized quickly that
spending time to manually verify that everything's working, every single time I
fixed a bug or added a new feature, was pretty annoying. I decided to learn to
test and write tests for my library.
([The tests](https://github.com/kentcdodds/genie/blob/166572f9fa82e6ec0893f90c7d6a99a49632dace/src/__tests__/index.js)
have been through a few testing framework refactorings, but they're still
largely the same as when I originally wrote them all those years ago). Investing
time into testing my library ended up saving me a TON of time, and I was able to
integrate testing into my workflow.

I remember when I was actively working on angular-formly, I had a coworker who
needed a new feature. It was a simple feature, so he sat by me and watched as I
wrote the test, implemented the feature, and pushed the commit to trigger a
release. He was shocked that I could rely on the tests so much that I was
confident I didn't break anything. That was when it really occurred to me that
testing had become more than a default workflow for saving time. It was a
mechanism for giving me confidence.

At the time of this writing,
[I have 111 packages published on npm](https://www.npmjs.com/~kentcdodds).
Pretty much every one of those packages has 100% code coverage, meaning every
line is run in the tests. I don't think I could possibly maintain them any other
way. **My libraries have received contributions from thousands of people.** When
someone opens a pull request with changes to one of my libraries, I have a
continuous integration service ([TravisCI](https://travis-ci.org)) that kicks
off to run all the tests. Sometimes it's been months or even years since I've
touched the code. Past Kent, who had just barely written the code, probably knew
instantly whether something broke. Present Kent? He usually has no idea, and it
would take me a lot of time to evaluate. Having the tests in place is like Past
Kent telling Present Kent: "It's ok. This is very unlikely to break anything."
The tests save me time, and they give me — and all the users of my libraries — a
great amount of peace of mind.

**So why do I write tests?** I write tests because they allow me to accomplish
more than I could otherwise. I now have thousands of Kents in the form of
automated tests telling me whether changes are breaking use cases. With that
venerable army of robots, I'm able to rest easy and get more accomplished.

**Now, I want to ask you a question:** Why do you want to learn testing? Is it
to further your career? Did a specific incident (i.e. a bug — yup, we've all
been there) happen that prompted a need? Do you (like me) simply want to get
more done, with more peace of mind?

**Now my next question:** What has been holding you back from starting?

### Conclusion

Whether you're already testing, or you're interested in getting started, I've
got something coming that I think you'll love. Especially if you've struggled to
know what to test. I've been working hard putting together **the most
comprehensive work of my life**, and I think it'll knock your socks off. Stay
tuned.

**Things to not miss**:

- [TestingJavaScript.com ](https://testingjavascript.com)— I'm about to release
  a HUGE series of courses that you'll definitely want to checkout. Early bird
  pricing starts on October 19th.
- [Professional React Training from Ryan Florence](https://reach.tech/workshops?a=kent) — I
  strongly recommend you look. [Ryan's](https://twitter.com/ryanflorence) doing
  a tour to 12 cities in the US!!
- [DevTips with Kent](http://kcd.im/devtips) — I'm still doing (week)daily
  livestreams that hundreds of people watch :) Don't miss it!
