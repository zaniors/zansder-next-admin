import React, { FC } from 'react';
import { Button } from 'antd';

interface HeaderProps {
  title: string;
}

const ArticleCreateEditHeader: FC<HeaderProps> = (props) => {
  return (
    <header className="article-create-edit-header">
      <h3 className="title">{props.title}</h3>
      <Button type="primary">保存</Button>
    </header>
  )
}

export default ArticleCreateEditHeader;