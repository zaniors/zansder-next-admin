import { RouteItem } from '@/models/route'
import { dashboardRoutingModule } from '@/pages/admin/dashboard'
import shopRoutingModule from '@/pages/admin/shop'
import systemRoutingModule from '@/pages/admin/system'
import UnAuthLayout, { unauthRoutingModule } from '@/pages/unauth'
import AdminLayout from 'src/pages/admin'
import DemoPage from 'src/pages/demo'
import NotFoundPage from 'src/pages/not-found'
import { IndexPage } from './render-router'

const routes: RouteItem[] = [
  {
    path: '/',
    exact: true,
    component: IndexPage,
  },
  {
    path: '/admin',
    auth: true,
    component: AdminLayout,
    childRoutes: [
      dashboardRoutingModule,
      shopRoutingModule,
      systemRoutingModule,
    ],
  },
  {
    path: '/unauth',
    component: UnAuthLayout,
    childRoutes: [unauthRoutingModule],
  },
  { path: '/demo', name: 'DemoPage', component: DemoPage },
  { path: '*', name: 'NotFoundPage', component: NotFoundPage },
]

/**
 * 路由模块下多个路由，带有isIndex标识时设置为默认路由
 * @param route 当前路由表
 * @returns
 */
function handleIndexRoute(route: RouteItem) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return
  }

  const indexRoute = route.childRoutes.find((route) => route.isIndex)
  if (indexRoute) {
    const first = { ...indexRoute }
    first.path = ''
    first.exact = true
    first.autoIndexRoute = true
    route.childRoutes.unshift(first)
  }

  route.childRoutes.forEach(handleIndexRoute)
}

routes.forEach(handleIndexRoute)

export default routes
