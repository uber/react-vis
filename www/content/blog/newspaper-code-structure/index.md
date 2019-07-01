---
slug: newspaper-code-structure
title: Newspaper Code Structure
date: '2015-05-18'
author: Kent C. Dodds
description: >-
  _Your code should read like a newspaper article. Important stuff at the top,
  details at the bottom. I have a particular convention for my..._
banner: ./images/banner.jpg
---

Your code should read like a newspaper article. Important stuff at the top,
details at the bottom. I have a particular convention for my code that leverages
some of the querks of JavaScript to produce much consumable code. I want my code
to be easy to read by people regardless of their editor (or without an editor at
all, like on GitHub).

Here's a common way to write code that I see all the time. Pretend that you need
to use this module. See how fast you can find out what the api to this module is
(and objects from the module):

```js
export const bar = {
  some: 'property',
  someFunction() {
    // with plenty of lines
    // and more stuff
    // because... reasons...
  },
  someOtherFunction() {
    // because we need it
    // it's really important...
  },
  someOtherProperty: true,
  anotherFunction() {
    // forgot about this one...
    // why is it here, instead of at top?
    // who knows... Doesn't affect functionality right?
    // but it might impact readability...
    // especially if it gets long and stuff
  },
  dontForgetMe: '!!!!',
  ohWaitNeedThisToo() {
    // yet another function
    // man, I need a few of these don't I?
    // what other functions does this "bar" thing have?
    // does this file export anything else? I guess I'll have to search around and find out...
  },
}

export function longFunction() {
  // I could really use a doughnut right now...
  // Sometimes functions need to do a lot of things
  // You should keep these functions short
  // Otherwise your code is hard for a reader to consume...
  // and that makes me sad :-(
  // and confused
}

export function meToo() {
  // make sure you scroll around the file
  // so you know EVERYTHING that this module exports
  // Because with this method, discovering that is a little difficult.
  // There's gotta be a better way!
}

export const thereIsABetterWay = true
```

#### What's the problem?

I hope that I illustrated the issue in the comments in the code there. The main
problem is when I come in to maintain this file or even consume it. I have a
hard time knowing what the API into this module is. This just makes reasoning
about that code much more difficult. I also personally think that it's harder to
read, but that could be just because I'm used to my own method now.

#### Is this for real?

I used to work on a huge Backbone application (150k+ lines of code). Many of our
Backbone.Views looked very much like the bar in this file (really tall, hard to
know what functions are available on the view). In fact, one of the worst views
in the application was **2000+ lines** of code! Now everyone knows that is a bad
practice just in general. But even if it had been that long, using my suggested
different approach would have really helped maintaining that monster.

### A different approach...

Now, see how fast you can determine the api to the rewritten module (some
comments different, so read those too):

```js
const bar = getBar()
const thereIsABetterWay = true

export {bar, longFunction, meToo, thereIsABetterWay}

// function declarations
function getBar() {
  // main "export" for the function
  return {
    some: 'property',
    someFunction,
    someOtherFunction,
    someOtherProperty: true,
    anotherFunction,
    dontForgetMe: '!!!!',
    ohWaitNeedThisToo,
  }

  // function declarations
  function someFunction() {
    // with plenty of lines
    // and more stuff
    // but I don't mind anymore, because I only read this if I'm interested in it
  }

  function someOtherFunction() {
    // because we need it
    // it's really important...
  }

  function anotherFunction() {
    // forgot about this one...
    // why is it here, instead of at top?
    // who knows... Doesn't affect functionality right?
    // it doesn't actually make a difference
    // even if it gets long and stuff
  }

  function ohWaitNeedThisToo() {
    // yet another function
    // man, I need a few of these don't I?
    // what other functions does this "bar" thing have?
    // I know just by looking at the top of the enclosing function... It's obvious... Important stuff at top, details at bottom
  }
}

function longFunction() {
  // I could really use a doughnut right now...
  // Sometimes functions need to do a lot of things
  // You should keep these functions short
  // Otherwise your code is hard for a reader to consume...
  // and that makes me sad :-(
  // and confused... But at least I know what the API is and it'll make consuming and maintaining this file much easier
}

function meToo() {
  // Don't need to make sure you scroll around the file
  // so you know EVERYTHING that this module exports
  // Because with this method, discovering the exports is obvious
  // It's just at the top of the file. What I see when I first open it up
}
```

#### Why is this better?

Hopefully I explain that well enough in the comments in the code, but you should
notice right from the get go at the top of the file that it's much easier to
know what the API to this module is. If I'm tasked with maintaining this module
or using its API, I know exactly what to expect from this file.

Note, this leverages the "quirk" in JavaScript with function declarations which
basically amounts to the function definition and declaration getting hoisted to
the top of the closure. This is why you can put function declarations after the
return statement.

#### What about ES6 Classes and/or this?

This kind of breaks down with Classes because they must be structured like this:

```js
export default class Person {
  constructor() {}
  walk() {}
  talk() {}
}
```

Again those functions can get long and you're pretty much in the same scenario
as the first sample of code. This is one of my personal beefs with classes. Lots
of people just say that your IDE should help you, but your IDE doesn't help much
if you're just looking at the code on GitHub and that's important to me because
I'm pretty involved on there and it's also important to me that I don't enforce
what editor/IDE people use and that its consumable by anyone.

So what's the solution? I don't know to be honest. I'd like to say that the
solution is just to keep your code clean and short, but in my experience, I've
found that just doesn't cut it sometimes.

#### Keep files/functions small

Most of these problems kind of go away if you keep your files and functions
small. But sometimes that's hard to do and abstractions can only get you so far.
I use this code structure even if the amount of code I have is small.

### Closing

Thanks for reading! [Catch me on twitter](https://twitter.com/kentcdodds) if you
have comments / want to discuss :-)
