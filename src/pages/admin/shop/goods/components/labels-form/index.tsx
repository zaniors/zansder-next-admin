import { Button, Input, Space, Tag } from 'antd'
import { FC, Fragment, useState } from 'react'

interface LabelsFormProps {
  value?: any[]
  onChange?: (data: any[]) => void
}
const LabelsForm: FC<LabelsFormProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('')

  const onInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const onTagClose = (e, index) => {
    e.preventDefault()

    const labels = JSON.parse(JSON.stringify(value)) as any[]
    labels.splice(index, 1)

    onChange && onChange(labels)
  }

  const onTagAdd = () => {
    const labels = [...value!, { label: inputValue }]
    setInputValue('')
    onChange && onChange(labels)
  }

  console.log('LabelsForm value', value)

  return (
    <Fragment>
      <Space direction='vertical'>
        <Space>
          <Input size='small' value={inputValue} onChange={onInputChange} />
          <Button size='small' onClick={onTagAdd}>
            添加
          </Button>
        </Space>

        <Space>
          {value && value.length > 0
            ? value.map((item, index) => (
                <Tag closable onClose={(e) => onTagClose(e, index)}>
                  {item.label}
                </Tag>
              ))
            : null}
        </Space>
      </Space>
    </Fragment>
  )
}

export default LabelsForm
