/**
 * 后台接口全采用RESTFUL接口设计
 * 比如用户相关接口只有请求/users这一个接口
 * /users => post delete patch get来增删改查
 * 遇到特诉情况，比如用户登录则特殊处理/login => post
 */
enum ApiUrl {
  ArticleList = '/article',
  Login = '/login'
}

export default ApiUrl;