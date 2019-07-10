---
slug: automation
title: An Argument for Automation
date: '2015-12-07'
author: React Vis
description: _Why it can be worth spending 1 hour automating a 10 second task_
keywords:
  - javascript
  - automation
  - web development
banner: ./images/banner.jpg
bannerCredit: 'Rube Goldberg Machine'
redirects:
  - '/blog/an-argument-for-automation'
---

We all have workflows we go through regularly to get our job done. When we start
working we need to open a few applications, websites, and start a few servers.
When we commit code we follow a convention for our message. When we create a new
React component, Angular directive, or unit test file, we structure it the same
way as always.

You could take time to automate all of this stuff, but is it really worth it? I
mean, how long does it take to open a few apps, copy/paste some skeleton code,
etc.? Let's say it takes two hours to automate creating all the files I need for
an Angular directive (tests, js, css, template) — a task that takes about 30
seconds. I'd have to do that 240 times to make it worth it, right?

If you're just doing the math like that, you might think, "yeah, it's probably
not worth it." _(Though to be honest, I wouldn't be surprised if I've done that
particular task 2,400 times!)_ But...

> Saving time is not the only reason to automate workflows

Let’s continue with the Angular directive example to illustrate some of these
reasons. I normally create a new directive because I have a specific component
I’m trying to build (for me, that’s often a group of form fields for a
resource). Here are some of the things that need to happen when I do that:

1.  Decide I need a new directive component
2.  Create a folder for the component
3.  Create an _az-user-form.js_ file and fill that file with boilerplate
    JavaScript for a component directive
4.  Create an _az-user-form.test.js_ file and fill that file with the
    boilerplate JavaScript for testing a component directive
5.  (Sometimes) create an _az-user-form.css_ file and fill it with the
    [css-modules](http://glenmaddern.com/articles/css-modules)stuff to style the
    component.
6.  (Often) create an i18n folder with an _index.js_, an
    _en.[hson](http://npm.im/hanson)_, and a _fr.hson_ files and add the
    [message format](http://npm.im/messageformat) translations
7.  Create an _index.js_ file and export all the stuff needed to use the
    component (normally just what the actual component file exports) so I can
    import the folder.
8.  Import the component where it’s needed and start developing it (tests first
    of course 😉)

Setting all of that up and wiring things together properly can actually take a
minute or two if I didn’t automate generating those files. In fact, right now I
only use
[snippets](https://github.com/uber/react-vis/dotfiles/tree/master/.janus/vim-react-vis-snippets/snippets)
to do _some_ of that stuff. If I weren’t changing jobs/projects soon, I’d
probably write a generator using [plop](http://npm.im/plop) to speed it up
further.

Anyway, wouldn’t it be so nice if instead of all of that, it was simplified to:

1. Decide I need a new directive component
2. Enter a command in the command line and answer a few questions
3. Import the component where it’s needed and start developing it (tests first
   of course 😉)

Of course it’d be nice for saving some time; that’s obvious, but like I said,
this is more than just about saving time. Let’s look at some of the other
reasons this is awesome.

## Context

One of my favorite benefits of automating repetitive workflows is that I can
keep my brain focused on the task at hand rather than shifting gears to deal
with boilerplate or setup. In the above example, I have made a decision that I
need to create a new component to accomplish a specific task. I have the task in
my head. I know exactly what needs to happen. Then my brain is taken off into
autopilot mode for a few minutes while I repeat a task I’ve done a million
times. Unfortunately, I need to stay conscious enough to account for the minor
differences (like my directive name for example). This is called context
switching and can come at a
[huge cost](http://www.petrikainulainen.net/software-development/processes/the-cost-of-context-switching).

By the time I finish setting up the skeleton stuff (something that could have
been generated), I’ve forgotten exactly what I originally set out to do and need
to go back to be reminded (or hit the foosball table for a minute ⚽️).

> The ability to stay focused on the task at hand is a huge benefit to
> automating workflows.

## Human Error

Something we humans do much better than computers is the creative process of
understanding a problem and coming up with a solution. So computers have been
created to facilitate us doing what we’re good at. Something that humans do
really poorly though is performing mundane tasks over and over again. This is
something that computers can do with 100% accuracy. By automating our workflows
we can hand over to the computer what it’s been designed to do (and does really
well) and focus on what we’re really good at (back to the idea of context
there).

## Sharing

Once you’ve finished automating your workflow, you can share the automation
you’ve developed with others. This is one area where the math can totally blow
up in favor of automation.

> If your automation is used by 100 other people, that’s 100x the time saved.
> It’s a no brainer.

For the specific example above, it’s most likely that your file generator would
be used only by people contributing to your project. But that’s alright. It’s
nice to have all files in a project generally the same (a subject for another
blog post).

However, if you automate something that’s general enough to be used by more
developers, you could open source your solution and tons of developers can use
it. This is something that [Stephan Bönnemann](https://twitter.com/boennemann)
did with [semantic-release](http://npm.im/semantic-release), and I can’t tell
you how much time that’s saved me; it’s amazing. _(As a side, another developer
that’s shared a ton of his automation is
[Gleb Bahmutov](https://twitter.com/bahmutov), who is one of my personal heros;
check his tools out [on npm](https://www.npmjs.com/~bahmutov).)_

## Learning

One of the things I love about our industry is that it favors and encourages
lifelong learning.

> The process of automating your workflow is a fantastic learning experience
> (especially if you open source it).

If you use [Gulp](http://npm.im/gulp) as a task runner in your project,
automating tasks with it will teach you how the gulp team has designed their
APIs. Or you could build your own CLI tool using something like
[commander](http://npm.im/commander) or [inquirer](http://npm.im/inquirer).
Using a variety of APIs can help you learn different ways to design APIs to
solve problems and may help you design APIs to solve your future problems. You
also learn the specific tools which can help you automate things more quickly in
the future.

Then if you open source your solution you’ll learn a ton about what it means to
open source a project: add testing, continuous integration, releases (I
recommend you automate that with the aforementioned
[semantic-release](http://npm.im/semantic-release) module), and so much more.

---

## Conclusion

I’m not claiming that everything you do should be automated and open sourced.
Certainly not. We’ve got to get our jobs done and ship stuff. But there are
definitely many instances (probably more than you realize) where automating
something will actually help you get your job done and ship stuff faster — with
fewer bugs than by regularly repeating the same steps in your workflow.

If you’ve automated something and want to open source it, you might check out my
egghead.io series of over 20 free 5 minute lessons called
“[How to Write an Open Source JavaScript Library](https://egghead.io/series/how-to-write-an-open-source-javascript-library)”

Catch you on [Twitter](https://twitter.com/react-vis) and
[GitHub](https://github.com/react-vis)!

---

## Appendix (automation tools)

Here are a few automation related NodeJS tools I have used or had recommended to
me that you might want to check out (in no particular order):

- [semantic-release](http://npm.im/semantic-release)
- [commander](http://npm.im/commander)
- [inquirer](http://npm.im/inquirer)
- [commitizen](http://npm.im/commitizen)
- [rackt-cli](http://npm.im/rackt-cli)
- [nwb](http://npm.im/nwb)
- [plop](http://npm.im/plop)
- [ghooks](http://npm.im/ghooks)
- [next-update](http://npm.im/next-update)

Feel free to recommend more :-)
