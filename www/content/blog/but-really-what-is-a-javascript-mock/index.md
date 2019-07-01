---
slug: but-really-what-is-a-javascript-mock
title: 'But really, what is a JavaScript mock?'
date: '2018-03-19'
author: React Vis
description: >-
  _Let's take a step back and understand what mocks are and how to use them to
  facilitate testing in JavaScript._
keywords:
  - javascript
  - testing
  - mocking
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Dmitri Popov](https://unsplash.com/photos/cnOlhGQY-SI) on
  [Unsplash](https://unsplash.com/search/photos/swiss-cheese)'
---

> This is a great follow-up to
> [But really, what is a JavaScript test?](/blog/but-really-what-is-a-javascript-test)
> So here we go!

<!-- gap -->

### Step 0

To learn about mocks we have to have something to test and something to mock, so
here's the module we'll be testing today:

```js
// thumb-war.js
import {getWinner} from './utils'

function thumbWar(player1, player2) {
  const numberToWin = 2
  let player1Wins = 0
  let player2Wins = 0
  while (player1Wins < numberToWin && player2Wins < numberToWin) {
    const winner = getWinner(player1, player2)
    if (winner === player1) {
      player1Wins++
    } else if (winner === player2) {
      player2Wins++
    }
  }
  return player1Wins > player2Wins ? player1 : player2
}

export default thumbWar
```

It's a thumb war game where you play best 2 out of three. It uses a function
called `getWinner` from utils. `getWinner` returns the winning player or null
for a tie. We're going to pretend this is making a call to some third party
machine learning service that has **a testing environment we don't control and
is unreliable so we want to mock it out for tests**. This is one of the (rare)
situations where mocking is really your only choice to reliably test your code.
(I'm still making it synchronous to simplify our example further).

In addition, unless we re-implement all the inner-workings of `getWinner` in our
tests, there's no way for us to really make useful assertions because the winner
of the thumb war is non-deterministic. So without mocking anything, here's the
best our test can do:

```js
// thumb-war.0.js
import thumbWar from '../thumb-war'

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(['Ken Wheeler', 'React Vis'].includes(winner)).toBe(true)
})
```

We can only assert that the winner is one of the players, and maybe that's
enough. But if we really want to ensure that our `thumbWar`function is
integrating properly with `getWinner` (as much as we reasonably can), then we'll
want to create a mock for it and assert on a real winner.

### Step 1

The simplest form of mocking is monkey-patching values. Here's an example of
what our test looks like when we do that:

```js
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // eslint-disable-next-line import/namespace
  utils.getWinner = (p1, p2) => p2

  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})
```

You'll notice a few things here. First we have to import the utils module as a
`*` import so we have an object that we can manipulate (NOTE: read that with a
grain of salt! More on why this is bad later). Then we need to store the
original function at the beginning of our test and restore it at the end so
other tests aren't impacted by the changes we're making to the `utils` module.

All of that is just setup for the actual mocking part of our changes. The mock
is the line that reads:

```js
utils.getWinner = (p1, p2) => p2
```

This is [monkey-patching](https://en.wikipedia.org/wiki/Monkey_patch) mocking.
It's effective (we're now able to ensure there's a specific winner of the
`thumbWar` game), but there are some limitations to this. One thing that's
annoying is the eslint warning, so we've disabled that (again, don't actually do
this as it makes your code non-spec compliant! Again, more on this later). Also,
we don't actually know for sure whether the `utils.getWinner` function was
called as much as it should have been (twice, for a best 2 out of 3 game). This
may or may not be important for the application, but it's important for what I'm
trying to teach you so let's improve that!

### Step 2

Let's add some code to make sure that the `getWinner` function was called twice,
and ensure it was called with the right arguments.

```js
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // eslint-disable-next-line import/namespace
  utils.getWinner = (...args) => {
    utils.getWinner.mock.calls.push(args)
    return args[1]
  }
  utils.getWinner.mock = {calls: []}

  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')
  expect(utils.getWinner.mock.calls).toHaveLength(2)
  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'React Vis'])
  })

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})
```

So here we're adding a `mock` object to our mock function so we can keep some
mock metadata about how the function is called. This allows us to add these two
assertions:

```js
expect(utils.getWinner.mock.calls).toHaveLength(2)
utils.getWinner.mock.calls.forEach(args => {
  expect(args).toEqual(['Ken Wheeler', 'React Vis'])
})
```

This helps us ensure that our mock is being called properly (with the right
arguments) and that it's being called the right number of times (twice for a two
out of three game).

Now so long as our mock can model what the real world version does, we can get
back a little confidence that our code is working despite having to mock out
what `getWinner` is actually doing. It may not be a bad idea to implement some
[contract testing](https://martinfowler.com/bliki/ContractTest.html) to ensure
that the contract between `getWinner` and the third party service is kept in
check. But I'll leave that to your imagination!

### Step 3

So all of this stuff is cool, but it's annoying to have to keep track of when
our mock is called all the time. Turns out that what we've done is manually
implement a mock function and Jest comes built-in with a utility for exactly
this. So let's simplify our code by using that!

```js
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  const originalGetWinner = utils.getWinner
  // eslint-disable-next-line import/namespace
  utils.getWinner = jest.fn((p1, p2) => p2)

  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  utils.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'React Vis'])
  })

  // eslint-disable-next-line import/namespace
  utils.getWinner = originalGetWinner
})
```

Here we've simply wrapped our `getWinner` mock implementation with
[`jest.fn`](https://facebook.github.io/jest/docs/en/jest-object.html#jestfnimplementation).
This effectively does all the same stuff we were doing, except because it's a
special Jest mock function, there are some special assertions we can use just
for that purpose (like `toHaveBeenCalledTimes`). Unfortunately there's not
currently an assertion called `nthCalledWith`
([though there will be one soon!](https://facebook.github.io/jest/docs/en/next/expect.html#nthcalledwithnthcall-arg1-arg2-)),
otherwise we could have avoided our `forEach`, but I think it's ok as it is (and
luckily we implemented our own metadata collection in the same way Jest does, so
we don't need to change that assertion. Fancy that!).

The next thing I don't like is having to keep track of `originalGetWinner` and
restore that at the end. I'm also bothered by those eslint comments I had to put
there (remember! That rule is super important and we'll talk about it in a
moment). Let's see if we can simplify things further with another Jest utility.

### Step 4

Luckily, Jest has a utility called
[`spyOn`](https://facebook.github.io/jest/docs/en/jest-object.html#jestspyonobject-methodname)
which does exactly what we need:

```js
import thumbWar from '../thumb-war'
import * as utils from '../utils'

test('returns winner', () => {
  jest.spyOn(utils, 'getWinner')
  utils.getWinner.mockImplementation((p1, p2) => p2)

  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')

  utils.getWinner.mockRestore()
})
```

Sweet! We've really simplified things! Mock functions are also called spies
(which is why the API for this is called `spyOn`). By default, Jest will just
keep the original implementation of `getWinner` but still keep track of how it's
called. For us though we don't want the original implementation to be called so
we use `mockImplementation` to mock out what happens when it's called. Then at
the end we use `mockRestore` to clean up after ourselves just as we were before.
Neat right!?

So remember the eslint errors we were seeing? Let's address those next!

### Step 5

The ESLint error we were seeing is actually really important. We got around the
issue because we change our code in such a way that `eslint-plugin-import` was
unable to statically detect that we are still actually breaking the rule. But
this rule is actually very important. The rule is:
[`import/namespace`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/namespace.md).
The reason it's broken in this case is:

> _Reports on assignment to a member of an imported namespace._

So why is this a problem? It's because the fact that our code works is just the
luck of how Babel transpiles it to CommonJS and how the require cache works.
When I import a module, I'm importing immutable bindings to the functions in
that module, so if I import the same module in two different files and attempt
to mutate the bindings, the mutation will only apply for the module where the
mutation occurred (I'm actually not sure about this, I may get an error, which
would probably be better). So if you rely on this, you're probably in for
[tears](http://kcd.im/tears) when you try to upgrade to ES modules for realzies.

That said, what we're about to do doesn't really comply with the spec either
(it's test utilities doing some magic for us), but our code _looks_ like it
complies with the spec which is important so folks on the team don't learn bad
habits that could find their way into application code.

So to solve this, we _could_ attempt to muck with the `require.cache`to swap the
actual implementation of the module for our mock version, but we'd find out that
`imports` happen before our code runs and so we wouldn't be able to run it in
time without pulling it into another file. Also, my kids are about to wake up
and I gotta get this done!

So now we come to the `jest.mock` API. Because Jest actually simulates the
module system for us, it can very easily and seamlessly swap out a mock
implementation of a module for the real one! Here's what our test looks like
now:

```js
import thumbWar from '../thumb-war'
import * as utilsMock from '../utils'

jest.mock('../utils', () => {
  return {
    getWinner: jest.fn((p1, p2) => p2),
  }
})

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')
  expect(utilsMock.getWinner).toHaveBeenCalledTimes(2)
  utilsMock.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'React Vis'])
  })
})
```

Cool right!? We just tell Jest we want all files to use our mock version instead
and poof! It does! Notice also that I changed the name of the import from
`utils` to `utilsMock`. That's not required, but I like doing that to
communicate the intention that this should be importing a mocked version of the
module, not the real thing.

> _Common question: If you only want to mock one of several functions in a
> module, then you may like the_ >
> [`require.requireActual`](https://facebook.github.io/jest/docs/en/api.html#requirerequireactualmodulename) >
> _API._

### Step 6

Ok, so we're almost done. What if we're using this `getWinner`function in
several of our tests and we don't want to copy/paste this mock everywhere?
That's where [the](https://facebook.github.io/jest/docs/en/manual-mocks.html)
[`__mocks__`](https://facebook.github.io/jest/docs/en/manual-mocks.html)
[directory](https://facebook.github.io/jest/docs/en/manual-mocks.html) comes in
handy! So we create a `__mocks__` directory right next to the file that we want
to mock, and then create a file with the same name:

```
other/whats-a-mock/
├── __mocks__
│   └── utils.js
├── __tests__/
├── thumb-war.js
└── utils.js
```

Inside the `__mocks__/utils.js` file, we'll put this:

```js
// __mocks__/utils.js
export const getWinner = jest.fn((p1, p2) => p2)
```

And with that, we can update our test:

```js
// __tests__/thumb-war.js
import thumbWar from '../thumb-war'
import * as utilsMock from '../utils'

jest.mock('../utils')

test('returns winner', () => {
  const winner = thumbWar('Ken Wheeler', 'React Vis')
  expect(winner).toBe('React Vis')
  expect(utilsMock.getWinner).toHaveBeenCalledTimes(2)
  utilsMock.getWinner.mock.calls.forEach(args => {
    expect(args).toEqual(['Ken Wheeler', 'React Vis'])
  })
})
```

🎉 Woo! Now we just say `jest.mock(pathToModule)` and it'll pick up the mock
file we created for us automatically.

Now we may not want this mock to always return the second player, so we can use
`mockImplementation` for specific tests to verify that it works if we return the
second and then first and then second again, etc. Feel free to try that on your
own. You can also equip your mock with some utilities as well if you like. The
world is your oyster.

Good luck!
