---
slug: why-i-never-use-shallow-rendering
title: Why I Never Use Shallow Rendering
date: '2018-07-23'
author: React Vis
description: >-
  _Tests should help me be confident that my application is working and there
  are better ways to do that than shallow rendering._
keywords:
  - javascript
  - react
  - testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Teddy Kelley](https://unsplash.com/photos/okavjRLgnjo) on
  [Unsplash](https://unsplash.com)'
---

I remember a few years ago when I got started with React I decided I needed to
figure out how to test React components. I tried
[`shallow`](http://airbnb.io/enzyme/docs/api/shallow.html) from enzyme and
immediately decided that I would never use it to test my React components. I've
expressed this feeling on many occasions and get asked on a regular basis why I
feel the way I do about `shallow` rendering and why
[`react-testing-library`](https://github.com/testing-library/react-testing-library)
will never support `shallow` rendering.

So finally I'm coming out with it and explaining why I never use shallow
rendering and why I think nobody else should either. Here's my main assertion:

> **_With shallow rendering, I can refactor my component's implementation and my
> tests break. With shallow rendering, I can break my application and my tests
> say everything's still working._**

This is highly concerning to me because not only does it make testing
frustrating, but it also lulls you into a false sense of security. **The reason
I write tests is to be confident that my application works and there are far
better ways to do that than shallow rendering.**

### What even is shallow rendering?

For the purposes of this article, let's use this example as our subject under
test:

```jsx
import React from 'react'
import {CSSTransition} from 'react-transition-group'

function Fade({children, ...props}) {
  return (
    <CSSTransition {...props} timeout={1000} className="fade">
      {children}
    </CSSTransition>
  )
}

class HiddenMessage extends React.Component {
  static defaultProps = {initialShow: false}
  state = {show: this.props.initialShow}
  toggle = () => {
    this.setState(({show}) => ({show: !show}))
  }
  render() {
    return (
      <div>
        <button onClick={this.toggle}>Toggle</button>
        <Fade in={this.state.show}>
          <div>Hello world</div>
        </Fade>
      </div>
    )
  }
}

export {HiddenMessage}
```

Here's an example of a test that uses shallow rendering with enzyme:

```jsx
import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {HiddenMessage} from '../hidden-message'

Enzyme.configure({adapter: new Adapter()})

test('shallow', () => {
  const wrapper = shallow(<HiddenMessage initialShow={true} />)
  expect(wrapper.find('Fade').props()).toEqual({
    in: true,
    children: <div>Hello world</div>,
  })
  wrapper.find('button').simulate('click')
  expect(wrapper.find('Fade').props()).toEqual({
    in: false,
    children: <div>Hello world</div>,
  })
})
```

To understand shallow rendering, let's add a `console.log(wrapper.debug())`
which will log out the structure of what enzyme has rendered for us:

```jsx
<div>
  <button onClick={[Function]}>Toggle</button>
  <Fade in={true}>
    <div>Hello world</div>
  </Fade>
</div>
```

You'll notice that it's not actually showing the `CSSTransition` which is what
`Fade` is rendering. This is because instead of actually rendering components
and calling into the `Fade` component, shallow just looks at the props that
would be applied to the React elements created by the component you're shallowly
rendering. In fact, if I were to take the `render` method of the `HiddenMessage`
component and `console.log` what it's returning, I'd get something that looks a
bit like this:

```js
{
  "type": "div",
  "props": {
    "children": [
      {
        "type": "button",
        "props": {
          "onClick": [Function],
          "children": "Toggle"
        }
      },
      {
        "type": [Function: Fade],
        "props": {
          "in": true,
          "children": {
            "type": "div",
            "props": {
              "children": "Hello world"
            }
          }
        }
      }
    ]
  }
}
```

Look familiar? So all shallow rendering is doing is taking the result of the
given component's `render` method (which will be a React element (read
[What is JSX?](/blog/what-is-jsx))) and giving us a `wrapper` object with some
utilities for traversing this JavaScript object. This means it doesn't run
lifecycle methods (because we just have the React elements to deal with), it
doesn't allow you to actually interact with DOM elements (because nothing's
actually rendered), and it doesn't actually attempt to get the react elements
that are returned by your custom components (like our `Fade` component).

### Why people use shallow rendering

When I determined early on to never use shallow rendering, it was because I knew
that there were better ways to get at the things that shallow rendering makes
easy without making the trade-offs shallow rendering forces you to make.
[I recently asked folks](https://twitter.com/react-vis/status/1016084196421296133)
to tell me why they use shallow rendering. Here are a few of the things that
shallow rendering makes easier:

1.  [... for calling methods in React components](https://twitter.com/Raed667/status/1016095856481701888)
2.  [... it seems like a waste to render all of the children of each component under test, for every test, hundreds/thousands of times...](https://twitter.com/MattTrifilo/status/1016101577667403778)
3.  [For actual unit testing. Testing composed components introduces new dependencies that might trigger an error while the unit itself might still work as intended.](https://twitter.com/janhoogeveen/status/1016207627859251200)

There were more responses, but these sum up the main arguments for using shallow
rendering. Let's address each of these:

### Calling methods in react components

Have you ever seen or written a test that looks like this?

```jsx
test('toggle toggles the state of show', () => {
  const wrapper = shallow(<HiddenMessage initialShow={true} />)
  expect(wrapper.state().show).toBe(true) // initialized properly
  wrapper.instance().toggle()
  wrapper.update()
  expect(wrapper.state().show).toBe(false) // toggled
})
```

This is a great reason to use shallow rendering, but it's a really poor testing
practice. There are two really important things that I try to consider when
testing:

1.  Will this test break when there's a mistake that would break the component
    in production?
2.  Will this test continue to work when there's a fully backward compatible
    refactor of the component?

This kind of test fails both of those considerations:

1.  I could mistakenly set `onClick` of the `button` to `this.tgogle` instead of
    `this.toggle`. My test continues to work, but my component is broken.
2.  I could rename `toggle` to `handleButtonClick` (and update the corresponding
    `onClick` reference). My test breaks despite this being a refactor.

The reason this kind of test fails those considerations is because it's testing
irrelevant implementation details. The user doesn't care one bit what things are
called. In fact, that test doesn't even verify that the message is hidden
properly when the `show` state is `false` or shown when the `show` state is
`true`. So not only does the test not do a great job keeping us safe from
breakages, it's also flakey and doesn't actually test the reason the component
exists in the first place.

In summary, if your test uses `instance()` or `state()`, know that you're
testing things that the user couldn't possibly know about or even care about,
which will take your tests further from giving you confidence that things will
work when your user uses them.

### ... it seems like a waste ...

There's no getting around the fact that shallow rendering is faster than any
other form of testing react components. It's certainly way faster than mounting
a react component. But we're talking a handful of milliseconds here. Yes, it
will add up, but I'd gladly wait an extra few seconds or minutes for my tests to
finish in exchange for my tests actually giving me confidence that my
application will work when I ship it to users.

In addition to this, you should probably use Jest's capabilities for only
running tests relevant to your changes while developing your tests so the
difference wont be perceivable when running the test suite locally.

### For actual unit testing

This is a very common misconception: "To unit test a react component you must
use shallow rendering so other components are not rendered." It's true that
shallow rendering doesn't render other components (as demonstrated above),
what's wrong with this is that it's way too heavy handed because it doesn't
render _any_ other components. You don't get a choice.

Not only does shallow rendering not render third party components, it doesn't
even render in-file components. For example, the `<Fade />` component we have
above is an implementation detail of the `<HiddenMessage />` component, but
because we're shallow rendering `<Fade />` isn't rendered so changes to that
component could break our application but not our test. That's a major issue in
my mind and is evidence to me that we're testing implementation details.

In addition, you can _definitely_ unit test react components without shallow
rendering. Checkout the section near the end for an example of such a test (uses
react-testing-library, but you could do this with enzyme as well) that uses Jest
mocking to mock out the `<CSSTransition />` component.

I should add that I generally am against mocking even third party components
100% of the time. The argument for mocking third party components I often hear
is
[Testing composed components introduces new dependencies that might trigger an error while the unit itself might still work as intended.](https://twitter.com/janhoogeveen/status/1016207627859251200).
But isn't the point of testing to be confident the application works? Who cares
if your unit works if the app is broken? I _definitely_ want to know if the
third party component I'm using breaks my use case. I mean, I'm not going to
rewrite their entire test base, but if I can easily test my use case by _not_
mocking out their component then why not do that and get the extra confidence?

I should also add that
[I'm in favor of relying more heavily on integration testing](http://kcd.im/write-tests).
When you do this, you need to unit test fewer of your simple components and wind
up only having to unit test edge cases for components (which can mock all they
want). But even in these situations, I still think it leads to more confidence
and a more maintainable testbase when you're explicit about which components are
being mocked and which are being rendered by doing full mounting and explicit
mocks.

### Without shallow rendering

I'm a huge believer of the guiding principle of
[`react-testing-library`](https://github.com/testing-library/react-testing-library):

> [_The more your tests resemble the way your software is used, the more confidence they can give you._](https://twitter.com/react-vis/status/977018512689455106)_ — Kent
> C. Dodds 👋_

That's why I wrote the library in the first place. As a side-note to this
shallow rendering post, I want to mention there are fewer ways for you to do
things that are impossible for the user to do. Here's the list of things that
react-testing-library cannot do (out of the box):

1.  shallow rendering
2.  Static rendering (like enzyme's
    [`render`](http://airbnb.io/enzyme/docs/api/render.html) function).
3.  Pretty much most of enzyme's methods to query elements (like
    [`find`](http://airbnb.io/enzyme/docs/api/ReactWrapper/find.html)) which
    include the ability to find by a component class or even its `displayName`
    (again, the user does not care what your component is called and neither
    should your test). Note: react-testing-library supports querying for
    elements in ways that encourage accessibility in your components and more
    maintainable tests.
4.  Getting a component instance (like enzyme's
    [`instance`](http://airbnb.io/enzyme/docs/api/ReactWrapper/instance.html))
5.  Getting and setting a component's props (`props()`)
6.  Getting and setting a component's state (`state()`)

All of these things are things which users of your component cannot do, so your
tests shouldn't do them either. Below is a test of the `<HiddenMessage />`
component which resembles the way a user would use your component much more
closely. In addition, it can verify that you're using `<CSSTransition />`
properly (something the shallow rendering example was _incapable_ of doing).

```jsx
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {CSSTransition} from 'react-transition-group'
import {render, fireEvent} from 'react-testing-library'
import {HiddenMessage} from '../hidden-message'

// NOTE: you do NOT have to do this in every test.
// Learn more about Jest's __mocks__ directory:
// https://jestjs.io/docs/en/manual-mocks
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: jest.fn(({children, in: show}) => (show ? children : null)),
  }
})

test('you can mock things with jest.mock', () => {
  const {getByText, queryByText} = render(<HiddenMessage initialShow={true} />)
  const toggleButton = getByText('Toggle')

  const context = expect.any(Object)
  const children = expect.any(Object)
  const defaultProps = {children, timeout: 1000, className: 'fade'}

  expect(CSSTransition).toHaveBeenCalledWith(
    {in: true, ...defaultProps},
    context,
  )
  expect(getByText('Hello world')).not.toBeNull()

  CSSTransition.mockClear()

  fireEvent.click(toggleButton)

  expect(queryByText('Hello world')).toBeNull()
  expect(CSSTransition).toHaveBeenCalledWith(
    {in: false, ...defaultProps},
    context,
  )
})
```

### Conclusion

A few weeks ago, my [DevTipsWithKent](http://kcd.im/devtips) (my weekdaily
livestream on [YouTube](http://kcd.im/youtube)) I livestreamed
"[Migrating from shallow rendering react components to explicit component mocks](https://youtu.be/LHUdxkThTM0&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)".
In that I demonstrate some of the pitfalls of shallow rendering I describe above
as well as how to use jest mocking instead.

I hope this is helpful! We're all just trying our best to deliver an awesome
experience to users. I wish you luck in that endeavor!

#### P.S.

Someone brought this up after I emailed my newsletter out:

> Shallow wrapper is good to test small independent components. With proper
> serializer it allows to have clear and understandable snapshots.

I very rarely use snapshot testing with react and I certainly wouldn't use it
with shallow. That's a recipe for implementation details. The whole snapshot is
nothing but implementation details (it's full of component and prop names that
change all the time on refactors). It'll fail any time you touch the component
and the git diff for the snapshot will look almost identical to the one for your
changes to the component.

This will make people careless about to the snapshot updates because they change
all the time. So it's basically worthless (almost worse than no tests because it
makes you think you're covered when you're not and you won't write proper tests
because they're in place).

I do think that snapshots can be useful though. For more about this from me,
checkout another blog post:

[**Effective Snapshot Testing**](/blog/effective-snapshot-testing)

I hope that helps!

**Learn more about testing from me**:

- [Frontend Masters](https://frontendmasters.com):
  [Testing Practices and Principles](https://frontendmasters.com/workshops/testing-practices-principles)
  &
  [Testing React Applications](https://frontendmasters.com/courses/testing-react)
- [Confidently Ship Production React Apps](https://egghead.io/lessons/react-confidently-ship-production-react-apps) — Something
  new on [egghead.io](http://egghead.io). It's a recording of one of my talks
  especially for [egghead.io](http://egghead.io). I think you'll really enjoy it
  (and it's 🆓)
- [Write tests. Not too many. Mostly integration.](https://youtu.be/Fha2bVoC8SE&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — My
  talk at Assert.js conference
  ([and here's the blog post](http://kcd.im/write-tests))
- [Testing Practices and Principles](https://youtu.be/VQZx1Z3sW0E&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — A
  recording of my workshop at Assert.js

**Things to not miss**:

- [Avoid setState warnings on unmounted React components](https://youtu.be/8BNdxFzMeVg&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
- [Magic Move effect with JavaScript](https://youtu.be/3AaghqS3W4Y&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
