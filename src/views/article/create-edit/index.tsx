import React, { useState, useEffect, useCallback, createContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input, message } from 'antd';
import ArticleCreateEditHeader from './header';
import ArticleCoverUploader from './cover-uploader';
import { getArticleByIdAxios, updateArticleAxios, createArticleAxios } from '../index.service';
import { ArticleInput } from '../../../model/article';
import './index.scss';
import history from '../../../utils/history';

interface IArticleCreateEditContext {
  id: string;
  cover: string;
  onUpdateArticle?: () => void;
  onCreateArticle?: () => void;
}
export const ArticleCreateEditContext = createContext<IArticleCreateEditContext>({ cover: '', id: '' });

const ArticleCreateEdit = withRouter((props) => {
  const [id] = useState(props.match.params.id);
  const [form] = Form.useForm();
  const [articleData, setArticleData] = useState<ArticleInput>()

  const loadArticleById = useCallback(async () => {
    if (!id) {
      return;
    }
    const { data } = await getArticleByIdAxios(id);
    form.setFieldsValue(data);
    setArticleData(data);
  }, [form, id]);

  const updateArticleHandle = async () => {
    const input = form.getFieldsValue();
    input._id = id;

    await updateArticleAxios(input);
    message.success('保存成功')
  }

  const createArticleHandle = () => {
    const input = form.getFieldsValue();
    createArticleAxios(input);
    history.push('/article/list');
  }

  useEffect(() => {
    loadArticleById();
  }, [loadArticleById]);

  // form表单布局配置
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 10 },
  };

  return (
    <section className="article-create-edit-container">
      <ArticleCreateEditContext.Provider
        value={{
          id: articleData?._id || '',
          cover: articleData?.cover || '',
          onUpdateArticle: updateArticleHandle,
          onCreateArticle: createArticleHandle
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
          </Form>
        </Card>
      </ArticleCreateEditContext.Provider>
    </section>
  )
})

export default ArticleCreateEdit;