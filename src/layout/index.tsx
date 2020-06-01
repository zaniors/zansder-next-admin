import React, { FC, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  FileTextOutlined,
  ProfileOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export const LayoutAdmin: FC = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const { children } = props;
  const { pathname } = useLocation()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo"></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DesktopOutlined />}>首页</Menu.Item>
          <Menu.Item key="2" icon={<ProfileOutlined />}>简历页面</Menu.Item>

          <SubMenu key="sub1" icon={<FileTextOutlined />} title="文章管理">
            <Menu.Item key="3">文章列表</Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<UserOutlined />} title="系统管理">
            <Menu.Item key="6">管理员列表</Menu.Item>
            <Menu.Item key="7">系统日志</Menu.Item>
            <Menu.Item key="8">操作日志</Menu.Item>
            <Menu.Item key="9">修改密码</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>博客后台</Breadcrumb.Item>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {pathname === '/' && <Redirect to={'/home'} />}
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>&copy;2020 Power By ZAnsder</Footer>
      </Layout>
    </Layout>
  )
}