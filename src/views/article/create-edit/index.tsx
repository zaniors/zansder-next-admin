import React, { useState, useEffect, useCallback, createContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Form, Input, message } from 'antd';
import { getArticleByIdAxios, updateArticleAxios, createArticleAxios } from '../index.service';
import { ArticleInput } from '../../../model/article';
import ArticleCreateEditHeader from './header';
import ArticleCoverUploader from './cover-uploader';
import history from '../../../utils/history';
import './index.scss';
import ArticleMarkDown from './markdown';

interface IArticleCreateEditContext {
  id: string;
  cover: string;
  content: string;
  onUpdateArticle?: () => void;
  onCreateArticle?: () => void;
  onUpdateCover?: (cover: string) => void;
  onUpdateContent?: (content: string) => void;
}
export const ArticleCreateEditContext = createContext<IArticleCreateEditContext>({ cover: '', id: '', content: '' });

const ArticleCreateEdit = () => {
  const [form] = Form.useForm();
  const [articleData, setArticleData] = useState<ArticleInput>()
  const { id } = useParams();

  const loadArticleById = useCallback(async () => {
    if (!id) {
      return;
    }
    const { data } = await getArticleByIdAxios(id);
    form.setFieldsValue(data);
    setArticleData(data);
  }, [form, id]);

  const updateArticleHandle = async () => {
    const input = { ...articleData, ...form.getFieldsValue() }
    setArticleData(input);

    await updateArticleAxios(input);
    message.success('更新成功');
  }

  const createArticleHandle = () => {
    const input = form.getFieldsValue();
    createArticleAxios(input);
    history.push('/article/list');
    message.success('创建成功');
  }

  /**
   * 文章封面子组件更新封面地址
   * @param cover 封面的地址
   */
  const uploaderUpdateCoverHandle = (cover: string) => {
    form.setFieldsValue({ cover });
    setArticleData({ ...articleData, cover });  // 希望立即更新子组件的封面
  }

  /**
   * markdown子组件的html字符串
   * @param content html string
   */
  const markdownUpdateContentHandle = (content: string) => {
    form.setFieldsValue({ content });
    // setArticleData({ ...articleData, content }); // markdown不需要更新，内部自己维护了最新的值
  }

  useEffect(() => {
    loadArticleById();
  }, [loadArticleById]);

  // form表单布局配置
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };

  console.log('父组件')
  return (
    <section className="article-create-edit-container">
      <ArticleCreateEditContext.Provider
        value={{
          id: articleData?.id || '',
          cover: articleData?.cover || '',
          content: articleData?.content || '',
          onUpdateArticle: updateArticleHandle,
          onCreateArticle: createArticleHandle,
          onUpdateCover: uploaderUpdateCoverHandle,
          onUpdateContent: markdownUpdateContentHandle
        }}
      >
        <Card title={<ArticleCreateEditHeader />}>
          <Form
            {...layout}
            form={form}
            name="article"
          >
            <Form.Item
              label="文章标题"
              name="title"
              rules={[{ required: true, message: '请输入文章标题' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="文章介绍"
              name="intro"
            >
              <Input.TextArea rows={5} />
            </Form.Item>

            <Form.Item
              label="文章封面"
              name="cover"
              valuePropName="fileList"
              getValueFromEvent={e => e.fileList}
            >
              <ArticleCoverUploader />
            </Form.Item>

            <Form.Item
              label="文章内容"
              name="content"
            >
              <ArticleMarkDown />
            </Form.Item>
          </Form>
        </Card>
      </ArticleCreateEditContext.Provider>
    </section>
  )
}

export default ArticleCreateEdit;