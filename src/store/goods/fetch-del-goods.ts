import modalConfirm from '@/utils/modal'
import { useCallback } from 'react'
import { useFetchGoodsList } from './fetch-goods-list'

export const fetchDelGoodsAsync = async (input: { id: string }) => {
  await modalConfirm({ content: '是否删除该商品' })
  // await http.post(ApiUrl.GoodsDel, input)
}

export const useFetchDelGoods = () => {
  const { fetchGoodsList } = useFetchGoodsList()

  const fetchDelGoods = useCallback(
    async (input: { id: string }) => {
      await fetchDelGoodsAsync(input)
      await fetchGoodsList()
    },
    [fetchGoodsList]
  )

  return {
    fetchDelGoods,
  }
}
