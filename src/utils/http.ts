import { message } from 'antd'
import axios from 'axios'
import { getToken, logout } from './auth'

const http = axios.create({
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (conf) => {
    // showLoading()
    const token = getToken()
    conf.headers!.Authorization! = token

    return conf
  },
  (error) => {
    // do something with request error
    // hideLoading()
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    // 返回response.data，其它axios包装的数据不需要
    const res = response.data
    return res
  },
  (error) => {
    const err = error.response

    if ([401].includes(err.status)) {
      logout()
    }

    if (!err) {
      // 如果服务端未响应任何错误则抛出异常消息
      message.error('未知错误，请联系管理员')
      return Promise.reject(error.toJSON())
    }

    const errResponse = err.data
    message.error(`错误消息：${errResponse.message || err.statusText}`)
    return Promise.reject(error)
  }
)

export default http
