import http from '../../api/http';
import ApiUrl from '../../api/api-url';
import { IResponse } from '../../interface/response';
import { ArticleOutputData } from '../../model/article';

const getArticlesAxios = () => {
  return http.get<IResponse<ArticleOutputData[]>>(ApiUrl.ArticleList);
}

const delArticleAxios = (id: string) => {
  return http.delete(`${ApiUrl.ArticleList}/${id}`);
}

export {
  getArticlesAxios,
  delArticleAxios,
}