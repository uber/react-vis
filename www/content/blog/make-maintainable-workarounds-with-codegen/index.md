---
slug: make-maintainable-workarounds-with-codegen
title: "Make maintainable workarounds with codegen \U0001F4A5"
date: '2017-10-09'
author: Kent C. Dodds
description: >-
  _Sometimes you need to workaround issues in other libraries. These workarounds
  can often lead to messy code. codegen is a tool that helps..._
keywords:
  - javascript
  - babel
  - Code
  - Macros
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Alexandre Godreau](https://unsplash.com/photos/4NwJVVrsULk) on
  [Unsplash](https://unsplash.com)'
---

This last week [Andrew Blick](https://github.com/blicksky) filed
[an issue on](https://github.com/paypal/glamorous/issues/334)
[`glamorous`](https://github.com/paypal/glamorous/issues/334) indicating that
the UMD build of `glamorous` doesn't work with React 16. The problem is that
`glamorous` does a lazy-require for the
[`prop-types`](https://www.npmjs.com/package/prop-types) module and apparently
when building the UMD bundle,
[rollup can't handle the CommonJS require](https://github.com/rollup/rollup/issues/1646)
and make the UMD pass it in from the `global` object.

You can see this problem
[in the](https://unpkg.com/glamorous@4.9.5/dist/glamorous.umd.js)
[`glamorous@4.9.5`](https://unpkg.com/glamorous@4.9.5/dist/glamorous.umd.js)
[UMD file](https://unpkg.com/glamorous@4.9.5/dist/glamorous.umd.js). The fact
that `PropTypes` isn't included at the top with `global.Glamor` and
`global.React` is an indication of the issue. If you look further down, you'll
also see: `PropTypes = require('prop-types')`and it's that `require` statement
which is the problem. It's not transpiled due to the aforementioned issue.

This is the part where we get frustrated at our tools and their authors right?

![a bird saying nope](./images/0.gif)

Definitely not! What we do is we
[file an issue with a reproduction](https://gist.github.com/Rich-Harris/88c5fc2ac6dc941b22e7996af05d70ff)
and suggest a solution! Then we implement the solution when the maintainer says
they're good with the solution! Woo!

![The big bird saying yep](./images/1.gif)

In my case, I had no idea where to start and I don't have time to look into it
any further (I did, just have my fourth kid less than two weeks ago afterall).
So I filed
[the issue with the reproduction](https://github.com/rollup/rollup/issues/1646)
in part to verify that the issue was Rollup. Then I started thinking about a
good workaround.

Here's where codegen comes in.
[`babel-plugin-codegen`](https://github.com/kentcdodds/babel-plugin-codegen) is
a babel plugin I wrote inspired by my other plugin
[`babel-plugin-preval`](https://github.com/kentcdodds/babel-plugin-preval). Both
of these ship with a [babel-macro](https://github.com/kentcdodds/babel-macros)
and they each have a companion package to make using that easier.

So I installed [`codegen.macro`](https://www.npmjs.com/package/codegen.macro)
and changed from a simple `PropTypes = require('prop-types')` to this:

```js
PropTypes = codegen`  
  if (process.env.BUILD_FORMAT === 'umd') {  
    module.exports = "(typeof window !== 'undefined' ? window : global).PropTypes"  
  } else {  
    module.exports = "require('prop-types')"  
  }  
`
```

What `codegen` does is it will take the string of code you provide and run it
like a regular module, then it takes the string of code that you export and will
replace itself with that string of code. Because this happens at build-time,
it's a great way to do these kinds of optimizations.

Note, generally it's advisable to avoid putting too much code in a string
because you lose a lot of benefits like syntax highlighting and lintability, so
if it's a fair amount of code in there, you can pull it out into another file
and do:
`` PropTypes = codegen`module.exports = require('./prop-types-workaround')` ``

Anyway, these changes we've made will leave all the other builds as it was
before, but for the UMD build, it'll pull PropTypes from the global.

What I love about this kind of workaround is that because it's using a
`babel-macro`the magic involved is pretty optimized and localized. So it's much
more straightforward than other workarounds would be and literally took less
than 10 minutes.

I hope this is helpful to you! Good luck to you all! 👍

**Things to not miss:**

- [`statty`](https://github.com/vesparny/statty) - a brand new app state
  management library for `React` that'll knock your `redux` socks off.
- [Code Sponsor](https://codesponsor.io) — a new way to help fund open source.
  I've been using it on all of my repos and I'm loving it :)
