import http from '../../api/http';
import ApiUrl from '../../api/api-url';
import { LoginInputData, LoginOutputData } from '../../model/auth';
import { IResponse } from '../../interface/response';

const login = (data: LoginInputData) => {
  return http.post<IResponse<LoginOutputData>>(ApiUrl.Login, data);
}

export default login;