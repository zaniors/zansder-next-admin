import { history } from '@/router'
import { useSystemRoleResource } from '@/store/system-resource/hook'
import { useSystemRoleList } from '@/store/system-role/hook'
import { Checkbox, Col, Modal, Row } from 'antd'
import { useEffect } from 'react'
import Header from './components/header'
import TableList from './components/table'

const SystemRoleListPage = () => {
  const {
    isModalOpen,
    showModal,
    hideModal,
    modalRoleId,
    setModalRoleId,
    setSystemRoleInput,
    systemRoleInput,
    fetchSystemRole,
    systemRoleList,
    systemRoleListPending,
  } = useSystemRoleList()

  const {
    fetchSystemRoleResource,
    submitSystemRoleResource,
    submitRoleResourceListPending,

    systemResourceList,
    fetchSystemResource,

    seletedResIds,
    setSeletedResIds,
  } = useSystemRoleResource()

  const onOpenModalHandle = (id: string) => {
    showModal()
    setModalRoleId(id)
    fetchSystemResource()
    fetchSystemRoleResource({ id })
  }

  const onSubmitResourceHandle = async () => {
    await submitSystemRoleResource({ rid: modalRoleId!, resIds: seletedResIds })
    hideModal()
  }

  useEffect(() => {
    fetchSystemRole()
  }, [fetchSystemRole])

  const list = systemResourceList.map((item) => {
    return {
      label: item.name,
      value: item._id,
    }
  })

  return (
    <section className='system-role-list-page-container'>
      <Header
        onSearchHandle={setSystemRoleInput}
        onAddHandle={() => history.push('/admin/system/role-create')}
      />
      <TableList
        dataSource={systemRoleList}
        loading={systemRoleListPending}
        onChange={({ current }) =>
          setSystemRoleInput({ ...systemRoleInput, current: current || 0 })
        }
        onBindMenuHandle={(id) =>
          history.push('/admin/system/role-edit/' + id + '?type=addMenu')
        }
        onEditHandle={(id) => history.push('/admin/system/role-edit/' + id)}
        onBindResourceHandle={(id) => onOpenModalHandle(id)}
      />

      <Modal
        title='配置接口权限'
        visible={isModalOpen}
        onOk={onSubmitResourceHandle}
        onCancel={hideModal}
        okText='确认'
        cancelText='关闭'
        confirmLoading={submitRoleResourceListPending}
      >
        <Checkbox.Group
          value={seletedResIds}
          onChange={(e) => setSeletedResIds(e as string[])}
        >
          <Row>
            {list.map((item) => (
              <Col span={24}>
                <Checkbox value={item.value}>{item.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Modal>
    </section>
  )
}

export default SystemRoleListPage
