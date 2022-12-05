import ApiUrl from '@/constants/api-url'
import {
  MenuItem,
  SystemMenuAddOrEditInput,
  SystemMenuId,
  SystemMenuState,
} from '@/models/system-menu'
import { history } from '@/router'
import http from '@/utils/http'
import { message } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import initialState from '../state'
import {
  CLEAR_SYSTEM_MENU_ADD_OR_EDIT_INPUT,
  FETCH_SYSTEM_MENU_DETAIL_SUCCESS,
  SYSTEM_MENU_ADD_OR_EDIT_INPUT,
} from './constant'

export const clearSystemMenuAddOrEditInputAction = () => ({
  type: CLEAR_SYSTEM_MENU_ADD_OR_EDIT_INPUT,
})
export const setSystemMenuAddOrEditInputAction = (
  data: SystemMenuAddOrEditInput
) => ({
  type: SYSTEM_MENU_ADD_OR_EDIT_INPUT,
  data,
})
export const setSystemMenuDetailAction = (data: MenuItem) => ({
  type: FETCH_SYSTEM_MENU_DETAIL_SUCCESS,
  data,
})

const addSystemMenuAsyncAction = (input: SystemMenuAddOrEditInput) => {
  return async () => {
    await http.post(ApiUrl.SystemMenuCreate, input)
    message.success('添加菜单成功')
    history.goBack()
  }
}
const editSystemMenuAsyncAction = (input: SystemMenuAddOrEditInput) => {
  return async () => {
    await http.put(ApiUrl.SystemMenuUpdate, input)
    message.success('更新菜单成功')
    history.goBack()
  }
}

export const fetchSystemMenuDetailAsyncAction = (params: SystemMenuId) => {
  return async (dispatch) => {
    const { data } = await http.get(ApiUrl.SystemMenuDetail, { params })
    dispatch(setSystemMenuDetailAction(data))
  }
}

export const useAddOrEditSystemMenu = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemMenu)

  const clearSystemMenuAddOrEditInput = useCallback(
    () => dispatch(clearSystemMenuAddOrEditInputAction()),
    [dispatch]
  )

  const setSystemMenuAddOrEditInput = useCallback(
    (input: SystemMenuAddOrEditInput) =>
      dispatch(setSystemMenuAddOrEditInputAction(input)),
    [dispatch]
  )

  const fetchAddSystemMenu = useCallback(
    () => dispatch(addSystemMenuAsyncAction(data.systemMenuAddOrEditInput)),
    [data.systemMenuAddOrEditInput, dispatch]
  )

  const fetchEditSystemMenu = useCallback(
    () => dispatch(editSystemMenuAsyncAction(data.systemMenuAddOrEditInput)),
    [data.systemMenuAddOrEditInput, dispatch]
  )

  const fetchSystemMenuDetail = useCallback(
    (params: SystemMenuId) => {
      if (!params.id) return
      dispatch(fetchSystemMenuDetailAsyncAction(params))
    },
    [dispatch]
  )

  const submitForm = useCallback(() => {
    if (data.systemMenuAddOrEditInput.id) {
      fetchEditSystemMenu()
      return
    }

    fetchAddSystemMenu()
  }, [
    data.systemMenuAddOrEditInput.id,
    fetchAddSystemMenu,
    fetchEditSystemMenu,
  ])

  return {
    ...data,
    submitForm,
    fetchAddSystemMenu,
    fetchEditSystemMenu,
    fetchSystemMenuDetail,
    setSystemMenuAddOrEditInput,
    clearSystemMenuAddOrEditInput,
  }
}

type ActionType = ReturnType<typeof setSystemMenuAddOrEditInputAction> &
  ReturnType<typeof setSystemMenuDetailAction>
export default function addOrEditSystemMenuReducer(
  state = {} as SystemMenuState,
  action: ActionType
) {
  const init = JSON.parse(
    JSON.stringify(initialState.systemMenu)
  ) as SystemMenuState
  switch (action.type) {
    case CLEAR_SYSTEM_MENU_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemMenuAddOrEditInput: {
          ...init.systemMenuAddOrEditInput,
        },
      }
    case SYSTEM_MENU_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemMenuAddOrEditInput: {
          ...action.data,
        },
      }
    case FETCH_SYSTEM_MENU_DETAIL_SUCCESS:
      return {
        ...state,
        systemMenuAddOrEditInput: {
          ...action.data,
          id: action.data._id,
        },
      }
    default:
      return state
  }
}
