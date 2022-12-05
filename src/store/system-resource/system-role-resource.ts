import ApiUrl from '@/constants/api-url'
import {
  ResourceBindRoleInput,
  ResourceItem,
  SystemResourceState,
} from '@/models/system-resource'
import http from '@/utils/http'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import { useSystemResource } from './hook'
import {
  FETCH_SYSTEM_ROLE_RESOURCE_BEGIN,
  FETCH_SYSTEM_ROLE_RESOURCE_SUCCESS,
  FETCH_SYSTEM_ROLE_RESOURCE_FAILED,
  SUBMIT_SYSTEM_ROLE_RESOURCE_FAILED,
  SUBMIT_SYSTEM_ROLE_RESOURCE_SUCCESS,
  SUBMIT_SYSTEM_ROLE_RESOURCE_BEGIN,
} from './constant'

const fetchSystemRoleResourceBeginAction = () => ({
  type: FETCH_SYSTEM_ROLE_RESOURCE_BEGIN,
})
const fetchSystemRoleResourceSuccessAction = (data: ResourceItem[]) => ({
  type: FETCH_SYSTEM_ROLE_RESOURCE_SUCCESS,
  data,
})
const fetchSystemRoleResourceFailedAction = (data: { error: any }) => ({
  type: FETCH_SYSTEM_ROLE_RESOURCE_FAILED,
  data,
})
export const fetchSystemRoleResourceAsyncAction = (params: { id: string }) => {
  return async (dispatch) => {
    dispatch(fetchSystemRoleResourceBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemRoleResourceList, { params })
      dispatch(fetchSystemRoleResourceSuccessAction(data))
    } catch (error) {
      dispatch(fetchSystemRoleResourceFailedAction({ error }))
    }
  }
}

const submitSystemRoleResourceBeginAction = () => ({
  type: SUBMIT_SYSTEM_ROLE_RESOURCE_BEGIN,
})
const submitSystemRoleResourceSuccessAction = () => ({
  type: SUBMIT_SYSTEM_ROLE_RESOURCE_SUCCESS,
})
const submitSystemRoleResourceFailedAction = (data: { error: any }) => ({
  type: SUBMIT_SYSTEM_ROLE_RESOURCE_FAILED,
  data,
})
export const submitSystemRoleResourceAsyncAction = (
  input: ResourceBindRoleInput
) => {
  return async (dispatch) => {
    dispatch(submitSystemRoleResourceBeginAction())

    try {
      await http.put(ApiUrl.SubmitSystemRoleResource, input)
      dispatch(submitSystemRoleResourceSuccessAction())
    } catch (error) {
      dispatch(submitSystemRoleResourceFailedAction({ error }))
    }
  }
}

export const useSystemRoleResource = () => {
  const [seletedResIds, setSeletedResIds] = useState<string[]>([])
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemResource)

  const { systemResourceList, fetchSystemResource } = useSystemResource()

  useEffect(() => {
    const ids = data.systemRoleResourceList.map((item) => item._id)
    setSeletedResIds(ids)
  }, [data.systemRoleResourceList])

  const fetchSystemRoleResource = useCallback(
    (params: { id: string }) =>
      dispatch(fetchSystemRoleResourceAsyncAction(params)),
    [dispatch]
  )

  const submitSystemRoleResource = useCallback(
    (input: ResourceBindRoleInput) =>
      dispatch(submitSystemRoleResourceAsyncAction(input)),
    [dispatch]
  )

  return {
    ...data,
    seletedResIds,
    setSeletedResIds,
    fetchSystemResource,
    systemResourceList,
    fetchSystemRoleResource,
    submitSystemRoleResource,
  }
}

type ActionType = ReturnType<typeof fetchSystemRoleResourceSuccessAction> &
  ReturnType<typeof fetchSystemRoleResourceFailedAction>

export default function fetchSystemRoleResourceReducer(
  state = {} as SystemResourceState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_SYSTEM_ROLE_RESOURCE_BEGIN:
      return {
        ...state,
        systemRoleResourceListPending: true,
        systemRoleResourceListError: null,
      }
    case FETCH_SYSTEM_ROLE_RESOURCE_SUCCESS:
      return {
        ...state,
        systemRoleResourceList: action.data,
        systemRoleResourceListPending: false,
        systemRoleResourceListError: null,
      }
    case FETCH_SYSTEM_ROLE_RESOURCE_FAILED:
      return {
        ...state,
        systemRoleResourceListPending: false,
        systemRoleResourceListError: action.data.error,
      }
    case SUBMIT_SYSTEM_ROLE_RESOURCE_BEGIN:
      return {
        ...state,
        submitRoleResourceListPending: true,
        submitRoleResourceListError: null,
      }
    case SUBMIT_SYSTEM_ROLE_RESOURCE_SUCCESS:
    case SUBMIT_SYSTEM_ROLE_RESOURCE_FAILED:
      return {
        ...state,
        submitRoleResourceListPending: false,
        submitRoleResourceListError: null,
      }
    default:
      return state
  }
}
