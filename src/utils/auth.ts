import { history } from '@/router'
import { StorageKey } from 'src/constants/storage'

export const getToken = () => {
  return localStorage.getItem(StorageKey.TOKEN) || ''
}

export const setToken = (token: string) => {
  localStorage.setItem(StorageKey.TOKEN, token)
}

export const clearToken = () => {
  localStorage.setItem(StorageKey.TOKEN, '')
}

export const logout = () => {
  clearToken()
  history.push('/unauth/signin')
}
