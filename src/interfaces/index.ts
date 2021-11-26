export interface HttpRes<T = unknown> {
  errno: number
  errcode: string
  errmsg: string
  data: T
}
