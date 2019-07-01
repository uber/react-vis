---
slug: compound-components-with-react-hooks
date: 2019-02-18
title: 'React Hooks: Compound Components'
author: 'React Vis'
description: How do compound components change with React hooks?
categories: ['react']
keywords:
  - react
  - react hooks
banner: './banner.jpg'
bannerCredit:
  Photo by [karl S](https://unsplash.com/photos/remgiCyeqHI) on
  [Unsplash](https://unsplash.com)
---

A few weeks ago I did a [DevTips with Kent](https://kcd.im/devtips) livestream
where I show you how to refactor the compound components pattern from a class
component to a function component with React hooks:

https://youtube.com/watch?v=415EfGPuhSo&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u

If you're unfamiliar with compound components, then you probably haven't watched
my Advanced React Component Patterns course
[on egghead.io](http://kcd.im/advanced-react) or
[on Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns).

The idea is that you have two or more components that work together to
accomplish a useful task. Typically one component is the parent, and the other
is the child. The objective is to provide a more expressive and flexible API.

Think of it like `<select>` and `<option>`:

```html
<select>
  <option value="value1">key1</option>
  <option value="value2">key2</option>
  <option value="value3">key3</option>
</select>
```

If you were to try and use one without the other it wouldn't work (or make
sense). Additionally it's actually a really great API. Let's check out what it
would look like if we didn't have a compound components API to work with
(remember, this is HTML, not JSX):

```html
<select options="key1:value1;key2:value2;key3:value3"></select>
```

I'm sure you can think of other ways to express this, but yuck. And how would
you express the `disabled` attribute with this kind of API? It's kinda madness.

So the compound components API gives you a nice way to express relationships
between components.

Another important aspect of this is the concept of "implicit state." The
`<select>` element implicitly stores state about the selected option and shares
that with it's children so they know how to render themselves based on that
state. But that state sharing is implicit because there's nothing in our HTML
code that can even access the state (and it doesn't need to anyway).

Alright, let's get a look at a legit React component that exposes a compound
component to understand these principles further. Here's an example of
[the `<Menu />` component from Reach UI](https://ui.reach.tech/menu-button) that
exposes a compound components API:

```jsx
function App() {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={() => alert('Download')}>Download</MenuItem>
        <MenuItem onSelect={() => alert('Copy')}>Create a Copy</MenuItem>
        <MenuItem onSelect={() => alert('Delete')}>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}
```

In this example, the `<Menu>` establishes some shared implicit state. The
`<MenuButton>`, `<MenuList>`, and `<MenuItem>` components each access and/or
manipulate that state, and it's all done implicitly. This allows you to have the
expressive API you're looking for.

So how is this done? Well, if you watch
[my course](https://kcd.im/advanced-react) I show you two ways to do it. One
with `React.cloneElement` on the children and the other with React context. (My
course will need to be slightly updated to show how to do this with hooks). In
this blog post, I'll show you how to create a simple set of compound components
using context.

When teaching a new concept, I prefer to use simple examples at first. So we'll
use my favorite `<Toggle>` component example for this.

Here's how our `<Toggle>` compound components are going to be used:

```jsx
function App() {
  return (
    <Toggle onToggle={on => console.log(on)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
```

You'll notice that we're using a `.` in our component names. That's because
those components are added as static properties to the `<Toggle>` component.
Note that this is not at all a requirement of compound components (the `<Menu>`
components above do not do this). I just like doing this as a way to explicitly
communicate the relationship.

Ok, the moment you've all been waiting for, the actual full implementation of
compound components with context and hooks:

```jsx
import React from 'react'
// this switch implements a checkbox input and is not relevant for this example
import {Switch} from '../switch'

const ToggleContext = React.createContext()

function useEffectAfterMount(cb, dependencies) {
  const justMounted = React.useRef(true)
  React.useEffect(() => {
    if (!justMounted.current) {
      return cb()
    }
    justMounted.current = false
  }, dependencies)
}

function Toggle(props) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => setOn(oldOn => !oldOn), [])
  useEffectAfterMount(() => {
    props.onToggle(on)
  }, [on])
  const value = React.useMemo(() => ({on, toggle}), [on])
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  )
}

function useToggleContext() {
  const context = React.useContext(ToggleContext)
  if (!context) {
    throw new Error(
      `Toggle compound components cannot be rendered outside the Toggle component`,
    )
  }
  return context
}

function On({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

function Off({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

function Button(props) {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

// for convenience, but totally not required...
Toggle.On = On
Toggle.Off = Off
Toggle.Button = Button
```

Here's this component in action:

<iframe
  src="https://codesandbox.io/embed/9yp5p2z7yr"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>

So the way this works is we create a context with React where we store the state
and a mechanism for updating the state. Then the `<Toggle>` component is
responsible for providing that context value to the rest of the react tree.

I'll walkthrough this implementation and explain the particulars in a future
update to my Advanced React Component Patterns course. So keep an eye out for
that!

I hope that helps you get some ideas of ways you can make your component APIs
more expressive and useful. Good luck!
