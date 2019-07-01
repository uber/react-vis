---
slug: making-your-ui-tests-resilient-to-change
title: Making your UI tests resilient to change
date: '2017-10-23'
author: React Vis
description: >-
  _User interface tests are famously finicky and prone to breakage. Let's talk
  about how to improve this._
keywords:
  - javascript
  - testing
  - Ui Testing
  - Unit Testing
  - Integration Testing
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Warren Wong](https://unsplash.com/photos/tHiGKAJxaA8) on
  [Unsplash](https://unsplash.com)'
---

You're a developer and you want to avoid shipping a broken login experience, so
you're writing some tests to make sure you don't. Let's get a quick look at
[an example of such a form](https://github.com/react-vis/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/client/src/screens/login.js#L50-L82):

![Login form from the Conduit App](./images/0.png)

```jsx
const form = (
  <form onSubmit={this.submitForm}>
    <fieldset>
      <fieldset className="form-group">
        <input
          className="email-field form-control form-control-lg"
          type="email"
          placeholder="Email"
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="password-field form-control form-control-lg"
          type="password"
          placeholder="Password"
        />
      </fieldset>
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled={this.props.inProgress}
      >
        Sign in
      </button>
    </fieldset>
  </form>
)
```

Now, if we were to test this form, we'd want to fill in the username, password,
and submit the form. To do that properly, we'd need to render the form and query
the document to find and operate on those nodes. Here's what you might try to do
to make that happen:

```js
const emailField = rootNode.querySelector('.email-field')
const passwordField = rootNode.querySelector('.password-field')
const submitButton = rootNode.querySelector('.btn')
```

And here's where the problem comes in. What happens when we add another button?
What if we added a "Sign up" button before the "Sign in" button?

```
<button
  className="btn btn-lg btn-secondary pull-xs-right"
  disabled={this.props.inProgress}
>
  Sign up
</button>
<button
  className="btn btn-lg btn-primary pull-xs-right"
  type="submit"
  disabled={this.props.inProgress}
>
  Sign in
</button>
```

Whelp, that's going to break our tests. Total bummer.

![total bummer...](./images/1.gif)

But that'd be pretty easy to fix right?

```js
// change this:
const submitButton = rootNode.querySelector('.btn')
// to this:
const submitButton = rootNode.querySelectorAll('.btn')[1]
```

And we're good to go! Well, if we start using CSS-in-JS to style our form and no
longer need the `email-field` and `password-field` class names, should we remove
those? Or do we keep them because our tests use them? Hmmmmmmm..... 🤔

What I don't like about using class names for my selectors is that normally we
think of class names as a way to style things. So when we start adding a bunch
of class names that are not for that purpose it makes it even **_harder_** to
know what those class names are for and when we can remove class names.

And if we simply try to reuse class names that we're already just using for
styling then we run into issues like the button up above. And _any time you have
to change your tests when you refactor or add a feature, that's an indication of
a brittle test_. The core issue is that the relationship between the test and
the source code is too implicit. We can overcome this issue if we **make that
relationship more explicit.**

If we could add some metadata to the element we're trying to select that would
solve the problem. Well guess what! There's actually an existing API for this!
It's `data-` attributes!

![Data from Star Trek The Next Generation saying YES](./images/2.gif)

So let's update our form to use `data-` attributes:

```jsx
const form = (
  <form onSubmit={this.submitForm}>
    <fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="email"
          placeholder="Email"
          data-testid="email"
        />
      </fieldset>
      <fieldset className="form-group">
        <input
          className="form-control form-control-lg"
          type="password"
          placeholder="Password"
          data-testid="password"
        />
      </fieldset>
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled={this.props.inProgress}
        data-testid="submit"
      >
        Sign in
      </button>
    </fieldset>
  </form>
)
```

And now, with those attributes, our selectors look like this:

```js
const emailField = rootNode.querySelector('[data-testid="email"]')
const passwordField = rootNode.querySelector('[data-testid="password"]')
const submitButton = rootNode.querySelector('[data-testid="submit"]')
```

Awesome! So now, no matter how we change our markup, as long as we keep those
`data-testid` attributes intact, then our tests wont break. Plus, _it's much
more clear what the purpose of these attributes is which makes our code more
maintainable as well._

Here's a little utility called `sel` (short for `select`) that I use sometimes
to make this a little easier:

```js
const sel = id => `[data-testid="${id}"]`
const emailField = rootNode.querySelector(sel('email'))
const passwordField = rootNode.querySelector(sel('password'))
const submitButton = rootNode.querySelector(sel('submit'))
```

This is great for
[end to end tests](https://github.com/react-vis/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/cypress/e2e/post_spec.js)
as well. So I suggest that you use it for that too! However, some folks have
expressed to me concern about shipping these attributes to production. If that's
you, please really consider whether it's actually a problem for you (because
honestly it's probably not as big a deal as you think it is). If you really want
to, you can transpile those attributes away with
[`babel-plugin-react-remove-properties`](https://www.npmjs.com/package/babel-plugin-react-remove-properties).

_I should also note that if you're using enzyme to test React components, you
might be interested in_ [_this_](https://github.com/react-vis/enzyme-sel) _to
avoid some issues with enzyme's_ `_find_` _returning component instances along
with DOM nodes._

I hope this is helpful to you. Good luck! Enjoy :)

**Things to not miss:**

- [Use a Render Prop!](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) — a
  blog post from my friend [Michael Jackson](https://twitter.com/mjackson) about
  my favorite pattern in React.
- [React, Inline Functions, and Performance](https://cdb.reacttraining.com/react-inline-functions-and-performance-bdff784f5578) — a
  blog post from my friend [Ryan Florence](https://twitter.com/ryanflorence)
  about something I think is really important to remember.
- [Testing JavaScript Applications](https://frontendmasters.com/courses/testing-javascript) — my
  testing workshop on Frontend Masters.
  ([Resources and practice run here](/workshops/#testing-javascript-applications)).
- [How Node.js require() works](https://twitter.com/NTulswani/status/916961093280456705) — a
  tweet from my friend [Nitin Tulswani](https://twitter.com/NTulswani) that
  explains briefly what happens when you use the require function.
- [Kitty accidentally pressed the turbo button 😂](https://twitter.com/AMAZlNGNATURE/status/916203902596296704) — One
  of the funniest animal videos I've seen recently.
