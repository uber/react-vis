// React Context

import React from 'react'
import {isEqual} from 'lodash'

// ./context/user-context.js

function useAuth() {
  // normally this is going to implement a similar pattern
  // learn more here: https://kcd.im/auth
  return {user: {username: 'jakiechan', tagline: '', bio: ''}}
}

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

const userClient = {
  async updateUser(user, updates) {
    await sleep(1000) // simulate a real-world wait period
    if (`${updates.tagline} ${updates.bio}`.includes('fail')) {
      return Promise.reject({message: 'Something went wrong'})
    }
    return {...user, ...updates}
  },
}

const UserStateContext = React.createContext()
const UserDispatchContext = React.createContext()

function userReducer(state, action) {
  switch (action.type) {
    case 'update': {
      return {user: action.updatedUser}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function UserProvider({children}) {
  const {user} = useAuth()
  const [state, dispatch] = React.useReducer(userReducer, {user})
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  )
}

function useUserState() {
  const context = React.useContext(UserStateContext)
  if (context === undefined) {
    throw new Error(`useUserState must be used within a UserProvider`)
  }
  return context
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext)
  if (context === undefined) {
    throw new Error(`useUserDispatch must be used within a UserProvider`)
  }
  return context
}

// got this idea from Dan and I love it:
// https://twitter.com/dan_abramov/status/1125773153584676864
async function updateUser(dispatch, user, updates) {
  const updatedUser = await userClient.updateUser(user, updates)
  dispatch({type: 'update', updatedUser})
}

// export {UserProvider, useUserDispatch, useUserState, updateUser}

// src/screens/user-profile.js

// import {UserProvider, useUserState, updateUser} from './context/user-context'

function UserSettings() {
  const {user} = useUserState()
  const userDispatch = useUserDispatch()

  const [asyncState, asyncDispatch] = React.useReducer(
    (s, a) => ({...s, ...a}),
    {status: null, error: null},
  )
  const {error, status} = asyncState
  const isPending = status === 'pending'
  const isRejected = status === 'rejected'

  const [formState, setFormState] = React.useState(user)

  const isChanged = !isEqual(user, formState)

  function handleChange(e) {
    setFormState({...formState, [e.target.name]: e.target.value})
  }

  function handleSubmit(event) {
    event.preventDefault()

    asyncDispatch({status: 'pending'})
    updateUser(userDispatch, user, formState).then(
      () => asyncDispatch({status: 'resolved'}),
      e => asyncDispatch({status: 'rejected', error: e}),
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="username">
          Username
        </label>
        <input
          id="username"
          name="username"
          disabled
          readOnly
          value={formState.username}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="tagline">
          Tagline
        </label>
        <input
          id="tagline"
          name="tagline"
          value={formState.tagline}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{display: 'block'}} htmlFor="bio">
          Biography
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={handleChange}
          style={{width: '100%'}}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button
          type="button"
          onClick={() => {
            setFormState(user)
            asyncDispatch({status: null, error: null})
          }}
          disabled={!isChanged || isPending}
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={(!isChanged && !isRejected) || isPending}
        >
          {isPending
            ? '...'
            : isRejected
            ? '✖ Try again'
            : isChanged
            ? 'Submit'
            : '✔'}
        </button>
      </div>
      {isRejected ? (
        <div style={{color: 'red', marginTop: 14}}>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </form>
  )
}

function Usage() {
  return (
    <div
      style={{
        backgroundColor: '#ddd',
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider>
        <UserSettings />
      </UserProvider>
    </div>
  )
}
Usage.title = 'Context'

export default Usage
