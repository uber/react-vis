---
slug: goodbye-medium
title: Goodbye Medium
date: '2019-02-25'
author: React Vis
description: _I've migrated from Medium to react-vis.com/blog... Here's why_
keywords:
  - career
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Bobby Johnson](https://unsplash.com/photos/swCOXlxmr5U) on
  [Unsplash](https://unsplash.com)
---

I've been a blogger for over 15 years. When I was a teenager, I had a blog on
blogger all about what Google was working on. I was one of the first bloggers to
report on Google's acquisition of YouTube (my blog got an insane number of views
that day).

I also used to write (on blogger) one called "Google Video Highlights" where I
and some random stranger I "met" on the internet would take turns posting random
videos that we found on Google Video (Google's answer to YouTube before they
just bought YouTube).

I've had many blogs on many platforms since then: Blogger, wordpress.org, custom
wordpress, ghost, Jekyll, and finally Medium.com.

For me, blogging is all about convenience. I've always been more motivated to
create content than create a blogging platform, so I always looked for the
easiest way to do that. That said, I did want to differentiate myself (which is
why I tried wordpress). Every time I tried, I was reminded that building a
blogging platform was distracting me from creating content (not that building a
platform isn't a great way to learn, it just wasn't what I wanted to learn).

So when Medium became a thing years ago, I made the decision to go all in on
Medium. I was really happy with the authoring experience. It really removed
friction for me.

I started out on Medium at `medium.com/@react-vis`, but after a while, I
realized that I didn't trust Medium to be around forever or (more likely) that I
would want to be on Medium forever. I knew it was inevitable that eventually
Medium would do some things with my content that I didn't like. So about a year
or two ago I decided to create a "react-vis" publication and I used a (now
unsupported) feature of Medium to host my custom publication at a custom domain:
`blog.react-vis.com`.

I started publishing blog posts every week, and over 100 blog posts later, I
finally decided that the "cost" of creating my own blog platform was worth the
effort. Links to my articles on `blog.react-vis.com` have been shared with
millions of people all over the world on platforms like Twitter, Reddit, "the
orange site," and on other platforms. Because I own the domain, **I was able to
make this move without worrying about all those links breaking!**

> Note: this is actually the same reason I use `kcd.im` so much as well. I can
> change where those URLs go if I ever need to which I definitely have. I
> recommend
> [you set up a URL shortener yourself](https://youtu.be/HL6paXyx6hM&index=40&list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u)
> (it'll take you minutes and it's totally free).

I spent 1 hour building
[`kcd-blog-redirector`](https://github.com/uber/react-vis/kcd-blog-redirector).
I even livestreamed it on my new "Coding with Kent" series:

https://youtube.com/watch?v=1EOj__JPN08&list=PLV5CVI1eNcJgJCEkMlsqXea6OIF_uV_ub

(You might think this would be a simple task, but it's more complicated than you
think. Watch the first few minutes of the video and you'll know what I mean.)

I spent MANY more hours working on react-vis.com and preparing
react-vis.com/blog. In the last few weeks, I've spent many hours working on
migrating all my old Medium posts from blog.react-vis.com to react-vis.com/blog.
(You can watch those on ["Coding with Kent"](https://kcd.im/coding) as well).

## Why leave Medium?

So... What did Medium do that made it worth leaving? Well,
[Dan Abramov described it pretty well here](https://medium.com/@dan_abramov/why-my-new-blog-isnt-on-medium-3b280282fbae).
To sum up:

> 1. Some of my Medium articles unexpectedly got behind a paywall (this doesn't
>    actually happen, but it's an understandable misunderstanding 🤔)
> 2. My views on some topics have changed. (I also took the opportunity to leave
>    behind some old posts that aren't really applicable to me anymore).
> 3. I want to dogfood React. (This is a fantastic place for me to play around
>    with React in a safe environment where it's not a huge deal if I break
>    stuff).
> 4. I like to have full control over the experience. (This is a big one for
>    me!)
> 5. It’s open to the collaboration. (My blog is open source and every article
>    has a link where you can contribute fixes!)

I think one of the biggest things that bugs me about Medium is this:

https://twitter.com/slicknet/status/1097584328962240512

This is CRAZY. Like, what? I definitely want control over how my content is
consumed.

## So what now?

The blog has several things that I need to work on still:

1. [Search](https://github.com/uber/react-vis/react-vis.com/issues/48)
2. [Category Pages](https://github.com/uber/react-vis/react-vis.com/issues/49)
3. [Keyword Pages](https://github.com/uber/react-vis/react-vis.com/issues/50)
4. [Fix the RSS Feed](https://github.com/uber/react-vis/react-vis.com/issues/51)
5. Figure out how to automate sending emails that include nice syntax
   highlighting

There's a lot more (no, I'm not planning on adding comments, we can chat on
twitter). What's cool is that with amazing tools like Gatsby, I feel empowered
to build this stuff without sinking crazy amounts of time into it and building a
mess.

## How can I help?

I'm so glad you asked! I know for a fact that some of the articles didn't import
very well. The import process from Medium to Markdown is... imperfect (actually
it's downright terrible), so there are some issues with some of the markdown.

If you'd like to help, I'd love your help making sure things look ok and if they
don't fixing them.

**So if you'd like to help,** I invite you to
[join us on this Google Doc here](https://docs.google.com/spreadsheets/d/1Fro-0x305nDsnoYuhid4qJRgcDb1a7-uXTvAU6EEa3U/edit?usp=sharing)
and checkout the old Medium Post and compare it to the Imported post. Then fill
out the "Looks good?" column with either Yes, No Issue(s) Reported, or Pull
Request(s) Created. (There's even a link for editing the post yourself if you
want!)

I'm looking forward to working on this further and I'm also really looking
forward to some of the content that I'm going to be bringing you to egghead.io
and... other places :)

**Stuff not to miss**:

- [One Day Introduction to React with React Vis](https://thinkster.io/tutorials/one-day-introduction-to-react-with-kent-c-dodds):
  This is a recorded workshop from back in October. If you're totally new to
  React and want a hands-on approach to learning it, this will be very helpful
  to you! (There's also
  [a HUGE sale right now on thinkster](https://www.google.com/url?q=https://thinkster.io/pro/yearly/kcd-react-workshop))
- [I'M GIVING A HOOKS WORKSHOP IN SALT LAKE CITY!!!!!](https://ti.to/thinkster-io/react-hooks-workshop-slc-may-2019):
  Both beginner and advanced. Check it out!
