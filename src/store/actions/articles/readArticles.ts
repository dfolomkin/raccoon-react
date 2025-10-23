import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { ApiResponseError, IArticle } from 'shared/types'

import { ARTICLES_ACTIONS_TYPES } from '../constants'
import { createUniThunk } from '../utils'

export const readArticlesThunk = () =>
  createUniThunk({
    fetchParams: [`${API_BASE_URL}${API_ROUTES.articles}`],
    actions: {
      start: () => ({
        type: ARTICLES_ACTIONS_TYPES.READ_ARTICLES_START,
      }),
      success: (data: IArticle[]) => ({
        type: ARTICLES_ACTIONS_TYPES.READ_ARTICLES_SUCCESS,
        payload: data,
      }),
      fail: (err: ApiResponseError) => ({
        type: ARTICLES_ACTIONS_TYPES.READ_ARTICLES_FAIL,
        payload: err,
      }),
    },
  })
