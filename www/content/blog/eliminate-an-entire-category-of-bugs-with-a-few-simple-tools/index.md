---
slug: eliminate-an-entire-category-of-bugs-with-a-few-simple-tools
title: Eliminate an entire category of bugs with a few simple tools
date: '2018-10-18'
author: Kent C. Dodds
description: >-
  _How you can use a few simple static code analysis tools to avoid common
  programming bugs._
keywords:
  - javascript
  - testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Matt Artz](https://unsplash.com/photos/4mAcustUNPs) on
  [Unsplash](https://unsplash.com/search/photos/tools)'
---

You've probably heard of ESLint, Prettier, and Flow/TypeScript. These are static
code analysis tools that are wildly popular in the JavaScript ecosystem. I
consider them all testing tools. Let's take a look at each:

### [ESLint](https://eslint.org)

ESLint is the pluggable linting utility for JavaScript. Linting is the process
of analyzing code for potential errors without actually running the code.
Consider this code:

```js
if (!'serviceWorker' in navigator) {
  // the user's using an old browser :-(
}
```

Do you spot the problem? If you do, that's great! But don't you think it'd be
cool to not have to use your brain power to find and correct subtle bugs like
this one? I do! Make a computer do as much of my work for me as possible, please
and thank you. That's what ESLint does for you.

### [Prettier](https://prettier.io)

Prettier is the JavaScript code formatter. It'll take your code however you
write it, and reformat it in a way that's consistent and legible every time.
People often give me quizzical looks when I refer to Prettier as a testing tool.
But check this out:

<!-- prettier-ignore -->
```js
const a = false
const b = false
const c = true
const d = a && b || c
```

What's the value of `d` here? Do you know the order of operations of those
operators by heart? If you do, great! But do you trust that all the engineers on
your team know them well enough to not introduce a bug when refactoring this?

Run that code through Prettier, and this is what you get:

```js
const a = false
const b = false
const c = true
const d = (a && b) || c
```

Even if you do know the order of operations, the extra parentheses — which
Prettier automatically adds when you save the file — are quite helpful. And if
you realize that's not what you wanted, then you can add the parentheses
yourself and Prettier will leave it that way (`const d = a && (b || c)`).

This is one example of things Prettier does to make the intent of your code more
obvious — freeing your brain to focus on harder problems.

### [Flow](https://flow.org)/[TypeScript](https://www.typescriptlang.org)

These are static type checkers for JavaScript. A static type checker adds syntax
to JavaScript to allow you to specify what data type a variable is. It can
follow that variable through the code to make sure it's being used properly. (No
more `x is not a function`.)

Can you spot the bug in this code?

```js
function getFullName(user) {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join('')
}

getFullName({first: 'Joe', middle: 'Bud', last: 'Matthews'})
```

Maybe you can, maybe you can't. Maybe your coworkers can, maybe they can't. In
any case, wouldn't it be cool if we had some software that could spot the issue
for us? If we run that code with Flow, here's what we get:

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ flow-example.js:8:13

Cannot call getFullName with object literal bound to user because
property name is missing in object literal [1].

      5│   return [first, middle, last].filter(Boolean).join('')
      6│ }
      7│
 [1]  8│ getFullName({first: 'Joe', middle: 'Bud', last: 'Matthews'})
      9│
     10│
```

So without changing our code at all, we get notified something's wrong. Nice!
Now, what if we add type annotations?

```js
// @flow

type User = {
  name: {
    first: string,
    middle: string,
    last: string,
  },
}
function getFullName(user: User): string {
  const {
    name: {first, middle, last},
  } = user
  return [first, middle, last].filter(Boolean).join('')
}

getFullName({first: 'Joe', middle: 'Bud', last: 'Matthews'})
```

Now if we run Flow on this, the error is even more helpful:

```
Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ flow-example.js:15:13

Cannot call getFullName with object literal bound to user because
property name is missing in object literal [1] but exists in
User [2].

 [2] 10│ function getFullName(user: User): string {
     11│   const {name: {first, middle, last}} = user
     12│   return [first, middle, last].filter(Boolean).join('')
     13│ }
     14│
 [1] 15│ getFullName({first: 'Joe', middle: 'Bud', last: 'Matthews'})
     16│
     17|
```

I like to consider type definitions with Flow or TypeScript to be a form of
inline automated tests. I strongly recommend you give it a shot if you haven't
yet. Incremental adoption is possible with these tools (especially if you're
already using babel, you can just start using `babel-preset-{flow,typescript}`).
Try it out on your next feature and see what you think.

### Conclusion

Static code analysis is a great way to get a significant boost of
confidence — fast, easily, and with less effort than writing unit tests for the
entire codebase. That's why it forms the base of
[the Testing Trophy 🏆](https://twitter.com/kentcdodds/status/960723172591992832).
If you're not using these tools already, start now.

Oh, and that big thing I'm working on that I've been teasing you about? I've got
a bunch of stuff in there showing how to set up these tools. Look forward to it
😉

Subscribe [here](http://kcd.im/news):

**Things to not miss**:

- [React... Suspense... (@ SLC frontend meetup)](https://youtu.be/7LmrS2sdMlo&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — Livestream
  of my talk at
  [https://www.meetup.com/SLC-FE-DEV/eve...](https://www.meetup.com/SLC-FE-DEV/events/254256621).
  In this talk I build my own simple-cache-provider to teach you how React
  Suspense works with the cache and resources (promise throwers).
- [Last call for Create React App v2](https://github.com/facebook/create-react-app/issues/5103) +
  [Using and writing custom babel macros with create-react-app v2](https://youtu.be/1ERAJG9ILhk&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
  (which is a [DevTipsWithKent livestream](http://kcd.im/devtips))
- [Validation with HTMLInputElements](https://youtu.be/kN7-EBjSilU&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u) — A
  [DevTipsWithKent](http://kcd.im/devtips) livestream where I show you a sweet
  validation feature that's built-into browsers since IE10!
