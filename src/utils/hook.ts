import { MenuItem } from '@/models/system-menu'
import { RootStore } from '@/store/reducers'
import {
  useCallback,
  useEffect,
  useMemo,
  useState
  } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

export const useMatchSiderRoute = () => {
  const { push, location } = useHistory()
  const { userInfo } = useSelector((state: RootStore) => state.auth)
  const [parentKey, setParentKey] = useState<string[]>([])
  const [childKey, setChildKey] = useState<string[]>([])

  /**
   * 匹配当前路由的下的菜单并设置，刷新页面则会保存Menu状态
   */
  const matchSiderRoute = useCallback(() => {
    const findKey = (m: MenuItem) => {
      if (location.pathname.includes(m.pageUrl!) && m.children!.length > 0) {
        setParentKey(m.pageUrl! ? [m._id!] : [])
        m.children!.forEach(findKey)
      } else if (location.pathname.includes(m.pageUrl!)) {
        setChildKey(m.pageUrl! ? [m._id!] : [])
      }
    }

    (userInfo?.menu ?? []).length > 0 && userInfo?.menu.forEach(findKey)
  }, [location.pathname, userInfo])

  /**
   * 只展开当前父级菜单，收起其他展开的所有菜单
   * @param keys 由Antd Menu组件返回的当前展开的parentkeys
   */
  const onSiderMenuOpenChange = (keys) => {
    const key = keys.find((key) => parentKey.indexOf(key) < 0)
    setParentKey(key ? [key] : [])
  }

  useEffect(() => {
    matchSiderRoute()
  }, [matchSiderRoute])

  return {
    push,
    parentKey,
    childKey,
    onSiderMenuOpenChange,
  }
}

export const useQuery = () => {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}

export const useMatchQuery = (key: string, value: string) => {
  const query = useQuery()

  return useMemo(() => query.get(key) === value, [key, query, value])
}
