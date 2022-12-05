import { history } from '@/router'
import { useSystemMenu } from '@/store/system-menu/hook'
import { useEffect } from 'react'
import Header from './components/header'
import TableList from './components/table'

const SystemMenuListPage = () => {
  const { fetchSystemMenu, systemMenuList, systemMenuListPending } =
    useSystemMenu()

  useEffect(() => {
    fetchSystemMenu()
  }, [fetchSystemMenu])

  return (
    <section className='system-menu-list-page-container'>
      <Header
        onSearchHandle={fetchSystemMenu}
        onAddHandle={() => history.push('/admin/system/menu-create')}
      />
      <TableList
        dataSource={systemMenuList}
        loading={systemMenuListPending}
        pagination={false}
        onDelMenuHandle={(id) => {}}
        onEditMenuHandle={(id) => history.push('/admin/system/menu-edit/' + id)}
        onAddSubMenuHandle={(id) =>
          history.push('/admin/system/menu-create/' + id)
        }
      />
    </section>
  )
}

export default SystemMenuListPage
