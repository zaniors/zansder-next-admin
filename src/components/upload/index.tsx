import ApiUrl from '@/constants/api-url'
import { GoodsImg } from '@/models/goods'
import http from '@/utils/http'
import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import {
  FC,
  Fragment,
  useEffect,
  useState
  } from 'react'

interface UploadFileProps {
  value?: GoodsImg[]
  data?: GoodsImg[]
  title?: string
  maxCount?: number
  onChange?: (fileList: GoodsImg[]) => void
}
const AliyunOssUpload: FC<UploadFileProps> = (props) => {
  const { value, data, title, maxCount, onChange } = props

  const [fileList, setFileList] = useState<UploadFile[]>([])

  const uploadFile = async (option) => {
    console.log(option, 'Upload option')
    const { file, filename } = option
    const formData = new FormData()
    formData.append(filename, file, file.name)

    try {
      const { data } = await http.post(ApiUrl.UploadFileUrl, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      option.onSuccess(data, file)
    } catch (error) {
      option.onError(error)
    }
  }

  const handleChange = (e) => {
    const fileList = e.fileList.map((item, index) => {
      const imgItem: GoodsImg = {
        fileType: 10,
        type: index === 0 ? 1 : 2,
        url: item.response || item.url || '',
      }

      return imgItem
    })

    setFileList([...e.fileList])
    onChange && onChange([...fileList])
  }

  useEffect(() => {
    const list = data
      ? data.map((item) => {
          return {
            name: item.url,
            uid: item.id || '',
            url: item.url || '',
          }
        })
      : []
    setFileList([...list])
  }, [data])

  return (
    <Fragment>
      <Upload
        customRequest={uploadFile}
        onChange={handleChange}
        listType='picture-card'
        fileList={fileList}
      >
        {value && value.length < maxCount! ? (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
          </div>
        ) : null}
      </Upload>
      {title ? <p>{title}</p> : null}
    </Fragment>
  )
}

AliyunOssUpload.defaultProps = {
  maxCount: 1,
}

export default AliyunOssUpload
