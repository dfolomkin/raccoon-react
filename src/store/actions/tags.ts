import { API_BASE_URL, API_ROUTES } from 'shared/constants'
import { ApiResponseError, ITag } from 'shared/types'

import { TAGS_ACTIONS_TYPES } from './constants'
import { createUniThunk } from './utils'

export const readTagsThunk = () =>
  createUniThunk({
    fetchParams: [`${API_BASE_URL}${API_ROUTES.tags}`],
    actions: {
      start: () => ({
        type: TAGS_ACTIONS_TYPES.READ_TAGS_START,
      }),
      success: (data: ITag[]) => ({
        type: TAGS_ACTIONS_TYPES.READ_TAGS_SUCCESS,
        payload: data,
      }),
      fail: (err: ApiResponseError) => ({
        type: TAGS_ACTIONS_TYPES.READ_TAGS_FAIL,
        payload: err,
      }),
    },
  })
