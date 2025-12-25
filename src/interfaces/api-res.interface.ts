export interface IAPIRes<T = null> {
  success: boolean
  message: string
  timestamp: string
  data?: T | null
}
