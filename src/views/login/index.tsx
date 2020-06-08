import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { LoginInputData } from '../../model/auth';
import login from './index.service';
import config from '../../config';
import history from '../../utils/history';
import './index.scss';

const layout = {
  labelCol: { span: 5 },
};
const tailLayout = {
  wrapperCol: { offset: 5 },
};

interface LoginState {
  data: LoginInputData;
}

class Login extends Component<{}, LoginState> {

  render() {
    const onFinish = async (values: any) => {
      const fromData = values as LoginInputData;
      // TODO 临时删除
      delete fromData.remember;
      const { data } = await login(fromData);
      if (data.token) {
        message.success('登录成功');
        localStorage.setItem(config.tokenKey, data.token);
        history.push('/home');
      }
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };

    return (
      <section className="login-container">
        <h1 className="login-title">博客后台系统</h1>
        <section className="login-content">
          <Form
            {...layout}
            labelAlign="left"
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="账号"
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </section>
    )
  }
}

export default Login;