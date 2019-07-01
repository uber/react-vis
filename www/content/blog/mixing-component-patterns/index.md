---
slug: mixing-component-patterns
title: Mixing Component Patterns
date: '2018-05-07'
author: Kent C. Dodds
description: >-
  _Let's make a component that supports Render Props, Component Injection,
  Compound Components, the Provider Pattern, and Higher Order..._
keywords:
  - react
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [rawpixel.com](https://unsplash.com/photos/AWX44zfMV-M) on
  [Unsplash](https://unsplash.com)'
---

_Let's make a component that supports Render Props, Component Injection,
Compound Components, the Provider Pattern, and Higher Order Components!_

This last week I gave three workshops at
[Frontend Masters](https://frontendmasters.com):

- ⚛️ 💯
  [Advanced React Patterns](https://frontendmasters.com/workshops/advanced-react-patterns)
- 📚 ⚠️
  [Testing Practices and Principles](https://frontendmasters.com/workshops/testing-practices-principles)
- ⚛️ ⚠️
  [Testing React Applications](https://frontendmasters.com/workshops/testing-react-apps)

If you're a Frontend Masters subscriber you can watch the unedited version of
these courses now. Edited courses should be available for these soon.

The Advanced React Patterns course went especially well. I want to take some of
the things that I taught in that workshop and share it with you all + take a it
a little further than I took it in the course.

I've created [a CodeSandbox](https://codesandbox.io/s/534rnk5yyx) that I really
suggest you spend a solid 10 minutes reading through. I added a TON of comments
to the code to walk you through combining **all of the following patterns in a
single component**:

- Compound Components
- Render Props
- Component Injection
- Provider Pattern
- Higher Order Components

Here's the implementation without any comments just to spark your interest:

```jsx
import React from 'react'
import {render} from 'react-dom'
import hoistNonReactStatics from 'hoist-non-react-statics'
import {Switch} from './switch'

const callAll = (...fns) => (...args) => fns.forEach(fn => fn && fn(...args))
const ToggleContext = React.createContext({
  on: false,
  toggle: () => {},
  getTogglerProps: props => props,
})

class Toggle extends React.Component {
  static Consumer = props => (
    <ToggleContext.Consumer {...props}>
      {state => Toggle.getUI(props.children, state)}
    </ToggleContext.Consumer>
  )
  static On = ({children}) => (
    <Toggle.Consumer>{({on}) => (on ? children : null)}</Toggle.Consumer>
  )
  static Off = ({children}) => (
    <Toggle.Consumer>{({on}) => (on ? null : children)}</Toggle.Consumer>
  )
  static Button = props => (
    <Toggle.Consumer>
      {({getTogglerProps}) => <Switch {...getTogglerProps(props)} />}
    </Toggle.Consumer>
  )
  static getUI(children, state) {
    let ui
    if (Array.isArray(children) || React.isValidElement(children)) {
      ui = children
    } else if (children.prototype && children.prototype.isReactComponent) {
      ui = React.createElement(children, state)
    } else if (typeof children === 'function') {
      ui = children(state)
    } else {
      throw new Error('Please use one of the supported APIs for children')
    }
    return ui
  }
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getTogglerProps = ({onClick, ...props} = {}) => ({
    onClick: callAll(onClick, this.toggle),
    'aria-pressed': this.state.on,
    ...props,
  })
  state = {
    on: false,
    toggle: this.toggle,
    getTogglerProps: this.getTogglerProps,
  }
  render() {
    const {children, ...rest} = this.props
    return (
      <ToggleContext.Provider value={this.state} {...rest}>
        {Toggle.getUI(children, this.state)}
      </ToggleContext.Provider>
    )
  }
}
Toggle.Consumer.displayName = 'Toggle.Consumer'
Toggle.On.displayName = 'Toggle.On'
Toggle.Off.displayName = 'Toggle.Off'
Toggle.Button.displayName = 'Toggle.Button'

function withToggle(Component) {
  function Wrapper(props, ref) {
    return (
      <Toggle.Consumer>
        {toggleState => <Component {...props} toggle={toggleState} ref={ref} />}
      </Toggle.Consumer>
    )
  }
  Wrapper.displayName = `withToggle(${Component.displayName || Component.name})`
  const WrapperWithRef = React.forwardRef(Wrapper)
  hoistNonReactStatics(WrapperWithRef, Component)
  return WrapperWithRef
}

export {Toggle, withToggle}
```

That's pretty much it for the newsletter today actually. I spent a good chunk of
time preparing that codesandbox so give it a good solid look!

✨ [**codesandbox.io/s/534rnk5yyx**](https://codesandbox.io/s/534rnk5yyx) ✨

The idea isn't necessarily to encourage that every component be implemented like
this one, but more to show how you could use these patterns together to make an
extremely flexible API for situations where that's useful. If you are going to
choose only one pattern, I recommend the render props pattern, because all the
other patterns can be implemented on top of this one and it's the simplest from
a consumer's point of view.

Enjoy [the codesandbox](https://codesandbox.io/s/534rnk5yyx). And good luck!
