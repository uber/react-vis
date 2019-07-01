---
slug: 'the-state-reducer-pattern-with-react-hooks'
title: 'The State Reducer Pattern with React Hooks'
date: '2019-03-25'
author: 'React Vis'
description:
  '_A pattern for you to use in custom hooks to enhance the power and
  flexibility of your hooks._'
categories:
  - 'react'
keywords:
  - 'react'
  - 'hooks'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Alex Eckermann](https://unsplash.com/photos/W_K6j6OQBDg)'
---

## Some History

About a year ago, I developed a new pattern for enhancing your React components
called [the state reducer pattern](/blog/the-state-reducer-pattern). I used it
in [downshift](https://github.com/downshift-js/downshift) to enable an awesome
API for people who wanted to make changes to how downshift updates state
internally.

> If you're unfamiliar with downshift, just know that it's an "enhanced input"
> component that allows you to build things like accessible
> autocomplete/typeahead/dropdown components. It's important to know that it
> manages the following items of state: `isOpen`, `selectedItem`,
> `highlightedIndex`, and `inputValue`.

Downshift is currently implemented as a render prop component, because at the
time, render props was the best way to make a
["Headless UI Component"](https://www.merrickchristensen.com/articles/headless-user-interface-components)
(typically implemented via a "render prop" API) which made it possible for you
to share logic without being opinionated about the UI. This is the major reason
that downshift is so successful.

Today however, we have [React Hooks](https://reactjs.org/hooks) and
[hooks are way better at doing this than render props](/blog/react-hooks-whats-going-to-happen-to-render-props).
So I thought I'd give you all an update of how this pattern transfers over to
this new API the React team has given us. (Note:
[Downshift has plans to implement a hook](https://github.com/downshift-js/downshift/issues/683))

As a reminder, the benefit of the state reducer pattern is in the fact that it
allows
["inversion of control"](https://en.wikipedia.org/wiki/Inversion_of_control)
which is basically a mechanism for the author of the API to allow the user of
the API to control how things work internally. For an example-based talk about
this, I strongly recommend you give my React Rally 2018 talk a watch:

https://youtube.com/watch?v=AiJ8tRRH0f8&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf

So in the downshift example, I had made the decision that when an end user
selects an item, the `isOpen` should be set to `false` (and the menu should be
closed). Someone was building a multi-select with downshift and wanted to keep
the menu open after the user selects an item in the menu (so they can continue
to select more).

By inverting control of state updates with the state reducer pattern, I was able
to enable their use case as well as any other use case people could possibly
want when they want to change how downshift operates internally. Inversion of
control is an enabling computer science principle and the state reducer pattern
is an awesome implementation of that idea that translates even better to hooks
than it did to regular components.

## Using a State Reducer with Hooks

Ok, so the concept goes like this:

1. End user does an action
2. Dev calls dispatch
3. Hook determines the necessary changes
4. Hook calls dev's code for further changes 👈 this is the inversion of control
   part
5. Hook makes the state changes

**WARNING: Contrived example ahead**: To keep things simple, I'm going to use a
simple `useToggle` hook and component as a starting point. It'll feel contrived,
but I don't want you to get distracted by a complicated example as I teach you
how to use this pattern with hooks. Just know that this pattern works best when
it's applied to complex hooks and components (like downshift).

```jsx
function useToggle() {
  const [on, setOnState] = React.useState(false)

  const toggle = () => setOnState(o => !o)
  const setOn = () => setOnState(true)
  const setOff = () => setOnState(false)

  return {on, toggle, setOn, setOff}
}

function Toggle() {
  const {on, toggle, setOn, setOff} = useToggle()

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={toggle} />
    </div>
  )
}

function App() {
  return <Toggle />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

Now, let's say we wanted to adjust the `<Toggle />` component so the user
couldn't click the `<Switch />` more than 4 times in a row unless they click a
"Reset" button:

```jsx {2-3,7-10,16-19}
function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle()

  function handleClick() {
    toggle()
    setClicksSinceReset(count => count + 1)
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

Cool, so an easy solution to this problem would be to add an if statement in the
`handleClick` function and not call `toggle` if `tooManyClicks` is true, but
let's keep going for the purposes of this example.

How could we change the `useToggle` hook, to _invert control_ in this situation?
Let's think about the API first, then the implementation second. As a user, it'd
be cool if I could hook into every state update before it actually happens and
modify it, like so:

```jsx {6-14}
function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle({
    modifyStateChange(currentState, changes) {
      if (tooManyClicks) {
        // other changes are fine, but on needs to be unchanged
        return {...changes, on: currentState.on}
      } else {
        // the changes are fine
        return changes
      }
    },
  })

  function handleClick() {
    toggle()
    setClicksSinceReset(count => count + 1)
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

So that's great, except it prevents changes from happening when people click the
"Switch Off" or "Switch On" buttons, and we only want to prevent the
`<Switch />` from toggling the state.

Hmmm... What if we change `modifyStateChange` to be called `reducer` and it
accepts an `action` as the second argument? Then the `action` could have a
`type` that determines what type of change is happening, and the `changes` could
just be a property on that object. We'll just say that the `type` for clicking
the switch is `TOGGLE`.

```jsx {6-7}
function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle({
    reducer(currentState, action) {
      if (tooManyClicks && action.type === 'TOGGLE') {
        // other changes are fine, but on needs to be unchanged
        return {...action.changes, on: currentState.on}
      } else {
        // the changes are fine
        return action.changes
      }
    },
  })

  function handleClick() {
    toggle()
    setClicksSinceReset(count => count + 1)
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

Nice! This gives us all kinds of control. One last thing, let's not bother with
the string `'TOGGLE'` for the type. Instead we'll have an object of all the
change types that people can reference instead. This'll help avoid typos and
improve editor autocompletion:

```jsx {7}
function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle({
    reducer(currentState, action) {
      if (tooManyClicks && action.type === useToggle.types.toggle) {
        // other changes are fine, but on needs to be unchanged
        return {...action.changes, on: currentState.on}
      } else {
        // the changes are fine
        return action.changes
      }
    },
  })

  function handleClick() {
    toggle()
    setClicksSinceReset(count => count + 1)
  }

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}
```

## Implementing a State Reducer with Hooks

Alright, I'm happy with the API we're exposing here. Let's take a look at how we
could implement this with our `useToggle` hook. In case you forgot, here's the
code for that:

```jsx
function useToggle() {
  const [on, setOnState] = React.useState(false)

  const toggle = () => setOnState(o => !o)
  const setOn = () => setOnState(true)
  const setOff = () => setOnState(false)

  return {on, toggle, setOn, setOff}
}
```

We _could_ add logic to every one of these helper functions, but I'm just going
to skip ahead and tell you that this would be really annoying, even in this
simple hook. Instead, we're going to rewrite this from `useState` to
`useReducer` and that'll make our implementation a LOT easier:

```jsx
function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE': {
      return {on: !state.on}
    }
    case 'ON': {
      return {on: true}
    }
    case 'OFF': {
      return {on: false}
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

function useToggle() {
  const [{on}, dispatch] = React.useReducer(toggleReducer, {on: false})

  const toggle = () => dispatch({type: 'TOGGLE'})
  const setOn = () => dispatch({type: 'ON'})
  const setOff = () => dispatch({type: 'OFF'})

  return {on, toggle, setOn, setOff}
}
```

Ok, cool. Really quick, let's add that `types` property to our `useToggle` to
avoid the strings thing:

```jsx {3,6,9,21-23,28-32}
function toggleReducer(state, action) {
  switch (action.type) {
    case useToggle.types.toggle: {
      return {on: !state.on}
    }
    case useToggle.types.on: {
      return {on: true}
    }
    case useToggle.types.off: {
      return {on: false}
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

function useToggle() {
  const [{on}, dispatch] = React.useReducer(toggleReducer, {on: false})

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}

useToggle.types = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
}
```

Cool, so now, users are going to pass `reducer` as a configuration object to our
`useToggle` function, so let's accept that:

```jsx {1}
function useToggle({reducer}) {
  const [{on}, dispatch] = React.useReducer(toggleReducer, {on: false})

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}
```

Great, so now that we have the developer's `reducer`, how do we combine that
with our reducer? Well remember that the developer needs to know what our
changes will be, so we'll definitely need to determine those changes first.
Let's make an inline reducer:

```jsx {3-6}
function useToggle({reducer}) {
  const [{on}, dispatch] = React.useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action)
      return changes
    },
    {on: false},
  )

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}
```

That was a straight-up refactor. In fact, no functionality has changed for our
toggle hook (which is actually kinda neat if you think of it. The magic of black
boxes and implementation details ✨).

Awesome, so now we have all the info we need to pass along to the `reducer`
they've given to us:

```jsx {5}
function useToggle({reducer}) {
  const [{on}, dispatch] = React.useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action)
      return reducer(state, {...action, changes})
    },
    {on: false},
  )

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}
```

Cool! So we just call the developer's `reducer` with the `state` and make a new
`action` object that has all the properties of the original `action` plus the
`changes`. Then we return whatever they return to us. And they have complete
control over our state updates! That's pretty neat! And thanks to `useReducer`
it's pretty simple too.

But not everyone's going to need this `reducers` feature, so let's default the
configuration object to `{}` and we'll default the `reducer` property to a
simple reducer that just always returns the changes:

```jsx {1}
function useToggle({reducer = (s, a) => a.changes} = {}) {
  const [{on}, dispatch] = React.useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action)
      return reducer(state, {...action, changes})
    },
    {on: false},
  )

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}
```

## Conclusion

Here's the final version:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import Switch from './switch'

function toggleReducer(state, action) {
  switch (action.type) {
    case useToggle.types.toggle: {
      return {on: !state.on}
    }
    case useToggle.types.on: {
      return {on: true}
    }
    case useToggle.types.off: {
      return {on: false}
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

function useToggle({reducer = (s, a) => a.changes} = {}) {
  const [{on}, dispatch] = React.useReducer(
    (state, action) => {
      const changes = toggleReducer(state, action)
      return reducer(state, {...action, changes})
    },
    {on: false},
  )

  const toggle = () => dispatch({type: useToggle.types.toggle})
  const setOn = () => dispatch({type: useToggle.types.on})
  const setOff = () => dispatch({type: useToggle.types.off})

  return {on, toggle, setOn, setOff}
}
useToggle.types = {
  toggle: 'TOGGLE',
  on: 'ON',
  off: 'OFF',
}

function Toggle() {
  const [clicksSinceReset, setClicksSinceReset] = React.useState(0)
  const tooManyClicks = clicksSinceReset >= 4

  const {on, toggle, setOn, setOff} = useToggle({
    reducer(currentState, action) {
      if (tooManyClicks && action.type === useToggle.types.toggle) {
        // other changes are fine, but on needs to be unchanged
        return {...action.changes, on: currentState.on}
      } else {
        // the changes are fine
        return action.changes
      }
    },
  })

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch
        onClick={() => {
          toggle()
          setClicksSinceReset(count => count + 1)
        }}
        on={on}
      />
      {tooManyClicks ? (
        <button onClick={() => setClicksSinceReset(0)}>Reset</button>
      ) : null}
    </div>
  )
}

function App() {
  return <Toggle />
}

ReactDOM.render(<App />, document.getElementById('root'))
```

And here it is running in [a codesandbox](https://codesandbox.io/s/9j0pkq30lo):

https://codesandbox.io/s/9j0pkq30lo

Remember, what we've done here is enable users to hook into every state update
of our reducer to make changes to it. This makes our hook WAY more flexible, but
it also means that the way we update state is now part of the API and if we make
changes to how that happens, then it could be a breaking change for users. It's
totally worth the trade-off for complex hooks/components, but it's just good to
keep that in mind.

I hope you find patterns like this useful. Thanks to `useReducer`, this pattern
just kinda falls out (thank you React!). So give it a try on your codebase!

Good luck!
