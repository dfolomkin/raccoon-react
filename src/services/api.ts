import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { isApiRawResponse } from 'shared/typeGuards'
import {
  ApiRawResponse,
  ApiResponse,
  EmptyObject,
  IArticle,
  ITag,
} from 'shared/types'

const fetchUniHandler = async <T>(...params: Parameters<typeof fetch>) => {
  const apiResponse: ApiResponse<T> = {
    data: null,
    error: null,
  }

  try {
    const res = await fetch(...params)
    const json: ApiRawResponse<T> | T = await res.json()

    if (res.status >= 400 && isApiRawResponse<T>(json)) {
      apiResponse.error = {
        message: json.error,
        code: res.status,
      }
    } else if (isApiRawResponse<T>(json)) {
      apiResponse.data = json.data
    } else {
      apiResponse.data = json
    }
  } catch (error: unknown) {
    // NOTE: any general untyped error without extra handling on server-side we count as "500 Internal Server Error"
    apiResponse.error = {
      message: 'InternalServerError: ' + (error as Error).message,
      code: 500,
    }
  }

  return apiResponse
}

export const getArticles = async () =>
  await fetchUniHandler<IArticle[]>(`${API_BASE_URL}${API_ROUTES.articles}`)

export const getArticle = async (id: string) =>
  await fetchUniHandler<IArticle>(`${API_BASE_URL}${API_ROUTES.articles}/${id}`)

// NOTE: "multipart/form-data" is needed for multer on server side
export const putArticle = async (id: number, formData: FormData) =>
  await fetchUniHandler<IArticle>(
    `${API_BASE_URL}${API_ROUTES.articles}/${id}`,
    {
      method: 'PUT',
      body: formData,
    }
  )

// NOTE: "multipart/form-data" is needed for multer on server side
export const postArticle = async (formData: FormData) =>
  await fetchUniHandler<IArticle>(`${API_BASE_URL}${API_ROUTES.articles}`, {
    method: 'POST',
    body: formData,
  })

export const deleteArticle = async (id: number) =>
  await fetchUniHandler<EmptyObject>(
    `${API_BASE_URL}${API_ROUTES.articles}/${id}`,
    {
      method: 'DELETE',
    }
  )

export const getTags = async () =>
  await fetchUniHandler<ITag[]>(`${API_BASE_URL}${API_ROUTES.tags}`)
