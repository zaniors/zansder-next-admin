import ApiUrl from '@/constants/api-url'
import { MenuItem, SystemMenuState } from '@/models/system-menu'
import { SystemRoleId } from '@/models/system-role'
import findIds from '@/utils/find-ids'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import { useSystemMenu } from './hook'
import {
  FETCH_ROLE_MENU_BEGIN,
  FETCH_ROLE_MENU_FAILED,
  FETCH_ROLE_MENU_SUCCESS,
  SET_ROLE_MENU_IDS,
} from '../system-role/constant'

const fetchRoleMenuBeginAction = () => ({
  type: FETCH_ROLE_MENU_BEGIN,
})
const fetchRoleMenuSuccessAction = (data: MenuItem[]) => ({
  type: FETCH_ROLE_MENU_SUCCESS,
  data,
})
const fetchRoleMenuFailedAction = (error: any) => ({
  type: FETCH_ROLE_MENU_FAILED,
  data: error,
})

export const fetchRoleMenuAsyncAction = (params: SystemRoleId) => {
  return async (dispatch) => {
    dispatch(fetchRoleMenuBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemRoleMenu, { params })
      dispatch(fetchRoleMenuSuccessAction(data))
    } catch (error) {
      dispatch(fetchRoleMenuFailedAction(error))
    }
  }
}

const setRoleMenuIdsAction = (data: { ids: string[] }) => ({
  type: SET_ROLE_MENU_IDS,
  data,
})

export const useFetchRoleMenu = () => {
  const dispatch = useDispatch()
  const { fetchSystemMenu, systemMenuList } = useSystemMenu()
  const data = useSelector((state: RootStore) => state.systemMenu)

  const fetchRoleMenu = useCallback(
    async (params: SystemRoleId) => {
      await fetchSystemMenu()
      await dispatch(fetchRoleMenuAsyncAction(params))
    },
    [dispatch, fetchSystemMenu]
  )

  const setRoleMenuIds = useCallback(
    (ids: string[]) => dispatch(setRoleMenuIdsAction({ ids })),
    [dispatch]
  )

  return {
    ...data,
    systemMenuList,
    setRoleMenuIds,
    fetchRoleMenu,
  }
}

type ActionType = ReturnType<typeof fetchRoleMenuSuccessAction> &
  ReturnType<typeof setRoleMenuIdsAction>

export default function fetchRoleMenuReducer(
  state = {} as SystemMenuState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_ROLE_MENU_SUCCESS:
      const roleMenuListIds = findIds(action.data)

      return {
        ...state,
        roleMenuList: [...action.data],
        roleMenuListIds,
      }
    case SET_ROLE_MENU_IDS:
      return {
        ...state,
        roleMenuListIds: action.data.ids,
      }
    default:
      return state
  }
}
