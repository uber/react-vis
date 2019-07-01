---
slug: introducing-a-new-course-simplify-react-apps-with-react-hooks-and-suspense
title:
  'Introducing a new course: Simplify React Apps with React Hooks and Suspense'
date: '2018-12-03'
author: Kent C. Dodds
description: >-
  _Learn about the massive improvements coming to function components in React
  via a fresh new course showing you how to refactor an existing..._
keywords:
  - react
  - react hooks
  - react suspense
banner: ./images/banner.jpg
---

_Learn about the massive improvements coming to function components in React via
a fresh new course showing you how to refactor an existing app to these new and
upcoming APIs._

_Ok, before I get into things, can I just say that this course artwork by_
[_Maggie Appleton_](https://twitter.com/mappletons) _and_
[_Maxime Bourgeois_](https://twitter.com/MaximalGFX) _is just the absolute best.
It's just so good. 😍_

I'm super excited to share this course with you. I've been using React full time
for almost three years now and I've never been more
[excited (!!)](https://youtu.be/0jlTw2XI7I8&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
about writing components than when I started playing around with Hooks and
Suspense. Let's get a quick rundown of what you can expect from the course:

### [About the course](https://egghead.io/courses/simplify-react-apps-with-react-hooks-and-suspense)

With the massive improvements to function components in React via hooks and
suspense, you may be interested in seeing how to refactor a typical class
component to a simpler class component that uses React Suspense and Hooks
features. In this course, Kent will take
[a modern React codebase](https://github.com/kentcdodds/react-github-profile)
that uses classes and refactor the entire thing to use function components as
much as possible. We'll look at state, side effects, async code, caching, and
more!

Want a primer on hooks and suspense?
[Watch my React Hooks and Suspense Playlist](https://egghead.io/playlists/react-hooks-and-suspense-650307f2)!

_note: React Hooks is_ **_alpha_** _and subject to change. The React team has_
[_the 16.x roadmap here_](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html)_._

### [Introduction to Refactoring a React Application to React Hooks and React Suspense](https://egghead.io/lessons/react-introduction-to-refactoring-a-react-application-to-react-hooks-and-react-suspense)

Let's get a quick overview of what this course is all about and how it's been
structured to make sure you're as productive as possible with these new
features.

### [Refactor a Class Component with React hooks to a Function](https://egghead.io/lessons/react-refactor-a-class-component-with-react-hooks-to-a-function)

We have a render prop based class component that allows us to make a GraphQL
request with a given query string and variables and uses a GitHub graphql client
that is in React context to make the request. Let's refactor this to a function
component that uses the hooks useReducer, useContext, and useEffect.

### [Handle Deep Object Comparison in React's useEffect hook with the useRef Hook](https://egghead.io/lessons/react-handle-deep-object-comparison-in-react-s-useeffect-hook-with-the-useref-hook)

The second argument to React's `useEffect` hook is an array of dependencies for
your `useEffect` callback. When any value in that array changes, the effect
callback is re-run. But the `variables` object we're passing to that array is
created during render, so our effect will be re-run every render even if the
shape of the object is the same. So let's solve this by doing our own equality
check from within the effect callback.

### [Safely setState on a Mounted React Component through the useEffect Hook](https://egghead.io/lessons/react-safely-setstate-on-a-mounted-react-component-through-the-useeffect-hook)

In the class version of this component, we had a method called `safeSetState`
which would check whether the component was still mounted before trying to call
`setState`. This is because our graphql client library is unable to cancel
in-flight requests. Let's make that same kind of thing work by tracking the
mounted state of our component using the `useRef` and `useEffect` hooks.

### [Extract Generic React Hook Code into Custom React Hooks](https://egghead.io/lessons/react-extract-generic-react-hook-code-into-custom-react-hooks)

Because hooks code is regular JavaScript, extracting it to its own function is
trivial and enables code sharing in a really nice way. It also allows us to
encapsulate and separate concerns really cleanly. Custom hooks also compose
really nicely together to build more complex hooks out of more primitive ones.
Let's do this by creating a `useSetState` and `useSafeSetState`custom hook.

If you would like a more comprehensive `useSetState` hook, give
[`use-legacy-state`](https://github.com/suchipi/use-legacy-state) a try.

### [Track Values Over the Course of Renders with React useRef in a Custom usePrevious Hook](https://egghead.io/lessons/react-track-values-over-the-course-of-renders-with-react-useref-in-a-custom-useprevious-hook)

Our hook to track the previous values looks pretty useful, so let's extract that
into it's own custom React Hook called `usePrevious`.

### [Deeply Compare Inputs in a Custom React Hook for useEffect](https://egghead.io/lessons/react-deeply-compare-inputs-in-a-custom-react-hook-for-useeffect)

It would be nice if `useEffect` did the deep value comparison for us. Why don't
we make our own custom hook that does that for us? In this lesson we'll create a
`useDeepCompareEffect` which will allow us to use it just like a `useEffect`and
allow us to just pass the inputs.

### [Refactor a React Class Component with useContext and useState Hooks](https://egghead.io/lessons/react-refactor-a-react-class-component-with-usecontext-and-usestate-hooks)

We've got a pretty simple User class component that manages a bit of state and
uses some context. Let's refactor this over to a function component that uses
the `useContext` and `useState` hooks.

### [Refactor a render Prop Component to a Custom React Hook](https://egghead.io/lessons/react-refactor-a-render-prop-component-to-a-custom-react-hook)

Our `<Query />` component is a render prop based component that the `<User />`
component uses. But because it doesn't render anything, we can actually just
change it to a custom hook. Let's create a `useQuery` hook that returns the
state from the hooks the Query component uses and use that instead. But we'll
preserve the component so we don't have to refactor everywhere that uses the
Query render prop based component as well and we can keep our tests passing as
they are.

### [Handle componentDidMount and componentWillUnmount in React Component Refactor to Hooks](https://egghead.io/lessons/react-handle-componentdidmount-and-componentwillunmount-in-react-component-refactor-to-hooks)

Let's refactor our `GitHubClientProvider` class component to a function
component that uses hooks. This one's pretty interesting because we can use
`useEffect` to encapsulate everything we need for a single effect, truly
separating that concern within our component.

### [Dynamically Import React Components with React.lazy and Suspense](https://egghead.io/lessons/react-dynamically-import-react-components-with-react-lazy-and-suspense)

With React 16.6.0, React Suspense was officially released as a stable feature
(with limited support for `React.lazy`). Let's refactor our lazily-loaded
components that are using
[`react-loadable`](https://github.com/jamiebuilds/react-loadable) to components
that use the built-in `React.lazy`feature.

### [Preload React Components with the useEffect Hook](https://egghead.io/lessons/react-preload-react-components-with-the-useeffect-hook)

While users are filling out the form on our home page, it would be a good idea
to pre-load the next page they will be going to so they don't have to wait for
it to load once they've finished filling out the form. React's `useEffect` hook
makes this really easy.
