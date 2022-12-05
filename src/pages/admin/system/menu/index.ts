import { RouteItem } from '@/models/route'
import SystemMenuCreateOrEditPage from './create-or-edit'
import SystemMenuListPage from './list'

const systemMenuRoutingModule: RouteItem = {
  path: '',
  childRoutes: [
    { path: 'menu-list', component: SystemMenuListPage },
    { path: 'menu-create', component: SystemMenuCreateOrEditPage },
    { path: 'menu-create/:pid', component: SystemMenuCreateOrEditPage },
    { path: 'menu-edit/:id', component: SystemMenuCreateOrEditPage },
  ],
}

export default systemMenuRoutingModule
