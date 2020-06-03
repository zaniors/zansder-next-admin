export interface LoginInputData {
  username: string;
  password: string;
  remember: boolean;
}

export interface LoginOutputData {
  token: string;
}