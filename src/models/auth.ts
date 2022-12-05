import { MenuItem } from './system-menu'

export interface AuthState {
  userInfo?: UserInfoOutput
}

export interface SigninInput {
  username: string
  password: string
}

export interface LoginOutput {}

export interface UserInfoOutput {
  _id: string
  username: string
  role: Role
  menu: MenuItem[]
}

export interface Role {
  _id: string
  name: string
  desc: string
}

export interface Shop {
  accountId: string
  address: string
  bigintitude: number
  content: string
  id: string
  identifyId: string
  latitude: number
  name: string
}

export interface Info {
  accountId: string
  address: string
  avatar: string
  createUserId: string
  gender: number
  id: string
  isDelete: boolean
  nickname: string
  updateUserId: string
}

export interface Manage {
  id: string
  accountId: null | string
  name: string
  /** 类型 1.管理人员；2.管理端员工 */
  type: number
  identity: Identity
}

export interface Identity {
  id: null | string
  accountId: string
  roleId: string
  /** 用户类型：1.小程序用户；2.管理端管理员 ；3.管理端商家 */
  type: 0 | 1 | 2
}
