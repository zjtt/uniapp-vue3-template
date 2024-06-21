/// <reference types="vite/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare var window: Window & {
  WeixinJSBridge: any
  WVJBCallbacks: any
} & typeof globalThis
declare var eruda: any
declare var wx: any
