---
slug: mdx-deck-slide-decks-powered-by-markdown-and-react
title: 'mdx-deck: slide decks powered by markdown and react'
date: '2018-08-20'
author: React Vis
description: >-
  _Why it's awesome, what it is, how it works, and how to use mdx-deck._
keywords:
  - javascript
  - react
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Ash Edmonds](https://unsplash.com/photos/Koxa-GX_5zs) on
  [Unsplash](https://unsplash.com/search/photos/computer)'
---

I've been giving presentations for years. I like many others started with
PowerPoint because "that's how you make presentations." I moved on from that to
[Prezi](https://prezi.com) when I was in college and I wowed all the crowds. I
moved on from that because it felt too gimmicky for the kinds of presentations I
was making. I tried Google Slides and that was cool because it's web-tech, but
was a little limited and didn't look all that nice. Eventually I landed at
[slides.com](https://slides.com). I've been with slides for pretty much my
entire software development presentation career. You'll find pretty much 100% of
the public presentations I've made on
[my slides page](https://slides.com/react-vis) (including
[my first meetup talk](https://slides.com/react-vis/genie)).

I've been pretty happy with slides because it's really easy to create
presentations and I've never been one to spend a ton of time on my slides. I
just want to make them quickly and focus on practicing my presentation to
communicate effectively what I want. But it definitely has some shortcomings and
limitations, and there are some things about the WYSIWYG interface that really
bug me. So I've always been on the lookout for a better experience creating
slides. (Now's as good a time as any to admit that I've never used Keynote. But
I didn't want to pay for it and I don't think that I'd be willing to spend the
time working on the slides to make it any better than slides anyway).

Probably the biggest example of the limitations of slides that really bothers me
is the difficulty of including interactive elements on the page. I always admire
people who's slides are made with HTML, CSS, and JS because they can just add
their interactive demos directly to their slides which increases "the wow
factor" in addition to being generally more engaging. For a specific example,
[my slides](https://slides.com/react-vis/simply-react) for my "Simply React"
keynote at ChainReact had several demos that were recorded video which is not
awesome, but I also had an issue where I couldn't replay the videos
([watch here](https://youtu.be/M9X2qGddHkU&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf&t=4m04s)).
So the demos kinda fell flat a bit.

When master [Ken Wheeler](https://twitter.com/ken_wheeler) announced
[spectacle](https://github.com/FormidableLabs/spectacle) I was super excited! It
is so awesome! I never got into it though because I'm just too lazy and wasn't
willing to take the time to make slides out of React code and customize it to
what I want it to be. So though I've tried it a few times, it never really took
off for me.

### Enter MDX

A few months ago [John Otander](https://twitter.com/4lpine) released the initial
version of a new tool (and
[specification](https://github.com/mdx-js/specification)) called
[MDX](https://github.com/mdx-js/mdx). Months later
[Tim Neutkens](https://twitter.com/timneutkens)
[announced MDX during the Zeit Day 2018 Keynote](https://youtu.be/yqACl3tRHNI?t=10m)
and the world's collective minds were blown
([for example](https://twitter.com/ryanflorence/status/1024522677262794752)).

Here's a quick example of what's possible with MDX:

```md
import InteractiveGraph from './my-d3-graph'

# Checkout this cool graph!

> This is markdown, for real

<InteractiveGraph />

**That's right!** We're rendering a **React Component** in Markdown!
```

There's a bunch that's awesome from this. I've been wanting something like this
for quite some time! Back when I was working on the website for
[glamorous](https://github.com/paypal/glamorous)
([glamorous.rocks](https://glamorous.rocks)), I wanted to make all the docs in
markdown to make it easier to internationalize, but I also wanted interactivity
to be possible, so I came up with
[a super weird syntax](https://github.com/uber/react-vis/glamorous-website/blob/master/other/CONTRIBUTING_DOCUMENTATION.md#important-markdown-notes)
to make this possible. It's pretty cool, and actually works similar to MDX at a
fundamental level (uses
[a custom fancy plugin](https://github.com/uber/react-vis/glamorous-website/blob/b2469c1dfbfed750fc01dcbe411fec307b7ae5a8/components/interactive-markdown.js#L89-L113)
for [remark](https://github.com/remarkjs/remark)), but it's way hacky and
limited. This MDX thing is the REAL DEAL!

### Enter mdx-deck

Recently, the (seriously) amazing [Brent Jackson](https://twitter.com/jxnblk)
created and [announced](https://twitter.com/jxnblk/status/1023667155324346373)
something absolutely amazing: [**mdx-deck**](https://github.com/jxnblk/mdx-deck)

![gif showing mdx-deck demo](https://camo.githubusercontent.com/c12c8d143a3509f9aa6fde5629ea0c7f78e68437/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6a786e626c6b2f6d64782d6465636b2e676966)

It's got the ease of slides that I love because it's just markdown. Couldn't be
much easier than that! Then, to top that off, if I want something to be
interactive, I can simply make that interactive thing a React component, then
import that directly into my slide!! How awesome is that!? Way awesome is the
answer!

mdx-deck has some pretty sweet features too:

- 📝 Write presentations in markdown
- ⚛️ Import and use
  [React components](https://github.com/jxnblk/mdx-deck#imports)
- 💅 Customizable [themes](https://github.com/jxnblk/mdx-deck#theming) and
  components
- 0️⃣ Zero-config CLI
- 💁 [Presenter mode](https://github.com/jxnblk/mdx-deck#presenter-mode)
- 📓 [Speaker notes](https://github.com/jxnblk/mdx-deck#speaker-notes)
- 📓 [Production Export](https://github.com/jxnblk/mdx-deck#exporting)
- 📜 [PDF Export](https://github.com/jxnblk/mdx-deck#pdf-export)

You combine this with
[Netlify's amazing GitHub Integration](https://www.netlify.com/docs/continuous-deployment)
and put your slides in a GitHub project and you're off to the races with an
automatically deployed slide deck!

### Conclusion

I'm currently working on porting my slides for
["Simply React"](https://github.com/uber/react-vis/simply-react). You can see
the current state of
[the slides deployed on netlify here](https://simply-react.netlify.com) (and
[the pdf](https://simply-react.netlify.com/presentation.pdf)). I'm pretty jazzed
about the ability to have such an easy way to create presentations in the
browser that are easy to run locally, deployed to the web, create a PDF version,
_and_ totally interactive. This is just terrific.

Give it a look and try it for your next presentation. I think you'll love it.
Good luck!
