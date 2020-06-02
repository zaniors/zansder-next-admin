/**
 * 与后台成功响应统一接口，包装调用者传递的泛型T，给data对象
 * @param {*} T 接受一个T泛型
 */
export interface IResponse<T> {
  data: T;
  code: number;
  message?: string;
}

/** 与后台错误消息统一接口 */
export interface IErrResponse {
  code: number;
  message: string;
  stack?: string;
}