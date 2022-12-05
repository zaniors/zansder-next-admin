import ApiUrl from '@/constants/api-url'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  SystemRoleDetail,
  SystemRoleId,
  SystemRoleState,
} from '@/models/system-role'
import {
  FETCH_SYSTEM_ROLE_DETAIL_BEGIN,
  FETCH_SYSTEM_ROLE_DETAIL_FAILED,
  FETCH_SYSTEM_ROLE_DETAIL_SUCCESS,
} from './constant'

const fetchSystemRoleDetailBeginAction = () => ({
  type: FETCH_SYSTEM_ROLE_DETAIL_BEGIN,
})
const fetchSystemRoleDetailSuccessAction = (data: SystemRoleDetail) => ({
  type: FETCH_SYSTEM_ROLE_DETAIL_SUCCESS,
  data,
})
const fetchSystemRoleDetailFailedAction = (error: any) => ({
  type: FETCH_SYSTEM_ROLE_DETAIL_FAILED,
  data: error,
})

export const fetchSystemRoleDetailAsyncAction = (params?: SystemRoleId) => {
  return async (dispatch) => {
    dispatch(fetchSystemRoleDetailBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemRoleDetail, { params })
      await dispatch(fetchSystemRoleDetailSuccessAction(data))
    } catch (error) {
      await dispatch(fetchSystemRoleDetailFailedAction)
    }
  }
}

export const useFetchSystemRoleDetail = () => {
  const dispatch = useDispatch()
  const fetchSystemRoleDetail = useCallback(
    (params?: SystemRoleId) =>
      dispatch(fetchSystemRoleDetailAsyncAction(params)),
    [dispatch]
  )

  return {
    fetchSystemRoleDetail,
  }
}

type ActionType = ReturnType<typeof fetchSystemRoleDetailSuccessAction>

export default function fetchSystemRoleDetailReducer(
  state = {} as SystemRoleState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_SYSTEM_ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        systemRoleAddOrEditInput: {
          id: action.data._id,
          name: action.data.name,
          desc: action.data.desc,
        },
      }
    default:
      return state
  }
}
