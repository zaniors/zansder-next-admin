export interface PageInput {
  current: number
  size: number
}

export interface PageOutput<T> {
  current: number
  size: number
  total: number
  records: T
}

export interface Params {
  current: number
  name?: string
  size: number
}
