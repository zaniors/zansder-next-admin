import ApiUrl from '@/constants/api-url'
import {
  ResourceItem,
  SystemResourceAddOrEditInput,
  SystemResourceState,
} from '@/models/system-resource'
import { history } from '@/router'
import http from '@/utils/http'
import { message } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import initialState from '../state'
import {
  CLEAR_SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT,
  FETCH_SYSTEM_RESOURCE_DETAIL_SUCCESS,
  SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT,
} from './constant'

export const clearSystemResourceAddOrEditInputAction = () => ({
  type: CLEAR_SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT,
})
export const setSystemResourceAddOrEditInputAction = (
  data: SystemResourceAddOrEditInput
) => ({
  type: SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT,
  data,
})
export const setSystemResourceDetailAction = (data: ResourceItem) => ({
  type: FETCH_SYSTEM_RESOURCE_DETAIL_SUCCESS,
  data,
})

const addSystemResourceAsyncAction = (input: SystemResourceAddOrEditInput) => {
  return async () => {
    await http.post(ApiUrl.SystemResourceCreate, input)
    message.success('添加资源成功')
    history.goBack()
  }
}
const editSystemResourceAsyncAction = (input: SystemResourceAddOrEditInput) => {
  return async () => {
    await http.put(ApiUrl.SystemResourceUpdate, input)
    message.success('更新资源成功')
    history.goBack()
  }
}

export const fetchSystemResourceDetailAsyncAction = (params: {
  id: string
}) => {
  return async (dispatch) => {
    const { data } = await http.get(ApiUrl.SystemResourceDetail, { params })
    dispatch(setSystemResourceDetailAction(data))
  }
}

export const useAddOrEditSystemResource = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemResource)

  const clearSystemResourceAddOrEditInput = useCallback(
    () => dispatch(clearSystemResourceAddOrEditInputAction()),
    [dispatch]
  )

  const setSystemResourceAddOrEditInput = useCallback(
    (input: SystemResourceAddOrEditInput) =>
      dispatch(setSystemResourceAddOrEditInputAction(input)),
    [dispatch]
  )

  const fetchAddSystemResource = useCallback(
    () =>
      dispatch(addSystemResourceAsyncAction(data.systemResourceAddOrEditInput)),
    [data.systemResourceAddOrEditInput, dispatch]
  )

  const fetchEditSystemResource = useCallback(
    () =>
      dispatch(
        editSystemResourceAsyncAction(data.systemResourceAddOrEditInput)
      ),
    [data.systemResourceAddOrEditInput, dispatch]
  )

  const fetchSystemResourceDetail = useCallback(
    (params: { id: string }) => {
      if (!params.id) return
      dispatch(fetchSystemResourceDetailAsyncAction(params))
    },
    [dispatch]
  )

  const submitForm = useCallback(() => {
    if (data.systemResourceAddOrEditInput.id) {
      fetchEditSystemResource()
      return
    }

    fetchAddSystemResource()
  }, [
    data.systemResourceAddOrEditInput.id,
    fetchAddSystemResource,
    fetchEditSystemResource,
  ])

  return {
    ...data,
    submitForm,
    fetchAddSystemResource,
    fetchEditSystemResource,
    fetchSystemResourceDetail,
    setSystemResourceAddOrEditInput,
    clearSystemResourceAddOrEditInput,
  }
}

type ActionType = ReturnType<typeof setSystemResourceAddOrEditInputAction> &
  ReturnType<typeof setSystemResourceDetailAction>

export default function addOrEditSystemResourceReducer(
  state = {} as SystemResourceState,
  action: ActionType
) {
  const init = JSON.parse(
    JSON.stringify(initialState.systemResource)
  ) as SystemResourceState
  switch (action.type) {
    case CLEAR_SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemResourceAddOrEditInput: {
          ...init.systemResourceAddOrEditInput,
        },
      }
    case SYSTEM_RESOURCE_ADD_OR_EDIT_INPUT:
      return {
        ...state,
        systemResourceAddOrEditInput: {
          ...action.data,
        },
      }
    case FETCH_SYSTEM_RESOURCE_DETAIL_SUCCESS:
      return {
        ...state,
        systemResourceAddOrEditInput: {
          ...action.data,
          id: action.data._id,
        },
      }
    default:
      return state
  }
}
