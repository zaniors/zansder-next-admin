import { Modal, ModalFuncProps } from 'antd'

const modalConfirm = (
  config?: Omit<ModalFuncProps, 'onOk' | 'onCancel'>
): Promise<any> => {
  const defaultConfig = {
    title: '提示',
    content: '再次提示',
    okText: '确认',
    cancelText: '取消',
    maskClosable: true,
  }

  return new Promise((res, rej) => {
    Modal.confirm({
      ...defaultConfig,
      ...config,
      onOk: (close) => {
        typeof close === 'function' && close()
        res('')
      },
      onCancel: (close) => {
        typeof close === 'function' && close()
        rej('modal confirm close')
      },
    })
  })
}

export default modalConfirm
