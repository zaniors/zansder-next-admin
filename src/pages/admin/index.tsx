import AdminHeader from '@/components/layout/header'
import AdminSider from '@/components/layout/sider'
import { useFetchUserInfo } from '@/store/auth/fetch-user'
import { Footer } from 'antd/lib/layout/layout'
import { useEffect } from 'react'
import './index.scss'
import { Layout } from 'antd'

const { Content } = Layout

const AdminLayout = (props) => {
  const { fetchUserInfo } = useFetchUserInfo()

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  return (
    <Layout className='admin-layout-container'>
      <AdminSider />
      <Layout className='admin-layout-content'>
        <AdminHeader />
        <Content
          className='site-content'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 182px)',
          }}
        >
          {props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Made with <span style={{ color: '#fff' }}>❤</span> by Zanior
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
