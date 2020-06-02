import http from '../../api/http';
import ApiUrl from '../../api/api-url';

const getArticles = () => {
  return http({
    method: 'GET',
    url: ApiUrl.ArticleList
  })
}

export {
  getArticles
}