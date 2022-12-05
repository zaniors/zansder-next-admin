import http from '@/utils/http'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import {
  GoodsListOutput,
  GoodsListSearchInput,
  GoodsState,
} from '@/models/goods'
import {
  FETCH_GOODS_LIST_BEGIN,
  FETCH_GOODS_LIST_FAILED,
  FETCH_GOODS_LIST_SUCCESS,
  SET_GOODS_LIST_SEARCH_INPUT,
} from './constant'

export const setGoodsListSearchInputAction = (data: GoodsListSearchInput) => ({
  type: SET_GOODS_LIST_SEARCH_INPUT,
  data,
})

const fetchGoodsListBeginAction = () => ({
  type: FETCH_GOODS_LIST_BEGIN,
})
const fetchGoodsListSuccessAction = (data: GoodsListOutput) => ({
  type: FETCH_GOODS_LIST_SUCCESS,
  data,
})
const fetchGoodsListFailedAction = (data: { error: any }) => ({
  type: FETCH_GOODS_LIST_FAILED,
  data,
})

export const fetchGoodsListAsyncAction = (params: GoodsListSearchInput) => {
  return async (dispatch) => {
    dispatch(fetchGoodsListBeginAction())

    try {
      const { data } = await http.get('ApiUrl.GoodsList', { params })
      dispatch(fetchGoodsListSuccessAction(data))
    } catch (error) {
      dispatch(fetchGoodsListFailedAction({ error }))
    }
  }
}

export const useFetchGoodsList = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.goods)

  const fetchGoodsList = useCallback(
    () => dispatch(fetchGoodsListAsyncAction(data.goodsListSearchInput)),
    [data.goodsListSearchInput, dispatch]
  )

  const setGoodsListSearchInput = useCallback(
    (input: GoodsListSearchInput) =>
      dispatch(setGoodsListSearchInputAction(input)),
    [dispatch]
  )

  return {
    ...data,
    fetchGoodsList,
    setGoodsListSearchInput,
  }
}

type ActionType = ReturnType<typeof fetchGoodsListSuccessAction> &
  ReturnType<typeof fetchGoodsListFailedAction> &
  ReturnType<typeof setGoodsListSearchInputAction>
export default function fetchGoodsListReducer(
  state = {} as GoodsState,
  action: ActionType
) {
  switch (action.type) {
    case SET_GOODS_LIST_SEARCH_INPUT:
      return {
        ...state,
        goodsListSearchInput: {
          ...action.data,
        },
      }
    case FETCH_GOODS_LIST_BEGIN:
      return {
        ...state,
        goodsListPending: true,
        goodsListError: null,
      }
    case FETCH_GOODS_LIST_SUCCESS:
      if (action.data.current === 1) {
        state.goodsListOutput.records = []
      }

      return {
        ...state,
        goodsListOutput: {
          ...action.data,
          data: [...state.goodsListOutput.records, ...action.data.records],
        },
        goodsListPending: false,
        goodsListError: null,
      }
    case FETCH_GOODS_LIST_FAILED:
      return {
        ...state,
        goodsListPending: false,
        goodsListError: action.data.error,
      }
    default:
      return state
  }
}
