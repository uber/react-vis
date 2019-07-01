---
slug: semicolons-in-javascript-a-preference
title: 'Semicolons in JavaScript: A preference'
date: '2015-11-16'
author: Kent C. Dodds
description:
  _An argument for why use of semicolons in JavaScript source is a preference_
keywords:
  - javascript
  - ES6
banner: ./images/banner.jpg
bannerCredit: '[ImageGenerator.net](http://www.imagegenerator.net/create/clippy)'
---

## Update:

Now that I use [prettier](https://github.com/prettier/prettier), it’s really a
matter of what you like to look at (because prettier means that I don’t have to
type them at all). I prefer the way code looks without semicolons so… :) I just
use [`eslint-config-prettier`](https://npm.im/eslint-config-prettier) and let
prettier deal with it.

---

Semicolons in JavaScript has got to be one of the worst
[bikeshedded](https://en.wikipedia.org/wiki/Parkinson%27s_law_of_triviality)
topics of all time (right after spaces vs. tabs... 2 spaces please).
[Here](http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding)
[are](http://inimino.org/~inimino/blog/javascript_semicolons)
[three](https://youtu.be/gsfbh17Ax9I) resources on the subject of why semicolons
are not necessary. Here's some criteria that need to be in place before I will
sanction omitting semicolons in a project.

## Transpilation and/or Uglification

The first thing that you need to know is something called Automatic Semicolon
Insertion (ASI). It's the "feature" that allows us to even have this
conversation. Read up on that if you're not familiar. Like
[Kyle's](https://twitter.com/getify)
([post](http://blog.getify.com/not-all-semicolons)), I agree that you **should
not** rely on ASI. It's a really bad idea for many reasons.

The problems with relying on ASI go away when you transpile or minify your code
(depending on your technology). For example, transpiling with
[Babel](http://babeljs.io) will add the semicolons back and uglifying with
[UglifyJS2](https://github.com/mishoo/UglifyJS2) will too.

So for me to say you're good to go on omitting semicolons in your source code,
you first need to make sure that whatever you end up shipping to production
(whether browser or node) has the semicolons added back.

## Linting the bad parts

There are a few gotchas with ASI. However, if you are using ESLint and you
enable the
[no-unexpected-multiline](http://eslint.org/docs/rules/no-unexpected-multiline)
rule, then you're safe. Just make sure that your build pipeline will fail if
that rule is broken because most assuredly your app will! You may also be
interested in the [semi](http://eslint.org/docs/rules/semi) rule.

## Why omit semicolons anyway?

With these things in place, this is no longer a discussion about what works and
what doesn’t but becomes a simple matter of preference.

> Omitting semicolons is a matter of preference

So why do I prefer to not have semicolons? It’s not just that I have a broken
right pinky (though
[sometimes it gets hurt](https://twitter.com/kentcdodds/status/925901200624558080))
or I like typing one less character per line. It’s simply because I don’t like
my linter/editor telling me I need to add something that is not necessary (so I
tell them I don’t want semicolons and they warn against them instead).

Also, I like to stay focused on the problem, not worrying about adding or
removing something that doesn’t really matter in the end. And since I’ve started
omitting semicolons (and gotten used to how ugly it looks at first) I actually
feel like it leaves my code looking cleaner (you’ve just gotta be untrained to
think that you need semicolons).

## Why should you use semicolons?

I should note that [Kyle](https://twitter.com/getify)’s post (linked earlier) is
not arguing only about ASI but he’s also arguing his reasoning for his own
preference (using semicolons). I recommend you give that a read as well.

One notable thing that Kyle mentions in that post is he feels like code with
semicolons is more explicit and clear (and in a conversation with him he
mentioned to me that it’s lacking empathy for newcomers). That could be true,
but for me I don’t feel like my code has gotten any less clear, maintainable, or
readable since I removed semicolons from it. And now I don’t have to even think
about it.

---

## Conclusion

If you don’t transpile/uglify and lint your code properly then I do not
recommend you omit semicolons in your code (it’s not a matter of preference in
this case, it’s simply the proper way to write JavaScript). I definitely would
recommend that you get these things in place (but that’s another blogpost). If
you do have these things in place, then that’s great! You can make the choice
**based on preference**! Catch you on the
[twitters](https://twitter.com/kentcdodds)!
