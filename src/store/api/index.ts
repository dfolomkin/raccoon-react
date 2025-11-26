import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { IArticle, ITag } from 'shared/types'

import {
  errorResponseTransformer,
  UseLazyQuery,
  UseMutation,
  UseQuery,
  withUseLazyQuery,
  withUseMutation,
  withUseQuery,
} from './utils'

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (build) => ({
    getTags: build.query<ITag[], void>({
      query: () => API_ROUTES.tags,
      transformErrorResponse: errorResponseTransformer,
    }),
    getArticles: build.query<IArticle[], void>({
      query: () => API_ROUTES.articles,
      transformErrorResponse: errorResponseTransformer,
    }),
    getArticle: build.query<IArticle, string>({
      query: (id) => `${API_ROUTES.articles}/${id}`,
      transformErrorResponse: errorResponseTransformer,
    }),
    putArticle: build.mutation<IArticle, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `${API_ROUTES.articles}/${id}`,
        method: 'PUT',
        body: formData,
      }),
      transformErrorResponse: errorResponseTransformer,
    }),
    postArticle: build.mutation<IArticle, FormData>({
      query: (formData) => ({
        url: `${API_ROUTES.articles}`,
        method: 'POST',
        body: formData,
      }),
      transformErrorResponse: errorResponseTransformer,
    }),
    deleteArticle: build.query<unknown, string>({
      query: (id) => ({
        url: `${API_ROUTES.articles}/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: errorResponseTransformer,
    }),
  }),
})

export const {
  useGetTagsQuery,
  useGetArticlesQuery,
  useGetArticleQuery,
  usePutArticleMutation,
  usePostArticleMutation,
  useLazyDeleteArticleQuery,
} = api

export const useGetTagsQueryCustom = withUseQuery<ITag[]>(
  useGetTagsQuery as UseQuery<ITag[]>
)
export const useGetArticlesQueryCustom = withUseQuery<IArticle[]>(
  useGetArticlesQuery as UseQuery<IArticle[]>
)
export const useGetArticleQueryCustom = withUseQuery<IArticle>(
  useGetArticleQuery as UseQuery<IArticle>
)
export const usePutArticleMutationCustom = withUseMutation<IArticle>(
  usePutArticleMutation as unknown as UseMutation<IArticle>
)
export const usePostArticleMutationCustom = withUseMutation<IArticle>(
  usePostArticleMutation as unknown as UseMutation<IArticle>
)
export const useLazyDeleteArticleQueryCustom = withUseLazyQuery<unknown>(
  useLazyDeleteArticleQuery as unknown as UseLazyQuery<unknown>
)
