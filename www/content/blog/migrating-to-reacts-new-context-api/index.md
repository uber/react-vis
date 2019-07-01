---
slug: migrating-to-reacts-new-context-api
title: Migrating to React's New Context API
date: '2018-04-23'
author: React Vis
description: _Let's compare the before/after of React's new context API._
keywords:
  - react
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Marion Michele](https://unsplash.com/photos/z_eFLP9aS6s) on
  [Unsplash](https://unsplash.com)'
---

With
[the recent release of React 16.3.0](https://reactjs.org/blog/2018/03/29/react-v-16-3.html)
came an official context API. You can learn more about the why and how behind
this API from my previous blog post:
["React's ⚛️ new Context API"](/blog/reacts-new-context-api). Because of this
significant change, I'm making an update to
[my advanced component patterns course on egghead.io](https://egghead.io/courses/advanced-react-component-patterns)
to use the new API rather than the old one. As I've been working on updating the
course, I've been migrating from the old context API to the new one and I
thought I'd show you some of those changes!

In my course, I have a section that shows how to write
[compound components](https://egghead.io/lessons/react-make-compound-react-components-flexible)
([a trick I learned](https://youtu.be/hEGg-3pIHlE) from
[Ryan Florence](https://twitter.com/ryanflorence)) that use the context API.

### Example Usage

Here's the usage example of the Toggle component that exposes a compound
components API:

```jsx
function Usage(props) {
  return (
    <Toggle onToggle={props.onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  )
}
```

The idea behind the compound components pattern is that it allows you to have
components that share implicit state with each other. You can actually use
`React.Children.map` to accomplish it for
[the simple case](https://egghead.io/lessons/react-write-compound-components),
but in this case we need context to share any state at any place in the react
tree.

### The Old Context API

Here's the version of the implementation with the old context API:

```jsx
const TOGGLE_CONTEXT = '__toggle__'
function ToggleOn({children}, context) {
  const {on} = context[TOGGLE_CONTEXT]
  return on ? children : null
}
ToggleOn.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}
function ToggleOff({children}, context) {
  const {on} = context[TOGGLE_CONTEXT]
  return on ? null : children
}
ToggleOff.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}
function ToggleButton(props, context) {
  const {on, toggle} = context[TOGGLE_CONTEXT]
  return <Switch on={on} onClick={toggle} {...props} />
}
ToggleButton.contextTypes = {
  [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
}
class Toggle extends React.Component {
  static On = ToggleOn
  static Off = ToggleOff
  static Button = ToggleButton
  static defaultProps = {onToggle: () => {}}
  static childContextTypes = {
    [TOGGLE_CONTEXT]: PropTypes.object.isRequired,
  }
  state = {on: false}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getChildContext() {
    return {
      [TOGGLE_CONTEXT]: {
        on: this.state.on,
        toggle: this.toggle,
      },
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}
```

With the old API, you had to specify a string for what context your component
would provide in `getChildContext` and `childContextTypes` and then specify that
same string in the consuming components with `contextTypes`. I never liked this
[indirection](https://en.wikipedia.org/wiki/Indirection) and normally avoided
the problem by making a variable like I do above. In addition, having to attach
static properties to the consumers so they could accept the context values
wasn't my favorite thing to do either.

Another problem with this API is that it didn't allow values to be updated
through a `shouldComponentUpdate` that returned `false`. So I had an entire
other lesson to demonstrate how to work around that issue:
["Rerender Descendants Through shouldComponentUpdate"](https://egghead.io/lessons/react-rerender-descendants-through-shouldcomponentupdate)
(hat-tip to [Michael Jackson](https://twitter.com/mjackson) and
[Ryan Florence](https://twitter.com/ryanflorence) for
[react-broadcast](https://github.com/ReactTraining/react-broadcast)).

### The New Context API

The new API doesn't have these problems, which is some of the reason I'm so
excited about it. Here's my new version of this same exercise:

```jsx
const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
})

class Toggle extends React.Component {
  static On = ({children}) => (
    <ToggleContext.Consumer>
      {({on}) => (on ? children : null)}
    </ToggleContext.Consumer>
  )
  static Off = ({children}) => (
    <ToggleContext.Consumer>
      {({on}) => (on ? null : children)}
    </ToggleContext.Consumer>
  )
  static Button = props => (
    <ToggleContext.Consumer>
      {({on, toggle}) => <Switch on={on} onClick={toggle} {...props} />}
    </ToggleContext.Consumer>
  )
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  state = {on: false, toggle: this.toggle}
  render() {
    return (
      <ToggleContext.Provider value={this.state}>
        {this.props.children}
      </ToggleContext.Provider>
    )
  }
}
```

A few things stand out to me in the changes here. As I said, the problems with
the old API are gone. Now, rather than the indirection of strings you have
explicit components that you must use in order to provide and consume context.
You no longer need odd properties to make things work but instead use simple
components.

Things are still a tad verbose with those compound components though. Every one
of them needs to use the consumer (just like every one of them needed static
properties). You can solve that problem (for both APIs) with
[a render-prop-based Higher Order Component](https://egghead.io/lessons/react-implement-a-higher-order-component-with-render-props).
In this case I wouldn't bother though, it's pretty simple.

The other problem that goes away is updates through `shouldComponentUpdate`
returning `false`. React's new context API takes care of that for you.

Another thing I love about this is because the consumers are using a render prop
API they are highly composable making it possible to do just about anything with
them and expose a nice clean API on top because of the dynamic composability of
render props (as opposed to the static composability of the old API).

### Issues with the New API

One very common pitfall that I'm sure we'll be battling with forever is the
importance that the `value` prop you give to the `Provider` component is only
changed when you want consumers to re-render. **This means that doing
`value={{on: this.state.on, toggle: this.toggle}}` in our `render` method is
inadvisable because that creates a new object every time `render` is called,
even if state didn't actually change.** Because it's a new object, all the
consumers will also be re-rendered.

The impact of this will vary greatly in practice, but in general it's better to
provide a value that only changes when state changes (and consumers need to be
re-rendered). This is why I say `value={this.state}`. If you'd prefer not to
expose the entire state object to consumers, then you could use
[this trick](https://twitter.com/ryanflorence/status/981179212147998721) I got
from [Ryan Florence](https://twitter.com/ryanflorence).

One slight issue I have with this is that I have to put the `toggle` method into
`state` and that feels odd to me, but it's an implementation detail that's not a
big deal I think.

### Conclusion

After converting a few context using components over to the new API I'm
reassured that the React team gave us something brilliant. I love this new API
and I'm eager to see how the community embraces it! I hope you enjoy it. Good
luck!

_P.S. I should note that if you're unable to upgrade to react@16.3.0, you can
still use this API via a polyfill:_
[_create-react-context_](https://www.npmjs.com/package/create-react-context)_._

**Learn more about React from me**:

- [Frontend Masters](https://frontendmasters.com/workshops/advanced-react-patterns) — My
  Advanced Component Patterns workshop I gave in person in Minneapolis in April!
  It should be made a course soon, but it's available for review by subscribers
  today!
- [Workshop.me](https://workshop.me/2018-07-advanced-react?a=kent) — I'm giving
  my Advanced Component Patterns workshop in person in Portland in July!
- [Workshop.me](https://workshop.me/2018-07-es6?a=kent) — I'm giving my ES6 and
  Beyond workshop in person in Salt Lake City in July!
- [Workshop.me](https://workshop.me/2018-08-react-intro?a=kent) — I'm giving my
  Intro to React workshop in person in Salt Lake City in August!
- [Workshop.me](https://workshop.me/2018-08-advanced-react?a=kent) — I'm giving
  my Advanced Component Patterns workshop in person in Salt Lake City in August!

**Things to not miss**:

- ["Quick Guide to TDD in React"](https://medium.com/@mbaranovski/quick-guide-to-tdd-in-react-81888be67c64)
  by [Michał Baranowski](https://twitter.com/baranovskim). A great blog post
  featuring [react-testing-library](http://git.io/react-testing-library)!
