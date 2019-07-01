---
slug: colocation
title: Colocation
date: '2019-06-17'
author: Kent C. Dodds
description: _Maintainability through colocation_
keywords:
  - javascript
  - react
  - Architecture
  - Code
  - Clean Code
banner: ./images/banner.jpg
bannerCredit: Photo by [Greg Rakozy](https://unsplash.com/photos/oMpAz-DN-9I)
---

We all want to have codebases that are easy to maintain, so we start out with
the best of intentions to make our codebase (or our corner of the codebase)
maintainable and easy to understand. Over time, as a codebase grows, it can
become more and more difficult to manage dependencies (JS, CSS, images, etc.).
As projects grow, an increasing amount of your codebase becomes "tribal
knowledge" (knowledge that only you or a few others are privy to) and this sort
of knowledge contributes to "technical debt" (whether that term is accurate or
[not](https://twitter.com/ryanflorence/status/747983065738153985)).

I like to keep my codebases manageable for not only me (the one who wrote it),
but also my teammates, future maintainers, and myself in 6 months. I think we
can all agree that this is a great ideal that we should strive for in our
codebases. There are a lot of different tools and techniques at our disposal to
accomplish this.

## Let's talk about Code Comments

I don't want to discuss whether to comment your code (you should) and what your
comments should be about (You explain why you're doing something unexpected in
the comments so people coming after can understand the decisions that were made
which resulted in the unexpected or odd code). (Ok, maybe I did want to talk
about that a little). Instead I want to focus on where those code comments are
placed. We generally "co-locate" these comments with the code they're explaining
by putting it as close as possible to the relevant code.

Consider for a minute, if we did this differently. What if we place those
comments in a totally separate file. A massive `DOCUMENTATION.md` file or
perhaps even a `docs/` directory that maps back to our `src/` directory. Sound
like fun to you? Yeah, not to me either. There would be some serious problems
we'd encounter by not co-locating our comments with the code it's explaining.

- **Maintainability:** They'd get out of sync or out of date quicker (than they
  already do). We'd move or delete a `src/` file without updating the
  corresponding `docs/` file.
- **Applicability:** People looking at the code in `src/` might miss an
  important comment in `docs/` or not comment their own code because they don't
  realize that there's an existing `docs/` file for the `src/` file they're
  editing.
- **Ease of use:** Context switching from one location to the next would be a
  challenge with this kind of a set up as well. Having to deal with multiple
  locations for files could make it difficult to ensure you have everything you
  need to maintain a component.

We could definitely come up with a convention for this kind of code commenting
style, but why would we want to? Isn't it simpler to keep the comments
co-located with the code they're explaining?

## So what?

Now, you're probably thinking to yourself: "Yeah, duh, this is why nobody does
this `docs/` thing and everyone just co-locates their comments with the code.
That's obvious. What's your point?" My point is that the benefits of co-location
are everywhere.

### HTML/View

Take HTML for example. All the benefits of co-locating our comments translate
over to our templates as well. Before modern frameworks like React, you'd have
your view logic and your view templates in totally separate directories. This
falls prey to the same problems described above. These days it's far more common
to put these things **in the exact same file** with React and Vue for example.
With Angular if it's not in the same file, the template file is at least right
next to the JS file with which it is associated.

### CSS

Another concept this applies well to is CSS. I'm not going to argue with you
about the merits of CSS-in-JS (it's fantastic), but the benefits are out of this
world.
[Learn more here](https://medium.com/seek-blog/a-unified-styling-language-d0c208de2660).

### Tests

This concept of file co-location applies great to unit tests as well. How common
is it to find a project with a `src/` directory and a `test/` directory filled
with unit tests that attempts to mirror the `src/` directory? All the pitfalls
described above apply here as well. I probably wouldn't go as far as putting the
unit tests in the exact same file, but I don't totally rule that out as an
interesting idea either (the implementation is left as an exercise to the
reader).

To help enable a more maintainable codebase, we should co-locate our tests files
with the file or group of files they are testing. This ensures that when new
people (or myself in 6 months) come to the code, they can see immediately that
the module is tested and use those tests as a reference to learn about the
module. When they make changes, it reminds them to update (add/remove/modify)
the tests to account for their changes.

### State

Application/Component state experiences the same benefits. The more
disconnected/indirect your state is from the UI that's using it, the harder it
is to maintain. Localizing state has even more benefits than maintainability, it
also improves the performance of your application. A state change in one corner
of your application component tree will re-render a lot fewer components than a
state change at the top of the tree. Localize your state.

### "Reusable" utility files

This applies to "utility" files and functions as well. Imagine you're writing a
component and see a nice bit of code that could be extracted into its own
function. You extract it and think: "Huh... I'll bet a lot of people could use
this." So you pull it out and put it into your app's `utils/` directory and move
on with your life.

Later, your component is deleted, but the utility you wrote is out of sight, out
of mind and it remains (along with its tests) because the person who deleted it
assumed it was more widely used. Over the years, engineers work hard to make
sure that the function and its tests continue to run and function properly
without even realizing that it's no longer needed at all. Wasted effort and
cognitive load.

If instead you had just left that function directly in the file that used it,
the story would be completely different. I'm not saying don't bother unit
testing complex utility functions (please do), but keeping them closer to where
they're needed helps you avoid problems.

> And for heaven's sake,
> [please DELETE THIS ESLINT RULE](https://github.com/yannickcr/eslint-plugin-react/blob/e6b4c33a1db4cc94c3e9223b09fb92b1dbddc00d/docs/rules/no-multi-comp.md)
> and all rules like it.

## The principle

**The concept of co-location can be boiled down to this fundamental principle:**

> Place code as close to where it's relevant as possible

You might also say: "Things that change together should be located as close as
reasonable." ([Dan Abramov](https://twitter.com/dan_abramov) said something like
this to me once).

## Open Source made easy(-er)

Aside from avoiding the problems discussed earlier, there are other benefits to
structuring your projects this way. Taking a component and turning it into an
open source project is often as simple as copy/pasting the folder to another
project and publishing that to npm. Then you just install it in your project and
update your require/import statements and you're good to go.

## Exceptions

Sure there's a good argument for documentation that spans the whole or part of a
system and how things integrate together. And where would you put integration or
end-to-end tests that span across components? _You might think those are
exceptions_, but they can actually subscribe nicely to the principle mentioned
above

If I have a part of my app associated with user authentication and I want to
document that flow, I can put a _README.md_ file in the folder that has all of
the modules associated with user authentication. If I need to write integration
tests for that flow, I could place the file for those tests in that same folder.

For end-to-end tests, those generally make more sense to go at the root of the
project. They span beyond the project itself and into other parts of the system,
so it makes sense to me for those to be in a separate directory. They don't
really map to the `src/` files. In fact, E2E tests don't really care how the
`src/` is organized at all. Refactoring and moving around files in the `src/`
directory should not necessitate changing the E2E tests at all.

## Conclusion

Our goal here is to build software that is as simple to maintain as possible.
The same benefits of **maintainability**, **applicability**, and **ease of use**
we get from co-locating our comments we get by co-location of other things as
well. If you've never tried it out, I recommend you give it a shot.

P.S. If you're concerned about violating "separation of concerns" I recommend
you check out [this talk](https://youtu.be/x7cQ3mrcKaY) by
[Pete Hunt](https://twitter.com/floydophone) and re-evaluate what that means 😀.

P.P.S. I should also note that this applies great to images and really any other
resource as well. And when you use a tool like
[webpack](https://webpack.js.org/), co-locating those resources is crazy easy
too. Honestly, this is one of the core value propositions of webpack IMO.
