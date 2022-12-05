import { ResourceList } from '@/models/system-resource'
import { history } from '@/router'
import { useSystemResource } from '@/store/system-resource/hook'
import { useEffect } from 'react'
import Header from './components/header'
import TableList from './components/table'

const SystemResourceListPage = () => {
  const { fetchSystemResource, systemResourceList, systemResourceListPending } =
    useSystemResource()

  useEffect(() => {
    fetchSystemResource()
  }, [fetchSystemResource])

  return (
    <section className='system-resource-list-page-container'>
      <Header
        onSearchHandle={fetchSystemResource}
        onAddHandle={() => history.push('/admin/system/resource-create')}
      />
      <TableList
        dataSource={systemResourceList as unknown as ResourceList}
        loading={systemResourceListPending}
        pagination={false}
        onDelResourceHandle={(id) => {}}
        onEditResourceHandle={(id) =>
          history.push('/admin/system/resource-edit/' + id)
        }
      />
    </section>
  )
}

export default SystemResourceListPage
