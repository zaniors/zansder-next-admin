import { MenuItem } from '@/models/system-menu'
import {
  Button,
  Space,
  Table,
  TableProps
  } from 'antd'
import { FC } from 'react'

interface TableListProps extends TableProps<MenuItem[]> {
  onAddSubMenuHandle?: (pid: string) => void
  onEditMenuHandle?: (id: string) => void
  onDelMenuHandle?: (id: string) => void
}
const TableList: FC<TableListProps> = (props) => {
  const {
    onAddSubMenuHandle,
    onEditMenuHandle,
    onDelMenuHandle,
    ...tableProps
  } = props

  return (
    <Table
      {...tableProps}
      rowKey='_id'
      expandable={{ childrenColumnName: 'children' }}
    >
      <Table.Column title='菜单名称' dataIndex='name' />
      <Table.Column title='父级菜单' dataIndex='pid' />
      <Table.Column title='路由路径' dataIndex='pageUrl' />
      <Table.Column
        title='操作'
        key='action'
        render={(text, record: MenuItem) => (
          <Space size='middle'>
            <Button
              onClick={() =>
                onAddSubMenuHandle && onAddSubMenuHandle(record._id)
              }
            >
              新增子菜单
            </Button>
            <Button
              onClick={() => onEditMenuHandle && onEditMenuHandle(record._id)}
            >
              编辑
            </Button>
            <Button
              onClick={() => onDelMenuHandle && onDelMenuHandle(record._id)}
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
