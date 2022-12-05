import ApiUrl from '@/constants/api-url'
import http from '@/utils/http'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import {
  SystemRoleInput,
  SystemRoleList,
  SystemRoleState,
} from '@/models/system-role'
import {
  FETCH_SYSTEM_ROLE_BEGIN,
  FETCH_SYSTEM_ROLE_FAILED,
  FETCH_SYSTEM_ROLE_SUCCESS,
  SET_SYSTEM_ROLE_INPUT,
} from './constant'

const setSystemRoleInputAction = (data: SystemRoleInput) => ({
  type: SET_SYSTEM_ROLE_INPUT,
  data,
})

const fetchSystemRoleBeginAction = () => ({
  type: FETCH_SYSTEM_ROLE_BEGIN,
})
const fetchSystemRoleSuccessAction = (data: SystemRoleList) => ({
  type: FETCH_SYSTEM_ROLE_SUCCESS,
  data,
})
const fetchSystemRoleFailedAction = (data: { error: any }) => ({
  type: FETCH_SYSTEM_ROLE_FAILED,
  data,
})

export const fetchSystemRoleAsyncAction = (params: SystemRoleInput) => {
  return async (dispatch) => {
    dispatch(fetchSystemRoleBeginAction())

    try {
      const { data } = await http.get(ApiUrl.SystemRoleList)
      await dispatch(fetchSystemRoleSuccessAction(data))
    } catch (error) {
      await dispatch(fetchSystemRoleFailedAction)
    }
  }
}

export const useSystemRoleList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalRoleId, setModalRoleId] = useState<string>()

  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.systemRole)

  const showModal = () => setIsModalOpen(true)

  const hideModal = () => setIsModalOpen(false)

  const setSystemRoleInput = useCallback(
    (input: SystemRoleInput) => {
      dispatch(setSystemRoleInputAction(input))
    },
    [dispatch]
  )

  const fetchSystemRole = useCallback(
    () => dispatch(fetchSystemRoleAsyncAction(data.systemRoleInput)),
    [data.systemRoleInput, dispatch]
  )

  return {
    ...data,
    isModalOpen,
    showModal,
    hideModal,
    modalRoleId,
    setModalRoleId,
    setSystemRoleInput,
    fetchSystemRole,
  }
}

type ActionType = ReturnType<typeof fetchSystemRoleSuccessAction> &
  ReturnType<typeof fetchSystemRoleFailedAction> &
  ReturnType<typeof setSystemRoleInputAction>

export default function fetchSystemRoleReducer(
  state = {} as SystemRoleState,
  action: ActionType
) {
  switch (action.type) {
    case SET_SYSTEM_ROLE_INPUT:
      return {
        ...state,
        systemRoleInput: {
          ...state.systemRoleInput,
          ...action.data,
        },
      }
    case FETCH_SYSTEM_ROLE_BEGIN:
      return {
        ...state,
        systemRoleListPending: true,
        systemRoleListError: null,
      }
    case FETCH_SYSTEM_ROLE_SUCCESS:
      return {
        ...state,
        systemRoleList: action.data,
        systemRoleListPending: false,
        systemRoleListError: null,
      }
    case FETCH_SYSTEM_ROLE_FAILED:
      return {
        ...state,
        systemRoleListPending: false,
        systemRoleListError: action.data.error,
      }
    default:
      return state
  }
}
