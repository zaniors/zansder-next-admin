import ApiUrl from '@/constants/api-url'
import { ResourceItem, SystemResourceState } from '@/models/system-resource'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import {
  FETCH_SYSTEM_RESOURCE_BEGIN,
  FETCH_SYSTEM_RESOURCE_FAILED,
  FETCH_SYSTEM_RESOURCE_SUCCESS,
} from './constant'

const fetchSystemResourceBeginAction = () => ({
  type: FETCH_SYSTEM_RESOURCE_BEGIN,
})
const fetchSystemResourceSuccessAction = (data: ResourceItem[]) => ({
  type: FETCH_SYSTEM_RESOURCE_SUCCESS,
  data,
})
const fetchSystemResourceFailedAction = (data: { error: any }) => ({
  type: FETCH_SYSTEM_RESOURCE_FAILED,
  data,
})

export const useSystemResource = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemResource)

  const fetchSystemResource = useCallback(
    () => dispatch(fetchSystemResourceAsyncAction()),
    [dispatch]
  )

  return {
    ...data,
    fetchSystemResource,
  }
}

export const fetchSystemResourceAsyncAction = () => {
  return async (dispatch) => {
    dispatch(fetchSystemResourceBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemResourceList)
      dispatch(fetchSystemResourceSuccessAction(data))
    } catch (error) {
      dispatch(fetchSystemResourceFailedAction({ error }))
    }
  }
}

type ActionType = ReturnType<typeof fetchSystemResourceSuccessAction> &
  ReturnType<typeof fetchSystemResourceFailedAction>

export default function fetchSystemResourceReducer(
  state = {} as SystemResourceState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_SYSTEM_RESOURCE_BEGIN:
      return {
        ...state,
        systemResourceListPending: true,
        systemResourceListError: null,
      }
    case FETCH_SYSTEM_RESOURCE_SUCCESS:
      return {
        ...state,
        systemResourceList: action.data,
        systemResourceListPending: false,
        systemResourceListError: null,
      }
    case FETCH_SYSTEM_RESOURCE_FAILED:
      return {
        ...state,
        systemResourceListPending: false,
        systemResourceListError: action.data.error,
      }
    default:
      return state
  }
}
