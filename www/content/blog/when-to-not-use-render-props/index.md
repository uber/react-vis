---
slug: when-to-not-use-render-props
title: When to NOT use Render Props
date: '2018-03-26'
author: React Vis
description: >-
  _Let's back up from the hype and think critically about the render props
  pattern_
keywords:
  - react
  - javascript
  - render props
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Erwan Hesry](https://unsplash.com/photos/h-ACUrBngrw) on
  [Unsplash](https://unsplash.com)'
---

---

**UPDATE: If you can use react@16.8.0 then the answer is to rarely use render
props and almost always use a custom hook. HOOKS ARE ALMOST ALWAYS THE SUPERIOR
PATTERN.**
[Read about when you might still use render props](/blog/react-hooks-whats-going-to-happen-to-render-props)

---

> _🚨 Announcement: I am now on Patreon! Support these newsletters and other
> things I do!_ [_patreon.com/react-vis_](https://www.patreon.com/react-vis)

With all the [tweets](https://twitter.com/react-vis/status/957388589171539968),
[posts](/blog/answers-to-common-questions-about-render-props), and
[training videos](https://egghead.io/lessons/react-use-render-props-with-react)
I have about the render prop pattern, I get this question a lot: "When should I
not use the render props pattern?"

[Every abstraction comes with a cost](https://twitter.com/react-vis/status/972468078813446149),
even render props. But we use abstractions because we perceive the benefit
outweighs the cost (or because the thought lords told us to and we didn't stop
to think about it... but I digress). So when you're considering implementing a
particular tool, library, or pattern, it's very important to think critically
about the costs and benefits (just like we should
[think critically about how we manage state in our apps](/blog/application-state-management)).
To understand the benefits in this [context](/blog/reacts-new-context-api) (😉),
you have to understand the problems it solves, how it goes about solving those
problems (especially when compared to alternatives), and (most importantly)
**whether you have those problems to begin with**. If you don't have the
problem, then you're incurring the cost of abstraction without reaping the
benefits!

### The problem

So what problem does render props solve? Fundamentally, **render props solves
the problem of react component logic code reuse** and it solves it in a way that
is objectively superior to any other pattern currently. It's objectively
superior because it provides more flexibility than alternatives. It can provide
this flexibility because it is basically free of opinions. It allows you to
bundle up your component logic into the declarative model react provides for us,
and leaves you to be responsible what to do with that information. Normally this
means rendering some specific UI based on some state, but it doesn't have to.
React components don't have to render UI or anything at all. React components
are about much more than just visual UI (consider
[`react-router`](https://reacttraining.com/react-router) as a prime example).
For more on this, watch [Never Write Another HoC](https://youtu.be/BcVAq3YFiuc)
by [Michael Jackson](https://twitter.com/mjackson).

Another problem that render props have solved for me in my codebases is
abstracting away imperative code. I love the example
[Ryan Florence](https://twitter.com/mjackson) gave in his talk almost 2 years
ago at [React Rally](http://www.reactrally.com)called
[`‹Rethinker stop={false}/›`](https://youtu.be/kp-NOggyz54) where he refactored
a bunch of imperative code in a React Component's lifecycle methods to a
separate `<Tone />` component that abstracted away that imperative code and
provided a clean declarative API instead. By doing this, Ryan made the code
easier to understand because the visual UI was separated from the DOM APIs that
were used to create the sound.

> _Note: In Ryan's example he didn't actually use a render prop (he rendered_ >
> `_null_`_), but we can do the same thing he did in that example with our own
> code. Find good examples of components that do this in the_ >
> [_react-fns_](https://github.com/jaredpalmer/react-fns/tree/master/src) >
> _source code (by_ [_Jared Palmer_](https://twitter.com/jaredpalmer) _and_ >
> [_other contributors_](https://github.com/jaredpalmer/react-fns/blob/master/README.md#contributors)_)._

### When to use render props:

So when do I use render props? I use them when I want to reuse component logic
and when I want to abstract away imperative code to provide a easier to
understand declarative API. So I use render props all the time! Not in every
component, but definitely when I find myself in one of those two situations.

### When to use an alternative pattern?

Never. I'm only partially kidding. There are definitely some situations where
another pattern could provide a cleaner interface for regular users. Take
react-redux for example. The `connect` higher order component is pretty
straightforward and wouldn't be made much more simple by turning it into a
render prop component instead. One nice thing about render props is that they
give you dynamic composition, but the `connect` HOC solves that problem by
exposing an API for the parts you'd want to have dynamic anyway (like
`mapStateToProps` and `mapPropsToDispatch`).

That said, I would _still_ use a render prop to _create_ these higher order
components. As I said earlier, render props are objectively superior pattern.
But they're not always the most ergonomic. So while I would expose a `connect`
HOC for integrating with redux like react-redux does, I would implement it using
a render prop
([let me show you how](https://egghead.io/lessons/react-implement-a-higher-order-component-with-render-props))!
This is possible because of the power of the render prop pattern.

In combination with HOCs, the Provider pattern can also be really handy, and can
also be implemented via render props (in fact, that's basically what
[the new context API](/blog/reacts-new-context-api) is all about). Just for fun
one day, I decided to implement a provider and HOC for downshift. It didn't take
me very much time at all before I had
[a working implementation](https://codesandbox.io/s/017n1jqo00)! This example
highlights one of the reasons I prefer render props over other patterns. With
render props you don't need to make and name so many useless components! But
some people really enjoy breaking things out into smaller components, so it's
nice to have something like this for those folks. If the HOCs fall short, people
can always fall back to the regular render prop.

So here's my rule: If I want to reuse component logic or abstract away
imperative code, I always start with a render prop, then if needed I'll use that
component to implement common-case components to make it more usable. Common
case users can use the common-case components, and advanced users can use the
render prop component. Everyone wins!

> _Note: If you want to see more examples of how to implement a higher order
> component using a render prop component, check out every HOC in_ >
> [_react-fns_](https://github.com/jaredpalmer/react-fns/tree/master/src) _which
> do exactly that (like the_ >
> [`withGeoPosition`](https://github.com/jaredpalmer/react-fns/blob/052ea56092c53946c7937e1d32adf78a7d37d6f3/src/GeoPosition/withGeoPosition.tsx) >
> _HOC)!_

I hope that's helpful to you! Good luck!

**Learn more about Render Props from me**:

- [How to give rendering control to users with prop getters](/blog/how-to-give-rendering-control-to-users-with-prop-getters) — My
  blog post from a few months back about a pattern that's complementary to
  render props
- [Testing components using render props](/blog/testing-components-using-render-props) — If
  you want to test component A which uses component B, and component B has a
  render prop API, read this.
- [Answers to common questions about render props](/blog/answers-to-common-questions-about-render-props) — My
  blog post that is what the title says it is...

**Learn about Advanced React Component Patterns from me**:

- [egghead.io online](https://egghead.io/courses/advanced-react-component-patterns)
- [Frontend Masters in Minneapolis (and online) in April](https://frontendmasters.com/workshops/advanced-react-patterns)
- [Workshop.me in Portland in July](https://workshop.me/2018-07-advanced-react?a=kent)
- [Workshop.me in Salt Lake City in August](https://workshop.me/2018-08-advanced-react?a=kent)

**Things to not miss**:

- [KnowJS](http://knowjs.org) — An online training event that I'm taking part in
- [React Dev Summit](https://reactdevsummit.com) — An online (FREE TO WATCH
  LIVE) conference that I'm speaking for.
- [React Round Up](https://devchat.tv/react-round-up) — A new React Podcast I'm
  a panelist on!
- [Carbon](https://stackedit.io/carbon.now.sh) by
  [Dawn Labs](https://dawnlabs.io) — This is how I created the fancy code
  screenshot in the tweet below.
- [regexly](https://regexly.chipto.io) by
  [Chipto Labs](https://chipto.io) — This is an awesome tool for checking
  regexes that shows JavaScript-specific APIs. Definitely my new favorite!
