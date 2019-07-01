---
slug: how-to-react
title: How to React ⚛️
date: '2018-04-16'
author: React Vis
description: >-
  _Let's see how learning React ⚛️ in the right order can make it less
  overwhelming._
keywords:
  - react
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Artem Sapegin](https://unsplash.com/photos/7UYzLZB9BM0) on
  [Unsplash](https://unsplash.com)'
---

This last week I gave
[a talk at React Dev Summit called "How to React."](/talks/#how-to-react). It's
basically an updated version of [Pete Hunt's](https://twitter.com/floydophone)
[react-howto](https://github.com/petehunt/react-howto) GitHub repo. I thought
I'd just jot down a few things from this talk for you to enjoy in your inbox
today :)

### Abstraction

Let's start out talking about abstraction. Here's an example of an abstraction
from [youmightnotneedjquery.com](http://youmightnotneedjquery.com):

```js
// $(el).toggleClass(className);

function toggleClass(el, className) {
  if (el.classList) {
    el.classList.toggle(className)
  } else {
    var classes = el.className.split(' ')
    var existingIndex = -1
    for (var i = classes.length; i--; ) {
      if (classes[i] === className) existingIndex = i
    }

    if (existingIndex >= 0) {
      classes.splice(existingIndex, 1)
    } else {
      classes.push(className)
    }

    el.className = classes.join(' ')
  }
}
```

Pretty handy. But here's the kicker... If you don't need to support IE8, then
you can actually change that to:

```js
// $(el).toggleClass(className)

function toggleClass(el, className) {
  el.classList.toggle(className)
}
```

Which, quite honestly is an abstraction that shouldn't exist at all...
`el.classList.toggle(className)` is simple enough all on its own.

So here's what you need to know about an abstraction before you adopt it into
your application or workflow:

1.  What is the benefit of this abstraction?
2.  What is the cost of this abstraction?

If you don't know those things, then you run the risk of paying a cost for a
solution for a problem you don't have. A cost with no benefit is not a good
deal!

An important part of understanding the benefits and costs is feeling the pain of
the problem that the abstraction solves. This is why it's important for you to
learn React and its ecosystem in the right order to make certain that you're not
overwhelmed by too much to learn at once and using abstractions effectively.

> _Side note...  
> Want to just play around with stuff?  
> Want to just ship stuff?  
> That's totally cool.  
> Just recognize you don't know the trade-offs and that could bite you in the
> future. If the future doesn't matter that much then don't worry about it!_

### Start with JavaScript + Modern JS

One of the things I love about React is how much JavaScript it is. If you can
build a simple app with regular JavaScript and DOM APIs then you'll understand
the benefits of React much better. You'll also be much more effective using
React because honestly, 90% of being effective with React is understanding
JavaScript well. For this, I suggest
[JavaScript30.com](https://javascript30.com) (totally free) by
[Wes Bos](https://twitter.com/wesbos).

In addition, knowing modern JavaScript features will go a long way. Because JSX
(more on this later) requires a transpiler, most React developers take modern
JavaScript features/transpilers for granted. So most tutorials and examples will
assume you have a basic understanding of modern JavaScript features. For this, I
suggest my [ES6 and Beyond Workshop](http://kcd.im/es6-workshop-at-paypal)
(totally free) which is a recording of a workshop I gave at PayPal.

### Next, let's learn React

Too many "beginner React" material starts with JSX and a bunch of tools. React
itself is remarkably simple (and
[the docs are amazingly good](https://reactjs.org)). Sadly, everything around it
can get complicated quickly and it can be hard to know where the lines are
between React and the tools and libraries you use it with. Because of this, I've
created
[The Beginner's Guide to React](https://egghead.io/courses/the-beginner-s-guide-to-reactjs)
absolutely free on [egghead.io](http://egghead.io). It starts with everything in
`index.html` files which I think is important. You don't need any tooling at all
to use React.

[The last lesson](https://egghead.io/lessons/egghead-build-and-deploy-a-react-application)
shows you how to use [CodeSandbox.io](http://codesandbox.io) to create your app
[entirely in the browser](/blog/building-production-apps-100-in-the-browser) and
download that to your computer to a
[create-react-app](https://github.com/facebook/create-react-app) application.

You don't need anything installed to get a really long way! And once you do, you
can get really far without having to configure any tools. I know of several
companies shipping their application with create-react-app.

### Dependencies and npm

Once you've decided that you don't want to write your own version of every
component under the sun, you can start looking into dependencies. There are a
TON of components out there and here is where you really need to start asking
the questions of "what's the cost" and "what's the benefit." Try really hard to
not add a dependency until _after_ you've felt the pain it's supposed to solve.
It will make you more effective at using the dependency.

I suggest reading through [the npm documentation](https://docs.npmjs.com) in an
afternoon. Seriously, do it. There's some really valuable information in there.

In addition, when you start using dependencies, you're going to want to learn
how to `import` those dependencies. I have a talk called
["More than you want to know about ES6 Modules"](https://youtu.be/kTlcu16rSLc&index=23&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
which you'll probably find packed with useful information about the ES Modules
syntax.

### Router

If your application is server rendered and you're adding react in to support
some interactivity, then don't bother with routing. However, if your application
is a "Single Page App" or the client (your browser code) will be responsible for
routing (updating the URL as the user is using the app), then you should learn
and use [`react-router`](https://reacttraining.com/react-router).

It has fantastic documentation. But if you really want to get a firm grip on
what it's doing, then I highly suggest
["Build your own react-router"](https://tylermcginnis.com/build-your-own-react-router-v4)
by [Tyler McGinnis](https://twitter.com/tylermcginnis).

### State management

When you learned React, you learned about the
[`setState`](https://reactjs.org/docs/react-component.html#setstate) API. You
probably also learned about
[Lifting State Up](https://reactjs.org/docs/lifting-state-up.html). This can
actually get you a long way with React and I encourage you to keep doing this as
long as you're able. Eventually you'll start running into some trouble with "the
prop-drilling problem." You'll know it when you feel it. When this happens, then
I suggest you give my blog post
["Application State Management"](/blog/application-state-management) a read
through.

> _TL;DR: Singleton Module -> React.createContext ->_ >
> [_Unstated.io_](http://unstated.io)_-\> redux._

### Component Styling

I honestly cannot recommend CSS-in-JS enough. Once your app has more than a few
hundred lines of CSS, you'll find that CSS-in-JS can really simplify things
conceptually for you. Here's some resources on why:

[A Unified Styling Language](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660) — [Mark Dalgleish](https://twitter.com/markdalgleish):

- Scoped styles
- Critical CSS
- Smarter optimisations
- Package management
- Non-browser styling

[Maintainable CSS in React](https://youtu.be/3-4KsXPO2Q4&index=2&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — [me 👋](https://twitter.com/react-vis):

- Colocation of concerns

I recommend [emotion](https://emotion.sh) because it has all the features you
could want out of a solution like this and it's the smallest, fastest, and more
memory efficient solution.

### And on...

From here I suggest you dive in deeper into React. I have my
[Advanced React Component Patterns course](https://egghead.io/courses/advanced-react-component-patterns)
on [egghead.io](http://egghead.io) which can give you a lot of really good
information.

Beyond here, you can learn:

- Server Rendering (Gatsby.js, Next.js, After.js)
- Relay/Apollo (for use with GraphQL servers)
- Immutable.js

Again, I would strongly recommend not learning these things until you've felt
the pain they solve. This will make you a much more effective user of these
solutions.

### Conclusion

I hope that this gives you (and your friends) a path for how to learn react as
well as where to start when building React applications. Adding abstractions to
your application too early makes them less flexible, so I would generally follow
this pattern when building apps as well. Good luck!

**Things to not miss**:

- [Introducing CodeSandbox Live — real time code collaboration in the browser](https://medium.com/@CompuIves/introducing-codesandbox-live-real-time-code-collaboration-in-the-browser-6d508cfc70c9) — This
  is SO COOL! and [Ives van Hoorne](https://twitter.com/CompuIves) is very cool
  too.
- [React v16.3.0: New lifecycles and context API](https://reactjs.org/blog/2018/03/29/react-v-16-3.html) — HOORAY!
  Awesome release!
