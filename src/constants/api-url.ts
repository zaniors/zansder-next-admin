enum ApiUrl {
  /** 登录 */
  Signin = '/admin/v1/login',

  /** 获取当前用户信息 */
  CurrentUserInfo = '/admin/v1/user/current',

  /** 获取系统菜单列表 */
  SystemMenuList = '/admin/v1/menu/list',
  /** 新增菜单 */
  SystemMenuCreate = '/admin/v1/menu/create',
  /** 更新菜单 */
  SystemMenuUpdate = '/admin/v1/menu/update',
  /** 菜单详情 */
  SystemMenuDetail = '/admin/v1/menu/detail',
  /** 根据角色获取菜单列表 */
  SystemRoleMenu = '/admin/v1/menu/getRoleMenus',

  /** 获取系统角色列表 */
  SystemRoleList = '/admin/v1/role/list',
  /** 新增角色 */
  SystemRoleAdd = '/admin/v1/role/create',
  /** 更新角色 */
  SystemRoleUpdate = '/admin/v1/role/update',
  /** 更新角色菜单 */
  SystemRoleMenuUpdate = '/admin/v1/role/updateMenu',
  /** 角色详情 */
  SystemRoleDetail = '/admin/v1/role/detail',

  /** 更新角色的资源 */
  SubmitSystemRoleResource = '/admin/v1/role/updateResource',
  /** 根据角色获取资源接口列表 */
  SystemRoleResourceList = '/admin/v1/resource/getRoleResources',
  /** 获取资源接口列表 */
  SystemResourceList = '/admin/v1/resource/list',
  /** 创建资源接口 */
  SystemResourceCreate = '/admin/v1/resource/create',
  /** 更新资源接口 */
  SystemResourceUpdate = '/admin/v1/resource/update',
  /** 获取资源接口详情 */
  SystemResourceDetail = '/admin/v1/resource/detail',

  /** 上传图片 */
  UploadFileUrl = '',
}

export default ApiUrl
