import React, { Component } from 'react';
import './index.scss';

class Login extends Component {
  componentDidMount = () => {
    console.log('登录页面')
  }
  
  render() {
    return (
      <section className="login-container">
        <section className="login-content">
          <h1 className="login-title">博客后台系统</h1>
        </section>
      </section>
    )
  }
}

export default Login;