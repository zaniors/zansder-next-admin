import http from '../../api/http';
import ApiUrl from '../../api/api-url';
import { IResponse } from '../../interface/response';
import { ArticleOutputData, ArticleInput } from '../../model/article';

const getArticlesAxios = () => {
  return http.get<IResponse<ArticleOutputData[]>>(ApiUrl.Article);
}

const getArticleByIdAxios = (id: string) => {
  return http.get<IResponse<ArticleOutputData>>(`${ApiUrl.Article}/${id}`);
}

const delArticleAxios = (id: string) => {
  return http.delete(`${ApiUrl.Article}/${id}`);
}

const updateArticleAxios = (input: ArticleInput) => {
  const data = { ...input };
  const id = data.id;
  delete data.id;
  return http.patch<ArticleOutputData>(`${ApiUrl.Article}/${id}`, data);
}

const createArticleAxios = (data: ArticleInput) => {
  return http.post<ArticleOutputData>(ApiUrl.Article, data);
}

export {
  getArticlesAxios,
  getArticleByIdAxios,
  delArticleAxios,
  updateArticleAxios,
  createArticleAxios,
}