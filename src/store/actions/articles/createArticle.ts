import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { ApiResponseError, IArticle } from 'shared/types'

import { ARTICLES_ACTIONS_TYPES } from '../constants'
import { createUniThunk } from '../utils'

export const createArticleThunk = (formData: FormData) =>
  createUniThunk({
    fetchParams: [
      `${API_BASE_URL}${API_ROUTES.articles}`,
      {
        method: 'POST',
        body: formData,
      },
    ],
    actions: {
      start: () => ({
        type: ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_START,
      }),
      success: (data: IArticle) => ({
        type: ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_SUCCESS,
        payload: data,
      }),
      fail: (err: ApiResponseError) => ({
        type: ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_FAIL,
        payload: err,
      }),
    },
  })
