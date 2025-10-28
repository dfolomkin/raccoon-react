export type ISocial = 'facebook' | 'gplus' | 'twitter' | 'vk' | 'yaru'

interface ArticleBase {
  author: string
  title: string
  content: string
  tags: string[]
  imageFileName: string
}

export interface IArticle extends ArticleBase {
  id: number
  socials: Record<ISocial, number>
  date: number
}

export interface ArticleForm extends ArticleBase {
  imageFile?: {
    base64: string
    blob: Blob
  }
}

export interface ITag {
  id: number
  name: string
}

export interface ApiRawResponse<T> {
  data?: T
  error?: string
}

export interface ApiResponseError {
  message: string
  code: number
}

export interface ApiResponse<T> {
  data: T | null
  error: ApiResponseError
}

export interface ApiResponseWithState<T> extends ApiResponse<T> {
  isLoading: boolean
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type EmptyObject = {}

export type Theme = 'light' | 'dark'
