import { useFetchUserInfo } from '@/store/auth/fetch-user'
import { useLayoutSiderTrigger } from '@/store/layout/hook'
import { useMatchSiderRoute } from '@/utils/hook'
import { Layout, Menu } from 'antd'
import './index.scss'

const AdminSider = () => {
  const { collapsed, layoutSiderTrigger } = useLayoutSiderTrigger()
  const { push, parentKey, childKey, onSiderMenuOpenChange } =
    useMatchSiderRoute()
  const { userInfo } = useFetchUserInfo()

  return (
    <Layout.Sider
      className='admin-layout-sider'
      collapsible
      collapsed={collapsed}
      onCollapse={layoutSiderTrigger}
    >
      <div className='logo'>后台LOGO</div>
      <Menu
        theme='dark'
        mode='inline'
        openKeys={parentKey}
        selectedKeys={childKey}
        onOpenChange={onSiderMenuOpenChange}
      >
        {userInfo?.menu.map((menu, index) => {
          if (menu.children!.length > 0) {
            return (
              <Menu.SubMenu key={menu._id} title={menu.name}>
                {menu.children!.map((subMenu) => (
                  <Menu.Item
                    key={subMenu._id}
                    onClick={() => push(subMenu.pageUrl!)}
                  >
                    {subMenu.name}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            )
          } else {
            return (
              <Menu.Item key={menu._id} onClick={() => push(menu.pageUrl!)}>
                {menu.name}
              </Menu.Item>
            )
          }
        })}
      </Menu>
    </Layout.Sider>
  )
}

export default AdminSider
