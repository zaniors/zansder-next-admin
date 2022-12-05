import { useAddOrEditSystemResource } from '@/store/system-resource/system-resource-add-or-edit'
import { Button, Card, Form, Input } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'react-router'

const SystemResourceCreateOrEditPage = () => {
  const { id } = useParams<{ id: string }>()
  const {
    setSystemResourceAddOrEditInput,
    clearSystemResourceAddOrEditInput,
    systemResourceAddOrEditInput,
    submitForm,
    fetchSystemResourceDetail,
  } = useAddOrEditSystemResource()
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
    fetchSystemResourceDetail({ id })
  }, [fetchSystemResourceDetail, id])

  useEffect(() => {
    setSystemResourceAddOrEditInput({
      ...systemResourceAddOrEditInput,
      id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // 更新表单
    form.setFieldsValue(systemResourceAddOrEditInput)
  }, [form, systemResourceAddOrEditInput])

  useEffect(() => {
    return () => {
      // 清除表单副作用
      clearSystemResourceAddOrEditInput()
    }
  }, [clearSystemResourceAddOrEditInput])

  return (
    <Form
      form={form}
      wrapperCol={{ span: 6 }}
      labelCol={{ span: 2 }}
      onValuesChange={(_, values) =>
        setSystemResourceAddOrEditInput({
          ...systemResourceAddOrEditInput,
          ...values,
        })
      }
    >
      <Card
        title='新增系统资源'
        bordered={false}
        extra={btns()}
        className='system-resource-create-or-edit-page-container'
      >
        <Form.Item name='name' label='资源名称' rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name='desc' label='资源描述' rules={[{ required: true }]}>
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

export default SystemResourceCreateOrEditPage
