import React, { FC, useContext, } from 'react';
import { Table, Button } from 'antd';
import { ArticleOutputData } from '../../../model/article';
import { ArticleContext } from './index';
import moment from 'moment';
import history from '../../../utils/history';

const ArticleContent: FC = () => {
  const context = useContext(ArticleContext)

  const onEditArticle = (id: string) => {
    history.push('/article/edit/' + id);
  }

  const onDelArticle = (id: string) => {
    context.onDelArticle && context.onDelArticle(id);
  }


  return (
    <section className="article-list-content">
      <Table
        loading={context.loading}
        dataSource={context.data}
        rowKey="_id"
        size="small"
        bordered
      >
        <Table.Column title="ID" dataIndex="_id" key="id" />
        <Table.Column title="文章标题" dataIndex="title" key="title" ellipsis />
        <Table.Column title="文章描述" dataIndex="intro" key="intro" ellipsis />
        <Table.Column
          title="文章封面"
          dataIndex="cover"
          key="cover"
          render={img => <img src={img} alt="cover" width="100%" />}
        />
        <Table.Column
          title="创建时间"
          dataIndex="createTime"
          key="createTime"
          render={time => moment(time).format('YYYY-MM-DD')}
        />
        <Table.Column
          title="操作"
          dataIndex="action"
          key="action"
          render={(_, item: ArticleOutputData) => (
            <>
              <Button type="primary" onClick={onEditArticle.bind(null, item._id)}>编辑</Button>
              <Button type="text" danger onClick={onDelArticle.bind(null, item._id)}>删除</Button>
            </>
          )}
        />
      </Table>
    </section>
  )
}

export default ArticleContent;