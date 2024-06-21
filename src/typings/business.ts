// 分页参数
export interface PageData {
  pageNo: number
  pageSize: number
}

// 分页数据
export interface PageResponseData<T> {
  total: number
  pages: number
  current: number
  size: number
  records: T[]
}

export type PropertyFileFormatType =
  | "jpg"
  | "png"
  | "jpeg"
  | "doc"
  | "docx"
  | "pdf"
  | "mp3"
  | "wav"
  | "mp4"
  | "avi"
  | ""

export interface MescrollType {
  num: number
  size: number
  optUp: {
    use: boolean
  }
  endBySize(curPageLen: number, totalSize: number): void
  endSuccess: (curPageLen: number, hasNext?: boolean) => void
  endErr(): void
  resetUpScroll: (isShowLoading?: boolean) => void
  scrollTo: (y: number, t: number) => void
  triggerDownScroll(): void
  onReachBottom(): void
}
