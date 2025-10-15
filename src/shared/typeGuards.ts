import { ApiRawResponse } from './types'

export const isArrayBuffer = (
  result: string | ArrayBuffer
): result is ArrayBuffer => result instanceof ArrayBuffer

export const isApiRawResponse = <T>(
  res: ApiRawResponse<T> | T
): res is ApiRawResponse<T> =>
  !!(res as ApiRawResponse<T>).data || !!(res as ApiRawResponse<T>).error
