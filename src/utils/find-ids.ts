import { MenuItem } from '@/models/system-menu'

export default function findIds(list: MenuItem[]) {
  const ids: string[] = []
  const findId = (item: MenuItem) => {
    if (item.children && item.children!.length > 0) {
      item.children.forEach(findId)
    } else {
      ids.push(item._id)
    }
  }

  list.forEach(findId)

  return ids
}
