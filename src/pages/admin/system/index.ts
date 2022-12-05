import { RouteItem } from '@/models/route'
import systemMenuRoutingModule from './menu'
import systemResourceRoutingModule from './resource'
import systemRoleRoutingModule from './role'

const systemRoutingModule: RouteItem = {
  path: 'system',
  childRoutes: [
    systemMenuRoutingModule,
    systemRoleRoutingModule,
    systemResourceRoutingModule,
  ],
}

export default systemRoutingModule
