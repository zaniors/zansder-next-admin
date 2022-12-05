import { GoodsState } from '@/models/goods'
import addOrEditGoodsReducer from './add-or-edit-goods'
import fetchGoodsDetailReducer from './fetch-goods-detail'
import fetchGoodsListReducer from './fetch-goods-list'
import goodsSpecsModalTriggerReducer from './specs-modal-trigger'

const reducers = [
  addOrEditGoodsReducer,
  goodsSpecsModalTriggerReducer,
  fetchGoodsListReducer,
  fetchGoodsDetailReducer,
]

export default function goodsReducer(state = {} as GoodsState, action) {
  switch (action.type) {
    default:
      break
  }
  return reducers.reduce((s, r) => r(s, action), state)
}
