import ApiUrl from '@/constants/api-url'
import { MenuList, SystemMenuState } from '@/models/system-menu'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import {
  FETCH_SYSTEM_MENU_BEGIN,
  FETCH_SYSTEM_MENU_FAILED,
  FETCH_SYSTEM_MENU_SUCCESS,
} from './constant'

const fetchSystemMenuBeginAction = () => ({
  type: FETCH_SYSTEM_MENU_BEGIN,
})
const fetchSystemMenuSuccessAction = (data: MenuList) => ({
  type: FETCH_SYSTEM_MENU_SUCCESS,
  data,
})
const fetchSystemMenuFailedAction = (data: { error: any }) => ({
  type: FETCH_SYSTEM_MENU_FAILED,
  data,
})

export const useSystemMenu = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemMenu)

  const fetchSystemMenu = useCallback(
    () => dispatch(fetchSystemMenuAsyncAction()),
    [dispatch]
  )

  return {
    ...data,
    fetchSystemMenu,
  }
}

export const fetchSystemMenuAsyncAction = () => {
  return async (dispatch) => {
    dispatch(fetchSystemMenuBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemMenuList)
      dispatch(fetchSystemMenuSuccessAction(data))
    } catch (error) {
      dispatch(fetchSystemMenuFailedAction({ error }))
    }
  }
}

type ActionType = ReturnType<typeof fetchSystemMenuSuccessAction> &
  ReturnType<typeof fetchSystemMenuFailedAction>

export default function fetchSystemMenuReducer(
  state = {} as SystemMenuState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_SYSTEM_MENU_BEGIN:
      return {
        ...state,
        systemMenuListPending: true,
        systemMenuListError: null,
      }
    case FETCH_SYSTEM_MENU_SUCCESS:
      return {
        ...state,
        systemMenuList: action.data,
        systemMenuListPending: false,
        systemMenuListError: null,
      }
    case FETCH_SYSTEM_MENU_FAILED:
      return {
        ...state,
        systemMenuListPending: false,
        systemMenuListError: action.data.error,
      }
    default:
      return state
  }
}
