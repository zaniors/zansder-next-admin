import http from '../../api/http';
import ApiUrl from '../../api/api-url';
import { IResponse } from '../../interface/response';
import { ArticleOutputData, ArticleInput } from '../../model/article';

const getArticlesAxios = () => {
  return http.get<IResponse<ArticleOutputData[]>>(ApiUrl.ArticleList);
}

const getArticleByIdAxios = (id: string) => {
  return http.get<IResponse<ArticleOutputData>>(`${ApiUrl.ArticleList}/${id}`);
}

const delArticleAxios = (id: string) => {
  return http.delete(`${ApiUrl.ArticleList}/${id}`);
}

const updateArticleAxios = (data: ArticleInput) => {
  const id = data._id;
  delete data._id;
  return http.patch<ArticleOutputData>(`${ApiUrl.ArticleList}/${id}`, data);
}

const createArticleAxios = (data: ArticleInput) => {
  return http.post<ArticleOutputData>(ApiUrl.ArticleList, data);
}

export {
  getArticlesAxios,
  getArticleByIdAxios,
  delArticleAxios,
  updateArticleAxios,
  createArticleAxios,
}