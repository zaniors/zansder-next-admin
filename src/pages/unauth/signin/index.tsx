import { history } from '@/router'
import { useSignin } from '@/store/auth/fetch-signin'
import { Button, Card, Divider, Form, Input } from 'antd'

const SignInPage = () => {
  const { fetchSignin } = useSignin()

  return (
    <Card className='shadow-card'>
      <h2 className='title'>请登录</h2>
      <Form onFinish={fetchSignin}>
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
            登录
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Button type='link' onClick={() => history.push('/unauth/signup')}>
        没有账号？立即注册
      </Button>
    </Card>
  )
}

export default SignInPage
