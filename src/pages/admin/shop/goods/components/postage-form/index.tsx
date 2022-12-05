import { Form, InputNumber, Select } from 'antd'

const PostageForm = (props) => {
  console.log('PostageForm props', props)

  return (
    <>
      <Form.Item
        name='isFree'
        label='邮费'
        rules={[{ required: true, message: '请选择是否支付邮费' }]}
      >
        <Select allowClear placeholder='请选择类型'>
          <Select.Option value='1'>支付</Select.Option>
          <Select.Option value='0'>不支付</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isFree !== currentValues.isFree
        }
      >
        {({ getFieldValue }) =>
          getFieldValue('isFree') === '1' ? (
            <Form.Item
              name='postageNum'
              label='邮费'
              rules={[{ required: true, message: '请输入邮费' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
          ) : null
        }
      </Form.Item>
    </>
  )
}

export default PostageForm
