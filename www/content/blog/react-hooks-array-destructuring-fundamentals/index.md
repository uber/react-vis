---
slug: react-hooks-array-destructuring-fundamentals
title: 'React Hooks: Array Destructuring Fundamentals'
date: '2018-12-31'
author: Kent C. Dodds
description: >-
  _React’s upcoming useState hook relies on array destructuring, let’s dive in
  and see how that feature works._
keywords:
  - javascript
  - react
  - babel
  - Destructuring
  - react hooks
banner: ./images/banner.png
bannerCredit:
  I made this all by myself... Well... Except for [the react
  logo](https://arcweb.co/is-react-native-a-viable-framework-for-financial-applications/react-logo-1000-transparent)...
  [And the font... and the theme.](https://kcd.im/mft)
---

This is the first example on the https://reactjs.org/hooks documentation:

```javascript
import {useState} from 'react'

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

That `const [count, setCount] = useState(0);` is the line we're going to be
talking about today. The syntax here is called "array destructuring" and it was
introduced into JavaScript in the infamous
([more than famous](https://youtu.be/0b6_i_eSgR8))
[ES6 release](https://github.com/lukehoban/es6features).

I'm a firm believer that:

> [The better you understand an abstraction, the more effective you will be at using it.](https://twitter.com/kentcdodds/status/1074724545003581440)
> – me, literally right when I wrote this...

So when I see syntax that I'm unfamiliar with, I like to read about it and
understand how it works with the rest of the language. The problem is that it
can be difficult to "Google" syntax. Seriously... Try Googling the syntax itself
as if you didn't know that it's called "destructuring." Pretty tough! So here's
my trick. I go to [astexplorer.net](https://astexplorer.net) and paste in
[the code](https://astexplorer.net/#/gist/c6480f8f68861065fd0f91871540a21f/1dfec03fcab33fb1c4b63e9821c4fc69bcf15973)
that I don't understand:

![ASTExplorer.net with the code showing ArrayPattern](https://i.imgur.com/oZGLSfr.png)

Cool! Babel calls that an "ArrayPattern." So let's go ahead and Google for that.
We'll search for "site:https://developer.mozilla.org array pattern" (that way
Google only returns results for articles on MDN which is a terrific resource on
learning everything there is to know about JavaScript).

Sweet, the first result takes us to
["Destructuring assignment"](https://mdn.io/destructuring) where we can learn
all about this feature (I guess you can read that instead of continuing here if
you want to 😅).

Often syntax like this is what we call "syntactic sugar" for other features.
Here's what wikipedia says about
[syntactic sugar](https://en.wikipedia.org/wiki/Syntactic_sugar):

> In
> [computer science](https://en.wikipedia.org/wiki/Computer_science 'Computer science'),
> **syntactic sugar** is syntax within a
> [programming language](https://en.wikipedia.org/wiki/Programming_language 'Programming language')
> that is designed to make things easier to read or to express. It makes the
> language "sweeter" for human use: things can be expressed more clearly, more
> concisely, or in an alternative style that some may prefer.

Ok, so basically it means that there are common patterns or ways to write code
in a given language, so the language makes a syntax feature to make that pattern
require less code or more expressive. With this in mind, when I'm learning new
syntax, I like to "de-sugar" the syntax to see what it would look like if we
didn't have that feature.

Luckily for us, we have Babel and TypeScript which can compile this newer syntax
into something older browsers can support (and presumably to something we may be
more familiar with). So my next step is to go to
[the online babel REPL](https://babeljs.io/repl) and paste in the code. Here's
what the result looks like:

```javascript
'use strict'

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = []
    var _n = true
    var _d = false
    var _e = undefined
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value)
        if (i && _arr.length === i) break
      }
    } catch (err) {
      _d = true
      _e = err
    } finally {
      try {
        if (!_n && _i['return']) _i['return']()
      } finally {
        if (_d) throw _e
      }
    }
    return _arr
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i)
    } else {
      throw new TypeError(
        'Invalid attempt to destructure non-iterable instance',
      )
    }
  }
})()

// const [count, setCount] = useState(0);
var _useState = useState(0),
  _useState2 = _slicedToArray(_useState, 2),
  count = _useState2[0],
  setCount = _useState2[1]
```

😬 YIKES! Hmmm... Ok, so sometimes Babel uses utilities which both make it more
compliant to the specification, but also can make the code a little harder to
understand. Luckily, there's an option on the Babel Repl's "Env Preset" called
"Loose" which will simplify this output considerably:

```javascript
// const [count, setCount] = useState(0);
var _useState = useState(0),
  count = _useState[0],
  setCount = _useState[1]
```

😌 Phew, that's better. Ok, so what's going on here. Babel's taking our one line
and rather than using the Array Pattern thing, it's assigning the return value
of `useState` to a variable called `_useState`. Then it's treating `_useState`
as an array and it assigns `count` to the first item in the array and `setCount`
to the second one.

Let's play around with this a little bit to explore the syntax:

Can I call the values whatever I want?

```javascript
// const [whateverIWant, reallyICanChooseWhatItIsCalled] = useState(0);
var _useState = useState(0),
  whateverIWant = _useState[0],
  reallyICanChooseWhatItIsCalled = _useState[1]
```

Can I add more elements?

```javascript
// const [count, setCount, somethingElse] = useState(0);
var _useState = useState(0),
  count = _useState[0],
  setCount = _useState[1],
  somethingElse = _useState[2]
```

Can I pull out fewer?

```javascript
// const [count] = useState(0);
var _useState = useState(0),
  count = _useState[0]
```

Can I skip one?

```javascript
// const [, setCount] = useState(0);
var _useState = useState(0),
  setCount = _useState[1]
```

Can I skip more?

```javascript
// const [,,, wow,, neat] = useState(0);
var _useState = useState(0),
  wow = _useState[3],
  neat = _useState[5]
```

I saw someone put a weird `=` sign in there, what does that do?

```javascript
// const [count = 3, setCount] = useState(0);
var _useState = useState(0),
  _useState$ = _useState[0],
  count = _useState$ === undefined ? 3 : _useState$,
  setCount = _useState[1]
```

Oooh, fancy, so if the first element of the array is undefined, then we'll set
`count` to `3` instead. Default values! Sweet.

> Note: most of the things above you would never need to do with `useState`
> because we can always rely on `useState` returning an array of two elements!
> We'll look at that more next.

Ok cool, so this helps us understand what's actually going on. There's nothing
React-specific about this syntax. It's built-into the JavaScript specification,
and React's `useState` hook is leveraging it as a mechanism for an ergonomic API
that allows you to get two values out of a single function call. Neat!

Ok, so what does `useState` actually _do_ then? What is it really returning? It
must be returning an array for us to be doing the array destructuring like this
right? Cool, let's check that out.

One thing that's interesting is that the implementation of `useState` exists
within `react-dom` rather than `react`. I know, that may be confusing because we
import `useState` from the `react` package, but it actually just delegates to
the current renderer (which is `react-dom` in our situation here). In fact,
[`setState` is the same way](https://overreacted.io/how-does-setstate-know-what-to-do)!

Another interesting thing about `useState` is that the implementation in
`react-dom` is just a few lines:

```javascript
function useState(initialState) {
  return useReducer(
    basicStateReducer,
    // useReducer has a special case to support lazy useState initializers
    initialState,
  )
}
```

😱 it's actually just a hook that's using the `useReducer` hook! Ok, but what is
that `basicStateReducer` thing huh?

```javascript
function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action
}
```

Ok, interesting, so `useReducer` is actually
[over 100 lines of code](https://github.com/facebook/react/blob/f1bf281605444b342f4c37718092accbe3f98702/packages/react-reconciler/src/ReactFiberHooks.js#L471),
so let's just look at what `useReducer`
[returns](https://github.com/facebook/react/blob/f1bf281605444b342f4c37718092accbe3f98702/packages/react-reconciler/src/ReactFiberHooks.js#L383):

```javascript
return [newState, dispatch]
```

See! It's an array! So when we call `useState`, it returns a call to
`useReducer` which will return an array of two values. This allows us to do the
array destructuring that we want so instead of writing:

```javascript
const stateAndUpdater = useState(0)
const count = stateAndUpdater[0]
const setCount = stateAndUpdater[1]
```

We can write:

```javascript
const [count, setCount] = useState(0)
```

Nice!

## Conclusion

I hope you found this one helpful! Even if you already are very familiar with
destructing syntax, the process of learning new syntax I show above has been
helpful to me as recently as Friday when I was playing around with TypeScript.
Seeing syntax that I'm not familiar with and learning new things is something
that I'll never get tired of in this industry! And learning the fundamentals
behind these bits of syntax will make you more effective at using them. I should
mention also that there are more things you can do with destructuring and if
you're interested there's
[a section about destructuring in my ES6 workshop](https://youtu.be/t3R3R7UyN2Y&t=1h07m01s&list=PLV5CVI1eNcJgUA2ziIML3-7sMbS7utie5)
that's available completely free on
[my YouTube channel](https://kcd.im/youtube). Good luck!

---

**Learn more about React from me**:

- [The Beginner's Guide to React](https://kcd.im/beginner-react) - Absolute
  fundamentals of React
- [React Hooks and Suspense](https://kcd.im/hooks-and-suspense) - A great primer
  on Hooks and Suspense
- [Simplify React Apps with React Hooks](https://kcd.im/refactor-react) - Let's
  take some real-world class components and refactor them to function components
  with hooks.
- [Advanced React Component Patterns](https://kcd.im/advanced-react) - Amazing
  patterns to make your components more reusable, flexible, and simple all at
  once. (Also on
  [Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns)).
- [My YouTube channel](https://kcd.im/youtube) is also full of content about
  [React](https://youtube.com/user/kentdoddsfamily/search?query=react) that
  you'd probably enjoy (including
  [workshops, talks](https://youtube.com/playlist?list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf),
  and [livestreams](https://kcd.im/devtips)).

**Things to not miss**:

- [DevHub](https://devhubapp.com) - TweetDeck for GitHub by
  [Bruno Lemos](https://twitter.com/brunolemos). The project itself is
  [open source](https://github.com/devhubapp/devhub) and pretty impressive. It's
  ["a production app using React Hooks, React Native Web with a 95%+ code sharing between web and mobile, CRA, TypeScript, Yarn Workspaces and Redux"](https://twitter.com/brunolemos/status/1072871009651384320)
- [Modern Javascript by Example](https://www.modernjsbyexample.net) - A free
  (donations welcome) open source book by
  [Ben Junya](https://twitter.com/MrBenJ5)
- [What I Use: Kent C. Dodds](https://www.byteconf.com/blog/what-i-use-kent-c-dodds) -
  [Byteconf](https://twitter.com/byteconf) is starting something new by talking
  to their favorite folks in the software dev world to find out how they do
  their best work. I was the first one!
