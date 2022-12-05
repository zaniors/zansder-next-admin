import { PageInput, PageOutput } from './common'

export interface GoodsState {
  /** 新建/编辑商品下规格表单modal显示隐藏 */
  goodsSpecsModal: boolean

  goodsListSearchInput: GoodsListSearchInput
  goodsListOutput: GoodsListOutput
  goodsListPending: boolean
  goodsListError: null

  goodsDetailOutput: GoodsDetailOutput
  goodsDetailPending: boolean
  goodsDetailError: null
}

export interface GoodsAddOrEditInput {
  id?: string
  labels?: Label[]
  brand: GoodsBrand
  category: any
  content: string
  imgs: GoodsImg[]
  name: string
  shopId: string
  specs: GoodsSpecItem[]
}

export interface GoodsListSearchInput extends PageInput {
  categoryId?: string
  name?: string
  release?: boolean
}
export interface GoodsListOutput extends PageOutput<GoodsList> {}
export interface GoodsBrand {
  id: string
  content: string
  createTime: string
  isRelease: boolean
  name: string
}
export interface GoodsItem {
  id: string
  brand: GoodsBrand | null
  content: string
  imgs: GoodsImg[]
  isDelete: boolean
  isRecommend: boolean
  labels: Label[]
  name: string
  shopId: string
  soldLimit: number
  soldNum: number
  specs: GoodsSpecItem[]
  viewNumber: number
}
export type GoodsList = GoodsItem[][]

export interface GoodsDetailOutput extends GoodsItem {}

export interface GoodsImg {
  id?: string
  commodityId?: string
  /** 10图片，20视频 */
  fileType: 10 | 20
  /** 1封面，2轮播图 */
  type: 1 | 2
  url: string
}

export interface Label {
  label: string
  commodityId?: string
}

export interface GoodsSpecItem {
  id?: string
  index?: number
  activityPrice: number
  commission: number
  commodityId: string
  costPrice: number
  isDefault: boolean
  isRelease: boolean
  memberPrice: number
  postage: Postage
  price: number
  specs: string
  startNum: number
  stock: number
}

export interface Postage {
  isFree: boolean
  postage: boolean
  specId?: string
}
