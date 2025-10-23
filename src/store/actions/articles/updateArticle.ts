import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { ApiResponseError, IArticle } from 'shared/types'

import { ARTICLES_ACTIONS_TYPES } from '../constants'
import { createUniThunk } from '../utils'

export const updateArticleThunk = (id: number, formData: FormData) =>
  createUniThunk({
    fetchParams: [
      `${API_BASE_URL}${API_ROUTES.articles}/${id}`,
      {
        method: 'PUT',
        body: formData,
      },
    ],
    actions: {
      start: () => ({
        type: ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_START,
      }),
      success: (data: IArticle) => ({
        type: ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_SUCCESS,
        payload: data,
      }),
      fail: (err: ApiResponseError) => ({
        type: ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_FAIL,
        payload: err,
      }),
    },
  })
