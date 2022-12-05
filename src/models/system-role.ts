import { PageInput } from './common'

export interface SystemRoleState {
  systemRoleInput: SystemRoleInput
  systemRoleList: SystemRoleList
  systemRoleListPending: boolean
  systemRoleListError: null
  systemRoleAddOrEditInput: SystemRoleAddOrEditInput
  systemRoleMenuUpdateInput: SystemRoleMenuInput[]
}

export type SystemRoleList = RoleItem[][]

export interface SystemRoleInput extends PageInput {
  roleName: string
}

export interface RoleItem {
  _id: string
  name: string
  desc: string
}

export interface SystemRoleId {
  id?: string
}

export interface SystemRoleAddOrEditInput {
  id?: string
  /** 角色描述 */
  desc: string
  /** 角色名称 */
  name: string
}

export interface SystemRoleDetail {
  _id: string
  name: string
  desc: string
}

export interface SystemRoleMenuInput {
  rid: string
  menuIds: string[]
}
