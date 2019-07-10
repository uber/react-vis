---
slug: write-your-own-code-transform
title: Write your own code transform for fun and profit
date: '2018-06-04'
author: React Vis
description:
  "_How to write your own code macro with babel-plugin-macros \U0001F3A3_"
keywords:
  - javascript
  - babel
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Mervyn Chan](https://unsplash.com/photos/RFXxBTHze_M) on
  [Unsplash](https://unsplash.com)'
---

If you haven't heard,
[`babel-plugin-macros`](https://github.com/uber/react-vis/babel-plugin-macros)
"enables zero-config, importable babel plugins." A few months ago, I published a
blog post about it on the official babel blog:
["Zero-config code transformation with babel-plugin-macros"](https://babeljs.io/blog/2017/09/11/zero-config-with-babel-macros).

Since then, there have been a few exciting developments:

1.  **You can use it with a create-react-app application** (v2 beta) because
    it's now included by default in the beta version of
    [`babel-preset-react-app`](https://www.npmjs.com/package/babel-preset-react-app)
    (which is what create-react-app v2 beta is using!)
2.  It [was added](https://github.com/fkling/astexplorer/pull/303) as an
    optional transform to [astexplorer.net](https://astexplorer.net) by
    [@FWeinb](https://twitter.com/FWeinb)

Up until now, only early adopters have tried to
[write a macro](https://github.com/uber/react-vis/babel-plugin-macros/blob/master/other/docs/author.md),
though there are a fair amount of
[people using](https://github.com/uber/react-vis/babel-plugin-macros/blob/master/other/docs/user.md)
the growing list of
[existing macros](https://github.com/uber/react-vis/babel-plugin-macros/blob/master/other/docs/macros.md).
There are tons of awesome things you can do with `babel-plugin-macros`, and I
want to dedicate this newsletter to showing you how to get started playing
around with writing your own.

Let's start off with a contrived macro that can split a string of text and
replace every space with `🐶`. We'll call it `gemmafy` because my dog's name is
"Gemma." Woof!

1.  Go to [astexplorer.net](https://astexplorer.net)
2.  Make sure the language is set to `JavaScript`
3.  Make sure the parser is set to `babylon7`
4.  Enable the transform and set it to `babel-macros` (or `babel-plugin-macros`
    as soon as [this is merged](https://github.com/fkling/astexplorer/pull/318))

Then copy/paste this in the source (top left) code panel:

```js
import gemmafy from 'gemmafy.macro'

console.log(gemmafy('hello world'))
```

And copy/paste this in the transform (bottom left) code panel:

```js
module.exports = createMacro(gemmafyMacro)

function gemmafyMacro({references, state, babel}) {
  references.default.forEach(referencePath => {
    const [firstArgumentPath] = referencePath.parentPath.get('arguments')
    const stringValue = firstArgumentPath.node.value
    const gemmafied = stringValue.split(' ').join(' 🐶 ')
    const gemmafyFunctionCallPath = firstArgumentPath.parentPath
    const gemmafiedStringLiteralNode = babel.types.stringLiteral(gemmafied)
    gemmafyFunctionCallPath.replaceWith(gemmafiedStringLiteralNode)
  })
}
```

> _Alternatively, you can
> [open this](https://astexplorer.net/#/gist/9d287441b6bd345f9e113c9c3b2b2aee/d5ebca867a522f8aa0120643883b97b83ee23fb4)_

TADA 🎉! You've written your (probably) very first babel plugin via a macro!

Here's the output that you should be seeing (in the bottom right panel):

```js
console.log('hello 🐶 world')
```

You'll notice that `babel-plugin-macros` will take care of removing the import
at the top of the file for you, and our macro replaced the `gemmafy` call with
the string.

So here's your challenge. Try to add this:

```js
console.log(gemmafy('hello world', 'world goodbye'))
```

Right now that'll transpile to:

```js
console.log('hello 🐶 world')
```

Your job is to make it do this instead:

```js
console.log('hello 🐶 world', 'goodbye 🐶 world')
```

From there, you can play around with it and do a lot of fun things!

If you want to see more of the capabilities, then copy this in the source (top
left):

```jsx
import myMacro, {JSXMacro} from 'AnyNameThatEndsIn.macro'
// (note: in reality, the AnyNameThatEndsIn.macro should be the name of your package
// for example: `codegen.macro`)
const functionCall = myMacro('Awesome')
const jsx = <JSXMacro cool="right!?">Hi!</JSXMacro>
const templateLiteral = myMacro`hi ${'there'}`
literallyAnythingWorks(myMacro)
```

And copy/paste this in the transform (bottom left) code panel:

```js
module.exports = createMacro(myMacro)

function myMacro({references, state, babel}) {
  // `state` is the second argument you're passed to a visitor in a
  // normal babel plugin. `babel` is the `@babel/core` module.
  // do whatever you like to the AST paths you find in `references`.
  // open up the console to see what's logged and start playing around!

  // references.default refers to the default import (`myMacro` above)
  // references.JSXMacro refers to the named import of `JSXMacro`
  const {JSXMacro = [], default: defaultImport = []} = references

  defaultImport.forEach(referencePath => {
    if (referencePath.parentPath.type === 'TaggedTemplateExpression') {
      console.log(
        'template literal contents',
        referencePath.parentPath.get('quasi'),
      )
    } else if (referencePath.parentPath.type === 'CallExpression') {
      if (referencePath === referencePath.parentPath.get('callee')) {
        console.log(
          'function call arguments (as callee)',
          referencePath.parentPath.get('arguments'),
        )
      } else if (
        referencePath.parentPath.get('arguments').includes(referencePath)
      ) {
        console.log(
          'function call arguments (as argument)',
          referencePath.parentPath.get('arguments'),
        )
      }
    } else {
      // throw a helpful error message or something :)
    }
  })

  JSXMacro.forEach(referencePath => {
    if (referencePath.parentPath.type === 'JSXOpeningElement') {
      console.log('jsx props', {
        attributes: referencePath.parentPath.get('attributes'),
        children: referencePath.parentPath.parentPath.get('children'),
      })
    } else {
      // throw a helpful error message or something :)
    }
  })
}
```

Next, open up your developer console and check out the console logs. Have fun
with that!

> _Alternatively, you can just
> [go here](https://astexplorer.net/#/gist/6efcadfda8975787d515a4a37c1a600a/635ba8b54af89d52171739c43a9a8a41627d461a)_

### Conclusion

I think there are a LOT of really cool places we can go with this technology. I
didn't spend any time in this newsletter talking about the _why_ behind macros
or giving you ideas. I'll link to some resources for ideas below. The basic idea
is if there's a way that you can pre-compile some of your operations, then you
can improve runtime performance/bundle size of your application. In addition,
this allows you to do some things at build time when you have access to the file
system. The possibilities are really endless and we're just getting started!
Enjoy!

**Learn more about ASTs from me**:

- [All about macros with babel-plugin-macros 🎣 (talk at ReactJS Utah)](https://youtu.be/nlAHtAQlFGk&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [Code Transformation and Linting Course on Frontend Masters](https://frontendmasters.com/workshops/code-transformation-linting-asts)
- [Code Transformation and Linting Workshop (very rough practice run)](https://youtu.be/-iA7TAUGn2Y&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)
- [Writing custom Babel and ESLint plugins with ASTs (talk at Open West 2017)](https://youtu.be/VBscbcm2Mok&list=PLV5CVI1eNcJgNqzNwcs4UKrlJdhfDjshf)

**Things to not miss**:

- [React Europe Talks Day 1](https://youtube.com/watch?list=PLCC436JpVnK3xH_ArpIjdkYDGwWNkVa73&v=aOWIJ4Mgb2k)
- [React Europe Talks Day 2](https://youtu.be/WYWVGQKnz5M&list=PLCC436JpVnK1X7atG6EIz467Evs4TMX_5)
- [Stop writing code — Sunil Pai aka @threepointone at @ReactEurope 2018](https://youtu.be/WYWVGQKnz5M) — See
  the part where [Sunil](https://twitter.com/threepointone) talks about the
  origin story of `babel-plugin-macros`
  [starting at 8m57s](https://youtu.be/WYWVGQKnz5M?t=8m57s). (Also, I love you
  too Sunil 😍)
- [Pre-evaluate code at build time](https://youtu.be/NhmrbpVKgdQ&list=LLz-BYvuntVRt_VpfR6FKXJw)
  from [Siddharth Kshetrapal](https://twitter.com/siddharthkp).
- [DevTips with Kent](http://kcd.im/devtips) — Daily live streams showing what
  I'm learning, working on, or answering common questions I get.
