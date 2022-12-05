import { LayoutPageState } from '@/models/layout'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import { LAYOUT_SIDER_TRIGGER } from './constant'

export const layoutSiderTriggerAction = () => ({
  type: LAYOUT_SIDER_TRIGGER,
})

export function useLayoutSiderTrigger() {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.layout.sider)
  const layoutSiderTrigger = useCallback(
    () => dispatch(layoutSiderTriggerAction()),
    [dispatch]
  )

  return {
    ...data,
    layoutSiderTrigger,
  }
}

export function layoutSiderTriggerReducer(
  state = {} as LayoutPageState,
  action
) {
  switch (action.type) {
    case LAYOUT_SIDER_TRIGGER:
      return {
        ...state,
        sider: {
          ...state.sider,
          collapsed: !state.sider.collapsed,
        },
      }
    default:
      return state
  }
}
