import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, Input } from 'antd';
import ArticleCreateEditHeader from './header';
import ArticleCoverUploader from './cover-uploader';
import { getArticleByIdAxios } from '../index.service';
import './index.scss';

const ArticleCreateEdit = withRouter((props) => {
  const [articleInput, setArticleInput] = useState({});
  const [id] = useState(props.match.params.id);
  const [actionTitle] = useState(id ? '编辑文章' : '新增文章');

  const loadArticleById = useCallback(async () => {
    if (!id) {
      return;
    }
    const { data } = await getArticleByIdAxios(id);
    setArticleInput(data)
  }, [id])

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
      <Card title={<ArticleCreateEditHeader title={actionTitle} />}>
        <Form
          {...layout}
          initialValues={articleInput}
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
    </section>
  )
})

export default ArticleCreateEdit;