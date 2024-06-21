import type { Route } from "uni-mini-router"

export interface MetaInfo {
  meta?: {
    needLogin?: boolean
    needReal?: boolean
    ignoreAuth?: boolean
  }
}

export type DiyRoute = Route & MetaInfo
