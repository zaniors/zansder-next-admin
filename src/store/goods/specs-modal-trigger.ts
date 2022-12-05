import { GoodsState } from '@/models/goods'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../reducers'
import { GOODS_SPECS_MODAL_TRIGGER } from './constant'

export const goodsSpecsModalTriggerAction = (data: {
  goodsSpecsModal: boolean
}) => ({
  type: GOODS_SPECS_MODAL_TRIGGER,
  data,
})

export function useGoodsSpecsModalTrigger() {
  const dispatch = useDispatch()
  const visible = useSelector((state: RootStore) => state.goods.goodsSpecsModal)
  const goodsSpecsModalTrigger = useCallback(
    (value: boolean) =>
      dispatch(goodsSpecsModalTriggerAction({ goodsSpecsModal: value })),
    [dispatch]
  )

  return {
    visible,
    goodsSpecsModalTrigger,
  }
}

type ActionType = ReturnType<typeof goodsSpecsModalTriggerAction>

export default function goodsSpecsModalTriggerReducer(
  state = {} as GoodsState,
  action: ActionType
) {
  switch (action.type) {
    case GOODS_SPECS_MODAL_TRIGGER:
      return {
        ...state,
        goodsSpecsModal: action.data.goodsSpecsModal,
      }
    default:
      return state
  }
}
