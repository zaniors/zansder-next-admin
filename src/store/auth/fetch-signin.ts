import ApiUrl from '@/constants/api-url'
import { AuthState, SigninInput } from '@/models/auth'
import { history } from '@/router'
import { setToken } from '@/utils/auth'
import http from '@/utils/http'
import { message } from 'antd'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  FETCH_SIGNIN_BEGIN,
  FETCH_SIGNIN_FAILED,
  FETCH_SIGNIN_SUCCESS,
} from './constant'

const fetchSigninBeginAction = () => ({
  type: FETCH_SIGNIN_BEGIN,
})
const fetchSigninSuccessAction = () => ({
  type: FETCH_SIGNIN_SUCCESS,
})
const fetchSigninFailedAction = () => ({
  type: FETCH_SIGNIN_FAILED,
})

export function fetchSigninAsyncAction(input: SigninInput) {
  return async (dispatch) => {
    dispatch(fetchSigninBeginAction())

    try {
      const { data } = await http.post(ApiUrl.Signin, input)
      await dispatch(fetchSigninSuccessAction())
      setToken(data)
      history.push('/admin/dashboard')
      message.success('登录成功')
    } catch (error) {
      dispatch(fetchSigninFailedAction())
    }
  }
}

export function useSignin() {
  const dispatch = useDispatch()

  const fetchSignin = useCallback(
    async (input: SigninInput) => {
      await dispatch(fetchSigninAsyncAction(input))
    },
    [dispatch]
  )

  return {
    fetchSignin,
  }
}

export default function signinReducer(state = {} as AuthState, action) {
  switch (action.type) {
    default:
      return state
  }
}
