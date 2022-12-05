import { GoodsDetailOutput, GoodsState } from '@/models/goods'
import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootStore } from '../reducers'
import initialState from '../state'
import {
  CLEAR_GOODS_DETAIL,
  FETCH_GOODS_DETAIL_BEGIN,
  FETCH_GOODS_DETAIL_FAILED,
  FETCH_GOODS_DETAIL_SUCCESS,
} from './constant'

export const setGoodsDetailBeginAction = () => ({
  type: FETCH_GOODS_DETAIL_BEGIN,
})
export const setGoodsDetailSuccessAction = (data: GoodsDetailOutput) => ({
  type: FETCH_GOODS_DETAIL_SUCCESS,
  data,
})
export const setGoodsDetailFailedAction = (data: { error: any }) => ({
  type: FETCH_GOODS_DETAIL_FAILED,
  data,
})
export const fetchGoodsDetailAsyncAction = (params: { id: string }) => {
  return async (dispatch) => {
    dispatch(setGoodsDetailBeginAction())

    try {
      const { data } = await http.get('ApiUrl.GoodsDetail', { params })
      dispatch(setGoodsDetailSuccessAction(data))
    } catch (error) {
      dispatch(setGoodsDetailFailedAction({ error }))
    }
  }
}

export const clearGoodsDetailAction = () => ({
  type: CLEAR_GOODS_DETAIL,
})

export const useFetchGoodsDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const data = useSelector((state: RootStore) => state.goods)

  const fetchGoodsDetail = useCallback(
    () => id && dispatch(fetchGoodsDetailAsyncAction({ id })),
    [dispatch, id]
  )

  const clearGoodsDetail = useCallback(
    () => dispatch(clearGoodsDetailAction()),
    [dispatch]
  )

  return {
    ...data,
    clearGoodsDetail,
    fetchGoodsDetail,
  }
}

type ActionType = ReturnType<typeof setGoodsDetailSuccessAction> &
  ReturnType<typeof setGoodsDetailFailedAction>

export default function fetchGoodsDetailReducer(
  state = {} as GoodsState,
  action: ActionType
) {
  const init = JSON.parse(JSON.stringify(initialState.goods)) as GoodsState

  switch (action.type) {
    case FETCH_GOODS_DETAIL_BEGIN:
      return {
        ...state,
        goodsDetailPending: true,
        goodsDetailError: null,
      }
    case FETCH_GOODS_DETAIL_SUCCESS:
      return {
        ...state,
        goodsDetailOutput: {
          ...action.data,
        },
        goodsDetailPending: false,
        goodsDetailError: null,
      }
    case FETCH_GOODS_DETAIL_FAILED:
      return {
        ...state,
        goodsDetailPending: false,
        goodsDetailError: action.data.error,
      }
    case CLEAR_GOODS_DETAIL:
      return {
        ...state,
        goodsDetailOutput: {
          ...init.goodsDetailOutput,
        },
      }
    default:
      return state
  }
}
