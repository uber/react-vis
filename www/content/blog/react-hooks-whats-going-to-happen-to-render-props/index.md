---
slug: react-hooks-whats-going-to-happen-to-render-props
title: "React Hooks: What's going to happen to render props?"
date: '2018-12-10'
author: React Vis
description: >-
  _What am I going to do with all these render props components now that react
  hooks solve the code reuse problem better than render props ever did?_
keywords:
  - react
  - react hooks
  - render props
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Nadine Shaabana](https://unsplash.com/photos/anXB3AhQcJ0) on
  [Unsplash](https://unsplash.com/search/photos/inverted)'
---

Current Available Translations:

- [Korean](https://edykim.com/ko/post/react-hooks-whats-going-to-happen-to-render-props)

About a year ago, I published
["How to give rendering control to users with prop getters"](/blog/how-to-give-rendering-control-to-users-with-prop-getters).
In that post, I show the entire implementation (at the time) of
[`react-toggled`](https://github.com/uber/react-vis/react-toggled) which I
actually built for the sole purpose of teaching some of the patterns that I used
in [`downshift`](https://github.com/downshift-js/downshift). It's a much smaller
and simpler component that implements many of the same patterns as downshift so
it served as a great way to teach the prop getters pattern.

Both react-toggled and downshift use the render prop pattern as a mechanism for
React component logic code sharing. As I explained in my blog post
["When to NOT use Render Props"](/blog/when-to-not-use-render-props), that's the
primary use case for the render prop pattern. But that's also the primary use
case for React Hooks as well. And React Hooks are WAY simpler than class
components + render props.

So does that mean that when React Hooks are stable you wont need render props at
all anymore? **No!** I can think of two scenarios where the render prop pattern
will still be very useful, and I'll share those with you in a moment. But let's
go ahead and establish my claim that hooks are simpler by comparing the current
version of `react-toggled` with a hooks-based implementation.

If you're interested,
[here's the current source for](https://github.com/uber/react-vis/react-toggled/blob/8452a1f2a4ec7b64588cd8c9812e0faf8deb0271/src/index.js)
[`react-toggled`](https://github.com/uber/react-vis/react-toggled/blob/8452a1f2a4ec7b64588cd8c9812e0faf8deb0271/src/index.js).

Here's a typical usage of `react-toggled`:

```jsx
function App() {
  return (
    <Toggle>
      {({on, toggle}) => <button onClick={toggle}>{on ? 'on' : 'off'}</button>}
    </Toggle>
  )
}
```

If all we wanted was simple toggle functionality, our hook version would be:

```js
function useToggle(initialOn = false) {
  const [on, setOn] = useState(initialOn)
  const toggle = () => setOn(!on)
  return {on, toggle}
}
```

Then people could use that like so:

```jsx
function App() {
  const {on, toggle} = useToggle()
  return <button onClick={toggle}>{on ? 'on' : 'off'}</button>
}
```

Cool! A lot simpler! But the Toggle component in react-toggled actually supports
a lot more. For one thing, it provides a helper called `getTogglerProps` which
will give you the correct props you need for a toggler to work (including
`aria`attributes for accessibility). So let's make that work:

```js
// returns a function which calls all the given functions
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

function useToggle(initialOn = false) {
  const [on, setOn] = useState(initialOn)
  const toggle = () => setOn(!on)
  const getTogglerProps = (props = {}) => ({
    'aria-expanded': on,
    tabIndex: 0,
    ...props,
    onClick: callAll(props.onClick, toggle),
  })
  return {
    on,
    toggle,
    getTogglerProps,
  }
}
```

And now our `useToggle` hook can use the `getTogglerProps`:

```jsx
function App() {
  const {on, getTogglerProps} = useToggle()
  return <button {...getTogglerProps()}>{on ? 'on' : 'off'}</button>
}
```

And it's more accessible and stuff. Neat right? Well, what if I don't need the
`getTogglerProps` for my use case? Let's split this up a bit:

```js
// returns a function which calls all the given functions
const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))

function useToggle(initialOn = false) {
  const [on, setOn] = useState(initialOn)
  const toggle = () => setOn(!on)
  return {on, toggle}
}

function useToggleWithPropGetter(initialOn) {
  const {on, toggle} = useToggle(initialOn)
  const getTogglerProps = (props = {}) => ({
    'aria-expanded': on,
    tabIndex: 0,
    ...props,
    onClick: callAll(props.onClick, toggle),
  })
  return {on, toggle, getTogglerProps}
}
```

And we could do the same thing to support the `getInputTogglerProps` and
`getElementTogglerProps` helpers that `react-toggled` currently supports. This
would actually allow us to easily tree-shake out those extra utilities that our
app is not using, something that would be pretty unergonomic to do with a render
props solution (not impossible, just kinda ugly).

**But Kent!** I don't want to go and refactor all the places in my app that use
the render prop API to use the new hooks API!!

Never fear! Check this out:

```js
const Toggle = ({children, ...props}) => children(useToggle(props))
```

There's your render prop component. You can use that just like you were using
the old one and migrate over time. In fact, this is how I recommend testing
custom hooks!

There's a little more to this (like how do we port the control props pattern to
react hooks for example). I'm going to leave that to you to discover. Once
you've tried it out for a little bit, then
[watch me do it](https://youtu.be/_eVyLVFlSQk&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u).
There's a catch with the way we've been testing things a bit that change
slightly with hooks (thanks to JavaScript closures).

### The remaining use case for render props

Ok, so we can refactor our components to use hooks, and even continue to export
react components with a render prop-based API (you might be interested, you may
even consider going all out with
[the hydra pattern](https://americanexpress.io/hydra)). But let's imagine we're
now in a future where we don't need render props for logic reuse and everyone's
using hooks. Is there any reason to continue writing or using components that
expose a render props API?

YES! Observe! Here's
[an example of using downshift with react-virtualized](https://github.com/downshift-js/downshift/blob/9b3467dce2be59832765277570857de5679d8392/stories/examples/windowing-with-react-virtualized.js).
Here's the relevant bit:

```jsx
<List
  // ... some props
  rowRenderer={({key, index, style}) => (
    <div
    // ... some props
    />
  )}
/>
```

Checkout that `rowRenderer` prop there. Do you know what that is? IT'S A RENDER
PROP! What!? 🙀 That's inversion of control in all its glory with render props
right there. That's a prop that `react-virtualized` uses to delegate control of
rendering rows in a list to you the user of the component. If
`react-virtualized` were to be rewritten to use hooks, _maybe_ it could accept
the `rowRenderer` as an argument to the `useVirtualized` hook, but I don't
really see any benefit to that over it's current API. So I think render props
(and this style of inversion of control) are here to stay for use cases like
this.

### Conclusion

I hope you find this interesting and helpful. Remember that React hooks are
still in alpha and subject to change. They are also completely opt-in and will
not require any breaking changes to React's API. I think that's a great thing.
Don't go rewriting your apps! Refactor them (once hooks are stable)!

Good luck!

**Learn more about Refactoring to React Hooks from me**:

[My new egghead.io course](/blog/introducing-a-new-course-simplify-react-apps-with-react-hooks-and-suspense)
will show you how to refactor a typical app's components to use react hooks (and
React.lazy/suspense). It's a good time!

Also, check out
[this free egghead playlist about hooks and suspense](http://kcd.im/hooks-and-suspense)!

**Things to not miss**:

- [npm malware event](https://github.com/dominictarr/event-stream/issues/116):
  The package `event-stream` was published with a dependency that tried to steal
  bitcoin wallets. `event-stream` is downloaded ~2million times per week, so
  it's likely you've been infected. Check
  [the npm blog](https://blog.npmjs.org), I'm sure they'll post more about it
  soon.
- [React Podcast: 29: Don't Rewrite Your App for Hooks and Suspense with Jared Palmer](https://reactpodcast.simplecast.fm/29)
- [`htm`](https://github.com/developit/htm) by
  [Jason Miller](https://twitter.com/_developit/status/1065026506068504577)
  looks pretty slick. I still prefer JSX, but I can appreciate what he's doing
  there and the fact that there's no extra special syntax for things JavaScript
  can do (like map an array) is a major plus :)
- [Announcing native support for the css prop in styled-components 🎉](https://medium.com/styled-components/announcing-native-support-for-the-css-prop-in-styled-components-245ca5252feb) — This
  was always one of my biggest grievances with styled-components and a big
  reason I preferred [emotion](https://emotion.sh). I still prefer emotion, but
  I'm really excited that styled-components has this feature now! Stop naming
  things "Container" and "Wrapper!"
