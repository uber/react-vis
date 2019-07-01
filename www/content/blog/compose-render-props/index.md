---
slug: compose-render-props
title: Compose Render Props
date: '2018-04-09'
author: Kent C. Dodds
description: _One of the reasons I'm so excited about render props_
keywords:
  - javascript
  - react
  - render props
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [rawpixel.com](https://unsplash.com/photos/noorSVMhuPU) on
  [Unsplash](https://unsplash.com)'
---

Today's newsletter will be short as my time's a bit limited, but I wanted to
make sure you don't miss
[this tweet](https://twitter.com/kentcdodds/status/977317314361282560) and the
overarching concept:

https://twitter.com/kentcdodds/status/977317314361282560

The example itself is a little unimpressive from a user experience standpoint
(it's based on someone else's actual use-case and I didn't have a chance to
update it to look pretty). But the underlying code there is what I want to talk
about.

When I created [downshift](https://github.com/downshift-js/downshift), I gave it
the following tagline:

> _🏎 Primitives to build simple, flexible, WAI-ARIA compliant enhanced input
> React components_

The key word here is "Primitives." Initially I expected that people would build
cool autocomplete/dropdown packages on top of downshift and publish those to
npm. I was about to write: "I have been surprised that nobody's done this." But
then [I checked](https://www.npmjs.com/browse/depended/downshift) and it turns
out several libraries _are_ in fact providing an autocomplete solution with
beautiful styling and nice defaults that give a more out-of-the-box feel for
downshift. I only looked briefly, but I especially love the demos from
[mui-downshift](https://techniq.github.io/mui-downshift/?selectedKind=Input&selectedStory=do%20not%20show%20menu%20on%20focus&full=0&down=1&left=1&panelRight=0&downPanel=storybook%2Factions%2Factions-panel)
and
[evergreen-ui](https://segmentio.github.io/evergreen/?selectedKind=autocomplete&selectedStory=Autocomplete&full=0&down=0&left=1&panelRight=0&downPanel=storybook%2Factions%2Factions-panel).
Very cool!

These libraries get the point of the render prop pattern. As I said in the tweet
earlier. The real power of the render prop is in its ability to be used as a
building block for building other components that have useful opinions.
Downshift itself makes opinions about the logic of an enhanced selection input,
and then these libraries jump on top to provide opinions about what that looks
like visually to the user and provide a nice API for adapting those opinions to
your use cases.

My [next tweet](https://twitter.com/kentcdodds/status/977317793992503297) (after
the one lined above) was:

https://twitter.com/kentcdodds/status/977317793992503297

This week I livestreamed myself in the process of doing this for a component I'm
working on. You can
[find the recording here](https://youtu.be/a7OhAQIx3xc&list=PLV5CVI1eNcJh5CTgArGVwANebCrAh2OUE).
This component is a special amount input component that has a currency selection
and the input has some special behaviors (like changing the font size the wider
it gets etc.). The logic behind the component is what I'm trying to share. It
will have three implementations for how it will look. For now, the layout of all
three implementations is:

`{currencyCode}{input}`  
`{currencyCodeSelect}`

Though the layout is the same, the styles are different. Normally I'd account
for those differences with CSS, but I'm confident that in the future it could
have more layouts and styles. So I'm planning on having a few layers of
abstraction to optimize for the flexibility (read: deletability) of the code.
From top to bottom:

- Component that handles styles
- Component that handles layout
- Component that handles logic

Doing things this way gives use a lot of flexibility. At first I'll have one
component at the bottom layer, one component at the layout layer, and three
components at the style layer. In the future, if we need another component that
behaves the same way, but is laid out differently, we can implement a new layout
and style component on top of the logic component and benefit from 90% of the
work that went into this initial implementation.

And _that_ in my mind is the real benefit of this pattern. Making clear
separations of functionality that a component has which enhances the
flexibility, deletability, and usability of this API.

I hope this is helpful! Good luck!

**Learn more about Render Props from me**:

- [How to give rendering control to users with prop getters](/blog/how-to-give-rendering-control-to-users-with-prop-getters) — My
  blog post from a few months back about a pattern that's complementary to
  render props
- [Testing components using render props](/blog/testing-components-using-render-props) — If
  you want to test component A which uses component B, and component B has a
  render prop API, read this.
- [Answers to common questions about render props](/blog/answers-to-common-questions-about-render-props) — My
  blog post that is what the title says it is...
- [egghead.io](https://egghead.io/courses/advanced-react-component-patterns) — My
  Advanced React Component Patterns course.
- [Frontend Masters](https://frontendmasters.com/workshops/advanced-react-patterns) — I'm
  giving my Advanced Component Patterns workshop in person in Minniapolis in
  April!
- [Workshop.me](https://workshop.me/2018-07-advanced-react?a=kent) — I'm giving
  my Advanced Component Patterns workshop in person in Portland in July!

**Things to not miss**:

- [CodeSandbox Live!!!](https://medium.com/@CompuIves/introducing-codesandbox-live-real-time-code-collaboration-in-the-browser-6d508cfc70c9)
- [React Round Up Episode 3](https://devchat.tv/react-round-up/rru-003-advanced-component-patterns-and-downshift-with-kent-c-dodds) — "Advanced
  Component Patterns and Downshift with Kent C. Dodds"
- [Test Talks Episode 195](https://joecolantonio.com/testtalks/195-javascript-testing-using-jest-with-kent-c-dodds) — "JavaScript
  Testing Using Jest with Kent C. Dodds"
