import { RootStore } from './reducers'

const initialState: RootStore = {
  demo: {
    num: 0,
  },
  layout: {
    sider: {
      collapsed: false,
    },
  },
  auth: {},
  goods: {
    goodsSpecsModal: false,
    goodsListOutput: {
      size: 0,
      current: 0,
      total: 0,
      records: [],
    },
    goodsListError: null,
    goodsListPending: false,
    goodsListSearchInput: {
      size: 10,
      current: 1,
    },
    goodsDetailOutput: {
      brand: null,
      content: '',
      id: '',
      imgs: [],
      isDelete: false,
      isRecommend: false,
      labels: [],
      name: '',
      shopId: '',
      soldLimit: 0,
      soldNum: 0,
      specs: [],
      viewNumber: 0,
    },
    goodsDetailPending: false,
    goodsDetailError: null,
  },
  systemMenu: {
    systemMenuList: [],
    systemMenuListPending: false,
    systemMenuListError: null,
    systemMenuAddOrEditInput: {
      desc: '',
      name: '',
    },
    userMenuList: [],
    roleMenuList: [],
    roleMenuListIds: [],
  },
  systemRole: {
    systemRoleInput: {
      size: 10,
      current: 1,
      roleName: '',
    },
    systemRoleList: [],
    systemRoleListPending: false,
    systemRoleListError: null,
    systemRoleAddOrEditInput: {
      name: '',
      desc: '',
    },
    systemRoleMenuUpdateInput: [],
  },
  systemResource: {
    systemResourceList: [],
    systemResourceListPending: false,
    systemResourceListError: null,
    systemResourceAddOrEditInput: {
      name: '',
      path: '',
    },

    systemRoleResourceList: [],
    systemRoleResourceListPending: false,
    systemRoleResourceListError: null,

    submitRoleResourceListPending: false,
    submitRoleResourceListError: null,
  },
  aliyunOss: {},
}

export default initialState
