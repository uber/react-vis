---
slug: what-is-a-polyfill
title: What is a polyfill
date: '2018-07-30'
author: Kent C. Dodds
description: _The difference between a polyfill and a code transform._
keywords:
  - javascript
  - Polyfill
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Everaldo Coelho](https://unsplash.com/photos/2GW4S08kd-8) on
  [Unsplash](https://unsplash.com/search/photos/bridge)'
---

A few weeks back I found a bug with IE where all the user saw was a blank white
page. If you've been around for a while in the wonderful world of the
client-side SPA, you'll probably know what was wrong without thinking twice.
That's right. It was a JavaScript error before client-side rendering happened.

Considering it the bug only rears its head in Internet Explorer, my first guess
is a problem with polyfills. Yep! That was it!

```
Uncaught TypeError: contacts.includes is not a function
```

But we're transpiling our code with Babel! Doesn't that mean that I can use all
the latest and greatest JavaScript I want without having to worry about whether
the browser supports it? Nope! Let's learn more...

### Polyfills vs Code Transforms

JavaScript is constantly evolving thanks to the efforts of people in and around
[the TC39](https://github.com/tc39). Some of the evolutions rely on new syntax
(like
[arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions))
which allows me to do this:

```js
const addOne = num => num + 1
if (addOne(2) > 2) {
  console.log('Math. Wow!')
}
```

Often, we can use this syntax in our source code so long as we convert it to
syntax that can run in the browser (for example, by using a transpiler such as
[babel](https://babeljs.io):
[example transpiled in the browser with babel-preset-env](http://babeljs.io/repl/#?babili=false&browsers=ie%2010&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBAhgEwQeTAUxgXhmArgWywD4cCYBqGARgCgBLAMxgApEV1mAmAShhJ5gBvGjBihIIADZoAdJJABzZgHIAsnCgALGTADqIAO4BCZdxoBfGkA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=6.26.0&envVersion=1.6.2)).

Some other of these new features rely on new APIs, like
`Array.prototype.includes` which allows me to do this:

```js
const contacts = ['Brooke', 'Becca', 'Nathan', 'Adam', 'Michael']
if (contacts.includes('Rachel')) {
  console.log('You have a Rachel!')
}
```

With these, if you
[run them through babel's env preset](http://babeljs.io/repl/#?babili=false&browsers=ie%2010&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBKZQIbChGBeGBtA5AIQCcQQBrAUxwBoZ8zhhEqaA5RKAC0TCZwEEATRAFseAWQCWwTmQA2OALoAocQDMYACnhIUEAHTiwwGQFd-ZCOpwAlZO1k4AlA5gBvRTDjgIIGWV0yQAHNLAE0QYxhOADcyGEQYGylZAEJHRQBfRSA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&sourceType=module&lineWrap=true&presets=env&prettier=false&targets=&version=6.26.0&envVersion=1.6.2)
the `includes` function is not transpiled because it's not a syntax issue, but a
built-in API one and babel's env preset only includes transforms for syntax
transformations. You _could_
[write your own babel plugin](/talks/#writing-custom-babel-and-eslint-plugins-with-asts)
([like this](https://astexplorer.net/#/gist/538b72e2af148a14d7c0f5824b431cd6/47a57f42697199d6cfa1d4b1027951ef170a980e))
to transform the code, but for _some_ APIs it just wouldn't be practical because
the transformed version would be significantly complex.

A polyfill is code which will make the currently running JavaScript environment
support features which it does not. For example, a (imperfect) polyfill for
`includes` might look something like this
([refer to MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
for a real polyfill):

```js
if (!Array.prototype.includes) {
  Array.prototype.includes = function includes(searchElement) {
    return this.indexOf(searchElement) !== -1
  }
}
```

The `if` statement is there to make this a "gated" polyfill. That means that if
the functionality already exists, the polyfill code will _not_ override the
pre-existing behavior. You may consider this to be desirable, but it's actually
the reason that `includes`is not called `contains` on `String.prototype` (TL;DR:
some versions of mootools implemented `contains` in a gated fashion but the
implementation is different from how `includes` works so the TC39 had to change
the name to not break tons of websites).

The part that assigns `Array.prototype.includes` to a function is called
"monkey-patching" 🐒 By applying this to the prototype, we're adding `includes`
support to all arrays in the app
([learn more about prototypes here](https://github.com/getify/You-Dont-Know-JS/blob/f0d591b6502c080b92e18fc470432af8144db610/this%20%26%20object%20prototypes/ch5.md)).
Effectively, the polyfill's job is to make it so I can use the JavaScript
feature without worrying about whether it's supported by the environment in
which my code is running (like IE 10 for example).

### Where to get transforms and polyfills

With syntax transforms, I recommend
[babel-preset-env](https://babeljs.io/docs/en/next/babel-preset-env.html). It's
actually fairly straightforward. For polyfills, the most popular one is
[`core-js`](https://www.npmjs.com/package/core-js). You might also look at
[`babel-polyfill`](https://babeljs.io/docs/en/next/babel-polyfill.html) which
uses `core-js` and a custom `regenerator runtime` to support generators and
async/await the way that babel transpiles it. Polyfills are sometimes referred
to as "shims" and you may be interested in the
[`js-shims`](https://github.com/airbnb/js-shims) by airbnb (which I've been told
are more spec-complient than `core-js`).

### Conclusion

So what did I do to fix my IE10 bug? Well, one thing that really bugs me is that
I have to ship all this code for polyfills to all browsers even if they _do_
support these features. But a few years ago I heard of
[a service](https://polyfill.io) that was able to ship polyfills that are
relevant only to the browser requesting them. I created my own endpoint that
uses [the module](https://github.com/Financial-Times/polyfill-service) that
powers that service and I'll write about that next week!

I hope this is helpful! Good luck!

P.S. You may have heard of something called a "ponyfill." Ponyfills are similar
to polyfills except they don't monkey-patch, instead they're just the function
by itself and allow you to call them directly.
[Learn more about ponyfills](https://github.com/sindresorhus/ponyfill). In
general, I'm more in favor of ponyfills, though you just can't get away from
polyfills completely because often your dependencies are relying on built-ins
that your browsers don't support.

**Learn more about React from me**:

- [The Beginner's Guide to React](http://kcd.im/beginner-react)
- [Advanced React Component Patterns](http://kcd.im/advanced-react) (also on
  [Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns)).

**Things to not miss**:

- [cypress-capybara](https://github.com/testdouble/cypress-capybara) — If you've
  used [capybara](https://github.com/teamcapybara/capybara) before you'll
  probably love this util from [Justin Searls](https://twitter.com/searls). If
  you like this, then you'll probably love
  [cypress-testing-library](https://github.com/testing-library/cypress-testing-library).
  In any case,
  [don't reuse your CSS selectors as test selectors](/blog/making-your-ui-tests-resilient-to-change)!
- [guppy](https://github.com/joshwcomeau/guppy) — 🐠A friendly application
  manager and task runner for React.js by
  [Josh Comeau](https://twitter.com/joshwcomeau).
- [Themes Support in Codesandbox](https://twitter.com/CompuIves/status/1018871036719325184)
  🤩 — [I set mine to Night Owl and Dank.sh](http://kcd.im/mft) so fast you
  wouldn't believe it. That [Ives van Hoorne](https://twitter.com/CompuIves) has
  gone and done some amazing work again!
