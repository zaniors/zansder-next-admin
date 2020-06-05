import React, { createContext, useState, FC, useEffect } from 'react';
import { Card, message, Modal } from 'antd';
import { getArticlesAxios, delArticleAxios } from '../index.service';
import { ArticleOutputData } from '../../../model/article';
import ArticleHeader from './header';
import ArticleContent from './content';
import './index.scss';

interface IArticleContext {
  data: ArticleOutputData[];
  loading: boolean;
  onDelArticle?: (id: string) => void;
}
export const ArticleContext = createContext<IArticleContext>({ data: [], loading: true });

const ArticleList: FC = () => {
  const [articleListData, setArticleListData] = useState<ArticleOutputData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadArticleList = async () => {
    const { data } = await getArticlesAxios();
    setArticleListData(data);
    setLoading(false);
  }

  const delArticleHandle = async (id: string) => {
    Modal.confirm({
      title: '提示',
      content: '是否删除这篇文章？',
      onOk: async () => {
        await delArticleAxios(id);
        loadArticleList();
        message.success('文章删除成功');
      }
    })
  }

  useEffect(() => {
    loadArticleList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="article-list-container">
      <ArticleContext.Provider
        value={{
          data: articleListData,
          loading,
          onDelArticle: delArticleHandle
        }}
      >
        <Card title={<ArticleHeader />}>
          <ArticleContent />
        </Card>
      </ArticleContext.Provider>
    </section>
  )
}

export default ArticleList;