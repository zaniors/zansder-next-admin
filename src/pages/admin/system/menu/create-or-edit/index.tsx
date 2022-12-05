import { useAddOrEditSystemMenu } from '@/store/system-menu/system-menu-add-or-edit'
import { Button, Card, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const SystemMenuCreateOrEditPage = () => {
  const { id, pid } = useParams<{ id: string; pid: string }>()
  const {
    setSystemMenuAddOrEditInput,
    clearSystemMenuAddOrEditInput,
    systemMenuAddOrEditInput,
    submitForm,
    fetchSystemMenuDetail,
  } = useAddOrEditSystemMenu()
  const [form] = Form.useForm()
  const btns = () => (
    <Button type='primary' onClick={onSubmitHandle}>
      保存
    </Button>
  )

  const onSubmitHandle = async () => {
    await form.validateFields() //表单验证通过才能发请求添加菜单
    await submitForm()
  }

  useEffect(() => {
    fetchSystemMenuDetail({ id })
  }, [fetchSystemMenuDetail, id])

  useEffect(() => {
    setSystemMenuAddOrEditInput({
      ...systemMenuAddOrEditInput,
      id,
      pid,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 更新表单
    form.setFieldsValue(systemMenuAddOrEditInput)
  }, [form, systemMenuAddOrEditInput])

  useEffect(() => {
    return () => {
      // 清除表单副作用
      clearSystemMenuAddOrEditInput()
    }
  }, [clearSystemMenuAddOrEditInput])

  return (
    <Form
      form={form}
      wrapperCol={{ span: 6 }}
      labelCol={{ span: 2 }}
      onValuesChange={(_, values) =>
        setSystemMenuAddOrEditInput({ ...systemMenuAddOrEditInput, ...values })
      }
    >
      <Card
        title='新增系统菜单'
        bordered={false}
        extra={btns()}
        className='system-menu-create-or-edit-page-container'
      >
        <Form.Item name='name' label='菜单名称' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name='desc' label='菜单描述' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name='pageUrl' label='菜单路由'>
          <Input />
        </Form.Item>

        <Form.Item name='pid' label='父级菜单'>
          <Input />
        </Form.Item>
      </Card>
    </Form>
  )
}

export default SystemMenuCreateOrEditPage
