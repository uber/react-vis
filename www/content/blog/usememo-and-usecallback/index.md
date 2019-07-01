---
slug: 'usememo-and-usecallback'
title: 'When to useMemo and useCallback'
date: '2019-06-04'
author: 'Kent C. Dodds'
description:
  "_Performance optimizations ALWAYS come with a cost but do NOT always come
  with a benefit. Let's talk about the costs and benefits of useMemo and
  useCallback._"
categories:
  - 'react'
keywords:
  - 'javascript'
  - 'memoization'
  - 'react hooks'
  - 'performance'
  - 'inline functions'
  - 'react'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Jp Valery](https://unsplash.com/photos/mQTTDA_kY_8)'
---

Current Available Translations:

- [Korean](https://ideveloper2.dev/blog/2019-06-14--when-to-use-memo-and-use-callback/)

import {CandyDispenser, Poll} from './components'

Here's a candy dispenser:

<div
  style={{
    background: 'white',
    padding: 20,
    border: '2px solid black',
    borderRadius: 5,
    marginBottom: 20,
  }}
>
  <CandyDispenser />
</div>

Here's how it's implemented:

```jsx
function CandyDispenser() {
  const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
  const [candies, setCandies] = React.useState(initialCandies)
  const dispense = candy => {
    setCandies(allCandies => allCandies.filter(c => c !== candy))
  }
  return (
    <div>
      <h1>Candy Dispenser</h1>
      <div>
        <div>Available Candy</div>
        {candies.length === 0 ? (
          <button onClick={() => setCandies(initialCandies)}>refill</button>
        ) : (
          <ul>
            {candies.map(candy => (
              <li key={candy}>
                <button onClick={() => dispense(candy)}>grab</button> {candy}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
```

Now I want to ask you a question and I want you to think hard about it before
moving forward. I'm going to make a change to this and I want you to tell me
which will have the better performance characteristics.

The only thing I'm going to change is wrap the `dispense` function inside
`React.useCallback`:

```javascript
const dispense = React.useCallback(candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}, [])
```

Here's the original again:

```javascript
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}
```

So here's my question, in this specific case, which of these is better for
performance? Go ahead and submit your guess (this is not recorded anywhere):

<Poll />

> Let me give you some space to not spoil the answer for you...

<div style={{height: 400}} />

> Keep scrolling... You did answer, didn't you?

<div style={{height: 400}} />

> There, that should do it...

## Why is `useCallback` worse?!

We hear a lot that you should use `React.useCallback` to improve performance and
that "inline functions can be problematic for performance," so how could it ever
be better to _not_ `useCallback`?

Just take a step back from our specific example, and even from React and
consider this: **Every line of code which is executed comes with a cost.** Let
me refactor the `useCallback` example a bit (no actual changes, just moving
things around) to illustrate things more clearly:

```javascript
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}
const dispenseCallback = React.useCallback(dispense, [])
```

And here's the original again:

```javascript
const dispense = candy => {
  setCandies(allCandies => allCandies.filter(c => c !== candy))
}
```

Notice anything about these? Let's look at the diff:

```diff
  const dispense = candy => {
    setCandies(allCandies => allCandies.filter(c => c !== candy))
  }
+ const dispenseCallback = React.useCallback(dispense, [])
```

Yeah, they're _exactly_ the same except the `useCallback` version is doing
_more_ work. Not only do we have to define the function, but we also have to
define an array (`[]`) _and_ call the `React.useCallback` which itself is
setting properties/running through logical expressions etc.

So in _both_ cases JavaScript must allocate memory for the function definition
on every render and depending on how `useCallback` is implemented, you may get
_more_ allocation for function definitions (this is actually not the case, but
the point still stands). This is what I was trying to get across with my twitter
poll here:

https://twitter.com/kentcdodds/status/1135943012410830848

> Granted, I had several people tell me that was worded poorly, so my apologies
> if you got the wrong answer but actually knew the correct answer.

I'd like to mention also that on the second render of the component, the
original `dispense` function gets garbage collected (freeing up memory space)
and then a new one is created. However with `useCallback` the original
`dispense` function wont get garbage collected and a new one is created, so
you're worse-off from a memory perspective as well.

As a related note, if you have dependencies then it's quite possible React is
hanging on to a reference to previous functions because memoization typically
means that we keep copies of old values to return in the event we get the same
dependencies as given previously. The especially astute of you will notice that
this means React also has to hang on to a reference to the dependencies for this
equality check (which incidentally is probably happening anyway thanks to your
closure, but it's something worth mentioning anyway).

## How is `useMemo` different, but similar?

`useMemo` is similar to `useCallback` except it allows you to apply memoization
to any value type (not just functions). It does this by accepting a function
which returns the value and then that function is _only_ called when the value
needs to be retrieved (which typically will only happen once each time an
element in the dependencies array changes between renders).

So, if I didn't want to initialize that array of `initialCandies` every render,
I could make this change:

```diff
- const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
+ const initialCandies = React.useMemo(
+  () => ['snickers', 'skittles', 'twix', 'milky way'],
+  [],
+ )
```

And I would avoid that problem, but the savings would be so minimal that the
cost of making the code more complex just isn't worth it. In fact, it's probably
worse to use `useMemo` for this as well because again we're making a function
call and that code is doing property assignments etc.

In this particular scenario, what would be even better is to make this change:

```diff
+ const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
  function CandyDispenser() {
-   const initialCandies = ['snickers', 'skittles', 'twix', 'milky way']
    const [candies, setCandies] = React.useState(initialCandies)
```

But sometimes you don't have that luxury because the value is either derived
from `props` or other variables initialized within the body of the function.

The point is that it doesn't matter either way. The benefits of optimizing that
code is so minuscule that your time would be WAY better spent worrying about
making your product better.

## What's the point?

The point is this:

**Performance optimizations are not free. They ALWAYS come with a cost but do
NOT always come with a benefit to offset that cost.**

Therefore, _optimize responsibly_.

## So when _should_ I `useMemo` and `useCallback`?

There are specific reasons both of these hooks are built-into React:

1. Referential equality
2. Computationally expensive calculations

## Referential equality

If you're new to JavaScript/programming, it wont take long before you learn why
this is the case:

```javascript
true === true // true
false === false // true
1 === 1 // true
'a' === 'a' // true

{} === {} // false
[] === [] // false
() => {} === () => {} // false

const z = {}
z === z // true

// NOTE: React actually uses Object.is, but it's very similar to ===
```

I'm not going to go too deep into this, but suffice it to say when you define an
object inside your React function component, it is _not_ going to be
referentially equal to the last time that same object was defined (even if it
has all the same properties with all the same values).

There are two situations where referential equality matters in React, let's go
through them one at a time.

### Dependencies lists

Let's review an example.

> Warning, you're about to see some seriously contrived code. Please don't
> nit-pick that and just focus on the concepts please, thank you.

```jsx
function Foo({bar, baz}) {
  const options = {bar, baz}
  React.useEffect(() => {
    buzz(options)
  }, [options]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}

function Blub() {
  return <Foo bar="bar value" baz={3} />
}
```

The reason this is problematic is because `useEffect` is going to do a
referential equality check on `options` between every render, and thanks to the
way JavaScript works, `options` will be new every time so when React tests
whether `options` changed between renders it'll always evaluate to `true`,
meaning the `useEffect` callback will be called after every render rather than
only when `bar` and `baz` change.

There are two things we can do to fix this:

```jsx
// option 1
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz]) // we want this to re-run if bar or baz change
  return <div>foobar</div>
}
```

That's a great option and if this were a real thing that's how I'd fix this.

But there's one situation when this isn't a practical solution: If `bar` or
`baz` are (non-primitive) objects/arrays/functions/etc:

```jsx
function Blub() {
  const bar = () => {}
  const baz = [1, 2, 3]
  return <Foo bar={bar} baz={baz} />
}
```

This is precisely the reason why `useCallback` and `useMemo` exist. So here's
how you'd fix that (all together now):

```jsx
function Foo({bar, baz}) {
  React.useEffect(() => {
    const options = {bar, baz}
    buzz(options)
  }, [bar, baz])
  return <div>foobar</div>
}

function Blub() {
  const bar = React.useCallback(() => {}, [])
  const baz = React.useMemo(() => [1, 2, 3], [])
  return <Foo bar={bar} baz={baz} />
}
```

> Note that this same thing applies for the dependencies array passed to
> `useEffect`, `useLayoutEffect`, `useCallback`, and `useMemo`.

### `React.memo` (and friends)

> Warning, you're about to see some more contrived code. Please be advised to
> not nit-pick this either but focus on the concepts, thanks.

Check this out:

```jsx
function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
}

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = () => setCount1(c => c + 1)

  const [count2, setCount2] = React.useState(0)
  const increment2 = () => setCount2(c => c + 1)

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```

Every time you click on either of those buttons, the `DualCounter`'s state
changes and therefore re-renders which in turn will re-render both of the
`CountButton`s. However, the only one that _actually_ needs to re-render is the
one that was clicked right? So if you click the first one, the second one gets
re-rendered, but nothing changes. We call this an "unnecessary re-render."

**MOST OF THE TIME YOU SHOULD NOT BOTHER OPTIMIZING UNNECESSARY RERENDERS.**
React is VERY fast and there are so many things I can think of for you to do
with your time that would be better than optimizing things like this. In fact,
the need to optimize stuff with what I'm about to show you is so rare that I've
literally _never_ needed to do it in the 3 years I worked on PayPal products and
the even longer time that I've been working with React.

However, there are situations when rendering can take a substantial amount of
time (think highly interactive Graphs/Charts/Animations/etc.). Thanks to the
pragmatistic nature of React, there's an escape hatch:

```jsx
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})
```

Now React will only re-render `CountButton` when it's props change! Woo! But
we're not done yet. Remember that whole referential equality thing? In the
`DualCounter` component, we're defining the `increment1` and `increment2`
functions within the component functions which means every time `DualCounter` is
re-rendered, those functions will be new and therefore React will re-render both
of the `CountButton`s anyway.

So this is the other situation where `useCallback` and `useMemo` can be of help:

```jsx {7, 10}
const CountButton = React.memo(function CountButton({onClick, count}) {
  return <button onClick={onClick}>{count}</button>
})

function DualCounter() {
  const [count1, setCount1] = React.useState(0)
  const increment1 = React.useCallback(() => setCount1(c => c + 1), [])

  const [count2, setCount2] = React.useState(0)
  const increment2 = React.useCallback(() => setCount2(c => c + 1), [])

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
    </>
  )
}
```

Now we can avoid the so-called "unnecessary re-renders" of `CountButton`.

I would like to re-iterate that I strongly advise against using `React.memo` (or
it's friends `PureComponent` and `shouldComponentUpdate`) without measuring
because those optimizations come with a cost and you need to make sure you know
what that cost will be as well as the associated benefit so you can determine
whether it will actually be helpful (and not harmful) in your case, and as we
observe above **it can be tricky to get right all the time so you may not be
reaping any benefits at all anyway.**

## Computationally expensive calculations

This is the other reason that `useMemo` is a built-in hook for React (note that
this one does not apply to `useCallback`). The benefit to `useMemo` is that you
can take a value like:

```javascript
const a = {b: props.b}
```

And get it lazily:

```javascript
const a = React.useMemo(() => ({b: props.b}), [props.b])
```

This isn't really useful for that case above, but imagine that you've got a
function that synchronously calculates a value which is computationally
expensive to calculate (I mean how many apps actually need to
[calculate prime numbers like this](https://developer.mozilla.org/en-US/docs/Tools/Performance/Scenarios/Intensive_JavaScript)
ever, but that's an example):

```jsx
function RenderPrimes({iterations, multiplier}) {
  const primes = calculatePrimes(iterations, multiplier)
  return <div>Primes! {primes}</div>
}
```

That could be pretty slow given the right `iterations` or `multiplier` and
there's not too much you can do about that specifically. You can't automagically
make your user's hardware faster. But you _can_ make it so you never have to
calculate the same value twice in a row, which is what `useMemo` will do for
you:

```jsx
function RenderPrimes({iterations, multiplier}) {
  const primes = React.useMemo(() => calculatePrimes(iterations, multiplier), [
    iterations,
    multiplier,
  ])
  return <div>Primes! {primes}</div>
}
```

The reason this works is because even though you're defining the function to
calculate the primes on every render (which is VERY fast), React is only calling
that function when the value is needed. On top of that React also stores
previous values given the inputs and will return the previous value given the
same previous inputs. That's memoization at work.

## Conclusion

I'd just like to wrap this up by saying that every abstraction (and performance
optimization) comes at a cost. Apply
[the AHA Programming principle](/blog/aha-programming) and wait until the
abstraction/optimization is screaming at you before applying it and you'll save
yourself from incurring the costs without reaping the benefit.

Specifically the cost for `useCallback` and `useMemo` are that you make the code
more complex for your co-workers, you could make a mistake in the dependencies
array, and you're potentially making performance worse by invoking the built-in
hooks and preventing dependencies and memoized values from being garbage
collected. Those are all fine costs to incur if you get the performance benefits
necessary, but **it's best to measure first.**

Related reading:

- React FAQ:
  ["Are Hooks slow because of creating functions in render?"](https://reactjs.org/docs/hooks-faq.html#are-hooks-slow-because-of-creating-functions-in-render)
- [Ryan Florence](https://twitter.com/ryanflorence):
  [React, Inline Functions, and Performance](https://reacttraining.com/blog/react-inline-functions-and-performance)

P.S. If you're among the few who worry about the move to hooks and that it
forces us to define functions within our function components where we used to
define functions as methods on our classes, I would invite you to consider the
fact that we've been defining methods in the render phase of our components
since day one... For example:

```jsx
class FavoriteNumbers extends React.Component {
  render() {
    return (
      <ul>
        {this.props.favoriteNumbers.map(number => (
          // TADA! This is a function defined in the render method!
          // Hooks did not introduce this concept.
          // We've been doing this all along.
          <li key={number}>{number}</li>
        ))}
      </ul>
    )
  }
}
```
