---
slug: 'how-to-know-what-to-test'
title: 'How to know what to test'
date: '2019-04-13'
author: 'React Vis'
description: '_Practical advice to help you determine what to test._'
categories:
  - 'testing'
keywords:
  - testing
  - javascript
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Craig  Whitehead](https://unsplash.com/photos/aJfy0WtHtkc)'
---

Knowing how to test is great and important. I've created a LOT of content that
teaches people the fundamentals of testing, how to configure tools, how to write
tests for specific scenarios, and so on. But knowing _how_ to write tests is
only half the battle to achieve confidence in your application. Knowing _what_
to test is the other–very important–battle.

In my [workshop material](/workshops) and on
[TestingJavaScript.com](https://testingjavascript.com), I do talk about how to
know what to test, but I get asked about this enough that I thought it would be
good to write a blog post about it. So here you go!

## Remembering why we test

**We write tests to be confident that our application will work when the user
uses them.** Some people write tests to enhance their workflow as well and
that's great, but I'm ultimately interested in confidence. That being the case,
what we test should map directly to enhancing our confidence. Here's the key
point I want you to consider when writing tests:

> **Think less about the code you are testing and more about the use cases that
> code supports.**

When you think about the code itself, it's too easy and natural to start testing
implementation details
([which is road to disaster](/blog/testing-implementation-details)).

Thinking about use cases though gets us closer to writing tests the way the user
uses the application:

> The more your tests resemble the way your software is used, the more
> confidence they can give you. <span style={{paddingTop: 10, float: 'right'}}>–
> <a href="https://twitter.com/react-vis/status/977018512689455106" target="_blank" rel="noopener noreferrer">me,
> on twitter</a></span>

## Code Coverage < Use Case Coverage

Code coverage is a metric that shows us what lines of our code is being run
during the tests. Let's use this code as an example:

```javascript
function arrayify(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else if (!maybeArray) {
    return []
  } else {
    return [maybeArray]
  }
}
```

Right now, we have no tests for this function, so our code coverage report will
indicate that we have `0%` coverage of this function. The code coverage report
in this case helps give us an idea that tests are needed, but it does NOT tell
us what's important about this function, **nor does it tell us the use cases
this function supports** which is the most important consideration we keep in
mind as we write tests.

In fact, when considering an entire application and wondering what to test, the
coverage report does a very poor job of giving us insight into where we should
be spending most of our time.

So the coverage report helps us identify what code in our codebase is missing
tests. So when you look at a code coverage report and note the lines that are
missing tests, don't think about the ifs/elses, loops, or lifecycles. Instead
ask yourself:

> What use cases are these lines of code supporting, and what tests can I add to
> support those use cases?

"Use Case Coverage" tells us how many of the use cases our tests support.
Unfortunately, there's no such thing as an automated "Use Case Coverage Report."
We have to make that up ourselves. But the code coverage report can sometimes
help us identify use cases that we're not covering. Let's try it out.

So if we read at the code and consider it for a minute, we can identify our
first use case to support: "it returns an array if given an array." This use
case statement is actually a great title for our test.

```javascript
test('returns an array if given an array', () => {
  expect(arrayify(['Elephant', 'Giraffe'])).toEqual(['Elephant', 'Giraffe'])
})
```

And with that test in place, our coverage report looks something like this
(highlighted lines are covered):

```javascript {1-3}
function arrayify(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else if (!maybeArray) {
    return []
  } else {
    return [maybeArray]
  }
}
```

Now, we can look at the remaining lines and determine that there are two more
use cases that our tests don't support yet:

- it returns an empty array if given a falsy value
- it returns an array with the given argument if it's not an array or falsy

Let's add tests for those use cases and see how it effects the code coverage.

```javascript
test('returns an empty array if given a falsy value', () => {
  expect(arrayify()).toEqual([])
})
```

```javascript {1-5}
function arrayify(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else if (!maybeArray) {
    return []
  } else {
    return [maybeArray]
  }
}
```

Nice, almost there!

```javascript
test(`returns an array with the given argument if it's not an array or falsy`, () => {
  expect(arrayify('Leopard')).toEqual(['Leopard'])
})
```

```javascript {1-9}
function arrayify(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else if (!maybeArray) {
    return []
  } else {
    return [maybeArray]
  }
}
```

Cool! Now we can be confident that so long as we don't need to change the use
cases of this function, our tests will continue to pass.

Code coverage is not a perfect metric, but it can be a useful tool in
identifying what parts of our codebase are missing "use case coverage".

## Code coverage can hide use cases

Sometimes, our code coverage report indicates 100% code coverage, but not 100%
use case coverage. This is why sometimes I try to think of all the use cases
before I even start writing the tests.

For example, let's imagine that the `arrayify` function had been implemented
like this instead:

```javascript
function arrayify(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  } else {
    return [maybeArray].filter(Boolean)
  }
}
```

With that, we can get 100% coverage with the following two use cases:

- it returns an array if given an array
- it returns an array with the given argument if it's not an array

But if we could look at a _use case_ coverage report, it would indicate that
we're missing this use case:

- it returns an empty array if given a falsy value

This could be bad because now our tests aren't giving us as much confidence that
our code will work when users use it like this: `arrayify()`. Right now, it's
fine because even though we don't have a test for it, our code supports that use
case. But the reason we have tests in place is to ensure that code continues to
support the use cases we intend it to support, even as things change.

So, as an example for how missing this test can go wrong, someone could come
around, see that `.filter(Boolean)` thing and think: "Huh, that's weird... I
wonder if we really need that." So they remove it, and our tests continue to
pass, but any code that relied on the falsy behavior is now broken.

Key takeaway: **Test use cases, not code.**

## How does this apply to React?

When writing code, remember that you already have two users that you need to
support: End users, and developer users. Again, if you think about the code
rather than the use cases, it becomes dangerously natural to start testing
implementation details. When you do that, your code now has a third user.

Here are a few aspects of React that people often think about testing which
results in implementation details tests. For all of these, rather than thinking
about the code, think about the observable effect that code has for the end user
and developer user, that's your use case, test that.

- Lifecycle methods
- Element event handlers
- Internal Component State

Conversely, here are things that you should be testing because they concern your
two users. Each of these could change the DOM, make HTTP requests, call a
callback prop, or perform any other number of _observable_ side effects which
would be useful to test:

- User interactions (using
  [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events)
  from react-testing-library): Is the end user able to interact with the
  elements that the component renders?
- Changing props (using
  [`rerender`](https://testing-library.com/docs/react-testing-library/api#rerender)
  from react-testing-library): What happens when the developer user re-renders
  your component with new props?
- Context changes (using
  [`rerender`](https://testing-library.com/docs/react-testing-library/api#rerender)
  from react-testing-library): What happens when the developer user changes
  context resulting in your component re-rendering?
- Subscription changes: What happens when an event emitter the component
  subscribes to changes? (Like firebase, a redux store, a router, a media query,
  or DOM-based subscriptions like online status)

## How do I know where to start in an app?

So we know how to think about what to test for individual components and even
pages of our app, but where do you start? It's a bit overwhelming. Especially if
you're just getting started with testing in a large app.

So here's what you do, consider your app from the user's point of view and ask:

> What part of this app would make me most upset if it were broken?

Alternatively, and more generally:

> What would be the worst thing to break in this app?

I'd suggest making a list of features that your application supports and
prioritize them based on this criteria. It's a great exercise to do with your
team and manager. This meeting will have the side-effect of helping everyone in
the room understand the importance of testing and hopefully convince them that
it should receive some level of prioritization in all the other feature work you
need to do.

Once you have that prioritized list, then I suggest writing a single end to end
(E2E) test to cover the "happy path" that most of your users go through for the
particular use case. Often you can cover parts of several of the top features on
your list this way. This may take a little while to get set up, but it'll give
you a HUGE bang for your buck.

The E2E tests aren't going to give you 100% use case coverage (and you should
not even try), nor will they give you 100% code coverage (and you should not
even record that for E2E tests anyway), but it will give you a great starting
point and boost your confidence big time.

Once you have a few E2E tests in place, then you can start looking at writing
some integration tests for some of the edge cases that you are missing in your
E2E tests and unit tests for the more complex business logic that those features
are using. From here it just becomes a matter of adding tests over time. Just
don't bother with targeting a 100% code coverage report, it's not worth the
time.

> For more on establishing a culture of testing and reasonable code coverage
> targets, I suggest watching [Aaron Abramov's](https://twitter.com/aarondjents)
> talk at [AssertJS 2018](https://2018.assertjs.com):
> [Establishing testing patterns with software design principles](https://youtu.be/_pnW-JjmyXE&list=PLZ66c9_z3umNSrKSb5cmpxdXZcIPNvKGw)

<!-- force a break between these comments... -->

> Read more about the distinction between the different types of tests here:
> [Static vs Unit vs Integration vs E2E Testing for Frontend Apps](/blog/unit-vs-integration-vs-e2e-tests)

## Conclusion

Given enough time and experience, you develop an intuition for knowing what to
test. You'll probably make mistakes and struggle a bit. Don't give up! Keep
going. Good luck.
