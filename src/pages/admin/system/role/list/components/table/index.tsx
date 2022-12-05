import { RoleItem } from '@/models/system-role'
import { Button, Space, Table, TableProps } from 'antd'
import { FC } from 'react'

interface TableListProps extends TableProps<RoleItem[]> {
  onEditHandle?: (id: string) => void
  onSwitchHandle?: (id: string) => void
  onBindMenuHandle?: (id: string) => void
  onBindResourceHandle?: (id: string) => void
}
const TableList: FC<TableListProps> = (props) => {
  const {
    onEditHandle,
    onSwitchHandle,
    onBindMenuHandle,
    onBindResourceHandle,
    ...tableProps
  } = props

  return (
    <Table {...tableProps} rowKey='_id'>
      <Table.Column title='角色名称' dataIndex='name' />
      <Table.Column title='角色描述' dataIndex='desc' />
      <Table.Column
        title='操作'
        key='action'
        render={(text, record: RoleItem) => (
          <Space size='middle'>
            <Button onClick={() => onEditHandle && onEditHandle(record._id)}>
              编辑
            </Button>
            <Button
              onClick={() => onBindMenuHandle && onBindMenuHandle(record._id)}
              type='primary'
            >
              关联菜单
            </Button>
            <Button
              onClick={() =>
                onBindResourceHandle && onBindResourceHandle(record._id)
              }
              type='primary'
            >
              配置权限
            </Button>
            {/* <Button
              onClick={() => onSwitchHandle && onSwitchHandle(record.id)}
              type='primary'
              danger
            >
              禁用
            </Button> */}
          </Space>
        )}
      />
    </Table>
  )
}

export default TableList
