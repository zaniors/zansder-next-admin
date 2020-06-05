import React, { FC } from 'react';
import { Button } from 'antd';
import history from '../../../utils/history';

const ArticleHeader: FC = () => {
  return (
    <header className="article-header">
      <Button type="primary" onClick={() => history.push('/article/create')}>新建文章</Button>
    </header>
  )
}

export default ArticleHeader;