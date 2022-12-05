export interface SystemMenuState {
  systemMenuList: MenuList
  systemMenuListPending: boolean
  systemMenuListError: null
  systemMenuAddOrEditInput: SystemMenuAddOrEditInput
  userMenuList: MenuItem[]
  roleMenuList: MenuItem[]
  roleMenuListIds: string[]
}

export type MenuList = MenuItem[][]
export interface MenuItem {
  _id: string
  name: string
  desc: string
  pageUrl?: string
  children?: MenuItem[]
}

export interface UserRoleMenuListInput {
  roleId?: string
}

export interface SystemMenuId {
  id: string
}

export interface SystemMenuAddOrEditInput {
  /** 菜单id */
  id?: string
  /** 父id */
  pid?: string
  /** 菜单路径 */
  pageUrl?: string
  /** 菜单描述 */
  desc: string
  /** 菜单名称 */
  name: string
}
