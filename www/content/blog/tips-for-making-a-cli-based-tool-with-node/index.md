---
slug: tips-for-making-a-cli-based-tool-with-node
title: Tips for making a CLI-based tool with node
date: '2016-11-18'
author: React Vis
description: >-
  _I got this question on my AMA and decided to turn the answer into a formal
  blogpost._
keywords:
  - javascript
  - NPM
  - Cli
  - Command Line
  - Node
banner: ./images/banner.jpg
bannerCredit: >-
  [https://unsplash.com/photos/8Pd8yCjjKIQ](https://unsplash.com/photos/8Pd8yCjjKIQ)
  (obligatory post photo that has nothing to do with this blogpost)
---

Hey [@amandeepmittal](https://github.com/amandeepmittal)!  
Thanks for reaching out to me! I'm glad you enjoyed
[my course](http://kcd.im/write-oss) :D

I've made a few CLIs. Probably my simplest recent one is
[split-guide](https://github.com/react-vis/split-guide). You'll see the CLI code
lives
[here](https://github.com/react-vis/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/src/bin/index.js).
And I tell npm to use the transpiled version of that file as the `bin` in the
`package.json`
[here](https://github.com/react-vis/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/package.json#L12-L14)
where the `key` in that object is the name of the binary (so what you'd type in
the terminal to use the CLI) and the `value` is the path in the package where
the binary is located (in my case it's in the `dist` directory which I transpile
to with [babel](http://babeljs.io)
[here](https://github.com/react-vis/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/package-scripts.js#L13)
(I'm using [`p-s`](https://github.com/react-vis/p-s) for my scripts).

With that configuration, when `npm` (or [`yarn`](https://yarnpkg.com)) installs
my package, it will create a
[symlink](https://en.wikipedia.org/wiki/Symbolic_link) to that file in the
`node_modules/.bin` directory (or, if it's globally installed, it'll put it
wherever your global packages are loaded into your `$PATH`). For locally
installed packages, you can use those binaries with your npm scripts (this
behavior is kinda explained
[here in the official docs](https://docs.npmjs.com/misc/scripts#path)).

So, for example, because I have setup `split-guide` like that, I can use it in
my [`react-jest-workshop`](https://github.com/react-vis/react-jest-workshop)
[here](https://github.com/react-vis/react-jest-workshop/blob/c43eaa13eb0ca203d7ed2b771b85e61ca5e539b0/package.json#L12).

Let's look again at
[the actual](https://github.com/react-vis/split-guide/blob/master/src/bin/index.js)
[`bin`](https://github.com/react-vis/split-guide/blob/master/src/bin/index.js)
[file](https://github.com/react-vis/split-guide/blob/master/src/bin/index.js)
itself now. There are a few things to note:

1.  [The first line](https://github.com/react-vis/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/src/bin/index.js#L1)
    has `#!/usr/bin/env node`. This is called a
    [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29) which
    effectively tells the system to run the script with node.
2.  Pretty much the rest of the file is configuring
    [`yargs`](https://www.npmjs.com/package/yargs) to accept the arguments I
    want it to. There are actually countless npm packages to help parse
    [`process.argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
    into something that's usable (flags etc.) I've used
    [`commander`](https://www.npmjs.com/package/commander),
    [`meow`](https://www.npmjs.com/package/meow) and a few others I can't
    recall, but I've been most happy with
    [`yargs`](https://www.npmjs.com/package/yargs). It's pretty darn powerful.
3.  You'll also notice that I'm not doing a lot of logic in here. That's because
    unit testing this file is a bit of a pain. You'll find my tests
    [here](https://github.com/react-vis/split-guide/blob/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/src/bin/index.test.js)
    and see that it is a bit complex, but it's actually a pretty solid
    integration test. Most of it is actually just using
    [Jest snapshots](https://egghead.io/lessons/javascript-use-jest-s-snapshot-testing-feature?pl=testing-javascript-with-jest-a36c4074)
    which is actually super enabling and makes me pretty certain of the impact
    my changes will make on the tool. I couldn't be happier with Jest snapshot
    testing and definitely recommend it for testing your CLIs!
4.  The main logic for the package lives in the rest of the
    [`src`](https://github.com/react-vis/split-guide/tree/fb4b2a2ebc1fb8c3c010c2af1318861b8bb1bb13/src)
    directory. Normally I would unit test this, but this package in particular
    is one that I don't expect a lot of people to use so I didn't take the time.
    In fact, I don't even report coverage on this project which is kinda rare
    for me 😅

I hope this was helpful! Good luck!

![See you on Twitter!](./images/0.png)

See you on [Twitter](https://twitter.com/react-vis)
