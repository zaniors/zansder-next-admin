import { RouteItem } from '@/models/route'
import GoodsCreateOrEditPage from './goods/create-or-edit'
import GoodsListPage from './goods/list'

const shopRoutingModule: RouteItem = {
  path: 'shop',
  childRoutes: [
    { path: 'goods-list', component: GoodsListPage, isIndex: true },
    { path: 'goods-create', component: GoodsCreateOrEditPage },
    { path: 'goods-edit/:id', component: GoodsCreateOrEditPage },
  ],
}

export default shopRoutingModule
