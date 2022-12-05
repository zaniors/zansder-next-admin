import { useFetchRoleMenu } from '@/store/system-menu/hook'
import {
  Button,
  Card,
  Form,
  Input,
  Tree,
  TreeProps
  } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import './index.scss'
import {
  useAddOrEditSystemRole,
  useFetchSystemRoleDetail,
} from '@/store/system-role/hook'

const SystemRoleCreateOrEditPage = () => {
  const { id } = useParams<{ id: string }>()

  const {
    isAddMenu,
    setSystemRoleAddOrEditInput,
    clearSystemRoleAddOrEditInput,
    systemRoleAddOrEditInput,
    submitForm,
  } = useAddOrEditSystemRole()
  const { fetchSystemRoleDetail } = useFetchSystemRoleDetail()

  const { fetchRoleMenu, systemMenuList, roleMenuListIds, setRoleMenuIds } =
    useFetchRoleMenu()
  const [form] = Form.useForm()

  const btns = () => (
    <Button type='primary' onClick={onSubmitHandle}>
      保存
    </Button>
  )

  const onSubmitHandle = async () => {
    await form.validateFields() //表单验证通过才能发请求添加角色
    await submitForm()
  }

  useEffect(() => {
    id && fetchSystemRoleDetail({ id })
  }, [fetchSystemRoleDetail, id])

  useEffect(() => {
    id && isAddMenu && fetchRoleMenu({ id })
  }, [fetchRoleMenu, id, isAddMenu])

  useEffect(() => {
    setSystemRoleAddOrEditInput({
      ...systemRoleAddOrEditInput,
      id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 更新表单
    form.setFieldsValue(systemRoleAddOrEditInput)
  }, [form, systemRoleAddOrEditInput])

  useEffect(() => {
    return () => {
      // 清除表单副作用
      clearSystemRoleAddOrEditInput()
    }
  }, [clearSystemRoleAddOrEditInput])

  const onCheck: TreeProps['onCheck'] = (checkedKeysValue, e) => {
    setRoleMenuIds([...checkedKeysValue as string[], ...e.halfCheckedKeys as string[]])
  }

  return (
    <Form
      form={form}
      wrapperCol={{ span: 6 }}
      labelCol={{ span: 2 }}
      onValuesChange={(_, values) =>
        setSystemRoleAddOrEditInput({ ...systemRoleAddOrEditInput, ...values })
      }
    >
      <Card
        title={id ? '编辑角色' : '新增角色'}
        bordered={false}
        extra={btns()}
        className='system-role-create-or-edit-page-container'
      >
        <Form.Item name='name' label='角色名称' rules={[{ required: true }]}>
          <Input disabled={isAddMenu} />
        </Form.Item>

        <Form.Item name='desc' label='角色描述'>
          <Input disabled={isAddMenu} />
        </Form.Item>
        {isAddMenu ? (
          <section className='menu-content'>
            <section className='title'>
              <span>菜单权限</span>
            </section>

            <Tree
              // TODO: 待后续Antd官方是否有解决方案
              // Antd 4.17.0 说明可以指定字段，实际指定了字段，类型还是会报错
              // 故 as any
              treeData={systemMenuList as any}
              fieldNames={{ key: '_id', children: 'children', title: 'name' }}
              checkable
              checkedKeys={roleMenuListIds as React.Key[]}
              onCheck={onCheck}
            />
          </section>
        ) : null}
      </Card>
    </Form>
  )
}

export default SystemRoleCreateOrEditPage
