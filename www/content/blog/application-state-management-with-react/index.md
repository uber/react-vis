---
slug: 'application-state-management-with-react'
title: 'Application State Management with React'
date: '2019-04-22'
author: 'React Vis'
description: '_How React is all you need to manage your application state_'
categories:
  - 'react'
keywords:
  - 'react'
  - 'javascript'
  - 'redux'
  - 'mobx'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Rene Böhmer](https://unsplash.com/photos/YeUVDKZWSZ4)'
---

Managing state is arguably the hardest part of any application. It's why there
are so many state management libraries available and more coming around every
day (and even some built on top of others... There are hundreds of "easier
redux" abstractions on npm). Despite the fact that state management is a hard
problem, I would suggest that one of the things that makes it so difficult is
that we often over-engineer our solution to the problem.

There's one state management solution that I've personally tried to implement
for as long as I've been using React, and with the release of React hooks (and
massive improvements to React context) this method of state management has been
drastically simplified.

We often talk about React components as lego building blocks to build our
applications, and I think that when people hear this, they somehow think this
excludes the state aspect. The "secret" behind my personal solution to the state
management problem is to think of how your application's state maps to the
application's tree structure.

One of the reasons redux was so successful was the fact that react-redux solved
the [prop drilling](/blog/prop-drilling) problem. The fact that you could share
data across different parts of your tree by simply passing your component into
some magical `connect` function was wonderful. Its use of reducers/action
creators/etc. is great too, but I'm convinced that the ubiquity of redux is
because it solved the prop drilling pain point for developers.

Unfortunately, this led to the reason that I only ever used redux on one
project: I consistently see developers putting _all_ of their state into redux.
Not just global application state, but local state as well. This leads to a lot
of problems, not the least of which is that when you're maintaining any state
interaction, it involves interacting with reducers, action creators/types, and
dispatch calls, which ultimately results in having to open many files and trace
through the code in your head to figure out what's happening and what impact it
has on the rest of the codebase.

To be clear, this is fine for state that is truly global, but for simple state
(like whether a modal is open or form input value state) this is a big problem.
To make matters worse, it doesn't scale very well. The larger your application
gets, the harder this problem becomes. Sure you can hook up different reducers
to manage different parts of your application, but the indirection of going
through all these action creators and reducers is not optimal.

Having all your application state in a single object can also lead to other
problems, even if you're not using Redux. When a React `<Context.Provider>` gets
a new value, all the components that consume that value are updated and have to
render, even if it's a function component that only cares about part of the
data. That might lead to potential performance issues. (React-Redux v6 also
tried to use this approach until they realized it wouldn't work right with
hooks, which forced them to use a different approach with v7 to solve these
issues.) But my point is that you don't have this problem if you have your state
more logically separated and located in the react tree closer to where it
matters.

---

Here's the real kicker, if you're building an application with React, you
already have a state management library installed in your application. You don't
even need to `npm install` (or `yarn add`) it. It costs no extra bytes for your
users, it integrates with all React packages on npm, and it's already well
documented by the React team. It's React itself.

> **React is a state management library**

When you build a React application, you're assembling a bunch of components to
make a tree of components starting at your `<App />` and ending at your
`<input />`s, `<div />`s and `<button />`s. You don't manage all of the
low-level composite components that your application renders in one central
location. Instead, you let each individual component manage that and it ends up
being a really effective way to build your UI. You can do this with your state
as well, and it's very likely that you do today:

```javascript {2}
function Counter() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}
```

[![Edit React Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4qzj73lozx?fontsize=14&hidenavigation=1&module=%2Fsrc%2F01-simple-count.js&moduleview=1)

Note that everything I'm talking about here works with class components as well.
Hooks just make things a bit easier (especially context which we'll get into in
a minute).

```javascript {2}
class Counter extends React.Component {
  state = {count: 0}
  increment = () => this.setState(({count}) => ({count: count + 1}))
  render() {
    return <button onClick={this.increment}>{this.state.count}</button>
  }
}
```

"Ok, Kent, sure having a single element of state managed in a single component
is easy, but what do you do when I need to share that state across components?
For example, what if I wanted to do this:"

```javascript {3}
function CountDisplay() {
  // where does `count` come from?
  return <div>The current counter count is {count}</div>
}

function App() {
  return (
    <div>
      <CountDisplay />
      <Counter />
    </div>
  )
}
```

"The `count` is managed inside `<Counter />`, now I need a state management
library to access that `count` value from the `<CountDisplay />` and update it
in `<Counter />`!"

The answer to this problem is as old as React itself (older?) and has been in
the docs for as long as I can remember:
[Lifting State Up](https://reactjs.org/docs/lifting-state-up.html)

"Lifting State Up" is legitimately the answer to the state management problem in
React and it's a rock solid one. Here's how you apply it to this situation:

```javascript
function Counter({count, onIncrementClick}) {
  return <button onClick={onIncrementClick}>{count}</button>
}

function CountDisplay({count}) {
  return <div>The current counter count is {count}</div>
}

function App() {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  return (
    <div>
      <CountDisplay count={count} />
      <Counter count={count} onIncrementClick={increment} />
    </div>
  )
}
```

[![Edit React Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4qzj73lozx?fontsize=14&hidenavigation=1&module=%2Fsrc%2F02-lift-state.js&moduleview=1)

We've just changed who's responsible for our state and it's really
straightforward. And we could keep lifting state all the way to the top of our
app.

"Sure Kent, ok, but what about the [prop drilling](/blog/prop-drilling)
problem?"

This is one problem that's actually also had a "solution" for a long time, but
only recently was that solution "official" and "blessed." As I said, many people
reached for `react-redux` because it solved this problem using the mechanism I'm
referring to without them having to be worried about the warning that was in the
React docs. But now that `context` is an officially supported part of the React
API, we can use this directly without any problem:

```javascript
// src/count/count-context.js
import React from 'react'

const CountContext = React.createContext()

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  return context
}

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => [count, setCount], [count])
  return <CountContext.Provider value={value} {...props} />
}

export {CountProvider, useCount}

// src/count/page.js
import React from 'react'
import {CountProvider, useCount} from './count-context'

function Counter() {
  const [count, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>{count}</button>
}

function CountDisplay() {
  const [count] = useCount()
  return <div>The current counter count is {count}</div>
}

function CountPage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
```

[![Edit React Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4qzj73lozx?fontsize=14&hidenavigation=1&module=%2Fsrc%2F03-context.js&moduleview=1)

> NOTE: That particular code example is VERY contrived and I would NOT recommend
> you reach for context to solve this specific scenario. Please read
> [Prop Drilling](/blog/prop-drilling) to get a better sense for why prop
> drilling isn't necessarily a problem and is often desirable. Don't reach for
> context too soon!

And what's cool about this approach is that we could put all the logic for
common ways to update the state in our `useContext` hook (or directly in context
if you want I guess):

```javascript
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  const [count, setCount] = context

  const increment = () => setCount(c => c + 1)
  return {
    count,
    setCount,
    increment,
  }
}
```

[![Edit React Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4qzj73lozx?fontsize=14&hidenavigation=1&module=%2Fsrc%2F04-context-with-logic.js&moduleview=1)

And you could easily change this to `useReducer` rather than `useState` as well:

```javascript
function countReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT': {
      return {count: state.count + 1}
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function CountProvider(props) {
  const [state, dispatch] = React.useReducer(countReducer, {count: 0})
  const value = React.useMemo(() => [state, dispatch], [state])
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`)
  }
  const [state, dispatch] = context

  const increment = () => dispatch({type: 'INCREMENT'})
  return {
    state,
    dispatch,
    increment,
  }
}
```

[![Edit React Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/4qzj73lozx?fontsize=14&hidenavigation=1&module=%2Fsrc%2F05-context-with-reducer.js&moduleview=1)

This gives you an immense amount of flexibility and reduces complexity by orders
of magnitude. Here are a few important things to remember when doing things this
way:

1. Not everything in your application needs to be in a single state object. Keep
   things logically separated (user settings does not necessarily have to be in
   the same context as notifications). You will have multiple providers with
   this approach.
2. Not all of your context needs to be globally accessible! **Keep state as
   close to where it's needed as possible.**

More on that second point. Your app tree could look something like this:

```javascript
function App() {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <Router>
          <Home path="/" />
          <About path="/about" />
          <UserPage path="/:userId" />
          <UserSettings path="/settings" />
          <Notifications path="/notifications" />
        </Router>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}

function Notifications() {
  return (
    <NotificationsProvider>
      <NotificationsTab />
      <NotificationsTypeList />
      <NotificationsList />
    </NotificationsProvider>
  )
}

function UserPage({username}) {
  return (
    <UserProvider username={username}>
      <UserInfo />
      <UserNav />
      <UserActivity />
    </UserProvider>
  )
}

function UserSettings() {
  // this would be the associated hook for the AuthenticationProvider
  const {user} = useAuthenticatedUser()
}
```

Notice that each page can have its own provider that has data necessary for the
components underneath it. Code splitting "just works" for this stuff as well.
How you get data _into_ each provider is up to the hooks those providers use and
how you retrieve data in your application, but you know just where to start
looking to find out how that works (in the provider).

## Conclusion

Again, this is something that you can do with class components (you don't have
to use hooks). Hooks make this much easier, but you could implement this
philosophy with React 15 no problem. Keep state as local as possible and use
context only when prop drilling really becomes a problem. Doing things this way
will make it easier for you to maintain state interactions.
