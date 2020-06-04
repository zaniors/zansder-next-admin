import React, { FC } from 'react';
import { Button } from 'antd';

const ArticleHeader: FC = () => {
  return (
    <header className="article-header">
      <Button type="primary">新建文章</Button>
    </header>
  )
}

export default ArticleHeader;