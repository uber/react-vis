---
slug: 'authentication-in-react-applications'
title: 'Authentication in React Applications'
date: '2019-05-20'
author: 'Kent C. Dodds'
description:
  '_How to handle user authentication in modern React Applications with context
  and hooks_'
categories:
  - 'react'
keywords:
  - 'javascript'
  - 'react'
  - 'router'
  - 'authentication'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Mike Enerio](https://unsplash.com/photos/H58bnmnedTc)'
---

## Skipping to the end

Here's the secret to this blog post in one short code example:

```jsx
import React from 'react'
import {useUser} from './context/auth'
import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'

function App() {
  const user = useUser()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export App
```

That's it.
[Most apps](https://twitter.com/kentcdodds/status/1131184429169168387) which
require authentication of any kind can be drastically simplified by that one
little trick. Rather than trying to do something fancy to redirect the user when
they happen to land on a page that they're not supposed to, instead you don't
render that stuff at all. Things get even cooler when you do this:

```jsx
import React from 'react'
import {useUser} from './context/auth'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'))

function App() {
  const user = useUser()
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export App
```

Sweet, now you don't even bother loading the code until it's needed. So the
login screen shows up faster for unauthenticated users and the app loads faster
for authenticated users.

What the `<AuthenticatedApp />` and `<UnauthenticatedApp />` do is totally up to
you. Maybe they render unique routers. Maybe they even use some of the same
components. But whatever they do, you don't have to bother wondering whether the
user is logged in because you make it literally impossible to render one side of
the app or the other if there is no user.

## How do we get here?

> If you want to just look at how it's all done, then you can checkout
> [the bookshelf repo](https://github.com/kentcdodds/bookshelf) which I made for
> my [Build ReactJS Applications Workshop](/workshops/build-react-apps).

Ok, so what do you do to get to this point? Let's start by looking at where
we're actually rendering the app:

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import AppProviders from './context'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)
```

And here's that `<AppProviders />` component:

```jsx
import React from 'react'
import {AuthProvider} from './auth-context'
import {UserProvider} from './user-context'

function AppProviders({children}) {
  return (
    <AuthProvider>
      <UserProvider>{children}</UserProvider>
    </AuthProvider>
  )
}

export default AppProviders
```

Ok, cool, so we have a provider from the app's authentication and one for the
user's data. So presumably the `<AuthProvider />` would be responsible for
bootstrapping the app data (if the user's authentication token is already in
localStorage then we can simply retrieve the user's data using that token). Then
the `<UserProvider />` would be responsible for keeping the user data up to date
in memory and on the server as we make changes to the user's data (like their
email address/bio/etc.).

[The `auth-context.js` file](https://github.com/kentcdodds/bookshelf/blob/69bde2c117660bd988ffbc60f387165d2f852c62/src/context/auth-context.js)
has some stuff in it that's outside the scope of this blog post/domain specific,
so I'm only going to show a slimmed down/modified version of it:

```jsx
import React from 'react'
import {FullPageSpinner} from '../components/lib'

const AuthContext = React.createContext()

function AuthProvider(props) {
  // code for pre-loading the user's information if we have their token in localStorage goes here

  // 🚨 this is the important bit.
  // Normally your provider components render the context provider with a value.
  // But we post-pone rendering any of the children until after we've determined
  // whether or not we have a user token and if we do, then we render a spinner
  // while we go retrieve that user's information.
  if (weAreStillWaitingToGetTheUserData) {
    return <FullPageSpinner />
  }

  const login = () => {} // make a login request
  const register = () => {} // register the user
  const logout = () => {} // clear the token in localStorage and the user data

  // note, I'm not bothering to optimize this `value` with React.useMemo here
  // because this is the top-most component rendered in our app and it will very
  // rarely re-render/cause a performance problem.
  return (
    <AuthContext.Provider value={{data, login, logout, register}} {...props} />
  )
}

const useAuth = () => React.useContext(AuthContext)

export {AuthProvider, useAuth}

// the UserProvider in user-context.js is basically:
// const UserProvider = props => (
//   <UserContext.Provider value={useAuth().data.user} {...props} />
// )
// and the useUser hook is basically this:
// const useUser = () => React.useContext(UserContext)
```

The key idea that drastically simplifies authentication in your app is this:

> The component which has the user data prevents the rest of the app from being
> rendered until the user data is retrieved or it's determined that there is no
> logged-in user

It does this by simply returning a spinner instead of rendering the rest of the
app. It's not rendering a router or anything at all really. Just a spinner until
we know whether we have a user token _and_ attempt to get that user's
information. Once that's done, then we can continue with rendering the rest of
the app.

## Conclusion

Many apps are different. If you're doing server-side rendering then you probably
don't need a spinner and you have the user's information available to you by the
time you start rendering. Even in that situation, taking a branch higher up in
the tree of your app drastically simplifies the maintenance of your app.

I hope this is helpful to you. You can checkout
[the bookshelf repo](https://github.com/kentcdodds/bookshelf)
([or even edit it on codesandbox](https://codesandbox.io/s/github/kentcdodds/bookshelf))
for a more complete picture of what all this is like in a more realistic
scenario with all the pieces together.

## P.S.

Several people have asked me: What if my app has lots of shared screens between
authenticated and unauthenticated users (like Twitter) rather than having very
different screens between authenticated and unauthenticated users (like Gmail)?

In that case then you'll probably need to litter a bunch of `useUser()` hooks
all over the codebase. You might make it even easier with a
`useIsAuthenticated()` hook that simply returns a boolean if the user is logged
in. Either way, it's pretty simple thanks to context + hooks :)
