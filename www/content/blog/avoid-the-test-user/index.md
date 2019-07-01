---
slug: 'avoid-the-test-user'
title: 'Avoid the Test User'
date: '2019-05-24'
author: 'React Vis'
description:
  '_How your UI code has only two users, but the wrong tests can add a third_'
categories:
  - 'testing'
keywords:
  - 'testing'
  - 'javascript'
  - 'react'
banner: './images/banner.jpg'
bannerCredit:
  'Photo by [Genevieve Perron-Migneron](https://unsplash.com/photos/vXZ_lC0XN4c)'
---

import UserProfileExample from './user-profile-example'

The two users your UI code has are 1) The end user that's interacting with your
component and 2) the developer rendering your component. Imagine you have the
following UI (taken from my
[Advanced React Patterns](/workshops/advanced-react-patterns) material):

<div style={{maxWidth: 300, margin: '10px auto 40px auto'}}>
  <UserProfileExample />
</div>

> Note: this is not a screenshot. You can actually interact with that form.
> Hooray for [MDX](https://mdxjs.com)!

The form component here is called `<UserSettings />`. This component exposes a
certain API for the developers rendering it and the users using it.

**The End User**: Renders a username field (which is disabled because it cannot
be changed), tagline field, and biography field. When the end user changes one
of the values, the reset and submit buttons become enabled. When they click the
reset button the form is reset and when they click the submit button it saves
the user's info (showing a loading state while we wait for the request to
finish). (In this demo, if you type "fail" in the tagline or biography then the
request fails and you can see the error state as well).

**The Developer User**: They render this component within a `<UserProvider />`
so the component can access and update the application `user` state and dispatch
which is stored in React context.

These are the only two users that your component should be concerned with. This
component can experience a lot of changes over time. If it makes changes that
alter the developer's API or the end user's expectations, then additional
changes need to be made. If it changes the API, (like maybe it accepts a user
prop instead of accessing it from context) then the developer user will have to
alter its usage to account for that. If it changes the user experience, then
maybe there will need to be release notes explaining the updates, or some
training material updated for example.

However, it can change in other ways too. Internal refactorings which change how
things are implemented (for example, to make the code easier to follow), but
don't change the experience of the developer using the component or the end user
using it. With these kinds of changes, no additional work outside the component
is needed.

---

## The Test User

So what does this have to do with testing? One thing that I talk about a lot is
"[The more your tests resemble the way your software is used, the more confidence they can give you.](https://twitter.com/react-vis/status/977018512689455106) "
So knowing how your software is used is really valuable. It gives you a guide
for knowing how to test the component.

But far too often, I see tests which are
[testing implementation details](/blog/testing-implementation-details) (read
this before continuing if you haven't already). When you do this, you introduce
a third user. The developer user and the end user are really all that matters
for this component. So long as it serves those two, then it has a reason to
exist. And when you're maintaining the component you need to keep those two
users in mind to make sure that if you break the contract with them, you do
something to handle that change.

But as soon as you start testing things which your developer user and end user
don't know or care about (implementation details), you add a third testing user,
you're now having to keep that third user in your head and make sure you account
for changes that affect the testing user as well.

And for what? To get "confidence?" But what are you getting confidence in when
you test things this way? You're getting confidence that things work for the
testing user. But nobody cares about the testing user. The testing user doesn't
pay the bills like the end user. It doesn't affect the rest of the system like
the developer user.

## Conclusion

Writing tests that include implementation details is all downside and no upside.
Focus on the developer user and the end user and your tests will actually give
you confidence that things will continue to work for them. When your tests break
it becomes a cue for you to know that you have other changes to make elsewhere
to account for the changes you've made. Avoid testing implementation details and
you'll be much better off.

> P.S. If you're interested to know how I'd test this component in a way that's
> free of implementation details, then you can
> [look at the tests here](https://github.com/react-vis/advanced-react-patterns/blob/06a16f86d2397c4451da9faf9aeb64cbe4452ff6/src/__tests__/01.js)

<!-- separate quoted text -->

> P.S.P.S. There are definitely situations where mocking and testing
> implementation details is necessary, read more about that in
> [The Merits of Mocking](/blog/the-merits-of-mocking)
