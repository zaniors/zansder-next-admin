import { Button, Card, Divider, Form, Input } from 'antd'
import { history } from '../../../router'

export const SignUpPage = () => {
  const handleSubmit = (values: { username: string; password: string }) => {}

  return (
    <Card className='shadow-card'>
      <h2 className='title'>请注册</h2>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name='username'
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input type='text' placeholder='用户名' />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input type='password' placeholder='密码' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary'>
            注册
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Button type='link' onClick={() => history.push('/unauth/signin')}>
        已有账号？立即登录
      </Button>
    </Card>
  )
}
