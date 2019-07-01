---
slug: the-beginners-guide-to-reactjs
title: The Beginner's Guide to ReactJS
date: '2017-12-18'
author: React Vis
description: >-
  _The course is free forever on egghead.io! Let's talk about how it teaches
  even developers experienced with React ⚛️_
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Mathias Jensen](https://unsplash.com/photos/5x4U6InVXpc) on
  [Unsplash](https://unsplash.com)'
---

Yesterday my two new ReactJS courses were published on
[egghead.io](http://egghead.io).
[Read more about them here](/blog/learn-react-fundamentals-and-advanced-patterns).
I had high hopes for this release, but the response has been way more positive
than I had expected. The announcement post got in
[Medium's top 20 posts yesterday](https://medium.com/browse/top/december-04-2017)
and my courses have had over 250 hours watched already! If you haven't seen them
yet, give them a look! If you have, I hope you loved them!

![I just wanted to say, Thanks, partner](./images/0.gif)

Two weeks ago, my newsletter was an overview of the
[Advanced React Component Patterns course](https://egghead.io/courses/advanced-react-component-patterns)
([that's been published today](/blog/advanced-react-component-patterns)!) This
week I'd like to talk a little bit about the other course that was published:
[The Beginner's Guide to ReactJS](https://egghead.io/courses/the-beginner-s-guide-to-reactjs).

In the beginner's course every lesson is an individual `index.html` file. No
more than that. The reason is I wanted to keep things as simple and isolated as
possible. There's absolutely no tooling necessary. Nothing to get in the way of
your learning.

In addition, the course starts out with a totally blank slate. The first lesson
builds out the `index.html` from scratch. But the first thing I do isn't include
React at all. Instead I build a "Hello World" by using `document.createElement`.
I slowly introduce React APIs as we go through the course.

When I really started to "get" React is when I realized that everything is "just
JavaScript." Just objects and functions. So I try to get people to that point as
soon as possible. Right from the beginning I `console.log` what you get back
from `React.createElement` to show that React elements aren't magic. They're
just JavaScript objects.

To take things even further. When I show JSX (seriously, when teaching React to
beginners, please don't _start_ with JSX), I make it really clear that JSX is a
fairly straightforward abstraction on top of `React.createElement`. I spend a
fair amount of time showing tips and tricks of how to use the JSX syntax and how
that converts to regular JavaScript. I even have a lesson about conditionally
rendering an element to drive it in further. All of this is to stress the fact
that React APIs are simple and just JavaScript. When you get this, it changes
the way you think about JSX and React components.

There's a lot more to the course than these ultra-basics. But I think that
nailing these are foundational to a good solid understanding of React. If you
ever teach a total beginner React, make sure that you help them get a solid
understanding that creating React elements is not magic and that JSX is a really
simple abstraction on top of `React.createElement`. Once they get that, then
learning the rest will come much more easily. Then they too can feel like they
can do magic!

![magic](./images/1.gif)

I hope that's helpful (and that
[the free course](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
will be helpful to you as well). Good luck!

**Things to not miss**:

- [Why Funding Open Source is Hard](https://medium.com/@codesponsor/why-funding-open-source-is-hard-652b7055569d) — Alternate
  title: "Why Code Sponsor is shutting down after raising \$10k for OSS
  developers in 4 months").
- [Learn React Fundamentals and Advanced Patterns](/blog/learn-react-fundamentals-and-advanced-patterns) — I'm
  just pretty excited about the course release!
- [egghead.io Sale](https://egghead.io/gifts) — Save 30% on a year subscription!
- [`ReactPrimer`](https://github.com/ReactPrimer/ReactPrimer) - React component
  prototyping tool that generates fully connected class component code.
- [Partial Application & Lambda Parameter Syntax for JavaScript](https://medium.com/@citycide/partial-application-lambda-parameters-for-js-aa16f4d94df4) — Awesome
  use of [`babel-macros`](https://github.com/react-vis/babel-macros)
- [Using Glitch as a UNIX command line playground](https://medium.com/@hugo__df/using-glitch-as-a-unix-command-line-playground-8e5cbdc9a8d5) — Interesting
  idea!
