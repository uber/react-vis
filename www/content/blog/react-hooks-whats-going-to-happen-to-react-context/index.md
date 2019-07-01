---
slug: react-hooks-whats-going-to-happen-to-react-context
title: "React Hooks: What's going to happen to react context?"
date: '2018-12-17'
author: React Vis
description: >-
  _With the cool new stuff coming to React (Hooks/Suspense), what's going to
  happen to the context api?_
keywords:
  - javascript
  - react
  - react Context
  - react hooks
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Joel Fulgencio](https://unsplash.com/photos/VSrHD079L78) on
  [Unsplash](https://unsplash.com)'
---

Earlier this year, the React team introduced the first official context API.
[I blogged about that new API](/blog/reacts-new-context-api) and people got
sufficiently and reasonably hyped.

One common complaint that I knew people were going to have when applying it
practically was the fact that the context consumer is a render-prop based API.
This can lead to a lot of nesting when you need to consume multiple contexts and
other render-prop based APIs as well (for logic reuse). So I addressed that in
the blog post by suggesting that you could combine all of the render-prop based
APIs into a single function component and consume that:

```jsx
const ThemeContext = React.createContext('light')
class ThemeProvider extends React.Component {
  /* code */
}
const ThemeConsumer = ThemeContext.Consumer
const LanguageContext = React.createContext('en')
class LanguageProvider extends React.Component {
  /* code */
}
const LanguageConsumer = LanguageContext.Consumer

function AppProviders({children}) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  )
}

function ThemeAndLanguageConsumer({children}) {
  return (
    <LanguageConsumer>
      {language => (
        <ThemeConsumer>{theme => children({language, theme})}</ThemeConsumer>
      )}
    </LanguageConsumer>
  )
}

function App() {
  return (
    <AppProviders>
      <ThemeAndLanguageConsumer>
        {({theme, language}) => (
          <div>
            {theme} and {language}
          </div>
        )}
      </ThemeAndLanguageConsumer>
    </AppProviders>
  )
}
```

As much as this solution works thanks to the composability of React components,
I'm still not super thrilled with it. And I'm not the only one:

> _We've heard feedback that adopting the new render prop API can be difficult
> in class components. So we've added a convenience API to_ >
> [_consume a context value from within a class component_](https://reactjs.org/docs/context.html#classcontexttype)_. — _[_React v16.6.0: lazy, memo and contextType_](https://reactjs.org/blog/2018/10/23/react-v-16-6.html)

This new convenience API means that if you use a class component and you're only
consuming one context, you can simply define a static property called
`contextType` and assign it to the context you want to consume, then you can
access the context via `this.context`. It's pretty neat and a nice trick for
common cases where you only consume a single context.

I've used this convenience API and I love it. But I'm even more excited about
the implications that React Hooks have for the future of React context. Let's
rewrite what we have above with the upcoming (ALPHA!) `useContext` hook:

```jsx
const ThemeContext = React.createContext('light')
class ThemeProvider extends React.Component {
  /* code */
}
const LanguageContext = React.createContext('en')
class LanguageProvider extends React.Component {
  /* code */
}

function AppProviders({children}) {
  return (
    <LanguageProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LanguageProvider>
  )
}

function App() {
  const theme = useContext(ThemeContext)
  const language = useContext(LanguageContext)
  return (
    <div>
      {theme} and {language}
    </div>
  )
}

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
```

WOWZA! As powerful as the render-prop based consumers are, this is even easier
to read, understand, refactor, and maintain! And it's not just less code for
less code's sake. Besides, often when we reduce the amount of code we also
reduce the clarity of communication that code can give to us. But in this case,
it's less code _and_ it's easier to understand. I think that's a big win and a
huge feature of the new hooks API.

Another big feature of React hooks is the fact that it's completely opt-in and
backward compatible. I'm given such a huge amount of comfort knowing that
Facebook can't make decisions that will cause grief to the engineers who are
working on _the_ oldest and one of the largest React codebases in the world. The
fact that React has incrementally taken us to this new world of hooks is just
fantastic. Thanks React team! Looking forward to the official release!

### Conclusion

One of the coolest things about React is that it allows us to focus on solving
real-world problems without normally having to get too close to the
implementation of things. It's been a long time since I had to deal with
cross-browser or performance issues with any degree of regularity. And now React
is taking it even further and simplifying things so the code that I do write is
simpler to read, understand refactor, and maintain. I just love that. Makes me
wonder if there may be some things I could do about my code to simplify things
for other people as well 🤔.

Until next time! Good luck! 👋

**Things to not miss**:

- [Simplify React Apps with React Hooks and Suspense](http://kcd.im/refactor-react) — My
  new egghead course... of course!
- [Shurlan](http://kcd.im/shurlan) — I WON [NANOWRIMO](https://nanowrimo.org)
  THIS YEAR! That means that I successfully wrote 50,000 words of a novel in the
  month of November (for perspective, Harry Potter book 1 is 76k words). It was
  a wild month, and it was tons of fun. And you can read what I ended up with.
  It's a fantasy novel about a utopian world where things start to go bad and a
  14-year-old girl is tasked with stopping a rebellion from inadvertently
  destroying the city. I think you'll love the characters, plot, and magic
  system :)
- [React 16.x Roadmap](https://reactjs.org/blog/2018/11/27/react-16-roadmap.html) — Tl;DR:
  React 16.6: Suspense for Code Splitting (already shipped), React 16.7: React
  Hooks (~Q1 2019), React 16.8: Concurrent Mode (~Q2 2019), React 16.9: Suspense
  for Data Fetching (~mid 2019)
- [Modern React Workshop: Hooks & Suspense](https://youtu.be/xcZXS_VEJS0&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — a
  recording of a livestream I did last week at PayPal.
  [Here's the workshop repo](https://github.com/react-vis/modern-react) and
  [here's the part 2](https://youtu.be/NKAfuguroRY&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf).
