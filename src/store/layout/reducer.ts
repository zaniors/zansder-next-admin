import { LayoutPageState } from '@/models/layout'
import { layoutSiderTriggerReducer } from './sider-trigger'

const reducers = [layoutSiderTriggerReducer]

export default function layoutReducer(state = {} as LayoutPageState, action) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
