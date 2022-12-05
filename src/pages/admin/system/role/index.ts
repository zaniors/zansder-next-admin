import { RouteItem } from '@/models/route'
import SystemRoleCreateOrEditPage from './create-or-edit'
import SystemRoleListPage from './list'

const systemRoleRoutingModule: RouteItem = {
  path: '',
  childRoutes: [
    { path: 'role-list', component: SystemRoleListPage, isIndex: true },
    { path: 'role-create', component: SystemRoleCreateOrEditPage },
    { path: 'role-edit/:id', component: SystemRoleCreateOrEditPage },
  ],
}

export default systemRoleRoutingModule
