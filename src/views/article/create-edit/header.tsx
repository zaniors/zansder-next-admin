import React, { FC, useContext, useState, useEffect } from 'react';
import { Button } from 'antd';
import { ArticleCreateEditContext } from './index';


const ArticleCreateEditHeader: FC = () => {
  const [title, setTitle] = useState('')
  const context = useContext(ArticleCreateEditContext);

  const onClickHandle = () => {
    console.log('header组件', context)
    if (context.id) {
      context.onUpdateArticle && context.onUpdateArticle();
      return;
    }
    context.onCreateArticle && context.onCreateArticle();
  }

  useEffect(() => {
    setTitle(context.id ? '编辑文章': '新增文章');
  }, [context.id])

  return (
    <header className="article-create-edit-header">
      <h3 className="title">{title}</h3>
      <Button type="primary" onClick={onClickHandle}>保存</Button>
    </header>
  )
}

export default ArticleCreateEditHeader;