import ApiUrl from '@/constants/api-url'
import { AuthState, UserInfoOutput } from '@/models/auth'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import {
  FETCH_USER_IFNO_BEGIN,
  FETCH_USER_IFNO_FAILED,
  FETCH_USER_IFNO_SUCCESS,
} from './constant'

const fetchUserInfoBeginAction = () => ({
  type: FETCH_USER_IFNO_BEGIN,
})
const fetchUserInfoSuccessAction = (data: UserInfoOutput) => ({
  type: FETCH_USER_IFNO_SUCCESS,
  data,
})
const fetchUserInfoFailedAction = (data: { error: any }) => ({
  type: FETCH_USER_IFNO_FAILED,
  data,
})

export function fetchUserInfoAsyncAction() {
  return async (dispatch) => {
    dispatch(fetchUserInfoBeginAction())

    try {
      const { data } = await http.get(ApiUrl.CurrentUserInfo)
      await dispatch(fetchUserInfoSuccessAction(data))
    } catch (error) {
      dispatch(fetchUserInfoFailedAction({ error }))
    }
  }
}

export function useFetchUserInfo() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootStore) => state.auth)

  const fetchUserInfo = useCallback(
    () => dispatch(fetchUserInfoAsyncAction()),
    [dispatch]
  )

  return {
    userInfo,
    fetchUserInfo,
  }
}

type ActionType = ReturnType<typeof fetchUserInfoSuccessAction>

export default function fetchUserInfoReducer(
  state = {} as AuthState,
  action: ActionType
) {
  switch (action.type) {
    case FETCH_USER_IFNO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...action.data,
        },
      }
    default:
      return state
  }
}
