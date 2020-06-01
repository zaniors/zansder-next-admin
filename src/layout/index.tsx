import React, { FC, useState } from 'react';
import { Redirect, useLocation, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import router from '../router';

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
          {
            router.map(item => (
              item.children && item.children.map(item => (
                <Menu.Item key={item.path} icon={<item.icon />}>
                  <Link to={item.path}>{item.breadcrumbName}</Link>
                </Menu.Item>
              ))
            ))
          }
          {/* <Menu.Item key="2" icon={<ProfileOutlined />}>简历页面</Menu.Item> */}
          {/* <SubMenu key="sub1" icon={<FileTextOutlined />} title="文章管理">
            <Menu.Item key="3">文章列表</Menu.Item>
          </SubMenu>

          <SubMenu key="sub2" icon={<UserOutlined />} title="系统管理">
            <Menu.Item key="6">管理员列表</Menu.Item>
            <Menu.Item key="7">系统日志</Menu.Item>
            <Menu.Item key="8">操作日志</Menu.Item>
            <Menu.Item key="9">修改密码</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Sider>

      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
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