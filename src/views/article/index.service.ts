import http from '../../api/http';
import ApiUrl from '../../api/api-url';
import { IResponse } from '../../interface/response';
import { ArticleOutputData } from '../../model/article';

const getArticles = () => {
  return http.get<IResponse<ArticleOutputData>>(ApiUrl.ArticleList);
}

export {
  getArticles
}