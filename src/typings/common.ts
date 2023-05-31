export interface AnyObject<T = any> {
  [key: string]: T
}

export type Nullable<T> = T | null
