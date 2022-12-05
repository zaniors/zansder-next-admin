import { RouteItem } from '@/models/route'
import SystemResourceCreateOrEditPage from './create-or-edit'
import SystemResourceListPage from './list'

const systemResourceRoutingModule: RouteItem = {
  path: '',
  childRoutes: [
    { path: 'resource-list', component: SystemResourceListPage },
    { path: 'resource-create', component: SystemResourceCreateOrEditPage },
    { path: 'resource-create/:pid', component: SystemResourceCreateOrEditPage },
    { path: 'resource-edit/:id', component: SystemResourceCreateOrEditPage },
  ],
}

export default systemResourceRoutingModule
