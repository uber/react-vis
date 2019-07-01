---
slug: react-hooks-whats-going-to-happen-to-my-tests
title: "React Hooks: What's going to happen to my tests?"
date: '2018-12-24'
author: React Vis
description: _How can we prepare our tests for React's new hooks feature?_
keywords:
  - javascript
  - react
  - testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Mat Reding](https://unsplash.com/photos/OFVMOjjjIic) on
  [Unsplash](https://unsplash.com)'
---

Current Available Translations:

- [Korean](https://edykim.com/ko/post/react-hooks-whats-going-to-happen-to-my-tests)

One of the most common questions I hear about the upcoming React Hooks feature
is regarding testing. And I can understand the concern when your tests look like
this:

```jsx
// borrowed from a previous blog post:
// https://kcd.im/implementation-details
test('setOpenIndex sets the open index state properly', () => {
  const wrapper = mount(<Accordion items={[]} />)
  expect(wrapper.state('openIndex')).toBe(0)
  wrapper.instance().setOpenIndex(1)
  expect(wrapper.state('openIndex')).toBe(1)
})
```

That enzyme test works when `Accordion` is a class component where the
`instance` actually exists, but there's no concept of a component "instance"
when your components are function components. So doing things like `.instance()`
or `.state()` wont work when you refactor your components from class components
with state/lifecycles to function components with hooks.

So if you were to refactor the `Accordion` component to a function component,
those tests would break. So what can we do to make sure that our codebase is
ready for hooks refactoring without having to either throw away our tests or
rewrite them? You can start by avoiding enzyme APIs that reference the component
instance like the test above. You can read more about this in
[my "implementation details" blog post](https://kcd.im/imp-deets).

Let's look at a simpler example of a class component. My favorite example is a
`<Counter />` component:

```jsx
// counter.js
import React from 'react'

class Counter extends React.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>
  }
}

export default Counter
```

Now let's see how we could test it in a way that's ready for refactoring it to
use hooks:

```jsx
// __tests__/counter.js
import React from 'react'
import 'react-testing-library/cleanup-after-each'
import {render, fireEvent} from 'react-testing-library'
import Counter from '../counter.js'

test('counter increments the count', () => {
  const {container} = render(<Counter />)
  const button = container.firstChild
  expect(button.textContent).toBe('0')
  fireEvent.click(button)
  expect(button.textContent).toBe('1')
})
```

That test will pass. Now, let's refactor this to a hooks version of the same
component:

```jsx
// counter.js
import React from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(c => c + 1)
  return <button onClick={incrementCount}>{count}</button>
}

export default Counter
```

Guess what! Because our tests avoided implementation details, our hooks are
passing! How neat is that!? :)

### useEffect is not componentDidMount + componentDidUpdate + componentWillUnmount

Another thing to consider is the `useEffect` hook because it actually is a
little unique/special/different/awesome. When you're refactoring from class
components to hooks, you'll typically move the logic from `componentDidMount`,
`componentDidUpdate`, and `componentWillUnmount`to one or more `useEffect`
callbacks (depending on the number of concerns your component has in those
lifecycles). But this is actually _not_ a refactor. Let's get a quick review of
what a "refactor" actually is.

When you refactor code, you're making changes to the implementation without
making user-observable changes.
[Here's what wikipedia says about "code refactoring"](https://en.wikipedia.org/wiki/Code_refactoring):

> **Code refactoring** is the process of restructuring existing computer
> code — changing the
> [factoring](https://en.wikipedia.org/wiki/Decomposition_%28computer_science%29 'Decomposition (computer science)')
>  without changing its external behavior.

Ok, let's try that idea out with an example:

```js
const sum = (a, b) => a + b
```

Here's a refactor of this function:

```js
const sum = (a, b) => b + a
```

It still works exactly the same, but the implementation itself is a little
different. Fundamentally that's what a "refactor" is. Ok, now, here's what a
refactor is _not_:

```js
const sum = (...args) => args.reduce((s, n) => s + n, 0)
```

This is awesome, our `sum` is more capable, but what we did was _not_
technically a refactor, it was an enhancement. Let's compare:

```
| call         | result before | result after |
|--------------|---------------|--------------|
| sum()        | NaN           | 0            |
| sum(1)       | NaN           | 1            |
| sum(1, 2)    | 3             | 3            |
| sum(1, 2, 3) | 3             | 6            |
```

So why was this not a refactor? It's because we are "changing its external
behavior." Now, this change is desirable, but it is a change.

So what does all this have to do with `useEffect`? Let's look at another example
of our counter component as a class with a new feature:

```jsx
class Counter extends React.Component {
  state = {
    count: Number(window.localStorage.getItem('count') || 0),
  }
  increment = () => this.setState(({count}) => ({count: count + 1}))
  componentDidMount() {
    window.localStorage.setItem('count', this.state.count)
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      window.localStorage.setItem('count', this.state.count)
    }
  }
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>
  }
}
```

Ok, so we're saving the value of `count` in `localStorage` using
`componentDidMount` and `componentDidUpdate`. Here's what our
implementation-details-free test would look like:

```jsx
// __tests__/counter.js
import React from 'react'
import 'react-testing-library/cleanup-after-each'
import {render, fireEvent, cleanup} from 'react-testing-library'
import Counter from '../counter.js'

afterEach(() => {
  window.localStorage.removeItem('count')
})

test('counter increments the count', () => {
  const {container} = render(<Counter />)
  const button = container.firstChild
  expect(button.textContent).toBe('0')
  fireEvent.click(button)
  expect(button.textContent).toBe('1')
})

test('reads and updates localStorage', () => {
  window.localStorage.setItem('count', 3)
  const {container, rerender} = render(<Counter />)
  const button = container.firstChild
  expect(button.textContent).toBe('3')
  fireEvent.click(button)
  expect(button.textContent).toBe('4')
  expect(window.localStorage.getItem('count')).toBe('4')
})
```

That test passes! Woo! Now let's "refactor" this to hooks again with these new
features:

```jsx
import React, {useState, useEffect} from 'react'

function Counter() {
  const [count, setCount] = useState(() =>
    Number(window.localStorage.getItem('count') || 0),
  )
  const incrementCount = () => setCount(c => c + 1)
  useEffect(() => {
    window.localStorage.setItem('count', count)
  }, [count])
  return <button onClick={incrementCount}>{count}</button>
}

export default Counter
```

Cool, as far as the user is concerned, this component will work _exactly_ the
same as it had before. But it's actually working differently from how it was
before. The real trick here is that **the** `**useEffect**` **callback is
_scheduled_ to run at a later time**. So before, we set the value of
`localStorage` synchronously after rendering. Now, it's scheduled to run later
after rendering. Why is this? Let's checkout
[this tip from the React Hooks docs](https://reactjs.org/docs/hooks-effect.html#detailed-explanation):

> Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with
> `useEffect` don't block the browser from updating the screen. This makes your
> app feel more responsive. The majority of effects don't need to happen
> synchronously. In the uncommon cases where they do (such as measuring the
> layout), there is a separate
> [`useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect)
> Hook with an API identical to `useEffect`.

Ok, so by using `useEffect` that's better for performance! Awesome! We've made
an enhancement to our component and our component code is actually simpler to
boot! NEAT!

However, this is _not_ a refactor. It's actually a change in behavior. As far as
the _end_ user is concerned, that change is unobservable. In our efforts to
ensure that our tests are free of implementation details, that change should be
unobservable as well.

Whelp, thanks to the new [`act`](https://reactjs.org/docs/test-utils.html#act)
utility from [`react-dom/test-utils`](https://reactjs.org/docs/test-utils.html)
we can make that happen. So `react-testing-library` integrates with that utility
and makes it so all our tests continue to pass as written, allowing the tests we
write to be free of implementation details and continue to resemble the way our
software is used as closely as possible.

### What about render props components?

This is probably my favorite actually. Here's a simple counter render prop
component:

```js
class Counter extends React.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return this.props.children({
      count: this.state.count,
      increment: this.increment,
    })
  }
}
// usage:
// <Counter>
//   {({ count, increment }) => <button onClick={increment}>{count}</button>}
// </Counter>
```

Here's how I would test this:

```jsx
// __tests__/counter.js
import React from 'react'
import 'react-testing-library/cleanup-after-each'
import {render, fireEvent} from 'react-testing-library'
import Counter from '../counter.js'

function renderCounter(props) {
  let utils
  const children = jest.fn(stateAndHelpers => {
    utils = stateAndHelpers
    return null
  })
  return {
    ...render(<Counter {...props}>{children}</Counter>),
    children,
    // this will give us access to increment and count
    ...utils,
  }
}

test('counter increments the count', () => {
  const {children, increment} = renderCounter()
  expect(children).toHaveBeenCalledWith(expect.objectContaining({count: 0}))
  increment()
  expect(children).toHaveBeenCalledWith(expect.objectContaining({count: 1}))
})
```

Ok, so let's refactor the counter to a component that uses hooks:

```js
function Counter(props) {
  const [count, setCount] = useState(0)
  const increment = () => setCount(currentCount => currentCount + 1)
  return props.children({
    count: count,
    increment,
  })
}
```

Cool, and because we wrote our test the way we did, it's actually still passing.
Woo! BUT! As we learned from
"[React Hooks: What's going to happen to render props?](/blog/react-hooks-whats-going-to-happen-to-render-props)"
custom hooks are a better primitive for code sharing in React. So let's rewrite
this to a custom hook:

```js
function useCounter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(currentCount => currentCount + 1)
  return {count, increment}
}

export default useCounter

// usage:
// function Counter() {
//   const {count, increment} = useCounter()
//   return <button onClick={increment}>{count}</button>
// }
```

Awesome... but how do we test `useCounter`? And wait! We can't update our entire
codebase to the new `useCounter`! We were using the `<Counter />` render prop
based component in like three hundred places!? Rewrites are the worst!

Nah, I got you. Do this instead:

```js
function useCounter() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(currentCount => currentCount + 1)
  return {count, increment}
}

const Counter = ({children, ...props}) => children(useCounter(props))

export default Counter
export {useCounter}
```

Our new `<Counter />` render-prop based component there is actually _exactly_
the same as the one we had before. So this is a true refactor. But now anyone
who can take the time to upgrade can use our `useCounter`custom hook.

Oh, and guess what. Our tests are still passing!!! WHAT! How neat right?

So when everyone's upgraded we can remove the Counter function component right?
You may be able to do that, but I would actually move it to the `__tests__`
because _that's_ how I like testing custom hooks! I prefer making a render-prop
based component out of a custom hook, and actually rendering that and asserting
on what the function is called with.

Fun trick right? I show you how to do this in
[my new course on egghead.io](https://kcd.im/refactor-react). Enjoy!

## What about hooks libraries?

If you're writing a generic or open source hook, then you may want to test it
without a specific component in mind. In that case, I recommend using
[`react-hooks-testing-library`](https://www.npmjs.com/package/react-hooks-testing-library).

## Conclusion

One of the best things you can do before you refactor code is have a good test
suite/type definitions in place so when you inadvertently break something you
can be made aware of the mistake right away. But **your test suite can't do you
any good if you have to throw it away when you refactor it.** Take my advice:
[avoid implementation details](https://kcd.im/imp-deets) in your tests. Write
tests that will work today with classes, and in the future if those classes are
refactored to functions with hooks. Good luck!

**Learn more about React Hooks from me**:

If you thought this was interesting, I highly recommend you watch these (while
they're both still free):

- [React Hooks and Suspense](http://kcd.im/hooks-and-suspense)  —  A great
  primer on Hooks and Suspense
- [Simplify React Apps with React Hooks](http://kcd.im/refactor-react)  — Let's
  take some real-world class components and refactor them to function components
  with hooks.

**Things to not miss**:

- [rescripts](https://github.com/rescripts/rescripts)  —  💥 Use the latest
  react-scripts with custom configurations for Babel, ESLint, TSLint,
  Webpack,... ∞ by [Harry Solovay](https://twitter.com/hsolvz)
- [Contributing to Open Source on GitHub for beginners](https://youtu.be/k6KcaMffxac&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) 
  —  A talk I gave at my Alma mater (BYU) this last week
- [Make a SUPER simple personal URL shortener with Netlify](https://youtu.be/HL6paXyx6hM&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
  (I'm still livestreaming almost every week day at
  [kcd.im/devtips](https://kcd.im/devtips))
- [The three browsers holding JavaScript back the most are:](https://twitter.com/jamiebuilds/status/1022568918949408768)...
  An interesting thread by [Jamie Kyle](https://twitter.com/jamiebuilds).
- [Emotion 10 released!](https://medium.com/emotion-js/announcing-emotion-10-f1a4b17b8ccd) 
  —  This is still my favorite CSS-in-JS solution and
  [this is why](https://twitter.com/tkh44/status/1070901663622283265) I prefer
  it over styled-components.
