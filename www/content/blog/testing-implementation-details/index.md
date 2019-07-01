---
slug: testing-implementation-details
title: Testing Implementation Details
date: '2018-11-20'
author: React Vis
description: >-
  _Testing implementation details is a recipe for disaster. Why is that? And
  what does it even mean?_
keywords:
  - javascript
  - testing
  - react
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [rawpixel](https://unsplash.com/photos/1Z15APktAiY) on
  [Unsplash](https://unsplash.com)'
---

Last year when I was using enzyme (like everyone else at the time), I stepped
carefully around certain APIs in enzyme. I
[completely avoided shallow rendering](/blog/why-i-never-use-shallow-rendering),
_never_ used APIs like `instance()`, `state()`, or `find('ComponentName')`. And
in code reviews of other people's pull requests I explained again and again why
it's important to avoid these APIs. The reason is they each allow your test to
test implementation details of your components. People often ask me what I mean
by "implementation details." I mean, it's hard enough to test as it is! Why do
we have to make all these rules to make it harder?

### Why is testing implementation details bad?

There are two distinct reasons that it's important to avoid testing
implementation details. Tests which test implementation details:

1.  Can break when you refactor application code. **False negatives**
2.  May not fail when you break application code. **False positives**

Let's take a look at each of these in turn, using the following simple accordion
component as an example:

```jsx
// accordion.js
import React from 'react'
import AccordionContents from './accordion-contents'

class Accordion extends React.Component {
  state = {openIndex: 0}
  setOpenIndex = openIndex => this.setState({openIndex})
  render() {
    const {openIndex} = this.state
    return (
      <div>
        {this.props.items.map((item, index) => (
          <>
            <button onClick={() => this.setOpenIndex(index)}>
              {item.title}
            </button>
            {index === openIndex ? (
              <AccordionContents>{item.contents}</AccordionContents>
            ) : null}
          </>
        ))}
      </div>
    )
  }
}

export default Accordion
```

And here's a test that tests implementation details:

```jsx
// __tests__/accordion.enzyme.js
import React from 'react'
// if you're wondering why not shallow,
// then please read https://kcd.im/shallow
import Enzyme, {mount} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import Accordion from '../accordion'

// Setup enzyme's react adapter
Enzyme.configure({adapter: new EnzymeAdapter()})

test('setOpenIndex sets the open index state properly', () => {
  const wrapper = mount(<Accordion items={[]} />)
  expect(wrapper.state('openIndex')).toBe(0)
  wrapper.instance().setOpenIndex(1)
  expect(wrapper.state('openIndex')).toBe(1)
})

test('Accordion renders AccordionContents with the item contents', () => {
  const hats = {title: 'Favorite Hats', contents: 'Fedoras are classy'}
  const footware = {
    title: 'Favorite Footware',
    contents: 'Flipflops are the best',
  }
  const wrapper = mount(<Accordion items={[hats, footware]} />)
  expect(wrapper.find('AccordionContents').props().children).toBe(hats.contents)
})
```

Raise your hand if you've seen (or written) tests like this in your codebase
(🙌).

Ok, now let's take a look at how things break down with these tests...

### False negatives when refactoring

A surprising number of people find testing distasteful, especially UI testing.
Why is this? There are various reasons for it, but one big reason I hear again
and again is that people spend way too much time babysitting the tests. "Every
time I make a change to the code, the tests break!" This is a real drag on
productivity! Let's see how our tests fall prey to this frustrating problem.

Let's say I come in and I'm refactoring this accordion to prepare it to allow
for multiple accordion items to be open at once. A refactor doesn't change
existing behavior at all, it just changes the **implementation**. So let's
change the **implementation** in a way that doesn't change the behavior:

```diff
class Accordion extends React.Component {
-  state = {openIndex: 0}
-  setOpenIndex = openIndex => this.setState({openIndex})
+  state = {openIndexes: [0]}
+  setOpenIndex = openIndex => this.setState({openIndexes: [openIndex]})
   render() {
-    const {openIndex} = this.state
+    const {openIndexes} = this.state
     return (
       <div>
         {this.props.items.map((item, index) => (
           <>
             <button onClick={() => this.setOpenIndex(index)}>
               {item.title}
             </button>
-            {index === openIndex ? (
+            {openIndexes.includes(index) ? (
               <AccordionContents>{item.contents}</AccordionContents>
             ) : null}
           </>
         ))}
       </div>
     )
   }
 }
```

Awesome, we do a quick check in the app and everything's still working properly,
so when we come to this component later to support opening multiple accordions,
it'll be a cinch! Then we run the tests and 💥kaboom💥 they're busted. Which one
broke? `setOpenIndex sets the open index state properly`.

What's the error message?

```
expect(received).toBe(expected)

Expected value to be (using ===):
  0
Received:
  undefined
```

Is that test failure warning us of a real problem? Nope! The component still
works fine.

**This is what's called a false negative.** It means that we got a test failure,
but it was because of a broken test, not broken app code. I honestly cannot
think of a more annoying test failure situation. Oh well, let's go ahead and fix
our test:

```diff
 test('setOpenIndex sets the open index state properly', () => {
    const wrapper = mount(<Accordion items={[]} />)
-   expect(wrapper.state('openIndex')).toEqual(0)
+   expect(wrapper.state('openIndexes')).toEqual([0])
    wrapper.instance().setOpenIndex(1)
-   expect(wrapper.state('openIndex')).toEqual(1)
+   expect(wrapper.state('openIndexes')).toEqual([1])
})
```

The takeaway: Tests which test implementation details can give you a false
negative when you refactor your code. This leads to brittle and frustrating
tests that seem to break anytime you so much as look at the code.

### False positives

Ok, so now let's say your co-worker is working in the Accordion and they see
this code:

```jsx
<button onClick={() => this.setOpenIndex(index)}>{item.title}</button>
```

Immediately their premature performance optimization feelings kick in and they
say to themselves, "hey! inline arrow functions in `render` are
[bad for performance](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578),
so I'll just clean that up! I think this should work, I'll just change it really
quick and run tests."

```jsx
<button onClick={this.setOpenIndex}>{item.title}</button>
```

Cool. Run the tests and... ✅✅ awesome! They commit the code without checking
it in the browser because tests give confidence right? That commit goes in a
completely unrelated PR that changes thousands of lines of code and is
understandably missed. The accordion breaks in production and Nancy is unable to
get her tickets to see
[Wicked in Salt Lake next February](https://www.broadway-at-the-eccles.com/events/wicked).
Nancy is crying and your team feels horrible.

So what went wrong? Didn't we have a test to verify that the state changes when
`setOpenIndex` is called _and_ that the accordion contents are displayed
appropriately!? Yes you did! But the problem is that there was no test to verify
that the button was wired up to `setOpenIndex` correctly.

**This is called a false positive.** It means that we didn't get a test failure,
but we should have! So how do we cover ourselves to make sure this doesn't
happen again? We need to add another test to verify clicking the button updates
the state correctly. And then I need to add a coverage threshold of 100% code
coverage so we don't make this mistake again. Oh, and I should write a dozen or
so ESLint plugins to make sure people don't use these APIs that encourage
testing implementation details!

... But I'm not going to bother... Ugh, I'm just so tired of all these false
positives and negatives, I'd almost rather not write tests at all. DELETE ALL
THE TESTS! Wouldn't it be nice if we had a tool that had a wider
[pit](https://twitter.com/react-vis/status/859994199738900480) of
[success](https://blog.codinghorror.com/falling-into-the-pit-of-success)? Yes it
would! And guess what, we DO have such a tool!

### Implementation detail free testing

So we could rewrite all these tests with enzyme, limiting ourselves to APIs that
are free of implementation details, but instead, I'm just going to use
[react-testing-library](https://github.com/testing-library/react-testing-library)
which will make it very difficult to include implementation details in my tests.
Let's check that out now!

```jsx
// __tests__/accordion.rtl.js
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Accordion from '../accordion'

test('can open accordion items to see the contents', () => {
  const hats = {title: 'Favorite Hats', contents: 'Fedoras are classy'}
  const footware = {
    title: 'Favorite Footware',
    contents: 'Flipflops are the best',
  }
  const {getByText, queryByText} = render(
    <Accordion items={[hats, footware]} />,
  )

  expect(getByText(hats.contents)).toBeInTheDocument()
  expect(queryByText(footware.contents)).toBeNull()

  fireEvent.click(getByText(footware.title))

  expect(getByText(footware.contents)).toBeInTheDocument()
  expect(queryByText(hats.contents)).toBeNull()
})
```

Sweet! A single test that verifies all the behavior really well. And this test
passes whether my state is called `openIndex`, `openIndexes`, or `tacosAreTasty`
🌮. Nice! Got rid of that false negative! And if I wire up my click handler
incorrectly, this test will fail. Sweet, got rid of that false positive too! And
I didn't have to memorize any list of rules or install a bunch of annoying
ESLint plugins. I just use the tool in the typical usage, and I get a test that
actually can give me confidence my accordion is working as the user wants it
too.

### So... What are implementation details then?

Here's the simplest definition I can come up with:

> _Implementation details are things which users of your code will not typically
> use, see, or even know about._

So the first question we need an answer to is: "Who is the user of this code."
Well, the end user who will be interacting with our component in the browser is
definitely a user. They'll be observing and interacting with the rendered
buttons and contents. But we also have the developer who will be rendering the
accordion with props (in our case, a given list of items). So React components
typically have two users: end-users, and developers. **End-users and developers
are the two "users" that our application code needs to consider.**

Great, so what parts of our code do each of these users use, see, and know
about? The end user will see/interact with what we render in the `render`
method. The developer will see/interact with the props they pass to the
component. So our test should typically only see/interact with the props that
are passed, and the rendered output.

This is precisely what the
[react-testing-library](https://github.com/testing-library/react-testing-library)
test does. It passes fake props to the Accordion, then it interacts with the
rendered output by querying the output for the contents that will be displayed
to the user (or ensuring that it wont be displayed) and clicking the buttons
that are rendered.

Now consider the enzyme test. With enzyme, we access the `state` of `openIndex`.
This is not something that either of our users care about directly. They don't
know that's what it's called, they don't know whether the open index is stored
as a single primitive value, or stored as an array, and frankly they don't care.
They also don't know or care about the `setOpenIndex` method specifically. And
yet, our test knows about both of these implementation details.

This is what makes our enzyme test prone to false negatives. Because **by making
our test use the component differently than end-users and developers do, we
create a third user our application code needs to consider: the tests!** And
frankly, the tests are one user that nobody cares about. I don't want my
application code to consider the tests. What a complete waste of time. I don't
want tests that are written for their own sake. _Automated tests should verify
that the application code works for the production users._

> _[The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/react-vis/status/977018512689455106)
>  — me_

> Read more about this in [Avoid the Test User](/blog/avoid-the-test-user).

Oh, and [React Hooks](https://reactjs.org/hooks) got you all excited? If you
rewrite that accordion component to use React hooks, the enzyme test fails
terribly, while the
[react-testing-library](https://github.com/testing-library/react-testing-library)
test continues to work.

![happy goats](./images/0.gif)

### Conclusion

So how do you avoid testing implementation details? Using the right tools is a
good start. A few weeks ago I sent this process for how to know what to test,
following this process helps you have the right mindset when testing and you
will naturally avoid implementation details:

1.  What part of your untested codebase would be really bad if it broke? (The
    checkout process)
2.  Try to narrow it down to a unit or a few units of code (When clicking the
    "checkout" button a request with the cart items is sent to /checkout)
3.  Look at that code and consider who the "users" are (The developer rendering
    the checkout form, the end user clicking on the button)
4.  Write down a list of instructions for that user to manually test that code
    to make sure it's not broken. (render the form with some fake data in the
    cart, click the checkout button, ensure the mocked /checkout API was called
    with the right data, respond with a fake successful response, make sure the
    success message is displayed).
5.  Turn that list of instructions into an automated test.

I hope that's helpful to you! If you really want to take your testing to the
next level, then I definitely recommend you get a Pro license for
[TestingJavaScript.com](https://testingjavascript.com)🏆

Good luck!

P.S. If you'd like to play around with all this,
[here's a codesandbox](https://codesandbox.io/s/rlnw1r5nxo).

P.S.P.S. As an exercise for you... What happens to that second enzyme test if I
change the name of the `AccordionContents` component? {insert biggest eye roll
ever}
