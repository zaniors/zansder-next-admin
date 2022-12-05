import AliyunOssUpload from '@/components/upload'
import WangEditor from '@/components/wangeditor'
import { GoodsSpecItem } from '@/models/goods'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch
  } from 'antd'
import { useEffect } from 'react'
import LabelsForm from '../components/labels-form'
import PostageForm from '../components/postage-form'
import TableModal from '../components/table-modal'
import './index.scss'
import {
  useAddOrEditGoods,
  useFetchGoodsDetail,
  useGoodsSpecsModalTrigger,
} from '@/store/goods/hook'

const GoodsCreateOrEditPage = () => {
  const { goodsSpecsModalTrigger, visible } = useGoodsSpecsModalTrigger()
  const { submitForm } = useAddOrEditGoods()

  const { goodsDetailOutput, fetchGoodsDetail, clearGoodsDetail } =
    useFetchGoodsDetail()

  // 商品表单实例
  const [goodsForm] = Form.useForm()
  // 规格表单实例
  const [specsForm] = Form.useForm()

  useEffect(() => {
    fetchGoodsDetail()
  }, [fetchGoodsDetail])

  useEffect(() => {
    // 更新表单
    goodsForm.setFieldsValue(JSON.parse(JSON.stringify(goodsDetailOutput)))
  }, [goodsForm, goodsDetailOutput])

  useEffect(() => {
    return () => {
      // 离开页面清除表单副作用
      clearGoodsDetail()
    }
  }, [clearGoodsDetail])

  return (
    <Form form={goodsForm} labelCol={{ span: 2 }} onFinish={submitForm}>
      <Form.Item
        name='name'
        label='商品名称'
        rules={[{ required: true, message: '请输入商品名称' }]}
      >
        <Input placeholder='请输入商品名称' />
      </Form.Item>

      <Form.Item
        name='imgs'
        label='轮播图'
        rules={[{ required: true, message: '请上传轮播图' }]}
      >
        <AliyunOssUpload
          title='最多可上传5张，建议尺寸750x750'
          maxCount={5}
          data={goodsDetailOutput.imgs}
        />
      </Form.Item>

      <Form.Item
        name='specs'
        label='规格'
        rules={[{ required: true, message: '请添加规格' }]}
      >
        <TableModal
          modalVisible={visible}
          onClose={() => {
            goodsSpecsModalTrigger(false)
          }}
          onOpen={() => {
            specsForm.resetFields()
            goodsSpecsModalTrigger(true)
          }}
          onModalOk={async () => {
            await specsForm.validateFields()
            specsForm.submit()
          }}
          onTableEdit={(input, index) => {
            goodsSpecsModalTrigger(true)
            const { postage } = input
            const isFree = postage.isFree ? '1' : '0'
            const postageNum = postage.postage
            // index用来记录当前编辑的索引值，如果是后台传入则有id，本地新增用index标识
            // 由于邮费后台数据是对象结构，新增isFree, postageNum表单绑定字段
            specsForm.setFieldsValue({ ...input, isFree, postageNum, index })
          }}
          onTableDel={(input, index) => {
            const specs =
              (JSON.parse(
                JSON.stringify(goodsForm.getFieldValue('specs'))
              ) as GoodsSpecItem[]) || []

            specs.splice(index, 1)

            goodsForm.setFieldsValue({ specs })
          }}
        >
          <Form
            form={specsForm}
            onFinish={(v) => {
              // 将新增的isFree, postageNum，还原到对象发送后台
              const { index, isFree, postageNum, postage, ...data } = v
              data.postage = {
                ...postage,
                isFree: isFree === '1' ? true : false,
                postage: isFree === '0' ? 0 : postageNum,
              }
              data.isDefault = data.isDefault || false

              const specs =
                (JSON.parse(
                  JSON.stringify(goodsForm.getFieldValue('specs'))
                ) as GoodsSpecItem[]) || []

              if (data.id) {
                specs.map((item) => {
                  if (item.id === data.id) {
                    item = {
                      ...item,
                      ...data,
                    }
                  }

                  return item
                })
              }

              if (!data.id) {
                typeof index === 'number'
                  ? (specs[index] = data)
                  : specs.push(data)
              }

              goodsForm.setFieldsValue({ ...goodsForm.getFieldsValue(), specs })
            }}
            wrapperCol={{ span: 12 }}
            labelCol={{ span: 6 }}
          >
            <Form.Item name='index' />
            <Form.Item
              name='specs'
              label='规格名称'
              rules={[{ required: true, message: '请输入规格名称' }]}
            >
              <Input placeholder='请输入规格名称' />
            </Form.Item>
            <Form.Item
              name='price'
              label='商品价格'
              rules={[{ required: true, message: '请输入商品价格' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='costPrice'
              label='成本价格'
              rules={[{ required: true, message: '请输入成本价格' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='memberPrice'
              label='会员价格'
              rules={[{ required: true, message: '请输入会员价格' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='activityPrice'
              label='活动价格'
              rules={[{ required: true, message: '请输入活动价格' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='startNum'
              label='起售数量'
              rules={[{ required: true, message: '请输入起售数量' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='commission'
              label='佣金'
              rules={[{ required: true, message: '请输入商品佣金' }]}
            >
              <InputNumber min={0} />
            </Form.Item>
            <Form.Item
              name='stock'
              label='库存'
              rules={[{ required: true, message: '请输入库存' }]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item name='postage' noStyle>
              <PostageForm />
            </Form.Item>

            <Form.Item name='isDefault' label='是否默认规格'>
              <Switch />
            </Form.Item>
            <Form.Item name='isRelease' label='是否发布'>
              <Switch />
            </Form.Item>
          </Form>
        </TableModal>
      </Form.Item>

      <Form.Item name='labels' label='商品标签'>
        <LabelsForm />
      </Form.Item>

      <Form.Item
        name='content'
        label='详情'
        rules={[{ required: true, message: '请添加商品详情' }]}
      >
        <WangEditor />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2 }}>
        <Button type='primary' htmlType='submit'>
          保存
        </Button>
      </Form.Item>
    </Form>
  )
}

export default GoodsCreateOrEditPage
