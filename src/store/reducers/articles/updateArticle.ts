import {
  ApiResponseError,
  ApiResponseWithState,
  EmptyObject,
  IArticle,
} from 'shared/types'
import { ARTICLES_ACTIONS_TYPES } from 'store/actions/constants'
import { PayloadAction } from 'store/actions/utils'

const initialState: ApiResponseWithState<IArticle | EmptyObject> = {
  isLoading: false,
  data: null,
  error: null,
}

// NOTE: uni reducer for atricle changes - update, create and delete
export const updateArticleReducer = (
  state = initialState,
  action: PayloadAction<IArticle | EmptyObject | ApiResponseError>
): ApiResponseWithState<IArticle | EmptyObject> => {
  switch (action.type) {
    case ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_START:
      return { ...state, isLoading: true }
    case ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload as IArticle,
      }
    case ARTICLES_ACTIONS_TYPES.UPDATE_ARTICLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload as ApiResponseError,
      }
    case ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_START:
      return { ...state, isLoading: true }
    case ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload as IArticle,
      }
    case ARTICLES_ACTIONS_TYPES.CREATE_ARTICLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload as ApiResponseError,
      }
    case ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_START:
      return { ...state, isLoading: true }
    case ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload as EmptyObject,
      }
    case ARTICLES_ACTIONS_TYPES.DELETE_ARTICLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload as ApiResponseError,
      }
    default:
      return state
  }
}
