import { Button, Modal, Space, Switch, Table } from 'antd'
import { FC, useEffect, useState } from 'react'

interface TableModalProp {
  value?: any[]
  modalVisible: boolean
  modalTitle?: string
  onModalOk?: () => Promise<any>
  onModalCancel?: () => void
  onOpen?: () => void
  onClose?: () => void
  onTableEdit?: (input: any, index: number) => void
  onTableDel?: (input: any, index: number) => void
}
const TableModal: FC<TableModalProp> = (props) => {
  const {
    children,
    value,
    modalVisible,
    modalTitle,
    onModalOk,
    onModalCancel,
    onTableEdit,
    onClose,
    onOpen,
    onTableDel,
  } = props

  const [visible, setVisible] = useState(false)

  const onCancel = () => {
    onModalCancel && onModalCancel()
    onClose && onClose()
  }

  const onOk = async () => {
    await (onModalOk && onModalOk())
    onClose && onClose()
  }

  useEffect(() => {
    setVisible(modalVisible)
  }, [modalVisible])

  return (
    <section>
      <div style={{ marginBottom: 16 }}>
        <Button type='primary' onClick={onOpen}>
          新增
        </Button>
      </div>
      <Table dataSource={value}>
        <Table.Column
          title='序号'
          dataIndex='index'
          render={(text, record, index) => <span>{index + 1}</span>}
        />
        <Table.Column title='规格名称' dataIndex='specs' />
        <Table.Column title='商品价格' dataIndex='price' />
        <Table.Column title='成本价格' dataIndex='costPrice' />
        <Table.Column title='会员价格' dataIndex='memberPrice' />
        <Table.Column title='活动价格' dataIndex='activityPrice' />
        <Table.Column title='起售数量' dataIndex='startNum' />
        <Table.Column title='佣金' dataIndex='commission' />
        <Table.Column title='库存' dataIndex='stock' />
        <Table.Column
          title='邮费'
          dataIndex='postage'
          render={(text, record, index) => (
            <span>{text.postage ? text.postage : '包邮'}</span>
          )}
        />
        <Table.Column
          title='状态'
          dataIndex='isRelease'
          render={(text, record, index) => <Switch checked={text} disabled />}
        />
        <Table.Column
          title='默认规格'
          dataIndex='isDefault'
          render={(text, record, index) => <Switch checked={text} disabled />}
        />
        <Table.Column
          title='操作'
          dataIndex='action'
          render={(text, record, index) => (
            <Space size='middle'>
              <Button onClick={onTableEdit?.bind(null, record, index)}>
                编辑
              </Button>
              <Button
                onClick={onTableDel?.bind(null, record, index)}
                type='primary'
                danger
              >
                删除
              </Button>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={modalTitle}
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        afterClose={onClose}
      >
        {children}
      </Modal>
    </section>
  )
}

TableModal.defaultProps = {
  modalVisible: true,
}

export default TableModal
