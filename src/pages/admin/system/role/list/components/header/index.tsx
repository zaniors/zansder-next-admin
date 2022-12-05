import { SystemRoleInput } from '@/models/system-role'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Col, Form, Input, Row } from 'antd'
import { FC } from 'react'

interface HeaderProps {
  onSearchHandle?: (val: SystemRoleInput) => void
  onAddHandle?: () => void
}
const Header: FC<HeaderProps> = (props) => {
  const { onSearchHandle, onAddHandle } = props

  return (
    <Form onFinish={onSearchHandle}>
      <Row gutter={24}>
        <Col xl={{ span: 4 }}>
          <Form.Item name='roleName'>
            <Input placeholder='请输入角色名称' prefix={<SearchOutlined />} />
          </Form.Item>
        </Col>

        <Col xl={{ span: 12 }}>
          <Row align='middle' justify='space-between'>
            <div>
              <Button type='primary' htmlType='submit'>
                搜索
              </Button>
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
