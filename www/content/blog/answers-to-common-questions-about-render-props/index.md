---
slug: answers-to-common-questions-about-render-props
title: Answers to common questions about render props
date: '2018-02-12'
author: Kent C. Dodds
description: _Because there's a ton of hype, and a bunch of questions ⚛️_
keywords:
  - javascript
  - react
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Sharon McCutcheon](https://unsplash.com/photos/gYxVSeZazXU) on
  [Unsplash](https://unsplash.com)'
---

As I was preparing this article, I was getting ready to give a training to
engineers at a local company. They saw my
[Advanced React Component Patterns course on egghead.io](http://kcd.im/advanced-react)
and want to dive deeper into the Render Props pattern. (If you're unfamiliar
with the Render Props pattern, I suggest you stop reading now and read
["Use a Render Prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce)
or watch ["Never Write Another HoC"](https://youtu.be/BcVAq3YFiuc) (both by the
illustrious [Michael Jackson](https://twitter.com/mjackson)), then come back and
continue).

In preparing for this training (in addition to
[creating this](https://codesandbox.io/s/k2krnxml7r)),
[I tweeted this question](https://twitter.com/kentcdodds/status/954508165076455424):

https://twitter.com/kentcdodds/status/954508165076455424

I got quite a few great responses and for today's newsletter I thought I'd share
three of them and simple examples for the answer:

### Question 1: Performance?

This is by far the most common question I get whenever talking about Render
Props (my tweet had several responses asking about performance). My answer to
this question is simple: "That's a really common question. So I'm glad that
[Ryan Florence](https://twitter.com/ryanflorence) answered it in a great blog
post! Read
["React, Inline Functions, and Performance"](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578).
"In summary" (to quote the article:

> - Write your code naturally, code to the design.

> - Measure your interactions to find slow paths.
>   [Here's how](https://reactjs.org/blog/2016/11/16/react-v15.4.0.html#profiling-components-with-chrome-timeline).

> - Use `PureComponent` and `shouldComponentUpdate` only when you need to,
>   skipping prop functions (unless they are used in lifecycle hooks for
>   side-effects).

> _If you really believe that premature optimization is bad practice, then you
> won't need proof that inline functions are fast, you need proof that they are
> slow._

I should add one thing. If you're _really_ concerned about inlining your render
prop function and perf implications of that, then don't inline the function! :)

```jsx
class MyComp extends React.Component {
  renderDownshift = downshift => <div>{/* Your UI stuff here */}</div>
  render() {
    return <Downshift>{this.renderDownshift}</Downshift>
  }
}
```

### Question 2: Messy Render!?

The
[not-a-link-posting-robot](https://twitter.com/acemarke/status/872207875812098048)
[Mark Erikson](https://twitter.com/acemarke)
[asked](https://twitter.com/acemarke/status/954519688968581123):

https://twitter.com/acemarke/status/954519688968581123

https://twitter.com/acemarke/status/954520099985219584

Mark is correct. Almost every render prop example I've seen also just shows all
the logic in the render function. It's normally an implicit return and then one
giant expression. I used to be annoyed by giant render functions, but I've
warmed up to them as I've realized that the only reason I didn't like them was
because I _thought_ they were complex... 🤔 🤓

In any case, because render props are literally just functions that get called
with arguments, you can do whatever you like with them. So I made
[these two examples](https://codesandbox.io/s/ry4qwpnzqp) for Mark. Here's a
smaller version of the concept:

```jsx
function JustARegularFunctionComponent(props) {
  // do whatever you want in here
  return <div>{/* your stuff */}</div>
}

function App() {
  return (
    <div>
      <div>With a totally different component. Thanks React composibility!</div>
      <RenderPropComp
        render={arg => <JustARegularFunctionComponent {...arg} />}
      />
      <hr />
      <div>
        Inline! You don't have to make it an implicit return arrow function 😉
      </div>
      <RenderPropComp
        render={arg => {
          // <-- notice the curly brace!
          // do whatever you want in here
          return <div>{/* your stuff */}</div>
        }}
      />
    </div>
  )
}
```

### Question 3: Lifecycle Hooks?

Another fairly common question is how to get access to the render prop arguments
in lifecycle hooks (because your render prop function is called within the
context of the `render` of your component, how do you get it into
`componentDidMount`.
[This](https://twitter.com/SavePointSam/status/954515218616340480) was asked by
[@SavePointSam](https://twitter.com/SavePointSam):

https://twitter.com/SavePointSam/status/954515218616340480

The answer to this is actually sort of hidden in the answer to Mark's question
above. Notice that thanks to React's composability, we can create a separate
component, and simply forward the arguments to the props of our component.
[Like this](https://codesandbox.io/s/6437r9qqk):

```jsx
class RegularClassComponent extends React.Component {
  componentDidUpdate() {
    // here you are :)
    console.log(this.props.whatever)
  }
  render() {
    return <div>{/* your ui */}</div>
  }
}

function App() {
  return <RenderPropComp render={arg => <RegularClassComponent {...arg} />} />
}
```

My friend [Donavon](https://twitter.com/donavon) would be sad if I didn't bring
up his preferred pattern of
[Component Injection](http://americanexpress.io/faccs-are-an-antipattern). With
component injection you could do this even more cleanly:

```jsx
class RegularClassComponent extends React.Component {
  componentDidUpdate() {
    // here you are :)
    console.log(this.props.whatever)
  }
  render() {
    return <div>{/* your ui */}</div>
  }
}

function App() {
  return <CompInjectionComp component={RegularClassComponent} />
}
```

I'll leave the implementation details as an exercise for the reader... Or you
could look at [the new library](http://npm.im/render-props) Donavon created as a
result of this conversation, which he published on an airplane ✈️ at 30,000
feet!

### Conclusion

The render prop pattern is awesome. I'm looking forward to seeing more projects
added to [Jared Palmer's](https://twitter.com/jaredpalmer)
[`awesome-react-render-props`](https://github.com/jaredpalmer/awesome-react-render-props)!
What I love about the Render Prop pattern is that it can encapsulate the logic
of a component without sacrificing customizability and simplicity in the markup.
More awesome to come I think... Good luck! 👍

**Things to not miss**:

- [post 0: styles as objects](https://twitter.com/threepointone/status/954783976748732418)
  by [Sunil Pai](https://twitter.com/threepointone). It's the first in a series
  of blog posts about css-in-js. Follow him to keep up!
- [`react-powerplug`](https://github.com/renatorib/react-powerplug): "🔌
  Renderless Pluggable State Containers" by
  [Renato Ribeiro](http://twitter.com/renatorib_)
- [`awesome-toolkits`](https://github.com/reyronald/awesome-toolkits) by
  [Ronald Rey](https://twitter.com/reyronald). Some awesome projects on there!
  👍
- [tellmewhenitcloses.com](https://tellmewhenitcloses.com): "Get 1 email when an
  issue or PR closes (instead of getting a million emails by subscribing)".
  Created by [@thoughtbot](https://twitter.com/thoughtbot).
- [bundlephobia.com](https://bundlephobia.com): "Find the cost of adding a npm
  package to your bundle"
