import { SystemRoleState } from '@/models/system-role'
import addOrEditSystemRoleReducer from './add-or-edit-system-role'
import fetchSystemRoleDetailReducer from './fetch-system-role-detail'
import fetchSystemRoleReducer from './system-role-list'

const reducers = [
  fetchSystemRoleReducer,
  addOrEditSystemRoleReducer,
  fetchSystemRoleDetailReducer,
]

export default function systemRoleReducer(
  state = {} as SystemRoleState,
  action
) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
