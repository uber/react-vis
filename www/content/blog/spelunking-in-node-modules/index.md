---
slug: spelunking-in-node-modules
title: "Spelunking in node_modules \U0001F477"
date: '2018-01-22'
author: React Vis
description: >-
  _Deep dive into Jest, React, and jsdom: A story about how I go about finding
  and fixing bugs in my dependencies._
keywords:
  - javascript
  - Nodejs
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Colin Rex](https://unsplash.com/photos/uDiyX2bdpp4) on
  [Unsplash](https://unsplash.com)'
---

This last week I started work again after over a month away. What's the first
thing you do when you get back from that long away? Why, upgrade dependencies of
course! In particular, this was for my kcd-scripts and paypal-scripts projects.
Of note, Rollup, Jest, and lint-staged each received a few nice additions so I
was excited to get things going!

For the most part, things went over smoothly. I had a few deprecation warnings
with rollup that were
[simple enough](https://github.com/react-vis/kcd-scripts/commit/709c49dd8bc764d08c6958762199c62cbc494e55).
There was
[a simple change](https://github.com/react-vis/kcd-scripts/commit/6d0231382dc5edc003cac4a204b4c5f933fe7817#diff-e7d38b8d97a7607d1fa8b1075f987e2dR17)
I needed to make for changes in Jest (which I think I'll be able to revert
[when this is released](https://github.com/facebook/jest/pull/5127)).

But then I started updating `kcd-scripts` in several of my projects. Things were
going great until I updated `downshift`. I not only updated `kcd-scripts`, but
also `react`, and that's when the trouble started. `downshift`has several tests
for error cases (errors thrown when validating how you interact with the prop
getters for example). It has some assertions that an error is thrown when doing
something wrong when trying to mount downshift.
[This test](https://github.com/downshift-js/downshift/blob/702e7b037c27519dae97fa21f5a2aecc649027dd/src/__tests__/downshift.get-label-props.js#L35-L41)
in particular resulted in this output:

```
Error: Uncaught [Error: downshift: You provided the id of "foo" for your input, but the htmlFor of your label is "bar". You must either remove the id from your input or set the htmlFor of the label equal to the input id.]
    at reportException (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
    at invokeEventListeners (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:209:9)
    at HTMLUnknownElementImpl._dispatch (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:119:9)
    at HTMLUnknownElementImpl.dispatchEvent (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/events/EventTarget-impl.js:82:17)
    at HTMLUnknownElementImpl.dispatchEvent (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/nodes/HTMLElement-impl.js:30:27)
    at HTMLUnknownElement.dispatchEvent (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/generated/EventTarget.js:143:21)
    at Object.invokeGuardedCallbackDev (/Users/kdodds/Developer/downshift/node_modules/react-dom/cjs/react-dom.development.js:581:16)
    at invokeGuardedCallback (/Users/kdodds/Developer/downshift/node_modules/react-dom/cjs/react-dom.development.js:438:27)
    at renderRoot (/Users/kdodds/Developer/downshift/node_modules/react-dom/cjs/react-dom.development.js:10366:7)

...
```

> _I clipped the output, see_ >
> [_this gist_](https://gist.github.com/react-vis/0d02347d420459f4aac2cba4b3e8bef7#file-downshift-error-log) >
> _for the full output._

The funny thing about this though is that the tests all still passed! In
addition, those logs are coming from a `console.error` call, and
[the top of that file](https://github.com/downshift-js/downshift/blob/702e7b037c27519dae97fa21f5a2aecc649027dd/src/__tests__/downshift.get-label-props.js#L5-L12)
is mocking `console.error` to make it not log anything at all!

```js
beforeEach(() => {
  jest.spyOn(console, 'error')
  console.error.mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})
```

This is how we avoided the noise from React logging the error (which we were
expecting) in the first place! Oh, and the error isn't coming from React... Not
directly anyway... It's actually coming from JSDOM! Remember that stack trace?
The top of it says:

```
at reportException (/Users/kdodds/Developer/downshift/node_modules/jsdom/lib/jsdom/living/helpers/runtime-script-errors.js:66:24)
```

### What do you do when confronted with a stack trace?

When you see a stack trace like this, you first see where things are going wrong
in your own code. That might help you know what's going on in your own code to
cause the issue and you can fix it. If you can't figure it out from there, then
it can be really helpful to follow the stack trace as much as you can. Stepping
through a debugger (in browser DevTools for example) is a fantastic way to do
this.

So here's where we get spelunking. I knew that my code was fine because it
worked properly before I upgraded my dependencies. So I figured that something
must have changed in my dependencies. So what do we do? Whelp, crack open the
old `node_modules` directory and see what's up!

Did you know that `node_modules` directories are mostly full of JavaScript
files? Check this out. Run the following commands and you'll get a report of the
code on the `node_modules` directory in the `downshift` project:

```
git clone https://github.com/downshift-js/downshift.git
cd downshift
npm install
npx cloc ./node_modules
```

That'll take a fair amount of time, so I'll save you the trouble:

```
...
------------------------------------------------
Language     files  blank     comment    code
------------------------------------------------
JavaScript   21024  283714    342123    1735415
JSON         2807   1422      0         550205
Markdown     1736   66030     4         168463
TypeScript   1032   17525     56659     127105
HTML         60     2463      40        20773
XML          45     241       13        9377
C/C++ Header 20     1115      325       5571
...
```

> _I clipped the output because it's so big._ >
> [_See this gist for the full output of the last command_](https://gist.github.com/react-vis/0d02347d420459f4aac2cba4b3e8bef7#file-npx-clock-node_modules)_._

![Wow](./images/0.jpg)

Wow! Look at all that JavaScript (1.7 **_MILLION_** lines of _code_ (excludes
blank lines and comments)... note: this has `kcd-scripts` which has some heavy
deps but WOW)! And guess what! You can open it up in your editor and make
changes to it! Then you can run your scripts again and they'll pick up your
changes! How cool is that!?

So that's what I did. I jumped into the code and came out with this (spoiler
alert):
[Jest issue #5223: "jsdom console is unmockable"](https://github.com/facebook/jest/issues/5223).

Here's a [TL;DR](https://en.wikipedia.org/wiki/TL;DR) on the issue:

- React has
  [this really neat file](https://github.com/facebook/react/blob/48833f698dc28a9af09819ba731a2e94d5bf9da7/packages/shared/invokeGuardedCallback.js)
  which is responsible for improving browser DevTools experience when
  ["Pause on exceptions"](https://developers.google.com/web/updates/2015/05/automatically-pause-on-any-exception)
  is enabled
  ([read more about the specifics here](https://github.com/facebook/react/blob/48833f698dc28a9af09819ba731a2e94d5bf9da7/packages/shared/invokeGuardedCallback.js#L35-L52))
  (Note, in the Jest issue you'll see I make the claim that React recently added
  that, but in researching for this newsletter, I found that's not true,
  [it's been around for a LONG time](https://github.com/facebook/react/commit/16cc45156f65ff7fdda57383759121f59f585e41)).
- That file creates a temporary DOM node and dispatches an event with your code
  called in the event handler.
- If your code throws an error (in our case, the error thrown during the
  `render` function of `downshift`), then JSDOM
  ([which is running the event handler](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/living/events/EventTarget-impl.js#L188-L194))
  will
  [call](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/living/events/EventTarget-impl.js#L209)
  [`reportException`](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/living/events/EventTarget-impl.js#L209).
- `reportException` uses a
  [`VirtualConsole`](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/virtual-console.js)
  (remember, it's simulating the browser in Node, so it's doing its best) and
  [emits an event](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/living/helpers/runtime-script-errors.js#L70)
  called `jsdomError`.
- The `VirtualConsole` is setup to handle the `jsdomError` event to log that to
  the `error` method on the console it's using.
  [Check that out here](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/virtual-console.js#L29).

Ok, so far so good (hopefully... Stay with me now! Or just skip to the end for
the takeaways). But why in heaven's name is my mocking of the console not
mocking the console that `VirtualConsole` is using?!

So here's what I did. I noticed that it was using `anyConsole.error` instead of
`console.error`. `anyConsole` is passed into the function where this code lives.
I verified that
[`sendTo`](https://github.com/tmpvar/jsdom/blob/8a6894c34f14b9131d0fe4acadb71dae4f49daca/lib/api.js#L291-L293)
[is passed](https://github.com/tmpvar/jsdom/blob/8a6894c34f14b9131d0fe4acadb71dae4f49daca/lib/api.js#L291-L293)
[`console`](https://github.com/tmpvar/jsdom/blob/8a6894c34f14b9131d0fe4acadb71dae4f49daca/lib/api.js#L291-L293).
Then, to be doubly sure, I changed
[this line](https://github.com/tmpvar/jsdom/blob/5bc6b3bbcc0f18eccecca551bfcfe7d6bbe3e2ba/lib/jsdom/virtual-console.js#L29)
to this (added the `console.log`):

```js
this.on('jsdomError', e => {
  console.log(anyConsole === console)
  anyConsole.error(e.stack, e.detail)
})
```

Then I ran my tests. I was only partially surprised when that returned `true`.
On the one hand that made sense because that's what's passed into the `sendTo`
function, but on the other, it wasn't behaving like the `console` in my test
file. So I added this line to the top of my test file:

```js
global.MY_CONSOLE = console
```

And then changed the code again to this:

```js
this.on('jsdomError', e => {
  console.log(anyConsole === global.MY_CONSOLE)
  anyConsole.error(e.stack, e.detail)
})
```

And poof! I was getting `false`! So somehow the `console` I was getting in my
test file was _NOT_ the same as the normal console. I actually already knew this
because Jest does some cool magic to make your console logs more helpful (like
showing the file and line where the log is coming from in your code). But
somehow that fake console that Jest provides your tests doesn't make its way to
JSDOM.

Whelp, to make a long story less long, I found
[where jest creates its fake console](https://github.com/facebook/jest/blob/6d0c0f043f3c0782d55446dfca429bfc08e010e6/packages/jest-runner/src/run_test.js#L91-L99)
and as it turns out that's also where Jest runs your code in its own environment
so it's isolated from other tests. That means it gets its own `global` and hence
its own `console`.

_Phew 😌_

So my fix included moving the creation of the `testConsole` to before
[JSDOM was initialized](https://github.com/facebook/jest/blob/b86d93263b378c7ea02a8c64efd45c74f2538335/packages/jest-environment-jsdom/src/index.js#L27-L40)
in `jest-environment-jsdom` and passing the `testConsole` to
`jest-environment-jsdom` so it could create
[our own instance of](https://github.com/facebook/jest/blob/b86d93263b378c7ea02a8c64efd45c74f2538335/packages/jest-environment-jsdom/src/index.js#L34-L36)
[`VirtualConsole`](https://github.com/facebook/jest/blob/b86d93263b378c7ea02a8c64efd45c74f2538335/packages/jest-environment-jsdom/src/index.js#L34-L36)
that used the given `testConsole`. When I got that working in my `node_modules`,
I made [a pull request](https://github.com/facebook/jest/pull/5227) for the
changes (**I even** [**live streamed**](https://youtu.be/trPj0_cZ1r0) **me
making it** 📺), we iterated on it (**I**
[**live streamed**](https://youtu.be/ffflGeHJvJE) **some of that too** 📺), and
it eventually got merged! 🎉

### Key Takeaways

So, this story was a little technical and I got into the nitty gritty details of
three huge projects (JSDOM, Jest, and React). And that's my first takeaway!

### Learn about how your dependencies work

It's an amazing learning experience! Not only do I know more about how the
dependencies work, but that knowledge could provide an opportunity for me to
apply my learning to other problems.

### `node_modules` is a TON of JavaScript

And that's a language that you're writing your code in too. And it's code you
can modify and play around with. Add `console.log`s (and
`throw new Error(JSON.stringify({foo: 'bar'}, null, 2))`) in a few places to
make sure that code is reaching where you think it is and learn how the code
flows through your dependencies. That will help you come up with how the problem
can be solved and help you know what you can do to contribute to a solution in a
pull request.

### Solve (y)our own problems

I could have just reported my issue and reverted my upgrade and waited for
someone else to solve my problem. Would have been easy. But then I wouldn't have
been able to get
[the sweet new features I was looking forward to in Jest 22](https://facebook.github.io/jest/blog/2017/12/18/jest-22.html)
(like that codeframe 😍)! On top of that, when you `npm install` something, you
become responsible for that project. We're all maintainers of the projects we
use.

I hope this is helpful! Good luck!👍

**Things to not miss**:

- [Majestic](https://github.com/Raathigesh/majestic) by
  [@Raathigesh](https://twitter.com/Raathigesh). A pretty awesome UI for Jest
  tests!
- [JavaScriptJanuary.com](https://www.javascriptjanuary.com) — it's going
  strong! There's already over a week's worth of content on there. Check it out!
- [npm link](https://docs.npmjs.com/cli/link) a command you'll want handy when
  working with `node_modules` :) (thanks for the reminder
  [Cole](https://twitter.com/colepatrickturner/status/949876199303475200))

I've been on a few podcasts lately:

- [JAMStack Radio](https://www.heavybit.com/library/podcasts/jamstack-radio):
  [Ep. #23, Introduction to Downshift and Glamorous](https://www.heavybit.com/library/podcasts/jamstack-radio/ep-23-introduction-to-downshift-and-glamorous)
- [#!hashbang](https://youtube.com/playlist?list=PLZ66c9_z3umOuPSGsTu3mfzt6PGZeUyQZ):
  [HashBang Episode 5: Assert(js) panel: React Vis, Justin Searls, Gleb Bahmutov and Brian Mann](https://youtu.be/ltzNIOF_L3E)
- [Full Stack Radio](http://www.fullstackradio.com):
  [79: React Vis — Building Reusable React Components with Render Props](http://www.fullstackradio.com/79)
- [Web of Tomorrow](http://www.weboftomorrowpodcast.com):
  [44: How to Jumpstart Your Career — React Vis](http://www.weboftomorrowpodcast.com/44)
