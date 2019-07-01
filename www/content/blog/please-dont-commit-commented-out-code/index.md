---
slug: please-dont-commit-commented-out-code
title: Please, don't commit commented out code
date: '2015-10-27'
author: Kent C. Dodds
description: _Some solid reasons you should delete code that is not used_
keywords:
  - Git
  - github
  - Code
banner: ./images/banner.jpg
bannerCredit: 'git diff contains the knowledge we_seek'
---

I often find stuff like this in codebases I review:

```js
function foo(bar) {
  const baz = bar(false)
  // we no longer do this for some good reason
  // if (baz === 'foobar') {
  // return baz
  // } else {
  // return bar.foobar()
  // }
  return baz
}
```

This function should look like this:

```js
function foo(bar) {
  return bar(false)
}
```

You might be thinking: "But Kent! What if that 'good reason' is no longer true,
and we need to do it the old way again later?" The answer, my dear reader, is
[_git diff_](https://git-scm.com/docs/git-diff)_:_

There's the precious code. We can grab those changes and boom! We're back in
business!

Now you might be thinking: "Ok, cool, but what's the problem with leaving the
commented code in there? It's easier for people to see how things used to be, it
_might_ be helpful to them, and it's a way for me to leave my mark on the
codebase **forever**!!"

Here are a few of the reasons you should probably not commit commented out code:

## **Focus and cognitive load**

For me, **this is the biggest reason** and reason enough to avoid doing it
altogether. I don't know about you, but when I come to commented out code, I'll
often stop what I'm doing to read it. I think "maybe it's important" or I may
simply be curious. **Either way,**
[**my workflow has been derailed**](http://heeris.id.au/2013/this-is-why-you-shouldnt-interrupt-a-programmer)**.**

## Hides what's important

I have seen stuff like this:

```js
// dozens
//
// of
//
// lines
//
// of
//
// commented
//
// code
someImportantCode()
// dozens
//
// of
//
// more
//
// lines
//
// of
//
// commented
//
// code
```

It can be possible to skip over _someImportantCode()_ when scanning over a file.
This is less likely with the right syntax highlighting but it can happen, and
the comments are simply not worth keeping around.

## Out of date

I've long held the opinion that the only thing that can tell you the truth about
the code is the code. The instant you add a comment, it's out of date.
Documentation comments are beneficial enough to justify their existence (though
you should try to make your code self-documenting for people other than
yourself).

However commented out code does not justify its existence. It wont take long
before that commented code is out of context, no longer tested, linted, or run,
the APIs it was using have changed or been removed, and now it's just in the
way.

## Conclusion

Again, the main problem is commented code adds confusion with no real benefit.
Just rely on your version control system to
[keep track](https://youtu.be/dQw4w9WgXcQ) of the code that once was. Let it go.

If you’re an eslint person, you might be interested in
[Gleb Bahmutov](https://twitter.com/bahmutov)’s
[eslint-rules](https://github.com/bahmutov/eslint-rules) (specifically his
[no-commented-out-code](https://github.com/bahmutov/eslint-rules#no-commented-out-code)
rule). If you’re not an eslint person, listen to
[Jamund Ferguson](https://twitter.com/xjamundx) on
[JavaScript Jabber](https://devchat.tv/js-jabber/162-jsj-eslint-with-jamund-ferguson).
His enthusiasm for it will convince you that you should try it out :-)

---

## QYMAM

> _k-why-mahm _ —  Questions You Might Ask Me:

**Q:** Are there exceptions to this rule? **A:** Yes. But they’re rare.

**Q:** What about stuff I’m working on but isn’t yet working? I don’t want to
wait until it’s all done because my computer might get stolen or catch fire!
**A:** Put that in a branch. There’s no problem committing totally broken stuff
to a branch. Once it’s done, you can merge the working stuff into
master.Personally I recommend that you
[squash commits](http://makandracards.com/makandra/527-squash-several-git-commits-into-a-single-commit)
into atomically working commits before you put those into master, but as long as
it’s working when it gets into master then you’re good.

**Q:** What about when we absolutely know the code is done, but some third party
integration is required before it can be committed? I don’t want to lose that
knowledge. Can’t I just say: “// uncomment this code when foo is done” ?? **A:**
In my opinion, that TODO should live in a story and the commented out code
should live in a development branch. What if the third party integration fails
or is dropped? You now have to remember to remove the comment and the commented
out code.

**Q:** What about
[examples for third party integrators](https://twitter.com/cssensei/status/658780781943328769)?
**A:** To me, that’s not commented out code, that’s documentation. I’m totally
cool with that. Though, to be honest, it sort of drives me nutso that the
documentation in the AngularJS 1 project is in the form of comments in the
files. The first line of runnable code in
[compile.js](https://github.com/angular/angular.js/blob/469b14a525aad1eb3a0013f9d02c943b649c3392/src/ng/compile.js)
is
[line 737](https://github.com/angular/angular.js/blob/469b14a525aad1eb3a0013f9d02c943b649c3392/src/ng/compile.js#L737)!
But that’s another blogpost (and I’m not saying they’re wrong to do that… There
are tradeoffs for sure).

**Q:** git history isn’t very discoverable… How do I find the commit that
removed the code I want back? **A:** A **very valid question**. Removing
commented code not only makes it harder to find later, but it also makes it so
people in the future don’t know it existed before. For finding the code, there
are [tools and git commands](http://stackoverflow.com/q/278192/971592) to help
you look at the history of a file. I’ve had to do this before, going back months
(even years) in a file was actually quite trivial. As for knowing of its
existence, if it’s that important, you could add a comment that explains briefly
that something important existed there before and people can find it in the git
history. I believe this is an extremely rare case and can’t think of personally
ever needing to do this.

Do you have more questions? Add a comment here or ping me on
[twitter](https://twitter.com/kentcdodds).

---

**Thank you** [Matt Zabriskie](https://twitter.com/mzabriskie),
[Lin Clark](https://twitter.com/linclark), [Kyle](https://twitter.com/getify),
[Jamund Ferguson](https://twitter.com/xjamundx), and
[Gleb Bahmutov](https://twitter.com/bahmutov) for reviewing this blog post.
