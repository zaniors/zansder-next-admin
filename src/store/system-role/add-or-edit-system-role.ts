import ApiUrl from '@/constants/api-url'
import { history } from '@/router'
import { useMatchQuery } from '@/utils/hook'
import http from '@/utils/http'
import { message } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import initialState from '../state'
import { useFetchRoleMenu } from '../system-menu/hook'
import {
  SystemRoleAddOrEditInput,
  SystemRoleMenuInput,
  SystemRoleState,
} from '@/models/system-role'
import {
  CLEAR_SYSTEM_ROLE_ADD_OR_EDIT_INPUT,
  SET_SYSTEM_ROLE_ADD_OR_EDIT_INPUT,
} from './constant'

export const clearSystemRoleAddOrEditInputAction = () => ({
  type: CLEAR_SYSTEM_ROLE_ADD_OR_EDIT_INPUT,
})
export const setSystemRoleAddOrEditInputAction = (
  data: SystemRoleAddOrEditInput
) => ({
  type: SET_SYSTEM_ROLE_ADD_OR_EDIT_INPUT,
  data,
})

export const addSystemRoleAsyncAction = (input: SystemRoleAddOrEditInput) => {
  return async () => {
    await http.post(ApiUrl.SystemRoleAdd, input)
    message.success('添加角色成功')
    history.goBack()
  }
}
export const editSystemRoleAsyncAction = (input: SystemRoleAddOrEditInput) => {
  return async () => {
    await http.put(ApiUrl.SystemRoleUpdate, input)
    message.success('更新角色成功')
    history.goBack()
  }
}
export const addSystemRoleMenuAsyncAction = (input: SystemRoleMenuInput) => {
  return async () => {
    await http.put(ApiUrl.SystemRoleMenuUpdate, input)
    message.success('关联菜单成功')
    history.goBack()
  }
}

export const useAddOrEditSystemRole = () => {
  const dispatch = useDispatch()
  const isAddMenu = useMatchQuery('type', 'addMenu')
  const data = useSelector((state: RootStore) => state.systemRole)
  const { roleMenuListIds } = useFetchRoleMenu()

  const clearSystemRoleAddOrEditInput = useCallback(
    () => dispatch(clearSystemRoleAddOrEditInputAction()),
    [dispatch]
  )

  const setSystemRoleAddOrEditInput = useCallback(
    (input: SystemRoleAddOrEditInput) =>
      dispatch(setSystemRoleAddOrEditInputAction(input)),
    [dispatch]
  )

  const fetchAddSystemRole = useCallback(
    () => dispatch(addSystemRoleAsyncAction(data.systemRoleAddOrEditInput)),
    [data.systemRoleAddOrEditInput, dispatch]
  )

  const fetchEditSystemRole = useCallback(
    () => dispatch(editSystemRoleAsyncAction(data.systemRoleAddOrEditInput)),
    [data.systemRoleAddOrEditInput, dispatch]
  )

  const fetchAddSystemRoleMenu = useCallback(
    (input: SystemRoleMenuInput) =>
      dispatch(addSystemRoleMenuAsyncAction(input)),
    [dispatch]
  )

  const submitForm = useCallback(() => {
    if (isAddMenu && data.systemRoleAddOrEditInput.id) {
      // 只更新角色菜单关系
      fetchAddSystemRoleMenu({
        rid: data.systemRoleAddOrEditInput.id,
        menuIds: roleMenuListIds,
      })
      return
    }

    if (data.systemRoleAddOrEditInput.id) {
      // 更新角色信息
      fetchEditSystemRole()
      return
    }

    // 添加系统角色
    fetchAddSystemRole()
  }, [
    data.systemRoleAddOrEditInput.id,
    fetchAddSystemRole,
    fetchAddSystemRoleMenu,
    fetchEditSystemRole,
    isAddMenu,
    roleMenuListIds,
  ])

  return {
    ...data,
    submitForm,
    isAddMenu,
    fetchAddSystemRole,
    fetchEditSystemRole,
    setSystemRoleAddOrEditInput,
    clearSystemRoleAddOrEditInput,
  }
}

type ActionType = ReturnType<typeof setSystemRoleAddOrEditInputAction>
export default function addOrEditSystemRoleReducer(
  state = {} as SystemRoleState,
  action: ActionType
) {
  const init = JSON.parse(
    JSON.stringify(initialState.systemRole)
  ) as SystemRoleState
  switch (action.type) {
    case CLEAR_SYSTEM_ROLE_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemRoleAddOrEditInput: {
          ...init.systemRoleAddOrEditInput,
        },
      }
    case SET_SYSTEM_ROLE_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemRoleAddOrEditInput: {
          ...action.data,
        },
      }
    default:
      return state
  }
}
