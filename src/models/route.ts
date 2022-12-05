export interface RouteItem {
  path: string
  name?: string
  component?: any
  childRoutes?: RouteItem[]
  isIndex?: boolean
  exact?: boolean
  auth?: boolean
  autoIndexRoute?: boolean
}
