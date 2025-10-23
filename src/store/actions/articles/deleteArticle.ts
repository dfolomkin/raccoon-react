import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { ApiResponseError, EmptyObject } from 'shared/types'

import { ARTICLES_ACTIONS_TYPES } from '../constants'
import { createUniThunk } from '../utils'

export const deleteArticleThunk = (id: number) =>
  createUniThunk({
    fetchParams: [
      `${API_BASE_URL}${API_ROUTES.articles}/${id}`,
      {
        method: 'DELETE',
      },
    ],
    actions: {
      start: () => ({
        type: ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_START,
      }),
      success: (data: EmptyObject) => ({
        type: ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_SUCCESS,
        payload: data,
      }),
      fail: (err: ApiResponseError) => ({
        type: ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_FAIL,
        payload: err,
      }),
    },
  })
