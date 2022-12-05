import DefaultAvatar from '@/assets/avatar.png'
import { useFetchUserInfo } from '@/store/auth/fetch-user'
import { useLayoutSiderTrigger } from '@/store/layout/sider-trigger'
import { logout } from '@/utils/auth'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
import './index.scss'

const { Header } = Layout

const userMenu = (
  <Menu mode='horizontal'>
    <Menu.Item key='0'>基本资料</Menu.Item>
    <Menu.Item key='1'>修改密码</Menu.Item>
    <Menu.Divider />
    <Menu.Item key='2' onClick={logout}>
      退出登录
    </Menu.Item>
  </Menu>
)

const AdminHeader = () => {
  const { userInfo } = useFetchUserInfo()
  const { collapsed, layoutSiderTrigger } = useLayoutSiderTrigger()

  return (
    <Header className='site-header' style={{ padding: 0 }}>
      <section className='trigger' onClick={layoutSiderTrigger}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </section>

      <section className='right-content'>
        <Dropdown overlay={userMenu} trigger={['hover']}>
          <section className='user-dropdown'>
            <span style={{ color: '#999', marginRight: 4 }}>嗨，</span>
            <span>{userInfo?.username}</span>
            <Avatar style={{ marginLeft: 8 }} src={DefaultAvatar} />
          </section>
        </Dropdown>
      </section>
    </Header>
  )
}

export default AdminHeader
