import { RouteItem } from '@/models/route'

const DashboardHomePage = () => {
  return <section className='dashboard-home-page-container'>首页</section>
}

export const dashboardRoutingModule: RouteItem = {
  path: '',
  childRoutes: [
    { path: 'dashboard', component: DashboardHomePage, isIndex: true },
  ],
}

export default DashboardHomePage
