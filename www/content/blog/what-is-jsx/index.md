---
slug: what-is-jsx
title: What is JSX?
date: '2018-07-09'
author: Kent C. Dodds
description: >-
  _You may use it every day, but have you seen what happens after Babel compiles
  it?_
keywords:
  - react
  - javascript
  - Jsx
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Matt Bowden](https://unsplash.com/photos/Er3WYEslTBk) on
  [Unsplash](https://unsplash.com) (plus the react_logo)'
---

I think a critical part of understanding how to use React effectively is
understanding JavaScript and JavaScript expressions. So I'm going to show you a
few examples of JSX and it's compiled version to help give you an idea of how
this all works. As soon as you can compile JSX in your head, you can use the
abstraction more powerfully.

Here's our simplest example:

> Note, all examples assign to a variable `ui` just to illustrate that these are
> regular JavaScript expressions that you can assign to a variable.

```jsx
ui = <div id="root">Hello world</div>
ui = React.createElement('div', {id: 'root'}, 'Hello world')
```

As shown above, the JSX is compiled to `React.createElement`. The API to
`React.createElement` is:

```js
function createElement(elementType, props, ...children) {}
```

- `elementType` can be a string or a function (class) for the type of element to
  be created
- `props` is an object for the props we want applied to the element (or `null`
  if we specify no props)
- `...children` is all the children we want applied to the element too. This is
  just a convenience and we could write an equivalent to above with:

```js
ui = React.createElement('div', {id: 'root', children: 'Hello world'})
```

If you have more than one child then you use an array:

```jsx
ui = (
  <div>
    <span>Hello</span> <span>World</span>
  </div>
)
ui = React.createElement('div', {
  children: [
    React.createElement('span', null, 'Hello'),
    ' ',
    React.createElement('span', null, 'World'),
  ],
})

// Note: babel uses the third argument for children:
ui = React.createElement(
  'div', // type
  null, // props
  // children are the rest:
  React.createElement('span', null, 'Hello'),
  ' ',
  React.createElement('span', null, 'World'),
)
```

What you get back from a `React.createElement` call is actually a simple object:

```js
// <div id="root">Hello world</div>
{
  type: "div",
  key: null,
  ref: null,
  props: { id: "root", children: "Hello world" },
  _owner: null,
  _store: {}
};
```

When you pass an object like that to `ReactDOM.render` or any other renderer,
it's the renderer's job to interpret that element object and create DOM nodes or
whatever else out of it. Neat right?!

Here are a few more examples for you:

```jsx
ui = <div>Hello {subject}</div>
ui = React.createElement('div', null, 'Hello ', subject)

ui = (
  <div>
    {greeting} {subject}
  </div>
)
ui = React.createElement('div', null, greeting, ' ', subject)

ui = <button onClick={() => {}}>click me</button>
ui = React.createElement('button', {onClick: () => {}}, 'click me')

ui = <div>{error ? <span>{error}</span> : <span>good to go</span>}</div>
ui = React.createElement(
  'div',
  null,
  error
    ? React.createElement('span', null, error)
    : React.createElement('span', null, 'good to go'),
)

ui = (
  <div>
    {items.map(i => (
      <span key={i.id}>{i.content}</span>
    ))}
  </div>
)
ui = React.createElement(
  'div',
  null,
  items.map(i => React.createElement('span', {key: i.id}, i.content)),
)
```

Notice that whatever you put inside `{` and `}` is left alone. This is called an
interpolation and allows you to dynamically inject variables into the values of
props and children. Because of the way this works, the contents of an
interpolation must be JavaScript expressions because they're essentially the
right hand of an object assignment or used as an argument to a function call.

### Conclusion

If you'd like to play around with this some more, you can try online with
Babel's online REPL.
[Start here](http://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwEwlgbgfAEgpgGwQewAQHdkCcEmAenGgG4g&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=true&fileSize=false&sourceType=module&lineWrap=false&presets=react%2Cstage-2&prettier=true&targets=&version=6.26.0&envVersion=1.6.2).
Hopefully this helps you understand a little more about how JSX works and how
you can use it more effectively. Good luck!

**Learn more about React from me**:

- [The Beginner's Guide to React](http://kcd.im/beginner-react)
- [Advanced React Component Patterns](http://kcd.im/advanced-react) (also on
  [Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns)).

**Things to not miss**:

- ["Headless User Interface Components](https://medium.com/merrickchristensen/headless-user-interface-components-565b0c0f2e18) — "A
  headless user interface component is a component that offers maximum visual
  flexibility by providing no interface. "Wait for a second, are you advocating
  a user interface pattern that doesn't have a user interface?" Yes. That is
  exactly what I'm advocating." Brilliant article by my friend
  [Merrick Christensen](https://twitter.com/iammerrick).
- [vscode-go-to-file](https://github.com/jackfranklin/vscode-go-to-file) — A
  plugin that aims to replicate some of Vim's "go to file" (`gf`) functionality
  by the great [Jack Franklin](https://twitter.com/Jack_Franklin)
- [tabb](http://tabb-extension.com) — A Chrome extension to search, save, and
  manage your tabs, history, and bookmarks written in
  [Reason](https://reasonml.github.io) by my friend
  [Ethan Godt](https://twitter.com/ethangodt)
- [deps-report](https://github.com/pichillilorenzo/deps-report) — Generate
  reports about dependencies and dependents of your JavaScript/TypeScript files
  through an AST. It supports import and require statements. By the insightful
  [Lorenzo Pichilli](https://twitter.com/LorenzoPichilli).
