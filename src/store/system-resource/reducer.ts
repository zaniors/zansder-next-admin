import { SystemResourceState } from '@/models/system-resource'
import addOrEditSystemResourceReducer from './system-resource-add-or-edit'
import fetchSystemResourceReducer from './system-resource-list'
import fetchSystemRoleResourceReducer from './system-role-resource'

const reducers = [
  fetchSystemResourceReducer,
  addOrEditSystemResourceReducer,
  fetchSystemRoleResourceReducer,
]

export default function systemResourceReducer(
  state = {} as SystemResourceState,
  action
) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
