import { ReleaseStatus } from '@/models/enum'
import { SearchOutlined } from '@ant-design/icons'
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select
  } from 'antd'
import { FC } from 'react'

const { Option } = Select

interface HeaderProps {
  categoryOptions: []
  onSearchHandle?: (val) => void
  onAddHandle?: () => void
  onResetHandle?: (val) => void
}
const Header: FC<HeaderProps> = (props) => {
  const { onAddHandle, onResetHandle, onSearchHandle, categoryOptions } = props
  const [form] = Form.useForm()

  const onFormReset = () => {
    form.resetFields()
    onResetHandle && onResetHandle(form.getFieldsValue())
  }

  const onFormFinish = (e) => {
    const { name, categoryId, release } = e

    onSearchHandle &&
      onSearchHandle({
        name,
        categoryId,
        release: release === undefined ? undefined : !!release,
      })
  }

  return (
    <Form form={form} onFinish={onFormFinish}>
      <Row gutter={24}>
        <Col xl={{ span: 4 }}>
          <Form.Item name='name'>
            <Input placeholder='产品名称' prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>

        <Col xl={{ span: 4 }}>
          <Form.Item name='release'>
            <Select placeholder='请选择状态'>
              <Option value={ReleaseStatus.On}>已上架</Option>
              <Option value={ReleaseStatus.Off}>已下架</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col xl={{ span: 12 }}>
          <Row align='middle' justify='space-between'>
            <div>
              <Button type='primary' htmlType='submit'>
                搜索
              </Button>
              <Button onClick={onFormReset}>重置</Button>
            </div>
            <Button type='ghost' onClick={onAddHandle}>
              新增
            </Button>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default Header
