---
slug: prop-drilling
title: Prop Drilling
date: '2018-05-21'
author: React Vis
description: >-
  _What it is, why it's good, why it's bad, and how to avoid common problems
  with it_
keywords:
  - react
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Simon Caspersen](https://unsplash.com/photos/oJ7SV6vQfBA) on
  [Unsplash](https://unsplash.com/search/photos/drill)'
---

Current Available Translations:

- [Korean](https://edykim.com/ko/post/prop-drilling)

The goal of this post is to not only help you understand what prop drilling is
(some also refer to it as "threading"), but also when it can be a problem and
mechanisms you can use to side-step or avoid it.

### What is prop drilling?

Prop drilling (also called "threading") refers to the process you have to go
through to get data to parts of the React Component tree. Let's look at a very
simple example of a stateful component (yes, it's my favorite component
example):

```jsx
function Toggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(o => !o)
  return (
    <div>
      <div>The button is {on ? 'on' : 'off'}</div>
      <button onClick={toggle}>Toggle</button>
    </div>
  )
}
```

Let's refactor this into two components now:

```jsx
function Toggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(o => !o)
  return <Switch on={on} onToggle={toggle} />
}

function Switch({on, onToggle}) {
  return (
    <div>
      <div>The button is {on ? 'on' : 'off'}</div>
      <button onClick={onToggle}>Toggle</button>
    </div>
  )
}
```

Simple enough, the `Switch` needs a reference to the `toggle` and `on` state, so
we're sending some props there. Let's refactor it once more to add another layer
in our component tree:

```jsx
function Toggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(o => !o)
  return <Switch on={on} onToggle={toggle} />
}

function Switch({on, onToggle}) {
  return (
    <div>
      <SwitchMessage on={on} />
      <SwitchButton onToggle={onToggle} />
    </div>
  )
}

function SwitchMessage({on}) {
  return <div>The button is {on ? 'on' : 'off'}</div>
}

function SwitchButton({onToggle}) {
  return <button onClick={onToggle}>Toggle</button>
}
```

This is prop drilling. To get the `on` state and `toggle` handler to the right
places, we have to drill (or thread) props through the `Switch` component. The
`Switch` component itself doesn't actually need those values to function, but we
have to accept and forward those props because its children need them.

### Why is prop drilling good?

Did you ever work in an application that used global variables? What about an
AngularJS application that leveraged non-isolate `$scope` inheritance (or the
dreaded `$rootScope` 😱) The reason that the community has largely rejected
these methodologies is because it inevitably leads to a very confusing data
model for your application. It becomes difficult for anyone to find where data
is initialized, where it's updated, and where it's used. **Answering the
question of "can I modify/delete this code without breaking anything?" is
difficult to answer in that kind of a world. And that's the question you should
be optimizing for as you code.**

One reason we prefer ESModules over global variables is because it allows us to
be more explicit about where our values are used, making it much easier to track
values and eases the process determining what impact your changes will have on
the rest of the application.

Prop drilling at its most basic level is simply explicitly passing values
throughout the view of your application. This is great because if you were
coming to the `Toggle` above and decided you want to refactor the `on` state to
be an enum, you'd easily be able to track all places it's used by following the
code statically (without having to run it) and make that update. The key here is
explicitness over implicitness.

### What problems can prop drilling cause?

In our contrived example above, there's absolutely no problem. But as an
application grows, you may find yourself drilling through many layers of
components. It's not normally a big deal when you write it out initially, but
after that code has been worked in for a few weeks, things start to get unwieldy
for a few use cases:

- Refactor the shape of some data (ie: `{user: {name: 'Joe West'}}` ->
  `{user: {firstName: 'Joe', lastName: 'West'}}`)
- Over-forwarding props (passing more props than is necessary) due to (re)moving
  a component that required some props but they're no longer needed.
- Under-forwarding props + abusing `defaultProps` so you're not made aware of
  missing props (also due to (re)moving a component).
- Renaming props halfway through (ie `<Toggle on={on} />` renders
  `<Switch toggleIsOn={on} />`) making keeping track of that in your brain
  difficult.

There are various other situations where prop drilling can cause some real pain
in the process of refactoring especially.

### How can we avoid problems with prop drilling?

One of the things that really aggravates problems with prop drilling is breaking
out your `render` method into multiple components unnecessarily. You'll be
surprised how simple a big `render` method can be when you just inline as much
as you can. There's no reason to breaking things out prematurely. Wait until you
really need to reuse a block before breaking it out. Then you wont need to pass
props anyway!

> _Fun fact, there's nothing technically stopping you from writing your entire
> application as a single React Component. It can manage the state of your whole
> application and you'd have one giant render method... I am not advocating this
> though... Just something to think about :)_

_Note: I've written a blog post about this concept called
"[When to break up a component into multiple components](/blog/when-to-break-up-a-component-into-multiple-components)"
that you may enjoy._

Another thing you can do to mitigate the effects of prop-drilling is avoid using
`defaultProps` for anything that's a required prop. Using a `defaultProp` for
something that's actually required for the component to function properly is
just hiding important errors and making things fail silently. So only use
`defaultProps` for things that are not required.

Keep state as close to where it's relevant as possible. If only one section of
your app needs some state, then manage that in the least common parent of those
components rather than putting it at the highest level of the app. Learn more
about state management from my blog post:
[Application State Management](/blog/application-state-management-with-react).

Use [React's Context API](/blog/how-to-use-react-context-effectively) for things
that are truly necessary deep in the react tree. They don't have to be things
you need _everywhere_ in the application (you can render a provider anywhere in
the app). This can really help avoid some issues with prop drilling. It's been
noted that context is kinda taking us back to the days of global variables. The
difference is that because of the way the API was designed, you can still
statically find the source of the context as well as any consumers with relative
ease.

### Conclusion

Prop drilling can be a good thing, and it can be a bad thing. Following some
good practices as mentioned above, you can use it as a feature to make your
application more maintainable. Good luck!
