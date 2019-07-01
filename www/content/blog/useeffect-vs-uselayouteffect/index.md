---
slug: useeffect-vs-uselayouteffect
title: useEffect vs useLayoutEffect
date: '2018-11-26'
author: React Vis
description: _The simple rules for when to use each._
keywords:
  - react
  - javascript
  - react hooks
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Mohamed Nohassi](https://unsplash.com/photos/sNYSV3t2w58) on
  [Unsplash](https://unsplash.com/search/photos/special-effects)'
---

Both of these can be used to do basically the same thing, but they have slightly
different use cases. So here are some rules for you to consider when deciding
which [React Hook](https://reactjs.org/hooks) to use.

### [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)

99% of the time this is what you want to use. When hooks are stable and if you
refactor any of your class components to use hooks, you'll likely move any code
from `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` to
`useEffect`.

**The one catch** is that this runs _after_ react renders your component and
ensures that your effect callback does not block browser painting. This differs
from the behavior in class components where `componentDidMount` and
`componentDidUpdate` run synchronously after rendering. It's more performant
this way and most of the time this is what you want.

However, if your effect is mutating the DOM (via a DOM node ref) **_and_** the
DOM mutation will change the appearance of the DOM node between the time that it
is rendered and your effect mutates it, then you **don't** want to use
`useEffect`. You'll want to use `useLayoutEffect`. Otherwise the user could see
a flicker when your DOM mutations take effect. **This is pretty much the only
time you want to avoid `useEffect` and use `useLayoutEffect` instead.**

### [useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)

This runs synchronously immediately after React has performed all DOM mutations.
This can be useful if you need to make DOM measurements (like getting the scroll
position or other styles for an element) and then make DOM mutations **or**
trigger a synchronous re-render by updating state.

As far as scheduling, this works the same way as `componentDidMount` and
`componentDidUpdate`. Your code runs immediately after the DOM has been updated,
but before the browser has had a chance to "paint" those changes (the user
doesn't actually see the updates until after the browser has repainted).

### Summary

- **useLayoutEffect:** If you need to mutate the DOM and/or DO need to perform
  measurements
- **useEffect:** If you don't need to interact with the DOM at all or your DOM
  changes are unobservable (seriously, most of the time you should use this).

### Conclusion

[I am extremely excited about React's upcoming hooks feature](https://youtu.be/0jlTw2XI7I8&t=39s&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u).
I think it's going to make React much easier to learn and use.

**Learn more about React from me**:
[Hooks & Suspense Playlist on egghead.io](http://kcd.im/hooks-and-suspense) — A
free 35 minute list of videos demoing how to use the new React Hooks and
Suspense features. (Note: these features are still pretty alpha and likely to
change).

**Things to not miss**:

- [useHooks.com](https://usehooks.com) — One new React Hook recipe every day.
  Really cool resource by [Gabe Ragland](https://twitter.com/gabe_ragland).
- [fresh-concurrent-react](https://github.com/sw-yx/fresh-concurrent-react) by
  [Shawn Wang](https://twitter.com/swyx) — an as up-to-date-as-possible resource
  about the upcoming features in concurrent react! Really helpful if you want to
  play around with Suspense and Concurrent React.
