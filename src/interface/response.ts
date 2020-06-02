export interface IResponse<T> {
  data: T;
  code: number;
  message?: string;
}

export interface IErrResponse {
  code: number;
  message: string;
  stack?: string;
}