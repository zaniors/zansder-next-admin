import { SystemMenuState } from '@/models/system-menu'
import fetchRoleMenuReducer from './fetch-role-menu'
import addOrEditSystemMenuReducer from './system-menu-add-or-edit'
import fetchSystemMenuReducer from './system-menu-list'

const reducers = [
  fetchSystemMenuReducer,
  addOrEditSystemMenuReducer,
  fetchRoleMenuReducer,
]

export default function systemMenuReducer(
  state = {} as SystemMenuState,
  action
) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
