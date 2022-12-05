import { history } from '@/router'
import { useFetchDelGoods, useFetchGoodsList } from '@/store/goods/hook'
import { useEffect } from 'react'
import TableList from './components/table'

const GoodsListPage = () => {
  const {
    fetchGoodsList,
    setGoodsListSearchInput,
    goodsListSearchInput,
    goodsListOutput: { size, current, total, records: goodsList },
    goodsListPending,
  } = useFetchGoodsList()
  const { fetchDelGoods } = useFetchDelGoods()

  useEffect(() => {
    fetchGoodsList()
  }, [fetchGoodsList])

  return (
    <section className='goods-list-page-container'>
      <TableList
        dataSource={goodsList}
        loading={goodsListPending}
        pagination={{
          pageSize: size,
          current,
          total,
        }}
        onChange={({ current }) =>
          setGoodsListSearchInput({
            ...goodsListSearchInput,
            current: current || 0,
          })
        }
        onEditHandle={(id) => history.push('/admin/shop/goods-edit/' + id)}
        onDelHandle={(id) => fetchDelGoods({ id })}
      />
    </section>
  )
}

export default GoodsListPage
