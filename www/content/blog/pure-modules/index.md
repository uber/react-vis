---
slug: pure-modules
title: Pure Modules
date: '2018-04-30'
author: React Vis
description: >-
  _How you write your ES Modules impacts the performance and maintainability of
  your code._
keywords:
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Mohan Murugesan](https://unsplash.com/photos/aPUi7w4kKbI) on
  [Unsplash](https://unsplash.com/search/photos/pure)'
---

A few weeks ago, I saw
[this tweet](https://twitter.com/RReverser/status/984854567706877952) from
[Ingvar Stepanyan](https://twitter.com/RReverser):

https://twitter.com/RReverser/status/984854567706877952

Followed by [this one](https://twitter.com/RReverser/status/984854857050882049):

https://twitter.com/RReverser/status/984854857050882049

These tweets resonated with me because it really would make a huge difference
for JavaScript engines and the performance of ES Modules. It really was a missed
opportunity. There's not much we can do about it at this point (though you could
simulate this with dynamic imports, but then you'd have other issues).

This made me think of something else that I feel is important and I'd like to
share with you. I
[quote tweeted Ingvar's tweet](https://twitter.com/react-vis/status/985192759165251584):

https://twitter.com/react-vis/status/985192759165251584

Ingvar
[expanded on what I mean](https://twitter.com/RReverser/status/985286856681054208)
(unknowingly I'm sure) in another thread:

https://twitter.com/RReverser/status/985286856681054208

### Why pure modules?

Let's explore why this is a good idea. Consider the following scenario:

```js
// a.js
import './b'
console.log('ready')

// b.js
import {serverData} from './c'

if (!serverData.user) {
  // redirect to login
  location.assign('/login')
}

// c.js
const el = document.getElementById('server-data')
const json = el.textContent
export const serverData = JSON.parse(json)
```

The `c.js` module would need the `index.html` to have been rendered with
something like:

```html
<script type="application/json" id="server-data">
  {"user": null}
</script>
```

I expect this code would work in production as expected. There are a few
problems I have with code like this (or in general any impure modules). Before
we move on it's important to realize that before the `console.log('ready')` line
is run, all the code in `b.js`and `c.js` has been run first.

### Unknown consequences 😮

When a developer imports the `a.js` module, it has no way of knowing what the
consequences will be. If things aren't set up properly, the developer will see a
cryptic message like:

```
Uncaught TypeError: Cannot read property 'textContent' of null
```

and this because they simply imported a module.

### Unnecessary operations 😐

Let's say that `a.js` actually only needs certain utilities that `b.js` exposes,
and doesn't actually need anything from the `c.js` module to be run at all. In
this scenario, those modules are doing extra work that is unneeded. Wasted
effort that in some situations could be a pretty impactful depending on the
circumstances.

What's especially annoying is when the wasted effort results in a cryptic error.
Not only did I have to figure out what the error was all about, but I don't even
need that code to run in the first place!

**As a related (and very important) part of this, you cannot
[treeshake](https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking) that
unused code!**

### Inability to choose the order of operations 😡

What if I realize that `c.js` needs the JSON in the DOM and so I decide I can
initialize that before `c.js` is required like so:

```js
// a.js
const script = document.createElement('script')
script.setAttribute('id', 'server-data')
script.setAttribute('type', 'application/json')
document.body.appendChild(script)

import './b'
console.log('ready')
```

Unfortunately this wont work because (per the ES modules specification) `import`
statements are run before any of the code of the module regardless of where they
appear in the code! Luckily they are at least run in the order they appear. So
to do this I would have to create a new module for my setup code and import that
one first:

```js
import './setup'
import './b'
console.log('ready')
```

### Impact on testing 😵

It's a pretty widely accepted fact that it's easier to test pure functions than
impure functions. The same applies with modules. What if I wanted to test the
`b.js` module? I'd have to initialize the DOM before importing `b.js` so
`c.js`can be initialized properly, but then how do I test it again? I have to do
weird things with the module system to re-import those modules again after
initializing the DOM differently.

> _With jest, you have
> [`jest.resetModules()`](https://facebook.github.io/jest/docs/en/jest-object.html#jestresetmodules)
> which makes this much easier, but it's still not super simple, nor is it
> straightforward for anyone maintaining those tests._

### The Alternative

So here's how I would rewrite things to be pure (in the sense that importing
modules has no side-effects, though the functions they expose are not pure
themselves):

```javascript
// a.js
import {init} from './b'
init()
console.log('ready')

// b.js
import {serverData, init as initC} from './c'

export function init() {
  initC()
  if (!serverData.user) {
    // redirect to login
    location.assign('/login')
  }
}

// c.js
export const serverData = {}
export function init() {
  const el = document.getElementById('server-data')
  const json = el.textContent
  Object.assign(serverData, JSON.parse(json))
}
```

How does this resolve the above problems?

- **Unknown consequences:** We're importing the init method and calling that
  from both `b.js` and `c.js`, so we may not know exactly what those do without
  looking at the implementation, but we at least know that they're doing
  something. 💯
- **Unnecessary operations:** If `b.js` exported additional utility methods, we
  could import those without running into any surprises. 💡
- **Inability to choose the order of operations:** If we wanted to initialize
  the `server-data` in `a.js` then we'd just do that before calling the `init`
  method from the `b.js` module. ✌️
- **Impact on testing:** We could easily run the `init`function from `b.js` in a
  test as many times, re-initializing the DOM before each test with exactly what
  we need without any trouble or hacks. 🎉

> _Note that the `a.js` module is not pure. At some point one of your modules
> needs to do something to kick everything off. This is the purpose the `a.js`
> module is serving. These modules should normally be very small (and often
> it'll be your `index.js` entry module)._

### Conclusion

Keeping your modules pure means limiting the amount of stuff they're doing at
the root-level of the module. It allows you to completely avoid the issues
mentioned and bring more clarity to your codebase. I hope these examples (while
slightly contrived) have been helpful. Good luck!

**Things to not miss**:

- [npm-registry-browser](https://topheman.github.io/npm-registry-browser):
  [A project to help getting into making React apps](http://dev.topheman.com/project-to-help-getting-into-making-react-apps)
  by [@topheman](https://twitter.com/topheman). Pretty nifty idea!
- [advanced-react-patterns-v2](https://github.com/uber/react-vis/advanced-react-patterns-v2):
  This is the content for my Advanced React Patterns workshop. It's pretty
  self-directed with comments in the code to tell you what to do to learn the
  patterns.
