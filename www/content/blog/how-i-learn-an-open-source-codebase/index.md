---
slug: how-i-learn-an-open-source-codebase
title: How I learn an Open Source Codebase
date: '2018-05-14'
author: Kent C. Dodds
description: >-
  _What I do to learn and understand an open source project to which I want to
  contribute._
keywords:
  - open source
  - web development
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Robert Collins](https://unsplash.com/photos/tvc5imO5pXk) on
  [Unsplash](https://unsplash.com/search/photos/community)'
---

[Participating in open source has been awesome for me](/blog/how-getting-into-open-source-has-been-awesome-for-me).
It has
[made me and the stuff I make better](https://youtu.be/6mtPPkKchcQ&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf).
A [common](https://github.com/kentcdodds/ama/issues/57)
[question](https://github.com/kentcdodds/ama/issues/264) that I get from folks
is how to go about learning an open source codebase and understand other's code.

In my blog post ["Open Source Stamina"](/blog/open-source-stamina), I make an
important observation:

> You contribute best to something you use regularly.

[**Open Source Stamina**](/blog/open-source-stamina)

So while it can be a lot of fun to just jump into any open source project and
help out. Sustainable contributions are best found in projects that you use on a
regular basis. You have a better understanding of the use cases of the code
which will help you understand the code better.

### Some steps

Here's a sequence of events I go through when I'm trying to learn or contribute
to an open source project:

### Contributing Guidelines

Look at the contributing guidelines first! This can be found in the
`README.md`or a `CONTRIBUTING.md` file in the project. If it doesn't exist, then
file an issue and ask the maintainer to either make one or give you an idea of
what they expect out of contributions.

### Project setup

When you set up the project on your computer, make sure that you first install
the dependencies and that the tests pass (if there are any). For JavaScript
projects, you can mostly do:

1.  clone repo
2.  `npm install`
3.  `npm test`

If all that works then you're ready to go. The last thing you want to do is
clone a repo with failing tests, make your change, and think that your change is
the reason the tests are failing! This has happened to me :-(

### Follow the code

Next, I try to follow the code in my head starting at the entry point where I'm
interested in (like a function call, or a CLI with a certain argument). This can
be intimidating for bigger projects, but it's not as bad as you might think.

In my blogpost
["What open source project should I contribute to?"](/blog/what-open-source-project-should-i-contribute-to)
I talk a little bit about how to find where the code is for a specific API.

### Break things

Reading and running the tests is also useful. Breaking things can also be a
helpful way to learn a codebase.

### Log and step through

It's a tried and true debugging mechanism: `console.log` is a great way to learn
a codebase. 👍 Even better if you can run it in the browser DevTools that's also
great.
[Read more about NodeJS debugging in Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27).

[**Debugging Node.js with Chrome DevTools**](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27)

One other thing you might try is running the project's code in the context of
your application. I talk about this a fair amount in my blog post from a few
weeks ago
["Spelunking in node_modules 👷"](/blog/spelunking-in-node-modules-bf165af19968).

### Conclusion

Something else that I've found helpful is to ask someone on the project to walk
me through some part of the code. I try to make it worth their time by offering
to record our conversation and make it publicly available. This is appealing to
maintainers because having material out there for new contributors to watch is
very helpful. Here are some examples:

- [Why, What, and How of React Fiber with Dan Abramov and Andrew Clark](https://youtu.be/crM1iRVGpGQ&list=PLV5CVI1eNcJi8sor_aQ2AzOeQ3On3suOr)
- [React events in depth w/ Kent C. Dodds, Ben Alpert, & Dan Abramov](https://youtu.be/dRo_egw7tBc&list=PLV5CVI1eNcJi8sor_aQ2AzOeQ3On3suOr)
- [JavaScript & React Testing with Jest](https://youtu.be/i31VtyJSM-I&list=PLV5CVI1eNcJi8sor_aQ2AzOeQ3On3suOr)
- [Contributing to ReactJS](https://youtu.be/wUpPsEcGsg8&list=PLV5CVI1eNcJi8sor_aQ2AzOeQ3On3suOr)

I hope this is helpful! Good luck!

**Learn more about Open Source from me**:

- [How to Contribute to an Open Source Project on GitHub](http://kcd.im/pull-request)
  (on [egghead.io](http://egghead.io), absolutely free!)
- [How to Write an Open Source JavaScript Library](http://kcd.im/write-oss) (on
  [egghead.io](http://egghead.io), absolutely free!)
- [Creating an Open Source JavaScript Library on Github](https://frontendmasters.com/courses/open-source)
  (on Frontend Masters, subscribers only).
- [My Talks](/talks) — I've got several about open source

**Things to not miss**:

- [The Node.js Project Introduces Latest Release Line: Node.js 10.x](https://medium.com/the-node-js-collection/the-node-js-project-introduces-latest-release-line-node-js-10-x-bf07abfa9076)
- [Zeit Day](https://zeit.co/day) — Some awesome talks I'm looking forward to
  check out myself!
