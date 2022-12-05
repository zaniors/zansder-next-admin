import { FC } from 'react'

/**
 * 该组件为了处理表单绑定的属性为对象，和Select进行数据回显
 *
 * */

interface SelectWrapperProps {
  children: any
  value?: any
  onChange?: (e) => void
}

const SelectWrapper: FC<SelectWrapperProps> = (props) => {
  const children = {
    ...props.children,
    props: {
      ...props.children.props,
      value: props.value
        ? {
            value: JSON.stringify(props.value),
            label: props.value?.name,
          }
        : null,
      onChange: props.onChange,
    },
  }

  return <>{children}</>
}

export default SelectWrapper
