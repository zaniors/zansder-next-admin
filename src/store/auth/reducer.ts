import { AuthState } from '@/models/auth'
import signinReducer from './fetch-signin'
import fetchUserInfoReducer from './fetch-user'

const reducers = [signinReducer, fetchUserInfoReducer]

export default function authReducer(state = {} as AuthState, action) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
