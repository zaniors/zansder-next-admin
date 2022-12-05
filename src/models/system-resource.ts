export interface SystemResourceState {
  systemResourceList: ResourceItem[]
  systemResourceListPending: boolean
  systemResourceListError: null
  systemResourceAddOrEditInput: SystemResourceAddOrEditInput

  systemRoleResourceList: ResourceItem[]
  systemRoleResourceListPending: boolean
  systemRoleResourceListError: null

  submitRoleResourceListPending: boolean
  submitRoleResourceListError: null
}

export type ResourceList = ResourceItem[][]
export interface ResourceItem {
  _id: string
  name: string
  path: string
}

export interface SystemResourceAddOrEditInput {
  /** 资源id */
  id?: string
  /** 资源名称 */
  name: string
  /** 菜单路径 */
  path: string
}

export interface ResourceBindRoleInput {
  rid: string
  resIds: string[]
}
