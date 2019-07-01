---
slug: why-users-care-about-how-you-write-code
title: Why users care about how you write code
date: '2015-11-12'
author: React Vis
description:
  _Your coding practices and technology choices impact user experience..._
keywords:
  - Code
  - web development
  - User Experience
banner: ./images/banner.jpg
---

Back in October of 2011 [Ryan Dahl](http://tinyclouds.org) wrote a blogpost
entitled "[I hate almost all software](http://tinyclouds.org/rant.html)" in
which he asserts:

> The only thing that matters in software is the experience of the user.

I totally agree with this statement, but I believe that it has broader
implications than Ryan's suggesting.

At a previous employer, I was asked to add a single checkbox and label to the
contents of a popover. When asked how long this would take, I considered that
the logic for that part of the app was in a Backbone view that was over 1,000
lines long and it extended another Backbone view that was over 2,000 lines long.
I estimated it would take a week, and the PM was horrified. What's worse is it
actually took somewhere around two or three weeks.

Why did it take so long? The code was unmaintainable. I was able to add the
checkbox easily enough, but getting the data from the checkbox to update the
model was a nightmare. If that wasn't enough, the number of bugs I introduced
with my hacky example was frightening because (of course) those files had leaky
abstractions all over the place and absolutely no tests.

Now, consider if the component had been built with
[SOLID programming principles](http://butunclebob.com/ArticleS.UncleBob.PrinciplesOfOod)
(DRY, SRP, etc. etc.). I probably could have finished that feature in a day or
less.

So did the way the app code was written impact the end user? You betcha. Did the
user care that they had to wait weeks rather than days for the new feature?
Yeah, they totally cared.

---

So yes, it’s true. The only thing that matters in software is the experience of
the user. We created computers to improve our lives, and if the software we’re
using doesn’t do that then it’s failed.

> The experience of the user is indirectly, but strongly coupled to how we build
> software

So the big question: Does it matter to the user that we’re using the latest JS
framework, build tool, or deployment service? Of course not!

> Our measure of success should be how well we deliver what the user wants (and
> no more). Our choice of tools should be based on that fundamental goal.

At the same time, the latest tech and a good UX are not mutually exclusive. The
latest and greatest technology can be a great way to accomplish this goal.

#### So why does this matter?

We waste time endlessly debating minutiae that has little impact — whether we
should use semicolons in our JavaScript (no), or how many spaces to use for
indentation (two), but we should instead focus on the tech choices that make a
significant impact: solid design patterns, linting, testing, continuous
integration, delivery, and deployment. These choices are the basis for an app
that delivers a quality user experience. A great app is never truly
finished.Requirements change, and our choices as developers determine how easily
and quickly we are able to deliver new features, while keeping the product as
polished as possible.

So yes, our users don’t really care how we build our application, or what
abstractions we use in doing so. Remember that we use JavaScript and the web
because, with them, we can deliver an awesome experience to the user who doesn’t
want to download, install, and regularly update our app. If we found another
solution to accomplish that better, we’d all jump ship.

User Experience includes a lot more than just base functionality. How your
application is written, built, and deployed can make a big difference.

---

Big thanks to the people who helped review and edit this post, especially
[Kyle Robinson](https://twitter.com/ksr583) for basically being the article’s
editor.
