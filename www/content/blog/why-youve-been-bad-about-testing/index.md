---
slug: why-youve-been-bad-about-testing
title: Why you've been bad about testing
date: '2018-10-15'
author: Kent C. Dodds
description: >-
  _Some common struggles people have with testing, and things you can do to
  improve._
keywords:
  - testing
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Jonny Caspari](https://unsplash.com/photos/DVzt7cvRKRo) on
  [Unsplash](https://unsplash.com/search/photos/struggle)'
---

The argument is long ended: **You should be testing your mission-critical
code.**

Everyone accepts that testing _code_ now is better than waiting for users to
complain _later_.

Everyone agrees that the testing should be automated.

Pretty much everyone's had a situation where tests saved them from a production
bug...or would have saved them if tests had been in place.

But there's still a struggle.
[The other day I asked on twitter](https://twitter.com/kentcdodds/status/1048645068616163328)
what you all struggle with around testing. The struggle comes when you're trying
to determine what to test, how much time you have to test, what granularity to
test, what to mock and what to keep real, or just the daunting task of setting
up good testing tools and testing environments. Or the frustration might creep
in when you find yourself writing the same code in two places. 🤪

Another big source of frustration with testing — stop us if you've heard this
one before — is when you have to basically rewrite your tests every time you
touch the code it's testing. Once you pick your head up off your keyboard, you
have to ask yourself: "Ok... so why are we testing again? This is just adding
friction to shipping code." It's extremely frustrating when you refactor a
component and your test breaks. 😡 I wouldn't want to write tests either.

When I got started with testing years ago, I struggled. I struggled hard. I've
spent countless hours learning, building, and rebuilding tools. I even gave a
_full hour_ talk called
["ES6, Webpack, Karma, and Code Coverage"](/talks/#es6-webpack-karma-and-code-coverage).
It took a full 60 minutes to explain how to make these tools play nicely
together. It took dozens more hours behind the scenes to figure out what I
explain in that talk.

But I was committed to figuring out and helping build the best way to do this. I
needed it, and I know my fellow developers need it too.

Struggle and frustration don't have to be your experience. You don't have to
spend dozens of hours to figure out how to get testing set up in your codebase.
**I've already done that for you.** And the tools have improved, and I can show
you how to use them. There are techniques I can teach you that will alleviate
the pain and struggle you're having with getting the confidence you're looking
for out of your testbase.

**Here's a tip** for you to take the next time you test your code that'll help
you answer the question of "what do I test?" Follow this process:

1.  What part of your untested codebase would be really bad if it broke? (The
    checkout process)
2.  Try to narrow it down to a unit or a few units of code (When clicking the
    "checkout" button a request with the cart items is sent to /checkout)
3.  Look at that code and consider who the "users" are (The developer rendering
    the checkout form, the end user clicking on the button)
4.  Write down a list of instructions for that user to manually test that code
    to make sure it's not broken. (render the form with some fake data in the
    cart, click the checkout button, ensure the mocked /checkout API was called
    with the right data, respond with a fake successful response, make sure the
    success message is displayed).
5.  Turn that list of instructions into an automated test.

With the tools and techniques I'm going to show you, this process will become a
natural habit. 💯

Stop the struggle. Follow me.

P.S. Stay tuned, because over the next couple weeks I'll share more strategy and
tactics for getting your testing skills up to date.

**Things to not miss**:

- [TestingJavaScript.com](https://testingjavascript.com) — This is the huge
  thing that I wont stop talking about 😉
- [`react-suspense-starter`](https://github.com/palmerhq/react-suspense-starter):
  If you haven't had a chance to checkout suspense yet and play around with it,
  check this out :)
- [DevTipsWithKent](http://kcd.im/devtips) — If you haven't watched any of these
  yet, I recommend you give them a look. I'm going to be doing some scheduled
  livestreams soon that you'll want to catch live for sure!
