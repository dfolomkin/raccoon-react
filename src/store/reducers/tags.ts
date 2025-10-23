import { ApiResponseError, ApiResponseWithState, ITag } from 'shared/types'

import { TAGS_ACTIONS_TYPES } from '../actions/constants'
import { PayloadAction } from '../actions/utils'

const initialState: ApiResponseWithState<ITag[]> = {
  isLoading: false,
  data: null,
  error: null,
}

export const tagsReducer = (
  state = initialState,
  action: PayloadAction<ITag[] | ApiResponseError>
): ApiResponseWithState<ITag[]> => {
  switch (action.type) {
    case TAGS_ACTIONS_TYPES.READ_TAGS_START:
      return { ...state, isLoading: true }
    case TAGS_ACTIONS_TYPES.READ_TAGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload as ITag[],
      }
    case TAGS_ACTIONS_TYPES.READ_TAGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload as ApiResponseError,
      }
    default:
      return state
  }
}
