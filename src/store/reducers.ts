import { combineReducers } from 'redux'
import AliyunOssReducer from './aliyun-oss/reducer'
import authReducer from './auth/reducer'
import demoReducer from './demo/reducer'
import goodsReducer from './goods/reducer'
import layoutReducer from './layout/reducer'
import systemMenuReducer from './system-menu/reducer'
import systemResourceReducer from './system-resource/reducer'
import systemRoleReducer from './system-role/reducer'

const rootReducers = combineReducers({
  demo: demoReducer,
  layout: layoutReducer,
  auth: authReducer,
  systemMenu: systemMenuReducer,
  systemRole: systemRoleReducer,
  systemResource: systemResourceReducer,
  goods: goodsReducer,
  aliyunOss: AliyunOssReducer,
})

export type RootStore = ReturnType<typeof rootReducers>

export default rootReducers
