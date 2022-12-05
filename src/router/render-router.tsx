import { RouteItem } from '@/models/route'
import { getToken } from '@/utils/auth'
import { Redirect, Route, Router, Switch } from 'react-router-dom'
import history from './history'
import routes from './router-config'

function renderRouter(routes: RouteItem[], contextPath: string) {
  const children: any[] = []

  const renderRoute = (item: RouteItem, routeContextPath: string) => {
    // 完整的路径则返回，否则自动加上
    let newContextPath =
      /^\//.test(item.path) || item.path === '*'
        ? item.path
        : `${routeContextPath}/${item.path}`
    newContextPath = newContextPath.replace(/\/+/g, '/')

    if (item.component && item.childRoutes) {
      const childRoutes = renderRouter(item.childRoutes, newContextPath)
      children.push(
        <Route
          key={newContextPath}
          render={(props) => (
            <item.component {...props}>{childRoutes}</item.component>
          )}
          path={newContextPath}
        />
      )
    } else if (item.component) {
      children.push(
        <Route
          key={newContextPath}
          component={item.component}
          path={newContextPath}
          exact
        />
      )
    } else if (item.childRoutes) {
      item.childRoutes.forEach((r) => renderRoute(r, newContextPath))
    }
  }

  routes.forEach((item) => renderRoute(item, contextPath))

  return children
}

function RootRouter() {
  const isLogin = getToken()
  const isAuthPathName = routes.find((item) => item.auth)
    ? routes.find((item) => item.auth)?.path
    : ''
  const currentPathName = window.location.pathname
  const isAuth = currentPathName.includes(isAuthPathName!)

  return (
    <Router history={history}>
      <Switch>{renderRouter(routes, '/')}</Switch>

      {isLogin ? (
        !isAuth ? (
          <Redirect to='/admin/dashboard' />
        ) : null
      ) : isAuth ? (
        <Redirect to='/unauth/signin' />
      ) : null}
    </Router>
  )
}

export function IndexPage() {
  const isLogin = getToken()

  return isLogin ? (
    <Redirect to='/admin/dashboard' />
  ) : (
    <Redirect to='/unauth/signin' />
  )
}
export default RootRouter
