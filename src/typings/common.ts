export interface AnyObject<T = unknown> {
  [key: string]: T
}

// null联合任意类型
export type Nullable<T> = T | null

// 空对象
export type EmptyObject = Record<string, never>
