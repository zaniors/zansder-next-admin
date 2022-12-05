import { GoodsAddOrEditInput, GoodsState } from '@/models/goods'
import { history } from '@/router'
import { message } from 'antd'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootStore } from '../reducers'

export const addGoodsAsyncAction = (input: GoodsAddOrEditInput) => {
  return async () => {
    // await http.post(ApiUrl.GoodsAdd, input)
    message.success('添加商品成功')
    history.goBack()
  }
}
export const editGoodsAsyncAction = (input: GoodsAddOrEditInput) => {
  return async () => {
    // await http.put(ApiUrl.GoodsUpdate, input)
    message.success('更新商品成功')
    history.goBack()
  }
}

export const useAddOrEditGoods = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()
  const data = useSelector((state: RootStore) => state.goods)

  const fetchAddGoods = useCallback(
    (input) => dispatch(addGoodsAsyncAction(input)),
    [dispatch]
  )

  const fetchEditGoods = useCallback(
    (input) => dispatch(editGoodsAsyncAction(input)),
    [dispatch]
  )

  const submitForm = useCallback(
    (data) => {
      // data.shopId = userInfo.shops[0].id
      data.labels = data.labels || []
      console.log(data, '===========')

      if (id) {
        // 更新商品
        fetchEditGoods({ ...data, id })
        return
      }

      // 添加商品
      fetchAddGoods(data)
    },
    [fetchAddGoods, fetchEditGoods, id]
  )

  return {
    ...data,
    submitForm,
    fetchAddGoods,
    fetchEditGoods,
  }
}

export default function addOrEditGoodsReducer(
  state = {} as GoodsState,
  action: any
) {
  switch (action.type) {
    default:
      return state
  }
}
