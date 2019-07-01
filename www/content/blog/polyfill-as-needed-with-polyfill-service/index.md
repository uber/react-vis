---
slug: polyfill-as-needed-with-polyfill-service
title: Polyfill as needed with polyfill-service
date: '2018-08-06'
author: Kent C. Dodds
description: >-
  _How to maximize the performance of loading polyfills for your application
  users._
keywords:
  - javascript
  - Polyfill
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Susan Yin](https://unsplash.com/photos/ImoVrhUBeFs) on
  [Unsplash](https://unsplash.com/search/photos/service-bridge)'
---

In last week's newsletter ["What is a polyfill"](/blog/what-is-a-polyfill), I
talked about a situation I came across with a white screen on IE10 (the app
crashed because we were missing polyfills). I explained a bit of the difference
between a polyfill and a code transform. I explained a few options you have at
your disposal to use new JavaScript features and still support older browsers.
In the conclusion I said this:

> _So what did I do to fix my IE10 bug? Well, one thing that really bugs me is
> that I have to ship all this code for polyfills to all browsers even if they_
> do _support these features. But a few years ago I heard of_ >
> [_a service_](https://polyfill.io) _that was able to ship polyfills that are
> relevant only to the browser requesting them. I created my own endpoint that
> uses_ [_the module_](https://github.com/Financial-Times/polyfill-service) >
> _that powers that service and I'll write about that next week!_

That's today's newsletter! I'll explain how I created a `polyfill.js` endpoint
that gives back a very aggressively cached JavaScript file with the polyfills
that users need and no more.

### Why polyfill-service?

With the way I have my usage of polyfill-service configured today, if I make a
request for `polyfill.js` using Internet Explorer 10 (the lowest version of IE
that we support), the response is 60.2kb! If you're unfamiliar with the impact
this can make, I suggest you read
[The Cost Of JavaScript](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)
by [Addy Osmani](https://twitter.com/addyosmani) (or
[watch a talk version here](https://youtu.be/63I-mEuSvGA)). To put this in terms
you may appreciate, this will take users in emerging markets about a full second
just to download, then you have to take the content they've downloaded and
parse/compile/run it which can take even longer especially for individuals using
lower-end phones.

The state of the art with polyfills is to include those polyfills in your
`bundle.js`file (in fact, lots of apps are just using all of `core-js` which is
[84.2 kb of minified JS](https://bundlephobia.com/result?p=core-js@2.5.7)). This
means that every browser will need to download, parse, and run that JavaScript
regardless of what browser they're using. But let's take a look at
[browser usage statistics](https://caniuse.com/usage-table). Your stats may vary
depending on your users, but if your app is typical of the global averages, then
you have _maybe_ 5% of your users who need more than a handful of kbs worth of
polyfills. Most of your users will be using modern, evergreen browsers that
support most of the features you're using. So you're making users who are
running modern browsers pay a "tax" for your site supporting those 5% of users
who wont/can't upgrade.

If I run Chrome 67 on my `polyfill.js` file, it comes back
[basically empty](https://cdn.polyfill.io/v2/polyfill.min.js). By using
polyfill-service, only the browsers which _need_ the polyfills receive them.
This means that they can use my app quicker and I'm not taking up some of your
bandwidth to download stuff you don't need (which actually means saving people
actual dollars if they don't have unlimited data).

Another aspect of using something like polyfill-service is because my polyfills
live in a completely different file from my `bundle.js`, I can have it cached
forever, so users only need to download it once and never need to download it
again. So even for users on bad networks, they'll benefit from not having to
expend resources re-downloading a file that will never change.

### Using polyfill-service

The [polyfill.io](https://polyfill.io) service from Financial Times is awesome,
but with no SLA (service level agreement), many companies can't rely on it for
mission-critical applications. Luckily, the module that powers it is completely
open source so you can set up your own service in-house in a pretty
straightforward way and that's exactly what I did.

With the app I'm working on right now ([paypal.me](https://paypal.me)), we have
a server that's responsible for some light server-rendering for SEO purposes.
Basically, our server is a NodeJS server using [KrakenJS](http://krakenjs.com)
(a wrapper on top of [express](https://expressjs.com)), so I added a
`get`handler to the express app:

```js
app.get('/polyfill.js', getBrowserPolyfill)
```

And with the `getBrowserPolyfill` is a typical express route handler:

```js
import polyfill from 'polyfill-service'

async function getBrowserPolyfill(req, res) {
  const script = await polyfill.getPolyfillString({
    /* options */
  })
  res.set({
    'Content-Type': 'application/javascript;charset=utf-8',
    'Content-Length': script.length,
  })
  if (shouldCacheAggressively) {
    res.setHeader('Cache-Control', 'immutable')
  }
  res.write(script)
  res.end()
}
```

There's a little bit more to it, but this is the basic idea. So let's talk about
a few aspects of this solution.

### User Agent

So the polyfill-service module needs to know what the user agent string is to
determine what the `script` string should be (which JavaScript polyfills to
include). So I pass `req.headers['user-agent']` as that value, though I allow
the `ua` query string to override this and I have a fallback to IE 9 just in
case. And in the case that polyfill-service encounters a user agent it doesn't
recognize, I have it configured to just treat it as if it needs all the
polyfills (via the `unknown: 'polyfill'` option).

### Features

There are a LOT of features that polyfill-service supports out of the box. It
defaults to the most useful ones, but it's a good idea to configure it. At first
I thought: "Hey, let's just have it support everything." But then I found out
that if you asked it to polyfill _everything_ it could, it'll get HUGE (mostly
because it actually supports `Intl` with every language pack which is kinda
reeeally big). So I ended up with specifying `es2015`, `es2016`, `es2017`,
`es2018`, and `default-3.6` as the features config. That's working great and
supports everything that I care to support.

### Caching

This one's a bit interesting. So that `shouldCacheAggressively` is a bit
dangerous, so here's what I do... Because we're server-rendering the page, I can
actually generate the URL for the polyfill. It ends up looking like this (for IE
11):

```
polyfill.js?v=2&ua=Mozilla%2F5.0%20(Windows%20NT%2011.0%3B%20WOW64%3B%20Trident%2F7.0%3B%20rv%3A11.0)%20like%20Gecko
```

There are two query strings on there: `v` which is associated to a `version`
that I have hard-coded. This allows me to break the cache in the event of an
emergency if we need to change the config or something.

I also generate it with the `ua` which is the user agent as part of the query
string for the `polyfill.js` file. Remember how I mentioned earlier that I allow
the `uq`query string to override `req.headers['user-agent']`? So that's what
this is doing. The reason I do this is for caching. With such a specific URL, I
can safely cache this forever. If the user upgrades (or downgrades!?) their
browser, but the cache isn't deleted, then this URL is changed and the old
cached version isn't used.

### Extras

One ["fun" experience](https://twitter.com/kentcdodds/status/997228884864139264)
I had while building this involved polyfill-service not playing nice with the
way that babel transpiles classes. Follow that twitter thread and github issues
linked for a "fun" time of your own... 😅

### Conclusion

I'm excited about this and I'm hoping to build a more official polyfill service
for more of PayPal applications to use it so folks can build applications with
the latest JavaScript features without worrying about whether older browsers
natively support what they're writing and without making users of modern
browsers pay a "tax" for users of older browsers.

Best of luck to you!

P.S. Soon after sending this newsletter,
[Kevin Deisz](https://github.com/kddeisz) made
[an open source AWS Lambda service](https://github.com/CultureHQ/polyfill-lambda).
Pretty cool!

**Learn more about JavaScript from me**:

- [More than you want to know about ES6 Modules @ Learn to Code Websites and Apps Meetup (remote)](https://youtu.be/kTlcu16rSLc&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [ES6 and Beyond Workshop Part 1 at PayPal (Jan 2017)](https://youtu.be/t3R3R7UyN2Y&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [ES6 and Beyond Workshop Part 2 at PayPal (March 2017)](https://youtu.be/eOKQDh50ECU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [Code Transformation and Linting](/workshops/#code-transformation-and-linting)
- [Writing custom Babel and ESLint plugins with ASTs](/talks/#writing-custom-babel-and-eslint-plugins-with-asts)

Also, don't forget to subscribe to [my youtube channel](http://kcd.im/youtube)
for my daily devtips, like
[the one a while back where](https://youtu.be/FsgGx1SMXn0&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
I demo some advanced features of destructuring!

**Things to not miss**:

- [`express-async-errors`](https://github.com/davidbanham/express-async-errors) -
  a nice package that allows me to use `async/await`on express route
  handlers/middleware without worrying about rejected promises being ignored and
  making my server hang :)
- [ReactJS Denver: Confidently Testing React Apps](https://youtu.be/2HnNo4t8534?t=541) — A
  great talk at [React Denver](https://www.meetup.com/ReactDenver) by
  [Matt Parrish](https://twitter.com/mattparrish).
- [React is no abstraction, React is JavaScript](https://www.robinwieruch.de/javascript-fundamentals-react-requirements) — A
  very interesting and important blog post from
  [Robin Wieruch](https://twitter.com/rwieruch) that teaches some common
  JavaScript fundamentals that you'll need when working with React.
- [The Surface Book 2 is everything the MacBook Pro should be](https://medium.com/@ow/the-surface-book-2-is-everything-the-macbook-pro-should-be-5ef560edb505)
  by [Owen Williams](https://twitter.com/ow) — I'm getting more and more
  convinced that my next computer is NOT going to be a MacBook. Here's hoping
  that the Surface Book can get me 32 GB of RAM before I need another computer!
