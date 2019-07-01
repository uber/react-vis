---
slug: react-jsx-as-a-server-side-templating-language
title: React/JSX as a server-side templating language
date: '2018-10-01'
author: Kent C. Dodds
description:
  _Using React function components to render your website's skeleton index.html_
keywords:
  - react
  - Jsx
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Dwinanda Nurhanif Mujito](https://unsplash.com/photos/3vp_7D1xd2A)
  on [Unsplash](https://unsplash.com)'
---

> _Another note:
> [I've been teasing](https://twitter.com/kentcdodds/status/1041712678970875904)
> about something big that I have coming. I'm totally not joking. I'm working on
> something really huge and y'all will be the first to know about it. Stay
> tuned. It's weeks away and I think you're going to love it._

Last week at PayPal, one of my pull requests was merged in an express codebase
which migrated us from a custom template system to using React function
components and JSX. The motivation was to reduce the maintenance overhead of
knowing and maintaining a custom template system in addition to the JSX we are
doing on the frontend.

The app is [paypal.me](https://paypal.me). The way it works is we have the
[home](https://www.paypal.me),
[terms](https://www.paypal.com/paypalme/pages/terms), and
[supported countries](https://www.paypal.me/pages/countries) pages that are 100%
rendered HTML/CSS (and just a tiny bit of vanilla JS), and then the
[profile](https://www.paypal.me/kentcdodds/10) and
[settings](https://www.paypal.com/paypalme/my/profile) pages are rendered by the
server as "skeleton" html pages (with SEO-relevant tags and a root `<div>` etc.)
and then the client-side React app kicks in to load the rest of the
data/interactivity needed on the page.

> _I should note that generally I'd suggest that if you're doing any server
> rendering at all, you'd probably find better performance doing server
> rendering for everything (using something like [Next.js](https://nextjs.org)
> or [gatsby](https://www.gatsbyjs.org) if you can), not just the skeleton
> `index.html` as we're doing on [paypal.me](http://paypal.me). We have our
> reasons (there's nuance in everything and I'm not going to get into this)._

Before my PR, we actually had two systems in place. We used
[`express-es6-template-engine`](https://github.com/dondido/express-es6-template-engine)
for the profile and settings pages (which are actually the same page), and for
the marketing pages one of our engineers came up with a tagged-template literal
solution that was react-like (with functions that accepted props and returned a
string of HTML). So engineers that work on this codebase would have to know and
maintain:

1.  `express-es6-template-engine` for the profile and settings pages
2.  React and JSX for the client-side app
3.  The custom tagged-template literal solution for the marketing pages.

It was decided to simplify this down to a single solution: React and JSX for
both frontend and backend. And that's the task I took. I want to explain a few
of the gotchas and solutions that I ran into while making this transition.

### JSX compilation

This was actually as easy as `npm install --save react react-dom` in the
`server`. Because [paypal.me](http://paypal.me) uses
[paypal-scripts](/blog/tools-without-config), the server's already compiled with
the built-in babel configuration which will automatically add the necessary
react plugins if the project lists react as a dep. Nice! I LOVE Toolkits!

### HTML Structure

The biggest challenge I faced with this involves integration with other PayPal
modules that generate HTML that need to be inserted into the HTML that we're
rendering. One such example of this is our polyfill service that
[I wrote about a while back](/blog/polyfill-as-needed-with-polyfill-service)which
inserts a script tag that has some special query params and
[a server nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). We have
this as middleware and it adds a `res.locals.polyfill.headHTML` which is a
string of HTML that needs to appear in the `<head>` that you render.

With the template literal and es6-template-engine thing we had, this was pretty
simple. Just add `${polyfill.headHTML}` in the right place and you're set. In
React though, that's kinda tricky. Let's try it out. Let's assume that
`polyfill.headHTML` is `<script src="hello.js"></script>`. So if we do this:

```jsx
<head>{polyfill.headHTML}</head>
```

This will result in HTML that looks like this:

```jsx
<head>&lt;script src=&quot;hello.js&quot;&gt;&lt;/script&gt;</head>
```

This is because React escapes rendered interpolated values (those which appear
between `{` and `}`). This is a
[cross site-scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting)
protection feature built-into React. All of our apps are safer because React
does this. However, there are situations where it causes problems (like this
one). So React gives you an escape hatch where you can opt-out of this
protection. Let's use that:

```jsx
<head>
  <div dangerouslySetInnerHTML={{__html: polyfill.headHTML}} />
</head>
```

So this would result in:

```jsx
<head>
  <div>
    <script src="hello.js" />
  </div>
</head>
```

But that's not at all semantically accurate. A `div` should not appear in a
`head`. We also have some `meta` tags. It technically works in Chrome, but I
don't know what would happen in all the browsers PayPal supports and I don't
want to bust SEO or functionality of older, less-forgiving browsers for this.

So here's the solution I came up with that I don't hate:

```jsx
<head>
  <RawText>{polyfill.headHTML}</RawText>
</head>
```

The implementation of that `RawText` component is pretty simple:

```jsx
function RawText({children}) {
  return <raw-text dangerouslySetInnerHTML={{__html: children}} />
}
```

So this will result in:

```html
<head>
  <raw-text>
    <script src="hello.js" />
  </raw-text>
</head>
```

This doesn't solve the problem by itself. Here's what we do when we render the
page to HTML:

```jsx
const htmlOutput = ReactDOMServer.renderToStaticMarkup(<Page {...options} />)
const rendered = `  
  <!DOCTYPE html>  
  ${removeRawText(htmlOutput)}  
`
// ...etc...
```

That `removeRawText` function is defined right next to the `RawText` component
and looks like this:

```js
function removeRawText(string) {
  return string.replace(/<\/?raw-text>/g, '')
}
```

So, effectively what our `rendered` string looks like is this:

```html
<head>
  <script src="hello.js" />
</head>
```

🎉 Cool right?

So we have a simple component we can use for any raw string we want inserted
as-is into the document without having to add an extra meaningless (and
sometimes semantically harmful) DOM node in the mix. (Note, the real solution to
this problem would be for React to
[support](https://github.com/facebook/react/issues/12014)
[`dangerouslySetInnerHTML`](https://github.com/facebook/react/issues/12014)
[on Fragments](https://github.com/facebook/react/issues/12014)).

> _**NOTE:** The fact that this logic lives in a function right next to the
> definition of the `RawText` component rather than just hard-coding the
> replacement where it happens is IMPORTANT. Anyone coming to the codebase and
> seeing `RawText` or `removeRawText` will be able to find out what's going on
> much more quickly._

### Localization

In our client-side app, we use a localization module that my friend Jamund and I
worked on that relies on a singleton "store" of content strings. It works great
because there's only one locale that'll ever be needed through the lifetime of
the client-side application. Singletons don't work very well on the backend
though. So I built a simple React Context consumer and provider which made it
easier to get messages using this same abstraction without the singleton. I'm
not going to share the code for it, but here's how you can use it:

```jsx
<Message msgKey="marketing_pages/new_landing.title" />
```

It worked out pretty well. The `Message` component renders the `MessageConsumer`
component which will get the content out of context and retrieve the message
with the given key.

### Other things of note:

- [`React.Fragments`](https://reactjs.org/docs/fragments.html) are everywhere.
  When the structure matters so much, you find yourself using React fragments
  all over the place. We're using babel 7 and loving the new shorter syntax of
  `<>` and `</>`.
- `style`/`className` changes. Before this was straightup HTML, the biggest
  changes I had to make was all the `class="`had to be changed to `className="`
  which wasn't all that challenging, but I found myself forgetting the
  `style="`attributes needing to be changed to `style={` and object syntax all
  the time. Luckily React gives you a warning if you miss one :)
- `${` needed to be changed to `{`. I found a few stray `$` rendered several
  times in the course of this refactor 😅

### Conclusion

I'm pretty pleased that we now only have one templating solution for the entire
app (both frontend and backend). I think that'll reduce the maintenance burden
of the app and that's a real win. Trying things out and doing experiments is a
good thing, but circling back to refactor things to the winning abstraction is
an important step to making applications that are maintainable for the
long-term. I hope this is helpful to you! Good luck!

**Learn more about React from me**:

- [The Beginner's Guide to React](http://kcd.im/beginner-react)
- [Advanced React Component Patterns](http://kcd.im/advanced-react) (also on
  [Frontend Masters](https://frontendmasters.com/courses/advanced-react-patterns)).

**Things to not miss**:

- [The introduction to React you've been missing](https://youtu.be/SAIdyBFHfVU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf) — My
  talk from UtahJS Conf 2018. Lots of livecoding here. In this talk I teach
  React from scratch in a single index.html file with no magic up my sleeves. We
  start with a basic Hello World in vanilla JavaScript and incrementally iterate
  through React APIs and JSX. We continue with introducing more of React's APIs.
  [Watch all the talks from UtahJS Conf 2018](https://youtube.com/playlist?list=PLuVqdWOQ-PNn_lDYUVgcA4e91qxJzipva)
- [Testing React Components @ PayPal 2018–09](https://youtube.com/playlist?list=PLV5CVI1eNcJhU1eyqkTjR0B5P7PzMVubB) — I
  gave a ~4 hour workshop at PayPal last week and livestreamed it.
  [Here's the material](https://github.com/kentcdodds/react-testing-library-course/tree/workshop-2018-09).
