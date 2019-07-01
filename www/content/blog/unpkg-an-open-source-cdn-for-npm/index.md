---
slug: unpkg-an-open-source-cdn-for-npm
title: 'unpkg: An open source CDN for npm'
date: '2018-08-13'
author: Kent C. Dodds
description: >-
  _Let's learn how unpkg the service and the open source project can improve
  performance for your company's apps._
keywords:
  - javascript
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [David Marcu](https://unsplash.com/photos/TQVu4pnjTbc) on
  [Unsplash](https://unsplash.com/search/photos/cloud-mountain)'
---

A few years ago, [Michael Jackson](https://twitter.com/mjackson) had an idea. He
needed an easy way to make demos for his open source projects (specifically
[react-router](https://reacttraining.com/react-router)) and realized that he
already hosts all his projects somewhere: npm! So he could just setup a little
node server that would act as a proxy to the files that are on npm. And here we
are, almost 9 BILLION downloads per month later.

[unpkg](https://unpkg.com) is an
[open source](https://github.com/unpkg/unpkg.com) fast, global
[content delivery network](https://en.wikipedia.org/wiki/Content_delivery_network)
for everything on [npm](https://www.npmjs.com). Use it to quickly and easily
load any file from any package using a URL like:

```
unpkg.com/:package@:version/:file
```

For example, to get d3 on your page, you could add a script tag like so:

```jsx
<script src="https://unpkg.com/d3@5.5.0/dist/d3.min.js" />
```

You could also do:

```jsx
<script src="https://unpkg.com/d3" />
```

Because unpkg redirects those to the above URL (in this case it's because d3's
`package.json` has a `unpkg` field to point to that file specifically). It's
recommended that you specify a version though because otherwise user's will
start downloading the latest version which could break your application if
there's a major version bump:

```jsx
<script src="https://unpkg.com/d3@^5.5.0" />
```

That's right, a version range works in there as well. Cool right?

So why is this so cool? Whelp, we use CDNs (content delivery networks) because
they allow static assets like images, JavaScript, and videos to be hosted
physically close to end users as well as served with as fast as possible
technology. unpkg is sponsored by [Heroku](https://www.heroku.com) where it is
hosted, but that server is only actually used 5% of the time. The real power of
a tool like unpkg is the fact that the files hosted at those URLs can be very
heavily cached (npm doesn't allow published packages to be changed). So unpkg is
also sponsored by [Cloudflare](https://www.cloudflare.com) which is an awesome
CDN and serves 95% of unpkg's traffic from the cache, making unpkg extremely
fast.

unpkg is great for open source project demos and instructional material (I use
it heavily in my [Beginner's Guide to ReactJS](http://kcd.im/beginner-react)),
but it's not well suited for mission-critical applications at scale because:

> _unpkg is a free, best-effort service and cannot provide any uptime or support
> guarantees._

That's why Michael recommends:

> _if you rely on it to serve files that are crucial to your business, you
> should probably pay for a host with well-supported infrastructure and uptime
> guarantees._

This is something that I plan on doing at PayPal eventually and I'll tell you
why. Most projects at PayPal are using much of the same technology. Most are
using some version of react and react-dom, some are using rxjs, many are using
lodash. Each of these projects serves its own `bundle.js` file(s) that include
these dependencies. So as users navigate around PayPal they're re-downloading
much of the same code just in a different form. Some companies enforce the
entire company use the same version of some dependencies to avoid this problem.
I think this comes with more problems than the solution merits

This is why I'm really interested in building a hosted version of unpkg at
PayPal. Doing this will allow teams to use whatever version of whatever
dependencies they like. If two teams happen to be using the same version of
React (pretty likely), then the user wont have to download that version of react
more than once. This compounds across the number of teams and projects PayPal
has. And because I also write and maintain
[paypal-scripts](/blog/tools-without-config), I can build-in a really nice
process into paypal-scripts so people can get this functionality out of the box.
Automatic user experience improvement! Woo!

### Conclusion

I have a lot of things on my plate, but I'm hoping to be able to do this in the
next few months. I think it'll be a real win for people using PayPal products.
Can't wait to see those bundle sizes getting smaller! Good luck friends!

P.S. One other thing that I really love about unpkg is the index page for a
package. Simply add a `/` at the end of the URL and you'll see an index of the
files as well as a version chooser which is pretty awesome:
[`https://unpkg.com/d3/`](https://unpkg.com/d3)

**Learn more about JavaScript from me**:

- [More than you want to know about ES6 Modules @ Learn to Code Websites and Apps Meetup (remote)](https://youtu.be/kTlcu16rSLc&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [ES6 and Beyond Workshop Part 1 at PayPal (Jan 2017)](https://youtu.be/t3R3R7UyN2Y&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [ES6 and Beyond Workshop Part 2 at PayPal (March 2017)](https://youtu.be/eOKQDh50ECU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [Code Transformation and Linting](/workshops/#code-transformation-and-linting)
- [Writing custom Babel and ESLint plugins with ASTs](/talks/#writing-custom-babel-and-eslint-plugins-with-asts)

**Things to not miss**:

- [gh-polls.com](https://gh-polls.com) — "GH polls is a quick and effective way
  to request feedback from community members in GitHub issues." by
  [TJ Holowaychuk](https://twitter.com/tjholowaychuk).
- [There](https://there.pm) — A really neat app by
  [Mo Rajabifard](https://twitter.com/morajabi) that'll tell you what time it is
  for your friends and co-workers in a nice UI.
- [wretch](https://github.com/elbywan/wretch) — "A tiny wrapper built around
  fetch with an intuitive syntax. 🍬" by
  [Julien Elbaz](https://github.com/elbywan).
