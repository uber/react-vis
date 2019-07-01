---
slug: the-state-reducer-pattern
title: "The state reducer pattern ⚛️ \U0001F3CE"
date: '2018-02-19'
author: React Vis
description: >-
  _A new pattern has been implemented in downshift and it's awesome. Use the
  state reducer pattern to make your components more useful._
keywords:
  - react
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Daniel Wallace](https://unsplash.com/photos/IliTEyruu7U) on
  [Unsplash](https://unsplash.com/search/photos/waterfall)'
---

> NOTE: I've published
> [an updated version of this blog post with React Hooks](/blog/the-state-reducer-pattern-with-react-hooks)!

This last week, [@notruth](https://github.com/notruth) (new code contributor to
the
[downshift](https://github.com/downshift-js/downshift/blob/master/README.md#contributors)
project), filed an issue:
["closeOnSelection" property (Multiple selection out of box)](https://github.com/downshift-js/downshift/issues/319).
All you really need to know about that issue is that the decisions made about
how downshift updates its state based on user interaction in certain scenarios
didn't agree with what @notruth wants for their implementation. 😖

### Why do we use UI libraries?

With UI libraries like downshift, you can offer two things:

1.  The way it works
2.  The way it looks

UI libraries have to make decisions about these things to be useful at all. But
the fewer decisions you make, the more generically useful and flexible
(lego-block-like) your library can be. However, it's a delicate balance. The
more decisions you make, the more useful you can be for some use cases, but you
run the risk of becoming too opinionated and totally unusable for other use
cases. If you make no decisions at all, then ummm... why am I installing your
library? 🤔

For downshift, I decided to not make any decisions about the way it looks by
[using a render prop](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).
I did this because with "enhanced input components" (like autocomplete), the
part we're trying to abstract away is the way it works, and the part we want to
grant the most flexibility is the way it looks. In addition, with a render prop,
it's trivial for other people to build another component on top of downshift to
provide a good default for the way it looks and publish that (I'm still sorta
surprised nobody's done that yet). 🤨

### Imperfect assumptions

That said, sometimes, the decisions I made about the way downshift works don't
quite satisfy all the use cases people are looking to use downshift for. For
example, downshift will set the `isOpen` state of the menu to `false` when the
user selects an item and in the issue @notruth posted, they are saying that
decision doesn't fit their use case. 🤷‍♂️

This is one reason why downshift supports
[control props](https://github.com/downshift-js/downshift#control-props). It
allows you to have complete control over the internal state of downshift. In
this case, @notruth could have controlled the `isOpen` state and use the
`onStateChange` to know when to update their version of that state. However,
that's a fair amount of work, so it's understandable why @notruth would prefer
an easier method. But the suggestion of adding a new prop for that didn't seem
to provide the benefit to offset the cost of increasing the API surface area of
downshift. So giving it a little more thought gave me an idea of how we could
simplify this and reduce boilerplate further. 😈

### A simpler API

That's when I came up with
[a new prop I initially called](https://github.com/downshift-js/downshift/issues/319#issuecomment-361640218)
[`modifyStateChange`](https://github.com/downshift-js/downshift/issues/319#issuecomment-361640218).
Because downshift already supports control props, it isolates state changes to
an internal method called
[`internalSetState`](https://github.com/downshift-js/downshift/blob/118a87234a9331e716142acfb95eb411cc4f8015/src/downshift.js#L302-L410).
It's a surprisingly long method (mostly because it's highly commented). This
isolation made the implementation of this new feature trivial. Any time we make
state changes, we first call a method to see if the user of downshift is
interested in making any changes to the state change that's about to take place.
🤓

An important element to this as well is the ability for the user to determine
what kind of state change is taking place. In the case of @notruth, they only
want to prevent `isOpen` from changing to `false` if the user selects
(keydown/click) on an item. So they need to know what type of change is about to
happen. Luckily, we needed this distinction for `onStateChange` as well and
already had this mechanism in place! It's called
[`stateChangeTypes`](https://github.com/downshift-js/downshift#statechangetypes)
([here's the current list](https://github.com/downshift-js/downshift/blob/118a87234a9331e716142acfb95eb411cc4f8015/src/downshift.js#L103-L119)).
🤖

So, @notruth opened
[the pull request](https://github.com/downshift-js/downshift/pull/320) to add
the `modifyStateChange`. After considering it a little further, I decided that
this could be generalized into a pattern that could be really useful for other
libraries. Patterns are much easier to evangelize when they have a name, so
[I looked for one](https://twitter.com/react-vis/status/958707800292470784). 🕵️

### Introducing the state reducer pattern

I eventually settled on the name **"state reducer"** and changed the API
slightly to resemble a reducer function. Your function gets two arguments: 1)
the current state of downshift, 2) the upcoming changes. Your job is to "reduce"
that to the changes you want to take place. Also, the upcoming changes have a
`type` that correspond to the `stateChangeTypes`so you know whether you want
your logic to apply. You might think of the `changes` as an "action" in redux
(it has a `type`), but what you return isn't the whole state (like you would in
redux), just the changes you want made to the state. 🔁

_A few people have since let me know that_
[`reason-react`](https://github.com/reasonml/reason-react) _has something
similar to this called simply "reducer" which is validating because I think
Reason is pretty neat. 💡_

So, without further ado,
[here is a very simple "state reducer" implementation with downshift](https://codesandbox.io/s/zy92xrwr3)
that prevents the menu from closing after the user selects an item. Here's the
`stateReducer` prop:

```js
import Downshift from 'downshift'

function stateReducer(state, changes) {
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex,
      }
    default:
      return changes
  }
}
```

This is a fairly loose API, but because all the state in downshift is
controllable anyway (via control props) this doesn't actually allow you to do
anything you weren't already able to accomplish yourself, it just reduces (no
pun intended 😆) the boilerplate and wiring that are necessary to tweak "the way
it works" with regard to downshift and its state. 👌

The implementation in downshift is probably not altogether straightforward I'm
afraid (downshift is not a simple component). Which is why I've created this
simplified example implementation for
[a toggle component](https://egghead.io/lessons/react-build-a-toggle-component):
[https://codesandbox.io/s/4qo58nvl3x](https://codesandbox.io/s/4qo58nvl3x?module=%2Fafter.js&moduleview=1).
Note that it's a little bit overkill for a toggle component, but hopefully it
gets the point across of one way you could implement this pattern. 🤝

### Conclusion

I'm really excited by this new pattern that I see sits in the sweet spot between
an uncontrolled and an controlled component. I think it'll do a better job
allowing our libraries to satisfy more use cases for "the way it works" without
all the boilerplate and wiring up required by users of
[the Control Props pattern](https://egghead.io/lessons/react-make-controlled-react-components-with-control-props).
(And yes, I'll eventually be updating
[my egghead.io course](http://kcd.im/advanced-react) to include a lesson on the
reducer pattern). Good luck! 👍

**Things to not miss**

[**jamiebuilds/unstated**](https://github.com/jamiebuilds/unstated)

A new library from [James Kyle](https://twitter.com/thejameskyle) that I'm
pretty sure is my new favorite thing in state management. I'd suggest giving it
a look. I think we should probably reach for this _way_ before we reach for
Redux!

This is a talk I gave at
[ReactJS Utah](https://www.meetup.com/ReactJS-Utah/events/246683120) a few weeks
ago. If you're curious what
[`babel-plugin-macros`](https://github.com/react-vis/babel-plugin-macros) is all
about and why it's so cool it's
[built-into create-react-app](https://github.com/facebook/create-react-app/pull/3675),
then give this a watch!
