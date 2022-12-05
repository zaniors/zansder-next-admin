import { GoodsItem, GoodsSpecItem } from '@/models/goods'
import { Button, Space, Table, TableProps } from 'antd'
import { FC } from 'react'

interface TableListProps extends TableProps<GoodsItem[]> {
  onEditHandle?: (id: string) => void
  onSwitchHandle?: (id: string) => void
  onDelHandle?: (id: string) => void
}
const TableList: FC<TableListProps> = (props) => {
  const { onEditHandle, onSwitchHandle, onDelHandle, ...tableProps } = props

  const { dataSource } = tableProps

  const d = dataSource?.map((item) => {
    if (item instanceof Object) {
      let data: any = item as unknown as GoodsSpecItem
      const res = data.specs ? data.specs.filter((item) => item.isDefault) : []
      const defaultSpecs = res.length > 0 ? res[0] : {}
      const { id, ...specItem } = defaultSpecs
      item = {
        ...data,
        ...specItem,
        specId: id,
      }
    }

    return item
  })

  return (
    <Table {...tableProps} dataSource={d} rowKey='id'>
      <Table.Column
        title='序号'
        dataIndex='index'
        render={(text, record, index) => <span>{index + 1}</span>}
      />
      <Table.Column title='商品名称' dataIndex='name' />
      <Table.Column title='成本' dataIndex='costPrice' />
      <Table.Column title='会员价' dataIndex='memberPrice' />
      <Table.Column title='活动价' dataIndex='activityPrice' />
      <Table.Column
        title='状态'
        dataIndex='isRelease'
        render={(text) => <span>{text ? '上架' : '下架'}</span>}
      />
      <Table.Column
        title='推荐'
        dataIndex='isRecommend'
        render={(text) => <span>{text ? '是' : '否'}</span>}
      />
      <Table.Column
        title='操作'
        key='action'
        render={(text, record: GoodsItem) => (
          <Space size='middle'>
            <Button onClick={() => onEditHandle && onEditHandle(record.id)}>
              编辑
            </Button>
            <Button
              onClick={() => onDelHandle && onDelHandle(record.id)}
              danger
              type='primary'
            >
              删除
            </Button>
          </Space>
        )}
      />
    </Table>
  )
}

export default TableList
