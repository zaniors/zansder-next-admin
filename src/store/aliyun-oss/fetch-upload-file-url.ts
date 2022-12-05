import ApiUrl from '@/constants/api-url'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import {
  FETCH_UPLOAD_FILE_URL_BEGIN,
  FETCH_UPLOAD_FILE_URL_FAILED,
  FETCH_UPLOAD_FILE_URL_SUCCESS,
} from './constant'

const fetchUploadFileUrlBeginAction = () => ({
  type: FETCH_UPLOAD_FILE_URL_BEGIN,
})
const fetchUploadFileUrlSuccessAction = () => ({
  type: FETCH_UPLOAD_FILE_URL_SUCCESS,
})
const fetchUploadFileUrlFailedAction = (error: any) => ({
  type: FETCH_UPLOAD_FILE_URL_FAILED,
  data: error,
})

export const fetchUploadFileUrlAsyncAction = (formData: FormData) => {
  return async (dispatch) => {
    dispatch(fetchUploadFileUrlBeginAction())

    try {
      await http.post(ApiUrl.UploadFileUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await dispatch(fetchUploadFileUrlSuccessAction())
    } catch (error) {
      dispatch(fetchUploadFileUrlFailedAction({ error }))
    }
  }
}

export const useFetchUploadFileUrl = () => {
  const dispatch = useDispatch()

  const fetchUploadFileUrl = useCallback(
    (formData: FormData) => {
      dispatch(fetchUploadFileUrlAsyncAction(formData))
    },
    [dispatch]
  )

  return {
    fetchUploadFileUrl,
  }
}

export default function fetchUploadFileUrlReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state
  }
}
