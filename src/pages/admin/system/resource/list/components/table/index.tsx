import { ResourceItem } from '@/models/system-resource'
import { Button, Space, Table, TableProps } from 'antd'
import { FC } from 'react'

interface TableListProps extends TableProps<ResourceItem[]> {
  onEditResourceHandle?: (id: string) => void
  onDelResourceHandle?: (id: string) => void
}
const TableList: FC<TableListProps> = (props) => {
  const { onEditResourceHandle, onDelResourceHandle, ...tableProps } = props

  return (
    <Table {...tableProps} rowKey='_id'>
      <Table.Column title='接口路径' dataIndex='path' />
      <Table.Column title='接口名称' dataIndex='name' />
      <Table.Column
        title='操作'
        key='action'
        render={(text, record: ResourceItem) => (
          <Space size='middle'>
            <Button
              onClick={() =>
                onEditResourceHandle && onEditResourceHandle(record._id)
              }
            >
              编辑
            </Button>
            <Button
              onClick={() =>
                onDelResourceHandle && onDelResourceHandle(record._id)
              }
              type='primary'
              danger
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
