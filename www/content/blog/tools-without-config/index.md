---
slug: tools-without-config
title: "Tools without config \U0001F6E0\U0001F4E6"
date: '2017-09-26'
author: React Vis
description: >-
  _TL;DR/Spoiler alert: I'm working on a tool at PayPal called paypal-scripts
  and a personal one called kcd-scripts. You should try it too!_
keywords:
  - javascript
  - Toolboxes
  - automation
  - Create React App
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [LoboStudio Hamburg](https://unsplash.com/photos/E3rMBrxqKRo) on
  [Unsplash](https://unsplash.com)'
---

I work on a team at PayPal that tries to make other teams more productive. One
of the biggest problems we face is tooling. _Every team has to set up and
configure tooling for testing, client-side bundling, linting, etc. etc. etc._
What invariably happens with this is developers have just enough time to get it
working and then have to move on to other priorities. So **the tooling is less
than optimized.** 😱 Webpack configs work, but could be improved. Linters fall
out of date and bugs that a good linting rule could have prevented get shipped.
And who has the time to even think about setting up a typing tool like Flow??

At PayPal we have a project "generator" (it's really just a repo that you
clone). An unfortunate truth of generators is that they only bootstraps the
project. They leave you with all the config and the burden of keeping things up
to date. And if the generator authors update the generator, what about updating
all the users? 😑

**_It's a [Sisyphean task](https://en.wikipedia.org/wiki/Sisyphus)..._**

![a dog trying to climb a slider but failing](./images/0.gif)

One thing that has been awesome for the productivity of the entire React
community has been
[create-react-app](https://github.com/facebook/create-react-app). If you're
unfamiliar, create-react-app bootstraps react applications that have a great
webpack build and jest for testing that supports babel and eslint. And it does
this by leaving you with a single tool dependency and no configuration. That
tool is called "react-scripts." This tool is a CLI
[with scripts](https://github.com/facebook/create-react-app/tree/master/packages/react-scripts/scripts)
for (among others) build and test. It couldn't be simpler (and if you think it
could, then feel free to
[file an issue](https://github.com/facebook/create-react-app/issues)).

Inspired by this, **I decided to start working on paypal-scripts**. It's the
same basic idea, with one major exception. According to
[create-react-app's core ideas](https://github.com/facebook/create-react-app/blob/44cfbccfda665d6bfb626ce5528697de6033ee8e/CONTRIBUTING.md#core-ideas):

> _The purpose of this tool is to provide the best experience for people getting
> started with React, and this will always be our first priority._

For PayPal however, the goal is to make developers more productive at shipping
better products. This is why it comes with a great default configuration so most
of the time you shouldn't need to configure anything. Big productivity boost. At
the same time, we do need to cover more use cases if we're going to provide our
engineers real value, **so while create-react-app doesn't allow for custom
configuration, paypal-scripts does.**

There is a project called
[react-app-rewired](https://github.com/timarney/react-app-rewired) by
[Tim Arney](https://twitter.com/timarney). It's awesome. However, I've taken a
different approach to making paypal-scripts configurable. Rather than allowing
you to have a config file that accepts config and lets you return your "rewired"
config, paypal-scripts will assume that you want the built-in configuration
unless you've configured things yourself. For example, if you add a `.babelrc`
file or a `babel` property to your `package.json`, then paypal-scripts will use
your babel configuration rather than the built-in config. This makes things much
more predictable and less magical. ✨

To make things even better, paypal-scripts exposes all of its configuration so
you can compose your custom config with the built-in config ⚡️. So if you
wanted to add a custom babel plugin it's as easy as adding this to your
`package.json`:

```json
{
  "babel": {
    "presets": ["paypal-scripts/babel"],
    "plugins": ["glamorous-displayname"]
  }
}
```

---

I’ve been using
[a generator](https://github.com/uber/react-vis/generator-kcd-oss) for
[my open source projects](https://github.com/react-vis) for over a year now.
It’s been a huge productivity boost. However I’ve been suffering from all the
same things I’ve discussed in this blog post. So with the excitement of creating
paypal-scripts, I’ve also been working on
[kcd-scripts](https://github.com/uber/react-vis/kcd-scripts) which does the same
things except encodes the preferences I have for my own projects in the CLI.
I’ve been slowly adding it to my projects and I couldn’t be happier with the git
diffs 😍. I mean…
[check this out](https://twitter.com/react-vis/status/906238861067657221):

https://twitter.com/react-vis/status/906238861067657221

That’s a ton of config and dependencies I no longer need to maintain 🙌.
Multiply that by the 100 packages I’ve published on npm and that’s some pretty
serious productivity gains 🚀.

It’s open source, so you can go look at it and use it even if you like! But it’s
pretty specific to me, not well documented, and subject to my whims, so I
suggest that you fork it and make of it what you want. Seriously, I recommend to
anyone who has more than a handful of projects they maintain to create and use a
tool like this. I’m already feeling the wins.

Good luck to you all! 👍
