---
slug: improving-the-usability-of-your-modules
title: Improving the usability of your modules
date: '2017-11-06'
author: Kent C. Dodds
description:
  _How to make your modules more generically useful and easier to test._
keywords:
  - javascript
  - open source
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [NASA](https://unsplash.com/photos/rTZW4f02zY8) on
  [Unsplash](https://unsplash.com)'
---

This last week I worked on my team's internationalization (aka `i18n`) solution.
We call it `react-i18n` (if we ever open source it, we'll need to rename it,
because [that's already taken](https://www.npmjs.com/package/react-i18n)). It's
pretty neat and really small. I'm not going to talk about why we don't use any
of the myriad of other tools that do this (maybe I'll save that for another blog
post). What I want to talk about is something I did to make that module more
usable.

One feature of the module is that it will automatically load your
server-rendered content for you. At PayPal we have another module called
`react-content-loader`. This is an express middleware that relies on conventions
used in Kraken and inserts the content for the user based on their language
preferences. For example, let's say that you have a file:

```
// locales/US/en/pages/home.properties
header.title=PayPal Rocks
header.subtitle=No really, it does
```

Then this middleware would insert this in the bottom of your page (for US users
with `en` as their preferred language):

```
<script type="application/json" id="react-messages">
  {
    "pages/home": {
      "header": {
        "title": "PayPal Rocks",
        subtitle: "No really, it does"
      }
    }
  }
</script>
```

Then `react-i18n` will automatically load that on the client side. All you have
to do is use it:

```jsx
import getContentForFile from 'react-i18n'
const i18n = getContentForFile('pages/home')

function App() {
  return (
    <div>
      <h1>{i18n('header.title')}</h1>
      <div>{i18n('header.subtitle')}</div>
    </div>
  )
}
```

So that's how it works (again, I'm sure some of you are thinking of
[other libs](https://www.npmjs.com/search?q=react%20i18n) that could do this
better, but please spare me the "well actually." I'm aware of them, I promise).
Now that you understand basically how this works, **I want to talk about a few
things that I changed about it to make it more usable**.

![I'll show you](./images/0.gif)

### No [side-effects](https://en.wikipedia.org/wiki/Side_effect_%28computer_science%29) on import

So you'll notice that when we use `react-i18n` on the client in the example
above, we don't have to do anything to initialize or bootstrap it with content.
It automatically gets those from the DOM. It does this inside the `main` export
from `react-i18n`. This way when you import `react-i18n`, loading the content
happens for you. This is a handy feature. But it comes with the trade-off that
the `main` module in `react-i18n`has side-effects in the root-level of the
module. For example:

```js
// react-i18n/index.js
// ... stuff
// side-effect!
const content = JSON.parse(document.getElementById('react-messages'))
// ... more stuff
export {getContentForFile as default, init}
```

This presents a few challenges for users of the module. It means that **they
have to be aware of what happens when they import your module**. They have to
make sure that they don't import your module before the global environment is
ready for it. And that problem manifests itself not only in the application
environment, but also in the test environment! And unless you take care to give
good warnings when the environment isn't ready (if you even know), people will
get cryptic error messages when doing seemingly unrelated tasks (like importing
some module that happens to import your module somewhere in the
[dependency graph](https://twitter.com/kentcdodds/status/922114804038303745)).

Another issue is that there could be a reason to **configure the initialization
process**. What if my node doesn't have the id `react-messages`, but instead
uses `i18n-content`? Or what if I don't server-render the messages at all and
they're coming from an ajax request? Turns out that `react-i18n` actually
exposed another module `react-i18n/bootstrap` to customize this behavior which
is great, but that doesn't resolve the problem of stuff happening if someone
were to import `react-i18n` first.

So what I did was a wrapped all side-effects in a function I exported called
`init`(which was similar to the `bootstrap` thing it already exported):

```js
// react-i18n/index.js
// ... stuff
function init(options) {
  // ... other stuff
  // side-effect! But it's ok now because that's clear
  const messages = JSON.parse(document.getElementById('react-messages'))
  // ... other other stuff
}
// ... more stuff
export {getContentForFile as default, init}
```

So this means that anyone using the module now _must_ call the `init` function,
but they're doing that on their own terms and whenever they want it to happen
which I think is the key difference. It doesn't matter whether someone imports
this module before initialization takes place. It also gives us an opportunity
to give a more informative error message if they fail to initialize before they
start using the module.

**The key is that your module shouldn't do side-effects when it's imported.
Instead, export functions which perform the side-effects.** This gives the users
control over when and what happens. Even better is to not have any side-effects
at all if you can help it (which is actually also possible to accomplish with my
reworking of `react-i18n`), but that's a subject for another newsletter.

### Make it generic

Before, this library was actually just a part of our app. So we could easily
rely on the fact that the JSON object was a nested object where the first key
was the name of the localization file and the rest was just a nested version of
the contents of that file (as you can tell in the example above). And the
implementation and examples in the docs were all geared toward this use case.
However, we're in the process of "inner sourcing" this module (and perhaps open
sourcing it eventually), so folks are going to use it who use different tools
and have different use cases.

So, **if it's not too much work and doesn't add too much complexity**, then try
to make the solution more generic. So now, the implementation doesn't care about
the fact that the root level of the localization object is a file name and the
rest is the contents of that file. All it cares about is the fact that it's a
nested JavaScript object. This means that whereas before, you had to do this:

```js
import getContentForFile from 'react-i18n'
const i18n = getContentForFile('pages/home')

// etc...
i18n('header.title')
// etc...
```

You can now do this:

```js
import getContent from 'react-i18n'

// etc...
getContent('pages/home.header.title')
getContent('pages/home')('header.title')
getContent('pages/home.header')('title')
// etc...
```

So each invocation of `getContent` will return the content or if the content is
another nested object it'll return another content getter function. I call this
"sota-curried" because it's not really currying, but it kinda looks like it a
little bit.

Now PayPal's `react-i18n` is more generically useful because the implementation
and documentation don't assume you're using `react-content-loader`. And as it
turned out, doing things this way actually made the implementation simpler!
Wahoo!

I should mention also that you can't predict the future, and that's what you
sort of have to try to do when building a generic library. While you're doing
this, you need to balance usability with the
[`YAGNI`](https://martinfowler.com/bliki/Yagni.html) principle. I only put this
effort in because we were extracting this from our project so others could use
it and we needed to support these use cases. Beware of pre-mature optimizations
(that's not limited to performance situations, but also features/complexity as
well).

There were several other things I could talk about, but I'm going to wrap this
email up with this. I hope that you find ways to remove side-effects from the
root-level of most of your modules and find ways to make your solution more
generic without sacraficing usability or implementation complexity.

Good luck! And stay awesome 😎

![Who's awesome? You are!](./images/1.gif)

**Things to not miss**:

- ["Addressable Errors"](https://rauchg.com/2016/addressable-errors) by
  [Guillermo Rauch](https://twitter.com/rauchg). I was thinking about writing my
  blogpost as an expansion on this (I think it's a great idea, in addition I
  think you should version the error messages with your project). Maybe one day.
- ["The Future of RethinkDB"](https://changelog.com/podcast/266) on
  [The Changelog](https://changelog.com). It's a great example of a community
  rallying together to keep open source going. And RethinkDB seems really
  awesome so I'm glad it's pushing forward!
- [Flexbox Zombies](http://geddski.teachable.com/p/flexbox-zombies). The best
  way to learn flexbox by the amazing
  [Dave Geddes](https://twitter.com/geddski). Also check out
  [Grid Critters](https://gridcritters.com/p/gridcritters) (to learn CSS Grid,
  also by Dave) which will be released soon!
- [Code Sponsor](https://codesponsor.io). I've already shared this, but they
  have a bunch of money they can give developers who want their OSS work to be
  funded and are looking for more folks to sign up. So if you're a dev who does
  OSS, give them a look :)
