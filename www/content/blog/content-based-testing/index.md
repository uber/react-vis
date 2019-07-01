---
slug: 'content-based-testing'
title: 'Content-based Testing'
date: '2019-06-03'
author: 'Kent C. Dodds'
description:
  "_Why it's better to write UI tests that rely on text content than anything
  else._"
categories:
  - 'testing'
keywords:
  - 'javascript'
  - 'react'
  - 'e2e testing'
  - 'unit testing'
  - 'integration testing'
  - 'react testing library'
  - 'internationalization'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Kelly Sikkema](https://unsplash.com/photos/FxbhjqegUs8)'
published: false
---

Almost every time I introduce [Testing Library](https://testing-library.com) to
a group of people, I inevitably get an honest question from someone about code
like this:

```javascript
const submitButton = getByText(/submit/i)
```

The question goes something like this:

> What about localization? How do I select by text content when my content is
> defined in another file. And even if I manage that, what about when our
> localization team makes regular changes to the content? I don't want my tests
> to break when another team makes changes to the content.

These are great questions. There are several things you can do.

## Load your default locale in your tests

Everywhere is a bit different, but wherever you are, you probably have a module
which can convert your `locales/` directory into a JavaScript object/json file
when you build or run your app. The idea here is to run that for your default
locale before any of the tests run in a
[`setupFilesAfterEnv` file](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array)
(or similar) and then initialize your localization abstraction with those
translations.

This is basically what I setup when I was working on
[`paypal-scripts` at PayPal](/blog/tools-without-config) and it worked really
well for us. Here's (basically) what it looked like:

```javascript
import getLocalizedContent from 'some-l10n-module'
import {initMessages} from 'our-l10n-abstraction'

// note: if this is async for you, then you could try jest's globalSetup and write it to a json file, then read that json file here.
const enUS = getLocalizedContent('en-US')

initMessages(enUS)
```

If you're using something like [LinguiJS](https://lingui.js.org) which provides
an awesome babel plugin ([and a](https://lingui.js.org/ref/macro.html)
[macro!](https://github.com/kentcdodds/babel-plugin-macros)) that allows you to
write your content directly in your source code (super cool!), but requires that
your content be provided via the `I18nProvider` then you can include that in
[the custom render](https://testing-library.com/docs/react-testing-library/setup#custom-render)
method which you should be using:

```javascript
import React from 'react'
import {render} from '@testing-library/react'
import catalogCs from './locale/cs/messages.js'

import {I18nProvider} from '@lingui/react'

const catalogs = {cs: catalogCs}
const App = () => (
  <I18nProvider language="cs" catalogs={catalogs}>
    <Inbox />
  </I18nProvider>
)

import {ThemeProvider} from 'my-ui-lib'
import {TranslationProvider} from 'my-i18n-lib'
import defaultStrings from 'i18n/en-x-default'

const AllTheProviders = ({children}) => {
  return (
    <ThemeProvider theme="light">
      <TranslationProvider messages={defaultStrings}>
        {children}
      </TranslationProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}
```
