import config from '../config';

export const isLogin = () => {
  return localStorage.getItem(config.tokenKey)
}

export const logout = () => {
  localStorage.removeItem(config.tokenKey);
}