import { ApiResponseError, ApiResponseWithState, IArticle } from 'shared/types'
import { ARTICLES_ACTIONS_TYPES } from 'store/actions/constants'
import { PayloadAction } from 'store/actions/utils'

const initialState: ApiResponseWithState<IArticle[]> = {
  isLoading: false,
  data: null,
  error: null,
}

export const readArticlesReducer = (
  state = initialState,
  action: PayloadAction<IArticle[] | ApiResponseError>
): ApiResponseWithState<IArticle[]> => {
  switch (action.type) {
    case ARTICLES_ACTIONS_TYPES.READ_ARTICLES_START:
      return { ...state, isLoading: true }
    case ARTICLES_ACTIONS_TYPES.READ_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload as IArticle[],
      }
    case ARTICLES_ACTIONS_TYPES.READ_ARTICLES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload as ApiResponseError,
      }
    default:
      return state
  }
}
